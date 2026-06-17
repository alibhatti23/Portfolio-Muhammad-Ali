---
title: Distributed Locking
draft: false
date: 2026-03-26
description: "How distributed systems coordinate access to shared resources - Redis Redlock, Zookeeper, fencing tokens, leases, and why distributed locking is harder than it looks."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - distributed locking
  - Redis Redlock
  - Zookeeper locks
  - fencing tokens
  - distributed mutex
  - lease based locking
  - concurrency control distributed
  - system design fundamentals
Author: Ahmad Hassan
---

Two servers try to withdraw money from the same bank account at the same time. Server A reads the balance as 1000. Server B also reads 1000. Server A subtracts 200 and writes 800. Server B subtracts 100 and writes 900. The final balance is 900. The account lost 200. This is a classic race condition.

On a single machine, you fix this with a mutex. A lock. Only one thread can hold the lock at a time. The other waits. Problem solved.

But in a distributed system, the two servers are different machines. A mutex in process A's memory doesn't help process B on another machine. You need a lock that works across the network. A distributed lock.

The idea is simple. Before accessing a shared resource, a server acquires a lock. It does its work. Then it releases the lock. Only one server holds the lock at any time. This guarantees mutual exclusion.

The implementation is where everything gets hard.

The most common approach is using Redis as a lock manager. A server tries to set a key with a unique value using the SET command with NX (only set if not exists) and PX (expiration time in milliseconds). If the command succeeds, the server holds the lock. Other servers trying the same command get rejected because the key already exists.

When the server is done, it deletes the key, releasing the lock. Other servers can now acquire it.

Simple enough. But what happens if the server holding the lock crashes before releasing it? The lock key stays in Redis forever. Every other server is locked out. This is why the expiration time is critical. You set a TTL. If the lock holder dies, the lock expires automatically after a set duration. Other servers can acquire it once it expires.

But this introduces a new problem. What if the lock holder is slow but not dead? It takes longer than the TTL to complete its work. The lock expires. Another server acquires it. Now two servers think they hold the lock. The fundamental guarantee of mutual exclusion is broken.

This is the central challenge of distributed locking. Network delays, process pauses, and clock skew make it impossible to guarantee that a lock holder will always release the lock before it expires.

The Redlock algorithm was proposed by Redis creator Salvatore Sanfilippo to address this. It uses multiple independent Redis instances, typically five. To acquire a lock, a server tries to set the key on all five instances with the same unique value and a short TTL. It must succeed on a majority, at least three out of five, within the TTL window. If successful, the lock is acquired. If not, it releases all keys and retries.

The idea is that even if one or two Redis instances fail, the lock is still safe because a majority must agree. But Redlock has been criticized, most notably by Martin Kleppmann, for relying on system clocks. If a Redis process pauses for longer than the TTL, the lock can be silently broken. The timestamp based approach assumes clocks are reliable, which they often are not in distributed systems.

Kleppmann's recommended approach is the fencing token. Instead of relying purely on a lock to guarantee mutual exclusion, you issue a monotonically increasing token every time a lock is acquired. The resource being protected checks the token before accepting any operation. If a new operation arrives with a lower token than the current one, it is rejected.

Here's how it works. Server A acquires the lock and gets fencing token 1. Server A is slow. The lock expires. Server B acquires the lock and gets fencing token 2. Server B writes to the resource with token 2. The resource records that the highest token it has seen is 2. When Server A finally completes and tries to write with token 1, the resource rejects it because token 1 is less than token 2.

Fencing tokens don't prevent concurrent access. They prevent stale access. The resource itself enforces safety, not the lock. The lock is a coordination hint. The fencing token is the safety net.

Zookeeper takes a different approach. It uses ephemeral nodes and watches. A server creates an ephemeral znode as a child of a lock path. The znode with the lowest sequence number holds the lock. Other servers watch the znode immediately before theirs. When the lock holder's session expires or disconnects, its ephemeral node is automatically deleted. The next server in line is notified and acquires the lock.

Zookeeper's approach is more robust than Redis because it doesn't rely on timeouts. The lock is held for as long as the session is alive. If the session dies, the lock is released immediately. No TTL, no clock dependency, no silent expiration. But Zookeeper is heavier to operate. It requires a quorum of servers and is slower for high throughput lock acquisition than Redis.

There's also lease based locking. Instead of an indefinite lock, you grant a lease. A lease has a start time, a duration, and a holder. The holder must renew the lease before it expires. If the holder fails to renew, the lease is released and another server can acquire it. This is used in systems like Chubby and is similar to the Redis TTL approach but with explicit renewal semantics.

So when do you actually need distributed locking?

The honest answer is: less often than you think.

Many problems that seem to require distributed locking can be solved with better architecture. If you're locking to update a row in a database, use database transactions or optimistic concurrency control with version numbers. If you're locking to ensure only one scheduler runs a job, use a leader election mechanism instead. If you're locking to prevent duplicate processing, use idempotent operations so processing twice is safe.

Distributed locking is necessary when you need mutual exclusion over a resource that doesn't have built in coordination. A shared file on a distributed file system. A rate limiter that must be enforced across servers. A configuration update that should only happen once.

The rule of thumb is simple. If you can avoid a distributed lock, avoid it. Use database constraints, idempotent writes, or single leader patterns instead. If you must use one, combine it with fencing tokens to protect against stale locks. And always set a TTL or timeout so a crashed lock holder doesn't hold the system hostage forever.

Happy designing