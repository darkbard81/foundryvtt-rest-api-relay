# Use Debian-based Node.js image instead of Alpine
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install PNPM
RUN npm install -g pnpm

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install the dependencies
RUN pnpm install

# Copy the application files
COPY . .

# Build the application
RUN pnpm build

# Expose the ports
EXPOSE 3010

# Start the application
CMD ["pnpm", "start"]
