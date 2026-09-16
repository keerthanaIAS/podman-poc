#!/bin/bash
set -e

IMAGE="cube-root-ms:docker-poc"
CONTAINER="cube-root-ms-docker"

echo "================================"
echo "Building Docker image"
echo "================================"

docker build \
  --build-arg API_NEWTWELVE_CACHE_BUST_RESYNC=$(date +%s) \
  -t $IMAGE .

echo "================================"
echo "Creating Docker volumes"
echo "================================"

docker volume create cube-data >/dev/null 2>&1 || true
docker volume create cube-logs >/dev/null 2>&1 || true

echo "================================"
echo "Starting container"
echo "================================"

docker rm -f $CONTAINER 2>/dev/null || true

docker run -d \
  --name $CONTAINER \
  -p 3001:3001 \
  -e CONTAINER_ENGINE=docker \
  -v cube-data:/data \
  -v cube-logs:/logs \
  $IMAGE

echo "Waiting for application..."

until curl -sf http://localhost:3001/health > /dev/null
do
  sleep 2
done

echo "Docker application is UP"

curl http://localhost:3001/health