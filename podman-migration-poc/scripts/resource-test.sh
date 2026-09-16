#!/bin/bash

ENGINE=${1:-podman}

echo "================================"
echo "Resource Test"
echo "================================"

if [ "$ENGINE" = "podman" ]; then

    podman stats --no-stream cube-root-ms-podman

else

    docker stats --no-stream cube-root-ms-docker

fi

echo ""
echo "Application metrics:"

curl -s http://localhost:3001/metrics/local

echo ""

echo "Storage:"

du -sh data logs