---
title: Fault Tolerance and Resilience
draft: false
date: 2026-04-13
description: "How systems stay alive when things break - circuit breakers, bulkheads, retries with backoff, graceful degradation, and the engineering discipline of chaos testing."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - fault tolerance
  - circuit breaker pattern
  - bulkhead pattern
  - retry with exponential backoff
  - graceful degradation
  - chaos engineering
  - resilience patterns
  - system design fundamentals
Author: Ahmad Hassan
---

Your payment service goes down. Your checkout page makes a synchronous call to the payment service. The call hangs. The thread pool fills up with waiting connections. No more threads available. The checkout service becomes unresponsive. Users can't even browse products now. A failure in one service cascaded to bring down another.

This is a cascading failure. And it's the most dangerous type of failure in distributed systems because it turns a small problem into a system wide outage.

Fault tolerance is the discipline of designing systems that continue operating, possibly at reduced capacity, even when components fail. Resilience is the ability to recover quickly from failures. Together, they ensure that partial failures don't become total failures.

Let's start with the circuit breaker pattern.

A circuit breaker monitors calls to an external service. When everything is normal, the circuit is closed. Requests flow through. When failures exceed a threshold, the circuit opens. Requests to the failing service are immediately rejected without attempting the call. After a timeout period, the circuit enters a half open state. A limited number of requests are allowed through as a test. If they succeed, the circuit closes and normal traffic resumes. If they fail, the circuit opens again.

This is exactly how electrical circuit breakers work. Too much current and the breaker trips. The circuit is broken. Power is cut. No fire.

In software, the circuit breaker serves two purposes. It prevents the caller from wasting resources on a service that's already known to be failing. No more threads waiting on timeouts. No more connection pool exhaustion. And it gives the failing service time to recover. Without a circuit breaker, the failing service continues receiving requests it can't handle, making recovery slower.

Implementation details matter. The failure threshold should be based on a rolling window, not a fixed count. "5 failures in the last 60 seconds" is better than "5 total failures." A single slow service shouldn't trip the circuit. Consider using a slow call threshold alongside the failure threshold. Define what counts as a failure carefully. A 4xx response is not a failure. A timeout or a 5xx is.

Next, the bulkhead pattern.

Ships have watertight compartments called bulkheads. If the hull is breached, water fills one compartment. The ship stays afloat because the other compartments are sealed. The damage is contained.

In software, a bulkhead isolates resources so that a failure in one part of the system doesn't consume resources needed by another. The most common form is thread pool isolation. Service A has separate thread pools for calls to Service B and Service C. If Service B becomes slow, the threads calling Service B fill up. But the threads for Service C remain available. Service C continues working normally.

Without bulkheads, a slow downstream service ties up threads that are shared across all calls. One slow service degrades everything. With bulkheads, the impact is contained to the calls that depend on the failing service.

Connection pool isolation works the same way. Instead of one connection pool shared across all downstream services, each service gets its own pool. A slow target can't steal connections from a healthy one.

Now let's talk about retries.

A request fails. Should you retry? Maybe. Not all failures deserve retries. A 400 Bad Request means the request is invalid. Retrying the same invalid request will produce the same 400. A 404 Not Found means the resource doesn't exist. Retrying won't create it. Retries are appropriate for transient failures. Network timeouts. 503 Service Unavailable. 429 Too Many Requests. These are situations where the underlying problem may resolve itself.

But retries must be done carefully. The most important rule is exponential backoff with jitter. After the first failure, wait 100ms. After the second, wait 200ms. Then 400ms. Then 800ms. This prevents a thundering herd where all retries fire at the same time, overwhelming the service you're trying to let recover.

Add jitter to the backoff. Instead of exactly 200ms, wait 200ms plus a random amount between 0ms and 100ms. This spreads out the retries so they don't all land simultaneously. Without jitter, synchronized retry storms can keep a recovering service pinned down.

Set a maximum number of retries. Three is common. After three failures, give up. The caller can then fall back to an alternative or return an error.

Timeouts deserve their own mention because they're often set incorrectly. A timeout that's too short kills legitimate slow responses. A timeout that's too long wastes resources on requests that will never succeed. Set timeouts based on observed percentiles. If your 99th percentile response time is 2 seconds, a 5 second timeout gives headroom without being wasteful. A 30 second timeout means your system will wait 30 seconds before giving up on a failing call. That's 30 seconds of wasted resources.

Connect timeout and read timeout serve different purposes. A connect timeout of 2 seconds means you won't wait longer than 2 seconds to establish a connection. A read timeout of 5 seconds means once connected, you'll wait up to 5 seconds for a response. Set both. Many teams set only read timeouts and then wonder why their system hangs when the network is slow.

Graceful degradation is the practice of providing reduced but still useful functionality when a dependency fails. If the recommendation service is down, show popular items instead of personalized recommendations. If the review service is down, show the product page without reviews. If the payment service is down, allow users to place orders that will be processed later.

The alternative is hard failure. The recommendation service goes down and the entire product page fails to load. No products, no prices, nothing. Hard failure is easier to implement but creates a terrible user experience. Graceful degradation requires more thought but keeps the core experience alive even when peripherals fail.

The key to graceful degradation is identifying which features are essential and which are nice to have. The product page must show the product. Reviews are nice but not critical. Recommendations are nice but not critical. Design your system so that essential features have fallbacks and non essential features can be skipped without breaking the page.

Chaos engineering is the practice of deliberately introducing failures into your system to verify that it handles them correctly. You don't wait for a production outage to discover that your circuit breaker is misconfigured. You intentionally kill a service in staging and watch what happens. Does the circuit breaker trip? Does the fallback work? Does the system degrade gracefully or does it cascade?

The most famous chaos engineering tool is Netflix's Chaos Monkey, which randomly terminates instances in production. The philosophy is that if you're not testing your resilience in production, you're assuming your resilience works. Assumptions break at the worst times.

Start small. Kill a non critical service in staging. Watch the system degrade. Verify that monitoring detects the failure. Verify that alerts fire. Verify that the user experience remains acceptable. Then gradually increase the blast radius. Kill a database replica. Introduce network latency. Drop packets between services. Each experiment teaches you something about your system's behavior under stress.

Fault tolerance is not about preventing failures. Failures are inevitable. Networking will fail. Hardware will fail. Software will have bugs. The question is not whether your system will experience failures. It will. The question is whether a partial failure stays partial or cascades into a total outage. Circuit breakers, bulkheads, retries with backoff, timeouts, graceful degradation, and chaos testing are the tools that keep partial failures partial.

Happy designing