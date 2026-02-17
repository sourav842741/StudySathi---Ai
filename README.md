![Logo](https://raw.githubusercontent.com/sourav842741/StudySathi---Ai/main/assets/studysathi-logo.png) <!-- TODO: Add a proper project logo or create one -->

[![GitHub stars](https://img.shields.io/github/stars/sourav842741/StudySathi---Ai?style=for-the-badge)](https://github.com/sourav842741/StudySathi---Ai/stargazers)

[![GitHub forks](https://img.shields.io/github/forks/sourav842741/StudySathi---Ai?style=for-the-badge)](https://github.com/sourav842741/StudySathi---Ai/network)

[![GitHub issues](https://img.shields.io/github/issues/sourav842741/StudySathi---Ai?style=for-the-badge)](https://github.com/sourav842741/StudySathi---Ai/issues)

[![GitHub license](https://img.shields.io/github/license/sourav842741/StudySathi---Ai?style=for-the-badge)](LICENSE) <!-- TODO: Add LICENSE file if not present -->

**Your intelligent companion for smarter studying. Unleash the power of AI to ace your exams!**

[Live Demo](https://studysathi-ai-client.onrender.com/) 

</div>

## 📖 Overview

StudySathi---Ai is an innovative AI-powered web application designed to revolutionize the way students learn and prepare for exams. By integrating advanced artificial intelligence capabilities, the platform provides personalized study assistance, intelligent content generation, and interactive learning experiences. It aims to be a reliable "study sathi" (companion) for students, helping them understand complex topics, generate concise notes, practice with quizzes, and track their academic progress efficiently.

## ✨ Features

-   **🧠 AI-Powered Chat Assistance:** Engage in dynamic conversations with an AI to get explanations, clarify doubts, and explore topics in depth.
-   **📝 Smart Study Material Generation:** Automatically generate summaries, notes, flashcards, or practice questions from raw text input.
-   **🔐 User Authentication & Profiles:** Secure login/registration with personalized dashboards to manage study content and track progress.
-   **📚 Content Management:** Organize and save your AI-generated study materials and personal notes.
-   **📊 Progress Tracking:** Monitor your learning journey and identify areas for improvement.
-   **📱 Responsive User Interface:** Seamless experience across various devices (desktop, tablet, mobile).

## 🖥️ Screenshots

<!-- TODO: Add actual screenshots of the application.
Examples:

![Home Page](assets/screenshots/homepage.png)

![AI Chat Interface](assets/screenshots/chat-interface.png)

![Generated Study Materials](assets/screenshots/study-materials.png)
-->
_Screenshots coming soon!_

## 🛠️ Tech Stack

**Frontend:**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
<!-- TODO: Verify actual frontend technologies from client/package.json -->

**Backend:**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
<!-- TODO: Verify actual backend technologies from server/package.json and code -->

**DevOps:**

![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)


## 🚀 Quick Start

Follow these steps to get StudySathi---Ai up and running on your local machine.

### Prerequisites
-   Node.js (LTS version, e.g., 18.x or 20.x)
-   npm (Node Package Manager)
-   A MongoDB instance (local or cloud-hosted, e.g., MongoDB Atlas)
-   An API Key for your chosen AI service (e.g., OpenAI API Key)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sourav842741/StudySathi---Ai.git
    cd StudySathi---Ai
    ```

2.  **Setup Backend**
    Navigate to the `server` directory and install dependencies:
    ```bash
    cd server
    npm install
    ```
    Create a `.env` file in the `server` directory based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Configure your environment variables in `server/.env`:
    -   `PORT=5000` (or your preferred port)
    -   `MONGO_URI=YOUR_MONGODB_CONNECTION_STRING` (e.g., `mongodb://localhost:27017/studysathi` or Atlas URI)
    -   `JWT_SECRET=YOUR_SECURE_JWT_SECRET` (generate a strong, random string)
    -   `AI_API_KEY=YOUR_AI_SERVICE_API_KEY` (e.g., for OpenAI)
    <!-- TODO: List all actual server environment variables from server/.env.example -->

3.  **Setup Frontend**
    Navigate to the `client` directory and install dependencies:
    ```bash
    cd ../client
    npm install
    ```
    Create a `.env` file in the `client` directory based on `.env.example`:
    ```bash
    cp .env.example .env
    ```
    Configure your environment variables in `client/.env`:
    -   `VITE_APP_API_URL=http://localhost:5000/api` (or the URL of your deployed backend)
    <!-- TODO: List all actual client environment variables from client/.env.example -->

4.  **Start Development Servers**
    Open two separate terminal windows.

    **Terminal 1 (Backend):**
    ```bash
    cd server
    npm start
    ```
    The backend server will typically run on `http://localhost:5000`.

    **Terminal 2 (Frontend):**
    ```bash
    cd client
    npm run dev
    ```
    The frontend development server will typically run on `http://localhost:5173` (Vite default).

5.  **Open your browser**
    Visit `http://localhost:5173` to access the application.

## 📁 Project Structure

```
StudySathi---Ai/
├── client/                     # Frontend application (React with Vite)
│   ├── public/                 # Static assets for the frontend
│   │   └── index.html
│   ├── src/                    # Frontend source code
│   │   ├── assets/             # Images, SVGs
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Main application pages/routes
│   │   ├── context/            # Global state management context
│   │   ├── hooks/              # Custom React hooks
│   │   ├── utils/              # Frontend utility functions
│   │   ├── App.jsx             # Root React component
│   │   └── main.jsx            # React app entry point
│   ├── .env.example            # Example environment variables for client
│   ├── package.json            # Frontend dependencies and scripts
│   └── README.md               # Frontend-specific documentation (if any)
├── server/                     # Backend application (Node.js with Express)
│   ├── config/                 # Server configuration files
│   ├── controllers/            # Logic for handling API requests
│   ├── models/                 # Database schemas and models
│   ├── routes/                 # API endpoint definitions
│   ├── utils/                  # Server-side utility functions
│   ├── middleware/             # Custom Express middleware
│   ├── .env.example            # Example environment variables for server
│   ├── package.json            # Backend dependencies and scripts
│   └── server.js               # Backend application entry point
├── .gitignore                  # Specifies untracked files to ignore
└── README.md                   # This main documentation file
```

## ⚙️ Configuration

### Environment Variables
Both the client and server applications rely on environment variables for sensitive information and configuration.

#### Server (`server/.env`)

| Variable      | Description                                     | Default  | Required |

|---------------|-------------------------------------------------|----------|----------|

| `PORT`        | Port for the backend server to listen on        | `5000`   | No       |

| `MONGO_URI`   | MongoDB connection string                       |          | Yes      |

| `JWT_SECRET`  | Secret key for signing JWTs                     |          | Yes      |

| `AI_API_KEY`  | API key for integrating with the AI service     |          | Yes      |
<!-- TODO: Ensure this table is updated with all actual variables from server/.env.example -->

#### Client (`client/.env`)

| Variable          | Description                                    | Default                     | Required |

|-------------------|------------------------------------------------|-----------------------------|----------|

| `VITE_APP_API_URL`| Base URL for the backend API                   | `http://localhost:5000/api` | Yes      |
<!-- TODO: Ensure this table is updated with all actual variables from client/.env.example -->

### Configuration Files
-   `server/config/`: May contain database configuration, AI service configuration, etc.
-   `client/vite.config.js`: Vite build configuration for the frontend.

## 🔧 Development

### Available Scripts

#### Server (`server/package.json`)

| Command       | Description                                  |

|---------------|----------------------------------------------|

| `npm start`   | Starts the backend server in production mode. |

| `npm run dev` | Starts the backend server in development mode (e.g., with `nodemon`). |
<!-- TODO: Add other detected scripts from server/package.json -->

#### Client (`client/package.json`)

| Command       | Description                                  |

|---------------|----------------------------------------------|

| `npm run dev` | Starts the frontend development server.      |

| `npm run build` | Builds the frontend for production.          |

| `npm run lint`| Lints the frontend source files.             |

| `npm preview` | Serves the production build locally.         |
<!-- TODO: Add other detected scripts from client/package.json -->

## 🧪 Testing

<!-- TODO: If test frameworks like Jest, React Testing Library, or Mocha/Chai are detected, provide relevant commands. -->
_Testing setup details are not explicitly available in the provided structure. Please refer to `client/package.json` and `server/package.json` for any defined test scripts._

## 🚀 Deployment

### Production Build
To create a production-ready build of the frontend:
```bash
cd client
npm run build
```
This will generate optimized static assets in the `client/dist` directory.

### Deployment Options
-   **Render:** The client is currently deployed on Render as indicated by the homepage URL. Both client and server can be deployed on Render using their platform services (Web Services for backend, Static Sites for frontend).
-   **Docker:** A `Dockerfile` could be added for containerized deployment of both client and server components.
-   **Vercel/Netlify:** The `client/dist` output can be easily deployed to static site hosting services like Vercel or Netlify.
-   **Node.js Hosting:** The `server` directory can be deployed to any Node.js compatible hosting environment.

## 📚 API Reference

The backend API provides endpoints for user authentication, AI interaction, and managing study-related data. All API endpoints are prefixed with `/api`.

### Authentication
-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Authenticate and log in a user, returning a JWT.

### AI Endpoints
-   `POST /api/ai/chat`: Send a message to the AI and receive a response.
-   `POST /api/ai/generate-content`: Request the AI to generate study materials based on provided input.

### User & Study Material Endpoints
-   `GET /api/user/profile`: Retrieve user profile information (requires authentication).
-   `PUT /api/user/profile`: Update user profile information (requires authentication).
-   `GET /api/study-materials`: Retrieve all study materials for the authenticated user.
-   `POST /api/study-materials`: Create a new study material entry.
-   `GET /api/study-materials/:id`: Retrieve a specific study material by ID.
-   `PUT /api/study-materials/:id`: Update a specific study material by ID.
-   `DELETE /api/study-materials/:id`: Delete a specific study material by ID.

<!-- TODO: Provide detailed request/response examples for key endpoints if possible by examining code. -->

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started. <!-- TODO: Create CONTRIBUTING.md -->

### Development Setup for Contributors
The development setup described in the [Quick Start](#quick-start) section is suitable for contributors. Ensure you have the prerequisites installed and environment variables configured for both the client and server.

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the [LICENSE](LICENSE) file for details. <!-- TODO: Add LICENSE file to the repository -->

## 🙏 Acknowledgments

-   **AI Services:** Powered by [Specify AI Service here, e.g., OpenAI API]
-   **Frontend:** Built with React, Vite, and potentially Tailwind CSS.
-   **Backend:** Developed using Node.js and Express.js.
-   **Database:** Utilizing MongoDB.
-   **Deployment:** Hosted on Render.
-   [Add other major libraries or inspirations here]

## 📞 Support & Contact

-   📧 Email: [souravkumar85055@gmail.com] <!-- TODO: Add actual contact email for sourav842741 -->
-   🐛 Issues: [GitHub Issues](https://github.com/sourav842741/StudySathi---Ai/issues)
-   💬 Discussions: [GitHub Discussions](https://github.com/sourav842741/StudySathi---Ai/discussions) <!-- TODO: Enable GitHub Discussions if not already -->

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Sourav Kumar] <!-- TODO: Confirm author name if different -->

</div>

