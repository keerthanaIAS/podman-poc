#!/bin/bash

set -e

ENGINE=${1:-podman}

echo "================================"
echo "Storage Persistence Test"
echo "================================"

BEFORE=$(wc -l < data/transactions.log 2>/dev/null || echo 0)

echo "Transactions before restart: $BEFORE"

if [ "$ENGINE" = "podman" ]; then

    podman restart cube-root-ms-podman

else

    docker restart cube-root-ms-docker

fi

sleep 5

AFTER=$(wc -l < data/transactions.log 2>/dev/null || echo 0)

echo "Transactions after restart: $AFTER"

if [ "$AFTER" -lt "$BEFORE" ]; then
    echo "BLOCKER: Transaction data was lost"
    exit 1
fi

echo "Storage persistence test PASSED"