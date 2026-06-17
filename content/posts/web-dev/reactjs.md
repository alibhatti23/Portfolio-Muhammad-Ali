---
title: React – A JavaScript Library
draft: false
date: 2025-06-16
description: A comprehensive guide to React.js, covering its key features, state management, props, routing, redux, and more.
categories:
  - tech
tags:
  - tech
  - react 
  - JavaScript
  - Web
Author: Ahmad Hassan
keywords:
  - React.js tutorial
  - React hooks useState useEffect
  - React component lifecycle
  - React props and state
  - React Router dynamic routing
  - Redux Toolkit state management
  - React Context API
  - React form handling
  - JSX syntax
  - React API integration axios
---



![JS Image](/posts/assets/react/react.webp)



- React.js is a JavaScript library for building **user interfaces**.
- Developed by **Facebook** (now Meta) in 2013.
- It is **component-based**, **declarative**, and allows for efficient UI updates.

## Key Features of React

- **Component-Based Architecture**: UI is built using reusable components.
- **Virtual DOM**: Updates only the changed parts, making React fast.
- **Unidirectional Data Flow**: Props and state maintain a predictable data structure.
- **JSX (JavaScript XML)**: A syntax extension that lets you write HTML inside JavaScript.
- **Hooks**: Allow functional components to have state and other features.

## Mutable vs Immutable

### Mutable (Changeable)

- Mutable data types **can be changed** after creation.
- Example: **Objects & Arrays** are mutable.

```js
let arr = [1, 2, 3];
arr.push(4); // Modifies the original array
console.log(arr); // [1, 2, 3, 4]
```

### Immutable (Unchangeable)

- Immutable data **cannot be changed** directly. Instead, you create a new copy.
- Example: **Strings & Numbers** are immutable.

```js
let str = "Hello";
str[0] = "M"; // This won't change the string
console.log(str); // "Hello"
```


Example of immutable object handling (creating a new object instead of modifying the original):

```js
const person = { name: "Ahmad", age: 19 };
const updatedPerson = { ...person, age: 20 };
console.log(updatedPerson); // { name: "Ahmad", age: 20 }
```


## Arrays & Objects Destructuring

### Array Destructuring

- Extract values from an array and assign them to variables.

```js
const numbers = [10, 20, 30];
const [a, b, c] = numbers;
console.log(a, b, c); // 10 20 30
```

### Object Destructuring

```js
const person = { name: "Ahmad", age: 19, city: "Multan" };
const { name, age } = person;
console.log(name, age); // Ahmad 19
```

## Import & Export in JavaScript

### Exporting in JavaScript

##### Named Export (Multiple Exports)

```js
export const name = "Ahmad";
export const age = 19;
export function greet() {
  return "Hello!";
}
```

##### Default Export (Single Export per File)

```js
export default function greet() {
  return "Hello!";
}
```


### Importing in JavaScript

##### Named Import

```js
import { name, age, greet } from "./module.js";
console.log(name, age); // Ahmad 19
console.log(greet()); // Hello!
```

##### Default Import

```js
import greet from "./module.js";
console.log(greet()); // Hello!
```

##### Import Everything

```js
import * as data from "./module.js";
console.log(data.name); // Ahmad
console.log(data.greet()); // Hello!
```

|Concept|Description|
|---|---|
|**Mutable**|Can be changed (Objects, Arrays).|
|**Immutable**|Cannot be changed (Strings, Numbers).|
|**Primitive Types**|Stored by value (`string`, `number`, `boolean`, etc.).|
|**Reference Types**|Stored by reference (`object`, `array`, `function`).|
|**Destructuring**|Extracts values from arrays/objects into variables.|
|**Import/Export**|Used to share JavaScript files/modules.|
|**Spread (`...`)**|Expands arrays/objects into individual values.|
|**Rest (`...`)**|Gathers multiple values into an array.|

## Map & Filter in JavaScript for React


### `map()` Method

- `map()` is used to **iterate** over an array and return a **new array** with modified elements.
- It **does not modify** the original array.

Syntax:

```js
const newArray = array.map((element, index, array) => {
  return modifiedElement;
});
```

Example:

```js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8]
```


### `filter()` Method

- `filter()` is used to **filter elements** based on a condition.
- It returns a **new array** with only the elements that satisfy the condition.
- The original array remains **unchanged**.

Syntax:

```js
const newArray = array.filter((element, index, array) => {
  return condition;
});
```

Example:

```js
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]
```

|Method|Purpose|Returns|
|---|---|---|
|`map()`|Transforms each element in an array|A new array with modified values|
|`filter()`|Selects elements that match a condition|A new array with filtered values|
|`map()` + `filter()`|First filters elements, then transforms them|A new modified and filtered array|

✅ Use **`map()`** to **modify** each element in an array.  
✅ Use **`filter()`** to **remove** unwanted elements from an array.  
✅ **Always use a `key` prop** in React when rendering lists.

## Difference Between Library & Framework


|Feature|**Library**|**Framework**|
|---|---|---|
|**Definition**|A collection of reusable code that helps developers perform specific tasks.|A full-fledged structure that dictates how the code should be organized.|
|**Control**|**You control** when and how to use the library.|The framework **controls** the flow of execution.|
|**Flexibility**|More flexible, can be used with other tools.|Less flexible, enforces a specific architecture.|
|**Example**|React.js (UI library), Lodash, jQuery|Angular, Django, Ruby on Rails|
### Key Difference

- **React (Library)**: You decide how to structure the app.
- **Angular (Framework)**: It dictates the structure.

## Real DOM vs Virtual DOM

### What is the DOM (Document Object Model)?

- The DOM represents the structure of an HTML document as a tree.
- JavaScript can manipulate the DOM to update elements dynamically.

#### What is Real DOM?

- The **actual** structure of an HTML document in the browser.
- When a change is made, **the entire page re-renders**.
- **Slow performance** for frequent updates.

#### What is Virtual DOM?

- A **lightweight copy** of the Real DOM.
- React **updates the Virtual DOM first**, then compares it with the previous version using **diffing**.
- Only the **changed parts** of the Real DOM get updated, making React **much faster**.

### Difference Between Real DOM & Virtual DOM

|Feature|**Real DOM**|**Virtual DOM**|
|---|---|---|
|**Definition**|Actual representation of the webpage.|Lightweight copy of the Real DOM.|
|**Updates**|Directly updates the UI.|Updates in memory first, then syncs with the Real DOM.|
|**Performance**|Slower (entire page re-renders).|Faster (only updates changed parts).|
|**Efficiency**|Expensive updates, slow rendering.|Optimized updates, fast rendering.|
|**Used in**|Vanilla JavaScript, jQuery.|React, Vue.js.|

#### Why Virtual DOM is Important in React?

✅ **Faster updates** compared to Real DOM.  
✅ **Better performance** for dynamic content.  
✅ **Efficient UI rendering** with minimal reflows.


## Vite vs Create React App (CRA) in React.js

### 1. Vite 🚀

- **Modern, fast, and optimized** build tool for React.
- Uses **ES modules (ESM)** and **Hot Module Replacement (HMR)** for instant updates.
- **Super fast startup** (no bundling in development).
- **Supports TypeScript, JSX, and more out-of-the-box**.
- **Tree-shaking & optimized builds** for production.

**Install React with Vite**

```bash
npm create vite@latest
npm install
npm run dev
```


### 2. Create React App (CRA) 🏗️

- Traditional way to set up React projects.
- Uses **Webpack** (slower than Vite).
- **Slower builds** and HMR compared to Vite.
- **Good for beginners**, but outdated for large apps.

**Install React with CRA**

```bash
npx create-react-app my-app
cd my-app
npm start
```


## JSX (JavaScript XML) & React Vite Folder Structure


### 1. JSX (JavaScript XML)

- **JSX** is a syntax extension for JavaScript used in React.
- Looks like **HTML inside JavaScript** but gets converted to JavaScript functions or React.createElement.
- **Allows embedding JavaScript** inside `{}`.
- Must return a **single parent element** (use `<>...</>` if needed).

```js
const App = () => {
  const name = "Ahmad";
  return <h1>Hello, {name}!</h1>;
};
export default App;
```

### 2. React Vite Folder Structure

```js
.
├── eslint.config.js     # ESLint configuration (optional)
├── index.html           # Main HTML file (root of the app)
├── node_modules/        # Installed dependencies
├── package.json         # Project metadata & dependencies
├── package-lock.json    # Exact versions of installed packages
├── public/              # Static assets (images, fonts, etc.)
├── README.md            # Project documentation
├── src/                 # Main source code directory
│   ├── App.jsx          # Main React component
│   ├── main.jsx         # React entry file (renders App)
│   ├── assets/          # Images, styles, etc.
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components (if using routing)
│   └── styles/          # Global CSS files (if needed)
└── vite.config.js       # Vite configuration file
```

### Key Points

✅ **`src/`** contains all React components & logic.  
✅ **`index.html`** is the main HTML template.  
✅ **Vite uses `main.jsx`** to mount the React app into `#root`.  
✅ **Public files** are served as-is from `/public/`.

## React Components & How They Work

### 1. Component in React

- A **component** is a **reusable, independent UI piece** in React.
- **Two types:**
  - **Functional Components** (recommended, use hooks).
  - **Class Components** (older, uses `this.state`).
- Components **return JSX** and manage their own logic & state.

```js
const MyComponent = () => {
  return <h1>Hello, React!</h1>;
};
export default MyComponent;
```


### 2. How They Work

✅ We **create components** inside the `src/components/` folder (e.g., `MyComponent.jsx`).  
✅ Components **are imported into `App.jsx`**, which acts as the main component.  
✅ **`main.jsx` is responsible for rendering `App.jsx`** inside the root `<div>` in `index.html`.  
✅ **`ReactDOM.createRoot(document.getElementById('root'))`** creates the **Virtual DOM** and syncs

#### Flow of Code in React

1. **Create a component** (`MyComponent.jsx`):

```js
const MyComponent = () => <h1>Hello, React!</h1>;
export default MyComponent;
```

2. **import it inside `App.jsx`**:

```js
import MyComponent from "./components/MyComponent";

const App = () => {
  return (
    <div>
      <MyComponent />
    </div>
  );
};
export default App;
```

3. **Render `App.jsx` inside `main.jsx`**:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

4. **`index.html` contains `root` div**:

```js
<body>
  <div id="root"></div>
</body>
```

### **Key Points**

✅ **Components are modular & reusable** in React.  
✅ **`main.jsx` renders `App.jsx` inside the `root` div**.  
✅ **React Virtual DOM** updates only changed parts for better performance. 🚀


## Conditional Rendering in React

Conditional rendering in React allows components to render dynamically based on conditions.

**Using if-else Statements**

```jsx
function Greeting(props) {
  if (props.isLoggedIn) {
    return <h1>Welcome Back!</h1>;
  } else {
    return <h1>Please Sign In</h1>;
  }
}
```

**Using Ternary Operator (? :)**

```jsx
function Greeting({ isLoggedIn }) {
  return <h1>{isLoggedIn ? "Welcome Back!" : "Please Sign In"}</h1>;
}
```

## Event Handling in React

React follows the Synthetic Event system, making event handling efficient across different browsers.

**Handling Click Events**

```jsx
function Button() {
  function handleClick() {
    alert("Button Clicked!");
  }

  return <button onClick={handleClick}>Click Me</button>;
}
```


**Passing Arguments in Event Handlers**

```jsx
function Greeting({ name }) {
  function sayHello(name) {
    alert(`Hello, ${name}!`);
  }

  return <button onClick={() => sayHello(name)}>Greet</button>;
}
```

**Handling Keyboard Events**

```jsx
function InputBox() {
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      alert("Enter key pressed!");
    }
  }

  return <input type="text" onKeyPress={handleKeyPress} />;
}
```

✅ **Conditional Rendering:** Use `if-else`, ternary (`? :`), `&&`, or `switch-case` for rendering components based on conditions.  
✅ **Event Handling:** Use event handlers like `onClick`, `onKeyPress`, `onSubmit`, etc., with functions.  
✅ **Pass Parameters:** Use arrow functions for passing arguments in event handlers.  
✅ **Prevent Default Behavior:** Use `event.preventDefault()` to stop default browser actions like form submissions.


## State in React

- State is an object that holds dynamic data that affects a component’s rendering.
- Unlike props, state is **mutable** and can be changed within a component.
- When state changes, React **re-renders** the component to reflect the updates.

### Types of State in React

1. *Local State:*
- Managed within a single component using `useState()`.
- Example: Form inputs, modals, toggles.
2. *Global State:*
- Shared across multiple components.
- Managed using **Context API**, **Redux**, or other state management libraries.
3. *Server State:*
- Data fetched from an API that needs to be integrated into UI.
- Managed using tools like **React Query, SWR, or Redux Thunk**.
4. *URL State:*
- State stored in the **URL** (query parameters, path, etc.).
- Managed using **React Router**.

### Understanding `useState()` Hook

- `useState()` is a React Hook that allows **functional components** to manage state.
- It returns an **array** with two values:
    1. The **current state** value.
    2. A **function** to update the state.

*Syntax:*

```jsx
const [state, setState] = useState(initialValue);
```

*Example: Counter App*

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // Initial state is 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

- `useState(0)`: Initializes `count` to `0`.
- `setCount(count + 1)`: Updates the state, causing a **re-render**.

#### Updating State Correctly

**1. Using Functional Updates (Best Practice)**

- When the new state depends on the previous state, use a function inside `setState()`.

```jsx
setCount((prevCount) => prevCount + 1);
```

- This ensures **correct** updates, especially in **async operations**.

**2. Updating Objects in State**

- Use **spread operator (`...`)** to avoid modifying the original state.

```jsx
const [user, setUser] = useState({ name: "Ahmad", age: 19 });
setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }));
```


**3. Updating Arrays in State**

- Use **spread operator (`...`)** to update arrays.

```jsx
const [items, setItems] = useState([1, 2, 3]);
setItems(prevItems => [...prevItems, 4]); // Adds new item
```


✅ **State** is a way to store data inside a component.  
✅ `useState()` is used to manage **local state** in functional components.  
✅ Always **use the updater function** when updating state based on previous values.  
✅ **Never modify state directly**, always use `setState()`.

## Props (Properties) in React

### What are Props?

- **Props** stand for **Properties**.
- Props are **read-only** data passed from a **parent component to a child component**.
- They allow **components to be dynamic and reusable** by passing different data to them.
- Think of props as **function arguments** for components.

## How Props Work

- **Parent component passes props to a child component**.
- **Child component receives them as a parameter** (usually an object).
- The child accesses props using `props.propName`.

## Syntax

### 1. Passing Props

```jsx
<ChildComponent name="Ahmad" age={19} />
```

### 2. Receiving Props

```jsx
function ChildComponent(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}
```

### ✅ OR Using Destructuring

```jsx
function ChildComponent({ name, age }) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
```

## 🧩 Key Points

- **Props are immutable**: You **cannot change** props inside the child component.
- **Unidirectional flow**: Data flows from **parent to child** (one-way data binding).
- **Can be any data type**: String, number, boolean, array, object, function, etc.
- Used to **customize components** and make them reusable.


## CSS Modules

- A **CSS Module** is a **CSS file in which all class and animation names are scoped locally by default**.
- This means that styles defined in one component **won’t affect other components**, preventing style conflicts.
- Used in **React.js** to maintain **modular, reusable, and conflict-free CSS**

###  How It Works

- A CSS file is treated as a module when named with the `.module.css` extension.
  - Example: `MyComponent.module.css`
- In React, you import it as an object where each CSS class becomes a property of that object.

**📄 Example File:** `Button.module.css`

```css
.button {
  background-color: blue;
  color: white;
}
```


### Example Usage in Component

```jsx
import styles from './Button.module.css';

function Button() {
  return <button className={styles.button}>Click me</button>;
}
```


### Behind the Scenes

- CSS Modules use a build tool like **Webpack** to **automatically transform class names** into unique identifiers.
  - Example:
     - `.button` in the source might become `.Button_button__3hWkj` in the final DOM.
- The mapping ensures **local scoping** and uniqueness across components.

### Comparison with Other Styling Methods

|Method|Scoped|Reusable|Global Impact|Setup Required|
|---|---|---|---|---|
|CSS Modules|✅|✅|❌|Minimal|
|Inline Styles|✅|❌|❌|None|
|Global CSS|❌|✅|✅|None|
|CSS-in-JS (e.g. styled-components)|✅|✅|❌|More setup|

##  Form Handling in React.js

**Form handling** refers to how input data is captured from HTML forms (like `<input>`, `<textarea>`, `<select>`) and managed using state or references in React.

#### Key Concepts:

- React forms are usually managed through **state** (controlled) or **refs** (uncontrolled).
- You handle form submissions via an `onSubmit` event handler.
- You use `onChange` to capture input updates.

###  Uncontrolled Components & useRef()

An **uncontrolled component** lets the **DOM manage the input value**, and React accesses it using a `ref`.

- Used to **directly access a DOM element**
- Doesn’t re-render the component on value change

```jsx
const inputRef = useRef();
const handleSubmit = () => {
  console.log(inputRef.current.value);
};

<input type="text" ref={inputRef} />
```


### Controlled Components

A **controlled component** is an input element whose value is **controlled by React state**.

```jsx
const [name, setName] = useState("");

<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
```

**Full Example:**

```jsx
import React, { useState } from "react";

function Form() {
  const [val, setVal] = useState({ name: "", email: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(val);
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <input
          onChange={(event) => setVal({ ...val, name: event.target.value })}
          type="text"
          placeholder="name"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => setVal({ ...val, email: event.target.value })}
        />
        <input type="submit" />
      </form>
    </>
  );
}
export default Form;
```


### React Hook Form (Library)

[React Hook Form](https://react-hook-form.com) is a **popular library** for building performant and flexible forms in React.

#### Why Use It?

- Reduces boilerplate code
- Built-in validation
- Integrates well with UI libraries like Material UI, Chakra UI, etc.

**Basic Example:**

```jsx
import { useForm } from "react-hook-form";

const { register, handleSubmit } = useForm();

const onSubmit = (data) => console.log(data);

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("username")} />
  <input type="submit" />
</form>
```

**Full Example**

```jsx
import React from "react";
import { useForm } from "react-hook-form";

function Form() {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <form action="" onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register("name")} type="text" placeholder="name" />
        <input {...register("age")} type="age" placeholder="age" />
        <input {...register("email")} type="email" placeholder="email" />
        <input type="submit" />
      </form>
    </>
  );
}

export default Form;
```


## Dynamic Routing in React.js

**Dynamic Routing** means that the routing is handled **at runtime** (not at compile time like in traditional HTML websites).

In **React.js**, dynamic routing is implemented using **React Router**, a library that enables navigation among views of various components.

Unlike traditional routing where routes are hardcoded in a file (like `routes.php`), React dynamically loads components based on the current URL.


**Installation of `react-router-dom`**

```jsx
npm install react-router-dom
```

### Core Components of React Router

- **`BrowserRouter`** – Wraps the app and enables routing.
- **`Routes`** – A container for all the `Route` components.
- **`Route`** – Defines the path and component to render.
- **`Link` / `NavLink`** – Used for navigation without reloading the page.
- **`useParams`** – Hook to access URL parameters (useful for dynamic routes).

### Basic Routing Setup

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import About from './About';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```


### What is Dynamic Routing?

Dynamic routing allows us to create routes where parts of the URL are **variables**, e.g., `/user/1`, `/user/2`, etc.

```jsx
<Route path="/user/:id" element={<UserProfile />} />
```

In this case, `:id` is a **route parameter**.

### Accessing Dynamic Parameters: `useParams`

- `useParams()` is a **React Router hook** used to **access dynamic parameters** from the current URL.
- It is most useful with **dynamic routes** like `/user/:id`, `/post/:slug`, etc.

```jsx
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}
```


### `useNavigate()` in React Router

- `useNavigate()` is a hook provided by `react-router-dom`.
- It is used to **programmatically navigate** to different routes (without clicking a `<Link>` or `<NavLink>`).
- It replaces the older `useHistory()` from React Router v5.

```jsx
const navigate = useNavigate();

function handleClick() {
  navigate("/about");
}
```

### 🔁 Navigate with Parameters

```jsx
navigate(`/user/${userId}`);
```

### ⏮️ Navigate Back or Forward

```jsx
navigate(-1); // Go back
navigate(1);  // Go forward
```

|Feature|Description|
|---|---|
|`navigate("/path")`|Navigate to a route|
|`navigate(-1)`|Go back|
|`navigate(1)`|Go forward|
|`{ replace: true }`|Replace history entry|
|`{ state: {...} }`|Pass data with navigation

### NavLink in React Router

`NavLink` is a special version of the `<Link>` component in `react-router-dom` that **adds styling attributes to the rendered element when it matches the current URL**.

It’s perfect when you want to highlight the active page in a navigation menu (e.g., changing the color or adding underline).


```jsx
<NavLink to="/home">Home</NavLink>
<NavLink to="/about">About</NavLink>
```


### Active Styling with `NavLink`

By default, `NavLink` applies an **`active`** class when the route matches.

You can also provide your own styles or class names based on the active state using:

**✅ className as a Function**

```jsx
<NavLink 
  to="/home"
  className={({ isActive }) => isActive ? "active-link" : "inactive-link"}
>
  Home
</NavLink>
```

**✅ `style` as a Function**

```jsx
<NavLink 
  to="/about"
  style={({ isActive }) => ({
    color: isActive ? "green" : "gray",
    textDecoration: isActive ? "underline" : "none"
  })}
>
  About
</NavLink>
```


### Example with Full NavBar

```jsx
import { NavLink } from "react-router-dom";
import "./styles.css"; // Assume you have .active-link class here

function Navbar() {
  return (
    <nav>
      <NavLink to="/" end className={({ isActive }) => isActive ? "active-link" : ""}>
        Home
      </NavLink>
      <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>
        About
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>
        Contact
      </NavLink>
    </nav>
  );
}
```

### Summary of `NavLink`

| Prop/Feature | Description                             |
| ------------ | --------------------------------------- |
| `to="/path"` | Target route                            |
| `className`  | Function that gives conditional class   |
| `style`      | Function that returns conditional style |
| `end`        | Ensures exact matching                  |
| `isActive`   | Boolean indicating current URL match    |

### `<Outlet />` in React Router


- `<Outlet />` is a **placeholder component** used to render **child routes** inside a **parent route**.
- It's like saying: “Here is where the nested component will appear.”

### ✅ How It Works

- Visiting `/dashboard/profile` will render:
    - `Dashboard` component
    - `Profile` component inside the `<Outlet />`
- Visiting `/dashboard/settings` will render:
    - `Dashboard` component
    - `Settings` component inside the `<Outlet />`


```jsx
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard Layout</h1>
      {/* Nested route component will be rendered here */}
      <Outlet />
    </div>
  );
}
```

## API Integration in React.js using AJAX (`fetch` / `axios`)


API integration in React lets your app communicate with backends, external services, or databases. AJAX (Asynchronous JavaScript and XML) is used to make asynchronous requests to APIs.

### 1. Using `fetch`

```jsx
useEffect(() => {
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.error(err));
}, []);

```

- `fetch()` returns a Promise.
- Must manually handle JSON parsing (`res.json()`).

### 2. Using `axios`

```jsx
npm install axios // install this package to use axios
```

```jsx
import axios from "axios";
import React from "react";

const App = () => {
  const api = "https://fakestoreapi.com/products";

  // 📥 Function to GET products from the API
  const getProducts = () => {
    axios
      .get(api)
      .then((res) => console.log("GET:", res))
      .catch((err) => console.error("GET Error:", err));
  };

  // 📤 Function to POST (add) a new product to the API
  const addProducts = () => {
    axios
      .post(api, {
        id: 0,
        title: "Sample Product",
        price: 0.1,
        description: "This is a test product.",
        category: "sample-category",
        image: "http://example.com/image.jpg",
      })
      .then((res) => console.log("POST:", res))
      .catch((err) => console.error("POST Error:", err));
  };

  return (
    <div className="p-5">
      {/* 🟢 Button to trigger GET request */}
      <button
        onClick={getProducts}
        className="px-3 py-2 m-2 bg-blue-500 rounded-lg text-white"
      >
        Get Data
      </button>

      {/* 🔵 Button to trigger POST request */}
      <button
        onClick={addProducts}
        className="px-3 py-2 m-2 bg-green-600 rounded-lg text-white"
      >
        Send Data
      </button>
    </div>
  );
};

export default App;
```


### Example (with async/await)

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.example.com/data');
      setData(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);
```

### React Component Lifecycle

The **component lifecycle** refers to the sequence of methods/functions that are invoked during the life of a React component, from its creation to its removal from the DOM.

#### 🧱 3 Main Phases:

#### 1. **Mounting**

Component is being created and inserted into the DOM.

- `constructor()` → (Class component only)
- `render()`
- `componentDidMount()` ✅ _(ideal for API calls, subscriptions)_
#### 2. **Updating**

When props or state change.

- `shouldComponentUpdate()` → (optional)
- `render()`
- `componentDidUpdate()` ✅ _(runs after update)_
#### 3. **Unmounting**

Component is removed from the DOM.

- `componentWillUnmount()` ✅ _(cleanup tasks: timers, subscriptions, etc.)_

#### Functional Components use `useEffect` for all of this!

- A **React Hook** for handling **side effects** (e.g. API calls, DOM updates, subscriptions).
- Runs **after the component renders**.


#### Basic Syntax

```jsx
useEffect(() => {
  // effect logic
  return () => {
    // optional cleanup
  };
}, [dependencies]);
```

#### Dependency Array

- `[]`: runs **once** after initial render (like `componentDidMount`)
- `[var]`: runs when `var` changes
- No array: runs **after every render**

Note: When we `[]` square bracket in useEffect() component only update the changed part and if we don't add square bracket component re-render means first it deleted and then again created.

#### 💡 Common Uses

- API calls
- Event listeners
- Timers
- Cleanups (return function)

#### Full Example

```jsx
useEffect(() => {
    console.log("About Component is Created");

return () => {
      console.log("About Comonent is Deleted");
};
```


#### Example: Cleanup (like `componentWillUnmount`)

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Running interval...");
  }, 1000);

  return () => {
    clearInterval(timer); // 🧹 cleanup
    console.log("Interval cleared");
  };
}, []);
```

### What is React Reconciliation

**React Reconciliation** is the process React uses to **update the DOM efficiently** when the state or props of a component change.

This makes updates **fast and efficient**, instead of redrawing the whole UI.

Note: 🔍 Think of reconciliation as React saying: "Okay, what exactly changed? Let me only update that part."

| Term             | What it Means                                                                                      | Triggered By                                       | Happens In          |
| ---------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------------------- |
| **Updating**     | When React detects a **change in props or state**.                                                 | `setState`, parent re-render, context change, etc. | Component lifecycle |
| **Re-rendering** | When the component’s **render method runs again** (or JSX is re-evaluated in function components). | After an update (or forced render)                 | Virtual DOM         |

```jsx
  const [val, setVal] = useState("This is Normal Data");
  const [val2, setVal2] = useState("This is Very Large Data");

  useEffect(() => {
    console.log("About Component is Created");

    return () => {
      console.log("About Comonent is Deleted");
    };
  }, [val2]); // component only re-render when val2 is changed otherwise it update only changed part.
```


## Axios for Session Management & Separation

### 1. Why Use a Separate Axios File?

- Centralizes config (base URL, headers, interceptors)
- Cleaner code, reusable instance
- Easy to maintain sessions (cookies, tokens)
- Can add error handlers globally

### 2. Basic Axios Setup (Separate File)

🗂️ File: `axiosInstance.js`

```jsx
import axios from "axios";

// Create an Axios instance
const instance = axios.create({
  baseURL: "https://fakestoreapi.com/",  // 🏠 Your backend URL
  withCredentials: true,                 // ✅ Important for session cookies
});

export default instance;
```


### 3. What `withCredentials: true` Does

- Allows Axios to send cookies and authentication headers
- Required when working with sessions (esp. JWT or Express sessions)
- Must also be enabled on backend (CORS settings)

### 4. Using It in Components

```jsx
import axios from "../axiosInstance";

const getProducts = async () => {
  try {
    const res = await axios.get("/products");
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};
```

| Concept           | Purpose                               |
| ----------------- | ------------------------------------- |
| `withCredentials` | Send cookies for session management   |
| `axios.create()`  | Reusable config for base URL, etc.    |
| `interceptors`    | Add headers (like auth) automatically |
| `instance.get()`  | Use anywhere like normal Axios        |

## ReactJS Context API

- A way to share data between components without passing props manually at every level.
- Solves **prop drilling** (passing data from parent to child repeatedly).

### When to Use Context API?

- When you need to share state across many components (e.g., theme, user authentication, language, etc.)
- Good for **global state management** in small to medium-sized apps.

### Key Components of Context API

1. `React.createContext()`

- Creates a context object.

```jsx
const MyContext = React.createContext();
```

2. `<Context.Provider>`

- Wraps components to provide the context value.

```jsx
<MyContext.Provider value={someData}>
  <ChildComponent />
</MyContext.Provider>
```

3. `useContext(Context)`

- A hook to access the context value in a functional component.

```jsx
const value = useContext(MyContext);
```

### Example: Basic Usage

```jsx
// 1. Create Context
const ThemeContext = React.createContext();

// 2. Create a Provider Component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. Use Context in a Child Component
const ThemeToggler = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
};

// 4. Wrap in App
const App = () => (
  <ThemeProvider>
    <ThemeToggler />
  </ThemeProvider>
);
```


## Redux Toolkit (RTK)


### What is Redux

Redux is a **state management library** used with JavaScript apps (especially React) to manage and share **application-wide state** in a predictable way.

### What is React-Redux?

React-Redux is the **official binding library** that allows React components to interact with the Redux store using hooks like:

- `useSelector()` – read state
- `useDispatch()` – send actions

It acts as a **bridge between Redux and React**.


### Why Redux Toolkit is Useful

- ✅ Reduces boilerplate code (less code, same result)
- ✅ Built-in support for async actions using `createAsyncThunk`
- ✅ Uses **Immer.js** internally so you can write mutable-style logic safely
- ✅ Easy and clean setup via `configureStore` and `createSlice`
- ✅ Encourages best practices by default


### Core Concepts

|Concept|Description|
|---|---|
|**Store**|Holds the global state|
|**Slice**|A piece of the store: includes state + reducers|
|**Action**|An object describing a change|
|**Reducer**|A function that updates state based on action|
|**Dispatch**|A way to send actions to the store|
|**Selector**|Reads state from the store|

### Redux Toolkit vs Context API

|Feature|Redux Toolkit|Context API|
|---|---|---|
|🧠 Purpose|Complex state management|Simple state sharing|
|🔁 Re-renders|Optimized with `useSelector()`|Causes **re-renders** of all consumers|
|🔌 DevTools|Built-in support for Redux DevTools|❌ No DevTools|
|🧵 Async Logic|Built-in with `createAsyncThunk`|Needs custom setup|
|📦 Scalability|Highly scalable (slices, modular code)|Not ideal for large apps|
|🔧 Boilerplate|Minimal with RTK|Less than raw Redux, but Context still has limitations|
|🔒 Predictability|More structured and strict|More flexible but can lead to mess|
#### Use Context API:

- For **theme**, **language**, **auth user** – simple state
#### Use Redux Toolkit:

- For **complex state logic**, **shared global data**, **multiple components**, **async logic**

### Redux Flow Diagram:

![JS Image](/posts/assets/react/redux.png)


### 📦 `Store` – Global State Container

- The **store** is where all the application state lives.
- It combines different reducers (e.g., `user`, `products`, `carts`) into one centralized global state.
- The store is created using `configureStore()` in Redux Toolkit.

---

### 🧩 `Reducers` – Handle State Changes

- Reducers are functions that decide how the state should change in response to actions.
- Each reducer manages its own **slice of state** (e.g., `user state`, `products state`, `carts state`).
- Redux Toolkit allows you to define reducers inside `createSlice()`.

---

### 🎯 `Action` – Event Trigger

- An **action** is a plain JavaScript object that describes **what happened**.
- Actions are sent from components using `dispatch()` and are automatically created via `createSlice()` in RTK.
- For example:  
    `{ type: "cart/addToCart", payload: { id: 1, name: "Product A" } }`

---

### 🧵 From `App.jsx` (Any Component)

- Any component (like `App.jsx` or its children) can:
    - **Read data** using `useSelector()` – it's **read-only**, **not mutable**.
    - **Send actions** using `useDispatch()` to update the global state.

### Installation and Usage
#### 1. Install Redux Toolkit and React-Redux

Add the Redux Toolkit and React-Redux packages to your project:

```jsx
npm install @reduxjs/toolkit react-redux
```

#### 2. Create a Redux Store

Create a file named `src/app/store.js`. Import the `configureStore` API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:

```jsx
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
```

#### 3. Provide the Redux Store to React

Once the store is created, we can make it available to our React components by putting a React-Redux `<Provider>` around our application in `src/index.js`. Import the Redux store we just created, put a `<Provider>` around your `<App>`, and pass the store as a prop:

```jsx
createRoot(document.getElementById("root")).render(
<Provider store={store}>
<App />
</Provider>
);
```

**Note:** Redux installed and below is example usage
#### 4. Create a Redux State Slice

```jsx
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```


#### 5. Add Slice Reducers to the Store

```jsx
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

#### 6. Use Redux State and Actions in React Components

```jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```



There is always room for improvement and continuous learning, but we'll end this note/article here. We've gained valuable knowledge about React. Congratulations!
