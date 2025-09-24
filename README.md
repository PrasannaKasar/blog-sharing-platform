<div align="center">
  <br />
  <h1>
    📝
    <br />
    BlogSphere
    <br />
  </h1>
  <sup>
    <p><em>A modern blog sharing platform with AI-powered summarization.</em></p>
  </sup>
  <br />
</div>

[![Watch the video](https://img.youtube.com/vi/kygG7wbSY3s/0.jpg)](https://www.youtube.com/watch?v=kygG7wbSY3s)

## ✨ Features

*   **User Authentication**: Secure sign-up and login functionality using JWT.
*   **Create & Share Blogs**: Authenticated users can create, publish, and share their blog posts.
*   **Interactive Dashboard**: A clean, modern dashboard to view all blog posts from different users.
*   **AI-Powered Summarization**: Instantly get a concise summary of any blog post with a single click.
*   **Search & Sort**: Easily find blogs by author or title, and sort them by date or upvotes.
*   **Beautiful UI**: A sleek and responsive user interface built with Next.js and Tailwind CSS.

## 🚀 Tech Stack

**Frontend:**
*   Next.js
*   React
*   Tailwind CSS
*   Axios

**Backend:**
*   Node.js
*   Express.js
*   PostgreSQL
*   JWT (JSON Web Tokens) for authentication
*   Integration with an AI service for summarization

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn
*   PostgreSQL installed and running

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd server

# Install dependencies
npm install

# Create a .env file and add your environment variables
touch .env
```

Your backend `.env` file should look like this:
```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="your_jwt_secret"
AI_API_KEY="your_ai_service_api_key"
PORT=5000
```

### 3. Database Setup

1.  Make sure your PostgreSQL server is running.
2.  Create a new database for the project.
3.  Run the database migrations (if you have a migration script):
    ```bash
    # Example command
    npm run migrate
    ```

### 4. Frontend Setup

```bash
# Navigate to the frontend directory (from the root)
cd login-app

# Install dependencies
npm install
```

### 5. Running the Application

1.  **Start the backend server:**
    ```bash
    # From the /server directory
    npm start
    ```
    The backend will be running on `http://localhost:5000`.

2.  **Start the frontend development server:**
    ```bash
    # From the /login-app directory
    npm run dev
    ```
    Open http://localhost:3000 with your browser to see the result.

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

