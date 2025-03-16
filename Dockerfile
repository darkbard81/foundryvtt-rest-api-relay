FROM node:20-slim

WORKDIR /app

# Install required build dependencies for bcrypt and PostgreSQL
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json (and lock files if they exist)
COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY yarn.lock* ./
COPY package-lock.json* ./

# Install dependencies with --no-optional to avoid non-essential optional deps
RUN npm install -g pnpm && \
    if [ -f pnpm-lock.yaml ]; then \
      pnpm install --frozen-lockfile; \
    elif [ -f yarn.lock ]; then \
      yarn install --frozen-lockfile; \
    else \
      npm install; \
    fi

# Add node-fetch explicitly since it's needed for the forwarder
RUN pnpm add node-fetch @types/node-fetch

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3010

# Start the application
CMD ["node", "dist/index.js"]
