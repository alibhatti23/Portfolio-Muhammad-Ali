---
title: Observability in Distributed Systems
draft: false
date: 2026-04-10
description: "How to understand what your distributed system is actually doing - the three pillars of observability, correlation IDs, service meshes, and why logs alone are not enough."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - observability distributed systems
  - metrics logs traces
  - three pillars observability
  - correlation IDs
  - distributed tracing
  - service mesh monitoring
  - system design fundamentals
Author: Ahmad Hassan
---

A user reports that the checkout page is slow. You open your monitoring dashboard. CPU is fine. Memory is fine. Request latency shows a bump. But which service caused it? The request passed through the API gateway, the auth service, the cart service, the pricing service, the inventory service, and the payment service. One of them is slow. Which one?

In a monolith, you have one log. You search it. You find the slow function. Problem solved in minutes.

In a distributed system, you have five logs. Each has hundreds of entries per second. The request is identified differently in each service. User ID in one, session token in another, internal request ID in a third. You spend hours grep through log files trying to reconstruct the path of a single request.

This is the observability problem. In a distributed system, no single point has the full picture. You need a way to understand the behavior of the entire system from the outside, without needing to add more logging or restart services.

The standard framework is the three pillars. Metrics, logs, and traces.

Metrics are numeric measurements collected at regular intervals. CPU usage, request count, error rate, latency percentiles, memory consumption. Metrics are cheap to collect and store. They tell you what is happening and when. A spike in error rate tells you something went wrong. A gradual increase in latency tells you something is degrading. Metrics are your first signal. They tell you there's a problem.

But metrics don't tell you why. For that, you need logs.

Logs are discrete events recorded by your application. "User 42 attempted checkout. Cart service returned 500. Retrying." Logs are detailed. They contain context that metrics don't. The user ID, the request payload, the error message, the stack trace. When metrics tell you error rate spiked at 3pm, logs tell you why. You search for errors around 3pm, filter by the relevant service, and find the specific failure.

But logs have a scale problem. A single service generating 100 log lines per second across 50 instances produces 300 million lines per day. Searching through that is slow and expensive. Structured logging helps. Instead of freeform text, emit JSON with consistent fields. Timestamp, service name, log level, trace ID, and a message. This makes logs machine searchable. You can filter by service, trace ID, error level, or any custom field.

Even with structured logs, correlating events across services is painful without a critical tool. The correlation ID, also called trace ID or request ID.

When a request enters your system, generate a unique ID. Pass that ID to every service the request touches. Every log line, every metric tag, every trace span includes that ID. Now you can search all your logs for a single correlation ID and reconstruct the entire journey of one request across all services. Without correlation IDs, debugging distributed systems is like trying to read a book where every page is scattered in a different library.

Now traces. A trace represents the full journey of a request through your system. It starts when the request enters at the API gateway and ends when the response is returned. Along the way, it records every service the request visited, how long each service took, and whether each call succeeded or failed.

Each segment of a trace is called a span. A span records the service name, the start time, the duration, and metadata about what happened. Spans are nested. The root span is the entire request. Child spans represent calls to downstream services. A single trace might look like: API gateway received request at t0, auth service responded at t1, cart service responded at t2, pricing service timed out at t3.

With traces, you can see exactly where time is spent. If a request takes 500ms and 450ms is in the pricing service, you don't need to guess. The trace shows you. Distributed tracing tools like Jaeger, Zipkin, and AWS X-Ray visualize this as a waterfall chart where each bar is a span.

The way traces and spans connect across services is through context propagation. When service A calls service B, it includes the trace ID and span ID in the request headers. Service B creates a new child span for its work and passes the context along when it calls service C. This chaining is what makes the full trace possible.

So how do the three pillars work together?

Metrics tell you something is wrong. Latency is up. Error rate spiked. Queue depth is growing.

Traces tell you where. The pricing service is the bottleneck. The payment service is failing. The inventory lookup is taking 2 seconds.

Logs tell you why. The pricing service is querying an external API that's timing out. The payment service received an invalid payload. The inventory database is missing an index on the SKU column.

You need all three. Metrics without traces tell you the system is slow but not where. Traces without logs tell you where but not why. Logs without correlation IDs tell you why but not for which request.

Adding observability to a system is not an afterthought. It must be designed in from the beginning. Every service receives a correlation ID from its caller and passes it along. Every service emits structured logs with the correlation ID. Every service exports metrics to a centralized time series database like Prometheus. Every service sends spans to a distributed tracing backend.

Service meshes add observability at the infrastructure level. A service mesh like Istio or Linkerd sits between your services and handles all network communication. Because it sees every request, it can automatically collect metrics, traces, and logs without your application code doing anything. Service meshes also provide traffic management, security, and reliability features like automatic retries and circuit breaking. The tradeoff is complexity. Running a service mesh is a significant operational burden.

Some practical guidelines for building observable systems.

Use red, green, or amber metrics. For every service, define four key metrics. Request rate, error rate, duration, and saturation. If request rate is increasing, you have more traffic. If error rate is increasing, something is broken. If duration is increasing, something is slow. If saturation is increasing, you're running out of resources. These four metrics give you a quick health check on any service.

Set alerting on symptoms, not causes. Alert on error rate exceeding 1% for 5 minutes, not on CPU exceeding 80%. The CPU might be high for a valid reason. The error rate tells you the user experience is degraded. That's what matters.

Log at the right level. Info for normal operations. Warning for things that might become problems. Error for things that are problems. Debug for development. In production, info level is usually sufficient. Too much logging creates noise and costs money.

Make your dashboards tell a story. A dashboard with 30 charts is hard to read. A dashboard with 4 key charts that tell you if the system is healthy or not is far more useful. Drill down charts can live on separate dashboards.

Observability is not about collecting more data. It's about collecting the right data and making it easy to find and understand. In a monolith, you can ssh into the server and watch logs. In a distributed system, you're blind without proper observability. Design it in from day one or you'll be debugging production issues by staring at logs for hours with no way to trace a request across services.

Happy designing