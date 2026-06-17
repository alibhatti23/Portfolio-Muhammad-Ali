---
title: Message Queues
draft: false
date: 2026-03-17
description: "How message queues decouple systems in production - Kafka, RabbitMQ, delivery guarantees, backpressure, and when async communication saves your architecture."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - message queues
  - Apache Kafka
  - RabbitMQ
  - at least once delivery
  - exactly once delivery
  - backpressure
  - publish subscribe
  - system design fundamentals
Author: Ahmad Hassan
---

A user places an order. Your application needs to process payment, update inventory, send a confirmation email, update analytics, and trigger a fraud check. If the application calls each service directly and synchronously, what happens when the email service is slow? The user waits. What happens when analytics goes down? The whole chain breaks. What happens when traffic spikes on Black Friday? Every service in the chain must handle peak load simultaneously.

The alternative is to decouple. The order service doesn't call anyone directly. It drops a message on a queue and returns immediately. Other services pick up that message when they're ready. Payment processes when it can. Email sends when it can. Analytics catches up when it has capacity.

This is what message queues make possible. They turn synchronous chains into asynchronous pipelines. They decouple producers from consumers. They absorb bursts of traffic. They make failure isolated instead of cascading.

A message queue has a simple shape. Producers write messages to the queue. Consumers read messages from the queue. The queue sits in between, holding messages until consumers are ready. That's the basic model.

But the implementation details matter enormously.

Let's start with delivery guarantees because this is where things get real.

At most once delivery. The message is sent and the queue does not guarantee it was received. If the consumer crashes before processing, the message is lost. Fast but unreliable. Used for telemetry, metrics, and data where a few dropped points don't matter.

At least once delivery. The message is guaranteed to be delivered at least once. If the consumer crashes during processing, the message is redelivered. Reliable but introduces duplicates. The consumer must handle idempotency. If processing a payment twice is a problem, you need deduplication logic.

Exactly once delivery. The message is guaranteed to be delivered one time and processed one time. This is the hardest guarantee to achieve. Kafka supports it through transactions and idempotent producers. It requires coordination between the producer, broker, and consumer. Expensive but necessary for financial systems and anywhere duplicate processing has real consequences.

Most systems choose at least once and handle duplicates in the application layer. It's simpler to reason about and the performance cost is much lower.

Now let's compare the two most popular queue technologies.

RabbitMQ is a traditional message broker. It implements the AMQP protocol. It supports exchanges, queues, bindings, and routing keys. You can route messages based on patterns, headers, or topics. It's great for task queues where each message needs to be delivered to exactly one consumer. It supports acknowledgments so a consumer can say "I processed this" or "I failed, redeliver it." It's well suited for request reply patterns, work distribution, and delayed processing.

RabbitMQ removes messages from the queue once they're acknowledged. This means it doesn't keep history. Once a message is consumed, it's gone. If you need to replay old messages, you need an external store.

Kafka is different. It's a distributed log, not a traditional queue. Producers write messages to topics. Topics are partitioned, and each partition is an ordered, append only log. Consumers read from the log at their own pace. Kafka retains messages for a configurable period, often days or weeks, regardless of whether they've been consumed.

This retention model is powerful. Multiple consumers can read the same topic independently. One consumer processes payments. Another indexes orders into a search database. Another aggregates analytics. They all read from the same stream of events without interfering with each other. If a consumer falls behind, it simply picks up where it left off. No message loss.

Kafka's partition model also gives you natural parallelism. Each partition is consumed by one consumer in a group. With 10 partitions, you can have 10 consumers reading in parallel. Want more throughput? Add partitions and consumers.

The tradeoff is complexity. Kafka is harder to operate than RabbitMQ. It requires ZooKeeper or KRaft for coordination. It needs careful tuning of partitions, replication factor, and retention. It's overkill for simple task queues.

Now let's talk about backpressure.

Your producer is sending 10,000 messages per second. Your consumer can process 1,000 per second. The queue grows. And grows. And grows. Memory fills up. Disk fills up. The system crashes.

This is why backpressure matters. Backpressure is the mechanism by which a slow consumer signals to the producer to slow down. RabbitMQ supports this natively through consumer prefetch limits. A consumer says "I will accept at most N unacknowledged messages at a time." Once it hits that limit, the broker stops delivering until existing messages are acknowledged.

Kafka handles this differently. Since Kafka retains messages, a slow consumer simply falls behind in the log. The broker doesn't push to consumers. Consumers pull. If a consumer is slow, it reads less frequently. The data waits in the log. But if the consumer falls behind the retention window, messages get deleted before they're consumed. That's data loss.

The right approach depends on your system. If you need real time processing and cannot afford to fall behind, apply backpressure at the producer level. Rate limit incoming requests. Drop low priority messages. Shed load rather than letting the queue grow unbounded.

When should you use a message queue?

When your system has producers and consumers with different throughput. When you need to decouple services so they can evolve independently. When you need to handle traffic spikes without overwhelming downstream systems. When you need reliable delivery with retries. When multiple services need to react to the same event.

When should you avoid one?

When your system is small and synchronous calls work fine. When the overhead of a broker is not justified by the scale. When you need strict request reply semantics and the latency of queueing is unacceptable. When your team doesn't have the operational maturity to monitor and maintain a broker.

A message queue is not a database. It's not permanent storage. It's a buffer, a decoupler, and a shock absorber. Use it to smooth out the rough edges of distributed communication. Don't use it as a source of truth.

Happy designing