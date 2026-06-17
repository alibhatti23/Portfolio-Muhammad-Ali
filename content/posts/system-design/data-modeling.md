---
title: Data Modeling for Scale
draft: false
date: 2026-04-07
description: "How to model data for systems that actually scale - SQL vs NoSQL tradeoffs, denormalization, schema design for read and write patterns, and when to break normalization rules."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - data modeling
  - database schema design
  - SQL vs NoSQL tradeoffs
  - denormalization
  - read write patterns
  - normalization for scale
  - database design patterns
  - system design fundamentals
Author: Ahmad Hassan
---

Most developers learn data modeling from textbooks. Normalize everything to third normal form. Eliminate redundancy. One fact in one place. Every column depends on the key, the whole key, and nothing but the key.

Then they build a real system. Queries take 200ms because joining five tables for every page load is expensive at scale. The application spends more time assembling data from normalized tables than doing anything useful. The database CPU is pegged at 90% on joins alone.

Normalization is great for reducing redundancy. It is terrible for read performance at scale. And at scale, read performance is usually what matters most.

Let's start with the fundamental decision. SQL or NoSQL?

Relational databases like PostgreSQL and MySQL store data in tables with fixed schemas. Relationships are expressed through foreign keys. Joins let you combine data from multiple tables in a single query. Transactions give you ACID guarantees. This is ideal when your data has clear relationships, your access patterns are varied, and consistency is non negotiable.

NoSQL databases like MongoDB, DynamoDB, and Cassandra store data in flexible documents or key value pairs. Schemas can evolve without migrations. Reads are often single table lookups. Writes are fast because there are no foreign key constraints to validate. This is ideal when your access patterns are predictable, your data structure varies, and you need to scale writes horizontally.

The mistake is treating this as a binary choice. Most large systems use both. Relational databases for transactional data where consistency matters. NoSQL for high throughput access patterns where flexibility matters. The famous example is Amazon. The order processing system uses a relational database for ACID transactions. The product catalog uses DynamoDB for fast key based lookups. The recommendation engine uses a graph database for relationship traversal. One system. Multiple data models.

Now let's talk about the single most important principle in data modeling for scale. Model your data around your access patterns, not around your entities.

Traditional data modeling starts with entities. A user has a name, email, and address. An order has items, a total, and a status. You normalize these into separate tables with foreign keys. This produces a clean schema. But it produces terrible read performance if your access pattern is "show me all details about a user's last 10 orders including product names and prices."

Access pattern driven modeling starts with the question. What does the application need, and how often? Then you design your schema to answer that question in as few queries as possible, ideally one.

This is where denormalization comes in. Instead of storing product names in a products table and joining them to orders at read time, you store the product name directly in the order item. Yes, if the product name changes, you have to update it in every order that references it. But product names rarely change, and orders are read far more often than they are updated. You trade a rare write cost for a frequent read optimization.

This tradeoff shows up everywhere in scalable systems.

In DynamoDB, you often design a single table that holds multiple entity types. Users, orders, and products all live in the same table with different partition keys and sort keys. An access pattern like "get a user's recent orders" is modeled as a single query against the user's partition key with a sort key prefix of "ORDER#". No joins. One query. The data is pre organized exactly how the application reads it.

In MongoDB, you embed related data inside documents instead of referencing it. An order document includes the ordered items as an embedded array. The application reads one document and has everything it needs.

In Cassandra, you create a separate table for every query pattern. Want orders by user? That's one table. Want orders by status? That's another table. Want orders by date range? That's a third table. Same data, different sort orders, different partition keys. This looks like massive redundancy from a normalization perspective. From a read performance perspective, it's optimal. Each query hits one partition and returns results without sorting or joining.

The common objection is clear. Denormalization means data duplication. If you update a product name, you have to update it in every order that contains it. If you change a user's email, you have to find every document that stores it.

This is valid. Denormalization trades write simplicity for read speed. You must decide consciously. If a piece of data changes frequently and must be consistent across all references, normalize it. Store it once and join at read time. If a piece of data changes rarely and read speed matters more than write convenience, denormalize it. Store it where it's read.

The practical rule is this. Denormalize data that is read often, changes rarely, and is expensive to join. Normalize data that changes often, must stay consistent, and is read infrequently.

Schema evolution is another concern with NoSQL. In a relational database, changing a column type or adding a column requires a migration. In a document database, new fields can be added without affecting existing documents. The application code handles both old and new schemas. This is a strength when your data model is evolving rapidly. It's a weakness when you need strict consistency and validation.

Indexing strategy matters at scale more than schema design. An index speeds up reads at the cost of slower writes. Every index is an additional data structure the database must update on every insert and update. A table with 10 indexes handles writes 10 times slower than a table with none. At scale, you must choose indexes carefully based on your actual queries, not hypothetical ones.

Start with your most frequent and most latency sensitive queries. Build indexes for those. Monitor slow queries. Add indexes only when a query is slow and the index materially improves it. Remove indexes that are never used. Every unused index is write overhead for nothing.

For write heavy systems, consider write optimization patterns. Instead of updating a row on every event, buffer writes in memory and flush periodically. Instead of incrementing a counter in the database on every page view, batch increments and apply them in bulk. This is how analytics systems handle millions of events per second without drowning the database.

One more pattern worth knowing. The materialized view. This is a precomputed view of data that is stored and updated periodically. Instead of computing "top 10 products by sales this month" by aggregating millions of order rows on every read, you compute it once an hour and store the result. Reads are instant. The data is at most an hour stale. For dashboards and analytics, this tradeoff is usually acceptable.

Data modeling for scale is not about finding the perfect schema. It's about understanding your access patterns, making conscious tradeoffs between read speed and write simplicity, and choosing the right tool for each pattern. Normalize where consistency matters. Denormalize where speed matters. And always, always model from the query first.

Happy designing