---
title: PostgreSQL Deep Dive
draft: false
date: 2026-06-11
description: "PostgreSQL from the inside out: MVCC, process architecture, WAL, indexing internals, query planning, partitioning, and the features that make Postgres the most capable open-source database."
categories:
  - tech
tags:
  - tech
  - postgresql
  - database
keywords:
  - PostgreSQL
  - MVCC
  - WAL
  - B-tree index
  - query planner
  - partitioning
  - VACUUM
  - connection pooling
  - PostgreSQL internals
  - relational database
Author: Ahmad Hassan
---

MySQL is straightforward. You write a query, it runs, you get results. PostgreSQL is that same experience until the moment it is not. When your data grows past what fits in memory, when concurrent writes collide, when you need types that are not just strings and integers, Postgres reveals that it has been doing far more under the hood than you ever noticed.

This article is about what Postgres actually does. Not how to install it. Not how to write a SELECT query. But how it processes your queries, stores your data, handles concurrency, and keeps running when everything is on fire.

## Process Architecture

Postgres does not use threads. Every client connection gets its own operating system process called a backend process. When your application opens a connection, Postgres forks a child process that handles that connection for its entire lifetime.

This sounds expensive. It is. Forking a process for every connection costs memory (each backend uses roughly 5-10MB) and CPU (fork overhead). This is why connection pooling matters in Postgres more than in MySQL or databases that use thread-per-connection models.

The architecture has four layers.

The **postmaster** is the main process. It listens for connections, authenticates clients, and forks backend processes. It does not handle queries itself.

The **backend processes** are the workers. Each one parses, plans, and executes queries for a single client. Backends do not share memory for query execution. They communicate through shared memory structures and locks.

**Background workers** handle maintenance. The autovacuum launcher spawns autovacuum workers. The background writer flushes dirty pages. The WAL writer flushes write-ahead logs. The checkpointer creates consistent snapshots for recovery.

**Shared memory** is the coordination layer. It holds the buffer pool (cached data pages), WAL buffers, lock tables, and commit logs. All backends read from and write to shared memory.

Understanding this architecture matters because it explains Postgres behavior. Why does a single slow query not block other queries? Because each backend is an isolated process. Why does connection count matter? Because each connection is a process with its own memory. Why is autovacuum important? Because there is no background thread cleaning up for you by default.

## MVCC: How Postgres Handles Concurrency

Multi-Version Concurrency Control is the heart of Postgres. It is the reason readers do not block writers and writers do not block readers.

In MySQL's InnoDB, MVCC works through undo logs. The current data lives in the table, and old versions are stored separately. In Postgres, every version of every row lives in the table itself. There are no undo logs. The table is the version store.

Each row in Postgres has four hidden system columns.

`xmin` is the transaction ID that inserted the row. `xmax` is the transaction ID that deleted or updated it. If `xmax` is zero, the row is still the current version. `xmin` and `xmax` together define the range of transactions for which this version is visible.

When you UPDATE a row, Postgres does not modify it in place. It writes a completely new row version and marks the old version's `xmax` with the current transaction ID. The old row stays in the table until VACUUM removes it.

When you SELECT, each transaction has a snapshot that defines which transaction IDs it can see. A row is visible if `xmin` is in the snapshot (committed before the snapshot) and `xmax` is either zero or not in the snapshot (the deleting transaction has not committed yet, or committed after the snapshot).

This means a reader never waits for a writer. Your long analytics query runs against a consistent snapshot even while other transactions are inserting and updating rows. The tradeoff is that old row versions accumulate until VACUUM cleans them up.

### Transaction Isolation Levels

Postgres supports the SQL standard isolation levels, but the implementation is not what the standard implies.

**Read Committed** is the default. Each statement gets a new snapshot. You see changes committed before each statement starts. Two consecutive SELECTs in the same transaction can see different data if another transaction commits between them.

**Repeatable Read** gets one snapshot at the start of the transaction. All statements in the transaction see the same data. If another transaction modifies a row you read, you still see the old version. If you try to update a row that another transaction has modified, you get a serialization error and must retry.

**Serializable** provides true serializability through Serializable Snapshot Isolation (SSI). Postgres tracks read and write dependencies between transactions and aborts ones that could not have occurred in any serial ordering. This is the strongest isolation but has the highest abort rate.

Read Uncommitted exists but behaves identically to Read Committed in Postgres. There is no way to read uncommitted data.

The practical takeaway: use Read Committed for most workloads. Use Repeatable Read when you need a consistent snapshot across multiple statements. Use Serializable only when you need strict correctness and can handle retries.

## WAL: Write-Ahead Logging

The Write-Ahead Log is how Postgres survives crashes. The rule is simple: changes are written to the log before they are written to the data files. If the database crashes, recovery reads the WAL from the last checkpoint and replays any transactions that were committed but not yet flushed to disk.

WAL records are sequential. Every modification (INSERT, UPDATE, DELETE, and internal operations like page splits) generates a WAL record. These records are written to WAL buffers in shared memory and flushed to disk at commit time. The data pages themselves can be written to disk later because the WAL already has the information needed to reconstruct them.

This is why a fsync on commit is critical. When you COMMIT, Postgres must ensure the WAL records for that transaction are on durable storage. The configuration parameter `synchronous_commit` controls this. The default is `on`, meaning every commit waits for WAL flush. Setting it to `off` groups commits and reduces latency but risks losing the last few transactions in a crash.

WAL is also the foundation for replication. Streaming replication works by sending WAL records from the primary to replicas. Logical decoding reads WAL records to produce a stream of changes for logical replication, CDC (Change Data Capture) systems, and event-driven architectures.

The key configuration parameters for WAL are `wal_level` (controls how much information is written to WAL; `logical` is needed for logical replication), `max_wal_size` (how much WAL can accumulate before a checkpoint), and `min_wal_size` (the minimum WAL kept for recycling). Setting these too low causes frequent checkpoints, which are expensive.

## Buffer Pool and Memory

The shared buffer pool is Postgres's primary cache. Data pages are read from disk into the buffer pool, and subsequent accesses read from memory instead of disk.

The important setting is `shared_buffers`. The general recommendation is 25% of system RAM, with an upper limit around 40% because the operating system also caches disk pages and Postgres relies on both layers.

How the buffer pool works. When a backend needs a page, it looks in the buffer pool first. If the page is there (a cache hit), it reads from memory. If not (a cache miss), it reads from the OS page cache. If the page is not in the OS cache either, it reads from disk. This three-layer lookup means that setting `shared_buffers` too high starves the OS cache, and setting it too low does not give Postgres enough room for frequently accessed pages.

Buffer replacement uses a clock sweep algorithm. Each buffer has a usage count from 0 to 5. When a buffer is accessed, its usage count increments up to 5. When the buffer pool is full, the clock sweep algorithm scans buffers looking for ones with usage count 0. Buffers with higher counts survive longer. This approximates LRU without the overhead of maintaining a strict ordering.

Other memory settings that matter. `work_mem` is the memory allocated per operation for sorts, hashes, and aggregates. Set it too low and Postgres spills to disk for large sorts. Set it too high and a query with many sort operations can consume `work_mem * number_of_sorts`. `maintenance_work_mem` is used by VACUUM, CREATE INDEX, and ALTER TABLE. Setting it higher speeds up these operations. `effective_cache_size` is not an allocation. It is a hint to the query planner about how much memory the system has for caching. Set it to roughly 75% of total RAM.

## Indexing Internals

Postgres has more index types than most databases, and each serves a different purpose.

### B-tree

The default index type and the right choice for most queries. Postgres B-trees are Lehman-Yao style, which allows concurrent inserts and splits without locking the entire tree.

B-trees work for equality (`=`), range (`<`, `>`, `BETWEEN`), and prefix queries (`LIKE 'abc%'`). They store sorted values and support index-only scans when all columns in the query are in the index.

A common mistake is indexing on `(a, b)` and expecting the index to serve queries filtering only on `b`. The index is sorted by `a` first, then `b` within each `a` value. Queries filtering on `b` alone cannot use the index efficiently. You need a separate index on `b` or redesign the index column order.

Partial indexes filter which rows are indexed. `CREATE INDEX idx_active_users ON users (email) WHERE active = true` only indexes active users. The index is smaller and faster because it excludes irrelevant rows.

Expression indexes index the result of a function. `CREATE INDEX idx_lower_email ON users (LOWER(email))` lets you search case-insensitively without scanning the entire table.

### Hash

Hash indexes existed for a long time as a second-class citizen. Before Postgres 10, they were not WAL-logged and could not survive crashes. They are now fully supported but still rarely used. B-trees are almost always better because they support range queries and have comparable performance for equality checks.

### GiST

Generalized Search Tree indexes are a framework for implementing custom index types. The default GiST operator classes support geometric data (point, polygon, circle) and full-text search. If you are doing spatial queries with PostGIS, you are using a GiST index.

GiST allows不平衡 trees. It does not guarantee that the tree is balanced or that searches always find all matching entries on the first traversal. But it supports operations that B-trees cannot, like "find all geometries that intersect this bounding box."

### GIN

Generalized Inverted Indexes are designed for data types that contain multiple elements: arrays, full-text search tsvector, and JSONB. A GIN index stores a mapping from each element to the rows that contain it.

Querying `WHERE tags @> ARRAY['postgres']` on an array column uses a GIN index to find rows that contain 'postgres' in their tags array without scanning every row. Similarly, `WHERE body_tsvector @@ to_tsquery('postgresql & index')` uses GIN for full-text search.

GIN indexes are slower to update than B-trees because each insert may add many entries (one per element). The `fastupdate` setting batches inserts into a pending list and merges them lazily, which speeds up writes at the cost of slightly stale search results.

### BRIN

Block Range Indexes store summary information about ranges of pages rather than indexing individual rows. A BRIN index on a physically ordered column (like a timestamp in an append-only table) can be tiny and still eliminate most of the table from a range scan.

BRIN indexes take almost no space (often 1/100th the size of a B-tree) but only work well when the physical order of rows correlates with the indexed column. If your data is randomly ordered, BRIN provides little benefit.

### Covering Indexes

Postgres 11 introduced covering indexes with the `INCLUDE` clause. `CREATE INDEX idx_covering ON orders (customer_id) INCLUDE (status, total)` creates a B-tree on `customer_id` but also stores `status` and `total` in leaf pages. Queries that need all three columns can be answered entirely from the index without touching the table.

## Query Planning and Execution

When you send a query, Postgres parses it into an abstract syntax tree, rewrites it (applying views and rules), and passes it to the planner. The planner generates possible execution plans, estimates the cost of each, and picks the cheapest.

### How the Planner Estimates Cost

The planner uses statistics collected by `ANALYZE` (run by autovacuum or manually). These statistics include the number of rows in each table, the distribution of values in each column (stored as a histogram and most-common-values list), the correlation between physical and logical ordering, and the average width of rows.

The planner does not estimate wall-clock time. It estimates an arbitrary cost unit that roughly corresponds to sequential page reads. A sequential page read costs 1 unit (the `seq_page_cost` parameter). A random page read costs 4 units by default (`random_page_cost`). This assumes mechanical disks. On SSDs, you should set `random_page_cost` to 1.1 or 1.0 because random reads are nearly as fast as sequential reads.

When the planner guesses wrong, it picks a bad plan. The most common cause is stale statistics. If autovacuum has not run recently enough on a frequently updated table, the planner's row estimates can be off by orders of magnitude. Running `ANALYZE` manually on the table fixes this.

### Common Plan Nodes

**Sequential Scan** reads every row in the table. Not always bad. For small tables or queries selecting a large percentage of rows, a sequential scan is faster than an index scan because it avoids random I/O.

**Index Scan** traverses a B-tree index to find matching rows, then fetches the corresponding table rows. Good for selective queries that return a small percentage of the table.

**Bitmap Heap Scan** is the middle ground. Postgres first does a Bitmap Index Scan to collect all matching index entries into a bitmap in memory. Then it does a Bitmap Heap Scan, visiting the table pages in physical order. This reduces random I/O compared to a plain index scan when many rows match.

**Nested Loop Join** iterates over the outer table and for each row, looks up matching rows in the inner table using an index. Good when the outer table is small and the inner table has a useful index.

**Hash Join** builds a hash table of the smaller table in memory, then scans the larger table probing the hash table for matches. Good for joins without useful indexes when the smaller table fits in `work_mem`.

**Merge Join** sorts both inputs on the join key and merges them in a single pass. Good when the inputs are already sorted (from an index scan or a previous sort step).

### EXPLAIN ANALYZE

`EXPLAIN ANALYZE` actually runs the query and shows real timing alongside estimated costs. The key columns are `actual_rows` vs `plan_rows`. When these differ significantly, the planner's statistics are wrong.

Look for nodes with `actual_rows` orders of magnitude higher than `plan_rows`. This usually means the planner underestimated selectivity and chose a plan that works for few rows but scales poorly. The fix is usually to run `ANALYZE` on the relevant tables, add missing statistics with `CREATE STATISTICS`, or adjust the query.

## VACUUM and Bloat

Because Postgres uses MVCC with in-table version storage, UPDATE and DELETE operations leave behind dead row versions (also called dead tuples). These dead rows take up space and cause table bloat.

VACUUM removes dead tuples so the space can be reused. It does not shrink the table file by default. It marks the space as available for future inserts. Only `VACUUM FULL` rewrites the table to reclaim space, but it takes an exclusive lock on the table for the entire operation.

Autovacuum runs automatically based on thresholds. The default thresholds trigger a VACUUM when 20% of the rows in a table have changed (`autovacuum_vacuum_scale_factor = 0.2`). For large tables, this means autovacuum runs when 200 million rows out of 1 billion have changed. For small tables, it runs when 200 rows out of 1,000 have changed. Neither is ideal in all cases.

For large tables, consider setting `autovacuum_vacuum_scale_factor = 0` and `autovacuum_vacuum_threshold` to an absolute number. For example, VACUUM every time 100,000 rows change regardless of table size.

Bloat happens when VACUUM cannot keep up or when long-running transactions prevent dead rows from being removed. If a transaction is open and might need to see old row versions, autovacuum cannot remove them. This is the most common cause of table bloat: open transactions holding snapshots.

You can check bloat using queries against `pg_stat_user_tables` or extensions like `pgstattuple`. If a table is severely bloated and autovacuum cannot recover the space, `VACUUM FULL` or `pg_repack` (which works without exclusive locks) are the solutions.

## Partitioning

Partitioning splits a large table into smaller physical tables that are logically one table. Queries with filters on the partition key can skip entire partitions (partition pruning). Maintenance operations like VACUUM, CREATE INDEX, and DROP operate on individual partitions instead of the entire table.

Postgres supports three partitioning strategies.

**Range partitioning** divides rows by a range of values. The most common pattern is partitioning by date, where each partition holds one month or one day of data. `CREATE TABLE measurements (ts timestamptz, value float) PARTITION BY RANGE (ts)` with partitions like `measurements_2026_01`, `measurements_2026_02`, and so on.

**List partitioning** divides rows by discrete values. Useful for partitioning by region, category, or tenant. `PARTITION BY LIST (region)` with partitions for each region.

**Hash partitioning** distributes rows evenly across a fixed number of partitions using a hash of the partition key. Useful when no natural range or list division exists and you just want to spread data evenly.

### Partition Pruning

The main performance benefit. When you query `SELECT * FROM measurements WHERE ts >= '2026-06-01' AND ts < '2026-07-01'`, the planner knows only the June partition is relevant and skips all others. This turns a scan of billions of rows into a scan of millions.

Pruning happens at two levels. Static pruning uses constants in the query. Dynamic pruning uses parameters determined at execution time (like prepared statement parameters). Both work, but static pruning is faster because it happens during planning.

### Partition Maintenance

Old partitions can be dropped with `DROP TABLE measurements_2025_01`, which is instantaneous compared to `DELETE FROM measurements WHERE ts < '2025-02-01'` on an unpartitioned table. This is the primary operational benefit of partitioning in time-series workloads.

Detaching a partition with `ALTER TABLE measurements DETACH PARTITION measurements_2025_01` makes it a standalone table that can be archived, moved to cheaper storage, or queried independently.

## Data Types Worth Knowing

Postgres has data types that most databases do not offer. Using them well is what separates casual Postgres users from people who actually leverage the database.

**JSONB** stores JSON in a binary format. It supports indexing with GIN, querying with `@>`, `?`, and `->>`, and modifying with `jsonb_set`. It is not a replacement for proper relational modeling, but for semi-structured data, configuration storage, and API payloads, it eliminates the need for a separate document database.

**Arrays** store lists of values natively. `INTEGER[]`, `TEXT[]`, even `UUID[]`. You can index them with GIN, search with `ANY()`, and aggregate with `array_agg()`. Useful for tags, multi-value attributes, and avoiding join tables when the relationship is simple.

**UUID** is a native type, not a string. It stores 128 bits in 16 bytes instead of 36 characters, and comparisons are faster because they operate on binary data rather than strings.

**tsrange, tstzrange, daterange** are range types that store intervals. `WHERE booking_range && tsrange(start, end)` checks for overlapping ranges in a single expression. GiST indexes on range types enable efficient overlap and containment queries.

**ltree** (requires extension) stores label paths like `science.physics.quantum` and supports operations like `@>` (ancestor), `<@` (descendant), and `~` (pattern match). Useful for hierarchical data without recursive queries.

### ENUM vs CHECK Constraint

Postgres ENUMs are stored efficiently as 4-byte integers but require an `ALTER TYPE ... ADD VALUE` to add new values, which locks the type. CHECK constraints are more flexible. For a small, stable set of values, use ENUM. For values that change, use CHECK constraints or a reference table.

## Common Pitfalls

**Connection storms.** Postgres forks a process per connection. Use connection pooling (PgBouncer or Postgres 16's built-in connection concentrator) to reduce the number of backend processes. PgBouncer in transaction pooling mode can handle tens of thousands of connections with a small pool of backend connections.

**Default configuration.** Out of the box, Postgres is configured for a machine with very little memory. `shared_buffers = 128MB`, `work_mem = 4MB`, `effective_cache_size = 4GB`. These are too low for any modern server. Adjust them based on your hardware.

**Idle in transaction.** A connection that starts a transaction and does nothing holds locks and prevents autovacuum from cleaning up dead rows. Set `idle_in_transaction_session_timeout` to automatically kill connections that sit idle in a transaction for too long.

**Prepared statement plan caching.** Prepared statements cache their execution plan. If the first execution uses a plan optimized for few rows and subsequent executions process many rows, the cached plan is wrong for the new parameters. Postgres 12+ handles this better with generic and custom plans, but it is still worth knowing.

**Orphaned replication slots.** If a replica disconnects without dropping its replication slot, the primary keeps WAL files indefinitely. This causes disk to fill up. Monitor `pg_replication_slots` and set `max_slot_wal_keep_size`.

**Not using EXPLAIN.** The query planner is smart but not psychic. When a query is slow, run `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)` and read the output. The documentation on `EXPLAIN` output is worth reading end to end.

## When Postgres Is the Right Choice

Postgres is the right choice when you need a relational database with strong consistency, complex queries, and rich data types. It excels at OLTP workloads with moderate write rates, analytical queries on the same database (not a data warehouse replacement), geospatial data (with PostGIS), and applications that benefit from its type system (JSONB, arrays, ranges, custom types).

It is the wrong choice when you need write throughput beyond what a single primary can handle (consider sharding with Citus or moving to CockroachDB), sub-millisecond latency across geographically distributed nodes (consider CockroachDB or YugabyteDB when you need multi-region writes), or a document database where every access pattern is by document ID (consider MongoDB).

For most applications, Postgres is the best default choice. Not because it is perfect, but because it handles more use cases well than any other single database. You can always specialize later. Starting with Postgres means you rarely need to.

Happy designing