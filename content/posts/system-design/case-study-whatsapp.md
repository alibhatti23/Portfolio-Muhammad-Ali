---
title: "How WhatsApp Handles Billions of Messages"
draft: false
date: 2026-03-11
description: "A system design case study on WhatsApp - Erlang BEAM, the Comet architecture, message ordering, delivery receipts, and how 55 engineers serve 2 billion users."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - WhatsApp system design
  - messaging architecture
  - Erlang BEAM virtual machine
  - message delivery receipts
  - chat application design
  - Comet architecture
  - end to end encryption
  - system design case study
Author: Ahmad Hassan
---

WhatsApp serves over 2 billion users with fewer than 100 engineers. That ratio is absurd. A company the size of a small startup powering the world's largest messaging platform. The architecture that makes this possible is worth understanding because the design decisions are deliberately different from what most teams would choose.

The foundation of WhatsApp's backend is Erlang and the BEAM virtual machine.

Erlang was designed at Ericsson in the 1980s for telephone switches. These systems had specific requirements. They must never go down. They must handle millions of simultaneous connections. They must update without restarting. And they must process messages with microsecond latency.

Sound familiar? These are exactly the requirements of a messaging platform.

Erlang's BEAM virtual machine uses a lightweight process model. Not operating system processes. Not threads. Erlang processes are micro processes that weigh about 300 bytes each. A single BEAM instance can run millions of concurrent processes. Each process has its own memory, its own mailbox, and its own garbage collector. When one process crashes, the others continue. When one process needs garbage collection, it pauses only itself, not the entire VM.

This is fundamentally different from Java or Node.js where garbage collection pauses the entire application. In a system with millions of connections, a GC pause means all connections stall simultaneously. In Erlang, GC pauses one process at a time. The other 999,999 processes keep running.

WhatsApp servers handle connections using the Comet architecture, also called long polling. When a user opens WhatsApp, the client establishes a persistent connection to the server. This connection stays open. When the user sends a message, the client writes to the open connection. When a message arrives for the user, the server pushes it through the same connection. There's no polling. No repeated HTTP requests. The connection is always there, waiting.

At WhatsApp's scale, this means maintaining hundreds of millions of open TCP connections simultaneously. The BEAM virtual machine makes this possible because each connection is handled by a lightweight Erlang process. The overhead per connection is minimal.

Let's follow a message from sender to receiver.

You type a message and hit send. Your client encrypts the message using end to end encryption based on the Signal Protocol. The encrypted message is sent to the WhatsApp server through your persistent connection. The server does two things. It stores the message in a queue for the recipient. And it attempts to deliver the message immediately if the recipient is online.

If the recipient is online and has an active connection, the server pushes the message to them. The recipient's client decrypts it and displays it. The client sends back a delivery receipt. The server forwards this receipt to your client. You see the single check mark turn into a double check mark.

If the recipient is offline, the message sits in the queue. When they come online and establish a connection, the server delivers all queued messages. This is how WhatsApp handles offline users without losing messages.

The delivery receipt system has four states. A single gray check mark means the message left your phone. A double gray check mark means the message was delivered to the recipient's phone. A double blue check mark means the message was read. This gives users visibility into the delivery pipeline without revealing whether the recipient is online.

Message ordering is critical in a chat application. If messages arrive out of order, conversations become confusing. WhatsApp uses server assigned sequence numbers to enforce ordering. When the server receives a message, it assigns a monotonic sequence number for the conversation. Messages are delivered to the recipient in sequence number order, regardless of when they arrive at the server. This ensures that messages appear in the correct order even if there are network delays.

Now let's talk about how messages are stored.

WhatsApp keeps messages on the server only until they are delivered to all recipients. Once confirmed delivery, the message is deleted from the server. This is fundamentally different from email where messages are stored permanently. It's also why WhatsApp can serve 2 billion users with relatively little server storage. Messages flow through the system rather than accumulating.

The exception is when a recipient is offline for an extended period. Messages are held for up to 30 days. If the recipient doesn't come online within that window, the messages are discarded. For media like photos, videos, and documents, WhatsApp stores them on the server for a limited time after delivery so the recipient can download them on demand. After that, the media is deleted from the server. The client is responsible for local storage and backup.

End to end encryption means the server never sees the plaintext of any message. The encryption keys are generated on the clients and never shared with the server. The Double Ratchet algorithm used in the Signal Protocol generates a new key for every message, providing forward secrecy. Even if a key is compromised, previous messages cannot be decrypted. The server is a transport layer. It routes encrypted blobs. It cannot read them.

This has interesting implications for features like search. Since the server cannot read message content, server side search is impossible. Search must be performed on the client. Your phone searches through its local message store. This is why WhatsApp search is often slower than email search. The computation happens on a mobile device, not in a data center.

Let's talk about the media delivery pipeline.

When you send a photo, the client uploads the encrypted photo to WhatsApp's media server. The media server stores the blob and returns a media key. This key is sent to the recipient as part of the message. When the recipient taps to view, their client uses the key to download and decrypt the photo. The photo passes through WhatsApp's servers but they never see the unencrypted content.

Media files are served through a CDN for performance. When you receive a photo, it may be served from a CDN edge near you rather than from the origin server. This reduces latency for media heavy conversations.

WhatsApp's group messaging is one of its most impressive engineering achievements. A group can have up to 1024 members. When you send a message to a group, the server must deliver it to every member. This is not a broadcast where the server sends the message once and a network replicates it. The server maintains a list of group members and pushes the message to each one individually.

For a group of 1024 members, a single message generates up to 1024 server pushes. At peak, groups generate a significant portion of WhatsApp's total message volume. The server uses fanout queues where a single incoming message is replicated to multiple outbound queues, one per recipient. Each outbound queue is processed independently, so a slow connection to one recipient doesn't block delivery to others.

The group metadata, member list, and admin settings are replicated across the group members. When someone changes the group name or adds a member, a special system message is sent to all members. Everyone updates their local state independently. There is no central database that must be consistent at all times. Eventual consistency is acceptable for group metadata.

What can you learn from WhatsApp's architecture?

Choose your runtime based on your problem. Erlang and BEAM were designed for exactly this kind of system: massive concurrency, soft real time messaging, fault tolerance. WhatsApp didn't fight Erlang's model. They embraced it. A Node.js or Java backend could handle WhatsApp's scale, but it would require far more engineering effort for connection management and fault isolation.

Minimize server state. WhatsApp keeps messages only until delivery. This means storage grows with delivery speed, not with total message volume. Systems that store all messages permanently face exponentially growing storage costs. If your business model allows it, discard delivered data.

Encrypt by default. End to end encryption adds complexity but provides a property that is almost impossible to add later: trustworthy privacy. Once users and regulators expect encryption, you cannot retrofit it without changing the entire architecture.

Push over pull. Persistent connections are more efficient than polling for real time updates. A single open connection per user uses fewer resources than 100 polls per minute, even at rest.

Design for failure isolation. Each Erlang process is independent. When one crashes, the VM supervisors restart it automatically. Design your services so that a failure in one component doesn't cascade. A bug in message rendering should not crash the connection handler. A slow database query should not block the event loop.

WhatsApp proves that radical simplicity in architecture enables radical scale. 55 engineers. 2 billion users. One Erlang VM per server. Persistent connections. Queue based delivery. Delete after delivery. The design is elegant because every decision serves the core function: move messages from one phone to another as reliably and efficiently as possible.

Happy designing