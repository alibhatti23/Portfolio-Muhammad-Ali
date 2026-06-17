---
title: CDN and Edge Computing
draft: false
date: 2026-03-29
description: "How CDNs and edge computing bring content closer to users - cache invalidation, TTL strategies, edge functions, and the latency gains that make or break global applications."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - CDN content delivery network
  - edge computing
  - cache invalidation
  - TTL strategies
  - edge functions
  - latency optimization
  - content delivery
  - system design fundamentals
Author: Ahmad Hassan
---

A user in Tokyo requests a web page hosted in Virginia. The request travels across the Pacific, through multiple routers, to the origin server. The server processes it. The response travels back. Total round trip? 300 milliseconds on a good day, 500 or more on a bad one. Every image, every script, every stylesheet makes the same journey.

Now put a server in Tokyo that holds a copy of that static content. The user's request travels to a local data center. The response comes back in 20 milliseconds. That's the difference between a page that loads instantly and a page that feels broken.

This is what a Content Delivery Network does. It puts copies of your content as close to your users as possible. Not one copy. Hundreds. Spread across the globe. Each copy, called an edge server or point of presence, serves users in its region without hitting the origin.

The mechanics are straightforward. A user requests a URL. DNS resolves that URL to the nearest edge server. If the edge server has the content in its cache, it serves it immediately. This is a cache hit. If the content is not cached, or the cache has expired, the edge server fetches it from the origin, caches it locally, and serves it to the user. This is a cache miss. Subsequent requests from users near that edge server get cache hits.

CDNs are most effective for static content. Images. CSS files. JavaScript bundles. Fonts. Videos. Anything that doesn't change per user or per request. The cache hit rate for well designed static assets is typically above 95%.

But static content is only part of the story. Modern applications serve dynamic content too. Personalized dashboards. Real time data. API responses that differ per user. CDNs can accelerate these too, but the strategies are different.

For content that changes less frequently, like a product listing page that updates every few minutes, a short TTL combined with stale while revalidate works well. The edge serves the cached version while fetching a fresh copy in the background. Users see instant responses. The cache updates without anyone noticing.

For content that changes more frequently, like a news homepage that updates every few seconds, the CDN can still help by caching for a very short duration. Even a 5 second cache means the origin handles one request per 5 seconds per edge server instead of one per request. At scale, this reduces origin load by orders of magnitude.

Now the hardest problem in content delivery. Cache invalidation.

You deploy a new version of your JavaScript bundle. The old version is cached on 200 edge servers worldwide. You need all of them to stop serving the old version and start serving the new one. How?

The simplest approach is cache busting through URL versioning. Instead of `app.js`, you serve `app-v2d4f8.js`. The URL changes, so the CDN treats it as a new resource. Old cached versions eventually expire via TTL. New requests get the new file immediately. This works perfectly for static assets that change on deploy.

But what about content that cannot be versioned by URL? A product image that was updated. A JSON response that changed. In these cases, you need to explicitly invalidate the cache. Most CDN providers offer a purge API. You send a request to purge a specific URL or a pattern of URLs. The CDN removes the cached content from all edge servers. The next request fetches a fresh copy from the origin.

The problem with purging is that it's not instantaneous. It takes time for the purge instruction to reach every edge server. During that window, some users get stale content. For most applications, this is acceptable. For applications where stale data is dangerous, like a medical information dashboard, you need shorter TTLs or dynamic rendering at the edge.

This is where edge computing comes in. Instead of just caching content at the edge, you run code at the edge. Edge functions, also called edge workers or serverless functions at the edge, let you execute logic at the CDN layer before the request reaches the origin.

An edge function can personalize a response based on the user's location, language, or device. It can redirect users based on geolocation. It can perform A/B testing at the edge without hitting the origin. It can transform responses, resize images, or inject headers. It can authenticate requests and reject invalid ones before they travel to your origin servers.

The performance gains are significant. A function that runs in Virginia for a user in Singapore adds 200ms of network latency just for the round trip. The same function running on an edge server in Singapore adds 10ms. For personalized or conditional logic that doesn't need the origin, edge computing eliminates an entire network round trip.

But edge functions have constraints. They run in sandboxed environments with limited memory and CPU. They cannot maintain state between requests. They have execution time limits, usually 50 milliseconds or less depending on the provider. They cannot make arbitrary network connections to private databases. They work best for logic that is self contained, stateless, and fast.

Cloudflare Workers, Vercel Edge Functions, and AWS Lambda@Edge are popular implementations. Each has slightly different constraints and capabilities. The core idea is the same. Move computation closer to the user.

The architecture pattern looks like this. Static assets are served directly from the CDN cache. This covers most page loads. Personalized or dynamic content is either cached with short TTLs and stale while revalidate, or rendered at the edge using edge functions that compose cached fragments with user specific data. Only truly unique, per user, per request data needs to reach the origin.

This layered approach means your origin servers handle a fraction of the traffic they would without a CDN. A site that serves 1 million requests per second with a 95% cache hit rate only needs to handle 50,000 requests per second at the origin. That's the difference between 100 servers and 5.

A few practical considerations. Always set appropriate cache headers. Cache Control with max age for static assets. Cache Control with s maxage for CDN specific TTLs. Use no cache or no store for content that must never be cached. Use stale while revalidate for content that can be slightly stale. The CDN can only do its job if your headers tell it how.

Enable HTTPS on the CDN. Modern CDNs terminate TLS at the edge, reducing the TLS handshake latency for users. They also handle certificate renewal automatically.

Monitor cache hit rates. A CDN that never caches because headers are misconfigured is an expensive passthrough proxy. Most providers offer dashboards showing hit rates by content type. Aim for 90% or higher on static assets.

CDNs and edge computing are not alternatives to your origin servers. They are layers in front of them. The origin remains the source of truth. The CDN is the distribution layer. Edge functions are the processing layer. Together, they make your application fast everywhere in the world, not just near your data center.

Happy designing