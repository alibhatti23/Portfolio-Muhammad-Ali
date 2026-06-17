---
title: Caching Strategies
draft: false
date: 2026-02-23
description: "How caching works in distributed systems - cache aside, write through, write back, eviction policies, and when each strategy saves you from a database meltdown."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - caching strategies
  - cache aside pattern
  - write through cache
  - write back cache
  - LRU eviction policy
  - CDN caching
  - distributed cache design
  - Redis Memcached
Author: Ahmad Hassan
---

Your database can handle 5,000 queries per second. Your users are sending 50,000. Most of those queries are asking for the same data over and over. The product page for that trending item. The user profile that hasn't changed in weeks. The configuration that's identical for every request.

Do you really want to hit the database every time?

Of course not. You cache.

Caching is the act of storing a copy of data in a faster storage layer so that future requests can be served without going back to the source. The source could be a database, an external API, or a file system. The cache is something faster. Usually memory. Redis. Memcached. Even the browser.

But caching is not just "store it and forget it." How you store it, when you update it, and when you throw it away, that's where the real design lives.

Let's start with the most common pattern: cache aside.

In cache aside, the application checks the cache first. If the data is there, serve it immediately. If not, go to the database, fetch the data, write it into the cache, then serve it. The cache sits passively. It doesn't automatically pull data. It only stores what the application explicitly puts in it.

This is simple and reliable. The cache and database are never out of sync on a cache miss because you always fetch fresh data. The downside is that the first request for any piece of data is always slow. You pay the penalty of a cache miss plus a cache write before the data becomes fast.

Cache aside works great for read heavy workloads where data doesn't change often. Product catalogs. User profiles. Configuration values.

Now what happens when data changes?

This is where write strategies come in. The most straightforward is write through. When the application writes data, it writes to both the cache and the database at the same time. Every write goes to the cache first, then the cache synchronously writes to the database. This guarantees consistency. The cache always has the latest data. But writes are slower because you pay the cost of two writes on every update.

For some systems that's fine. Write latency is acceptable because reads stay fast and consistent.

But what if write speed matters more than immediate consistency?

Enter write back, also called write behind. The application writes to the cache only. The cache marks the data as dirty and asynchronously flushes it to the database later. Writes are fast because the application doesn't wait for the database. The risk? If the cache crashes before flushing, that data is gone. You trade durability for speed.

Write back caching is common in scenarios where losing a few seconds of data is acceptable. Analytics pipelines. Session stores. View counters. Not financial transactions.

There's also write around. Data is written directly to the database, bypassing the cache. The cache only gets populated on reads. This prevents the cache from filling up with data nobody reads. It's useful when write patterns are very different from read patterns and you don't want to pollute your cache with rarely accessed data.

So which one do you pick?

If your system reads far more than it writes and data changes slowly, cache aside is your default. If you need reads and writes to both be fast and consistent, write through. If write latency is your bottleneck and you can tolerate small data loss windows, write back. If you're worried about cache pollution from write heavy workloads, write around.

Now let's talk about eviction. Your cache has limited memory. You cannot store everything forever. So which data stays and which gets removed?

Least Recently Used, or LRU, is the most common eviction policy. When the cache is full, remove the item that hasn't been accessed for the longest time. The assumption is that if nobody asked for it recently, nobody will ask for it soon.

Least Frequently Used, or LFU, removes the item with the lowest access count. It sounds similar but behaves differently. An item that was popular last week but completely ignored today will stick around under LFU, even though LRU would have evicted it. LFU is better for data with stable popularity patterns.

First In First Out, or FIFO, is the simplest. Remove the oldest item regardless of usage. Easy to implement but naive. Just because something was cached first doesn't mean it's least useful.

Most production caches use LRU or a variant of it. Redis uses approximate LRU. Memcached uses strict LRU. Choose based on your access patterns.

There's also TTL, time to live. Every cached item gets an expiration timestamp. After that, it's treated as a miss even if it's still in memory. TTL solves a different problem than eviction. Eviction handles memory pressure. TTL handles data freshness. If your data changes every 5 minutes, set a 5 minute TTL. Stale data gets evicted on schedule.

What about caching at different layers?

CDN caching sits at the edge, closest to the user. Static assets like images, CSS, JavaScript files. The browser doesn't even need to reach your servers.

Application level caching sits in your code. Redis or Memcached. Frequently accessed database rows. Computed results like leaderboard rankings. API responses that are expensive to generate but cheap to store.

Database level caching happens inside the database engine itself. PostgreSQL has its own buffer cache. MySQL has the InnoDB buffer pool. You often get this for free but it's worth knowing it exists.

The key insight is this. Caching is not one decision. It's a series of decisions. What do you cache? Where do you cache it? When do you refresh it? When do you throw it away? Every layer of your system can cache. The best systems cache at every layer that makes economic sense.

One warning. Caching introduces a new problem. Cache invalidation. Phil Karlton once said there are only two hard problems in computer science: cache invalidation and naming things. If your cache serves stale data, users see incorrect information. If your cache invalidates too aggressively, your hit rate drops and your database takes the hit.

The simplest invalidation strategy is TTL. Let data expire on its own. The most aggressive is to actively evict cache entries whenever the underlying data changes, often by publishing events through a message queue. Most systems use a combination.

Caching is not a silver bullet. It adds complexity. You now have two sources of truth. You must decide which one to trust. But when your database is drowning and 80% of your traffic is asking for the same 20% of your data, caching is the single most effective lever you can pull.

Happy designing