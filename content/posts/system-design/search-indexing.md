---
title: Search and Indexing
draft: false
date: 2026-04-25
description: "How search engines find what you're looking for in milliseconds - inverted indexes, full text search, ranking, Elasticsearch, and sharding indexes for scale."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - search indexing
  - inverted index
  - full text search
  - Elasticsearch architecture
  - search ranking relevance
  - search sharding
  - query processing
  - system design fundamentals
Author: Ahmad Hassan
---

You type "wireless headphones under 50" into a search bar. A million products exist. The results appear in 50 milliseconds. How?

Not by scanning every product in the database. That would take seconds. Instead, the search engine consults an index. A data structure built specifically to answer this query fast.

The core data structure behind search is the inverted index.

An inverted index works like the index at the back of a textbook. Instead of listing every page that contains the word "photosynthesis" by reading the entire book, you look up "photosynthesis" in the index and find pages 47, 112, and 203. The index maps terms to the documents that contain them.

In a search engine, the inverted index maps each token to a list of document IDs where that token appears. The token is a word after processing. Processing includes lowercasing, stemming, and removing stop words.

Lowercasing ensures that "Wireless" and "wireless" map to the same entry. Stemming reduces words to their root form so "running", "runs", and "ran" all map to "run". Stop word removal discards common words like "the", "a", "and" that appear in almost every document and carry no meaning.

So when you search for "wireless headphones under 50", the search engine tokenizes the query into ["wireless", "headphone", "under", "50"]. It looks up each token in the inverted index and gets a list of document IDs. Then it intersects the lists to find documents that contain all the terms. Those documents are the search results.

Actually, most search engines don't require all terms to match. They use a scoring algorithm to rank documents by relevance. The most common scoring algorithm is TF-IDF, which stands for Term Frequency times Inverse Document Frequency.

Term frequency measures how often a term appears in a document. A document that mentions "wireless" five times is probably more relevant to a wireless headphones query than one that mentions it once. But term frequency alone would favor long documents that mention every term many times.

Inverse document frequency measures how rare a term is across the entire corpus. The word "the" appears in almost every document. Its IDF is near zero because it carries no distinguishing information. The word "photosynthesis" appears in very few documents. Its IDF is high because it strongly signals relevance. IDF penalizes common terms and rewards rare, specific terms.

The product of TF and IDF gives a relevance score. Documents with higher scores appear higher in results. This is the foundation of most search ranking.

Modern search engines use variants like BM25, which improves on TF-IDF by adding term frequency saturation and document length normalization. A document that mentions a term 20 times is not 20 times more relevant than one that mentions it once. BM25 dampens the effect so additional mentions provide diminishing returns.

But search is not just about matching text. Real search engines rank results using dozens of signals beyond textual relevance. Popularity. How many people have clicked on or purchased this item. Recency. How recently was this published. Personalization. What has this user searched for before. Location. What's nearby. Quality. What's the review rating.

Each signal contributes a score. The final ranking is a weighted combination of all scores. The art of search is tuning these weights to produce results that feel right to users.

Elasticsearch is the most widely used search engine in production systems. It's built on Apache Lucene, which provides the inverted index and scoring algorithms. Elasticsearch adds a distributed layer on top, making it possible to run search across multiple nodes with automatic sharding, replication, and failover.

When you create an index in Elasticsearch, you specify the number of shards. Each shard is a separate Lucene index. Data is distributed across shards based on a hash of the document ID. Each shard holds a subset of the data and its own inverted index. When a search request arrives, Elasticsearch sends it to all shards in parallel, collects the results, merges them by score, and returns the top hits.

This is why search scales horizontally. More data? Add more shards. More queries? Add more nodes. Each shard can also have replicas, which serve read queries and provide failover if a node goes down.

Sharding introduces a tradeoff. The more shards you have, the more nodes a single query must visit. A search across 50 shards is slower than a search across 5 shards because the results from all 50 must be gathered and merged. But fewer shards means each shard holds more data, which slows down indexing and individual shard queries. The right number of shards depends on your data size and query volume.

Elasticsearch also supports analyzers, which define how text is processed during indexing and querying. The standard analyzer lowercases, tokenizes on punctuation, and removes basic stop words. The English analyzer adds stemming. The ngram analyzer breaks words into substrings for partial matching. You can create custom analyzers for specific languages or domain jargon.

Analyzers have two phases. The indexing phase processes the document text and builds the inverted index. The query phase processes the search query the same way so that the processed query terms match the processed index terms. If your analyzer lowercases during indexing, it must also lowercase during querying. This seems obvious but mismatched analyzers are a common source of search bugs.

Let's talk about the types of queries search engines support.

Full text search matches terms in the inverted index. This is what we've been discussing. Best for natural language queries where you want ranked, relevance based results.

Exact match query matches a specific value. Finding all products where the brand is "Sony" or the price is exactly 50. This uses term filters, not the inverted index. Term filters are fast because they use a separate data structure called a doc values set, which is essentially a columnar index.

Range query finds documents where a field falls within a range. Price between 30 and 50. Date between January and March. These use the same columnar structures for fast filtering.

Boolean queries combine multiple conditions with AND, OR, and NOT. "Wireless AND headphones AND NOT overear." Each condition produces a set of document IDs. The boolean operations combine these sets.

Faceted search is what powers the sidebar filters on e-commerce sites. You search for "headphones" and the sidebar shows counts: Brand: Sony (45), Bose (32), JBL (28). Type: Over-ear (60), In-ear (40). Price: Under $50 (25), $50-$100 (40), Over $100 (35). These counts are computed by aggregating across the result set on each field. Faceted search requires both the inverted index for the text match and the columnar index for fast aggregation.

One practical consideration for production search. Indexing is not instant. When a document is added or updated, it takes time for the inverted index to be rebuilt. In Elasticsearch, this is called the refresh interval, defaulting to 1 second. Documents added within the last second won't appear in search results until the next refresh. For near real time systems, this is acceptable. For systems requiring instant visibility, you can reduce the refresh interval at the cost of higher indexing overhead.

Search is not just a feature. It's a system that requires its own infrastructure. Separate from your primary database. When a user creates a product, you write it to your database and also index it in Elasticsearch. Keeping the search index in sync with the database is a maintenance task. The most common approach is change data capture, where a process watches the database transaction log and extracts changes to send to the search engine. This ensures the search index stays consistent without modifying your application code.

Happy designing