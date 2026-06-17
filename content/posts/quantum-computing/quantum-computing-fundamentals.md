---
title: Quantum Computing Fundamentals
draft: false
date: 2026-05-08
description: "The building blocks of quantum computing: qubits, superposition, entanglement, and measurement. How quantum mechanics enables computation that classical machines cannot match."
categories:
  - quantum-computing
tags:
  - quantum-computing
  - quantum-physics
keywords:
  - quantum computing
  - qubits
  - superposition
  - entanglement
  - quantum mechanics
  - quantum bits
  - quantum measurement
  - quantum states
Author: Ahmad Hassan
---

A classical computer thinks in bits. Each bit is either 0 or 1. A register of 8 bits holds exactly one value between 0 and 255. To explore all 256 possibilities, a classical machine has to check them one by one.

A quantum computer thinks in qubits. A qubit can be 0, 1, or both at the same time. A register of 8 qubits can represent all 256 values simultaneously. This is not a metaphor. This is how quantum mechanics works.

Understanding quantum computing starts with understanding four ideas: superposition, entanglement, measurement, and the computational gap they create.

![Bloch sphere showing qubit state with theta and phi angles](/posts/assets/quantum/bloch-sphere.svg)

## The Qubit

A classical bit is a switch. Off or on. 0 or 1. You read it, you get one value.

A qubit is a quantum system. Think of it as an electron that can spin up or down, or a photon that can be polarized horizontally or vertically. Before you measure it, the qubit exists in a combination of both states. This combination is called superposition.

Mathematically, a qubit is written as:

`|ψ⟩ = α|0⟩ + β|1⟩`

Where `α` and `β` are complex numbers called probability amplitudes. The squares of their absolute values give the probabilities of measuring 0 or 1. Specifically, `|α|² + |β|² = 1`. This means the qubit is not "secretly" 0 or 1. It genuinely exists in both states until you look.

When you measure the qubit, it collapses. You get 0 with probability `|α|²` and 1 with probability `|β|²`. After measurement, the qubit is now definitively in the state you observed. The superposition is gone.

This is the first thing that confuses people. Superposition does not mean the qubit is "random." It means the qubit encodes probability amplitudes, which are complex numbers that can interfere with each other. This interference is what makes quantum computing powerful.

## Superposition in Practice

![Classical bits vs qubits showing exponential state space](/posts/assets/quantum/superposition.svg)

One qubit in superposition holds two states at once. Two qubits hold four. Three hold eight. `n` qubits hold `2ⁿ` states.

This exponential scaling is the core resource of quantum computing. With just 50 qubits, you can represent over a quadrillion states simultaneously. With 300 qubits, you can represent more states than there are atoms in the observable universe.

But here is the catch. You cannot read out all those states at once. Measurement collapses the superposition to a single result. The art of quantum computing is manipulating the superposition so that the correct answer becomes the most likely measurement outcome.

Think of it like this. You have a maze with a million paths. A classical computer explores them one at a time. A quantum computer sends probability amplitude down all paths at once. Through constructive and destructive interference, wrong paths cancel out and the right path amplifies. When you measure, you are likely to find the exit.

## Entanglement

Superposition gives a single qubit its power. Entanglement connects qubits together.

Two qubits are entangled when measuring one immediately determines the state of the other, regardless of the physical distance between them. Einstein called this "spooky action at a distance." It is not magic. It is a consequence of quantum mechanics that has been experimentally verified countless times.

The simplest entangled state is the Bell state:

`|Φ⁺⟩ = (|00⟩ + |11⟩) / √2`

If you measure the first qubit and get 0, the second qubit is guaranteed to be 0. If you measure the first and get 1, the second is guaranteed to be 1. This correlation holds even if the qubits are on opposite sides of the planet.

Why does this matter for computing? Because entanglement allows qubits to coordinate in ways that classical bits cannot. It gives quantum computers the ability to create correlations across the entire state space. Without entanglement, a quantum computer would be no more powerful than a classical one.

In practical circuits, you create entanglement using a CNOT gate (also called CX). The CNOT takes a control qubit and a target qubit. If the control is |1⟩, the target flips. If the control is |0⟩, nothing happens. When you apply a CNOT to a qubit in superposition, the result is entanglement.

## Measurement

Measurement is how you get an answer out of a quantum computer. It is also the moment the quantum magic ends.

When you measure a qubit, three things happen simultaneously. The qubit collapses from superposition to a definite state (0 or 1). The probability of each outcome is determined by the amplitudes. And all entanglement involving that qubit is resolved.

This means measurement is destructive. You cannot measure the same qubit twice and expect the same result, because the first measurement already collapsed the state. You also cannot measure a subset of qubits in an entangled system without affecting the rest.

In practice, quantum algorithms are designed so that the computation happens in superposition and the measurement happens at the end. The algorithm steers the quantum state so that the correct answer has the highest probability amplitude. Then you measure, and with high likelihood, you get the right result.

Sometimes you need to run the algorithm multiple times and take the majority vote. This is called sampling, and it is a normal part of quantum computing.

## The Bloch Sphere

Visualizing qubits helps. The standard tool is the Bloch sphere.

A qubit state `|ψ⟩ = α|0⟩ + β|1⟩` can be written using two angles, `θ` and `φ`, on a unit sphere. The north pole is |0⟩. The south pole is |1⟩. Every point on the surface represents a valid qubit state.

The north pole is the classical 0. The south pole is the classical 1. The equator represents equal superposition. The X-axis represents |+⟩ and |−⟩ states. The Y-axis represents |↺⟩ and |↻⟩ states.

The Bloch sphere is useful because it gives you an intuitive picture. Quantum gates rotate the state vector on the sphere. Measurement projects the state onto one of the poles.

What the Bloch sphere cannot show is entanglement. A single qubit lives on a sphere. Two entangled qubits live in a space that cannot be drawn. This is a fundamental limitation of visualization.

## The Computational Gap

Classical computers can simulate quantum systems. The problem is efficiency. To simulate `n` qubits exactly, a classical computer needs to store `2ⁿ` complex amplitudes. For 50 qubits, that is roughly a petabyte of data. For 100 qubits, it exceeds the memory capacity of every computer on Earth.

Quantum computers do not store these amplitudes. They live in the quantum state itself. The hardware does not need to enumerate them. It manipulates them in parallel through quantum operations.

This is the computational gap. Not every problem benefits from it, but for certain classes of problems (factoring, searching unsorted databases, simulating quantum systems, optimization), the gap is exponential.

A quantum computer with 1000 reliable qubits could break RSA encryption in hours. The same task would take a classical supercomputer longer than the age of the universe.

That said, the current generation of quantum hardware is nowhere near 1000 reliable qubits. We are in the NISQ era: Noisy Intermediate-Scale Quantum. Today's machines have dozens to a few hundred qubits, and they are error-prone. Useful quantum advantage for real-world problems is still ahead of us.

## Physical Implementations

Qubits are fragile. They need to be isolated from the environment, kept extremely cold, and manipulated with precision. There are several physical platforms competing to build the first practical quantum computer.

**Superconducting qubits** are used by IBM, Google, and others. They operate at near absolute zero (15 millikelvin) and use Josephson junctions as nonlinear inductors. IBM's current processors have over 1000 qubits. Google's Sycamore demonstrated quantum advantage in 2019 on a 53-qubit chip. Superconducting qubits are fast (gate operations in nanoseconds) but have short coherence times (microseconds to milliseconds).

**Trapped ion qubits** use individual ions suspended in electromagnetic fields. IonQ and Quantinuum use this approach. Trapped ions have long coherence times (seconds to minutes) and high-fidelity gates. The tradeoff is speed. Gate operations take microseconds, and scaling to many qubits is challenging because all ions share the same trap.

**Photonic qubits** encode information in photons. Xanadu and PsiQuantum work on this approach. Photons do not need extreme cooling and can travel through optical fibers, making networking natural. But photon-photon interactions are weak, which makes two-qubit gates difficult.

**Neutral atom qubits** use arrays of atoms held in optical tweezers. QuEra and Pasqal use this approach. They can pack hundreds of atoms in a small volume and rearrange them programmatically. The technology is newer but showing rapid progress.

Each platform has tradeoffs. No clear winner has emerged yet.

## What Quantum Computing Is Not

Quantum computing is not faster computing in general. It does not speed up every algorithm. It does not replace classical computers. You will not run your web server on a quantum machine.

Quantum computing is a specialized tool for problems that have structure matching the properties of quantum mechanics: superposition, interference, and entanglement. For those problems, the speedup can be dramatic. For most problems, there is no speedup at all.

The danger of hype is real. Not every problem needs a quantum computer. Not every speedup is exponential. The most honest thing you can say about quantum computing right now is that it is early, it is promising, and it requires patience.

But the foundations are solid. The physics is real. The math is rigorous. And the potential is enormous.

Happy quantuming