---
title: JavaScript Advanced Concepts
draft: false
date: 2025-01-25
description: Advanced JavaScript concepts like closures, event listeners, higher-order functions, and more. Learn how to use these concepts to write better JavaScript code.
categories:
  - tech
  - web
tags:
  - tech
  - JavaScript
  - web
Author: Ahmad Hassan
keywords:
  - JavaScript advanced concepts
  - JavaScript closures
  - JavaScript prototypal inheritance
  - JavaScript event listeners
  - higher-order functions JavaScript
  - JavaScript this keyword
  - call apply bind JavaScript
  - JavaScript arrays and objects
  - event delegation JavaScript
  - JavaScript error handling
---

## Arrays

Objects allow you to store keyed collections of values. That’s fine.

But quite often we find that we need an _ordered collection_, where we have a 1st, a 2nd, a 3rd element and so on. For example, we need that to store a list of something: users, goods, HTML elements etc.

It is not convenient to use an object here, because it provides no methods to manage the order of elements. We can’t insert a new property “between” the existing ones. Objects are just not meant for such use.

There exists a special data structure named `Array`, to store ordered collections.
### [Declaration](https://javascript.info/array#declaration)

There are two syntaxes for creating an empty array:

```js
let arr = new Array();
let arr = [];
```

Almost all the time, the second syntax is used. We can supply initial elements in the brackets:

```javascript
let fruits = ["Apple", "Orange", "Plum"];
```

Array elements are numbered, starting with zero.

We can get an element by its number in square brackets:

```js
let fruits = ["Apple", "Orange", "Plum"];

alert( fruits[0] ); // Apple
alert( fruits[1] ); // Orange
alert( fruits[2] ); // Plum
```

We can replace an element:

```js
fruits[2] = 'Pear'; // now ["Apple", "Orange", "Pear"]
```

…Or add a new one to the array:

```js
fruits[3] = 'Lemon'; // now ["Apple", "Orange", "Pear", "Lemon"]
```

The total count of the elements in the array is its `length`:

```js
let fruits = ["Apple", "Orange", "Plum"];
alert( fruits.length ); // 3
```

We can also use alert to show the whole array.

```js
let fruits = ["Apple", "Orange", "Plum"];
alert( fruits ); // Apple,Orange,Plum
```

An array can store elements of any type.

For instance:

```js
// mix of values
let arr = [ 'Apple', { name: 'John' }, true, function() { alert('hello'); } ];
// get the object at index 1 and then show its name
alert( arr[1].name ); // John
// get the function at index 3 and run it
arr[3](); // hello
```

### Get last elements with “at”

Let’s say we want the last element of the array.

Some programming languages allow the use of negative indexes for the same purpose, like `fruits[-1]`.

Although, in JavaScript it won’t work. The result will be `undefined`, because the index in square brackets is treated literally.

We can explicitly calculate the last element index and then access it: `fruits[fruits.length - 1]`.

```js
let fruits = ["Apple", "Orange", "Plum"];
alert( fruits[fruits.length-1] ); // Plum
```

A bit cumbersome, isn’t it? We need to write the variable name twice.

Luckily, there’s a shorter syntax: `fruits.at(-1)`:

```js
let fruits = ["Apple", "Orange", "Plum"];
// same as fruits[fruits.length-1]
alert( fruits.at(-1) ); // Plum
```

In other words, `arr.at(i)`:

- is exactly the same as `arr[i]`, if `i >= 0`.
- for negative values of `i`, it steps back from the end of the array.

### Methods pop/push, shift/unshift

A [queue](https://en.wikipedia.org/wiki/Queue_\(abstract_data_type\)) is one of the most common uses of an array. In computer science, this means an ordered collection of elements which supports two operations:

- `push` appends an element to the end.
- `shift` get an element from the beginning, advancing the queue, so that the 2nd element becomes the 1st.

Arrays support both operations.

In practice we need it very often. For example, a queue of messages that need to be shown on-screen.

There’s another use case for arrays – the data structure named [stack](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)).

It supports two operations:

- `push` adds an element to the end.
- `pop` takes an element from the end.

So new elements are added or taken always from the “end”.

A stack is usually illustrated as a pack of cards: new cards are added to the top or taken from the top:


For stacks, the latest pushed item is received first, that’s also called LIFO (Last-In-First-Out) principle. For queues, we have FIFO (First-In-First-Out).

Arrays in JavaScript can work both as a queue and as a stack. They allow you to add/remove elements, both to/from the beginning or the end.

In computer science, the data structure that allows this, is called [deque](https://en.wikipedia.org/wiki/Double-ended_queue).

**Methods that work with the end of the array:**

`pop`

Extracts the last element of the array and returns it:

```js
let fruits = ["Apple", "Orange", "Pear"];
alert( fruits.pop() ); // remove "Pear" and alert it
alert( fruits ); // Apple, Orange
```


Both `fruits.pop()` and `fruits.at(-1)` return the last element of the array, but `fruits.pop()` also modifies the array by removing it.

`push`

Append the element to the end of the array:

```js
let fruits = ["Apple", "Orange"];
fruits.push("Pear");
alert( fruits ); // Apple, Orange, Pear
```

The call `fruits.push(...)` is equal to `fruits[fruits.length] = ...`.

**Methods that work with the beginning of the array:**

`shift`

Extracts the first element of the array and returns it:

```js
let fruits = ["Apple", "Orange", "Pear"];
alert( fruits.shift() ); // remove Apple and alert it
alert( fruits ); // Orange, Pear
```

`unshift`

Add the element to the beginning of the array:

```js
let fruits = ["Orange", "Pear"];
fruits.unshift('Apple');
alert( fruits ); // Apple, Orange, Pear
```

Methods `push` and `unshift` can add multiple elements at once:

```js
let fruits = ["Apple"];
fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");
// ["Pineapple", "Lemon", "Apple", "Orange", "Peach"]
alert( fruits );
```

## Objects

As we know from the chapter [Data types](https://javascript.info/types), there are eight data types in JavaScript. Seven of them are called “primitive”, because their values contain only a single thing (be it a string or a number or whatever).

In contrast, objects are used to store keyed collections of various data and more complex entities. In JavaScript, objects penetrate almost every aspect of the language. So we must understand them first before going in-depth anywhere else.

An object can be created with figure brackets `{…}` with an optional list of _properties_. A property is a “key: value” pair, where `key` is a string (also called a “property name”), and `value` can be anything.

We can imagine an object as a cabinet with signed files. Every piece of data is stored in its file by the key. It’s easy to find a file by its name or add/remove a file.

An empty object (“empty cabinet”) can be created using one of two syntaxes:

```js
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax
```

Usually, the figure brackets `{...}` are used. That declaration is called an _object literal_.
### Literals and properties

We can immediately put some properties into `{...}` as “key: value” pairs:

```js
let user = {     // an object
  name: "John",  // by key "name" store value "John"
  age: 30        // by key "age" store value 30
};
```

A property has a key (also known as “name” or “identifier”) before the colon `":"` and a value to the right of it.

In the `user` object, there are two properties:

1. The first property has the name `"name"` and the value `"John"`.
2. The second one has the name `"age"` and the value `30`.

The resulting `user` object can be imagined as a cabinet with two signed files labeled “name” and “age”.

We can add, remove and read files from it at any time.

Property values are accessible using the dot notation:

```js
// get property values of the object:
alert( user.name ); // John
alert( user.age ); // 30
```

The value can be of any type. Let’s add a boolean one:

```js
user.isAdmin = true
```

To remove a property, we can use the `delete` operator:

```js
delete user.age;
```

We can also use multiword property names, but then they must be quoted:

```js
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // multiword property name must be quoted
};
```

The last property in the list may end with a comma:

```js
let user = {
  name: "John",
  age: 30,
}
```

That is called a “trailing” or “hanging” comma. Makes it easier to add/remove/move around properties, because all lines become alike.


### Square brackets

For multiword properties, the dot access doesn’t work:

```js
// this would give a syntax error
user.likes birds = true
```

JavaScript doesn’t understand that. It thinks that we address `user.likes`, and then gives a syntax error when comes across unexpected `birds`.

The dot requires the key to be a valid variable identifier. That implies: contains no spaces, doesn’t start with a digit and doesn’t include special characters (`$` and `_` are allowed).

There’s an alternative “square bracket notation” that works with any string:

```js
let user = {};

// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];
```


Now everything is fine. Please note that the string inside the brackets is properly quoted (any type of quotes will do).

Square brackets also provide a way to obtain the property name as the result of any expression – as opposed to a literal string – like from a variable as follows:

```js
let key = "likes birds";

// same as user["likes birds"] = true;
user[key] = true;
```

Here, the variable `key` may be calculated at run-time or depend on the user input. And then we use it to access the property. That gives us a great deal of flexibility.

For instance:

```js
let user = {
  name: "John",
  age: 30
};

let key = prompt("What do you want to know about the user?", "name");

// access by variable
alert( user[key] ); // John (if enter "name")
```


The dot notation cannot be used in a similar way:

```js
let user = {
  name: "John",
  age: 30
};

let key = "name";
alert( user.key ) // undefined
```


### Computed properties

We can use square brackets in an object literal, when creating an object. That’s called _computed properties_.

For instance:

```js
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
  [fruit]: 5, // the name of the property is taken from the variable fruit
};
alert( bag.apple ); // 5 if fruit="apple"
```


The meaning of a computed property is simple: `[fruit]` means that the property name should be taken from `fruit`.

So, if a visitor enters `"apple"`, `bag` will become `{apple: 5}`.

Essentially, that works the same as:

```js
let fruit = prompt("Which fruit to buy?", "apple");
let bag = {};

// take property name from the fruit variable
bag[fruit] = 5;
```

…But looks nicer.

We can use more complex expressions inside square brackets:

```js
let fruit = 'apple';
let bag = {
  [fruit + 'Computers']: 5 // bag.appleComputers = 5
};
```

Square brackets are much more powerful than dot notation. They allow any property names and variables. But they are also more cumbersome to write.

So most of the time, when property names are known and simple, the dot is used. And if we need something more complex, then we switch to square brackets.

### Property value shorthand

In real code, we often use existing variables as values for property names.

For instance:

```js
function makeUser(name, age) {
  return {
    name: name,
    age: age,
    // ...other properties
  };
}

let user = makeUser("John", 30);
alert(user.name); // John
```

variable is so common, that there’s a special _property value shorthand_ to make it shorter.

Instead of `name:name` we can just write `name`, like this:


```js
function makeUser(name, age) {
  return {
    name, // same as name: name
    age,  // same as age: age
    // ...
  };
}
```

We can use both normal properties and shorthands in the same object:

```js
let user = {
  name,  // same as name:name
  age: 30
};
```

### Property names limitations

As we already know, a variable cannot have a name equal to one of the language-reserved words like “for”, “let”, “return” etc.

But for an object property, there’s no such restriction:

```js
// these properties are all right
let obj = {
  for: 1,
  let: 2,
  return: 3
};

alert( obj.for + obj.let + obj.return );  // 6
```

In short, there are no limitations on property names. They can be any strings or symbols (a special type for identifiers, to be covered later).

Other types are automatically converted to strings.

For instance, a number `0` becomes a string `"0"` when used as a property key:

```js
let obj = {
  0: "test" // same as "0": "test"
};

// both alerts access the same property (the number 0 is converted to string "0")
alert( obj["0"] ); // test
alert( obj[0] ); // test (same property)
```

### Property existence test, “in” operator
A notable feature of objects in JavaScript, compared to many other languages, is that it’s possible to access any property. There will be no error if the property doesn’t exist!

Reading a non-existing property just returns undefined. So we can easily test whether the property exists:

```js
let user = {};
alert( user.noSuchProperty === undefined ); // true means "no such property"
```

There’s also a special operator `"in"` for that.

The syntax is:

```js
"key" in object
```

For instance:

```js
let user = { name: "John", age: 30 };
alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist
```


Please note that on the left side of `in` there must be a _property name_. That’s usually a quoted string.

If we omit quotes, that means a variable should contain the actual name to be tested. For instance:


```js
let user = { age: 30 };

let key = "age";
alert( key in user ); // true, property "age" exists
```


Why does the `in` operator exist? Isn’t it enough to compare against `undefined`?

Well, most of the time the comparison with `undefined` works fine. But there’s a special case when it fails, but `"in"` works correctly.

It’s when an object property exists, but stores `undefined`:

```js
let obj = {
  test: undefined
};
alert( obj.test ); // it's undefined, so - no such property?
alert( "test" in obj ); // true, the property does exist!
```

In the code above, the property `obj.test` technically exists. So the `in` operator works right.

Situations like this happen very rarely, because `undefined` should not be explicitly assigned. We mostly use `null` for “unknown” or “empty” values. So the `in` operator is an exotic guest in the code.

### The "for..in" loop

To walk over all keys of an object, there exists a special form of the loop: `for..in`. This is a completely different thing from the `for(;;)` construct that we studied before.

The syntax:

```js
for (key in object) {
  // executes the body for each key among object properties
}
```


For instance, let’s output all properties of `user`:

```js
let user = {
  name: "John",
  age: 30,
  isAdmin: true
};

for (let key in user) {
  // keys
  alert( key );  // name, age, isAdmin
  // values for the keys
  alert( user[key] ); // John, 30, true
}
```

Note that all “for” constructs allow us to declare the looping variable inside the loop, like `let key` here.

Also, we could use another variable name here instead of `key`. For instance, `"for (let prop in obj)"` is also widely used.

## Object methods, "this"


### “this” in methods

It’s common that an object method needs to access the information stored in the object to do its job.

For instance, the code inside `user.sayHi()` may need the name of the `user`.

**To access the object, a method can use the `this` keyword.**

The value of `this` is the object “before dot”, the one used to call the method.

For instance:

```js
let user = {
  name: "John",
  age: 30,

  sayHi() {
    // "this" is the "current object"
    alert(this.name);
  }

};

user.sayHi(); // John
```

Here during the execution of `user.sayHi()`, the value of `this` will be `user`.

Technically, it’s also possible to access the object without `this`, by referencing it via the outer variable:

```js
let user = {
  name: "John",
  age: 30,
  sayHi() {
    alert(user.name); // "user" instead of "this"
  }
};
```


### “this” is not bound

In JavaScript, keyword `this` behaves unlike most other programming languages. It can be used in any function, even if it’s not a method of an object.

There’s no syntax error in the following example:

```js
function sayHi() {
  alert( this.name );
}
```

The value of `this` is evaluated during the run-time, depending on the context.

For instance, here the same function is assigned to two different objects and has different “this” in the calls:

```js
let user = { name: "John" };
let admin = { name: "Admin" };
function sayHi() {
  alert( this.name );
}
// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;
// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)
admin['f'](); // Admin (dot or square brackets access the method – doesn't matter)
```


### Arrow functions have no “this”
Arrow functions are special: they don’t have their “own” this. If we reference this from such a function, it’s taken from the outer “normal” function.

For instance, here arrow() uses this from the outer user.sayHi() method:

```js
let user = {
  firstName: "Ilya",
  sayHi() {
    let arrow = () => alert(this.firstName);
    arrow();
  }
};

user.sayHi(); // Ilya
```

That’s a special feature of arrow functions, it’s useful when we actually do not want to have a separate `this`, but rather to take it from the outer context. Later in the chapter [Arrow functions revisited](https://javascript.info/arrow-functions) we’ll go more deeply into arrow functions.

### Summary

- Functions that are stored in object properties are called “methods”.
- Methods allow objects to “act” like `object.doSomething()`.
- Methods can reference the object as `this`.

The value of `this` is defined at run-time.

- When a function is declared, it may use `this`, but that `this` has no value until the function is called.
- A function can be copied between objects.
- When a function is called in the “method” syntax: `object.method()`, the value of `this` during the call is `object`.

Please note that arrow functions are special: they have no `this`. When `this` is accessed inside an arrow function, it is taken from outside.

### Key Points

1. In Global Scope the value of `this` is window.
2. In function the value of `this` is window
3. In Method the value of `this` is object
4. function inside the method es5(deceleration function) the value of `this` is window.
5. function inside the method es6(expression function) the value of `this` is object.
6. the value of `this` in constructor function is blank object.
7. In event listener value of `this` will be according to the element.

## call/apply/bind

### call

There’s a special built-in function method [func.call(context, …args)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call) that allows to call a function explicitly setting `this`.

The syntax is:

```javascript
func.call(context, arg1, arg2, ...)
```

It runs `func` providing the first argument as `this`, and the next as the arguments.

To put it simply, these two calls do almost the same:

```js
func(1, 2, 3);
func.call(obj, 1, 2, 3)
```

They both call `func` with arguments `1`, `2` and `3`. The only difference is that `func.call` also sets `this` to `obj`.

As an example, in the code below we call `sayHi` in the context of different objects: `sayHi.call(user)` runs `sayHi` providing `this=user`, and the next line sets `this=admin`:

```js
function sayHi() {
  alert(this.name);
}
let user = { name: "John" };
let admin = { name: "Admin" };
// use call to pass different objects as "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```


### apply

Instead of `func.call(this, ...arguments)` we could use `func.apply(this, arguments)`.

The syntax of built-in method [func.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) is:

```js
func.apply(context, args)
```

It runs the `func` setting `this=context` and using an array-like object `args` as the list of arguments.

The only syntax difference between `call` and `apply` is that `call` expects a list of arguments, while `apply` takes an array-like object with them.

So these two calls are almost equivalent:

```js
func.call(context, ...args);
func.apply(context, args);
```

Example:

```js
function func(a, b, c) {
  console.log(this, a, b, c);
}
func.call(obj, [1, 2, 3]);
```


### bind()

The **`bind()`** method of [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) instances creates a new function that, when called, calls this function with its `this` keyword set to the provided value, and a given sequence of arguments preceding any provided when the new function is called.

It does not call function. It just return another function that we can store in variable to call it 

```js
function func() {
  console.log(this);
}
let n = func.bind("ahmad");

n();
```


## Prototypal inheritance

In JavaScript, objects have a special hidden property `[[Prototype]]` (as named in the specification), that is either `null` or references another object. That object is called “a prototype”:

When we read a property from `object`, and it’s missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”. And soon we’ll study many examples of such inheritance, as well as cooler language features built upon it.

The property `[[Prototype]]` is internal and hidden, but there are many ways to set it.

**Prototypal inheritance** in JavaScript is a mechanism that allows objects to inherit properties and methods from other objects. Instead of using classes like in classical inheritance (as in Java or C++), JavaScript uses prototypes.

```js
function makeHuman(name,age){
  this.name = name;
  this.age = age;
}

makeHuman.prototype.greet = 12;

makeHuman.prototype.func = function(){
  console.log(this.name);
}

let human1 = new makeHuman("ahmad",20);
let human2 = new makeHuman("ali",30);

```

### How It Works:

- Every JavaScript object has an internal property called [[Prototype]], which points to another object.

- When you try to access a property or method on an object, JavaScript first looks for it on the object itself.

- If the property/method is not found, JavaScript looks up the prototype chain until it either finds the property or reaches null.
### The value of “this”

An interesting question may arise in the example above: what’s the value of `this` inside `set fullName(value)`? Where are the properties `this.name` and `this.surname` written: into `user` or `admin`?

The answer is simple: `this` is not affected by prototypes at all.

**No matter where the method is found: in an object or its prototype. In a method call, `this` is always the object before the dot.**

So, the setter call `admin.fullName=` uses `admin` as `this`, not `user`.

That is actually a super-important thing, because we may have a big object with many methods, and have objects that inherit from it. And when the inheriting objects run the inherited methods, they will modify only their own states, not the state of the big object.


## Closures in JS

A **closure** in JavaScript is a function that remembers the variables from its **lexical scope**, even when the function is executed outside that scope.

### How It Works:

When a function is created inside another function, it **captures** the outer function’s variables, even after the outer function has finished executing.

```js
function counter() {
    let count = 0;
    return function() {
        count++;
        console.log(count);
    };
}
const increment = counter();
increment(); // 1
increment(); // 2
```


## What is an Event Listener in JavaScript?

An **event listener** is a method that allows you to wait for a specific event (like a click, keypress, hover, etc.) and run a function when the event occurs.

### Example of `addEventListener()`

```js
document.getElementById("btn").addEventListener("click", function() {
 console.log("Button Clicked!");
});
```

- Here, `addEventListener("click", function)` listens for a **click event** on the button with `id="btn"`.
- When clicked, it logs `"Button Clicked!"`.

### Common Events

| Event       | Description                           |
| ----------- | ------------------------------------- |
| `click`     | When an element is clicked            |
| `mouseover` | When the mouse hovers over an element |
| `keydown`   | When a key is pressed                 |
| `submit`    | When a form is submitted              |

## What is `querySelector` in JavaScript?

`querySelector()` is a method used to select an element from the DOM using CSS selectors.

### Example of `querySelector()`

```js
const heading = document.querySelector("h1"); // Selects the first `<h1>` element
heading.style.color = "red"; // Changes its color to red
```

### Selecting Elements

```js
document.querySelector("#myId");    // Selects an element by ID
document.querySelector(".myClass"); // Selects the first element with this class
document.querySelector("p");        // Selects the first <p> element
```

## Event Delegation in JavaScript

Event Delegation is a **pattern** that allows you to handle events **efficiently** by attaching a **single event listener** to a **parent element** instead of adding multiple listeners to child elements.

### Why Use Event Delegation?

- **Better Performance** - Avoids adding multiple event listeners.
- **Handles Dynamic Elements** - Works even for elements added later via JavaScript.
- **Less Memory Usage** - Reduces the number of event listeners.

**Example**

```js
let parent = document.querySelector("#parent");
parent.addEventListener("click", function (ev) {
  if (ev.target.id === "play") {
    console.log("Play Song");
  } else if (ev.target.id === "pause") {
    console.log("Pause Song");
  }
});
```

### When Should You Use Event Delegation?

- Handling clicks on **lists, tables, menus, or dynamically added elements**.
- Handling **form inputs** when adding fields dynamically.
- Improving **performance** for elements inside large containers.

## Higher-Order Functions in JavaScript

A **Higher-Order Function (HOF)** is a function that **takes another function as an argument** or **returns a function**.

```js
function func1(f1) {  // func1 takes a function as an argument (HOF property)
  f1();  // Calls the passed function
  return function () {  // Returns a new function (HOF property)
    console.log("returned fun");
  };
}

fun = function () {
  console.log("Passed Function");
};

let returned = func1(fun); // Call func1 with 'fun' function

returned(); // Call the returned function
```


### Built-in Higher-Order Functions in JavaScript

|Method|Description|
|---|---|
|`map()`|Transforms an array by applying a function to each element.|
|`filter()`|Filters an array based on a condition.|
|`reduce()`|Reduces an array to a single value.|
|`forEach()`|Iterates over an array but does not return a new one.|

## Handling Errors with `try...catch`

The `try...catch` block allows you to handle errors gracefully.
The `try...catch` statement is used to handle errors, and `throw` is used to create custom errors.

Basic Example of `try...catch`

```js
try {
    let x = y + 5;  // ReferenceError: y is not defined
} catch (error) {
    console.log("An error occurred:", error.message);
}
```

If an error occurs inside `try`, execution moves to `catch`, preventing a crash.

### Using `throw` to Create Custom Error

```js
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero!");  // Custom error
    }
    return a / b;
}

try {
    console.log(divide(10, 0)); // Throws an error
} catch (error) {
    console.log("Error:", error.message);
}

```

**`throw` allows custom error messages** instead of generic JavaScript errors.

### `finally` Block (Always Executes)

```js
try {
    console.log("Trying something...");
    throw new Error("Something went wrong!");
} catch (error) {
    console.log("Caught Error:", error.message);
} finally {
    console.log("This runs no matter what!");
}
```

## Custom Events in JavaScript

A **Custom Event** in JavaScript is an event that you manually create and dispatch using the `CustomEvent` constructor. This allows communication between different parts of your application.

### Creating and Dispatching a Custom Event

The `CustomEvent` constructor takes two arguments:
1. **Event Name** (string)
2. **Event Options** (optional, includes `detail` for extra data)

```js
let ev = new Event("newEv");

document.querySelector("button").addEventListener("newEv", function () {
  console.log("Custom Event");
});
document.querySelector("button").dispatchEvent(ev);
```


**Full Example: Custom Event with Data**

```js
// Create and dispatch custom event
const customEvent = new CustomEvent("userLoggedIn", {
   detail: { username: "ahmad9059", role: "admin" }
});

document.addEventListener("userLoggedIn", function (event) {
   console.log(`User: ${event.detail.username}, Role: ${event.detail.role}`);
});

// Dispatch the event
document.dispatchEvent(customEvent);
```


**When to Use Custom Events?**

1. For component communication (e.g., sending data between different UI components).
2. When working with user interactions that don't have built-in events.
3. For event-driven architectures where actions trigger custom behavior.

