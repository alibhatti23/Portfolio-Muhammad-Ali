---
title: "How Airbnb Searches Millions of Listings"
draft: false
date: 2026-04-16
description: "A system design case study on Airbnb - search ranking, geospatial filtering, ngram indexing, the Kubernetes migration, and payment orchestration across 220 countries."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - Airbnb system design
  - search ranking architecture
  - geospatial filtering
  - ngram search indexing
  - Kubernetes migration
  - payment orchestration
  - marketplace platform design
  - system design case study
Author: Ahmad Hassan
---

You type "Lake Tahoe, 2 guests, next weekend" into Airbnb's search bar. In under 500 milliseconds, the system filters millions of listings down to a few hundred that match your criteria, ranks them by relevance, applies dynamic pricing, checks availability calendars, loads review scores, and renders a page with photos, prices, and superhost badges. Every step must be fast. Every step must be personalized. Every step must handle the nuances of a two sided marketplace where supply changes daily and demand fluctuates by season, holiday, and local events.

Let's start with the search and ranking pipeline, because that's where most of the complexity lives.

When you submit a search, the request hits Airbnb's API gateway. The gateway authenticates your request, applies rate limits, and routes it to the search service. The search service coordinates several downstream services to produce your results.

The first step is filtering. The system narrows the universe of listings to those that match your basic criteria. Location, check in and check out dates, number of guests, property type, price range, amenities. Each filter reduces the candidate set.

Location filtering is more complex than it sounds. A search for "Lake Tahoe" doesn't match a single point on a map. It matches a region. The geospatial service maps your search query to a bounding box or a polygon representing the Lake Tahoe area. All listings whose coordinates fall within that polygon are considered candidates. For regions with fuzzy boundaries, like neighborhoods in a city, Airbnb uses neighborhood polygons defined by both data sources and host input.

Date filtering intersects with the availability calendar. Each listing maintains a calendar of which dates are available, which are booked, and which are blocked by the host. The search must check that every night between your check in and check out date is available. This is a range query against a potentially sparse dataset. For speed, availability data is precomputed and stored in an inverted index where each listing ID maps to a bitmap of available dates. Checking availability becomes a bitwise AND operation across the date range.

After filtering, the system has a candidate set of maybe a few thousand listings. Now it needs to rank them.

Ranking is where Airbnb's search becomes truly personalized. A simple ranking might sort by price or review score. Airbnb's ranking uses a machine learning model trained on hundreds of features. Your past searches and bookings. Which listings you clicked on. Which listings you booked. How long you spent viewing a listing page. Whether you favorited it. Whether you contacted the host. All these signals feed a model that predicts the probability of booking for each candidate listing.

The model considers features about the listing: price, review score, number of reviews, photo quality, superhost status, cancellation policy, amenities. Features about the query: dates, number of guests, lead time before check in, day of week. Features about the user: past booking history, preferences, device type, language. And features about the match between query and listing: how well the listing amenities match the implied needs of the query, how the price compares to typical listings in the area.

The model produces a score for each listing. The highest scored listings appear first. This is why you see listings that seem to perfectly match your taste at the top of search results. The model has learned from millions of bookings which features predict a successful match.

The ranking model is retrained frequently. Booking patterns change. Seasonal preferences shift. New listing types emerge. The model that worked in summer may not work in winter. Continuous retraining on recent data ensures that recommendations stay relevant.

But ranking must also account for business constraints. Diversity. If the top 10 results are all studios in the same building, the search experience is poor even if they individually score well. The ranking system applies diversity rules to ensure results include a mix of property types, price ranges, and locations. Freshness. New listings get a small boost to compensate for their lack of reviews. Without this boost, new listings would never appear on the first page, and hosts would be discouraged from joining the platform. Quality. Listings below a minimum quality threshold are demoted even if they match the search criteria.

Now let's talk about how Airbnb handles the full text search that powers the search bar. When you type "Lake," the system needs to suggest "Lake Tahoe," "Lake Como," "Lake District." This is not a simple database query. It's a typeahead search across millions of locations, listing names, and point of interest data.

Airbnb uses an ngram based indexing system for search. When a listing is titled "Cozy cabin near Lake Tahoe," the indexing pipeline generates ngrams, substrings of length n, for each word. The bigrams for "Lake" include "La," "ak," "ke." The trigrams include "Lak," "ake." When you type "Lak," the system matches against these ngrams to find all documents containing words that start with "Lak." This provides fuzzy matching that tolerates typos and partial input.

The search index is built on Elasticsearch. Each listing is indexed with its text fields, location, price, amenities, availability bitmap, and metadata. When a search query arrives, the system builds an Elasticsearch query that combines full text matching, geospatial filtering, date range filtering, and term filtering. The results are then passed to the ranking model for scoring and ordering.

One challenge with maintaining a search index of this size is keeping it up to date. Listings change constantly. Hosts update prices, photos, and availability. New listings are created. Existing listings are deactivated. Every change must be reflected in the search index nearly in real time.

Airbnb uses a change data capture pipeline. When a listing is updated in the primary database, a change event is published to a message queue, specifically Apache Kafka. A downstream consumer reads these events and updates the Elasticsearch index. There is a small delay, typically a few seconds, between when a change is written to the database and when it becomes searchable. For most use cases, this is acceptable. For fast moving scenarios like instant booking confirmations, the system reads from the database directly rather than the search index.

Let's talk about payments, because marketplaces live and die by their payment systems.

Airbnb processes payments across 220 countries and territories in dozens of currencies. When you book a listing, Airbnb charges your payment method immediately. But the host doesn't receive the money until after check in. This is intentional. Airbnb holds the payment as a trust mechanism. If something goes wrong with the booking, Airbnb can refund the guest without involving the host. If the host cancels, Airbnb can refund the guest from the held funds.

This creates a complex payment flow. The system must authorize the charge when you book, capture it when the booking is confirmed, and settle it to the host after check in. There are also cancellation policies that determine when and how much to refund. Each policy is a set of rules based on timing, reason for cancellation, and host preferences.

Airbnb's payment service orchestrates interactions with multiple payment processors like Stripe, PayPal, Braintree, and regional processors. Each processor supports different payment methods, currencies, and regulations. The payment service acts as an abstraction layer, presenting a unified interface to the booking service while routing transactions to the appropriate processor based on the user's country and payment method.

Currency conversion is another layer of complexity. A guest in Japan pays in yen. A host in France receives euros. The conversion rate must be locked at the time of booking, not at the time of payout, because exchange rates fluctuate. Airbnb bears the currency risk between booking and payout.

Then there are taxes. Different jurisdictions have different tax rules. Some charge occupancy taxes. Others charge value added tax. Some require Airbnb to collect and remit taxes on behalf of hosts. Others leave that responsibility to the host. The tax service determines which taxes apply based on the listing location, the guest location, and the booking details, and adds them to the total price.

All of this happens within the 500 millisecond search to booking window. The price you see on the search results page includes taxes, service fees, and currency conversion. It must be accurate because it's the price you pay.

Airbnb's Kubernetes migration deserves mention because it's one of the most documented infrastructure overhauls in the industry.

In the early days, Airbnb ran on a monolithic Ruby on Rails application deployed to a handful of servers. As the company grew, the monolith became difficult to scale and deploy. Teams were stepping on each other's changes. A single deployment could take hours.

The migration happened in phases. First, functionality was extracted from the monolith into microservices written in Node.js and Java. The monolith continued to run, but new features were built as services. Then the infrastructure was migrated from a traditional server setup to Kubernetes. Each service was packaged as a Docker container and deployed to a Kubernetes cluster. Service discovery, load balancing, and health checks were handled by Kubernetes.

The migration wasn't painless. Managing hundreds of services on Kubernetes introduced operational complexity. Rolling deploys had to be carefully orchestrated to avoid downtime. Monitoring and alerting had to be rebuilt for a containerized environment. But the end result was a deployment pipeline that could ship changes in minutes rather than hours.

What can you learn from Airbnb's architecture?

Search at marketplace scale is not just retrieval. It's ranking, personalization, diversity, and business logic applied in real time. Filter first to reduce the candidate set, then rank with a model, then apply business rules.

Availability and pricing data change constantly. Precompute what you can. Use bitmaps for date range queries. Cache aggressively. Use change data capture to keep secondary indexes in sync.

Payment orchestration is hard. Multiple processors, multiple currencies, multiple tax jurisdictions, and escrow periods make even simple bookings involve complex financial flows. Abstract the payment service behind a clean interface so the booking service doesn't need to know about processor details.

Full text search with typeahead requires specialized indexing. Ngram indexes provide fuzzy matching that handles typos and partial input. Elasticsearch is a common choice, but keeping it in sync with the primary database requires a robust pipeline.

Infrastructure migrations are possible but require patience. Airbnb didn't rewrite the monolith overnight. Services were extracted gradually. The monolith and microservices coexisted for years. The Kubernetes migration happened after the service extraction, not before.

Airbnb's system works because every component knows its job. The search service retrieves and ranks candidates. The pricing service computes the total cost. The availability service checks dates. The payment service handles money. No single service tries to do everything. The complexity is in the coordination, not in any individual service. When you design a marketplace, start by identifying the bounded contexts. Booking, search, payment, messaging, reviews. Each is a domain with its own data and logic. Keep them separate. Let them communicate through well defined APIs and events. Scale the ones that need it. Keep the others simple.

Happy designing