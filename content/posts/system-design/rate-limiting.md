---
title: Rate Limiting
draft: false
date: 2026-03-20
description: "How rate limiting protects systems from abuse - token bucket, leaky bucket, sliding window, fixed window, and distributed rate limiting for production APIs."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - rate limiting
  - token bucket algorithm
  - leaky bucket algorithm
  - sliding window rate limiting
  - API throttling
  - distributed rate limiting
  - request limiting
  - system design fundamentals
Author: Ahmad Hassan
---

Your API handles 100 requests per second comfortably. A user writes a script that sends 10,000 requests per second. Your servers crawl. Legitimate users get timeouts. Your database connection pool exhausts. The entire system degrades because of one bad actor.

This is why rate limiting exists. It's not just about preventing abuse. It's about protecting the system from itself. Every resource is finite. Rate limiting ensures no single consumer consumes more than their fair share.

But rate limiting is not one algorithm. It's a family of them. And choosing the wrong one can mean the difference between smooth traffic and a jerky user experience.

Let's start with the simplest approach: fixed window.

You define a time window, say one minute, and a limit, say 100 requests. When a request arrives, you check how many requests the user has made in the current minute. If it's under 100, you allow it and increment the counter. If it's at 100, you reject it. At the start of the next minute, the counter resets.

Simple to implement. Easy to reason about. But it has a well known flaw. A user who sends 100 requests in the last second of minute one and 100 requests in the first second of minute two has sent 200 requests in two seconds. The actual peak rate is 2x the configured limit. This burst at the boundary is called the fixed window edge case.

Next comes the sliding window log. Instead of a counter per minute, you store a timestamp for every request. When a new request arrives, you count how many timestamps exist in the last 60 seconds. If under 100, allow it and add a new timestamp. If at 100, reject it.

This solves the boundary problem. The window slides continuously, so there's no burst at the edges. The actual rate never exceeds the configured limit. But memory usage scales with the number of requests. If a user makes 100 requests per minute, you store 100 timestamps per minute per user. For millions of users, this adds up.

A more memory efficient approach is sliding window counter. You combine fixed window counters with a weighted average. You keep two counters: the current window and the previous window. When a request arrives at time T, you estimate the count as: current window count plus previous window count multiplied by the overlap ratio. This approximates the sliding window behavior without storing individual timestamps.

The math is straightforward. If the current time is 30% through the current window, the previous window contributes 70% of its count. If the previous window had 80 requests and the current window has 30, the estimated rate is 80 times 0.7 plus 30, which is 86. Under the limit, so the request is allowed.

This gives you smooth rate limiting with fixed size counters. No per request storage. Most production systems use this approach.

Now the two bucket algorithms.

Token bucket. Imagine a bucket that holds tokens. Tokens are added at a constant rate, say 10 per second. The bucket has a maximum capacity, say 100. When a request arrives, the system checks if there's a token in the bucket. If yes, remove one token and allow the request. If no tokens are available, reject the request.

Token bucket allows bursts. If a user hasn't made any requests for a while, the bucket fills up to capacity. Then they can make 100 requests instantly, one per token. This is desirable for user facing APIs where you want to allow brief bursts of activity like refreshing a page multiple times.

The key parameters are the refill rate, which determines the sustained throughput, and the bucket size, which determines the maximum burst.

Leaky bucket. Imagine a bucket with a hole at the bottom. Requests pour in at variable rates. They trickle out at a constant rate. If the bucket overflows, new requests are rejected. The leaky bucket smooths traffic into a steady outflow regardless of how bursty the inbound traffic is.

Leaky bucket does not allow bursts. It enforces a strict uniform rate. This is useful for systems that need tightly controlled throughput, like payment processing or integrations with third party APIs that have hard rate limits.

So which one do you pick?

If you want to allow short bursts while maintaining a long term rate, token bucket. If you want to smooth out traffic into a constant rate, leaky bucket. If you want a simple counter per time window and can tolerate edge bursts, fixed window. If you need accuracy without per request memory, sliding window counter.

Now the real challenge: distributed rate limiting.

Single server rate limiting is trivial. A counter in memory. Every request hits the same counter. But in production, you have multiple servers behind a load balancer. Request 1 goes to server A. Request 2 goes to server B. Their counters are separate. A user can send 100 requests to server A and 100 to server B, totaling 200, while the limit is 100.

To solve this, you need a shared counter. Redis is the most common choice. Every server increments a Redis key on each request and reads the current count before deciding whether to allow the request. This works but introduces a Redis round trip on every request. For high throughput APIs, this latency matters.

Two optimizations. First, use Redis pipelining or Lua scripts to make the increment and check atomic. Without atomicity, two servers could read the same count, both decide to allow the request, and both increment simultaneously, exceeding the limit by one. Second, consider local caching with periodic sync. Each server maintains a local counter and syncs with Redis every N milliseconds or every M requests. This reduces Redis load at the cost of slight over allowance.

There's also the question of what you rate limit by. Per user is the most common. Per IP is simpler but breaks for users behind NAT or corporate proxies. Per API key gives you more control. Per endpoint is useful when some endpoints are more expensive than others. Most production systems combine multiple dimensions.

What should the response be when a rate limit is hit?

The standard approach is to return HTTP 429 Too Many Requests along with headers telling the client when they can retry. The Retry After header specifies how many seconds to wait. The RateLimit Remaining header shows how many requests are left in the current window. These headers make rate limiting transparent and allow well behaved clients to back off gracefully.

Rate limiting is not optional in production. Without it, a single misbehaving client or a sudden traffic spike can take down your entire system. With it, you enforce fairness, protect resources, and maintain a good experience for the majority of users even when demand exceeds capacity.

Happy designing