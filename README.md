# Beneficiary Fraud Detection & Intelligent Assistant

An AI-powered platform that automates beneficiary application verification using OCR, document parsing, fraud detection, Retrieval-Augmented Generation (RAG), and conversational AI.

The system analyzes uploaded application forms and supporting documents, detects inconsistencies, assigns fraud risk scores, and allows users to interact with an AI assistant for document-specific queries.

---

# Features

## User Portal
- Secure Login & Registration
- Upload Beneficiary Application
- Upload Supporting Documents
- AI-based Document Analysis
- View Verification Results
- Chat with AI about uploaded documents

## Admin Portal
- View Submitted Applications
- Fraud Risk Dashboard
- Document Verification Results
- AI Analysis Reports
- Beneficiary Intelligence Chatbot

---

# Tech Stack

## Frontend
- Next.js
- React
- Tailwind CSS
- shadcn/ui
- Axios

## Backend
- FastAPI
- LangGraph
- LangChain
- SQLite
- ChromaDB
- HuggingFace Embeddings
- Google Gemini

## AI & NLP
- PaddleOCR
- PyMuPDF
- OCR Confidence Merging
- LLM-based Structured Parsing
- Retrieval Augmented Generation (RAG)
- Cross Encoder Re-ranking
- Long-Term Memory
- Intelligent Query Routing

---

# System Architecture

```
                    User Uploads Documents
                             │
                             ▼
                    OCR (PaddleOCR)
                             │
                             ▼
               Confidence Based Text Merge
                             │
                             ▼
                LLM Document Parser
                             │
                             ▼
                 Structured Information
                             │
               ┌─────────────┴─────────────┐
               ▼                           ▼
       Verification Engine           Vector Database
               │                           │
               ▼                           ▼
        Fraud Risk Score              ChromaDB
               │                           │
               └─────────────┬─────────────┘
                             ▼
                    LangGraph RAG Agent
                             │
                 ┌───────────┴─────────────┐
                 ▼                         ▼
           Memory Retrieval         Web Search
                 │                         │
                 └───────────┬─────────────┘
                             ▼
                     Gemini Response
```

---

# Project Structure

```
beneficiary-fraud-detection/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── APIs/
│   └── public/
│
├── backend/
│   ├── api/
│   ├── graph/
│   ├── models/
│   ├── prompts/
│   ├── services/
│   │    ├── llm/
│   │    ├── masking/
│   │    ├── ocr/
│   │    ├── parser/
│   │    ├── rag/
│   │    ├── repository/
│   │    └── verification/
│   ├── uploads/
│   ├── main.py
│   └── requirements.txt
│
└── README.md
```

---

# AI Pipeline

## 1. OCR

Uploaded PDFs are processed using PaddleOCR and PyMuPDF.

The extracted text from every page is merged using confidence-based matching to improve OCR quality.

---

## 2. Document Parsing

Google Gemini extracts structured information such as:

- Name
- Aadhaar Number
- Address
- Income
- Scheme Details
- Application Information

---

## 3. Verification Engine

The verification engine compares application data against supporting documents.

It validates:

- Identity
- Address
- Income
- Date of Birth
- Other beneficiary information

Detected mismatches contribute to the fraud risk score.

---

## 4. Risk Assessment

Each application receives:

- Risk Score
- Risk Level
    - Low
    - Medium
    - High
- Detailed inconsistency report

---

## 5. Vector Database

Verified document chunks are stored in ChromaDB using HuggingFace embeddings.

Metadata includes:

- User ID
- Analysis ID
- Document Type
- Risk Level

---

## 6. Intelligent RAG Agent

The chatbot uses LangGraph to intelligently answer document-related questions.

Depending on user intent, it can:

- Retrieve relevant document chunks
- Search long-term memory
- Perform web search if required
- Generate contextual responses using Gemini

---

# Retrieval Pipeline

```
User Query
      │
      ▼
Intent Detection
      │
      ▼
Query Rewriting
      │
      ▼
Vector Retrieval
      │
      ▼
Cross Encoder Re-ranking
      │
      ▼
Relevant Context
      │
      ▼
Gemini Response
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>

cd beneficiary-fraud-detection
```

---

# Backend Setup

```bash
cd backend

python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux/Mac

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run server

```bash
uvicorn main:app --reload
```

---

# Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# Environment Variables

Backend

```
GOOGLE_API_KEY=

HF_TOKEN=

LANGSMITH_API_KEY=

LANGCHAIN_API_KEY=
```

Frontend

```
NEXT_PUBLIC_API_URL=
```

---

# API Endpoints

## Authentication

```
POST /signup

POST /login
```

## Analysis

```
POST /api/analyze
```

## Chat

```
POST /chat
```

## Results

```
GET /results
```

---

# Technologies Used

- FastAPI
- Next.js
- LangGraph
- LangChain
- Google Gemini
- PaddleOCR
- PyMuPDF
- ChromaDB
- SQLite
- HuggingFace Embeddings
- Tailwind CSS
- shadcn/ui

---

# Future Improvements

- Multi-language support
- Redis caching
- JWT Authentication
- Role-Based Access Control
- Cloud Deployment
- PostgreSQL Migration
- Real-time Notifications
- Feedback-based Learning
- Enhanced Fraud Analytics Dashboard

---

# Contributors

Developed as an AI-powered Beneficiary Fraud Detection System for intelligent verification and fraud prevention using Large Language Models, OCR, and Retrieval-Augmented Generation.
