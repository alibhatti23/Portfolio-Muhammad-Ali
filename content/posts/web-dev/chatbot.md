---
title: Build an AI Chatbot Web App with Google Gemini and Deploy on Vercel
draft: false
date: 2025-04-19
description: Learn how to build an AI chatbot web app using Google Gemini and deploy it on Vercel.
categories:
  - tech
  - web
tags:
  - tech
  - web
  - AI
keywords:
  - AI chatbot tutorial
  - Google Gemini chatbot
  - build chatbot with Gemini
  - deploy chatbot on Vercel
  - AssistantUI framework
  - Next.js AI chatbot
  - Vercel deployment guide
  - AI web app tutorial
Author: Ahmad Hassan
---

![Thumbnail Image](/posts/assets/tech/chatbot.webp)

In this article, we’ll walk through the complete process of building an AI chatbot web app powered by Google Gemini and deploying it to the web using Vercel. We’ll use AssistantUI, a modern framework to create conversational experiences using powerful LLMs.

## Step 1: Install the Prerequisites

Before we begin, make sure the following tools are installed on your machine:

1. Install Visual Studio Code ([VS Code](https://code.visualstudio.com)).
2. Install Node.js ([Node.js](https://nodejs.org/en/download/)).
3. Install Git ([Git](https://git-scm.com/downloads)).

## Step 2: Set Up the Project Directory

Create a folder named chatbot:

```bash
mkdir chatbot && cd chatbot
```

Open the folder in VS 

```bash 
code .
```

## Step 3: Scaffold the Assistant UI App 

```bash 
npx assistant-ui@latest create
```

This command will prompt you to select a template. Choose the `chat` template. This will create a new folder named `assistant-ui` with the necessary files and dependencies.

## Step 4: Set Up Dependencies 

Move into the generated project folder (likely chatbot):

```bash
cd chatbot
```

Install the required SDKs:

```bash
npm install ai @assistant-ui/react-ai-sdk @ai-sdk/google
```

## Step 5: Integrate Google Gemini API

Open the file:

```bash
/app/api/chat/route.ts
```

Clear all content in the file and paste the following code:

```typescript
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages,
  });
  return result.toDataStreamResponse();
}
```

Get your Google Gemini API Key from the [Google AI Studio](https://aistudio.google.com/).

## Step 6: Store Your API Key

Create a new environment file in the root directory:

```bash
.env.local
```

Add the following line:

```bash
GOOGLE_GENERATIVE_AI_API_KEY="Your_API_KEY"
```

Make sure to replace `Your_API_KEY` with your actual API key.

## Step 7: Run the Development Server

Start your app locally:

```bash
npm run dev
```

Your application will be live at:

```bash
http://localhost:3000
```

## Step 8: Build for Production

 Build your app for production:

```bash
npm run build
```

This command will create a `.vercel` folder in your project directory.

*Clean up:* Delete the node_modules folder and .env.local file before uploading to GitHub for security reasons.

## Step 9: Upload your code to GitHub

1. Create a new repository on GitHub.
2. Initialize a new Git repository in your project folder:

```bash
git init
```

3. Add your files to the repository:

```bash
git add .
```

4. Commit your changes:

```bash
git commit -m "Initial commit"
```

5. Add the remote repository:

```bash
git remote add origin https://github.com/<username>/chatbot.git
```

6. Push your changes:

```bash
git push -u origin main
```

## Step 10: Deploy to vercel

1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click on the "New Project" button.
3. Select your GitHub repository.
4. Vercel will automatically detect the framework and set up the build settings.

 When prompted, add your API key as an environment variable:

```bash
GOOGLE_GENERATIVE_AI_API_KEY = your_key_here
```

## Step 11: Your AI Chatbot is Live!

Once the deployment is complete, you will receive a live URL for your chatbot. You can share this URL with anyone to access your AI chatbot.

## Final Notes

- Make sure to keep your API key secure and do not expose it in your public repositories.
- This setup gives you a solid starting point to create intelligent AI interfaces.
- You can now customize the UI, add more features, or even connect this to a backend for storing user interactions.

