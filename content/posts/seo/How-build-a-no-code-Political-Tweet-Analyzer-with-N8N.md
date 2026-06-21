---
title: "How Build a No-Code Political Tweet Analyzer with N8N [Free Workflow]"
draft: false
date: 2026-06-21
description: "A practical guide to building a no-code political tweet analyzer using n8n automation. This tutorial shows how to collect tweets, analyze sentiment, and track political trends without writing any code. Perfect for beginners who want to create powerful AI-driven workflows using free tools and automation."
categories:
  - SEO
tags:
  - n8n
  - No-Code Automation
  - Tweet Analyzer
  - Political Analysis Tool
  - Social Media Analytics
  - AI Automation
  - Workflow Automation
  - Twitter Bot
  - Sentiment Analysis
  - Free Automation Workflow
  - No-Code AI
  - Data Analysis Tool
  - Political Tweets
  - n8n Tutorial
  - Automation Guide
keywords:
  - how to build tweet analyzer with n8n
  - no code political tweet analyzer
  - n8n workflow tutorial
  - twitter sentiment analysis automation
  - free n8n automation workflow
  - political tweet tracking tool
  - no code ai automation project
  - social media analytics with n8n
  - build twitter bot no code
  - n8n beginner tutorial
Author: Muhammad Ali Sajid
---



Tired of manually reading hundreds of Twitter comments to gauge public opinion? Whether you’re a marketer analyzing brand sentiment, a politician understanding your audience, or a researcher studying social trends, this process is tedious and time-consuming.

**What if you Could automate it all?**

Let's dive in.

---

## What We’re Building: The Automated Workflow:

Our workflow will perform a series of automated tasks:

1. **Accepts a Tweet URL** from you.
2. **Uses Apify** to scrape all the comments from that Tweet.
3. **Sends those comments** to a free AI model via OpenRouter.
4. **The AI analyzes** the sentiment and provides a narrative summary.
5. **The final report** is posted automatically into a Google Sheet.

## 1. Import the Free Workflow into N8n

First, you need to get the workflow into your N8n instance.

   1. **Create a New Workflow:** Log in to your [N8n](https://app.n8n.cloud/login) dashboard and click the “Create workflow” button.
   2. **Import the Code:**

   ```json
   {
  "name": "Twitter Tweet A
  nalyzer",
  "nodes": [
    {
      "parameters": {
        "formTitle": "Tweet Analyzer",
        "formFields": {
          "values": [
            {
              "fieldLabel": "Tweet URL",
              "placeholder": "https://x.com/username/status/1234567890",
              "requiredField": true
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.formTrigger",
      "typeVersion": 2.2,
      "position": [
        -480,
        100
      ],
      "id": "a7fa3440-aa5d-42aa-a3b4-417b3975a8aa",
      "name": "On form submission",
      "webhookId": "791ad1b4-eee4-4d00-97c6-5b0852c78ae2"
    },
    {
      "parameters": {
        "conditions": {
          "options": {
            "caseSensitive": true,
            "leftValue": "",
            "typeValidation": "strict",
            "version": 2
          },
          "conditions": [
            {
              "id": "21171dd5-e8d4-4264-8332-274b585dd8e2",
              "leftValue": "={{ $json['Tweet URL'] }}",
              "rightValue": "^https?:\\/\\/(www\\.)?(twitter|x)\\.com\\/.+\\/status\\/\\d+",
              "operator": {
                "type": "string",
                "operation": "regex"
              }
            }
          ],
          "combinator": "and"
        },
        "options": {}
      },
      "type": "n8n-nodes-base.if",
      "typeVersion": 2.2,
      "position": [
        -240,
        100
      ],
      "id": "f6dc641a-abe9-43c0-aac6-e68724b7784c",
      "name": "If"
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=You are a professional political and social media analyst who always responds in a specific JSON format.\n\nYour task is to analyze the following tweet replies and generate a structured, professional report.\n\nTweet Replies to Analyze:\n\n{{ $json.replyText }}\n\nInstructions for the Report Content:\nThe report should be written in Markdown and help the author understand how their message was received. Base all insights on the actual content and language used in the replies.\n\nThe Markdown report must follow this structure:\n\nExecutive Summary: A one-paragraph summary of the overall reception (sentiment, surprises, tone).\n\nSentiment Breakdown: Approximate percentages (positive/neutral/negative), characteristics of each group, and representative examples.\n\nNarrative Analysis: 3–5 recurring narratives, each with a description, quotes, and a note on whether it's organic or strategic.\n\nInfluential or Viral Replies: 3–5 standout replies with an explanation of their impact.\n\nAudience Insight: Analysis of audience expectations, misunderstandings, and perceptions.\n\nStrategic Observations: Suggestions for improvement, timing factors, and signals of pushback.\n\nFinal Output Format:\nYour entire response MUST be a single, valid JSON object. Do not include any text before or after the JSON. The JSON object must have a single key named report_text, where the value is the complete Markdown report you generated.\n\nEXAMPLE OF THE REQUIRED OUTPUT STRUCTURE:\n\n\n{\n  \"report_text\": \"# Full Sentiment & Narrative Report\\n\\n## 1. Executive Summary\\nOverall, the tweet received a polarized response, with strong support from one segment of the audience and significant criticism from another. The tone was largely passionate, with very few neutral replies.\\n\\n## 2. Sentiment Breakdown\\n- **Positive: 45%** - Supporters focused on the policy's benefits, using words like \\\"commonsense\\\" and \\\"necessary.\\\"\\n- **Negative: 55%** - Critics raised concerns about unintended consequences and government overreach.\"\n}",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.9,
      "position": [
        780,
        0
      ],
      "id": "c7b57c7b-1e5a-4aae-bff4-0c5787daf0c0",
      "name": "AI Agent"
    },
    {
      "parameters": {
        "jsCode": "// Get the JSON string from the AI output and parse it into a real object.\nconst parsedData = JSON.parse($input.first().json.output);\n\n// Now, access the 'report_text' key from the parsed object.\nconst fullReport = parsedData.report_text;\n\n// Check if the report text exists.\nif (!fullReport) {\n  throw new Error(\"The key 'report_text' was not found in the AI's JSON output after parsing. Please ensure the AI prompt correctly instructs the model to use this key.\");\n}\n\n// --- Helper function to extract content for a specific section ---\n// This robust function remains the same.\nfunction extractSection(text, title) {\n  // Use a case-insensitive regex that handles various markdown headings (##, ###) and optional numbering.\n  const regex = new RegExp(\n    `^##+\\\\s*(?:\\\\d+\\\\.\\\\s*)?${title}\\\\s*\\\\n([\\\\s\\\\S]*?)(?=^##+|$)`,\n    'gmi'\n  );\n  const match = regex.exec(text);\n  return match ? match[1].trim() : `Section \"${title}\" not found`;\n}\n\n// --- Define the sections you want to extract ---\nconst executiveSummary = extractSection(fullReport, 'Executive Summary');\nconst sentimentBreakdown = extractSection(fullReport, 'Sentiment Breakdown');\nconst narrativeAnalysis = extractSection(fullReport, 'Narrative Analysis');\nconst influentialReplies = extractSection(fullReport, 'Influential or Viral Replies');\nconst audienceInsight = extractSection(fullReport, 'Audience Insight');\nconst strategicObservations = extractSection(fullReport, 'Strategic Observations');\n\n// --- Return the data ---\nreturn {\n  executiveSummary,\n  sentimentBreakdown,\n  narrativeAnalysis,\n  influentialReplies,\n  audienceInsight,\n  strategicObservations\n};"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        1140,
        0
      ],
      "id": "78e50b0d-db3d-409b-a2cf-cd10cd202304",
      "name": "Code2"
    },
    {
      "parameters": {
        "operation": "appendOrUpdate",
        "documentId": {
          "__rl": true,
          "value": "11mUAWW8fkQVfNSHT68IytC0Slw-DRbeLhdn8Ztvyg5k",
          "mode": "list",
          "cachedResultName": "Tweet Analyzer",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/11mUAWW8fkQVfNSHT68IytC0Slw-DRbeLhdn8Ztvyg5k/edit?usp=drivesdk"
        },
        "sheetName": {
          "__rl": true,
          "value": "gid=0",
          "mode": "list",
          "cachedResultName": "Sheet1",
          "cachedResultUrl": "https://docs.google.com/spreadsheets/d/11mUAWW8fkQVfNSHT68IytC0Slw-DRbeLhdn8Ztvyg5k/edit#gid=0"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "Executive Summary": "={{ $json.executiveSummary }}",
            "Sentiment Breakdown": "={{ $json.sentimentBreakdown }}",
            "Narrative Analysis": "={{ $json.narrativeAnalysis }}",
            "Influential Replies": "={{ $json.influentialReplies }}",
            "Audience Insight": "={{ $json.audienceInsight }}",
            "Strategic Observations": "={{ $json.strategicObservations }}",
            "Tweet URL": "={{ $('On form submission').item.json['Tweet URL'] }}"
          },
          "matchingColumns": [
            "Tweet URL"
          ],
          "schema": [
            {
              "id": "Tweet URL",
              "displayName": "Tweet URL",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "Executive Summary",
              "displayName": "Executive Summary",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Sentiment Breakdown",
              "displayName": "Sentiment Breakdown",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Narrative Analysis",
              "displayName": "Narrative Analysis",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Influential Replies",
              "displayName": "Influential Replies",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Audience Insight",
              "displayName": "Audience Insight",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "Strategic Observations",
              "displayName": "Strategic Observations",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4.5,
      "position": [
        1400,
        0
      ],
      "id": "9644be77-2708-4867-ae12-910258cd92e0",
      "name": "Google Sheets"
    },
    {
      "parameters": {
        "operation": "completion",
        "respondWith": "showText",
        "responseText": "Incorrect tweet URL, please re-run the workflow"
      },
      "type": "n8n-nodes-base.form",
      "typeVersion": 1,
      "position": [
        80,
        280
      ],
      "id": "38fd5a3d-1e1e-4c49-b6a6-bdf97983bf47",
      "name": "Incorrect Form URL",
      "webhookId": "7c8d5f22-ee5d-4f2b-8952-90037207ac41"
    },
    {
      "parameters": {
        "operation": "completion",
        "completionTitle": "Tweet Processing",
        "options": {}
      },
      "type": "n8n-nodes-base.form",
      "typeVersion": 1,
      "position": [
        0,
        0
      ],
      "id": "5f3ffb31-8cf6-4a46-a342-7ec3a48cd099",
      "name": "Successful Form Submission",
      "webhookId": "9e9ff477-7710-43fe-a4a9-fab2ddf34b3a"
    },
    {
      "parameters": {
        "method": "POST",
        "url": "APIFY URL",
        "sendBody": true,
        "specifyBody": "json",
        "jsonBody": "={\n    \"includeNestedReplies\": false,\n    \"postUrls\": [\n        \"{{ $json['Tweet URL'] }}\"\n    ],\n    \"resultsLimit\": 5\n}",
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        280,
        0
      ],
      "id": "d83c0630-8d3f-457a-bf50-cf41298de0c6",
      "name": "HTTP Request1"
    },
    {
      "parameters": {
        "fieldsToAggregate": {
          "fieldToAggregate": [
            {
              "fieldToAggregate": "replyText"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [
        520,
        0
      ],
      "id": "bb6ec4ba-954e-4cfe-bf42-ef7bd7632f65",
      "name": "Aggregate"
    },
    {
      "parameters": {
        "model": "deepseek/deepseek-r1:free",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter",
      "typeVersion": 1,
      "position": [
        680,
        300
      ],
      "id": "fb99e727-f3af-4f5b-9541-73008caeb329",
      "name": "OpenRouter Chat Model"
    }
  ],
  "pinData": {},
  "connections": {
    "On form submission": {
      "main": [
        [
          {
            "node": "If",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "If": {
      "main": [
        [
          {
            "node": "Successful Form Submission",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Incorrect Form URL",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "AI Agent": {
      "main": [
        [
          {
            "node": "Code2",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Code2": {
      "main": [
        [
          {
            "node": "Google Sheets",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Successful Form Submission": {
      "main": [
        [
          {
            "node": "HTTP Request1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "HTTP Request1": {
      "main": [
        [
          {
            "node": "Aggregate",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Aggregate": {
      "main": [
        [
          {
            "node": "AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "OpenRouter Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    }
  },
  "active": false,
  "settings": {
    "executionOrder": "v1"
  },
  "versionId": "6aa4f295-a9b8-4f6c-97c2-705b49ec4c46",
  "meta": {
    "instanceId": "bf63e2f51dbc3f9b426b65f04f21e6baece93c635479343f7aa1d53bce881f40"
  },
  "id": "tIVoDRAsAfDr3LAF",
  "tags": []
}
```

3. **Copy and Paste:**

Open the JSON file, copy all the code, return to your blank N8n workflow, and press Ctrl+V (Windows) or Cmd+V (Mac) to paste it. The complete workflow with all its nodes will appear.


## 2. Set Up the Apify Twitter Scraper

The next node is the Apify Node, which is responsible for scraping the Tweet comments. We need to configure its API endpoint.

1. **Sign Up for Apify:** 
   - Go to [Apify.com](https://apify.com/) and sign up for a free account. You’ll get $5 in free credit, which is more than enough to get started with this project.
2. **Find the Correct API URL:**
   - Once logged in, go to the **Integrations** section in your account. Scroll down and find the API endpoint called **“Run actor synchronously and get dataset items”.** Click the copy icon to copy the URL.
3. **Configure the Node in N8n:**
   - Back in your N8n workflow, click on the **Apify Node.** In the parameters, find the **“Resource”** field and paste the URL you just copied into it.

---

## 3. Configure the AI with OpenRouter:

We’ll use OpenRouter to access powerful AI models without paying for expensive API credits.

1. **Create an OpenRouter Account**
   - Visit [OpenRouter.ai](https://openrouter.ai/) and sign up. It’s quick and you can use your Google account.
   - Allows integration with systems like **Active Directory, Google Workspace, or SAML providers**.
2. **Generate an API Key:**
   - After logging in, navigate to your **“Keys”** section. Click on **“Create new key”** and generate a new API key. Copy this key.
3. **Connect OpenRouter to N8n:**
   - In your N8n workflow, click on the “AI Agent” node (or similar node handling the AI call). Click on “Credentials” and then “Create New”.
4. **Select OpenRouter:**
   - Choose OpenRouter from the list of providers and paste your API key into the designated field. Save the credentials.

**Pro Tip:** The workflow is pre-configured to use deepseek/deepseek-chat, a capable and cost-effective model available on OpenRouter.

## 4. Connect Your Google Sheets

To receive the final analysis, we need to connect N8n to Google Sheets.

1. **Create a New Google Sheet:**
   - Create a blank Google Sheet in your Drive. Note its name.
2. **Set Up Google Sheets Credentials in N8n:**
   - N8n needs permission to write to your Sheet.
3. **Configure the Google Sheets Node:**
   - Click on the Google Sheets node in your workflow. Select your pre-configured Google account credentials. Then, specify the name of your Sheet and the specific range (e.g., Sheet1!A:A) where you want the data to be written.

## 5. Run Your Automated Analysis!

You’re all set! Let’s test the workflow.

1. **Click “Test Workflow”:**
   - In N8n, click the **“Execute Workflow”** button. This will trigger the initial **Form Node.**
2. **Paste a Tweet URL:**
   - A window will pop up asking for a Tweet URL. Find a Tweet you want to analyze, copy its URL, and paste it into the field. Click **“Submit”**.
3. **Watch the Magic Happen:** 
   - The workflow will now run automatically:
      - The Apify node will scrape the comments.
      - The AI node will process them and generate its analysis.
      - The results will be sent to your Google Sheet.

### Note on Limits:

   - By default, the Apify scraper is set to extract only **5 comments** for demonstration purposes (to save time and credits). To analyze more, simply click on the Apify node, find the resultsLimit parameter in the JSON, and change 5 to 100 or any number you prefer.

---

## Conclusion and Next Steps:

Congratulations! You’ve just built a powerful automation that turns social media chatter into actionable data. This is just the beginning—you can modify this workflow to analyze comments from YouTube, Reddit, or news articles.

### Need a Custom Automation?

If you have a repetitive task that’s eating up your time, let us automate it for you. We build custom workflows for cold emailing, lead generation, data processing, and much more [Contact Us](/contact/)

[Apify Scrapper]( https://apify.com/scraper_one/x-post-replies-scraper)