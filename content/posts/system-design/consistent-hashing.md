---
title: Consistent Hashing
draft: false
date: 2026-03-14
description: "How consistent hashing solves the rehashing problem in distributed systems - hash rings, virtual nodes, and why it matters for caching and data partitioning."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - consistent hashing
  - hash ring
  - virtual nodes
  - distributed caching
  - data partitioning
  - rehashing problem
  - load balancing hash
  - system design fundamentals
Author: Ahmad Hassan
---

You have 5 cache servers. You hash each user ID modulo 5 to decide which server holds their data. User 42 goes to server 2. User 87 goes to server 2 as well. Everything works.

Then traffic grows. You add a 6th server. Now you hash modulo 6. User 42 hashes to server 0. User 87 hashes to server 3. Almost every user's data is now on the wrong server. Your cache hit rate drops to near zero. Every request that would have been a cache hit becomes a cache miss. Your database drowns.

This is the rehashing problem. When the number of servers changes, a simple modulo hash function remaps nearly all keys to different servers. In a system with thousands of servers and millions of keys, adding or removing one node causes chaos.

Consistent hashing solves this.

The idea is elegant. Imagine a circle, also called a hash ring. The ring has a fixed number of positions, usually 0 to 2^32 minus 1, representing the full output space of a 32-bit hash function. Each server is placed on the ring by hashing its identifier. Each key is also placed on the ring by hashing it. A key is assigned to the first server that appears clockwise from the key's position on the ring.

Let's make this concrete. You have servers A, B, and C. Hash(A) places A at position 100 on the ring. Hash(B) lands at position 400. Hash(C) lands at position 700. Now a key with hash value 250 is stored on server B, because B is the first server clockwise from 250. A key with hash value 50 is stored on server A, because going clockwise from 50, A at position 100 comes first.

Now add server D. Hash(D) lands at position 300. What changes?

Only the keys between positions 100 and 300 that were previously assigned to B now move to D. Everything else stays exactly where it is. The vast majority of keys are undisturbed. When you add a node, only the keys in the segment between the new node and its predecessor need to move.

Remove a server. Same principle. If server B goes down, only the keys that were on B need to be reassigned. They move to the next server clockwise, which is C. All other keys remain untouched.

Compare this to modulo hashing. Adding one server with modulo forces almost all keys to remap. With consistent hashing, adding one server moves only roughly 1/N of the keys, where N is the total number of servers.

That's the core win. Minimal disruption when the cluster changes.

But there's a problem. With a small number of servers, the distribution on the ring is uneven. You might have large gaps between servers. One server ends up responsible for a huge arc of the ring while another server barely gets any keys. The load becomes imbalanced.

The fix is virtual nodes, also called vnodes. Instead of placing each physical server once on the ring, you place it many times using different hash functions. Server A might appear at positions 50, 320, 580, and 900. Server B appears at positions 140, 400, 660, and 1050. The more virtual nodes, the more evenly distributed the load becomes.

With enough vnodes, each server gets a roughly equal share of the ring regardless of how many physical servers you have. Most implementations use 100 to 200 vnodes per physical server.

Virtual nodes also help when servers have different capacities. If server A is twice as powerful as server B, you give server A twice as many vnodes. It naturally receives twice as much traffic.

Where is consistent hashing used in practice?

DynamoDB uses consistent hashing to partition data across storage nodes. When a node is added or removed, only the adjacent key ranges move. The rest of the cluster is unaffected.

Akamai and other CDNs use consistent hashing to map content to edge servers. When a user requests a URL, the CDN hashes the URL and finds the nearest server on the ring. If that server doesn't have the content cached, it fetches it from the origin. Subsequent requests for the same URL hit the same server.

Cassandra uses consistent hashing with vnodes for data distribution. Each node holds multiple token ranges. Adding a node automatically redistributes a proportional share of data from existing nodes.

Redis Cluster uses a variant with hash slots. Instead of a continuous ring, it defines 16384 fixed slots. Each shard owns a range of slots. When you add a shard, you move slots from existing shards. The principle is the same: minimize data movement.

The subtleties worth knowing.

When a node joins, data must physically move from the old owner to the new owner. This is not instant. During the migration window, the system must handle reads that might hit either node. Common strategies include proxying reads from the old owner to the new owner until migration completes, or serving from both temporarily.

When a node leaves unexpectedly, its keys must be reassigned. The ring automatically reroutes to the next clockwise node, but that node now handles more load. If multiple nodes fail simultaneously, the remaining nodes may be overwhelmed. This is why replication on top of consistent hashing is essential. Each key is stored on the next N nodes clockwise for redundancy.

The ring itself needs management. Who decides which nodes are in the ring? How do clients learn about ring membership? In practice, a configuration service or gossip protocol maintains ring state. Clients periodically refresh their view of the ring.

Consistent hashing is not the answer to every partitioning problem. If your access patterns are heavily skewed, a small set of hot keys can overload a single shard regardless of how evenly you distribute the ring. You still need to think about your data model and access patterns.

But when you need to scale horizontally with minimal disruption, consistent hashing is one of the most elegant tools in the system designer's toolkit. It turns a chaotic full remap into a calm partial migration. And in distributed systems, minimizing the blast radius of change is always the right call.

Happy designing