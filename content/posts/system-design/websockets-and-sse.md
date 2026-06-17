---
title: WebSockets and Server-Sent Events
draft: false
date: 2026-04-22
description: "Real time communication patterns for the web - WebSockets vs Server-Sent Events, when to use each, scaling persistent connections, and the tradeoffs of push vs pull."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - WebSockets
  - Server-Sent Events
  - real time communication
  - SSE vs WebSocket
  - persistent connections
  - scaling WebSocket servers
  - push notifications
  - system design fundamentals
Author: Ahmad Hassan
---

HTTP was designed for request response. The client asks. The server answers. The connection closes. If the client wants new data, it asks again. And again. And again.

This works fine for loading a web page. It breaks down when you need real time updates. A chat application needs messages to appear instantly. A stock ticker needs price changes pushed the moment they happen. A collaborative document needs edits from one user to appear on another user's screen within milliseconds.

Polling is the naive solution. The client sends a request every few seconds. Any new data? Any new data? Any new data? Most responses are empty. The server wastes resources processing polls. The client wastes battery on mobile devices. The latency is the polling interval. If you poll every 5 seconds, updates are delayed by up to 5 seconds.

Long polling improves this. The client sends a request. The server doesn't respond immediately. It holds the connection open until new data is available or a timeout expires. Then it sends the response. The client immediately sends another request. This reduces empty responses but keeps a connection open at all times and still requires a new HTTP request for every update.

Both polling and long polling are workarounds. What we really need is a way for the server to push data to the client without the client asking.

Server-Sent Events, or SSE, do exactly this for one direction. The client opens a single HTTP connection and keeps it open. The server can send data at any time by writing to the response stream. Each message is formatted as a text field with optional event types and IDs. The client listens for messages using a simple JavaScript API.

SSE is built on HTTP. It uses a standard GET request with a special Content-Type header of text/event-stream. It works through proxies and firewalls without issue. It supports automatic reconnection. If the connection drops, the browser reconnects automatically, optionally sending the last event ID so the server can resume from where it left off.

SSE is simple to implement on both sides. The server needs only a streaming HTTP response. The client uses the EventSource API. No special libraries. No complex protocols. No connection upgrade negotiation.

The limitation of SSE is that it's one directional. The server sends data to the client. The client cannot send data to the server over the same connection. If the client needs to send data, it uses regular HTTP requests separately. For many real time use cases, this is sufficient. Notifications. Live scores. Dashboard updates. News feeds. The server pushes updates, the client receives them. The client doesn't need a persistent channel back to the server.

Now WebSockets. A WebSocket connection is bidirectional and persistent. Both the client and server can send messages at any time without waiting for a request. The connection stays open indefinitely. There's no polling, no repeated HTTP handshakes, no overhead of HTTP headers on every message.

The WebSocket protocol starts as an HTTP request with an Upgrade header. If the server supports WebSockets, it responds with a 101 Switching Protocols status and the connection switches from HTTP to the WebSocket protocol. From that point on, the connection is a persistent TCP socket. Messages are framed with a lightweight protocol that adds only 2 to 14 bytes of overhead per message. Compare this to HTTP where every request carries hundreds of bytes of headers.

WebSockets support binary data in addition to text. You can send images, video frames, binary protocols, and compressed data without base64 encoding. SSE only supports text, specifically UTF-8.

So when do you use each?

Use SSE when the data flow is primarily server to client. Notifications, live updates, real time feeds, stock tickers, social media streams, dashboard metrics. In these scenarios, the client doesn't need a persistent channel to the server. It sends occasional HTTP requests for actions like posting a message or clicking a button. SSE gives you server push with the simplicity of HTTP.

Use WebSockets when you need bidirectional communication. Chat applications where both sides send messages rapidly. Multiplayer games where the client sends inputs and the server sends game state. Collaborative editing where both sides send changes. Video or voice calls where both sides stream data continuously. In these scenarios, the overhead of separate HTTP requests for client to server messages becomes significant, and the bidirectional persistent connection is justified.

What about scaling?

SSE connections are HTTP connections. Your load balancer and web server handle them like any long lived HTTP connection. The main concern is keeping connections open for a long time. Each connection uses a file descriptor and a small amount of memory. A single server can typically handle tens of thousands of concurrent SSE connections. Most web servers are configured to time out idle connections after a few minutes. For SSE, you need to increase or disable this timeout.

WebSocket connections are more demanding. They're persistent TCP sockets with application level message framing. They don't time out naturally unless the application implements ping pong heartbeats. A WebSocket connection that goes silent doesn't tell the server whether the client is still there. Most production WebSocket implementations send periodic ping frames. If the client doesn't respond with a pong within a timeout, the connection is closed. This frees resources and detects disconnected clients.

The real scaling challenge for WebSockets is that each connection has state. The server knows which users are connected, which rooms they're in, which channels they're subscribed to. When you have multiple server instances, you need a way to route messages to the right server and share connection state across instances.

The common solution is a pub/sub layer. When a user sends a message on Server A, it publishes the message to a Redis channel or a message broker. All servers subscribed to that channel receive the message and deliver it to their connected clients. The message broker becomes the backbone for cross server communication.

This is why WebSockets are harder to operate than SSE. SSE typically requires a stateless server that just streams data. WebSockets require stateful servers that maintain connection maps and coordinate through a pub/sub backbone. Horizontal scaling works, but it adds infrastructure.

What about reconnection and reliability?

SSE has built in reconnection. The EventSource API automatically reconnects when the connection drops. The server can send an event ID with each message. After reconnection, the client sends the last received event ID. The server can then send all messages that the client missed. This makes SSE reliable over flaky connections.

WebSockets have no built in reconnection. If the connection drops, the client must implement its own reconnection logic. It must also handle message recovery. The server can either buffer recent messages and send them on reconnect, or the client can request missed messages via a separate HTTP endpoint. Most production WebSocket applications implement a reconnection strategy with exponential backoff and a fallback to HTTP for missed messages.

One more consideration. SSE works through existing HTTP infrastructure. Proxies, load balancers, and CDNs that support long lived HTTP connections work with SSE out of the box. WebSockets require explicit support from every intermediary. Some corporate proxies block WebSocket upgrades. Some load balancers need to be configured to allow the Upgrade header. This is less of an issue in modern infrastructure but still a consideration for public facing applications.

The choice between SSE and WebSockets is not about which is better. It's about which direction your data flows. Server to client, use SSE. Bidirectional, use WebSockets. Don't add WebSocket complexity when SSE gives you what you need. Don't force bidirectional communication over SSE when your client needs to send rapid messages. Match the protocol to the problem.

Happy designing