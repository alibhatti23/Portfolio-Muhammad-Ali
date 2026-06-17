---
title: ID Generation in Distributed Systems
draft: false
date: 2026-04-19
description: "How to generate unique IDs across distributed machines - UUID, Snowflake, ULID, time sorted vs random, and coordination free approaches for system design."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - ID generation distributed
  - UUID vs Snowflake
  - ULID
  - unique identifier generation
  - time sorted IDs
  - coordination free IDs
  - distributed primary key
  - system design fundamentals
Author: Ahmad Hassan
---

You need to create a new record in your database. It needs an ID. In a single server world, this is trivial. An auto incrementing integer. 1, 2, 3, 4. The database guarantees uniqueness because there's one sequence and one machine managing it.

Now you have 50 servers writing to a sharded database. Server A inserts a row and gets ID 7. Meanwhile, Server B also inserts a row and also gets ID 7. Two different records, same ID. Collision.

You could use a central coordinator. A single service that hands out IDs. But that's a single point of failure and a bottleneck. If 50 servers are generating IDs at 10,000 per second each, the ID service must handle 500,000 requests per second. It becomes a bottleneck by design.

The problem is clear. How do you generate unique identifiers across multiple machines without coordination?

The most common answer is UUID, specifically UUID version 4. A UUID v4 is 128 bits, randomly generated. The probability of two UUIDs colliding is so low it's effectively impossible for any practical system. 2 to the power of 122 possible values. Even generating a billion UUIDs per second for 85 years, the probability of a collision remains negligible.

UUIDs are simple. No coordination. No single point of failure. Any server can generate one independently. They're widely supported. Most databases have a UUID type. Most programming languages have a built in UUID generator.

But UUIDs have a downside that matters at scale. They're random. A UUID v4 has no meaningful sort order. If you insert 1000 rows with UUIDs as primary keys and then query them in creation order, you can't sort by the ID. You need a separate created_at timestamp. More importantly, random IDs cause index fragmentation in databases like MySQL and PostgreSQL that use B-tree indexes. New rows are inserted at random positions in the index tree instead of being appended at the end. This causes page splits, increased disk I/O, and degraded write performance as the table grows.

This brings us to the key distinction in ID generation. Time sorted versus random.

Time sorted IDs have a property that makes them valuable. They are roughly ordered by creation time. This means new IDs are always greater than old IDs. New rows are always appended to the end of the B-tree index. No page splits. No fragmentation. Write performance stays consistent as the table grows.

Snowflake IDs are the most popular time sorted approach. Developed by Twitter, a Snowflake ID is a 64 bit integer composed of three parts. A timestamp, usually millisecond precision, using a custom epoch. A machine ID that uniquely identifies the server generating the ID. A sequence number that increments within the same millisecond.

The timestamp gives sort order. The machine ID ensures uniqueness across servers. The sequence number ensures uniqueness within the same millisecond on the same server. Together, they produce IDs that are globally unique, time sorted, and 64 bit integers that are efficient for storage and indexing.

The tradeoff of Snowflake is that it requires coordination for the machine ID. Each server must have a unique machine ID, which means you need a way to allocate them. ZooKeeper, etcd, or a database sequence can handle this. Machine IDs are assigned once and reused, so the coordination overhead is minimal. But it's not zero coordination.

Another consideration is that Snowflake IDs depend on system clocks. If the clock on a server moves backwards, even by a few milliseconds, the ID generator could produce IDs that are out of order or even duplicate existing IDs. Most implementations detect clock drift and refuse to generate IDs until the clock catches up. This is called clock guard. It means your ID generator can have brief outages if the system clock is adjusted.

ULID, which stands for Universally Unique Lexicographically Sortable Identifier, is an alternative that combines the benefits of both approaches. A ULID is 128 bits like a UUID, but the first 48 bits are a timestamp in milliseconds and the remaining 80 bits are random. Because the timestamp comes first, ULIDs are sortable by creation time. Because the random portion is large, collisions are as unlikely as UUIDs.

ULIDs have a nice property that neither UUIDs nor Snowflakes share. They are lexicographically sortable as strings. This means you can sort ULIDs alphabetically and they come out in creation order. This is useful for systems that need to enumerate or paginate by creation time without a separate timestamp column.

Which one should you use?

If you're building a small to medium system and simplicity matters most, UUID v4. No coordination, no clock dependency, universally supported. Accept the index fragmentation as a cost of simplicity.

If you're building a high write throughput system on a relational database, Snowflake. Time sorted IDs prevent index fragmentation and keep write performance consistent. Accept the coordination overhead for machine IDs and the clock dependency.

If you want time sorting without coordination overhead and can tolerate 128 bit IDs, ULID. You get sort order, no coordination, and collision resistance comparable to UUID.

If you're building a system that needs IDs to be both time sorted and web safe, consider a format like NanoID or a base62 encoded Snowflake. Numeric IDs are fine for internal use but exposing sequential IDs in URLs reveals information about your system. How many orders you've processed. When you started. Base62 encoding obscures this while keeping IDs short and URL friendly.

A few practical warnings.

Never expose internal IDs directly in URLs if they reveal business information. Sequential IDs tell anyone your total user count. Use slugs, UUIDs, or encoded versions instead.

Consider the total size of your IDs. A 128 bit UUID stored as text takes 36 characters. A 64 bit Snowflake stored as text takes up to 19 characters. This matters for indexes, for storage, for network transfer. Size your IDs for your scale. A system generating 10 IDs per second doesn't need 128 bits of randomness. A system generating millions of IDs per second across hundreds of servers does.

If you need to merge data from multiple sources, ensure your ID scheme guarantees global uniqueness. Snowflake IDs with machine IDs do this. UUIDs do this by definition. But two independent auto incrementing sequences will collide when data is merged.

ID generation is one of those decisions that seems trivial at first and becomes hard once you think about distributed systems. The right choice depends on your scale, your database, your sorting requirements, and your tolerance for coordination. Pick the simplest scheme that satisfies your constraints. Switch when your constraints change.

Happy designing