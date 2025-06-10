# 🧑‍💻 Users CRUD API

A full-featured Users CRUD REST API built with **Node.js**, **Express**, and **PostgreSQL**. Includes:

- Docker support
- Swagger API documentation
- Centralized error handling
- Postgres integration with both Docker and local **pgAdmin**
- Auto table creation on server start

## 🚀 Features

- ✅ RESTful API for user resource (CRUD)
- ✅ PostgreSQL database with Docker container
- ✅ Local database management using pgAdmin
- ✅ Swagger UI for API docs (`/api/v1/api-docs`)
- ✅ Modular structure (routes, controllers, models, middleware)
- ✅ Centralized error handler
- ✅ Auto-create tables on startup
- ✅ Environment variable support via `.env`

## 🧱 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Docker & Docker Compose
- pgAdmin
- Swagger (OpenAPI)
- ESLint (optional)

## 📁 Folder Structure

```txt
📦users-crud-api
 ┣ 📂.vscode
 ┃ ┗ 📜settings.json
 ┣ 📂public
 ┃ ┗ 📜vite.svg
 ┣ 📂src
 ┃ ┣ 📂configs
 ┃ ┃ ┣ 📜db.js
 ┃ ┃ ┗ 📜swagger.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┗ 📜userController.js
 ┃ ┣ 📂database
 ┃ ┃ ┣ 📜createUserTable.js
 ┃ ┃ ┗ 📜db.sql
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜errorHandler.js
 ┃ ┃ ┗ 📜validate.js
 ┃ ┣ 📂models
 ┃ ┃ ┗ 📜userModel.js
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📜userRoutes.js
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜logger.js
 ┃ ┣ 📂validations
 ┃ ┃ ┗ 📜userValidation.js
 ┃ ┣ 📜app.js
 ┃ ┗ 📜server.js
 ┣ 📜.dockerignore
 ┣ 📜.env
 ┣ 📜.env.example
 ┣ 📜.gitignore
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜Dockerfile
 ┣ 📜LICENSE
 ┣ 📜README.md
 ┣ 📜docker-compose.yaml
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜pnpm-lock.yaml
 ┣ 📜users-crud-api.json
 ┗ 📜vite.config.js
```

## ⚙️ Environment Variables

Create a `.env` file at the root:

```env
PORT=5000
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_NAME=users_db
DB_PASSWORD=your_password
```

## 🐳 Docker Setup

### Start containers

```bash
docker-compose up --build
```

This sets up:

- PostgreSQL database
- pgAdmin (on port `5432`)
- Your Node.js app (on `http://localhost:5000/api/v1/`)

## 📦 API Endpoints

Base URL: `http://localhost:5000/api/v1`

| Method | Endpoint     | Description          |
| ------ | ------------ | -------------------- |
| GET    | `/users`     | Get all users        |
| GET    | `/user/:id` | Get user by ID       |
| POST   | `/user`     | Create new user      |
| PUT    | `/user/:id` | Update existing user |
| DELETE | `/user/:id` | Delete a user        |

## 🧪 Swagger Docs

Access at: `http://localhost:5000/api/v1/api-docs`

```js
// Swagger setup path in app.js
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

## 🛠️ Scripts

```bash
# Start server
npm run dev

# Build & run Docker containers
docker-compose up --build
```

## ✅ To Do

- [ ] Write unit and integration tests
- [x] Add CI/CD with GitHub Actions

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[Apache License](LICENSE)

## 👨‍💻 Author

**Md. Maruf Sarker**
Community Manager | Software Engineer | Content Creator
🔗 [GitHub](https://github.com/maruf-pfc) | 🌐 [LinkedIn](https://linkedin.com/in/mdmarufsarker)
