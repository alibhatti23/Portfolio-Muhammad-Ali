---
title: DOM Manipulation in JavaScript
draft: false
date: 2025-02-02
description: Learn how to manipulate the DOM (Document Object Model) in JavaScript by selecting, creating, and removing elements dynamically. Understand the differences between innerHTML, innerText, and textContent.
categories:
  - tech
  - web
tags:
  - tech
  - JavaScript
  - web
keywords:
  - JavaScript DOM manipulation
  - DOM tutorial
  - querySelector JavaScript
  - createElement JavaScript
  - addEventListener JavaScript
  - innerHTML vs innerText vs textContent
  - JavaScript event handling
  - modify HTML with JavaScript
  - DOM element selection methods
Author: Ahmad Hassan
---
# DOM Manipulation in JavaScript

DOM (Document Object Model) Manipulation in JavaScript refers to **modifying HTML elements dynamically** using JavaScript. This includes **selecting, modifying, adding, or removing elements** from the webpage.

## Selecting Elements in the DOM

Before modifying elements, we need to **select** them. Here are the different ways:

|**Method**|**Description**|**Example**|
|---|---|---|
|`document.getElementById(id)`|Selects an element by its **ID**|`document.getElementById("myDiv")`|
|`document.getElementsByClassName(className)`|Selects elements by **class name** (returns an HTMLCollection)|`document.getElementsByClassName("myClass")`|
|`document.getElementsByTagName(tagName)`|Selects elements by **tag name** (returns an HTMLCollection)|`document.getElementsByTagName("p")`|
|`document.querySelector(selector)`|Selects **the first** element that matches the CSS selector|`document.querySelector(".myClass")`|
|`document.querySelectorAll(selector)`|Selects **all** elements that match the CSS selector (returns a NodeList)|`document.querySelectorAll("div")`|


## Examples of Selection Methods

### 1. Selecting an Element by ID

```js
let title = document.getElementById("main-title");
console.log(title.innerText); // Logs the text inside the element
```

### 2. Selecting Elements by Class Name

```js
let items = document.getElementsByClassName("item");
console.log(items[0].innerText); // Logs the first element's text
```

### 3. Selecting Elements by Tag Name

```js
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length); // Logs the number of <p> elements
```

### 4. Selecting an Element Using querySelector()

Returns **only the first matching** element.

```js
let firstItem = document.querySelector(".item"); // Selects the first `.item`
console.log(firstItem.innerText);
```

### 5. Selecting Multiple Elements Using querySelectorAll()

Returns a **NodeList**, supports `.forEach()`.

```js
let allItems = document.querySelectorAll(".item"); // Selects all `.item`
allItems.forEach((item) => console.log(item.innerText));
```

## innerHTML vs innerText vs textContent in JavaScript

### 1. `innerHTML`

✅ **Gets or sets the HTML content** (including tags) inside an element.  
✅ Parses and renders HTML if assigned.  
❌ Can expose security risks (XSS attacks) if inserting user input.

```js
let h1 = document.querySelector("h1");

h1.innerHTML += " <i>hello</i>";
```

### 2. `innerText`

✅ **Gets or sets only the visible text** inside an element.  
✅ Ignores hidden elements (like `display: none;`).  
❌ Does not retain HTML tags.

```js
let h1 = document.querySelector("h1");

h1.innerText += "Hack the Planat";
```

### 3. `textContent`

✅ **Gets or sets all text (including hidden text)** inside an element.  
✅ Preserves whitespace and hidden elements (e.g., `display: none;`).  
❌ Does not interpret HTML tags.

```js
let h1 = document.querySelector("h1");

h1.textContent += "  Hack the Planat";
```

### Key Differences Between `innerHTML`, `innerText`, and `textContent`

|Property|**HTML Support**|**Includes Hidden Text?**|**Performance**|**Security Risks?**|
|---|---|---|---|---|
|`innerHTML`|✅ Supports HTML|✅ Yes|❌ Slower (parses HTML)|❌ Vulnerable to XSS|
|`innerText`|❌ No HTML|❌ No|✅ Faster|✅ Safe|
|`textContent`|❌ No HTML|✅ Yes|✅ Fastest|✅ Safe|


## Manipulating Styles & Classes in JavaScript

JavaScript allows us to **dynamically change** the styles and classes of HTML elements using:

- `element.style` – for **inline styles**
- `element.classList` – for **adding, removing, toggling, and checking classes**

### 1. `element.style` (Manipulating Inline Styles)

✅ **Modifies individual CSS properties directly**  
✅ **Only applies inline styles**, does NOT affect CSS classes  
❌ **Does not allow setting multiple styles at once using a string**

```js
<div id="box" style="width: 100px; height: 100px; background: red;"></div>
<button onclick="changeStyle()">Change Style</button>

<script>
    function changeStyle() {
        let box = document.getElementById("box");
        box.style.backgroundColor = "blue";  // Change background color
        box.style.width = "200px";           // Change width
        box.style.height = "200px";          // Change height
    }
</script>
```

✅ **Before Clicking:** Red box (100x100)  
✅ **After Clicking:** Blue box (200x200)

### 2. `element.classList` (Manipulating Classes)

✅ **Adds, removes, toggles, and checks classes efficiently**  
✅ **Does NOT override existing styles like `style` does**

### Methods of `classList`

|Method|Description|Example|
|---|---|---|
|`add(className)`|Adds a class|`element.classList.add("new-class")`|
|`remove(className)`|Removes a class|`element.classList.remove("old-class")`|
|`toggle(className)`|Toggles a class (adds if not present, removes if present)|`element.classList.toggle("active")`|
|`contains(className)`|Checks if a class exists|`element.classList.contains("hidden")`|
|`replace(oldClass, newClass)`|Replaces an old class with a new one|`element.classList.replace("old", "new")`|

```js
<style>
    .box { width: 100px; height: 100px; background: red; }
    .big { width: 200px; height: 200px; }
    .blue { background: blue; }
</style>

<div id="box" class="box"></div>
<button onclick="toggleSize()">Toggle Size</button>
<button onclick="toggleColor()">Toggle Color</button>

<script>
    let box = document.getElementById("box");

    function toggleSize() {
        box.classList.toggle("big"); // Toggles between small and big size
    }

    function toggleColor() {
        box.classList.toggle("blue"); // Toggles background color
    }
</script>
```



## Creating and Deleting Elements in JavaScript DOM Manipulation

Once you've selected elements in the DOM, the next step in DOM manipulation is **creating new elements** and **removing existing ones** dynamically.

- **`document.createElement(tagName)`** → Creates a new element
- **`parent.appendChild(childElement)`** → Adds an element inside another element
- **`parent.removeChild(childElement)`** → Removes a child element from its parent

### Creating Elements – `document.createElement()`

✅ **Creates a new element in memory** (not yet visible in the DOM).  
✅ **You can set attributes, styles, and inner content before adding it to the DOM.**  
❌ **Must be appended manually to be visible in the DOM.**

```js
const newDiv = document.createElement('div'); // Creates a <div> element
newDiv.textContent = "Hello, this is a new div!"; // Adds text inside the div
newDiv.classList.add('new-class'); // Adds a class to the div
console.log(newDiv); // Logs the newly created <div>
```

### Appending Elements – `appendChild()`

✅ Inserts a new child element inside a parent.
✅ Moves elements if they already exist (won't duplicate them).

```js
const parent = document.getElementById('container'); // Select an existing parent element
parent.appendChild(newDiv); // Adds the new div inside the parent element
```

### `insertBefore()` – Insert Before a Specific Element

Inserts a new element before an existing child element.

```js
const firstChild = parent.firstElementChild; // Get the first child of the parent
parent.insertBefore(newDiv, firstChild); // Insert newDiv before the first child
```

### Removing Elements – `removeChild()`

✅ **Deletes a child element from its parent.**  
❌ **If the element does not exist inside the parent, it throws an error.**

```js
parent.removeChild(firstChild); // Removes the first child from the parent
```

### Removing an Element Directly (`remove()`)

Instead of `removeChild()`, you can use `element.remove()` **(modern method)**.

```js
newDiv.remove(); // Removes the newly created <div>
```

### Summary

|Action|Method|
|---|---|
|**Create an element**|`document.createElement('tag')`|
|**Add an element inside another**|`appendChild(element)`, `append(element)`|
|**Insert before another element**|`insertBefore(newElement, existingChild)`|
|**Remove an element from the DOM**|`removeChild(element)`, `remove()`|

## What is `addEventListener()`

An **event listener** is a method that allows you to wait for a specific event (like a click, keypress, hover, etc.) and run a function when the event occurs.

```js
element.addEventListener(event, function, useCapture);
```

|Parameter|Description|
|---|---|
|`event`|The type of event (e.g., `"click"`, `"mouseover"`, `"keydown"`)|
|`function`|The function to run when the event occurs|
|`useCapture` (optional)|`true` for event capturing, `false` for bubbling (default: `false`)|

**Basic Example: Click Event**

```js
<button id="myBtn">Click Me</button>

<script>
    document.getElementById("myBtn").addEventListener("click", function() {
        alert("Button Clicked!");
    });
</script>
```

### Removing an Event Listener with `removeEventListener()`

To remove an event, you must **use a named function**.

```js
<button id="myBtn">Click Me</button>
<button id="remove">Remove Event</button>

<script>
    function showAlert() {
        alert("Button Clicked!");
    }

    let btn = document.getElementById("myBtn");
    btn.addEventListener("click", showAlert);

    document.getElementById("remove").addEventListener("click", function() {
        btn.removeEventListener("click", showAlert); // Removes event
    });
</script>
```


### Event Object (`event`)

Every event passes an **event object (`e`)** that gives details about the event.

```js
<button id="btn">Click Me</button>

<script>
    document.getElementById("btn").addEventListener("click", function(event) {
        console.log("Event Type:", event.type);
        console.log("Clicked Element:", event.target);
        console.log("Mouse Coordinates:", event.clientX, event.clientY);
    });
</script>
```


## JavaScript Events – Cheat Sheet

|**Category**|**Event**|**Description**|
|---|---|---|
|**🖱️ Mouse Events**|`click`|Fires when an element is clicked|
||`dblclick`|Fires when an element is double-clicked|
||`mousedown`|Fires when a mouse button is pressed down|
||`mouseup`|Fires when a mouse button is released|
||`mousemove`|Fires when the mouse moves over an element|
||`mouseenter`|Fires when the mouse enters an element (does not bubble)|
||`mouseleave`|Fires when the mouse leaves an element (does not bubble)|
||`mouseover`|Fires when the mouse enters an element or its children (bubbles)|
||`mouseout`|Fires when the mouse leaves an element or its children (bubbles)|
||`contextmenu`|Fires when the right mouse button is clicked (opens the context menu)|
|**⌨️ Keyboard Events**|`keydown`|Fires when any key is pressed down (includes special keys like Shift, Enter)|
||`keyup`|Fires when a key is released|
||`keypress` (deprecated)|Fires when a key is pressed (only for character keys)|
|**📝 Form Events**|`submit`|Fires when a form is submitted|
||`change`|Fires when an input/select field value changes|
||`input`|Fires when the user types in an input field|
||`focus`|Fires when an element gains focus|
||`blur`|Fires when an element loses focus|
||`reset`|Fires when a form is reset|
|**🌍 Window/Document Events**|`load`|Fires when the entire page has loaded (including images)|
||`DOMContentLoaded`|Fires when the HTML document is fully loaded (before images & stylesheets)|
||`resize`|Fires when the window is resized|
||`scroll`|Fires when the user scrolls the page|
||`unload`|Fires when the user leaves the page|
||`beforeunload`|Fires when the user is about to leave the page (can show a confirmation)|
||`visibilitychange`|Fires when the page visibility changes (e.g., switching tabs)|
|**📋 Clipboard Events**|`copy`|Fires when content is copied|
||`cut`|Fires when content is cut|
||`paste`|Fires when content is pasted|
|**🏗️ Drag & Drop Events**|`drag`|Fires when an element is being dragged|
||`dragstart`|Fires when dragging starts|
||`dragend`|Fires when dragging ends|
||`dragover`|Fires when a dragged element is over a valid drop target|
||`dragenter`|Fires when a dragged element enters a drop target|
||`dragleave`|Fires when a dragged element leaves a drop target|
||`drop`|Fires when a dragged element is dropped|
|**🎵📽️ Media Events**|`play`|Fires when media (audio/video) starts playing|
||`pause`|Fires when media is paused|
||`ended`|Fires when media reaches the end|
||`volumechange`|Fires when the volume is changed|
||`timeupdate`|Fires when the current playback position changes|
|**👀 Focus & Blur Events**|`focus`|Fires when an element gains focus|
||`blur`|Fires when an element loses focus|
|**📱 Touch Events (Mobile)**|`touchstart`|Fires when a touch point is placed on the screen|
||`touchmove`|Fires when a touch point moves across the screen|
||`touchend`|Fires when a touch point is removed from the screen|
|**⚡ Other Useful Events**|`error`|Fires when an error occurs while loading an image, script, or resource|
||`online`|Fires when the browser goes online|
||`offline`|Fires when the browser goes offline|
||`hashchange`|Fires when the URL hash changes (`window.location.hash`)|


