---
title: "Other Services"
draft: false
date: 2026-01-14
description: "AWS Certified Cloud Practitioner notes on Other Services"
categories:
  - tech
tags:
  - aws
  - cloud
  - certification
keywords:
  - AWS Certified Cloud Practitioner
  - Amazon WorkSpaces
  - Amazon AppStream
  - AWS IoT Core
  - AWS Step Functions
  - AWS Backup
  - AWS DataSync
  - disaster recovery strategies
  - cloud migration 7Rs
  - AWS Fault Injection Simulator
  - AWS Amplify
  - AWS Device Farm
Author: Ahmad Hassan
---


## Amazon WorkSpaces (Managed Desktop as a Service – DaaS)
---

### Definition

- **Amazon WorkSpaces** is a **fully managed Desktop-as-a-Service (DaaS)** offering from AWS.
- Allows users to **provision Windows or Linux virtual desktops** in the AWS Cloud.

### Purpose

- Replaces **on-premises Virtual Desktop Infrastructure (VDI)** solutions.
- Provides a **secure, scalable, and cost-effective** way to deliver desktop environments to users.

### Key Features

- **Managed DaaS:** AWS manages the infrastructure, storage, and desktop provisioning.
- **Platform Support:** Supports both **Windows and Linux** desktops.
- **Security:** Integrated with **AWS KMS** for encryption and can operate **within a VPC** for network isolation.
- **Pay-as-you-go Pricing:** Pay only for the desktops you use (hourly or monthly).
- **Remote Access:** Users can securely connect from anywhere (home, office, etc.) to their cloud desktop.

### Use Case Example

- A company wants to give employees **secure remote access** to corporate resources without managing physical laptops or VDI infrastructure.
- IT admins **provision WorkSpaces** for employees to access internal systems securely via the cloud.

### Performance and Latency

- **Minimize latency** by **deploying WorkSpaces in regions closest to end users.**
   - Example:
    - U.S. office → Deploy WorkSpaces in a U.S. region.
    - European office → Deploy WorkSpaces in a European region.
- **General Rule:** For any AWS application, deploy resources **close to users** to improve performance and reduce latency.

### Exam Tips

- If you see keywords like:
   - “**Managed desktop in the cloud**”
   - “**Virtual Desktop Infrastructure (VDI) replacement**”
   - “**Secure Windows/Linux desktops for remote users**”  
- Remember: **WorkSpaces = Managed Virtual Desktops in AWS Cloud**


## Amazon AppStream 2.0

### Definition

- **Amazon AppStream 2.0** is a **fully managed desktop application streaming service**.
- It allows users to **stream individual desktop applications** to any device through a **web browser**, without installing or managing infrastructure.

### Purpose

- Designed for **application delivery**, not full desktops.
- Lets users access software like **Blender, Eclipse, OpenOffice, Firefox**, etc., **directly in a browser**.
- Removes the need for **local installations** or **on-premises servers**.

### Key Features

- **Application-Focused:** Streams **specific apps**, not entire desktops.
- **Browser-Based Access:** Users access apps via any device with a **web browser**.
- **No Infrastructure Setup:** AWS handles scaling, maintenance, and provisioning.
- **Customizable Performance:** Configure **instance types per application** (e.g., more CPU/GPU for Photoshop or Blender).
- **Scalable and Secure:** Easily supports multiple users, securely managed through AWS.

### Comparison: AppStream 2.0 vs WorkSpaces

|Feature|**Amazon WorkSpaces**|**Amazon AppStream 2.0**|
|---|---|---|
|Type|Desktop-as-a-Service (DaaS)|Application Streaming Service|
|Purpose|Provides full Windows/Linux desktops|Streams single applications|
|Access|Via remote desktop client|Via web browser|
|Use Case|Virtual desktop for users|Delivering apps without local installs|
|Example|Full desktop for remote employees|Running Blender or Photoshop in browser|

### Use Case Example

- An organization wants employees or students to use **desktop applications remotely** (e.g., 3D modeling or coding tools) **without installing them locally**.
- They use **AppStream 2.0** to stream these applications through a web browser on any device.

### Exam Tips

- Keywords like **“stream applications,” “run desktop apps in a browser,” or “no full desktop environment”** point to **Amazon AppStream 2.0**.
- Remember:
   - **WorkSpaces = Full virtual desktop (VDI)**
   - **AppStream 2.0 = Application streaming to browsers**


## IoT Core Overview
---

- **AWS IoT Core** lets connected devices (sensors, appliances, etc.) communicate securely with AWS services.
- Supports **MQTT, HTTP, and WebSockets** for messaging.
- Enables **real-time data ingestion**, device management, and rule-based data routing.
- Example: Sending temperature data from IoT sensors to AWS Lambda or DynamoDB.

## Elastic Transcoder Overview
---

- **Amazon Elastic Transcoder** converts (transcodes) **media files from one format to another** for playback on various devices.
- Fully managed and scalable.
- Example: Convert uploaded videos in S3 to mobile-friendly MP4 versions.
- (Note: **AWS MediaConvert** is the modern replacement, but Elastic Transcoder still appears in CCP-level content.)

## AppSync
---

- **AWS AppSync** is a **managed GraphQL API service** that allows applications to **query and update data in real time** across multiple data sources (DynamoDB, Lambda, RDS, etc.).
- Automatically handles **data synchronization and offline access**.
- Example: A mobile app fetching user data through a single GraphQL endpoint.

## Amplify
---

- **AWS Amplify** helps developers **build, deploy, and host full-stack web and mobile applications** quickly.
- Integrates with backend services like **AppSync, Cognito, S3, and Lambda**.
- Example: Rapidly building a React web app with AWS backend resources automatically configured.

## AWS Infrastructure Composer
---

- **AWS Infrastructure Composer** is a **visual tool for designing and deploying AWS architectures** using drag-and-drop components.
- Generates **Infrastructure as Code (IaC)** templates (CloudFormation or CDK).
- Speeds up architecture prototyping and deployment.

## Device Farm Overview
---

- **AWS Device Farm** is an **app testing service** that lets you test Android, iOS, and web apps on **real physical devices** in the AWS Cloud.
- Identifies issues across devices and operating systems.
- Example: Automatically testing a mobile app on multiple phone models.

## AWS Backup Overview
---

- **AWS Backup** provides **centralized, automated backup management** across AWS services (EBS, RDS, DynamoDB, EFS, etc.).
- Supports backup policies, retention rules, and cross-region backup.
- Ensures **data protection and compliance**.

## Disaster Recovery Strategies
---


AWS defines several **Disaster Recovery (DR)** strategies, based on **cost vs recovery speed**:

|Strategy|Description|
|---|---|
|**Backup & Restore**|Store backups in AWS, restore when needed (low cost, high RTO).|
|**Pilot Light**|Minimal AWS environment always running; scale up during disaster.|
|**Warm Standby**|Partial production environment always running; scale up quickly.|
|**Multi-Site / Hot Standby**|Full duplicate environment in AWS running simultaneously (high cost, low RTO).|

## AWS Elastic Disaster Recovery (DRS)
---

- **AWS DRS** continuously replicates your on-premises or cloud-based servers to AWS for fast recovery.
- Enables quick failover to AWS during disasters.
- Replaces the older **AWS CloudEndure Disaster Recovery** service.

## AWS DataSync
---

- **AWS DataSync** automates **data transfer between on-premises storage and AWS** (or between AWS services).
- Uses **accelerated, secure, and scheduled transfers** for large datasets.
- Supports S3, EFS, FSx, and NFS/SMB sources.
- Example: Migrating on-premises file servers to S3.

## Cloud Migration Strategies – The 7Rs
---

Common strategies for migrating applications to AWS:

1. **Retire** – Decommission unused apps.
2. **Retain** – Keep apps on-premises.
3. **Rehost** – “Lift and shift” to AWS with minimal changes.
4. **Replatform** – “Lift, tinker, and shift” (small optimizations).
5. **Repurchase** – Move to SaaS alternatives (e.g., Salesforce).
6. **Refactor/Re-architect** – Redesign using cloud-native services.
7. **Relocate** – Move entire infrastructure (e.g., VMware) to AWS with minimal changes.

## Application Discovery Service & Application Migration Service
---

- **Application Discovery Service (ADS):** Collects on-premises system data (CPU, memory, dependencies) to plan migrations.
- **Application Migration Service (MGN):** Automates **“lift and shift”** migration of servers to AWS by replicating live servers.
- ADS = Assessment, MGN = Execution.

## AWS Migration Evaluator
---

- Provides **cost estimates and migration assessments** based on current on-premises workloads.
- Helps determine **TCO (Total Cost of Ownership)** and potential AWS savings.
- Often used before migration to justify business cases.

## AWS Fault Injection Simulator (FIS)
---

- **AWS FIS** is a **chaos engineering service** used to **test system resilience** by simulating real-world failures (e.g., instance crash, network latency).
- Helps identify weaknesses and improve reliability before production issues occur.

## Step Functions
---

- **AWS Step Functions** is a **workflow orchestration service** that coordinates multiple AWS services (like Lambda, ECS, SNS, etc.) into a sequence of steps.
- Uses **visual workflows** defined in **JSON-based state machines**.
- Example: Automating a process like uploading a file → processing it → storing results.

## Ground Station
---

- **AWS Ground Station** enables customers to **control satellites and process satellite data** directly in AWS.
- Removes the need to build and manage ground station infrastructure.
- Example: Satellite companies download imagery and analyze it using AWS analytics tools.

## AWS Pinpoint
---

- **AWS Pinpoint** is a **marketing and user engagement service** for sending targeted **emails, SMS, push notifications, and voice messages**.
- Helps analyze customer engagement and segment audiences.
- Example: Sending promotional emails to users who recently signed up.
