---
title: HTML - The Language of the Web
draft: false
date: 2025-01-05
description: HTML is the backbone of the web. Learn the basics of HTML, its structure, and how to create your first webpage.
categories:
  - tech
  - web
tags:
  - tech
  - html
  - web
keywords:
  - HTML tutorial for beginners
  - HTML tags reference
  - HTML boilerplate code
  - HTML5 semantic elements
  - HTML forms and inputs
  - learn HTML basics
  - HTML document structure
  - HTML tables
Author: Ahmad Hassan
---

HTML(Hyper Text Markup Language) is the standard language use to create and structure content on the web.

**Why learn html:** because we need to create website for that we need html, or because of content.

## Getting Started with HTML

Tip: type - `html:5` / `!` - for boilerplate code

### Boilerplate Code

```html
<!DOCTYPE html> <!-- tells that we are using HTML5 -->
<html lang="en"> <!--The tag represents the root of an HTML document.-->
<head> <!-- head is a container for metadata (data about data)-->
<meta charset="UTF-8"> <!--tag defines metadata about an HTML document-->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title> <!--defines the title of the document.-->
</head>
<body> <!-- defines the document's body.-->
	<!-- content added here -->
</body>
</html>
```

## Tags in HTML

1. `<h1></h1>` - heading tag and Most Importance
2. `<h2></h2>` - less Importance than h1
3. `<h3></h3>` - less Importance than h2
4. `<h4></h4>` - less Importance than h3
5. `<h5></h5>` - less Importance than h4
6. `<h6></h6>` - less Importance than h5
7. `<p></p>` - paragraph tag used to add paragraph/text on website
8. `<b></b>` - used to bold the text
9. `<i></i>` - used to italic the text
10. `<sup></sup>` - used for to add super script
11. `<sub></sub>` - used to add sub script
12. `<br></br>` - used to break line
13. `<hr>` - used to add horizontal row
14. `<ol></ol>` - used to add ordered list
15. `<ul></ul>` - used to add unordered list
16. `<li></li>` - used to add items in list
17. `<a href ="source"> </a>` - used to make text clickable/hyperlink
	- Tip: to open link in new tab use this `target="_blank"`
18. `<img src="source" alt=" ">` - used to add image to website
19. `<form></form>` - used to create the form
20. `<label></label>` - used to add label to input field
21. `<input id ="abc" type="text" placeholder="Name" >` - used to add input field
22. `<div></div>`
	1. div is rectangle in his nature with 0 height
	2. div is used to combine multiple elements together in html
23. `<table></table>` - A table in HTML consists of table cells inside rows and columns.
24. `<td></td>` - Each table cell is defined by a and a tag
25. `<tr></tr>` - table row starts with a and ends with a tag
26. `<th></th>` - Defines a header cell in a table

## Input Types for Input tag

1. **text :** `<input type="text" placeholder="Name">`
2. **email :** `<input type="email" placeholder="Email">`
3. **password :** `<input type="password" placeholder="Password">`
4. **checkbox :** `<input type="checkbox" >`
5. **radio button :** `<input type="radio" > Male`
6. **file :** `<input type="file" >`
7. **range :** `<input type="range" >`
8. **color:** `<input type="color" >`
9. **date :** `<input type="date" >`
10. **submit :** `<input type="submit" >`

### id

id is attribute that is used to assign id to an element. It is very helpful when we have multiple of same type but we need to treat them differently. id must be unique of element.

### class

As we know that we are not allowed to assign same id to different element but when we need this type of thing we use the class attribute.

## HTML5 Semantics

HTML5 semantics refers to the use of specific tags like `<header>`,`<footer>`,`<nav>`,`<article>`,`<section>`,etc, to provide clearer structure and meaning to web content. This improves accessibility, better SEO, and facilitates better better understanding by both human and machines, These tags did not to something special they act like normal div but with clearer structure and meaning about there content.

### Semantics Elements

1. `<header>` : First section website can be called header
2. `nav` : Navigation bar.
3. `<main>` : complete website in this tag.
4. `<section>` : A page can split into sections like introduction, contact information, Details, etc and each of these sections can be in a different section tag.
5. `<article>` : It contains independent content which does not require any other context, blog post, newspaper article etc.
6. `<aside>` : It is used to place content in a sidebar i.e aside from the existing content. IT is related to surrounding context.
7. `<footer>` : Footer located at the bottom of any article or document, they can contain contact details, copyright information etc. There can be multiple footers on a page.
8. `<audio>` : use to add audio support
9. `<video>` : use to add video support
