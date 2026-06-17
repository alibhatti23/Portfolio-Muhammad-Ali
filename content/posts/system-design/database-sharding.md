---
title: Database Sharding
draft: false
date: 2026-02-26
description: "How database sharding splits data across multiple machines - shard key selection, horizontal partitioning, hotspot prevention, and the tradeoffs of distributing your data."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - database sharding
  - horizontal partitioning
  - shard key selection
  - distributed database design
  - hotspot problem
  - database scaling
  - partitioning strategies
  - system design fundamentals
Author: Ahmad Hassan
---

Your database has one server. It holds all your data. It works fine until it doesn't. The CPU maxes out. Disk I/O crawls. Queries that took 5ms now take 500ms. You add more RAM. You upgrade the CPU. You get a bigger machine. But eventually, one machine cannot keep up.

This is the vertical scaling ceiling. You make the box bigger until you cannot make it any bigger.

The alternative is horizontal scaling. Instead of one giant database, you spread the data across multiple smaller databases. Each one holds a subset of the data. Each one handles a subset of the traffic. Together, they behave like one logical database.

This is sharding.

The core idea is simple. Take your data, split it into chunks, and assign each chunk to a different server. Each server is called a shard. The collection of shards forms the complete dataset.

But how do you split the data? This is the shard key decision, and it's the most important design choice you'll make.

A shard key is the attribute used to determine which shard holds a particular row. Think of it like a librarian deciding which shelf a book goes on. The better the system, the faster you find what you need.

Common shard key strategies include range based sharding, hash based sharding, and directory based sharding.

Range based sharding assigns consecutive ranges of the key to each shard. Shard 1 holds user IDs 1 to 1 million. Shard 2 holds 1 million to 2 million. And so on. This makes range queries fast because all the data you need is likely on one shard. But it creates hotspots. If new users are always assigned incrementing IDs, the last shard receives all the writes while earlier shards sit idle. Your database becomes unbalanced despite having multiple machines.

Hash based sharding applies a hash function to the shard key and uses the result to assign a shard. User ID 42 hashes to shard 3. User ID 99 hashes to shard 7. The distribution is uniform. No single shard gets overloaded. But range queries become expensive because you now have to ask every shard and merge the results.

Directory based sharding maintains a lookup table that maps each key to its shard. Want to find user 42? Check the directory. It tells you shard 5. This gives you the most flexibility because you can move data between shards without changing your hashing logic. But the directory itself becomes a new point of failure and a bottleneck if not carefully managed.

Which one should you use?

If your workload is write heavy with uniform access patterns, hash based sharding distributes load evenly. If you need efficient range queries, range based works but watch for hotspots. If your access patterns change over time and you need flexibility, directory based gives you control at the cost of complexity.

Now let's talk about the problems sharding introduces.

The hotspot problem. If your shard key is poorly chosen, one shard gets disproportionately more traffic than others. Imagine sharding a social media app by creation date. All new posts go to the latest shard. That shard melts while the others sit cold. The fix is choosing a shard key that distributes writes evenly, or using a hash function that prevents sequential patterns.

Cross shard queries. In a single database, joining two tables is trivial. In a sharded setup, if the two rows you're joining live on different shards, you now have a distributed join. You query both shards, pull the data into your application layer, and join it there. This is slower and more complex. Which is why many sharded systems denormalize data aggressively to avoid joins altogether.

Resharding. What happens when you need to add a new shard? If you use hash based sharding with a fixed number, adding a shard means rehashing and moving a large percentage of your data. This is expensive and risky. Consistent hashing helps here by minimizing the data that needs to move. Directory based sharding also helps because you just update the lookup table.

Transactions across shards. Traditional databases guarantee ACID within a single node. When data is distributed, a transaction that touches multiple shards cannot use simple row locks. You need distributed transactions, two phase commits, or you redesign your schema so that related data lives on the same shard.

This last point is crucial. Good sharding minimizes cross shard operations. If you're building an e-commerce platform and you shard by user ID, all of a user's orders, cart items, and profile live on the same shard. Most queries for that user are local. No distributed joins. No cross shard transactions. The shard key matches the access pattern.

So when should you shard?

Not early. A single well tuned database with proper indexing and caching can serve millions of requests. Sharding adds operational complexity, debugging difficulty, and migration pain. Shard when you've exhausted vertical scaling and read replicas. Shard when your write volume or dataset size genuinely cannot fit on one machine.

And when you do shard, spend the most time on the shard key. It's the decision that's hardest to undo.

Happy designing