---
title: Load Balancing
draft: false
date: 2026-02-20
description: "How load balancers distribute traffic across servers - algorithms, Layer 4 vs Layer 7, health checks, and real world tradeoffs for system designers."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - load balancing
  - round robin
  - least connections
  - L4 vs L7 load balancing
  - horizontal scaling
  - reverse proxy
  - consistent hashing load balancer
  - system design fundamentals
Author: Ahmad Hassan
---

Imagine a restaurant with one waiter. Ten tables arrive at once. The waiter panics, orders get mixed up, customers leave angry. Now hire three waiters and assign tables evenly. Everything flows.

That's load balancing.

Your application server can handle maybe 10,000 requests per second. Your users are sending 100,000. One server will choke. The answer is not a bigger server. The answer is more servers, and something smart enough to distribute traffic between them.

That something is a load balancer.

A load balancer sits between clients and your servers. Clients talk to one address. The load balancer forwards each request to a healthy backend server based on a strategy. The client never knows which server handled it. That's the whole idea.

So how does it decide where to send each request?

The simplest strategy is round robin. Request 1 goes to server A. Request 2 goes to server B. Request 3 goes to server C. Request 4 goes back to server A. And so on. It's fair in theory. Every server gets the same number of requests. But in practice, not all requests are equal. A request that triggers a heavy database query takes 50x longer than one that returns a cached response. Round robin doesn't care about that. Server A gets flooded with slow requests while server B sits idle.

This brings us to least connections. Instead of distributing equally, the load balancer checks which server currently has the fewest active connections and sends the new request there. This naturally balances load based on real time state, not just a counter. If server A is busy with 200 connections and server B has 50, new traffic goes to B.

Then there's IP hash. The load balancer hashes the client's IP address and maps it to a specific server. The same client always hits the same server. This is useful when you need session affinity, also called sticky sessions. The downside is that if your user distribution is skewed, some servers get more traffic than others regardless of their capacity.

A more sophisticated approach is consistent hashing. Instead of hashing IPs, you hash request attributes like user ID or URL path onto a ring. When a server joins or leaves, only a fraction of requests get remapped. This is critical in systems where cache locality matters, because it minimizes cache misses during scaling events.

Now there's an important distinction most people skip. Layer 4 vs Layer 7 load balancing.

Layer 4 operates at the transport level. It sees IP addresses and port numbers. It makes decisions without looking at the actual content of the request. Fast, simple, but limited. It cannot route based on URL path or headers.

Layer 7 operates at the application level. It reads HTTP headers, cookies, URL paths, and even request bodies. This means you can route `/api/users` to one set of servers and `/api/products` to another. You can do canary deployments. You can A/B test at the infrastructure level. More powerful, but slightly more latency because the balancer must parse the request.

Most production systems use both. A Layer 4 balancer at the edge fronts multiple Layer 7 balancers, which then route to service clusters.

What happens when a server goes down?

Load balancers perform health checks. Every few seconds, they ping each backend server. Maybe a simple TCP connection. Maybe an HTTP request to `/health`. If a server fails the check, the balancer stops sending traffic to it. When it recovers, traffic resumes. This is how you get high availability without manual intervention.

But health checks introduce a subtlety. Between the moment a server crashes and the moment the balancer detects it, some requests will fail. This window is typically a few seconds. Your client code must handle retries.

Another thing people overlook. Load balancers are themselves a single point of failure if you only have one. In real production systems, you run multiple load balancers in an active passive or active active pair. DNS or a virtual IP directs traffic to the healthy balancer. If the primary dies, the secondary takes over in seconds.

Let me give you a practical mental model.

Think of a load balancer as a traffic cop at a busy intersection. Cars arrive from all directions. The cop doesn't let one road get jammed while others sit empty. The cop watches the flow, redirects when needed, and closes off a lane if there's an accident.

When do you need load balancing? As soon as you have more than one server serving the same traffic. Which means as soon as you care about availability. Because a single server will eventually go down, and when it does, your entire system goes down with it.

One last thought. Load balancing is not just about distributing traffic. It's also about abstraction. Your clients never need to know how many servers you have, where they are, or which one is healthy. The load balancer absorbs that complexity. You can add servers, remove servers, upgrade servers, and the client sees nothing but one steady endpoint.

That's the real power. Not fairness. Not speed. Abstraction of complexity.

Happy designing