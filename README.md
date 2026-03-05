# Event Driven Notification Engine

## Overview

This project implements an event-driven notification system built using Node.js, TypeScript, Redis, BullMQ, and MongoDB.
The system decouples API request handling from notification processing using a message queue and background workers.

The API accepts notification requests and places them into a Redis-backed queue. Workers consume jobs from the queue and process them asynchronously. This architecture enables reliable, scalable, and fault-tolerant notification delivery.

## Architecture

Client → Express API → BullMQ Queue → Redis → Worker → MongoDB

1. The client sends a notification request to the API.
2. The API stores a tracking record in MongoDB.
3. The job is pushed into a BullMQ queue backed by Redis.
4. Worker processes consume jobs from the queue.
5. The worker updates the notification status in MongoDB.

## Features

* Asynchronous notification processing
* Event-driven architecture
* Redis-backed queue with BullMQ
* Worker concurrency for scalable processing
* Retry logic with exponential backoff
* MongoDB for notification tracking
* REST API for job submission and status tracking

## Tech Stack

* Node.js
* TypeScript
* Express
* Redis
* BullMQ
* MongoDB
* Mongoose

## Project Structure

src
├── api
│   └── server.ts
├── queues
│   ├── connection.ts
│   └── notificationQueue.ts
├── workers
│   └── notificationWorker.ts
├── models
│   └── Notification.ts

## Installation

Clone the repository:

git clone https://github.com/your-username/event-driven-notification-engine.git

cd event-driven-notification-engine

Install dependencies:

npm install

## Environment Setup

Create a `.env` file:

MONGO_URI=mongodb://localhost:27017/notif_db
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
PORT=3000

## Running the System

Start Redis:

docker run -p 6379:6379 redis

Start MongoDB:

docker run -p 27017:27017 mongo

Compile the TypeScript project:

npx tsc

Start the API server:

node dist/api/server.js

Start the worker in a separate terminal:

node dist/workers/notificationWorker.js

## API Endpoints

### Send Notification

POST /send

Example request body:

{
"type": "email",
"recipient": "[test@example.com](mailto:test@example.com)",
"body": "Hello from the notification engine"
}

Response:

{
"success": true,
"jobId": "uuid"
}

### Check Notification Status

GET /status/:jobId

Example:

GET /status/bca529c4-cfbb-4b1b-83e3-4a422f299d16

## Future Improvements

* Dead letter queue for permanently failed notifications
* Rate limiting for external notification providers
* Horizontal worker scaling
* Monitoring dashboard for queue jobs
* Support for multiple notification channels (email, SMS, push)

## License

MIT

