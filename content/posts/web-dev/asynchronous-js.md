---
title: Asynchronous JavaScript
draft: false
date: 2025-01-23
description: Learn about synchronous vs asynchronous JavaScript, callbacks, Promises, async/await, Web Workers, and the Event Loop. Understand how JavaScript handles async tasks efficiently. 
categories:
  - tech
  - web
tags:
  - tech
  - JavaScript
  - web
keywords:
  - asynchronous JavaScript
  - JavaScript event loop
  - callbacks
  - Promises
  - async await
  - Fetch API
  - Axios
  - Web Workers
  - JavaScript generators
  - call stack
  - microtask queue
Author: Ahmad Hassan
---

## Synchronous vs Asynchronous JavaScript

JavaScript is **single-threaded**, meaning it executes one operation at a time in a sequential manner. However, JavaScript provides mechanisms to handle tasks asynchronously, allowing it to perform operations without blocking the main execution thread.

## 1. Synchronous JavaScript

In **synchronous execution**, tasks run one after another, meaning JavaScript waits for one operation to complete before moving to the next. This can cause delays if a task takes a long time (e.g., reading a large file or making a network request).

Example:

```js
console.log("Start");
function syncFunction() {
    console.log("Processing...");
}
syncFunction();
console.log("End");
```

Here, JavaScript executes statements **one by one in order**, blocking execution until each task is completed.

## 2. Asynchronous JavaScript

Asynchronous JavaScript allows tasks to run in the **background** without blocking the execution of other tasks. This is useful for operations like **fetching data from an API, reading files, or handling timers**.

- **Does NOT wait** for one task to complete before moving to the next.
- Allows JavaScript to handle **time-consuming operations (API calls, file reads, etc.)** efficiently.
- Uses the **Event Loop** to manage [async]() tasks.
### How Asynchronous JavaScript Works

JavaScript uses the **Event Loop** and the **Call Stack** to handle asynchronous code efficiently. It uses:

- **Callbacks(setTimeout,setInterval)**
- **Fetch API**
- **Axios**
- **Promises**
- **Async/Await**

### Callbacks
A **callback function** is passed as an argument to be executed later.given example use the both setTimeout and setInterval and clearInterval to stop the setInterval

```js
console.log("Start of program");
// setTimeout: Delays execution by 3 seconds
setTimeout(() => {
    console.log("setTimeout: This runs after 3 seconds");
}, 3000);
// setInterval: Runs every 2 seconds
let counter = 0;
let intervalID = setInterval(() => {
    counter++;
    console.log(`setInterval: Counter is ${counter}`);
    // Stop interval after 5 executions
    if (counter === 5) {
        clearInterval(intervalID);
        console.log("clearInterval: Stopped interval after 5 executions");
    }
}, 2000);
console.log("End of program (before timeouts and intervals execute)");
```

### Fetch API

The `fetch()` API is **asynchronous** because it makes network requests **without blocking** the execution of other code. It **returns a Promise**, which resolves when the request completes.

```js
fetch("https://jsonplaceholder.typicode.com/todos/1") // Fetch data from API
  .then((response) => response.json()) // Convert response to JSON
  .then((data) => console.log(data)) // Log the data
  .catch((error) => console.error("Error fetching data:", error));
```

How it works:
1. `fetch()` makes an HTTP request **(returns a Promise).**
2. `.json()` parses the response into JavaScript object **(also async, returns a Promise).**
3. `.then()` handles the resolved data.
4. `.catch()` handles errors (e.g., network failure).

### Axios

**Axios is asynchronous** because it makes network requests **without blocking** execution. It is built on top of JavaScript Promises, similar to `fetch()`, but with more features.

**Why use Axios?**

- **No need to manually parse JSON** (Axios does it automatically).
- **Better error handling** (Fetch only rejects on network errors, while Axios rejects on HTTP errors too).
- **More readable with async/await**.

```js
axios.get("https://jsonplaceholder.typicode.com/todos/1")
    .then(response => console.log(response.data)) // Axios auto-parses JSON
    .catch(error => console.error("Error fetching data:", error));
```

### Comparison: Axios vs. Fetch

|Feature|Axios|Fetch|
|---|---|---|
|JSON Parsing|Auto|Manual (`.json()`)|
|Error Handling|Rejects on HTTP errors|Only rejects on network errors|
|Request Headers|Easy|Manual setup required|
|`async/await` Support|Yes|Yes|
|Default Timeout|Yes (`timeout` option)|No|

**Best Practice:** Use **Axios** when working with APIs that require headers, authentication, or advanced error handling.

## Promise in JavaScript

A **Promise** in JavaScript is an object that represents the eventual **completion (or failure)** of an asynchronous operation.

It has **three states**:

1. **Pending** - Initial state, neither resolved nor rejected.
2. **Fulfilled** - Operation completed successfully.
3. **Rejected** - Operation failed.


```js
let promise = new Promise(function (resolve, reject) {
  fetch(`https://randomuser.me/api/`)
    .then((raw) => raw.json())
    .then((result) => {
      if (result.results[0].gender === "male") {
        resolve();
      } else {
        reject();
      }
    });
});
promise
  .then(function () {
    console.log("Male Received");
  })
  .catch(function () {
    console.log("Female Received");
  });
```

## Callbacks in JavaScript

A **callback** is a **function passed as an argument** to another function and executed later.

**Why use callbacks?**

- Handle **asynchronous operations** (like fetching data, timers, or reading files).
- Execute **code after another function completes**.


```js
function getData(url, callback) {
  fetch(`https://randomuser.me/api/`)
    .then((raw) => raw.json())
    .then((result) => {
      callback(result);
    });
}

getData("https://randomuser.me/api/", function (result) {
  console.log(
    result.results[0].gender,
    result.results[0].name.first,
    result.results[0].email,
  );
});
```


## async/await

`async/await` is a modern **way to handle asynchronous code** in JavaScript.  
It allows you to write **asynchronous code** in a way that looks **synchronous**, making it **easier to read and debug**.

**Key Features:**
- **`async`:** The `async` keyword is used **before a function definition** to make it return a **Promise**.
- **`await`:** The `await` keyword is used **inside an `async` function** to pause execution **until a Promise resolves**.
- **Avoids callback hell** and complex `.then()` chains.
- **Handles errors** with `try/catch`.

```js
async function func() {
  let n = await fetch(`https://randomuser.me/api/`);
  n = await n.json();
  console.log(n.results[0].gender);
}
func();
```

### When to Use `async/await`?

- **Fetching data from an API**
- **Performing database queries**
- **Reading/Writing files (in Node.js)**
- **Processing multiple async requests together**
- **Avoiding callback hell**

## Event Loop

To understand the Event Loop, you need to know how JavaScript executes code. It has three main components:

### Call Stack

- The **Call Stack** follows the **LIFO (Last In, First Out)** principle.
- It executes **synchronous** JavaScript code **line by line**.

```js
function greet() {
    console.log("Hello!");
}
greet();
```

**Execution:**

1. `greet()` is **pushed** onto the **Call Stack**.
2. `console.log("Hello!")` runs and is **popped** from the stack.

### Web APIs (Async Tasks)

- JavaScript **delegates async tasks** (e.g., `setTimeout`, `fetch`, event listeners) to **Web APIs**.
- These APIs handle the task in the **background** and **return the result later**.

Example:

```js
console.log("Start");
setTimeout(() => {
    console.log("Inside setTimeout");
}, 1000);

console.log("End");
```

**Execution Flow:**

1. `console.log("Start")` - **Executes immediately**.
2. `setTimeout()` - **Sent to Web API, NOT executed immediately**.
3. `console.log("End")` - **Executes immediately**.
4. After 1 second, the callback (`console.log("Inside setTimeout")`) moves to **Callback Queue**.

### Callback Queue & Microtask Queue

- **Callback Queue:** Stores callbacks from **setTimeout, setInterval, event listeners**.
- **Microtask Queue:** Stores callbacks from **Promises (`.then()`, `catch()`, `finally()`) and `MutationObserver`**.
- **Microtasks always run before Callbacks** (higher priority).

Example:

```js
console.log("Start");
setTimeout(() => console.log("Timeout Callback"), 0);
Promise.resolve().then(() => console.log("Promise Resolved"));
console.log("End");
```

**Execution Flow:**

1. `console.log("Start")` - **Runs immediately**.
2. `setTimeout()` - **Sent to Web API** (callback moved to Callback Queue).
3. `Promise.resolve().then(...)` - **Sent to Microtask Queue**.
4. `console.log("End")` - **Runs immediately**.
5. **Microtask Queue executes first** - `console.log("Promise Resolved")`.
6. **Callback Queue executes** - `console.log("Timeout Callback")`.

### How the Event Loop Works

1. JavaScript executes synchronous code in the Call Stack.
2. If an async task is encountered, it moves to the Web API.
3. Once completed, it moves the callback to the Callback Queue or Microtask Queue.
4. The Event Loop checks if the Call Stack is empty.
5. If empty, it first executes Microtasks, then moves Callbacks from the Callback Queue.
6. Repeats the process infinitely.


## Key Takeaways

- **JavaScript is single-threaded** but handles async tasks with the **Event Loop**.
- **Microtask Queue (Promises) runs before the Callback Queue (`setTimeout`)**.
- **The Event Loop ensures JavaScript never blocks execution.**
- **Long-running tasks should be asynchronous to avoid UI freezing.**


### Difference Between Callbacks, Promises, and Async/Await

|Feature|Callbacks|Promises|Async/Await|
|---|---|---|---|
|**Definition**|A function passed as an argument to another function and executed later.|An object representing the eventual completion (or failure) of an asynchronous operation.|A modern way to handle asynchronous code using `async` and `await` keywords.|
|**Syntax**|Nested functions, leading to **callback hell**.|Uses `.then()`, `.catch()`, and `.finally()`.|Uses `async` to declare functions and `await` to handle promises.|
|**Readability**|Hard to read and maintain due to **callback nesting**.|More readable but still involves chaining.|Clean and synchronous-like syntax.|
|**Error Handling**|Error-prone, requires manual handling (`if-else` or separate error callback).|Uses `.catch()` to handle errors.|Uses `try...catch` for better error handling.|
|**Chaining**|Difficult, leads to **callback hell (Pyramid of Doom)**.|Easy with `.then()` chaining.|Simplifies chaining with `await`.|
|**Execution Flow**|Asynchronous but difficult to manage for multiple tasks.|More manageable, but chaining can still be tricky.|Most intuitive, executes sequentially like synchronous code.|
|**Best For**|Simple async operations, event listeners.|Handling multiple asynchronous operations in a cleaner way.|Writing clean, readable, and maintainable async code.|

## Generators in JavaScript

Generators are **special functions** in JavaScript that allow us to **pause and resume** execution. Unlike normal functions, they **do not execute all at once**; instead, they produce values **one at a time** as requested.

### Key Features of Generators

- Uses the `function*` syntax (notice the `*` after `function`).
- Uses the `yield` keyword to **pause execution** and return values.
- The function doesn't run immediately; instead, it returns an **iterator object**.
- The `next()` method resumes execution from the last `yield`.

```js
function* myGenerator() {
    console.log("Start");
    yield 1; // Pause and return 1
    console.log("Resume");
    yield 2; // Pause and return 2
    console.log("End");
}

const gen = myGenerator(); // Creates the generator object

console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next().value); // 2
console.log(gen.next()); // { value: undefined, done: true }
```


### How it Works

1. **Calling `myGenerator()` doesn't execute it immediately.** It returns a generator object (`gen`).
2. **`gen.next()` starts execution** until the first `yield`, returning `{ value: 1, done: false }`.
3. **Calling `gen.next()` again** resumes execution after the first `yield`, printing `"Resume"` and yielding `{ value: 2, done: false }`.
4. **When there are no more `yield` statements, `done: true` is returned.**


### Generator with `for...of` Loop

Instead of calling `next()` manually, we can use a `for...of` loop.

```js
function* fruits() {
    yield "Apple";
    yield "Banana";
    yield "Grapes";
}

for (let fruit of fruits()) {
    console.log(fruit);
}
```


### Generators vs Async/Await

|Feature|Generators|Async/Await|
|---|---|---|
|**Execution**|Can be paused/resumed using `yield`|Pauses execution until a Promise resolves|
|**Returns**|Iterator object|Promise|
|**Use Case**|Custom iteration, state management|Handling async operations|

---

### When to Use Generators?

- **Custom Iterators** - Iterating over data in a custom way.
- **Lazy Execution** - Generate values on demand instead of all at once.
- **Infinite Sequences** - Generate values infinitely without memory issues.
- **Asynchronous Programming (with co-routines)** - Generators can be combined with Promises.

## Web Worker

Web Workers allow JavaScript to run **background tasks** in a **separate thread** without blocking the main UI thread. This helps in **handling heavy computations** and keeping the web page responsive.

### Why Use Web Workers?

- JavaScript is **single-threaded** (blocking UI when executing long tasks).
- Web Workers allow running tasks **in parallel** on a different thread.
- Helps in **CPU-intensive tasks** like image processing, large calculations, etc.
- Keeps the **UI smooth** and prevents the page from freezing.

**Step 1: Create the Worker (`heavyWorker.js`)**

```js
onmessage = function (data) {
  let ans = data.data.reduce((acc, item) => item + acc, 0);
  postMessage(ans);
};
```

**Step 2: Use the Worker in Your Main Script (`main.js`)**

```js
let nums = Array.from({ length: 10000 }, (_, b) => b + 1);

let worker = new Worker("worker.js");

worker.postMessage(nums);

worker.onmessage = function (data) {
  console.log(data.data);
};
```

### Limitations of Web Workers

- **No DOM Access** - Cannot manipulate HTML directly.
- **Cannot use `window`, `document`, or `alert()`** - Only limited APIs like `fetch()`, `WebSockets`, and IndexedDB.
- **Same-Origin Policy** - Workers must be loaded from the same domain.
- **Extra Resource Consumption** - Creating multiple workers consumes more memory.
