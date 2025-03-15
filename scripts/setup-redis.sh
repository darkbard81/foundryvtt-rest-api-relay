#!/bin/bash

# Create Redis instance with minimal options
echo "Creating Redis instance..."
fly redis create foundry-rest-api-redis \
  --region ord \
  --no-replicas

# After creation, extract and set the Redis URL as a secret
echo "Setting Redis URL as a secret for your app..."
REDIS_URL=$(fly redis status foundry-rest-api-redis | grep "Connection string" | awk '{print $3}')
fly secrets set REDIS_URL="$REDIS_URL"

echo "Redis setup complete. URL set as secret."