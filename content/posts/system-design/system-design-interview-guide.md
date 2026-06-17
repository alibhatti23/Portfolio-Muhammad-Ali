---
title: The Architecture of Distributed Systems
draft: false
date: 2026-06-11
description: "A complete framework for understanding distributed systems: how to design, reason about, and connect the dots across 27 system design concepts from scaling to sharding to real-world case studies."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - distributed systems
  - system design framework
  - system design guide
  - architecture patterns
  - system design methodology
  - distributed systems design
  - scalable architecture
Author: Ahmad Hassan
---

Distributed systems are not about knowing the right answer. There is no right answer. A real system has 47 tradeoffs and 12 valid architectures. The discipline is in recognizing which tradeoffs matter, and building something that holds together under the constraints that matter most.

The problem is that most people learn these concepts in isolation. You read about load balancing here, caching there, sharding somewhere else. The pieces do not connect.

This article gives you a framework for connecting them. Every section links to a deeper article that covers the topic in full. Read the framework first, then follow the links for the topics you want to understand better.

## The Four-Step Framework

Every system design process follows the same structure, whether you are in an interview room or a design document at work.

**Step 1: Clarify requirements.** Before drawing a single box, define the constraints. What are the scale numbers? How many users? How many requests per second? What is the read-to-write ratio? What are the latency requirements? What are the consistency requirements? Which features are in scope?

You cannot design a system for "a URL shortener" without knowing whether it handles 100 URLs a day or 100 million. The requirements determine the architecture. Define them first.

**Step 2: Define the high-level architecture.** Draw the major components and how data flows between them. Client, load balancer, API servers, database, cache. Do not go into detail yet. Get the skeleton right, then flesh it out.

**Step 3: Dive deep into two or three subsystems.** This is where the real design work happens. Pick the most interesting or challenging parts of the system and design them in detail. Depth in a few areas matters more than shallow coverage of everything.

**Step 4: Identify bottlenecks and tradeoffs.** Every design has weaknesses. The best engineers find them before anyone else does. Point out where the system breaks at scale, where consistency is sacrificed for availability, and what could go wrong.

## Step 1: Clarify Requirements

The fastest way to build the wrong system is to start designing without understanding what you are building.

### Functional Requirements

What does the system need to do? For a URL shortener, the core functions are creating short URLs and redirecting short URLs. For a chat system, they are sending messages, receiving messages, and showing online status.

Write these down. Keep the list short. Three to five core functions. Everything else is a nice-to-have that you should mention but not design for until the core works.

### Non-Functional Requirements

This is where the real design work happens. Non-functional requirements determine your architecture.

- **Scale.** How many users? How many requests per second? How much data? These numbers determine whether you need one server or a distributed system.
- **Read vs. write ratio.** A system that is 99% reads (like a news feed) has a different architecture than one that is 50% writes (like a collaborative document editor). Read-heavy systems benefit from caching. Write-heavy systems need careful sharding and async processing.
- **Latency.** Real-time systems (chat, gaming) need sub-100ms responses. Analytics systems can take seconds. This determines whether you use synchronous database reads or async message queues.
- **Consistency vs. availability.** Do you need every read to return the latest write, or is eventual consistency acceptable? This is the [CAP theorem](/posts/system-design/cap-theorem) tradeoff, and it affects every downstream decision.
- **Durability.** Can you lose data? A banking system cannot. A metrics system that drops a data point occasionally can. This affects replication strategy and acknowledgment models.

If the interviewer does not give you these numbers, estimate them and state your assumptions. "I will assume 10 million daily active users with a 100:1 read-to-write ratio and eventual consistency is acceptable for this feature." If you are designing on your own, define them explicitly before you start.

## Step 2: High-Level Architecture

Start with the simplest architecture that could work. Then add complexity only when the requirements demand it.

### The Baseline

Every web system starts with three components: clients, servers, and a database. Draw a box for each. Add arrows showing the data flow. This is not impressive, but it gives you something to iterate on.

The moment you draw this, questions surface. How do clients find the servers? What happens when one server is not enough? What happens when the database is the bottleneck?

### Adding a Load Balancer

When traffic exceeds what one server can handle, you add more servers. But clients need a single endpoint. That endpoint is a [load balancer](/posts/system-design/load-balancing).

A load balancer sits between clients and your servers. It receives requests and forwards them to a pool of backend servers. It decides which server gets each request using algorithms like round robin, least connections, or consistent hashing.

At this point your architecture looks like: Client → Load Balancer → Server Pool → Database.

### Scaling the Database

A single database becomes the bottleneck. The first solution is usually [caching](/posts/system-design/caching-strategies). Add a cache (Redis or Memcached) in front of the database. Read-through or cache-aside. Now 80% of reads never hit the database.

If writes are the bottleneck, you need [replication](/posts/system-design/replication). A leader-follower setup where one node accepts writes and replicates to followers. Followers serve reads. This works until the write volume exceeds what one leader can handle.

When one leader is not enough, you need [sharding](/posts/system-design/database-sharding). Split the data across multiple database instances based on a shard key. Each shard holds a partition of the data and handles a fraction of the traffic.

### Making It Asynchronous

Synchronous request-response works until it does not. When an operation takes time (sending emails, processing images, updating search indexes), blocking the request thread wastes resources and increases latency.

The solution is [message queues](/posts/system-design/message-queues) and [event-driven architecture](/posts/system-design/event-driven-architecture). The client sends a request, the server publishes an event to a message broker (Kafka, RabbitMQ), and returns immediately. Worker processes consume the event and do the slow work. The client gets notified when the work is done, or polls for the result.

This pattern shows up everywhere. Publishing a video triggers transcoding events. Placing an order triggers payment and fulfillment events. Uploading an image triggers thumbnail generation events. Any operation that does not need to be synchronous should be async.

### Adding Observability

Once your system is distributed, you cannot debug it by reading logs on one server. [Observability](/posts/system-design/observability) is how you understand what is happening. Logs tell you what happened. Metrics tell you how often it happens. Traces tell you where it happened across services.

Add correlation IDs to every request. Emit metrics for every operation (request latency, error rate, queue depth, cache hit rate). Set up alerts for anomalies. If you cannot measure it, you cannot fix it.

## Step 3: Dive Deep

### Data Modeling

Every system starts with [data modeling](/posts/system-design/data-modeling). What entities exist? What are their relationships? How will they be accessed?

Start with the read and write patterns. If you need to look up a user by email frequently, index on email. If you need to fetch a user's recent posts in chronological order, model posts with a composite key (user_id, timestamp) so they cluster together. If you need to count likes on a post, either store the count as a denormalized field or use a separate counter that you update atomically.

Choose between SQL and NoSQL based on the data. If your data is relational (users have posts, posts have comments, comments have authors), use SQL. If your data is document-oriented (each item is self-contained and accessed by ID), NoSQL works. If you need both, use Postgres with JSONB columns.

Denormalize when reads significantly outnumber writes and the query patterns are predictable. A likes count on a post row is denormalization. It is faster to read but you must update it when someone likes or unlikes the post. This is a tradeoff you should mention explicitly.

### Scaling Strategies

How does your system handle growth? [Scaling strategies](/posts/system-design/scaling-strategies) are the answer.

Vertical scaling (making the server bigger) works up to a point. Horizontal scaling (adding more servers) is how distributed systems grow. Stateless application servers scale horizontally easily. Put them behind a load balancer and add more when traffic increases. Stateful components (databases, caches) are harder to scale and need special treatment.

Autoscaling adjusts the number of servers based on load. Define a scaling policy: add servers when CPU exceeds 70%, remove them when it drops below 30%. This prevents over-provisioning (paying for idle servers) and under-provisioning (losing traffic during spikes).

### Load Balancing in Detail

[Load balancers](/posts/system-design/load-balancing) do more than distribute traffic. They handle health checks (remove unhealthy servers from the pool), SSL termination (decrypt HTTPS so backend servers do not have to), and rate limiting (reject traffic that exceeds capacity).

Layer 4 load balancers operate on TCP/UDP. They see source IP, destination IP, and port. Fast, but they cannot route based on HTTP headers or cookies.

Layer 7 load balancers operate on HTTP. They can route based on URL path (/api/* goes to one service, /web/* goes to another), cookies (sticky sessions), and headers (canary deployments). Slower, but more flexible.

For global applications, use DNS-based load balancing (Route 53, Cloudflare) to direct users to the nearest region, then use Layer 4/7 load balancing within each region.

### Caching Strategies

Where you cache matters as much as what you cache.

Client-side caching (browser cache, CDN cache) reduces requests to your infrastructure. [CDN caching](/posts/system-design/cdn-and-edge-computing) puts static assets and cacheable API responses at the edge, closer to users. Application-level caching (Redis, Memcached) sits between your servers and the database. Database-level caching (Postgres shared buffers, MySQL buffer pool) is built into the database.

The [caching strategy](/posts/system-design/caching-strategies) matters. Cache-aside (lazy loading) fills the cache on demand. Write-through updates the cache on every write. Write-back defers cache updates. Each has different consistency and performance characteristics.

Cache invalidation is the hardest problem. Time-based TTLs are simple but can serve stale data. Event-based invalidation is accurate but adds complexity. Choose based on your consistency requirements.

### Database Replication and Sharding

[Replication](/posts/system-design/replication) copies data across multiple servers for availability and read throughput. Leader-follower replication is the most common pattern. The leader handles writes and asynchronously replicates to followers. If the leader fails, a follower is promoted.

Multi-leader replication allows writes to any node and asynchronously synchronizes between leaders. This improves write availability and reduces latency for geographically distributed users, but introduces conflict resolution. Two users updating the same record on different leaders produce a conflict that must be resolved.

[Sharding](/posts/system-design/database-sharding) splits data across multiple database instances. Choose a shard key that distributes data evenly and allows most queries to hit a single shard. Common shard keys include user_id (for user-scoped data), geographic region (for location-based data), and hash of a composite key.

Sharding introduces cross-shard queries (how do you fetch data that spans multiple shards?), resharding (how do you add a shard when the data grows?), and hotspot prevention (what happens when one shard gets all the traffic?). These are the tradeoffs that matter.

### Consistent Hashing

When you need to distribute data or requests across a dynamic set of servers, [consistent hashing](/posts/system-design/consistent-hashing) minimizes redistribution when servers are added or removed.

Traditional hashing (hash(key) % N) remaps all keys when N changes. Consistent hashing places both servers and keys on a hash ring. Each key is owned by the first server clockwise from its hash position. Adding a server only remaps keys between the new server and its predecessor. Removing a server only remaps keys to the next server clockwise.

### API Gateway

An [API gateway](/posts/system-design/api-gateway) is the single entry point for all client requests. It handles authentication, rate limiting, request routing, and response transformation.

In a microservice architecture, the API gateway routes requests to the appropriate service based on the URL path. Clients do not need to know how many services exist or where they run. The gateway abstracts the backend.

In a monolith, the API gateway still provides value. It centralizes cross-cutting concerns like authentication, rate limiting, and logging. Each service does not need to implement these independently.

### Authentication and Authorization

How do users prove who they are and what they are allowed to do? [Authentication and authorization](/posts/system-design/authentication-authorization) are separate concerns.

Authentication verifies identity. Common patterns include JWT tokens for stateless auth, session cookies for stateful auth, and OAuth2 for third-party auth. JWTs are self-contained but cannot be revoked without additional infrastructure. Sessions are revocable but require a session store that must be shared across servers.

Authorization controls access. Role-Based Access Control (RBAC) assigns permissions to roles and roles to users. Attribute-Based Access Control (ABAC) evaluates policies based on user attributes, resource attributes, and environmental conditions. RBAC is simpler. ABAC is more flexible.

### Rate Limiting

[Rate limiting](/posts/system-design/rate-limiting) protects your system from being overwhelmed by a single client, whether malicious or buggy. Token bucket, leaky bucket, fixed window, and sliding window are the common algorithms.

Token bucket allows burst traffic up to the bucket size while maintaining a long-term rate. Leaky bucket smooths traffic into a steady stream. Sliding window log gives the most accurate rate limiting but requires storing every request timestamp.

In distributed systems, rate limiting requires shared state. Redis is commonly used to store counters and timestamps. The tradeoff is latency (every rate limit check is a Redis call) versus accuracy (a local counter on each server undercounts global traffic).

### Search and Indexing

When users need to find content by keywords, not just by ID, you need [search and indexing](/posts/system-design/search-indexing). Full-text search uses inverted indexes that map each term to the documents containing it.

Elasticsearch is the standard choice. It builds inverted indexes, supports complex queries (boolean, fuzzy, geospatial), and scales horizontally. The data flow is: your application writes to the database, a sync process (or Change Data Capture) sends updates to Elasticsearch, and search queries hit Elasticsearch directly.

Index design matters. Which fields to index, which to store, which analyzers to use for text processing. Searching for "running shoes" should find "running shoes" but also "run shoes" and "shoes for running." Analyzers handle stemming, synonym expansion, and tokenization.

### Real-Time Communication

When clients need immediate updates (chat, notifications, live scores), HTTP request-response is not enough. [WebSockets and Server-Sent Events](/posts/system-design/websockets-and-sse) provide persistent connections.

WebSockets provide full-duplex communication. Both client and server can send messages at any time. Use WebSockets for chat, collaborative editing, and gaming.

Server-Sent Events provide server-to-client streaming over HTTP. The client opens a connection and the server pushes updates. Use SSE for notifications, live feeds, and dashboards where the client only needs to receive data.

Scaling persistent connections requires sticky sessions (each client stays connected to the same server) or a pub/sub backbone (each server subscribes to a channel and receives messages for its connected clients). Redis Pub/Sub or a message broker like NATS can serve as the backbone.

### Microservice Architecture

[Microservices](/posts/system-design/microservice-architecture) split a monolith into independently deployable services. Each service owns its data, has its own database, and communicates with other services through APIs or events.

The benefits are independent deployment (one team can deploy without coordinating with others), independent scaling (a service that handles video transcoding can scale without scaling the user service), and technology diversity (each service can use the best language and database for its needs).

The costs are operational complexity (more services means more to monitor, deploy, and debug), network overhead (every service call is a network call with latency and failure modes), data consistency (no foreign keys across services, eventual consistency is the norm), and testing (integration tests must set up multiple services).

### Event-Driven Architecture

[Event-driven architecture](/posts/system-design/event-driven-architecture) decouples services through asynchronous events. A service publishes an event (UserCreated, OrderPlaced, PaymentReceived) to a message broker. Other services subscribe to events they care about and react accordingly.

This pattern enables loose coupling. The order service does not need to know about the analytics service. It publishes OrderPlaced and moves on. The analytics service consumes the event whenever it is ready. Adding a new consumer does not require changes to the producer.

The challenge is event ordering, exactly-once processing, and schema evolution. Kafka provides ordering within a partition but not across partitions. Message acknowledgments and idempotent consumers handle exactly-once semantics. Schema registries manage backward-compatible event schemas.

### Fault Tolerance

[Fault tolerance](/posts/system-design/fault-tolerance) is how your system behaves when parts of it fail. Because parts will fail.

Circuit breakers prevent cascading failures. If a downstream service is failing, stop calling it for a cooldown period. Let it recover instead of hammering it with retries.

Bulkheads isolate failures. If one service consumes all your connection pool, other services should not be affected. Use separate thread pools and connection pools for different downstream services.

Retries with exponential backoff handle transient failures. But not all failures should be retried. A 4xx error (bad request) will fail again. A 503 (service unavailable) is worth retrying. [Rate limiting](/posts/system-design/rate-limiting) on retries prevents retry storms.

Graceful degradation means your system provides reduced but functional service rather than no service. If the recommendation engine is down, show popular items instead. If search is down, show categories. The system stays alive even when components fail.

### Consensus Algorithms

When you have multiple servers that need to agree on a value (who is the leader, what is the current state, which transaction committed first), you need a [consensus algorithm](/posts/system-design/consensus-algorithms).

Raft is the most widely understood consensus algorithm. It elects a leader, the leader appends entries to its log, and followers replicate the log. If the leader fails, followers hold an election and pick a new leader. A majority must agree for any decision to be committed.

Paxos is the theoretical foundation. It is correct but notoriously difficult to understand and implement. Most real systems use Raft or Paxos-derived protocols.

Consensus is expensive. Every decision requires a majority round trip. Use it only when you need it (leader election, configuration changes, distributed transactions). Do not use it for every write in a high-throughput system.

### Distributed Locking

[Distributed locking](/posts/system-design/distributed-locking) coordinates access to shared resources across multiple servers. Only one server should process a job at a time. Only one server should update a counter concurrently.

Redis-based locks (Redlock) are fast but have edge cases around clock drift and failover. Zookeeper-based locks are stronger but slower. Fencing tokens (monotonically increasing values that downgraded servers must check) prevent the most common failure mode: a lock holder that thinks it still holds the lock after it has expired.

The best advice for distributed locking is to avoid it when possible. Use idempotent operations, atomic database operations, and [event-driven architecture](/posts/system-design/event-driven-architecture) to design away the need for locks. If you cannot avoid locks, use fencing tokens and plan for the case where the lock holder crashes.

### ID Generation

Every entity needs a unique identifier. In a distributed system, [ID generation](/posts/system-design/id-generation) cannot rely on a single auto-incrementing counter.

UUIDs are globally unique and require no coordination, but they are 128 bits, random (not time-sortable), and index-unfriendly in B-trees.

Snowflake IDs (Twitter) encode timestamp, datacenter ID, worker ID, and sequence number in a 64-bit integer. They are time-sortable, unique without coordination, and compact. The tradeoff is that they require clock synchronization and a limited number of IDs per millisecond per worker.

ULIDs combine a timestamp with randomness. They are time-sortable like Snowflakes but simpler to generate. They encode as 26 characters (vs. UUID's 36) and are becoming popular as a modern alternative.

### CDN and Edge Computing

A [CDN](/posts/system-design/cdn-and-edge-computing) caches content at edge locations around the world. When a user in Tokyo requests an image hosted in Virginia, the CDN serves it from a node in Tokyo instead of crossing the Pacific.

Static assets (images, CSS, JS) are the simplest to cache. Set a long TTL and let the CDN handle it. Dynamic content (API responses, HTML) requires shorter TTLs and careful cache invalidation.

Edge computing moves computation to CDN nodes. Workers at the edge can run authentication checks, A/B test routing, and personalization without calling the origin server. This reduces latency and origin load.

Cache invalidation strategies include TTL expiration (simplest, but serves stale data), purge APIs (CDN-specific endpoints to clear cached content), and versioned URLs (/assets/app.js?v=2 where a new version gets a new URL and the old one ages out).

## Step 4: Bottlenecks and Tradeoffs

This is where senior engineers separate from junior ones. After designing the system, identify its weaknesses.

**Single points of failure.** Is there one component whose failure takes down the entire system? The database leader, the load balancer, the message queue. Add redundancy.

**Scalability limits.** Where does the system break at 10x scale? Can the database handle 10x writes? Can the cache handle 10x reads? Can the message queue handle 10x events? Mention [sharding](/posts/system-design/database-sharding) and [partitioning](/posts/system-design/database-sharding) as solutions.

**Consistency vs. availability.** Where does the system sacrifice [CAP theorem](/posts/system-design/cap-theorem) guarantees? If you use asynchronous replication, the followers are eventually consistent. If a network partition separates the leader from followers, you must choose between consistency (reject writes) and availability (accept writes that may conflict).

**Latency bottlenecks.** Which operations are slow? Database joins on large tables, cross-service calls, synchronous writes to multiple systems. Solutions include [caching](/posts/system-design/caching-strategies), [event-driven architecture](/posts/system-design/event-driven-architecture), and denormalization.

**Operational concerns.** How do you deploy without downtime? How do you roll back a bad deployment? How do you monitor the system? How do you handle schema migrations? [Observability](/posts/system-design/observability) is not optional.

## Case Studies: Applying the Framework

The best way to internalize these concepts is to see them applied to real systems. These case studies walk through actual architectures and the decisions behind them.

**[How WhatsApp Handles Billions of Messages](/posts/system-design/case-study-whatsapp)** demonstrates extreme efficiency. 55 engineers serving 2 billion users. The system relies on Erlang's BEAM VM for lightweight concurrency, a Comet architecture for push notifications, and careful message ordering guarantees. It shows that simplicity at scale often beats complexity.

**[How Netflix Streams Without Downtime](/posts/system-design/case-study-netflix)** is a masterclass in [fault tolerance](/posts/system-design/fault-tolerance). Chaos engineering, circuit breakers, fallbacks, and regional failover keep 250 million users streaming even when datacenters go down. The system treats failure as a constant, not an exception.

**[How Uber Matches Riders and Drivers in Real Time](/posts/system-design/case-study-uber)** tackles geospatial matching at scale. Geohashing for indexing driver locations, a dispatch system that matches within seconds, [event-driven architecture](/posts/system-design/event-driven-architecture) for trip lifecycle, and surge pricing based on real-time supply and demand. The system balances consistency (you cannot assign the same driver to two riders) with availability (drivers and riders should always see up-to-date information).

**[How YouTube Serves Billions of Videos](/posts/system-design/case-study-youtube)** shows how [CDNs](/posts/system-design/cdn-and-edge-computing) and distributed storage handle the largest video platform on Earth. Adaptive bitrate streaming, intelligent caching tiers, and recommendation pipelines that personalize content for 2 billion users. The system optimizes for read-heavy access patterns with aggressive caching.

**[How Airbnb Searches Millions of Listings](/posts/system-design/case-study-airbnb)** covers full-text search, geospatial filtering, and the challenge of ranking results by relevance and price. N-gram indexing for typo tolerance, Kubernetes migration for microservice orchestration, and payment orchestration across 220 countries and 50 currencies. The system balances consistency (listings must be accurate) with availability (search must always work).

## The Cheat Sheet

| If you need to understand | Read this |
|---|---|
| How to distribute traffic | [Load Balancing](/posts/system-design/load-balancing) |
| How to handle more users | [Scaling Strategies](/posts/system-design/scaling-strategies) |
| How to reduce database load | [Caching Strategies](/posts/system-design/caching-strategies) |
| How to make data available across regions | [Database Replication](/posts/system-design/replication) |
| How to split a growing database | [Database Sharding](/posts/system-design/database-sharding) |
| How to avoid rehashing when servers change | [Consistent Hashing](/posts/system-design/consistent-hashing) |
| How to route requests to services | [API Gateway](/posts/system-design/api-gateway) |
| How to handle slow operations | [Message Queues](/posts/system-design/message-queues), [Event-Driven Architecture](/posts/system-design/event-driven-architecture) |
| How to keep the system alive when things break | [Fault Tolerance](/posts/system-design/fault-tolerance) |
| How to prevent abuse | [Rate Limiting](/posts/system-design/rate-limiting) |
| How to verify identity and control access | [Authentication & Authorization](/posts/system-design/authentication-authorization) |
| How to make servers agree on truth | [Consensus Algorithms](/posts/system-design/consensus-algorithms) |
| How to coordinate across servers | [Distributed Locking](/posts/system-design/distributed-locking) |
| How to generate unique IDs | [ID Generation](/posts/system-design/id-generation) |
| How to search fast | [Search and Indexing](/posts/system-design/search-indexing) |
| How to push updates to clients | [WebSockets and SSE](/posts/system-design/websockets-and-sse) |
| How to structure your services | [Microservice Architecture](/posts/system-design/microservice-architecture) |
| How to design your data | [Data Modeling](/posts/system-design/data-modeling) |
| How to understand your system | [Observability](/posts/system-design/observability) |
| How to serve content globally | [CDN and Edge Computing](/posts/system-design/cdn-and-edge-computing) |
| How to handle network partitions | [CAP Theorem](/posts/system-design/cap-theorem) |
| How WhatsApp does it | [Case Study: WhatsApp](/posts/system-design/case-study-whatsapp) |
| How Netflix does it | [Case Study: Netflix](/posts/system-design/case-study-netflix) |
| How Uber does it | [Case Study: Uber](/posts/system-design/case-study-uber) |
| How YouTube does it | [Case Study: YouTube](/posts/system-design/case-study-youtube) |
| How Airbnb does it | [Case Study: Airbnb](/posts/system-design/case-study-airbnb) |

## How to Practice

Reading is not enough. You need to design systems under time pressure.

**Pick a system.** Twitter, Instagram, Google Drive, a parking lot management system, an elevator control system. Any system with non-trivial requirements works.

**Set a timer for 45 minutes.** This forces you to prioritize and make tradeoffs under constraint, the same pressure you face in a real design session.

**Follow the framework.** Requirements (5 min), high-level design (10 min), deep dive (20 min), bottlenecks and tradeoffs (10 min). The time allocations are approximate. Adjust based on the problem.

**Review your design.** Where are the bottlenecks? What happens at 100x scale? Where does consistency break? What happens when a component fails? These are the questions that separate a working design from a fragile one.

**Study real systems.** The five case studies in this guide are real architectures solving real problems. Read them not for the specific technologies but for the decision patterns. Every choice has a reason. Understanding the reason matters more than remembering the technology.

The best system design is not a checklist. It is a conversation between requirements and constraints, between what you need and what you can afford. Every tradeoff is a decision. Every decision has consequences. Understanding those consequences is what makes you a systems architect.

Happy designing