#!/bin/bash

set -e

TOTAL_REQUESTS=${TOTAL_REQUESTS:-1000}
CONCURRENCY=${CONCURRENCY:-10}

echo "================================"
echo "Transaction Load Test"
echo "================================"

echo "Requests     : $TOTAL_REQUESTS"
echo "Concurrency  : $CONCURRENCY"

seq $TOTAL_REQUESTS | xargs -P $CONCURRENCY -I {} \
  curl -s \
  -X POST \
  http://localhost:3101/transactions \
  -H "Content-Type: application/json" \
  -d "{\"transactionId\":\"TXN-{}\",\"amount\":100}" \
  > /dev/null

echo ""
echo "Load test completed"

echo ""
echo "Application metrics:"

curl -s http://localhost:3101/metrics/local