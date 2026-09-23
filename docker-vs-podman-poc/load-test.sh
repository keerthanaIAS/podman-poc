#!/bin/bash

URL=$1
TOTAL=${2:-10000}
CONCURRENCY=${3:-20}

echo "URL=$URL"
echo "Requests=$TOTAL"
echo "Concurrency=$CONCURRENCY"

START=$(date +%s)

seq "$TOTAL" | xargs -P "$CONCURRENCY" -I {} curl -s -o /dev/null \
  -w "%{http_code}\n" "$URL" | sort | uniq -c

END=$(date +%s)

echo "Total time: $((END-START)) seconds"
