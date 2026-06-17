---
title: Event Driven Architecture
draft: false
date: 2026-02-15
description: "A practical guide to Event Driven Architecture - producers, consumers, message brokers like Kafka and RabbitMQ, and building loosely coupled systems."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
  - architecture
keywords:
  - event driven architecture
  - EDA design pattern
  - message broker Kafka RabbitMQ
  - publish subscribe pattern
  - loosely coupled systems
  - asynchronous communication
  - event producers and consumers
  - scalable system design
Author: Ahmad Hassan
---
![Event driven architecture diagram showing producers, event broker, and consumers](/posts/assets/img-4.webp)


Let’s talk about Event Driven Architecture. 

Imagine you are building an e-commerce platform. A customer places an order. What all should happen? Payment should be processed. Inventory should be updated. Email confirmation should be sent. Analytics should record the purchase. Maybe fraud detection should run. 

Now tell me honestly, should Order Service directly call all these services one by one? What happens if Email Service is down? Should order placement fail? What if Analytics is slow? Should customer wait? This is where tight coupling starts hurting.

Now look at the image. On the left, you see multiple Event Producers. These are event sources. They generate events. For example, Order Service generates OrderPlaced. Payment Service generates PaymentCompleted. User Service generates UserRegistered. These producers don’t know who will consume their events. They just publish them.

In the center, you see Event Broker. This could be Kafka, RabbitMQ, Service Bus. Think of it as a central nervous system. Producers push events to the broker. The broker stores, filters, and routes events based on subscriptions. It follows publish subscribe model. A producer publishes an event. Subscribers who are interested receive it. No direct dependency. No tight coupling.

On the right, you see Event Consumers. These are subscribers. They listen for specific events. When OrderPlaced happens, Payment Service consumes it and processes payment. Inventory Service consumes it and reduces stock. Email Service consumes it and sends confirmation. Analytics consumes it and updates dashboard. Each service reacts independently.

Now let me ask you something. Does Order Service need to know about Email Service? No. Does it care if Analytics is temporarily down? No. It just emits OrderPlaced event and moves on. That is loose coupling. That is asynchronous communication.

What exactly is an event? An event is a record of something that happened. It is immutable. Once created, it does not change. For example, OrderPlaced with payload: orderId, userId, items, amount. That payload gives context. Events represent facts, not commands.

Let’s go deeper. Components in EDA (Event driven architecture) are very important. Event Source is where the event originates. It could be user clicking a button, database change, sensor reading, external API call. Publisher converts that action into an event and pushes it to broker. Event Broker receives and routes. Subscriber registers interest in certain event types. Listener keeps watching for those events. Event Handler contains business logic. Dispatcher ensures correct delivery. Aggregator may combine multiple events into one meaningful event, like combining ItemAdded and ItemRemoved into CartUpdated.

Now think practically. Why is EDA powerful? First, real time responsiveness. Events are processed as they happen. Second, scalability. If traffic increases, you scale consumers horizontally. Third, flexibility. Want to add a new service that reacts to OrderPlaced? Just subscribe. No need to modify existing services. That’s huge in evolving systems.

But let’s not romanticize it. There are challenges. What if events arrive out of order? What if a consumer processes the same event twice? You must design idempotent handlers. What about debugging? In a synchronous system, stack trace is clear. In EDA, flow is distributed across services. Observability becomes critical. Logging, tracing, correlation IDs are mandatory. What about latency? Since communication is asynchronous, there may be slight delay before all consumers react.

Now let me ask you something. Is EDA suitable for every system? No. If your system is small and simple, synchronous calls may be enough. But if you are building large scale, distributed, real time applications, EDA shines.

Let’s look at some real world use cases. Financial systems use EDA for fraud detection. A transaction event triggers fraud analysis immediately. E-commerce platforms use it for order workflows. Telecom systems use it for real time network monitoring. Online games use it for player actions and game state updates.

Back to the image. Notice how producers are separate from consumers. That separation is the key idea. Producers emit events without caring who listens. Consumers react without knowing who produced. Broker sits in middle ensuring reliable delivery.

So here’s the simple mental model. Event Driven Architecture is about reacting to facts instead of calling functions directly. Something happens. You publish it. Interested parties react. System becomes reactive, scalable, and loosely coupled.

Let me leave you with one question. In your current system, are services tightly calling each other in chains? Or are they reacting to events? The answer often tells you how scalable your system will be in the future.

Happy designing 🖤