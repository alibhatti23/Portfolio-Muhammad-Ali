---
title: API Gateway
draft: false
date: 2026-03-05
description: "Why every large system needs an API gateway - request routing, authentication offloading, rate limiting, and how the gateway pattern simplifies microservice architecture."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - API gateway pattern
  - request routing
  - authentication offloading
  - rate limiting
  - microservices gateway
  - reverse proxy vs API gateway
  - throttling
  - system design fundamentals
Author: Ahmad Hassan
---

You have ten microservices. Each has its own URL, its own authentication logic, its own rate limiting. Your frontend team needs to know all ten URLs. Your mobile app needs to call ten different endpoints. When a service changes its address, every client breaks.

Now imagine your system grows to fifty services. Then a hundred. The frontend is now managing a web of direct connections. Authentication is duplicated across every service. Rate limiting is inconsistent. Logging is scattered. Monitoring is a nightmare.

You need a front door. One entry point. One place to enforce rules. One place to route traffic.

That's an API gateway.

An API gateway sits between clients and your backend services. Every client request hits the gateway first. The gateway validates the request, applies policies, and forwards it to the appropriate service. The client never talks to services directly. The client only knows about the gateway.

Let's walk through what the gateway actually does.

Request routing. The gateway receives a request to `/api/users/42/profile`. It looks at the path and routes it to the User Service. Another request hits `/api/orders`. The gateway sends it to the Order Service. The client doesn't need to know which service handles what. The gateway owns the routing map. When a service changes its internal address, only the gateway config needs updating. Zero impact on clients.

Authentication and authorization. Instead of every service verifying JWTs, checking API keys, or validating OAuth tokens, the gateway does it once. Valid requests pass through. Invalid ones get rejected at the door with a 401 or 403. Services behind the gateway can trust that incoming requests are already authenticated. This eliminates duplication and reduces the attack surface.

Rate limiting and throttling. The gateway tracks how many requests each client makes. If a client exceeds 100 requests per minute, the gateway returns 429 Too Many Requests. This protects your services from abuse, accidental or intentional. Without a gateway, every service implements its own rate limiting with its own rules. Inconsistent and fragile.

Request transformation. The gateway can modify requests before forwarding them. Strip unnecessary headers. Convert protocols. Transform JSON to XML for a legacy service. Aggregate multiple service calls into a single response for mobile clients that need a tailored payload.

Response caching. For data that doesn't change often, the gateway can cache responses and serve them without hitting the backend at all. Product catalogs, configuration data, public user profiles. The first request reaches the service. Subsequent requests get the cached response. Your database sees less traffic.

Logging and monitoring. Every request passes through one place. This makes logging centralized. You can track latency, error rates, and traffic patterns without instrumenting every service individually. Anomalies become visible immediately.

But the gateway is not a free lunch.

It adds latency. Every request now makes an extra hop. The latency is usually minimal, a few milliseconds, but it exists. For latency critical systems, this matters.

It's a single point of failure. If the gateway goes down, everything goes down. This is why production gateways run in clusters behind load balancers. High availability is not optional for the gateway. It's essential.

It can become a bottleneck. All traffic flows through one system. If the gateway cannot handle the throughput, it degrades the entire application. Horizontal scaling, efficient routing logic, and connection pooling help mitigate this.

It can become a dumping ground. Because every request passes through the gateway, there's a temptation to put business logic there. Don't. The gateway should handle cross cutting infrastructure concerns. Routing, auth, rate limiting, logging. If you start adding business logic, you've created a distributed monolith. The gateway becomes a second application that's hard to test, deploy, and scale independently.

Now you might ask, isn't an API gateway just a reverse proxy?

They share similarities. Both sit between clients and servers. Both forward requests. But a reverse proxy is infrastructure focused. It handles load balancing, TLS termination, and basic routing. An API gateway is application focused. It understands your business domain, applies application level policies like auth and rate limiting, and can transform requests and aggregate responses.

In practice, many systems use both. A load balancer handles L4 traffic at the edge. An API gateway handles L7 application logic behind it.

When should you use an API gateway?

As soon as you have more than a handful of services that clients need to talk to. The moment you find yourself duplicating auth code, maintaining inconsistent rate limits, or struggling to track request flows across services, you need a gateway.

For small systems with one or two services, direct calls work fine. The gateway pattern shines at scale. It turns a tangled web of client to-service connections into a clean star topology with the gateway at the center.

Think of it this way. Without a gateway, every client must be smarter. It must know about every service, handle authentication, manage retries, and deal with failures. With a gateway, clients stay simple. They talk to one endpoint and trust that the infrastructure handles the rest.

Happy designing