

# y!on8 Platform Overview

`y!on8` (formerly known as TaskPilot, and pronounced “yes, on it”) is a unified, modular, cloud-native platform designed to simplify and automate internal workflows across organizations. It enables teams to manage resource access, content requests, approvals, and operational tasks through scalable, role-based tools—all within a secure and centralized environment.

Each application within y!on8 is built and deployed as an independent microservice, allowing for enhanced scalability, maintainability, and flexibility. The platform integrates seamlessly using a shared frontend UI (EJS), connects to cloud-hosted MongoDB databases, and is deployed using Docker and Kubernetes—making it ideal for small to medium enterprises (SMEs) as well as growing teams.

Whether it’s submitting a content development request, requesting access to enterprise tools, or managing IT asset handovers, y!on8 provides a tailored suite of apps that align with real-world business processes and internal control standards.

---

## 🧩 Microservices Within y!on8

Each microservice has:
- Its own Node.js + Express backend
- A dedicated MongoDB Atlas database
- Independent deployment with Docker and Kubernetes
- Secrets and configuration managed via Kubernetes Secrets & ConfigMaps

| Microservice | Description |
|--------------|-------------|
| **Access Manager** | Allows users to request internal tool access, with approval workflow and admin controls. |
| **Training Request Manager** | Handles employee training/course requests and supervisor approval tracking. |
| **Content Request Development Manager** | Enables departments to request learning, media, or marketing content. |
| **Asset & Equipment Manager** | Manages IT asset checkout requests like laptops, monitors, etc. |
| **Software License Manager** | Tracks and handles requests for software licenses and renewals. |

---

# **y!on8** Content Development Request Manager

The **y!on8 Content Development Request Manager** is a core module within the **y!on8** platform.  
It enables employees to submit, track, and manage requests related to content creation — including instructional videos, eLearning materials, written content, and internal communication assets.

This application supports modular content workflows by allowing users to:
- Submit new content requests with auto-generated tracking IDs
- Assign requests to specific content creators or departments
- Track status updates (e.g., Outstanding, In Progress, Completed)
- Manage approvals and maintain transparent communication across teams

The module is built with a microservices mindset and deployed independently using Docker and Kubernetes. It leverages the shared UI layer of the y!on8 platform and stores all request data in MongoDB Atlas, with secure user authentication and access-level-based controls.

## 🎯 Ideal Use Case

This tool is ideal for:
- L&D teams requesting instructional materials
- HR teams submitting onboarding or compliance content
- Managers needing internal training resources
- Any department involved in recurring content creation

## 📋 Features
- User Authentication (Login/Logout)
- Access Control based on user level
- Submit Tool Access Requests
- Add Users and Add Tools (Level 3+ only)
- Dockerized Application
- Full Kubernetes Deployment with:
  - Deployment
  - Service
  - ConfigMap
  - Secret
  - Horizontal Pod Autoscaler (HPA)

---

## 📦 Project Structure - y!onit Content Development Request Manager

```
taskpilot
├─ app
│  ├─ controllers
│  │  ├─ adminController.js
│  │  ├─ authController.js
│  │  ├─ homeController.js
│  │  └─ manageUsersController.js
│  ├─ middlewares
│  │  ├─ accessControl.js
│  │  └─ uploadMiddleware.js
│  ├─ models
│  │  ├─ Department.js
│  │  └─ User.js
│  ├─ modules
│  │  ├─ cloudContent
│  │  │  ├─ controllers
│  │  │  │  ├─ allRequestsController.js
│  │  │  │  ├─ contentController.js
│  │  │  │  ├─ mainContentController.js
│  │  │  │  └─ myRequestsController.js
│  │  │  ├─ middlewares
│  │  │  │  └─ accessControl.js
│  │  │  ├─ models
│  │  │  │  ├─ ContentRequest.js
│  │  │  │  └─ RequestType.js
│  │  │  ├─ routes
│  │  │  │  ├─ allRequests.js
│  │  │  │  ├─ content.js
│  │  │  │  ├─ mainContent.js
│  │  │  │  └─ myRequests.js
│  │  │  └─ views
│  │  └─ toolsAccess
│  │     ├─ controllers
│  │     ├─ models
│  │     ├─ routes
│  │     └─ views
│  └─ routes
│     ├─ admin.js
│     ├─ auth.js
│     ├─ home.js
│     ├─ manageUsers.js
│     └─ secureDownload.js
├─ app.js
├─ config
│  └─ db.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css
│  │  ├─ styles.css
│  │  └─ views.css
│  ├─ img
│  │  ├─ access.svg
│  │  ├─ admin.svg
│  │  ├─ bg-1.jpg
│  │  ├─ bg-2.jpg
│  │  ├─ cm.svg
│  │  ├─ content-2.svg
│  │  ├─ content.svg
│  │  ├─ cube.svg
│  │  └─ logo.svg
│  └─ js
│     └─ scripts.js
├─ seedDepartments.js
├─ seedTools.js
└─ views
   ├─ admin
   │  ├─ admin.ejs
   │  ├─ editUser.ejs
   │  └─ manageUsers.ejs
   ├─ auth
   │  ├─ login.ejs
   │  └─ register.ejs
   ├─ cloudContent
   │  ├─ allRequests.ejs
   │  ├─ contentForm.ejs
   │  ├─ mainContentPage.ejs
   │  ├─ myRequests.ejs
   │  └─ updateRequest.ejs
   ├─ dashboard
   │  └─ home.ejs
   └─ toolsAccess

```

--- 

## 🔐 Cloud-Native Stack

- **Frontend**: EJS templates rendered via Express
- **Backend**: Node.js + Express per service
- **Database**: MongoDB Atlas
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Secrets Management**: Kubernetes Secrets & ConfigMaps

---

This architecture ensures that y!on8 is scalable, modular, and ready for future microservice expansion.
