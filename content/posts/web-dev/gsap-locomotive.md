---
title: GSAP & Locomotive Scroll
draft: false
date: 2025-02-15
description: Learn how to use GSAP (Greensock Animation Platform) and Locomotive Scroll to create smooth animations and scroll-based effects in web development. 
categories:
  - tech
  - web
tags:
  - tech
  - JavaScript
  - web
  - gsap
  - locomotive
keywords:
  - GSAP animation tutorial
  - Locomotive Scroll setup
  - GSAP ScrollTrigger
  - smooth scrolling JavaScript
  - parallax effects web
  - JavaScript animation library
  - GSAP timeline
  - scroll-based animations
  - GreenSock Animation Platform
Author: Ahmad Hassan
---

## Introduction to GSAP

GSAP(Greensock Animation Platform) is a powerful JavaScript animation library that allows you to create high-performance animations for web applications. It is widely used for animating elements with precision and smoothness.

## 2. Installing GSAP

You can use GSAP in multiple ways:

**CDN**
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
```

## 3. Basic GSAP Syntax

GSAP uses the `.to()`, `.from()`, and `.fromTo()` methods to animate elements.

- **`gsap.to()`** → Animates from the current state to a new state.

```js
gsap.to(".box", { x: 200, duration: 1 });
```

- **`gsap.from()`** → Animates from a given state to the current state.

```js
gsap.from(".box", { opacity: 0, y: -50, duration: 1 });
```

- **`gsap.fromTo()`** → Specifies both the start and end states explicitly.

```js
gsap.fromTo(".box", { x: 0 }, { x: 300, duration: 1 });
```

## 4. Key Properties

- `x, y` → Move horizontally/vertically
- `scale, scaleX, scaleY` → Scale size
- `rotation, rotate` → Rotate element
- `opacity` → Change transparency
- `skewX, skewY` → Skew transformation
- `stagger` → Create a delay between multiple elements

*Example*

```js
gsap.to(".box", { x: 100, scale: 1.5, rotation: 360, duration: 2 });
```


## 5. Timeline for Sequencing Animations

GSAP’s `gsap.timeline()` helps chain animations in sequence.


```js
let tl = gsap.timeline();
tl.to(".box", { x: 100, duration: 1 })
  .to(".box", { y: 100, duration: 1 })
  .to(".box", { rotation: 360, duration: 1 });
```

## 6. Easing Functions

Easing makes animations feel natural.

```js
gsap.to(".box", { x: 300, duration: 2, ease: "bounce.out" });
gsap.to(".circle", { y: -100, duration: 1, ease: "elastic.out(1, 0.3)" });
```

## 7. Staggering Animations

Use `stagger` to animate multiple elements with delay.

```js
gsap.to(".boxes", { y: 100, duration: 1, stagger: 0.2 });
```


## 8. ScrollTrigger (GSAP Plugin)

To trigger animations on scroll:

*CDN*
```js
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

Example:

```js
gsap.to(".box", {  // Animates the element with class "box"
  x: 300,          // Moves the element 300 pixels to the right
  duration: 2,     // Animation lasts for 2 seconds
  scrollTrigger: { // Uses the ScrollTrigger plugin to trigger animation on scroll
    trigger: ".box",   // The animation starts when the ".box" element enters the viewport
    scroller: "body",  // Specifies the scrolling container (default is "body")
    markers: true,     // Displays visual markers (start and end points) for debugging
    start: "top 80%",  // Animation starts when the top of ".box" reaches 80% of the viewport height
    end: "top 30%",    // Animation ends when the top of ".box" reaches 30% of the viewport height
    scrub: true,       // Makes the animation progress smoothly with scrolling
  }
});
```

### Explanation of ScrollTrigger Properties

| **Property** | **Description**                                                                                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `trigger`    | Defines which element should trigger the animation when it enters/exits the viewport.                                                                                                                                                 |
| `scroller`   | Specifies the scrollable container (default is `body`). Useful when working with scrollable divs.                                                                                                                                     |
| `markers`    | Adds visual markers to indicate where the animation starts and ends (for debugging).                                                                                                                                                  |
| `start`      | Defines when the animation starts. `"top 80%"` means when the top of `.box` reaches 80% of the viewport height.                                                                                                                       |
| `end`        | Defines when the animation ends. `"top 30%"` means when the top of `.box` reaches 30% of the viewport height.                                                                                                                         |
| `scrub`      | Syncs the animation with the scroll position. If `true`, the animation plays forward and backward as the user scrolls. Delays the animation by **1 second**, creating a smoother transition. if scrub is `scrub: 2` it has range 1-5. |
| `pin`        | The `pin: true` property **locks (pins) an element in place** while the user scrolls past it.                                                                                                                                         |


# Locomotive

**Locomotive Scroll** is a powerful JavaScript library that provides **smooth scrolling**, **parallax effects**, and **scroll-based animations**. It enhances user experience by making scrolling feel more natural.

## 1. Installation

### CDN (Easiest Way)

Add this in your HTML file:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/locomotive-scroll/dist/locomotive-scroll.css">
<script src="https://cdn.jsdelivr.net/npm/locomotive-scroll/dist/locomotive-scroll.min.js"></script>
```

### NPM/Yarn (Recommended for Projects)

```sh
npm install locomotive-scroll
```


## 2. Basic Setup

### HTML Structure

```html
<body data-scroll-container>
  <div data-scroll-section>
    <h1 data-scroll data-scroll-speed="2">Smooth Scrolling</h1>
  </div>
</body>
```

- `data-scroll-container` → Defines the scrollable container.
- `data-scroll` → Enables scroll animations for elements.
- `data-scroll-speed="2"` → Adds a **parallax** effect.

### JavaScript Setup

```js
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"), // Selects the scrollable container
  smooth: true, // Enables smooth scrolling
  lerp: 0.1, // Controls scroll smoothness (0 = instant, 1 = no smoothness)
});
```

## Key Features & Properties

### (1) Smooth Scrolling

```js
const scroll = new LocomotiveScroll({
  el: document.querySelector("[data-scroll-container]"),
  smooth: true,  // Enables smooth scrolling
  smoothMobile: false, // Disable smooth scroll on mobile
});
```

### (2) Parallax Effects

```js
<h1 data-scroll data-scroll-speed="3">Parallax Effect</h1>
```

- `data-scroll-speed="3"` → Moves the text at a different speed than the scroll.

### (3) Sticky Elements

```html
<div data-scroll data-scroll-sticky>
  <p>I'm sticky!</p>
</div>
```

- `data-scroll-sticky` → Keeps the element fixed while scrolling.

### (4) Scroll-based Animations

```js
scroll.on("call", (value, way) => {
  if (value === "animate" && way === "enter") {
    document.querySelector(".box").classList.add("active");
  }
});
```

- Runs animations when an element enters/exits the viewport.

### (5) Scroll Events

```js
scroll.on("scroll", (instance) => {
  console.log(instance.scroll.y); // Get current scroll position
});
```

- **Triggers custom functions** on scroll events.

### (6) Destroy & Rebuild Scroll

```js
scroll.destroy(); // Stops LocomotiveJS
scroll.init();    // Re-initializes scrolling
```

- Useful when dynamically updating content.

### (7). LocomotiveJS with GSAP

GSAP works great with LocomotiveJS for advanced animations.

```js
scroll.on("scroll", (args) => {
  let progress = args.scroll.y / args.limit;
  gsap.to(".progress-bar", { scaleX: progress });
});
```

- This creates a **scroll progress bar** animation.

## Summary

| **Feature**             | **Usage**                       |
| ----------------------- | ------------------------------- |
| Smooth Scrolling        | `smooth: true` in the JS setup  |
| Parallax Effect         | `data-scroll-speed="X"`         |
| Sticky Sections         | `data-scroll-sticky`            |
| Scroll-based Animations | `scroll.on("scroll", callback)` |
| Integration with GSAP   | `ScrollTrigger.scrollerProxy()` |

