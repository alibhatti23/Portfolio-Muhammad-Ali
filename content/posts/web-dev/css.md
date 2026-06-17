---
title: CSS - Cascading Style Sheets
draft: false
date: 2025-01-12
description: CSS is the style sheet language that's use to specify how a document written in HTML or XML should be presented and styled.
categories:
  - tech
  - web
tags:
  - tech
  - CSS
  - web
keywords:
  - CSS tutorial
  - CSS guide for beginners
  - CSS flexbox
  - CSS grid layout
  - CSS animations
  - responsive web design
  - CSS media queries
  - CSS properties reference
  - CSS units explained
  - pseudo-classes and pseudo-elements
Author: Ahmad Hassan
---

CSS (Cascadia Styling Sheet) is the style sheet language that's use to specify how a document written in HTML or XML should be presented and styled.

## CSS Boilerplate

```css
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
html,body{
    width: 100%;
    height: 100%;
}
```

## How to Link CSS with HTML

Add the line after tittle tag in your html file

`<link rel="stylesheet" href="style.css">`

**Tips:**
- We use `.` dot to target class in CSS
- We use `#` hash to target id in CSS
- Also if you want to target tag we can simply target like h3{}
- *Div:* box means div and also when e have more than one element and also when there is rectangle shape, very high change there is div ;).

## Units in CSS

1. **px :** It is use to define the measurement in pixels. `1px = 1/96th of inch`
2. **% :** It is used to define the measurement as a percentage that is relative to another value (maybe to their `parent element`).
3. **vh :** It is relative to the height of the `viewpoint(screen)`. `1vh = 1% or 1/100 of the height of the viewpoint`
4. **vw :** It is relative to the width of the `viewpoint(screen)`. `1vm or 1/100 of the width of the width of viewpoint`
5. **em :** Relative to the font-size of the element `2em means 2 times the size of the current font`
6. **rem :** Relative to font-size of the root element like `html tag`.
7. **vmin :** Relative to 1% of viewport's* smaller dimension
8. **vmax :** Relative to 1% of viewport's* larger dimension

*Tip:* There are mainly two type of fonts sans-serif and serif. The difference is the presence of decorative strokes, or serifs at the beginning and end of letters.

**Examples**
<p style="font-family: 'Times New Roman', serif;">
  This text is displayed in a **serif** font (Times New Roman).
</p>
<p style="font-family: Arial, sans-serif;">
  This text is displayed in a **sans-serif** font (Arial).
</p>

## CSS Properties

1. `Width:` sets the width of an element.
2. `Height:` Sets the height of an element.
3. `color:` sets the color of text.
4. `background-color:` specifies the background color of element.
5. `max-width:` sets the maximum width of an element.
6. `max-height:` set the maximum height of an element.
7. `min-width:` sets the minimum width of an element.
8. `min-height:` sets the minimum height of an element.
9. `font-family:` set/defines a list of fonts for element.
10. `font-weight:` specifies the weight of fonts like *normal*,*bold*, and *bolder(900)*,*thin(100)*
11. `text-transform:` control the capitalization of text like *capitalize*, *uppercase*, *lowercase*, *none*.
12. `text-decoratoin:` specifies the decoration added to text like *underline*, *overline*, *pass-through*
13. `font-size:` specifies the size of font.
14. `line-height:` sets the line height means gap between lines, also we can set numeric like 1,1.2,0.5 or units that we learned before.
15. `text-align:` specifies the horizontal alignment of text like *left*, *right*, *justify*, *center*.
16. `padding:` A shorthand property for all the padding properties. instead we can also use, `padding-top`, `padding-left`, `padding-bottm`, `padding-right`.
17. `margin:` sets all the margin properties in one declaration. we can also like padding uses these `margin-top`,`margin-left`,`margin-bottom`,`margin-right`.
18. `rotate:` property allows you to rotate elements.
19. `gap:` The `gap` property defines the size of the gap between the rows and between the columns in flexbox.
20. `overflow:` The overflow property specifies whether to clip the content or to add scrollbars when the content of an element is too big to fit in the specified area. like `visible`, `hidden`,`scroll`,`auto`.
21. `overflow-x and overflow-y:` `overflow-x` specifies what to do with the left/right edges of the content.`overflow-y` specifies what to do with the top/bottom edges of the content.
22. `z-index:` The `z-index` property specifies the stack order of an element.`z-index` only works on positioned elements like relative,absolute, or fixed. [read more](https://www.w3schools.com/cssref/pr_pos_z-index.php) about z-index.
23. `transform:` The `transform` property applies a 2D or 3D transformation to an element. The property allow you to *rotate*,*scale*,*move*,*skew*, etc,. elements.
24. `transition:` CSS transitions allows you to change property values smoothly, over a given duration.- `transition`,`transition-delay` `transition-duration`,`transition-property`,`transition-timing-function`

## Margin VS Padding

- **padding:** padding is the space inside an element, between its content and its border.
- **margin:** margin is the space outside an element, between the element's border and other elements.

![margin-padding](/posts/assets/web/CSS/margin-padding.webp)

25. `border:` A shorthand property for `border-width`, `border-style`, `border-color` *ex:* `border: 3px solid gray`
26. `border-radius:` A shorthand property for the for border `*_radius` properties. We can also add radius on only one corner. like using these properties `border-bottom-left-radius`, `border-bottom-right-radius`,`border-top-left-radius`,`border-top-right-radius`

## Block VS Inline VS Inline-Block

**Block Element:-** Start on a new line (occupy full width) and take-up 100% of the width by default. You can set *height*, *width*, *margin*,*padding*. **ex:** `<div>`, `<p>`, `<h1>`.

**Inline Element:-** Do not start on a new line and only take-up as much width as their content/required. Height and width **cannot** be set/change. **ex:** `<span>`,`<a>`,`<strong>`.

**Inline-Block Element:-** Behave like inline element(do not start on a new line). Allow setting height,width like block elements. Useful for layouts purposes without breaking the flow.**ex:** `<img>`,`button`,`<input>`.

27. `display:` specifies how a certain HTML should be displayed. *attributes:* `block`,`inline`,`inline-block`

## Position Absolute VS Position Relative

**Position Absolute:-**
- An element with `position: absolute` is removed from the normal document flow.
- It is positioned relative to its nearest positioned ancestor (an ancestor with `position: relative`, `absolute`, or `fixed`). If no such ancestor exists, it is positioned relative to the initial containing block (viewport).
- It does not occupy space in the normal layout, allowing it to move freely within its containing block.

**Position Relative:-**
- An element with `position: relative` remains in the normal document flow.
- It is positioned relative to its **original position**, using `top`, `right`, `bottom`, and `left` values.
- Space for the element is still reserved in the layout, so it affects other elements.

28. `position:` specifies the type of positioning method used for an element `absolute`,`relative`,`fixed`.

## Background Properties

29. `background:` A shorthand property for all the background properties. It set by `img()`,`color`, `linear-gradiant(to bottom right, red,yellow)` etc.
30. `background-size:` Specifies the size of the background images like `cover`,`contain` etc.
31. `background-repeat:` Sets if/how a background image will be repeated. like `no-repeat`, `round` etc.
32. `background-position:` specifies the position of a background image like `center`,`right`, `left`,`top`,`bottom`.

## Flexbox

Flexbox is a CSS layout model designed to help arrange elements in a responsive flexible way. It simplifies alignment, distribution, and spacing of items within a container-even when their size is unknown or dynamic. The Flexbox model is one-dimensional, meaning it handles either row or a column layout, Unlike CSS Grid which is two-dimensional(rows and columns).

![Flexbox](/posts/assets/web/CSS/flex.webp)

### Key Concepts

- *Flex Container:* The parent element that holds flex items. We can define a flex container by applying `display: flex;` to it.
- *Flex items:* The child elements of a flex container that will be laid out according to the flexbox rules.

### Main Axis and Cross Axis

- *Main Axis(x-axis):* This axis along which flex items are placed. It depends on the `flex-direction` property (row by default).
- *Cross Axis(y-axis):* The perpendicular axis to the main axis. for example, if the `flex-direction` is row, the cross axis will be vertical.

### Flexbox Properties

1. `display: flex;` Defines the element as flex container.
2. `flex-direction:` Specifies the direction of the main axis like `row`, `column`,`row-reverse`,`column-reverse`.
3. `justify-content:` Aligns items along the main axis like `start`,`center`,`space-between`,`space-evenlly`.
4. `align-items:` Aligns items along the cross-axis `stretch`,`center`, `flex-start`,`flex-end`.
5. `flex-wrap:` The `flex-wrap` property specifies whether the flexible items should wrap or not. like `nowrap`,`wrap`,`wrap-reverse`.
6. `flex-shrink:` The `flex-shrink` property specifies how the item will shrink relative to the rest of the flexible items inside the same container. value like 0 or 1.

## Pseudo-Class and Pseudo-Elements

Pseudo-elements and pseudo-classes are both powerful CSS features used to style elements based on specific states or to target parts of elements that aren't directly available in the DOM, although they serve similar purposes, modifying or styling elements based on conditions, they function differently.

### Pseudo-Classes

They targets an element in a specific state, and we use `:` for pseudo-classes.

*Syntax:* `selector:pesudo-class`

**Common Examples:**
- `:hover` when an element is hovered.
- `:focus` when an element is focused.
- `:th-child(n)` targets the nth child of parent.
- `:active` when an element is being clicked.
- `:visited` for visited links

### Pseudo-Elements

Targets part of an element or inserts content before/after it. we use `::` for elements.

*Syntax:* `selector::pesudo-element`

**Common Examples:**
- `::before` insert content before an element.
- `::after` inserts content after an element.
- `::first-letter` styles the first-letter.
- `::first-line` styles the first line.
- `::selection` styles the selected text.

| Pseudo Classes                                      | Pseudo-Elements                                                             |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| Interact with element states (e.g., :hover, :focus) | Target parts of an element or add content (e.g., ::before, ::first-letter). |

## Color Science and their Units

### 1. Color Name

CSS provides a set of predefined names that are recognized by all browsers *ex:* `red`,`green`,`blue`,`black` (total around 140 standard names)

**Example:** `background-color: red;`

### 2. Hexadecimal Notation (#RRGGBB)

A more precise way to specify color in CSS is using hexadecimal(hx) notation.
Hex values are written in the form #<span style="color:red">RR</span><span style="color:green">GG</span><span style="color:blue">BB</span>, where:
- #<span style="color:red">RR</span> : represent the red component.
- #<span style="color:green">GG</span> : represent the green component.
- #<span style="color:blue">BB</span> : represent the blue component.

The values range is `00-FF`, 00 means no color and FF means full intensity.

**Example:** `background-color: #11111b;`

### 3. RGB Functional Notation

The rgb notation uses the same concept as hex but, specifies values in the decimal range from `0-255`. The format is `rgb(red,green,blue)`, where each color component is an integer between 0(no color) and 255(full intensity).

**Example:** `background-color: rgb(255,0.0);`

### 4. RGBA Functional Notation

`rgba()` extends the `rgb()` notation by adding an *alpha* channel for transparency. The format is `rgba(red,green,blue,alpha)`, where alpha value is a decimal between 0(completely transparent) and 1(completely opoque).

**Example:** `background-color: rgba(255,0,0,0.5)`.

## Grid in CSS

CSS Grid Layout is a powerful two-dimensional layout system designed to handle both rows and columns. It provides a way to create web layouts without relying on floats or positioning.

### Core Concepts of CSS Grid

1. **Grid Container**: The parent element where `display: grid;` is applied.
2. **Grid Items**: The direct child elements of a grid container.
3. **Grid Lines**: Horizontal and vertical lines that divide the gird into cells.

### Defining a Grid

- **Columns and Rows:** Use `grid-template-columns` and `grid-template-rows` to define the grid.

1. `grid-template-columns:` Specifies the size of the columns, and how many columns in a grid layout
2. `grid-template-rows:` Specifies the size of the rows in a grid layout.

- **Gap between Grid items:** Use `gap`,`row-gap`,`column-gap` to create spacing.

### Alignment and Justification

1. `align-items:` Aligns items vertically inside the container.
2. `justify-items:` Aligns items horizontally inside the container.
3. `align-content:` Vertically aligns the whole grid inside the container (when total grid size is smaller than container).
4. `jusitfy-content:` Horizontally aligns the whole grid inside the container (when total grid size is smaller than container).

*Other useful properties:*

5. `justify-self:` Aligns the content for a specific grid item along the row axis
6. `align-self:` Aligns the content for a specific grid item along the column axis
7. `grid-row-start:` Specifies where to start the grid item
8. `grid-row-end:` Specifies where to end the grid item
9. `grid-column-start:` Specifies where to start the grid item
10. `grid-column-end:` Specifies where to end the grid item
11. `grid-row:` A shorthand property for the _grid-row-start_ and the _grid-row-end_ properties.*ex:* `grid-row: 1 / 3;`
12. `grid-column:` A shorthand property for the _grid-column-start_ and the _grid-column-end_ properties.*ex:* `grid-column: 1 / 4;`

### CSS Grid vs Flexbox

| **CSS Grid**                 | **Flexbox**                            |
| ---------------------------- | -------------------------------------- |
| Two-dimensional layout       | One-dimensional layout                 |
| Suitable for complex layouts | Ideal for simpler layouts (row/column) |
| Explicit rows and columns    | No rows/columns concept                |

## Responsive Web Design

### 1. Understanding Units

The first thing in responsiveness is to understand the Absolute(like px) and Relative(em,vh) Units and given are units in css.

#### Absolute Units

These units are fixed and not affected by the size of other elements or the viewport.

- **px (pixels):** A single pixel on the screen.
- **cm (centimeters):** A physical centimeter.
- **mm (millimeters):** A physical millimeter.
- **in (inches):** A physical inch (1 inch = 2.54 cm).

#### Relative Units

These units are based on the size of other elements, the viewport, or the font size.

##### Relative to the Font Size

- **em:** Relative to the font size of the parent element.
- **rem (root em):** Relative to the font size of the root element (`<html>`).
- **ex:** Relative to the height of the lowercase letter "x" in the current font.
- **ch:** Relative to the width of the character "0" (zero) in the current font.

##### Relative to the Viewport

- **vw (viewport width):** 1% of the viewport's width.
- **vh (viewport height):** 1% of the viewport's height.
- **vmin:** 1% of the smaller dimension (width or height) of the viewport.
- **vmax:** 1% of the larger dimension (width or height) of the viewport.

##### Relative to the Element's Size

- **% (percentage):** Relative to the size of the parent element.

### 2. Flexbox for Responsive Design

Flexbox is a powerful tool for creating responsive layouts that adapt to different screen sizes and devices. Below are key takeaways for using Flexbox in responsive design:

#### General Concepts

1. **Flex Direction:**
- Use `flex-direction: row;` for horizontal layouts.
- Switch to `flex-direction: column;` for vertical layouts on smaller screens using media queries.
2. **Flex Wrap:**
- Use `flex-wrap: wrap;` to allow flex items to wrap onto new lines if necessary.
3. **Flex Property:**
- Use the `flex` property with percentages (e.g., `flex: 50%;`) to adjust the width of items based on the screen size.

### 3. CSS Media Queries

Media query is a CSS technique introduced in CSS3. It uses the `@media`rule to include a block of CSS properties only if a certain condition is true.

#### Example

If the browser window is 600px or smaller, the background color will be lightblue:

```css
@media (max-width: 600px) {
  body {
    background-color: lightblue;
  }
}
```

#### Add a Breakpoint

Earlier in this tutorial we made a web page with rows and columns, and it was responsive, but it did not look good on a small screen.

Media queries can help with that. We can add a breakpoint where certain parts of the design will behave differently on each side of the breakpoint.

![mobile](/posts/assets/web/CSS/mobile.webp)

#### Always Design for Mobile First

Mobile First means designing for mobile before designing for desktop or any other device (This will make the page display faster on smaller devices).

This means that we must make some changes in our CSS.

Instead of changing styles when the width gets _smaller_ than 768px, we should change the design when the width gets _larger_ than 768px. This will make our design Mobile First:

#### Typical Device Breakpoints

There are tons of screens and devices with different heights and widths, so it is hard to create an exact breakpoint for each device. To keep things simple you could target five groups:

```css
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {...}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {...}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {...}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {...}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {...}
```

## CSS Animations

- CSS allows animation of HTML elements without using JavaScript!.
- An animation lets an element gradually change from one style to another.
- You can change as many CSS properties you want, as many times as you want.
- To use CSS animation, you must first specify some keyframes for the animation.
- Keyframes hold what styles the element will have at certain times.
- Animations is just transaction from initial to final position.

### The @keyframes Rule

When you specify CSS styles inside the `@keyframes` rule, the animation will gradually change from the current to the new style at certain times.

```css
@keyframes animation-name {
    to{
     /* Intial properties */
        left: 0%;
        rotate: 0;
        top: 0;
    }
    from{
    /* final properties */
        left: 75%;
        rotate: 360deg;
        border-radius: 50%;
        background-color: green;
    }

}
/* we can also give animation in percenatge so when the animation is 25% complete, 50% complete, and again when the animation is 100% complete: */
@keyframes animation-name {
    0%{
        left: 0%;
        rotate: 0;
        top: 0;
    }
    25%{
        left: 75%;
        top: 0;
        background-color: blue;
    }
    50%{
        left: 75%;
        top: 73%;
        rotate: 360deg;
        background-color: green;
    }
    75%{
        left: 0;
        top: 73%;
        background-color: aqua;
    }
    100%{
        left: 0;
        top: 0;
    }
}
```

### CSS Animation Properties

| Property                  | Description                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| @keyframes                | Specifies the animation code                                                                                                                                 |
| animation                 | A shorthand property for setting all the animation properties. `animation: example 5s linear 2s infinite alternate;`                                         |
| animation-delay           | specifies a delay for start of an animation. like `1s`,`5s`                                                                                                  |
| animation-direction       | Specifies whether an animation should be played forwards, backward or in alternate cycles.`normal`,`reverse`,`alternate`,`alternate-reverse`.                |
| animation-duration        | specifies how long time an animation should take to complete one cycle like. `2s`,`4s`.                                                                      |
| animation-iteration-count | Specifies the number of times an animation should be played. like `2`,`4`, or `infinite`.                                                                    |
| animation-name            | Specifies the name of the @keyframes animation.                                                                                                              |
| animation-fill-mode       | Specifies a style for the element when animation is not playing or completed(before it starts, after it ends, or both).`none`,`forwards`,`backwards`,`both`. |
| animation-timing-function | Specifes the speed curve of the animation like `ease`,`linear`,`ease-in`,`ease-out`,`ease-in-out`,`cubic-bezier(n,n,n,n)`                                    |

### Animation Timing Function

- `ease` - Specifies an animation with a slow start, then fast, then end slowly (this is default)
- `linear` - Specifies an animation with the same speed from start to end
- `ease-in` - Specifies an animation with a slow start
- `ease-out` - Specifies an animation with a slow end
- `ease-in-out` - Specifies an animation with a slow start and end
- `cubic-bezier(n,n,n,n)` - Lets you define your own values in a cubic-bezier function.
