#!/bin/bash

# Create Redis instance with minimal options
echo "Creating Redis instance..."
fly redis create

# The command will prompt for:
# - Name (enter: foundry-rest-api-redis)
# - Organization (select yours)
# - Region (select one close to you)
# - Eviction policy (answer Y)

# After creation completes, attach it to your app
echo "Attac your Redis app using the returned url..."