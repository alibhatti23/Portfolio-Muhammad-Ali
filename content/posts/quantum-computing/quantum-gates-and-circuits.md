---
title: Quantum Gates and Circuits
draft: false
date: 2026-05-09
description: "How quantum circuits are built from gates: Pauli operators, Hadamard, CNOT, and how these operations manipulate qubits to perform computation."
categories:
  - quantum-computing
tags:
  - quantum-computing
  - quantum-physics
keywords:
  - quantum gates
  - quantum circuits
  - hadamard gate
  - CNOT gate
  - pauli gates
  - quantum operations
  - quantum computing
  - circuit model
Author: Ahmad Hassan
---

A classical computer processes bits using logic gates. AND, OR, NOT, NAND. Every digital circuit, from a simple adder to a full CPU, is built by combining these gates.

A quantum computer processes qubits using quantum gates. But quantum gates work differently. They are not switches. They are rotations. They manipulate the probability amplitudes of qubits in superposition, steering the quantum state toward the answer you want.

This article covers the gate model of quantum computing: what quantum gates are, how they work, and how you combine them into circuits that perform meaningful computation.

## Quantum Gates Are Matrices

Every quantum gate is a unitary matrix. Unitary means the matrix preserves the total probability of the quantum state. In practical terms, unitary operations are reversible. You can always undo a quantum gate by applying its inverse.

This reversibility is a fundamental difference from classical computing. A classical AND gate takes two bits and outputs one. You cannot reconstruct the inputs from the output. A quantum gate takes qubits and outputs qubits, and the transformation can always be reversed.

A single-qubit gate is a 2x2 unitary matrix. It operates on the state `|ψ⟩ = α|0⟩ + β|1⟩` by multiplying it. A two-qubit gate is a 4x4 matrix. An `n`-qubit gate is a `2ⁿ x 2ⁿ` matrix. In practice, most quantum algorithms decompose into sequences of one-qubit and two-qubit gates.

## The Pauli Gates

The three Pauli gates are the simplest and most fundamental quantum operations.

**X gate (Pauli-X).** This is the quantum equivalent of a classical NOT gate. It flips `|0⟩` to `|1⟩` and `|1⟩` to `|0⟩`. On the Bloch sphere, it rotates the state vector 180 degrees around the X-axis.

```
X = [[0, 1],
     [1, 0]]
```

If you apply X to a qubit in state `α|0⟩ + β|1⟩`, you get `β|0⟩ + α|1⟩`. The amplitudes swap.

**Y gate (Pauli-Y).** Similar to X, but it rotates around the Y-axis. It also introduces a phase factor of `i`. On the Bloch sphere, it rotates 180 degrees around Y.

```
Y = [[0, -i],
     [i,  0]]
```

**Z gate (Pauli-Z).** This one does not flip the basis states. Instead, it flips the phase of `|1⟩`. It adds a factor of -1 to the `|1⟩` component while leaving `|0⟩` unchanged. On the Bloch sphere, it rotates 180 degrees around Z.

```
Z = [[1,  0],
     [0, -1]]
```

The Z gate is critical for creating interference. By flipping the phase of specific states, you can make them cancel out destructively later in the circuit. This is how quantum algorithms amplify correct answers and suppress wrong ones.

## The Hadamard Gate

The Hadamard gate (H) is the most important gate in quantum computing. It creates superposition.

```
H = 1/√2 * [[1,  1],
              [1, -1]]
```

Apply H to `|0⟩` and you get `(|0⟩ + |1⟩) / √2`. This is an equal superposition. The qubit is now both 0 and 1 with equal probability.

Apply H to `|1⟩` and you get `(|0⟩ - |1⟩) / √2`. Same superposition, but with a negative phase on `|1⟩`.

The negative phase matters. When two H gates are applied in sequence, the negative phase cancels out and you get back to the original state. `H(H|0⟩) = |0⟩`. This is interference at work.

In algorithms, the Hadamard gate is used at the start to put all qubits into superposition. This is the "parallel computation" step. Then subsequent gates manipulate the amplitudes so that the correct answer gets amplified and wrong answers get suppressed.

The Hadamard gate is also the gateway to entanglement. Apply H to the first qubit, then CNOT it with a second qubit, and you have a Bell state: two maximally entangled qubits.

## The CNOT Gate

CNOT (Controlled-NOT) is the standard two-qubit gate. It takes a control qubit and a target qubit. If the control is `|0⟩`, nothing happens to the target. If the control is `|1⟩`, the target flips.

```
CNOT = [[1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 0, 1],
        [0, 0, 1, 0]]
```

In the basis `|00⟩, |01⟩, |10⟩, |11⟩`, the CNOT swaps `|10⟩` and `|11⟩`. The control stays the same, but the target flips when the control is 1.

The real power of CNOT shows when the control qubit is in superposition. If you apply H to qubit 0, putting it in equal superposition, then apply CNOT with qubit 0 as control and qubit 1 as target, the result is entanglement. The two qubits are now correlated in a way that cannot be described independently.

Without CNOT (or some other entangling gate), a quantum computer would be limited to independent qubits. No entanglement means no quantum advantage over classical computing. A set of single-qubit gates plus at least one entangling gate is called a universal gate set. With these, you can approximate any quantum computation.

## Other Common Gates

![Common quantum gate operations: X, Z, Hadamard, and CNOT with their effects and universal gate sets](/posts/assets/quantum/gate-operations.svg)

**S gate.** The S gate applies a phase of `i` (90 degrees) to `|1⟩`. It is the square root of Z. Calling S twice gives you Z. It is useful for fine-grained phase control.

```
S = [[1, 0],
     [0, i]]
```

**T gate.** The T gate applies a phase of `e^(iπ/4)` (45 degrees) to `|1⟩`. It is the fourth root of Z. The T gate is important because adding it to the set {H, CNOT} gives you a universal gate set. Without T, you cannot perform arbitrary quantum computations.

```
T = [[1, 0],
     [0, e^(iπ/4)]]
```

**Toffoli gate (CCNOT).** A three-qubit gate. It flips the target only if both controls are `|1⟩`. The Toffoli gate is universal for classical reversible computing. Any classical circuit can be built from Toffoli gates alone.

**SWAP gate.** Exchanges two qubits. `|01⟩` becomes `|10⟩` and vice versa. Used when you need to move qubits around in hardware where not all qubits are directly connected.

**Rz and Ry gates.** Parametric rotations around the Z and Y axes. `Rz(θ)` rotates by angle `θ` around Z. `Ry(θ)` rotates by `θ` around Y. These are the building blocks for variational quantum algorithms like VQE and QAOA, where the angles are optimized by a classical optimizer.

## Building a Quantum Circuit

![Bell state quantum circuit showing H gate and CNOT gate creating entanglement](/posts/assets/quantum/bell-state-circuit.svg)

A quantum circuit is a sequence of gates applied to qubits, followed by measurement. You draw it left to right. Each horizontal line represents a qubit. Gates are boxes on the lines. Measurement is a meter symbol at the end.

Here is a simple circuit that creates a Bell state:

```
q0: |0⟩ --[H]--●--
                |
q1: |0⟩ ------[X]--
```

Step by step. Start with both qubits in `|0⟩`. Apply H to qubit 0. Qubit 0 is now in equal superposition: `(|0⟩ + |1⟩) / √2`. Apply CNOT with qubit 0 as control and qubit 1 as target. The state becomes `(|00⟩ + |11⟩) / √2`. This is entanglement. Measuring either qubit gives a random 0 or 1, but the results are always the same.

This is the simplest useful quantum circuit. It demonstrates the two key operations: creating superposition with H, and creating entanglement with CNOT.

A more complex circuit is quantum teleportation. It uses three qubits, two Bell-state preparations, a Bell measurement, and two classical bits of communication. The circuit transfers an unknown quantum state from one location to another without physically moving the qubit. It is not faster-than-light communication because you still need classical bits to complete the transfer.

## Circuit Depth and Width

Two metrics define a quantum circuit's hardware requirements.

**Width** is the number of qubits. A circuit that uses 50 qubits requires a device with at least 50 qubits.

**Depth** is the number of time steps (layers of gates). A circuit with depth 1000 requires qubits that maintain coherence for at least 1000 gate operations.

Current NISQ devices have limited width (50-1000 qubits depending on platform) and limited depth (coherence times that allow maybe 100-1000 gate operations before errors dominate). This is the fundamental hardware constraint.

## Universal Gate Sets

A gate set is universal if any unitary operation can be approximated to arbitrary accuracy using only gates from the set. This is the quantum analog of how NAND gates are universal for classical computing.

Common universal gate sets include:
- {H, S, CNOT, T} (the standard set for most algorithms)
- {H, T, CNOT} (equivalent, since S = T²)
- {Rz, Ry, CNOT} (used in variational algorithms)

Any quantum algorithm can be decomposed into gates from a universal set. The分解 (decomposition) is not always unique, and finding the most efficient decomposition is an active area of research. In practice, compilers like Qiskit's transpiler handle this automatically.

## Measurement in Circuits

Quantum circuits end with measurement. You decide which qubits to measure and where to store the classical results.

Measurement is destructive. After measuring, the qubit is no longer in superposition. It collapses to 0 or 1. You cannot un-measure a qubit.

In practice, you measure all qubits at the end of the circuit. The result is a bitstring (like `01011`) sampled from the probability distribution defined by the final quantum state. You run the circuit many times (called shots) and collect statistics. The most frequent outcomes correspond to the answers with the highest probability amplitudes.

Some algorithms, like quantum teleportation and certain error correction protocols, use mid-circuit measurement. You measure a qubit partway through the computation and use the classical result to conditionally apply gates later in the circuit. This is called feed-forward or classical control, and it adds another layer of complexity to the hardware requirements.

## Circuit Diagrams Are Just Half the Story

Looking at circuit diagrams, quantum computing seems straightforward. Draw some gates, apply them in order, measure. The difficulty is not in drawing circuits. It is in designing circuits that solve problems.

A random quantum circuit does nothing useful. The art is in arranging gates so that the interference pattern at the end amplifies the correct answer. Finding these arrangements is what quantum algorithm design is about. And we only have a handful of known algorithms that provide a genuine speedup over classical methods.

The gates themselves are simple. The magic is in how you combine them.

Happy quantuming