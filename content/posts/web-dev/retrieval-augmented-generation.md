---
title: How RAG Works
draft: false
date: 2026-06-11
description: "Retrieval-Augmented Generation from the ground up: embeddings, vector search, chunking strategies, retrieval pipelines, and how to build AI applications that answer questions from your own data."
categories:
  - tech
tags:
  - tech
  - ai
  - web-dev
keywords:
  - RAG
  - retrieval augmented generation
  - embeddings
  - vector search
  - vector database
  - semantic search
  - LLM
  - AI application
  - chunking
  - pgvector
Author: Ahmad Hassan
---

Large language models know a lot. They have seen most of the public internet. They can write code, summarize documents, explain concepts, and reason through problems. But they have two problems that make them unreliable for real applications.

First, they have a knowledge cutoff. A model trained in 2024 does not know about events in 2025. It does not know about your internal documentation, your product updates, or your users' private data.

Second, they hallucinate. When a model does not know something, it does not say "I don't know." It generates a confident-sounding answer from patterns in its training data. The answer looks right. It is often wrong.

Retrieval-Augmented Generation (RAG) fixes both problems. Instead of relying on the model's internal knowledge, you retrieve relevant context from an external source and include it in the prompt. The model answers based on what you give it, not what it memorized.

This article explains how RAG works from the ground up, what each component does, and where the tradeoffs live.

## The Core Idea

RAG is a pipeline with two phases: retrieval and generation.

**Retrieval:** Given a user's question, find the most relevant documents from your knowledge base.

**Generation:** Pass those documents plus the question to the language model. The model answers based on the retrieved context.

The key insight is that you are not asking the model to remember anything. You are giving it a reading comprehension task: here are some documents, here is a question, answer from the documents. Models are excellent at this. They are much less reliable when asked to produce knowledge from memory.

```
User question
     │
     ▼
  Retrieval
  ─────────
  Embed question
  Search vector store
  Return top-k documents
     │
     ▼
  Generation
  ──────────
  Prompt: "Given these documents: [docs]\nAnswer: [question]"
  LLM produces answer
     │
     ▼
  Response to user
```

## Embeddings

Retrieval depends on a way to measure how similar a question is to a document. The mechanism is embeddings.

An embedding model converts text into a vector: a list of floating-point numbers. The critical property is that semantically similar texts produce vectors that are close together in the vector space, while dissimilar texts produce vectors that are far apart.

```typescript
// Conceptual — not actual values
embed("What is the capital of France?")  // [0.21, -0.83, 0.14, ...]
embed("The capital city of France is Paris.") // [0.19, -0.81, 0.16, ...]
embed("How do you bake a chocolate cake?")   // [-0.54, 0.33, -0.72, ...]
```

The first two vectors are close because they are semantically related. The third is far away because it is about a completely different topic.

The embedding model you use matters. OpenAI's `text-embedding-3-small` and `text-embedding-3-large` are popular. Google's `text-embedding-004` is the current standard for Gemini-based pipelines. Open-source alternatives like `nomic-embed-text` and `bge-m3` run locally without API costs.

All embedding models output vectors of a fixed dimension. `text-embedding-3-small` outputs 1536 dimensions. `text-embedding-3-large` outputs 3072. More dimensions generally means more expressive embeddings but more storage and slower search.

Every piece of text in your knowledge base must be embedded before it can be searched. Every query must be embedded before it can be compared. The embedding model you use for indexing must be the same one you use for querying — vectors from different models are not comparable.

## Vector Search

Once you have embeddings, you need a way to find the documents most similar to a given query embedding. This is vector search.

The standard similarity metric is cosine similarity. It measures the angle between two vectors. A value of 1.0 means identical direction (maximum similarity). A value of 0.0 means perpendicular (no relation). A value of -1.0 means opposite direction.

```
cosine_similarity(a, b) = (a · b) / (|a| × |b|)
```

For normalized vectors (which most embedding models produce), cosine similarity is equivalent to dot product, which is faster to compute.

Brute-force search compares the query vector against every document vector and returns the top matches. This works for small datasets (under a few hundred thousand documents) but does not scale. For a million documents, comparing against all of them for every query is too slow.

Approximate Nearest Neighbor (ANN) indexes trade a small accuracy loss for a large speed gain. HNSW (Hierarchical Navigable Small World) is the most widely used algorithm. It builds a graph where each node has edges to nearby nodes, allowing fast traversal to find approximate nearest neighbors. Lookups are O(log n) instead of O(n).

Vector databases like Pinecone, Weaviate, Qdrant, and Chroma handle this complexity. For applications already using PostgreSQL, `pgvector` is the most practical choice. It adds a `vector` column type and an HNSW index to Postgres, letting you do vector search in SQL.

```sql
-- pgvector: find 5 most similar documents to a query embedding
SELECT id, content, 1 - (embedding <=> $1) AS similarity
FROM documents
ORDER BY embedding <=> $1
LIMIT 5;
```

`<=>` is the cosine distance operator. Lower distance means higher similarity. The `1 - distance` converts it to a similarity score between 0 and 1.

## Chunking

You cannot embed entire documents. A document could be 50,000 words. Embedding models have context limits. More importantly, a document about three different topics would produce an embedding that is "about" all three topics vaguely, rather than strongly matching any specific query.

Chunking splits documents into smaller pieces that are each embedded separately. A query about one topic matches the chunk about that topic, not the diluted embedding of the entire document.

The chunking strategy is one of the most impactful decisions in a RAG pipeline. There is no universal right answer.

### Fixed-size chunking

Split the document every N characters or tokens, with some overlap between chunks to preserve context across boundaries.

```typescript
function chunkBySize(text: string, chunkSize: number, overlap: number): string[] {
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    chunks.push(text.slice(start, start + chunkSize));
    start += chunkSize - overlap;
  }
  return chunks;
}
```

Simple and predictable. The overlap ensures that a sentence split across two chunks is not lost. The weakness is that it ignores document structure. A chunk might start mid-sentence or mid-paragraph.

### Semantic chunking

Split on document boundaries: paragraphs, sections, headings. For Markdown, split on headers. For code, split on function definitions. For HTML, split on block-level elements.

This preserves semantic coherence. Each chunk is a unit that makes sense on its own. The weakness is that chunks have variable sizes, and very short chunks (a single sentence) may embed poorly because they lack context.

### Hierarchical chunking

Keep both large and small chunks. Store the full section for context and individual sentences for precise matching. When retrieving, find the matching sentence but include the surrounding section in the prompt.

This is the most expensive approach in terms of storage and indexing time, but it often produces the best retrieval quality.

### Chunk size considerations

Smaller chunks retrieve more precisely but provide less context. Larger chunks provide more context but match less precisely. A common starting point is 512-1024 tokens with 10-20% overlap. Measure retrieval quality on your specific dataset and adjust.

Always store metadata with each chunk: the source document, the page or section number, a timestamp. This lets you cite sources in the response and filter by recency or relevance.

## The Retrieval Pipeline in Detail

A production retrieval pipeline is more than a single vector search.

### Query transformation

The user's question is not always the best query for vector search. "What's the refund policy?" might match poorly against a policy document that uses different vocabulary.

Query expansion generates multiple versions of the question and searches with all of them, merging the results.

```typescript
async function expandQuery(question: string): Promise<string[]> {
  const prompt = `Generate 3 alternative phrasings of this question:
"${question}"
Return as a JSON array of strings.`;
  const result = await llm.generate(prompt);
  return JSON.parse(result);
}
```

HyDE (Hypothetical Document Embeddings) generates a hypothetical answer to the question, then embeds and searches with that. The idea is that a hypothetical answer is in the same semantic space as actual documents that contain the answer.

### Hybrid search

Pure vector search is semantic but misses exact keyword matches. "What does RFC 8259 say about null values?" is better served by a keyword search for "RFC 8259" than by semantic similarity.

Hybrid search combines vector search with BM25 (a keyword-based ranking algorithm). The results from both are merged using Reciprocal Rank Fusion (RRF), which combines rankings without needing to normalize scores from different systems.

```
final_score(d) = Σ 1 / (k + rank(d, method))
```

where k is a smoothing constant (typically 60) and the sum is over each retrieval method. Documents that rank highly in both systems score highest.

PostgreSQL with `pgvector` can do this natively with a full-text search index alongside the vector index.

### Reranking

The initial retrieval (top-k by similarity) is fast but imprecise. Reranking applies a more expensive cross-encoder model to rescore the retrieved documents against the query.

A cross-encoder takes the query and document together as input and produces a single relevance score. It is slower than an embedding-based retriever because it cannot pre-compute document representations — it must process the query-document pair jointly. But it is significantly more accurate.

A typical pipeline retrieves top-50 documents with fast vector search, then reranks them with a cross-encoder to select the top-5 for the prompt.

Cohere's Rerank API and open-source models like `cross-encoder/ms-marco-MiniLM-L-6-v2` are common choices.

## Building the Prompt

Once you have retrieved the relevant chunks, you construct the prompt.

```typescript
function buildPrompt(question: string, chunks: string[]): string {
  const context = chunks
    .map((chunk, i) => `[Document ${i + 1}]\n${chunk}`)
    .join("\n\n");

  return `You are a helpful assistant. Answer the question based only on the provided context.
If the context does not contain enough information to answer the question, say so.

Context:
${context}

Question: ${question}

Answer:`;
}
```

The instruction "answer based only on the provided context" is critical. Without it, the model blends retrieved context with its internal knowledge, which undermines the goal of grounding responses in your data.

"If the context does not contain enough information, say so" handles the case where retrieval fails. Without this, the model hallucinates an answer even when the retrieved documents are irrelevant.

### Context window management

Language models have context limits. GPT-4o supports 128k tokens. Gemini 1.5 Pro supports 1 million. But larger contexts are slower and more expensive, and research shows that models pay less attention to content in the middle of long contexts (the "lost in the middle" problem).

Practical approaches include limiting to top-5 retrieved chunks rather than top-20, summarizing retrieved chunks before inserting them into the prompt, and prioritizing the most relevant chunks when the total exceeds the context limit.

## Indexing Pipeline

Before you can query, you must index. The indexing pipeline processes your documents once (and again whenever they change) and stores the embeddings.

```typescript
async function indexDocument(
  content: string,
  metadata: Record<string, unknown>
) {
  const chunks = chunkBySemantic(content);

  for (const chunk of chunks) {
    const embedding = await embedModel.embed(chunk);
    await db.query(
      `INSERT INTO documents (content, embedding, metadata)
       VALUES ($1, $2, $3)`,
      [chunk, embedding, metadata]
    );
  }
}
```

For large document sets, index in batches and use an embedding model that supports batch requests to reduce API calls. Most embedding APIs allow batches of 100-2000 texts per request.

For documents that change frequently, track a content hash. Only re-index documents whose hash has changed.

For real-time data (like a Slack workspace or a CRM), use Change Data Capture or webhooks to trigger re-indexing when documents are updated.

## Evaluation

RAG pipelines are hard to evaluate because "correctness" depends on both retrieval quality and generation quality. The two components can fail independently.

**Retrieval evaluation** measures whether the relevant documents are in the top-k results. You need a dataset of questions paired with the documents that should answer them. Metrics include Recall@k (what fraction of relevant documents are in the top-k) and MRR (Mean Reciprocal Rank, which penalizes relevant documents that appear lower in the ranking).

**Generation evaluation** measures whether the answer is faithful to the retrieved context and whether it correctly answers the question. RAGAS is an open-source framework that automates this using an LLM as a judge. It measures faithfulness (does the answer contradict the context?), answer relevance (does the answer address the question?), and context precision/recall.

The most reliable evaluation is human annotation: a set of golden question-answer pairs written by domain experts. Use this as a regression test when you change chunking strategies, embedding models, or retrieval parameters.

## Common Failure Modes

**Retrieval failure.** The correct document exists in your knowledge base but is not retrieved. Caused by poor chunking (the relevant information is split across chunks), poor embedding quality (the query and document are semantically dissimilar in the embedding space), or missing metadata filtering (the right document exists but is filtered out).

**Context poisoning.** Irrelevant chunks are retrieved and confuse the model. The model produces an answer that seems plausible but is based on the wrong context. More aggressive reranking and a higher similarity threshold reduce this.

**Chunk boundary artifacts.** A retrieved chunk starts or ends in the middle of a sentence, losing critical context. Increase overlap between chunks or use sentence-aware chunking.

**Outdated context.** Your index is stale. The correct answer exists in a newer document that has not been indexed. Implement freshness-aware retrieval by weighting recent documents higher or filtering by recency for time-sensitive queries.

**Hallucination despite grounding.** The model produces content not in the retrieved context. Stronger grounding instructions, lower temperature, and explicit citations reduce this. Having the model cite the specific document number forces it to stay closer to the source.

## A Minimal Working Implementation

Here is a complete, minimal RAG pipeline using pgvector and the Gemini API, which is the stack behind several of my own projects.

```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pool } from "pg";

const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const db = new Pool({ connectionString: process.env.DATABASE_URL });

async function embed(text: string): Promise<number[]> {
  const model = genai.getGenerativeModel({ model: "text-embedding-004" });
  const result = await model.embedContent(text);
  return result.embedding.values;
}

async function indexChunk(content: string, source: string) {
  const embedding = await embed(content);
  await db.query(
    `INSERT INTO documents (content, source, embedding)
     VALUES ($1, $2, $3::vector)`,
    [content, source, JSON.stringify(embedding)]
  );
}

async function retrieve(question: string, topK = 5): Promise<string[]> {
  const queryEmbedding = await embed(question);
  const result = await db.query(
    `SELECT content
     FROM documents
     ORDER BY embedding <=> $1::vector
     LIMIT $2`,
    [JSON.stringify(queryEmbedding), topK]
  );
  return result.rows.map((r: { content: string }) => r.content);
}

async function answer(question: string): Promise<string> {
  const chunks = await retrieve(question);
  const context = chunks.map((c, i) => `[${i + 1}] ${c}`).join("\n\n");

  const model = genai.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = `Answer the question using only the context below.
If the context is insufficient, say so.

Context:
${context}

Question: ${question}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
```

This is minimal. A production pipeline adds chunking, hybrid search, reranking, caching, and evaluation. But this skeleton shows the shape of the problem and is enough to get started.

## When RAG Is Not the Answer

RAG is not the right solution for every AI application.

If the knowledge base is small and mostly static (a few hundred pages that rarely change), fine-tuning the model on that knowledge might be simpler and more reliable. Fine-tuning embeds the knowledge into the model's weights instead of retrieving it at runtime.

If the queries require complex multi-hop reasoning (answering requires combining information from three different documents in a specific way), a simple RAG pipeline may struggle. Agents with tool use or graph-based retrieval handle multi-hop reasoning better.

If the application does not need factual grounding (creative writing, code generation for well-understood tasks, general conversation), a plain LLM without retrieval is simpler and faster.

RAG is the right choice when: your domain changes frequently, you cannot modify the underlying model, you need to cite sources, or you need to keep proprietary data out of model training.

For everything else, evaluate whether the complexity of a RAG pipeline actually solves your problem or whether a simpler approach works just as well.

Happy designing