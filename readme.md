# Appointment API

A RESTful API for managing appointments with automatic buffer time handling, built with Node.js, Express, and MongoDB.

![Demo Video](./screenshots/applicationAPI.gif)

## Features

- 📅 Create, read, update, and delete appointments
- ⏰ Automatic 20-minute buffer time between appointments
- 🔒 Input validation using Zod
- 📝 Detailed logging with Winston
- 📚 Interactive API documentation with Swagger UI
- 🔄 MongoDB integration with Mongoose
- 🛡️ Security with Helmet middleware
- 🌐 CORS enabled


## Project Structure

```
.
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── logger.js
│   │   └── swagger.js
│   ├── controllers/
│   │   └── appointmentController.js
│   ├── docs/
│   │   ├── index.html
│   │   └── swagger.yaml
│   ├── logs/
│   │   ├── combine.log
│   │   └── error.log
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validation.js
│   ├── models/
│   │   └── appointment.js
│   ├── routes/
│   │   └── appointments.js
│   └── index.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/appointment-api.git
cd appointment-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/appointment-api
PORT=3000
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```


## Docker Setup

1. Pull the pre-built image from Docker Hub:
```bash
docker pull sinharakshit/appointments-api:0.0.3.RELEASE 
```

4. Run the pulled image:
```bash
docker run -d -p 3000:3000 --env-file .env yourdockerhubusername/appointment-api
```

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs` when the server is running.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/appointments` | Create a new appointment |
| GET | `/api/appointments` | Get all appointments |
| GET | `/api/appointments/:id` | Get appointment by ID |
| PUT | `/api/appointments/:id` | Update an appointment |
| DELETE | `/api/appointments/:id` | Delete an appointment |

## Request/Response Examples

### Create Appointment

Request:
```json
POST /api/appointments
{
  "date": "2024-01-21T10:00:00.000Z",
  "time": "10:00",
  "description": "Doctor appointment"
}
```

Response:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "date": "2024-01-21T10:00:00.000Z",
  "time": "10:00",
  "description": "Doctor appointment",
  "createdAt": "2024-01-20T15:30:00.000Z",
  "updatedAt": "2024-01-20T15:30:00.000Z"
}
```

## Error Handling

The API uses standard HTTP status codes and returns error messages in the following format:

```json
{
  "error": "Error message",
  "details": [
    {
      "field": "fieldName",
      "message": "Validation message"
    }
  ]
}
```

## Logging

Logs are stored in the `logs` directory:
- Console output for development
- JSON file logs

## Security

- Helmet.js for HTTP headers security
- Input validation with Zod
- CORS enabled
- Error handling middleware
- Secure MongoDB connection


