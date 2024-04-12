# PubMed Publication Fetcher

This project is a full-stack application that integrates with the PubMed API to fetch and display publication data. It consists of a backend server built with Flask and a frontend server built with React.

## Installation

Clone the repository and install the dependencies in both the frontend and backend directories.

\`\`\`bash
git clone https://github.com/james-txt/yaleswecas.git
cd yaleswecas
\`\`\`

For the backend:

\`\`\`bash
cd backend
pip install -r requirements.txt
\`\`\`

For the frontend:

\`\`\`bash
cd frontend
npm install
\`\`\`

## Usage

### Backend Server

The backend server is built with Flask. It has two endpoints:

- `GET /get_ids`: Fetches a list of the first 10 IDs from the PubMed API.
- `POST /get_details`: Fetches the details for a specific ID from the PubMed API.

To start the server, run:

\`\`\`bash
cd backend
venv\Scripts\activate # Windows
python main.py
\`\`\`

The server will start on `http://localhost:5000`.

