
# KoinX Backend Internship Assignment

This repository contains a production-grade backend server application for the KoinX Backend Internship Assignment. The application is built using **Node.js**, **TypeScript**, and **MongoDB**. It demonstrates skills in background job scheduling, API development, database interaction, and deployment.


### 🚀 Live Demo

The server is deployed on AWS EC2 and can be accessed at:

- **API Base URL**: [https://koinx-server.abhiramverse.tech/](https://koinx-server.abhiramverse.tech/)



### 📦 Docker

The Docker image for this project is available on Docker Hub:

- **Docker Hub Repository**: [saiabhiramjaini/koinx-server](https://hub.docker.com/repository/docker/saiabhiramjaini/koinx-server/general)



### 📂 Repository

The source code for this project is hosted on GitHub:

- **GitHub Repository**: [https://github.com/saiabhiramjaini/koinx-server](https://github.com/saiabhiramjaini/koinx-server)


### 📄 Assignment Objectives

This project fulfills the following tasks:

#### Task 1: Background Job
- A background job runs every 2 hours to fetch the following data for three cryptocurrencies (Bitcoin, Matic, Ethereum) from the [CoinGecko API](https://docs.coingecko.com/v3.0.1/reference/introduction):
  - Current price (in USD)
  - Market cap (in USD)
  - 24-hour price change (percentage)
- The fetched data is stored in a MongoDB database.

#### Task 2: `/stats` API
- Endpoint: `/api/v1/stats`
- Method: `GET`
- Query Parameter:
  - `coin`: The cryptocurrency ID (e.g., `bitcoin`, `matic-network`, or `ethereum`)
- Response Example:
  ```json
  {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
  }
  ```

![image](https://github.com/user-attachments/assets/e4b96957-2707-483c-ad4c-be05a9a0d851)

#### Task 3: `/deviation` API
- Endpoint: `/api/v1/deviation`
- Method: `GET`
- Query Parameter:
  - `coin`: The cryptocurrency ID (e.g., `bitcoin`, `matic-network`, or `ethereum`)
- Calculates and returns the standard deviation of the price of the cryptocurrency based on the last 100 records stored in the database.
- Response Example:
  ```json
  {
    "deviation": 4082.48
  }
  ```

![image](https://github.com/user-attachments/assets/e8fef9da-8f96-48cf-99eb-74a44d19d733)


### 🛠️ Technologies Used

- **Node.js** for server-side development.
- **TypeScript** for static typing and improved development experience.
- **MongoDB** for storing cryptocurrency data.
- **Express.js** for API routing.
- **Axios** for making HTTP requests.
- **Node-cron** for background job scheduling.
- **Zod** for input validation.
- **Docker** for containerization and deployment.


### 📋 Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB instance (local or Atlas)
- Docker (optional for containerized deployment)

#### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/saiabhiramjaini/koinx-server.git
   cd koinx-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   MONGO_URI=<your_mongodb_connection_string>
   COINGECKO_API_URL=https://api.coingecko.com/api/v3
   ```

4. Start the server:
   ```bash
   npm run start
   ```

5. To build the project:
   ```bash
   npm run build
   ```

6. To run the server using the built files:
   ```bash
   npm run start
   ```


### 🐳 Docker

To build and run the project using Docker:
1. Build the Docker image:
   ```bash
   docker build -t koinx-server .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 -d koinx-server
   ```

3. Alternatively, pull the pre-built Docker image:
   ```bash
   docker pull saiabhiramjaini/koinx-server
   ```


### 🧪 API Endpoints

#### `/stats`
- **Method**: `GET`
- **Query Parameter**: `coin` (e.g., `bitcoin`, `matic-network`, `ethereum`)
- **Description**: Fetches the latest price, market cap, and 24-hour price change of the requested cryptocurrency.
- **Response Example**:
  ```json
  {
    "price": 40000,
    "marketCap": 800000000,
    "24hChange": 3.4
  }
  ```

#### `/deviation`
- **Method**: `GET`
- **Query Parameter**: `coin` (e.g., `bitcoin`, `matic-network`, `ethereum`)
- **Description**: Returns the standard deviation of the price of the requested cryptocurrency based on the last 100 records.
- **Response Example**:
  ```json
  {
    "deviation": 4082.48
  }
  ```


### 🏗️ Project Structure

```
koinx-server/
│
├── src/
│   ├── db/
│   │   └── connect.ts           # MongoDB connection setup
│   ├── routes/
│   │   └── cryptoData.routes.ts # API route definitions
│   ├── utils/
│   │   └── cronjob.ts           # Background job logic
│   ├── models/
│   │   └── cryptoData.model.ts  # Mongoose schema for cryptocurrency data
│   ├── controllers/
│   │   └── cryptoData.controller.ts # Business logic for APIs
│   └── index.ts                 # Application entry point
│
├── .env                         # Environment variables
├── Dockerfile                   # Docker configuration
├── package.json                 # NPM dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```


## 👥 Contributors

- **Sai Abhiram Jaini** - [GitHub](https://github.com/saiabhiramjaini)


