
---

# 📚 ChatBook - AI Technical Book Platform (Backend)

A powerful backend service engineered to enable AI-powered summarization and contextual Q&A for technical books. This service processes documents and serves intelligent responses via a Python FastAPI and Node.js architecture.

## ✨ Key Features
- **AI-Powered Summarization:** Integration with the XLNet NLP model to generate accurate, contextual summaries of technical documentation.
- **Document Processing Pipeline:** Automated workflow for ingesting, parsing, and indexing technical books for efficient retrieval.
- **Contextual Search & Q&A:** Advanced querying capabilities that allow users to ask specific questions and receive precise, context-aware answers from the text.
- **API Documentation:** Fully documented REST endpoints using Swagger/OpenAPI for seamless frontend integration.

## 🛠️ Tech Stack
- **Backend Framework:** Python (FastAPI) / Node.js *(Adjust based on your primary language used in this repo)*
- **AI/ML:** XLNet NLP Model, Hugging Face Transformers *(Adjust if you used specific libraries)*
- **Database:** MongoDB / PostgreSQL *(Adjust to match your actual DB)*
- **Documentation:** Swagger UI / OpenAPI
- **Tools:** Docker, Postman, Python virtual environments

## 🚀 Getting Started Locally

1. **Clone the repository:**
     ```bash
    git clone https://github.com/zeiadkh/ChatBook-AI-Platform.git
     cd ChatBook-AI-Platform
2. **Set up the environment:**
     ```bash
     npm install
3. **Set up environment variables:**
   Create a .env file in the root directory:
     ```bash
        PORT=8000
   DATABASE_URL=your_database_connection_string
   # Add any AI model API keys or local model paths here
4. **Run the development server:**
   Create a .env file in the root directory:
     ```bash
       npm run dev
5. **View API Documentation**:
     ```bash
    Once running, navigate to http://localhost:8000/docs  Swagger endpoint to explore the interactive API documentation.
     

     
