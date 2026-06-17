---
title: Database Replication
draft: false
date: 2026-03-02
description: "How database replication keeps data available across machines - leader follower, multi leader, synchronous vs asynchronous replication, and the tradeoffs every system designer must know."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - database replication
  - leader follower replication
  - multi leader replication
  - synchronous vs asynchronous replication
  - read replicas
  - replication lag
  - distributed database design
  - system design fundamentals
Author: Ahmad Hassan
---

Your database holds all your data on one machine. That machine dies. Your entire application goes down. Every user sees errors. Revenue stops. And there is nothing you can do until that machine comes back online.

This is the availability problem. The fix is replication. Keep multiple copies of the same data on different machines. If one fails, another takes over.

But replication is not just about Copies. It raises real design questions. Who accepts writes? How do copies stay in sync? What happens when they fall behind? How do you handle conflicts when two copies disagree?

Let's start with the most common model: leader follower replication, also called single leader or primary replica replication.

In this model, one node is the leader. All writes go to the leader first. The leader writes the data locally and then sends the change to one or more followers. Followers apply the same change and stay in sync. Reads can go to the leader or any follower.

This is the default replication setup in most relational databases. PostgreSQL calls it streaming replication. MySQL calls it source replica. MongoDB calls it replica set with a primary.

The leader follower model is simple because there is only one source of truth for writes. No write conflicts. The order of operations is determined by the leader. Followers just replay the log.

But what happens between the leader writing and the follower catching up?

This gap is replication lag. And it creates a subtle problem. A user writes a comment. The leader acknowledges the write. The user refreshes the page. The read hits a follower that hasn't applied the write yet. The comment is gone. The user thinks the app lost their data.

This is called a read after write inconsistency. The leader has the data but the follower doesn't yet. Common fixes include reading your own writes by routing reads from the same user to the leader for a short window, or waiting for the follower to catch up before confirming the write.

Now how does the leader send changes to followers?

Synchronous replication means the leader waits for the follower to confirm the write before telling the client it succeeded. If the follower is down, the write fails. You get consistency at the cost of availability and speed.

Asynchronous replication means the leader confirms the write immediately and sends the change to followers in the background. Writes are fast and the leader doesn't depend on followers. But the window for data loss exists. If the leader crashes after confirming a write but before sending it to followers, that write is gone.

Semi synchronous replication is a middle ground. The leader waits for at least one follower to confirm. Not all, just one. This gives you durability without the full latency cost of synchronous replication.

Most production systems use asynchronous replication for performance and accept the small risk of data loss. Systems that cannot lose any data, like financial ledgers, use synchronous or semi synchronous.

Now what if you have users in different regions?

A user in Singapore writing to a leader in Virginia experiences high latency. Every write travels halfway across the world. This is where multi leader replication comes in.

In a multi leader setup, you have multiple leaders, each in a different data center. Users write to their nearest leader. Leaders replicate changes to each other asynchronously. Writes are fast for everyone. But now you have a new problem. What if two leaders accept conflicting writes to the same row at the same time?

This is a write conflict. And it must be resolved somehow. Common strategies include last write wins with a timestamp, custom conflict resolution logic, or avoiding conflicts entirely by assigning each leader ownership over a partition of data.

Conflict resolution is the hardest part of multi leader replication. If you can avoid it by design, do so. If you cannot, make sure your system has deterministic rules for resolving conflicts so the same conflict always produces the same outcome.

There is also a third model called leaderless replication. Every node can accept writes. If two nodes receive conflicting writes, they resolve later using timestamps or version vectors. Cassandra and DynamoDB use this model. It offers the highest availability because any reachable node can accept writes. But consistency guarantees are weaker and the application must handle conflict resolution.

Which model should you choose?

If you have a single region and strong consistency matters, leader follower with synchronous replication is straightforward and reliable. If you need low latency writes across multiple regions and can handle conflict resolution, multi leader is appropriate. If availability is more important than consistency and you want every node to handle reads and writes, leaderless is the way.

One more thing. Replication is not backup. A replication follower copies every mistake the leader makes. Accidentally delete a table? The follower deletes it too. You still need point in time backups stored separately.

Replication gives you availability and read scalability. It does not protect you from application level data corruption.

Think of replication as an insurance policy against hardware failure. It ensures your system stays up when machines go down. But it introduces complexity around consistency, latency, and conflict resolution. The tradeoffs are real. Understand them before you replicate.

Happy designing