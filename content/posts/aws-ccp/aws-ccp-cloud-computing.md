---
title: "Cloud Computing"
draft: false
date: 2026-01-31
description: "AWS Certified Cloud Practitioner notes on Cloud Computing"
categories:
  - tech
tags:
  - aws
  - cloud
  - certification
keywords:
  - AWS Certified Cloud Practitioner
  - cloud computing basics
  - IaaS PaaS SaaS
  - AWS global infrastructure
  - availability zones
  - AWS regions
  - shared responsibility model
  - IAM identity and access management
  - pay-as-you-go pricing
  - traditional IT vs cloud
Author: Ahmad Hassan
---

## Traditional IT
---

### Introduction
- This section is **theory-based**, no hands-on.
- Goal: understand the **basics of traditional IT infrastructure** to see why cloud computing is valuable.

### How Websites Work
- **Server**: A machine hosted somewhere, storing website files and application code.
- **Client (Web Browser)**: Requests data from the server.
- **Network**: Connects the client to the server, routes data packets back and forth.
- **Process**:
   1. Client sends request over the network.
   2. Server processes the request.
   3. Server sends back a response.
   4. Client displays the website.


![Client-server model showing request and response flow over network](/posts/assets/aws/img.webp)

### Traditional IT Setup
- Companies used to **buy and manage their own physical servers**.
- Requirements included:
   - **Hardware** (servers, storage, networking gear).
   - **Data centers** (power, cooling, security, physical space).
   - **IT staff** (system admins, network engineers).
- Servers often **over-provisioned** to handle peak traffic but underutilized most of the time.
- Scaling required **purchasing more servers**, which was slow and costly.

![Traditional IT infrastructure with physical servers in a data center](/posts/assets/aws/img-1.webp)

### Challenges of Traditional IT
- **High upfront costs** (CAPEX).
- **Long procurement cycles** for new hardware.
- **Scalability issues** (hard to match demand spikes).
- **Maintenance burden**:
   - Hardware failures.
   - Security updates.
   - Network management.
- Difficult for small/medium businesses to compete with large enterprises.

### Transition to Cloud
- Cloud provides **on-demand IT resources** without upfront investments.
- Companies rent computing, storage, and networking resources instead of owning hardware.
- This shift from **CAPEX → OPEX** (capital expenses → operational expenses) is a key advantage.

**Takeaway**: Cloud computing solves the **cost, scalability, and maintenance problems** of traditional IT by providing resources on-demand with pay-as-you-go pricing.



## Cloud Computing
---

### Definition of Cloud Computing

- **Cloud computing** = On-demand delivery of:
   - Compute power
   - Database storage
   - Applications
   - Other IT resources
- **Key principle**: **On-demand** (you get it when you need it).
- **Pricing model**: **Pay-as-you-go** (only pay for what you use).

### Key Features

- **Right size, right time**:
   - Choose small, large, or multiple servers instantly.
   - Scale up or down (10 servers today, 2 tomorrow).
- **Instant access**:
   - No need to wait hours or days for provisioning.
   - Servers/resources available **within seconds**.
- **User-friendly interfaces**:
 - Web console, APIs, or CLI to manage servers, storage, and apps.

### Cloud Providers’ Role

- AWS (and others) **own and maintain physical hardware**.
- You provision and use resources **via the cloud platform**.
- Example: AWS provides the infrastructure, you just use it through the console/API.

### Examples of Cloud Services (Everyday Use)

- **Gmail**: Cloud email service (pay only for storage used).
- **Dropbox, Google Drive, iCloud**: Cloud storage services.
- **Netflix**: Entirely built on AWS, delivering video-on-demand globally.
- Point: You may already use cloud services daily, often without realizing it.

### Types of Cloud

1. **Private Cloud**
   - Exclusive to one organization.
   - More control, security, and compliance.
   - Example: Rackspace private cloud.
   - Out of scope for exam, but important concept.
1. **Public Cloud**
   - Owned and operated by 3rd party providers.
   - Accessible over the internet.
   - Main providers: **AWS, Microsoft Azure, Google Cloud**.
   - Focus of this course.
1. **Hybrid Cloud**
   - Mix of **on-premises infrastructure** and **public cloud**.
   - Keep sensitive workloads locally, extend other workloads to AWS.
   - Combines **control + flexibility + cost effectiveness**.


### Five Characteristics of Cloud Computing (important for exam)

1. **On-demand self-service**: Provision resources without human intervention.
2. **Broad network access**: Accessible from anywhere via internet.
3. **Multi-tenancy & resource pooling**: Shared infrastructure, secure isolation for each customer.
4. **Rapid elasticity and scalability**: Scale up/down automatically based on demand.
5. **Measured service**: Pay only for what you use, usage is tracked.

### Six Advantages of Cloud Computing

1. **Trade CAPEX for OPEX**
   - No upfront hardware purchase.
   - Rent resources, reducing TCO (Total Cost of Ownership).
1. **Benefit from economies of scale**
   - AWS serves millions of customers.
   - Costs decrease as AWS optimizes and grows.
1. **Stop guessing capacity**
   - No need to buy servers in advance.
   - Scale automatically with demand.
1. **Increased speed and agility**
  - Launch resources in minutes.
  - Experiment and innovate faster.
1. **Eliminate running data centers**
  - No more costs for power, cooling, physical space.
  - Small teams can launch global apps quickly.
1. **Go global in minutes**
  - Leverage AWS worldwide infrastructure.
  - High availability and fault tolerance built in.


## Types of Cloud Computing & Pricing Fundamentals
---

### Cloud Computing Models

There are **three main service models** to understand:

#### a) Infrastructure as a Service (IaaS)
- Provides the **building blocks** of cloud IT.
- Includes **networking, compute, and storage** in raw form.
- High flexibility, similar to **LEGO blocks**.
- Easy to migrate from traditional on-premises IT.
- **Examples**:
   - AWS: **EC2**
   - Others: Google Cloud, Azure, DigitalOcean, Linode, Rackspace

#### b) Platform as a Service (PaaS)
- Removes the need to manage underlying infrastructure.
- You focus only on **deploying and managing applications**.
- Everything below runtime is managed by provider.
- **Examples**:
   - AWS: **Elastic Beanstalk**
   - Others: Heroku, Google App Engine, Azure App Services

#### c) Software as a Service (SaaS)
- Complete product run and managed by the provider.
- You just use the application, no infrastructure or platform management.
- **Examples**:
   - AWS: Rekognition (ML as a service)
   - Others: Gmail, Dropbox, Zoom

### Comparison with On-Premises

- **On-Premises**: You manage everything (apps, data, runtime, OS, hardware, networking).
- **IaaS**: You manage apps, data, runtime, OS. Provider manages virtualization, servers, storage, networking.
- **PaaS**: You manage only apps and data. Provider manages everything else.
- **SaaS**: Provider manages everything.


![Cloud service models comparison showing IaaS, PaaS, SaaS vs on-premises responsibilities](/posts/assets/aws/img-2.webp)


### AWS Pricing Fundamentals

AWS follows a **pay-as-you-go** model with 3 key principles:

1. **Compute** → Pay for the **exact compute time** used.
2. **Storage** → Pay for the **exact amount of data stored**.
3. **Networking** → Pay only when data **leaves the cloud**.
   - Data **into AWS is free**.

## AWS Cloud
---

### History of AWS

- **2002**: AWS launched internally at Amazon.
   - Idea: externalize Amazon’s IT infrastructure to help others.
- **2004**: First public service released → **Amazon SQS (Simple Queue Service)**.
- **2006**: Relaunch with three core services:
   - **SQS** (messaging)
   - **S3** (Simple Storage Service)
   - **EC2** (Elastic Compute Cloud)


### Global Expansion

- Initially available only in the **US**.
- Expanded to **Europe**, then worldwide.
- Today AWS has **multiple regions and availability zones** across the glob

### Adoption by Companies

- Many well-known companies run on AWS:
   - **Dropbox**
   - **Netflix**
   - **Airbnb**
   - **NASA**


### AWS Scale & Market Position

- AWS is the **largest cloud provider** worldwide.
- Huge growth due to:
   - Wide service portfolio.
   - Global infrastructure.
   - Reliability and scalability.

![AWS market share and cloud provider growth comparison chart](/posts/assets/aws/img-3.webp)

### AWS Global Infrastructure

- AWS Regions
- AWS Availability Zones
- AWS Data Centers
- AWS Edge Locations, Points of Presence


![AWS global infrastructure hierarchy showing Regions, Availability Zones, and Edge Locations](/posts/assets/aws/img-4.webp)


### How to choose an AWS Region?
 
- **Compliance** with data governance and legal requirements: data never leaves a region without your explicit permission
- **Proximity** to customers: reduced latency
- **Available** services within a Region: new services and new features aren’t available in every Region
- **Pricing**: pricing varies region to region and is transparent in the service pricing page


### AWS Availability Zones

- Each region has many availability **zones** (usually 3, min is 3, max is 6). Example:
  - ap-southeast-2a
  - ap-southeast-2b
  - ap-southeast-2c
- Each availability zone (AZ) is one or more discrete data centers with **redundant power**, **networking**, and **connectivity**
- They’re separate from each other, so that they’re isolated from disasters
- They’re connected with **high bandwidth**, **ultra-low latency networking**.


![AWS Availability Zones with isolated data centers connected by low-latency networking](/posts/assets/aws/img-5.webp)


### AWS Points of Presence (Edge Locations)

**AWS Points of Presence (PoPs)** are global edge locations hosting services like Amazon CloudFront, Route 53, and Global Accelerator to deliver content with low latency. They are strategically placed in major cities to cache and route data, enhancing performance and availability.

- Amazon has 400+ Points of Presence (400+ Edge Locations & 10+ Regional Caches) in 90+ cities across 40+ countries
- Content is delivered to end users with lower latency

![AWS Points of Presence and Edge Locations global map](/posts/assets/aws/img-6.webp)


## Shared Responsibility Model & Acceptable Use Policy
---

### Shared Responsibility Model

- Defines **who is responsible for what** in AWS cloud security.
- **Customer’s Responsibility (Security _in_ the Cloud):**
   - Data protection and classification.
   - Application security.
   - Operating system patches and updates.
   - Network and firewall configurations.
   - Correct configuration of services.
- **AWS’s Responsibility (Security _of_ the Cloud):**
   - Physical infrastructure (hardware, data centers).
   - Global network and storage.
   - Virtualization layer.
   - Their own software and internal security.

![AWS Shared Responsibility Model diagram showing customer vs AWS responsibilities](/posts/assets/aws/img-7.webp)


---

### Acceptable Use Policy

When using AWS, you agree not to:
- Use for **illegal, harmful, or offensive activities**.
- Perform **security violations** (hacking, unauthorized access).
- **Abuse networks** (e.g., DDoS attacks).
- **Abuse email/messaging** (spam, phishing).


## IAM (Identity and Access Management)
---

### What is IAM?

- **IAM = Identity and Access Management**.
- A **global service** in AWS (not region-specific).
- Used to manage **users, groups, and permissions**.

### Root User

- Created by default when you make an AWS account.
- Has **full access** to everything.
- Should only be used for **initial setup**, not daily tasks.
- Best practice: never share or use root account for normal work.
