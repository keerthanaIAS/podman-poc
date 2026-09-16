#!/bin/bash
set -e

IMAGE="cube-root-ms:podman-poc"
CONTAINER="cube-root-ms-podman"

echo "================================"
echo "Building Podman image"
echo "================================"

podman build \
  --build-arg API_NEWTWELVE_CACHE_BUST_RESYNC=$(date +%s) \
  -t $IMAGE .

echo "================================"
echo "Creating Podman volumes"
echo "================================"

podman volume create cube-data >/dev/null 2>&1 || true
podman volume create cube-logs >/dev/null 2>&1 || true

echo "================================"
echo "Starting container"
echo "================================"

podman rm -f $CONTAINER 2>/dev/null || true

podman run -d \
  --name $CONTAINER \
  -p 3001:3001 \
  -e CONTAINER_ENGINE=podman \
  -v cube-data:/data \
  -v cube-logs:/logs \
  $IMAGE

echo "Waiting for application..."

until curl -sf http://localhost:3001/health > /dev/null
do
  sleep 2
done

echo "Podman application is UP"

curl http://localhost:3001/health