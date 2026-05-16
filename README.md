# DeepQuantica ML Training Platform

A full-stack mini machine learning training platform built for the DeepQuantica Technical Challenge.

The platform allows users to:

- Submit ML training jobs
- Process jobs asynchronously using a background worker
- Monitor jobs in real-time
- Visualize ML metrics and charts
- View dataset summaries and processing logs

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- RTK Query
- React Router
- Recharts

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## ML / Data Processing

- csv-parser
- ml-kmeans
- ml-regression-simple-linear

---

# Features

## Real-Time Dashboard

- Live job monitoring
- Queue visualization
- Running / Completed / Queued counters
- Real-time polling updates

## Background Worker System

- Separate worker processing
- Concurrent job handling
- Queue-based architecture
- Lifecycle logging

## Machine Learning Workflows

### Linear Regression

Dataset:
- house-prices.csv

Outputs:
- slope
- intercept

### K-Means Clustering

Dataset:
- mall-customers.csv

Outputs:
- clusters
- inertia
- scatter plot
- elbow curve

### Random Forest (Simplified MVP)

Dataset:
- titanic.csv

Outputs:
- accuracy
- confusion matrix

---

# Project Architecture

```
Frontend (React)
        ↓
Backend API (Express)
        ↓
MongoDB
        ↓
Background Worker
        ↓
ML Processing
        ↓
Real-Time Dashboard Updates
```

---

# Folder Structure

## Backend

```txt
backend/
│
├── config/
│     └── db.js
│
├── datasets/
│     ├── house-prices.csv
│     ├── mall-customers.csv
│     └── titanic.csv
│
├── models/
│     └── Job.js
│
├── routes/
│     └── jobRoutes.js
│
├── worker/
│     ├── worker.js
│     └── trainModel.js
│
├── server.js
├── .env
└── package.json
```

## Frontend

```txt
frontend/
│
├── src/
│   ├── app/
│   │    └── store.js
│   │
│   ├── components/
│   │    └── Navbar.jsx
│   │
│   ├── features/
│   │    └── jobsApi.js
│   │
│   ├── pages/
│   │    ├── CreateJob.jsx
│   │    ├── JobsList.jsx
│   │    └── JobDetails.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

---

# API Endpoints

## Create Job

```http
POST /api/jobs
```

### Request Body

```json
{
  "dataset": "mall-customers.csv",
  "hyperparameters": {
    "k": 5
  }
}
```

---

## Get All Jobs

```http
GET /api/jobs
```

---

## Get Single Job

```http
GET /api/jobs/:id
```

---

# Job Lifecycle

```txt
queued → running → completed
```

---

# Frontend Features

## Dashboard

- Live queue monitoring
- Real-time status updates
- Queue position tracking
- Responsive modern UI

## Create Job Page

- Dataset selection
- Automatic algorithm mapping
- Hyperparameter input

## Job Details Page

- Dataset summary
- ML metrics
- Interactive charts
- Processing logs

---

# Charts & Visualizations

Implemented using Recharts.

## Included Charts

- Scatter Plot
- Elbow Curve
- Confusion Matrix

---

# Responsive Design

The application is fully responsive across:

- Mobile
- Tablet
- Desktop

---

# Installation

# Backend Setup

```bash
cd backend

npm install
```

Create `.env`

```env
PORT=8080
MONGO_URI=your_mongodb_uri
```

Run backend:

```bash
npm run dev
```

Run worker:

```bash
node worker/worker.js
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Real-Time Updates

The frontend uses RTK Query polling for live updates.

```js
pollingInterval: 5000
```

---

# Key Highlights

- Full-stack architecture
- Real-time dashboard
- Background worker processing
- Queue-based ML execution
- Responsive modern UI
- Data visualization
- Concurrent job handling

---

# Future Improvements

- Socket.IO real-time updates
- Authentication
- Deployment automation
- Advanced ML models
- Job cancellation
- Retry failed jobs

---

# Developed For

DeepQuantica Technical Challenge

---

# Author

Udesh Bhatti
