---
title: Consensus Algorithms
draft: false
date: 2026-03-08
description: "How distributed systems agree on truth - Paxos, Raft, leader election, split brain, and why consensus is the hardest problem in distributed computing."
categories:
  - system-design
tags:
  - system-design
  - web
  - system-design
keywords:
  - consensus algorithms
  - Raft consensus
  - Paxos algorithm
  - leader election
  - distributed systems agreement
  - split brain problem
  - fault tolerance distributed
  - system design fundamentals
Author: Ahmad Hassan
---

Three generals are surrounding a city. They must attack at dawn or retreat. If they all attack, they win. If they all retreat, they live to fight another day. If some attack and some retreat, they are destroyed. They can only communicate by messenger. One general might be a traitor. How do they reach agreement?

This is the Byzantine Generals Problem. And it cuts to the heart of distributed systems.

In a single machine, truth is obvious. The data is in memory or on disk. There is one copy. There is no disagreement. In a distributed system, multiple machines hold copies of the same data. They communicate over a network that can delay, drop, or reorder messages. Machines can crash and restart. How does the system agree on what is true?

This is consensus. The most fundamental problem in distributed computing.

Consensus means all non faulty nodes must agree on the same value. Not most. All. And they must do so even when messages are lost, nodes crash, or the network partitions.

The formal requirements are three. Agreement: every node decides on the same value. Validity: the decided value must have been proposed by some node. Termination: every node eventually decides.

Simple to state. Extremely hard to guarantee.

The FLP impossibility result proves that in an asynchronous system where messages can be delayed indefinitely, there is no deterministic algorithm that can guarantee consensus. In plain terms, you cannot build a system that always reaches agreement in finite time if the network can delay messages forever.

But practical systems don't run on purely asynchronous networks. They use timeouts. They suspect failed nodes. They make progress in the common case even if the worst case is theoretically unsolvable. This is how systems like ZooKeeper, etcd, and Consul actually work.

The most famous consensus algorithm is Paxos. Proposed by Leslie Lamport in 1990, it remains the theoretical gold standard. Paxos guarantees safety, meaning non faulty nodes never disagree, even under network partitions. It makes progress when a majority of nodes are reachable and communicating.

But Paxos is notoriously hard to understand. Lamport's original paper presents it as the proceedings of a fictional parliament. Engineers who implement Paxos often discover subtle bugs months later. Google's Chubby lock service runs on Paxos, and their paper on it spends more time explaining the implementation pitfalls than the algorithm itself.

This is where Raft comes in. Designed by Diego Ongaro and John Ousterhout in 2014, Raft solves the same problem as Paxos but with a focus on understandability. Raft decomposes consensus into three subproblems that are each simpler to reason about.

Leader election. In Raft, one node acts as the leader. All write requests go through the leader. If the leader fails, the remaining nodes hold an election. Each node has a term number and a random election timeout. The first node whose timeout expires becomes a candidate, increments the term, and requests votes from other nodes. If it receives votes from a majority, it becomes the new leader.

Log replication. The leader receives a write request. It appends the entry to its log and sends it to followers. Once a majority of followers acknowledge the entry, the leader commits it and responds to the client. Followers apply committed entries to their state machines in order. This ensures all nodes converge on the same state.

Safety. Raft guarantees that if a log entry is committed on one node, it will never be overwritten on any node. This is enforced by requiring candidates to have up to date logs to win elections and by restricting which entries can be overwritten during leader changes.

The key insight in Raft is that leader based consensus is simpler. Instead of all nodes negotiating, one node decides. Followers follow. If the leader dies, a new one is elected. The system moves forward as long as a majority can communicate.

What about split brain? This happens when a network partition causes two groups of nodes to each believe they are the legitimate cluster. Two leaders exist simultaneously. Both accept writes. Data diverges.

Raft prevents split brain through the majority rule. A leader must have votes from more than half the cluster. In a five node cluster, a partition of three nodes can elect a leader. The partition of two cannot. The minority partition refuses to serve writes. This is safe but the minority partition becomes unavailable.

The tradeoff is clear. Raft chooses consistency over availability during partitions. This aligns with the CP side of the CAP theorem we discussed earlier.

What about the Byzantine case, where nodes might lie?

Consensus algorithms like Paxos and Raft assume nodes are honest but may crash or be unreachable. They tolerate crash faults, not Byzantine faults. Handling Byzantine faults, where nodes can behave arbitrarily or maliciously, requires protocols like PBFT (Practical Byzantine Fault Tolerance). These are more expensive, requiring at least 3f+1 nodes to tolerate f Byzantine faults. Most practical systems don't need Byzantine fault tolerance because nodes are under administrative control.

When should you care about consensus?

Whenever you have multiple nodes that must agree on a single truth. Database replicas that need to agree on the latest write. Distributed locks that must not be held by two nodes simultaneously. Configuration changes that must be applied consistently. Leader election in systems with failover.

ZooKeeper uses a Paxos variant called ZAB. etcd uses Raft. Consul uses Raft. CockroachDB uses Raft. TiKV uses Raft. If you run distributed infrastructure, you are likely running Raft under the hood.

So here's the mental model. Consensus is how distributed systems agree on truth when there is no single source of truth. Raft made it practical by making it understandable. The price is that availability during network partitions is sacrificed. The reward is that your data is never silently inconsistent.

Happy designing