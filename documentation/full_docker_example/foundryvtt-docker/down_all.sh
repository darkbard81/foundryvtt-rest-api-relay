#!/bin/bash

docker compose down --remove-orphans

docker image prune -f

docker container prune

docker volume prune

# MOD tanto la gente se lo scorda...
docker builder prune -a

# MOD 
# docker system prune -a
