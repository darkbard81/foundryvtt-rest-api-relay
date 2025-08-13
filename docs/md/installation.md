---
id: installation
title: Installation
sidebar_position: 2
---

# Installation

There are two primary ways to install the FoundryVTT REST API Relay server: using Docker (recommended for ease of use and deployment) or manually.

## Recommended: Docker Installation

Using Docker and Docker Compose is the simplest way to get the relay server running.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JustAnotherIdea/foundryvtt-rest-api-relay.git
    cd foundryvtt-rest-api-relay
    ```

2.  **Start the server:**
    ```bash
    docker-compose up -d
    ```
    This command will pull the latest Docker image and start the relay server in the background. The server will be available at `http://localhost:3010`.

3.  **Database Initialization:**
    The default Docker setup uses an SQLite database for persistence, which is stored in the `data` directory. When you first start the server, a default admin user is created.
    - **Email:** `admin@example.com`
    - **Password:** `admin123`
    
    You can log into the web interface to get your API key.

4.  **Stopping the server:**
    ```bash
    docker-compose down
    ```

### Using PostgreSQL
If you prefer to use PostgreSQL for your database, you can use the provided `docker-compose.postgres.yml` file. See the [PostgreSQL Setup Guide](/postgres-setup) for more details.

### Relay + Foundry + duckDNS
For an in depth guide for a full setup using duckDNS see [Relay + App + DNS Example](/relay-app-duckdns-example)

## Manual Installation

If you prefer not to use Docker, you can run the server directly using Node.js.

1.  **Prerequisites:**
    - Node.js (v18 or later)
    - pnpm package manager (`npm install -g pnpm`)

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/JustAnotherIdea/foundryvtt-rest-api-relay.git
    cd foundryvtt-rest-api-relay
    ```

3.  **Install dependencies:**
    ```bash
    pnpm install
    ```

4.  **Run the server:**
    - **For development (with auto-reloading):**
      ```bash
      pnpm dev
      ```
    - **For production:**
      First, build the project:
      ```bash
      pnpm build
      ```
      Then, start the server using SQLite:
      ```bash
      pnpm local:sqlite
      ```
      Or with an in-memory database (not recommended for production):
      ```bash
      pnpm local
      ```

The server will be running at `http://localhost:3010`.
