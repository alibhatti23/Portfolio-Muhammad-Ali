---
title: Scaling Strategies
draft: false
date: 2026-04-01
description: "How systems scale to handle growth - vertical vs horizontal scaling, autoscaling, stateless design, over provisioning, and the architectural decisions that make or break scale."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - scaling strategies
  - horizontal scaling
  - vertical scaling
  - autoscaling
  - stateless architecture
  - load distribution
  - system design scaling
  - scalability patterns
Author: Ahmad Hassan
---

Your application serves 100 users. One server handles it fine. Then it serves 1,000. Still fine. Then 10,000. The server's CPU hits 90%. Response times creep up. Database connections start timing out. You need to do something. That something is scaling.

But scaling is not one thing. It's a set of decisions, each with tradeoffs.

The first decision is the simplest. Do you make the existing machine bigger, or do you add more machines?

Vertical scaling, also called scaling up, means upgrading your server. More CPU cores. More RAM. Faster disks. A 4 core machine becomes an 8 core machine. 16GB RAM becomes 64GB. You keep one machine but make it more powerful.

Vertical scaling is easy. No code changes. No distributed complexity. Your application doesn't need to know that it's running on a bigger box. The database is still one instance. There's no network communication between nodes. No data partitioning. No distributed locks.

But vertical scaling has a ceiling. Hardware has limits. The biggest EC2 instance AWS offers has 448 vCPUs and 6 TB of RAM. That sounds enormous until you're running a popular SaaS platform. And it's expensive. That instance costs over 30 dollars per hour. More importantly, vertical scaling creates a single point of failure. One machine goes down, everything goes down.

Horizontal scaling, also called scaling out, means adding more machines. Instead of one big server, you run many smaller ones. Instead of one database instance, you distribute data across shards. Traffic is spread across multiple nodes.

Horizontal scaling is harder. Your application must handle multiple instances. Sessions must be shared or stateless. Databases must be partitioned or replicated. Deployments become more complex. Monitoring becomes more distributed. But the reward is near infinite scalability. You can add more machines as needed. A failure takes down one node, not the entire system.

Most real systems use both. Scale vertically until you hit economic or hardware limits. Then scale horizontally.

But here's the architectural principle that makes horizontal scaling possible or impossible. Statelessness.

A stateless application doesn't store any client specific data on the server itself. No session files on disk. No in memory caches that depend on a specific instance. Any request can be served by any instance. This means a load balancer can distribute traffic freely without worrying about which server holds a user's state.

If your application stores session data on the server, you have a problem. User A logs in on server 1. Their session is stored in server 1's memory. Their next request hits server 2. Server 2 doesn't know who they are. You have two options. Use sticky sessions, where the load balancer always sends User A to server 1. This works but limits your load balancing options and makes it harder to drain a server for maintenance. Or move session state out of the server entirely into a shared store like Redis. Every server can read and write sessions from Redis. Any server can serve any user.

Stateless design is the foundation of horizontal scaling. If your application stores state on the server, you are bound to that server. If your application is stateless, you are free to scale in any direction.

Now let's talk about when to scale. Not how. When.

You could wait until your servers are overwhelmed and then scale. This is reactive scaling. It works if your traffic grows slowly and predictably. But when traffic spikes suddenly, reactive scaling is too slow. By the time new instances are provisioned and ready, the spike has already degraded your service.

Autoscaling addresses this. You define rules. If CPU exceeds 70% for 5 minutes, add 2 more instances. If CPU stays below 30% for 15 minutes, remove 2 instances. The system scales automatically based on load.

Autoscaling works well for web servers and stateless compute. It's harder for databases. Adding a new database replica isn't instant. It needs to catch up on replication first. Adding a new shard requires data rebalancing. This is why database scaling is usually planned and manual, while compute scaling is automated.

Over provisioning is the conservative alternative. You provision enough capacity to handle 2x your expected peak load. You pay for idle resources most of the time, but you never run out of capacity during a spike. This is common for systems where downtime has a high cost. Financial platforms, healthcare systems, large e commerce during sales events. The bill is higher but the risk of degraded performance during unexpected traffic is eliminated.

A hybrid approach is common in practice. Over provision your baseline capacity to handle normal traffic with comfortable headroom. Use autoscaling for the elastic layer that responds to spikes.

Database scaling deserves its own attention because it's usually the bottleneck.

Read scaling is solved by replication. Add read replicas. Direct read queries to replicas. The primary handles only writes. Most applications have a high read to write ratio, often 10 to 1 or more. Adding replicas can increase read capacity nearly linearly.

Write scaling is harder. You can't simply add replicas because writes must go through the primary. Sharding distributes the write load across multiple primaries, each responsible for a subset of data. We covered sharding in detail earlier. The key point is that write scaling requires you to partition your data intelligently.

Connection pooling is another scaling technique that doesn't get enough attention. Every database connection consumes memory and CPU on the database server. A server with 10,000 concurrent connections spends more time managing connections than executing queries. A connection pooler like PgBouncer sits between your application and the database. It maintains a small number of persistent connections to the database and multiplexes thousands of application connections over them. The database sees 50 connections. The application thinks it has 5,000.

Caching is arguably the most effective scaling technique because it eliminates work entirely. A request served from cache never reaches your application or database. It's handled at the CDN or application cache layer. We covered caching strategies in depth earlier.

The last scaling strategy is often overlooked. Optimize before you scale. A slow query that takes 200ms can often be reduced to 5ms with a proper index. That's a 40x improvement without adding any hardware. Before adding servers, profile your code, optimize your queries, and reduce unnecessary work. Scaling inefficient code just means you're paying for more servers to run bad code.

Scaling is not a single decision. It's a progression. Start with vertical scaling and optimization. Add caching and read replicas. Move to horizontal scaling with stateless design. Add autoscaling for elasticity. Shard only when you've exhausted simpler options. Each step adds complexity. Each step should be justified by necessity, not ambition.

Happy designing