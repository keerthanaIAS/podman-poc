# Phase 0 — Start and verify the existing POC:
From:
cd /Applications/podman-poc/podman-migration-poc

1. Start Podman VM
podman machine list
podman machine start
podman info

2. Check existing containers/images
echo "=== CONTAINERS ==="
podman ps -a

echo ""
echo "=== IMAGES ==="
podman images

3. Check POC files
ls -la
echo ""
find data logs monitoring -maxdepth 2 -type f 2>/dev/null

# PART 2 Readme 1 continuation:

* Phase 1 — Start the application:

Use the existing script:
./scripts/run-podman.sh

Then:
podman ps

* Phase 2 — Baseline before failure testing:

Run:
echo "=== PODMAN ==="
podman ps

echo ""
echo "=== RESOURCE USAGE ==="
podman stats --no-stream

echo ""
echo "=== PODMAN DISK ==="
podman system df

echo ""
echo "=== HOST DISK ==="
df -h .

echo ""
echo "=== POC STORAGE ==="
du -sh data logs monitoring/loki 2>/dev/null

* Phase 3 — Storage failure / disk-full test:

First inspect your existing storage-test script:
cat scripts/storage-test.sh

Then run:
./scripts/storage-test.sh

After it completes:
podman ps
podman stats --no-stream

echo "=== STORAGE ==="
du -sh data logs monitoring/loki 2>/dev/null

echo "=== ERRORS ==="
grep -iE "error|fail|no space|disk" logs/application.log | tail -30

* Phase 4 — Loki outage + log recovery:

First identify the Loki container:
podman ps -a --format "{{.ID}} {{.Image}} {{.Names}}"

If the container is named loki:
podman stop loki

While Loki is down, generate application activity:
TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh

Then check:
tail -30 logs/application.log

Now start Loki again:
podman start loki

Then inspect:
podman ps

* Phase 5 — Podman VM restart / container recovery:

First:
podman ps

    Record the running containers.

Then:
podman machine stop

Wait a few seconds:
podman machine start

Then:
podman ps

- Critical question:
Did the required containers automatically return?

If not, check:
podman ps -a

* Phase 6 — Higher controlled load/resource test:

Test A:
TOTAL_REQUESTS=25000 CONCURRENCY=50 ./scripts/load-test.sh

Then:
podman stats --no-stream

Test B:
If Test A is stable:
TOTAL_REQUESTS=50000 CONCURRENCY=100 ./scripts/load-test.sh

Then:
podman stats --no-stream

* Phase 7 — Final Podman-specific blocker check:
| Risk                 | Result we need                                            |
| -------------------- | --------------------------------------------------------- |
| Storage/disk full    | Does application fail safely and recover?                 |
| Loki outage          | Are logs lost or recovered?                               |
| VM restart           | Do containers automatically recover?                      |
| Higher load          | Where does Podman/app become unstable?                    |
| Resource usage       | CPU/memory/storage behavior                               |
| Jenkins              | Any Podman-specific pipeline issue?                       |
| Docker compatibility | Any command/configuration that doesn't work under Podman? |


1. Step 1 — Verify storage persistence properly:
Run:
echo "=== VOLUMES ==="
podman volume ls

echo ""
echo "=== VOLUME DETAILS ==="
podman volume inspect cube-data
podman volume inspect cube-logs

Then:
echo "=== APPLICATION BEFORE TEST ==="
curl http://localhost:3001

echo ""
echo "=== STORAGE FROM CONTAINER ==="
podman exec cube-root-ms-podman sh -c '
echo "--- /data ---"
ls -lh /data
echo "--- /logs ---"
ls -lh /logs
echo "--- sizes ---"
du -sh /data /logs
'

Then generate some transactions:
TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh

Then immediately check:
podman exec cube-root-ms-podman sh -c '
echo "--- /data ---"
ls -lh /data
echo "--- /logs ---"
ls -lh /logs
echo "--- sizes ---"
du -sh /data /logs
'

2. Step 2 — Container restart persistence:
Run exactly:
echo "=== BEFORE RESTART ==="
podman exec cube-root-ms-podman sh -c '
wc -c /data/transactions.log
wc -c /logs/application.log
'

echo ""
echo "=== RESTART CONTAINER ==="
podman restart cube-root-ms-podman

sleep 5

echo ""
echo "=== AFTER RESTART ==="
podman exec cube-root-ms-podman sh -c '
wc -c /data/transactions.log
wc -c /logs/application.log
'

Then:
podman ps

3. Step 3 — Check the real Podman volume capacity:
Run:
echo "=== PODMAN VM STORAGE ==="
podman machine ssh "df -h /var/home/core/.local/share/containers/storage"

echo ""
echo "=== VOLUME USAGE ==="
podman machine ssh "du -sh /var/home/core/.local/share/containers/storage/volumes/cube-data/_data /var/home/core/.local/share/containers/storage/volumes/cube-logs/_data"

Then:
echo "=== CURRENT FILE SIZES ==="
podman exec cube-root-ms-podman sh -c '
du -h /data/transactions.log
du -h /logs/application.log
'

3. Step 3A — Controlled storage-pressure test:
First check whether the application image has dd:
podman exec cube-root-ms-podman sh -c 'which dd || true'

If it returns a path such as /bin/dd, run:
podman exec cube-root-ms-podman sh -c '
set -e
echo "=== BEFORE ==="
df -h /data

echo "Creating controlled storage pressure..."
dd if=/dev/zero of=/data/storage-pressure-test.bin bs=1M count=1024

echo "=== AFTER ==="
df -h /data
ls -lh /data/storage-pressure-test.bin
'

- This creates only 1 GB, so it is safe relative to the 91 GB free.

Then run:
TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh

Then:
podman exec cube-root-ms-podman sh -c '
echo "=== DATA ==="
ls -lh /data

echo "=== LOGS ==="
ls -lh /logs

echo "=== STORAGE ==="
df -h /data
'

**Conclusion**:
Storage is working correctly under moderate pressure.                                                                           -->*important note*

* what happens when the filesystem has almost no space left. We should test that without filling the entire 100 GB VM:
=====================================================================================================================

Also remove the 1 GB test file now:
podman exec cube-root-ms-podman rm -f /data/storage-pressure-test.bin

Then verify:
podman exec cube-root-ms-podman df -h /data

**Storage test final result**:
1 GB temporary storage pressure created ✅
Application continued processing requests ✅
Transaction data continued growing ✅
Application logs continued growing ✅
Temporary file removed successfully ✅
Storage returned to 9% usage / 90.7 GB available ✅

*Storage finding*: No issue observed under controlled storage pressure. Named Podman volumes are working correctly.

**next main test: Loki outage + log recovery**:

1. Step 1 — Record current log size:
Run:
podman exec cube-root-ms-podman sh -c 'wc -c /logs/application.log'

2. Step 2 — Stop Loki:
Run:
podman stop loki

Then verify:
podman ps --filter name=loki

3. Step 3 — Generate logs while Loki is DOWN:
Run the load test:
TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh

Then immediately check the application's local log size:
podman exec cube-root-ms-podman sh -c 'wc -c /logs/application.log'

- Loki was DOWN. Application still processed 1,000 requests successfully. Local application log increased from 21,883,460 → 21,982,353 bytes.
- So the application does not depend on Loki to continue writing local logs. ✅

4. Step 4 — Start Loki again:
Run:
podman start loki

Then verify:
podman ps --filter name=loki

5. Step 5 — Check Loki for the application logs:
Run:
curl -s "http://localhost:3100/loki/api/v1/labels"

Then:
curl -s "http://localhost:3100/loki/api/v1/query_range?query=%7Bcontainer%3D%22cube-root-ms-podman%22%7D&limit=5"

* We want to determine:
Loki DOWN → logs generated → Loki UP → were those logs eventually shipped to Loki or lost?

**Loki outage test result**:
| Test                                    | Result              |
| --------------------------------------- | ------------------- |
| Loki stopped                            | ✅                   |
| Application continued running           | ✅                   |
| 1,000 requests processed                | ✅                   |
| Local application log continued growing | ✅                   |
| Loki restarted                          | ✅                   |
| Loki query after recovery               | ❌ **No logs found** |

- So logs generated while Loki was down were not recovered into Loki.

6. Before calling this a Podman blocker, we should verify whether the issue is specifically Promtail configuration/behavior, not Podman:
One final check:
Run:
podman ps -a --filter name=promtail

and:
podman logs --tail 50 promtail

* Loki test conclusion:

promtail is not running:
Exited (0) 20 hours ago

- So do not mark this as a Podman blocker.

Step 6 — Start Promtail:
Run:
podman start promtail

Then:
podman ps --filter name=promtail

7. Step 7 — Generate a small amount of traffic
Run:
TOTAL_REQUESTS=100 CONCURRENCY=10 ./scripts/load-test.sh

Then wait about 5 seconds and query Loki:
curl -s "http://localhost:3100/loki/api/v1/query_range?query=%7Bcontainer%3D%22cube-root-ms-podman%22%7D&limit=5"

Now do the real outage test:
        We only need one clean test.
1. Stop Loki
podman stop loki
2. Generate logs while Loki is down
TOTAL_REQUESTS=100 CONCURRENCY=10 ./scripts/load-test.sh
3. Start Loki again
podman start loki
4. Wait 10 seconds
sleep 10
5. Query Loki
curl -s "http://localhost:3100/loki/api/v1/query_range?query=%7Bcontainer%3D%22cube-root-ms-podman%22%7D&limit=5"

* Final verification:
Run:
podman logs --tail 30 promtail

*Conclusion for this POC*: No Podman-specific logging blocker found. The remaining log-recovery behavior is primarily a Promtail/Loki configuration concern, not a Podman storage/runtime issue.

**Next main test: Podman VM restart recovery**:
* We already observed earlier that after:
podman machine stop
podman machine start
* the application container did not automatically restart.
* The reason is the current container has:
RestartPolicy: no
* So this is a configuration/orchestration consideration, not an inherent Podman failure.

**The next test should therefore be the higher controlled load/resource test, which is more important for your high-transaction application**:
Run:
TOTAL_REQUESTS=25000 CONCURRENCY=50 ./scripts/load-test.sh

Then:
podman stats --no-stream cube-root-ms-podman

* Resource result:
Requests: 25,000
Concurrency: 50
Application completed: ✅
Memory: 59 MB / 2.035 GB (2.9%)
CPU: 1.11%
Transactions storage: 19.96 MB
Logs storage: 24.53 MB
No crash/OOM/error observed.

* One final load test:
Run:
TOTAL_REQUESTS=50000 CONCURRENCY=100 ./scripts/load-test.sh

Then:
podman stats --no-stream cube-root-ms-podman

* 50,000 request result:
Requests: 50,000
Concurrency: 100
Completed: ✅
CPU: 2.47%
Memory: 58.26 MB / 2.035 GB (2.86%)
Transactions storage: 24.05 MB
Logs storage: 29.56 MB
PIDs: 18
No crash / OOM / application failure: ✅

**Main POC findings so far**:
| Area                      | Result                  | Finding                                               |
| ------------------------- | ----------------------- | ----------------------------------------------------- |
| Build                     | ✅                       | Podman image builds successfully                      |
| Jenkins                   | ✅                       | Pipeline/deployment tested                            |
| Container restart         | ✅                       | Named volumes preserve data                           |
| Storage pressure          | ✅                       | App continued under 1 GB pressure                     |
| Loki outage               | ✅                       | App continued; local logging continued                |
| Podman VM restart         | ⚠️                      | Containers don't auto-start with current `restart=no` |
| 25K / 50 concurrency      | ✅                       | Stable                                                |
| **50K / 100 concurrency** | ✅                       | Stable                                                |
| Resource usage            | ✅                       | Low CPU/memory in this POC                            |
| Podman-specific blocker   | **None identified yet** | Configuration/recovery items remain                   |

## Main findings for migration:

**Advantages observed**:
- Container build and application deployment worked successfully.
- Jenkins pipeline can be used with the Podman-based workflow.
- Named volumes provide persistent storage across container restart.
- Application remains independent of Loki availability because logs are also written locally.
- Resource usage was low during the tested workloads.
- 50K requests / concurrency 100 completed successfully in the local environment.

**Important considerations**:
- Automatic recovery: Current containers do not automatically restart after Podman VM restart because restart policy is no. Production needs an appropriate restart/orchestration mechanism.
- Logging: Loki itself is not an application dependency, but reliable centralized-log recovery during an outage depends on the Promtail/Loki configuration. - This is not a Podman-specific blocker.
- Storage: The POC uses Podman named volumes inside the Podman VM. Production storage architecture needs to be designed according to the required durability, capacity, backup, and recovery requirements.
- Scale: The local 50K/100 test demonstrates POC stability only. It does not prove production readiness for trillion-scale transactions.
Final conclusion

*Based on the scenarios tested, no critical Podman-specific blocker was found for the application migration POC. The main item requiring production design/configuration is container/service recovery after Podman host/VM restart, along with proper production storage and centralized logging architecture*.

## Terminal Logs:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ./scripts/run-podman.sh
================================
Building Podman image
================================
STEP 1/13: FROM node:18-alpine
STEP 2/13: RUN apk add --no-cache git bash tzdata
--> Using cache 0500c9b414eea66f8e078127852c72f9cf64a9b8a808fe8ce2126269ce71def4
--> 0500c9b414ee
STEP 3/13: ENV TZ=Asia/Calcutta
--> Using cache 5e17c203d28b6c2718c01a64d52a1ff27136591e6b5d993e1a18f5506a96bd17
--> 5e17c203d28b
STEP 4/13: RUN cp /usr/share/zoneinfo/Asia/Calcutta /etc/localtime
--> Using cache 37d5cf7dbff75fe6fd16b83d25666d039dfdbd760f5c5be8dbf6e7361a95b48b
--> 37d5cf7dbff7
STEP 5/13: WORKDIR /app
--> Using cache 80170ba5a55806880ad46717b04838ce8c8a425384e97ea50a005870e4fda9e7
--> 80170ba5a558
STEP 6/13: COPY package*.json ./
--> Using cache 3309564c19c1a1a4297ed3857df2d2cc7be55497f39f541a8211409b2b5a4537
--> 3309564c19c1
STEP 7/13: ARG API_NEWTWELVE_CACHE_BUST_RESYNC
--> Using cache c008fc3130427893053a79536192d6d96de767daddf3549ba059f524acba2276
--> c008fc313042
STEP 8/13: RUN echo "api new twelve bust: $API_NEWTWELVE_CACHE_BUST_RESYNC"
api new twelve bust: 1789706297
--> 54fd3ee94e47
STEP 9/13: RUN npm cache clean --force &&     npm install --legacy-peer-deps --force
npm warn using --force Recommended protections disabled.
npm warn using --force Recommended protections disabled.

added 49 packages, and audited 50 packages in 3s

5 packages are looking for funding
  run `npm fund` for details

2 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
--> 024cb266a530
STEP 10/13: COPY . .
--> 6eee6a81ce1f
STEP 11/13: RUN npm run build

> cube-root-ms-podman-poc@1.0.0 build
> node build.js

Build completed
--> 43b9460f4439
STEP 12/13: EXPOSE 3001
--> 1634c0ba708c
STEP 13/13: CMD ["npm", "start"]
COMMIT cube-root-ms:podman-poc
--> 18e238d46324
Successfully tagged localhost/cube-root-ms:podman-poc
18e238d4632478a532125c217c298f6b92032dd6fe48320365799434e72b9ccb
================================
Creating Podman volumes
================================
================================
Starting container
================================
cube-root-ms-podman
f190c19b000fc2dc90dfb69ae153c7b27f3974a6a3e048846b47cc19c9143a01
Waiting for application...
Podman application is UP
{"status":"UP","engine":"podman","hostname":"f190c19b000f"}%                                  
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND     CREATED        STATUS        PORTS                   NAMES
f190c19b000f  localhost/cube-root-ms:podman-poc  npm start   7 seconds ago  Up 7 seconds  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3001
{"application":"cube-root-ms","poc":true,"message":"Podman migration POC"}%   
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== APPLICATION LOG ==="
tail -20 logs/application.log 2>/dev/null

echo ""
echo "=== TRANSACTION LOG ==="
tail -20 data/transactions.log 2>/dev/null
=== APPLICATION LOG ===

=== TRANSACTION LOG ===
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== PODMAN ==="
podman ps

echo ""
echo "=== RESOURCE USAGE ==="
podman stats --no-stream

echo ""
echo "=== PODMAN DISK ==="
podman system df

echo ""
echo "=== HOST DISK ==="
df -h .

echo ""
echo "=== POC STORAGE ==="
du -sh data logs monitoring/loki 2>/dev/null
=== PODMAN ===
CONTAINER ID  IMAGE                              COMMAND     CREATED             STATUS             PORTS                   NAMES
f190c19b000f  localhost/cube-root-ms:podman-poc  npm start   About a minute ago  Up About a minute  0.0.0.0:3001->3001/tcp  cube-root-ms-podman

=== RESOURCE USAGE ===
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO          BLOCK IO           PIDS        CPU TIME    AVG CPU %
f190c19b000f  cube-root-ms-podman  0.47%       34.54MB / 2.035GB  1.70%       1.836kB / 838B  12.29kB / 4.096kB  18          442.192ms   0.47%

=== PODMAN DISK ===
Error: failed to get read/write size of container b49ea2614a7c99ccadc60b2c5ae9a67b0d083fbdfa0d5277cbbc89b7c7f9aa4e: lstat /run/user/501/libpod/tmp/infra-container: no such file or directory

=== HOST DISK ===
Filesystem      Size    Used   Avail Capacity iused ifree %iused  Mounted on
/dev/disk3s5   460Gi   193Gi   242Gi    45%    5.6M  2.5G    0%   /System/Volumes/Data

=== POC STORAGE ===
  0B    data
  0B    logs
keerthana@Keerthanas-MacBook-Air podman-migration-poc % cat scripts/storage-test.sh
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

echo "Storage persistence test PASSED"%                                                       
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ./scripts/storage-test.sh
================================
Storage Persistence Test
================================
./scripts/storage-test.sh: line 11: data/transactions.log: No such file or directory
Transactions before restart: 0
cube-root-ms-podman
./scripts/storage-test.sh: line 27: data/transactions.log: No such file or directory
Transactions after restart: 0
Storage persistence test PASSED
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
podman stats --no-stream

echo "=== STORAGE ==="
du -sh data logs monitoring/loki 2>/dev/null

echo "=== ERRORS ==="
grep -iE "error|fail|no space|disk" logs/application.log | tail -30
CONTAINER ID  IMAGE                              COMMAND     CREATED        STATUS        PORTS                   NAMES
f190c19b000f  localhost/cube-root-ms:podman-poc  npm start   2 minutes ago  Up 7 seconds  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO         BLOCK IO    PIDS        CPU TIME    AVG CPU %
f190c19b000f  cube-root-ms-podman  4.98%       42.75MB / 2.035GB  2.10%       1.58kB / 628B  0B / 0B     18          339.555ms   4.98%
=== STORAGE ===
  0B    data
  0B    logs
=== ERRORS ===
grep: logs/application.log: No such file or directory
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps -a --format "{{.ID}} {{.Image}} {{.Names}}"
b49ea2614a7c  f31df1fb1106-infra
d8e2559e5602 localhost/podman-poc-app:pod podman-app
cf0aa34751bb docker.io/library/mongo:8 podman-mongodb
c3cc372c14a2  0625b91c0000-infra
36d65eaeda31 docker.io/library/mongo:7 mern-mongodb
12795a7ef310 localhost/user-service:latest mern-user-service
0edb28ddb9fd localhost/product-service:latest mern-product-service
827fc97a8dcc localhost/api-gateway:latest mern-api-gateway
4e47e20fb91b localhost/cube-transaction-ms:test cube-transaction-test
9f570c521139 docker.io/grafana/promtail:3.5.0 promtail
739916f94c1c docker.io/grafana/loki:3.5.0 loki
3a66b0a18650 docker.io/grafana/grafana:12.1.1 grafana
f190c19b000f localhost/cube-root-ms:podman-poc cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stop loki
loki
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 1000
Concurrency  : 10

Load test completed

Application metrics:
{"pid":13,"uptime":78.435255189,"memory":{"rss":64761856,"heapUsed":12146832,"heapTotal":15777792},"storage":{"transactionsBytes":17657656,"logsBytes":21685674}}%                          
keerthana@Keerthanas-MacBook-Air podman-migration-poc % tail -30 logs/application.log
tail: logs/application.log: No such file or directory
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman start loki
loki
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED        STATUS             PORTS                   NAMES
739916f94c1c  docker.io/grafana/loki:3.5.0       -config.file=/etc...  19 hours ago   Up 4 seconds       0.0.0.0:3100->3100/tcp  loki
f190c19b000f  localhost/cube-root-ms:podman-poc  npm start             3 minutes ago  Up About a minute  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman machine stop
Machine "podman-machine-default" stopped successfully
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman machine start
Starting machine "podman-machine-default"

This machine is currently configured in rootless mode. If your containers
require root permissions (e.g. ports < 1024), or if you run into compatibility
issues with non-podman clients, you can switch using the following command:

        podman machine set --rootful

API forwarding listening on: /var/folders/vs/93wqfx315h3d4x4ghb4508mr0000gn/T/podman/podman-machine-default-api.sock

The system helper service is not installed; the default Docker API socket
address can't be used by podman. If you would like to install it, run the following commands:

        sudo /opt/homebrew/Cellar/podman/6.1.1/bin/podman-mac-helper install
        podman machine stop; podman machine start

You can still connect Docker API clients by setting DOCKER_HOST using the
following command in your terminal session:

        export DOCKER_HOST='unix:///var/folders/vs/93wqfx315h3d4x4ghb4508mr0000gn/T/podman/podman-machine-default-api.sock'

Machine "podman-machine-default" started successfully
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE       COMMAND     CREATED     STATUS      PORTS       NAMES
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ./scripts/run-podman.sh
================================
Building Podman image
================================
STEP 1/13: FROM node:18-alpine
STEP 2/13: RUN apk add --no-cache git bash tzdata
--> Using cache 0500c9b414eea66f8e078127852c72f9cf64a9b8a808fe8ce2126269ce71def4
--> 0500c9b414ee
STEP 3/13: ENV TZ=Asia/Calcutta
--> Using cache 5e17c203d28b6c2718c01a64d52a1ff27136591e6b5d993e1a18f5506a96bd17
--> 5e17c203d28b
STEP 4/13: RUN cp /usr/share/zoneinfo/Asia/Calcutta /etc/localtime
--> Using cache 37d5cf7dbff75fe6fd16b83d25666d039dfdbd760f5c5be8dbf6e7361a95b48b
--> 37d5cf7dbff7
STEP 5/13: WORKDIR /app
--> Using cache 80170ba5a55806880ad46717b04838ce8c8a425384e97ea50a005870e4fda9e7
--> 80170ba5a558
STEP 6/13: COPY package*.json ./
--> Using cache 3309564c19c1a1a4297ed3857df2d2cc7be55497f39f541a8211409b2b5a4537
--> 3309564c19c1
STEP 7/13: ARG API_NEWTWELVE_CACHE_BUST_RESYNC
--> Using cache c008fc3130427893053a79536192d6d96de767daddf3549ba059f524acba2276
--> c008fc313042
STEP 8/13: RUN echo "api new twelve bust: $API_NEWTWELVE_CACHE_BUST_RESYNC"
api new twelve bust: 1789706803
--> a19df8d21685
STEP 9/13: RUN npm cache clean --force &&     npm install --legacy-peer-deps --force
npm warn using --force Recommended protections disabled.
npm warn using --force Recommended protections disabled.

added 49 packages, and audited 50 packages in 2s

5 packages are looking for funding
  run `npm fund` for details

2 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
--> e8b8bcbb763c
STEP 10/13: COPY . .
--> 98df983feb1a
STEP 11/13: RUN npm run build

> cube-root-ms-podman-poc@1.0.0 build
> node build.js

Build completed
--> 4fda395d138d
STEP 12/13: EXPOSE 3001
--> ef2507a963ca
STEP 13/13: CMD ["npm", "start"]
COMMIT cube-root-ms:podman-poc
--> 2d5ff50d5a56
Successfully tagged localhost/cube-root-ms:podman-poc
2d5ff50d5a56d2512beec175765a0335e9a5d17cbc0842e65344d7cb323a61af
================================
Creating Podman volumes
================================
================================
Starting container
================================
cube-root-ms-podman
7c1d2f4789da711b0d91ab7cd642fa60b36800bfa9e7d0851e87bd4e244d5fd7
Waiting for application...
Podman application is UP
{"status":"UP","engine":"podman","hostname":"7c1d2f4789da"}%                                                                                      
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND     CREATED        STATUS        PORTS                   NAMES
7c1d2f4789da  localhost/cube-root-ms:podman-poc  npm start   3 seconds ago  Up 4 seconds  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== CURRENT CONTAINER ==="
podman inspect cube-root-ms-podman --format '{{.Name}} {{.State.Status}} {{.HostConfig.RestartPolicy.Name}}'

echo ""
echo "=== MOUNTS ==="
podman inspect cube-root-ms-podman --format '{{range .Mounts}}{{.Source}} -> {{.Destination}}{{println}}{{end}}'

echo ""
echo "=== ENVIRONMENT ==="
podman inspect cube-root-ms-podman --format '{{range .Config.Env}}{{println .}}{{end}}'
=== CURRENT CONTAINER ===
cube-root-ms-podman running no

=== MOUNTS ===
/var/home/core/.local/share/containers/storage/volumes/cube-data/_data -> /data
/var/home/core/.local/share/containers/storage/volumes/cube-logs/_data -> /logs


=== ENVIRONMENT ===
YARN_VERSION=1.22.22
TZ=Asia/Calcutta
CONTAINER_ENGINE=podman
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
container=podman
NODE_VERSION=18.20.8
HOME=/root
HOSTNAME=7c1d2f4789da

keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== VOLUMES ==="
podman volume ls

echo ""
echo "=== VOLUME DETAILS ==="
podman volume inspect cube-data
podman volume inspect cube-logs
=== VOLUMES ===
DRIVER      VOLUME NAME
local       1b867a28dfe8ed4ff77c1d9d5731a4f990c0a7682fa4d9c2615d507ab3ac9472
local       675f9b3ba8b73a864650d2cc1851d3caf72e59b7c17ad19a3090de63c3fe5962
local       83a6b379d6d6f878e3dcb4ea84c9aa47b62ad83fefa0ca9c3d01dcd630fe2abc
local       f594b5f1e2d0c8d692d9786ba8c785f17d6502db689effaaf4ba242bbd075208
local       e019027b6ab11325529b1e76409684910bb07d1c7ea16d5b74e1c3a720f6b93d
local       8984a1bd87889753c678c6bf5b097d2f506e8e74bf326da4f1f34e8e8d3fe573
local       3bb81a31cf3ff628348f223c86ccd9437c81258d90c9c50d654c4b76114f6068
local       a996b13879280adb16afc7bc3f270f49dc489ba050339be2b099ce7008046ba1
local       mongo-data
local       ebd48854f0095dd37d240117ba28ca5044a29c68a6d98355f30f0854f02cb75a
local       1ec81eacb9fc2c1a4c8572c45ce11a21fef015cca8567cc96b23e33f85ca9bc8
local       4c8dc3d870ff03d4892e16c98d160314b7693b27636fed00abf842c3e304f26d
local       mongo_data
local       20e757ba63c5b78e244c01d40d6fcee2cc0453574b977ac9b798b2cfa5db08ba
local       cube-data
local       cube-logs

=== VOLUME DETAILS ===
[
     {
          "Name": "cube-data",
          "Driver": "local",
          "Mountpoint": "/var/home/core/.local/share/containers/storage/volumes/cube-data/_data",
          "CreatedAt": "2026-09-16T11:12:47.748335904+05:30",
          "Labels": {},
          "Scope": "local",
          "Options": {},
          "MountCount": 0,
          "NeedsCopyUp": true,
          "LockNumber": 25
     }
]
[
     {
          "Name": "cube-logs",
          "Driver": "local",
          "Mountpoint": "/var/home/core/.local/share/containers/storage/volumes/cube-logs/_data",
          "CreatedAt": "2026-09-16T11:12:47.86856846+05:30",
          "Labels": {},
          "Scope": "local",
          "Options": {},
          "MountCount": 0,
          "NeedsCopyUp": true,
          "LockNumber": 26
     }
]
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== APPLICATION BEFORE TEST ==="
curl http://localhost:3001

echo ""
echo "=== STORAGE FROM CONTAINER ==="
podman exec cube-root-ms-podman sh -c '
echo "--- /data ---"
ls -lh /data
echo "--- /logs ---"
ls -lh /logs
echo "--- sizes ---"
du -sh /data /logs
'
=== APPLICATION BEFORE TEST ===
{"application":"cube-root-ms","poc":true,"message":"Podman migration POC"}
=== STORAGE FROM CONTAINER ===
--- /data ---
total 17M    
-rw-r--r--    1 root     root       16.8M Sep 18 10:11 transactions.log
--- /logs ---
total 21M    
-rw-r--r--    1 root     root       20.7M Sep 18 10:11 application.log
--- sizes ---
16.8M   /data
20.7M   /logs
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 1000
Concurrency  : 10

Load test completed

Application metrics:
{"pid":13,"uptime":140.702435205,"memory":{"rss":64806912,"heapUsed":12729264,"heapTotal":15777792},"storage":{"transactionsBytes":17737549,"logsBytes":21784567}}%                                                                                                                                 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman sh -c '
echo "--- /data ---"
ls -lh /data
echo "--- /logs ---"
ls -lh /logs
echo "--- sizes ---"
du -sh /data /logs
'
--- /data ---
total 17M    
-rw-r--r--    1 root     root       16.9M Sep 18 10:19 transactions.log
--- /logs ---
total 21M    
-rw-r--r--    1 root     root       20.8M Sep 18 10:19 application.log
--- sizes ---
16.9M   /data
20.9M   /logs
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== BEFORE RESTART ==="
podman exec cube-root-ms-podman sh -c '
wc -c /data/transactions.log
wc -c /logs/application.log
'

echo ""
echo "=== RESTART CONTAINER ==="
podman restart cube-root-ms-podman

sleep 5

echo ""
echo "=== AFTER RESTART ==="
podman exec cube-root-ms-podman sh -c '
wc -c /data/transactions.log
wc -c /logs/application.log
'
=== BEFORE RESTART ===
17737549 /data/transactions.log
21784567 /logs/application.log

=== RESTART CONTAINER ===
cube-root-ms-podman

=== AFTER RESTART ===
17737549 /data/transactions.log
21784567 /logs/application.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND     CREATED         STATUS         PORTS                   NAMES
7c1d2f4789da  localhost/cube-root-ms:podman-poc  npm start   17 minutes ago  Up 15 seconds  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== PODMAN VM STORAGE ==="
podman machine ssh "df -h /var/home/core/.local/share/containers/storage"

echo ""
echo "=== VOLUME USAGE ==="
podman machine ssh "du -sh /var/home/core/.local/share/containers/storage/volumes/cube-data/_data /var/home/core/.local/share/containers/storage/volumes/cube-logs/_data"
=== PODMAN VM STORAGE ===
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda4       100G  8.8G   91G   9% /var

=== VOLUME USAGE ===
17M     /var/home/core/.local/share/containers/storage/volumes/cube-data/_data
21M     /var/home/core/.local/share/containers/storage/volumes/cube-logs/_data
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== CURRENT FILE SIZES ==="
podman exec cube-root-ms-podman sh -c '
du -h /data/transactions.log
du -h /logs/application.log
'
=== CURRENT FILE SIZES ===
16.9M   /data/transactions.log
20.8M   /logs/application.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman sh -c 'which dd || true'
/bin/dd
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman sh -c '
set -e
echo "=== BEFORE ==="
df -h /data

echo "Creating controlled storage pressure..."
dd if=/dev/zero of=/data/storage-pressure-test.bin bs=1M count=1024

echo "=== AFTER ==="
df -h /data
ls -lh /data/storage-pressure-test.bin
'
=== BEFORE ===
Filesystem                Size      Used Available Use% Mounted on
/dev/vda4                99.4G      8.7G     90.7G   9% /data
Creating controlled storage pressure...
1024+0 records in
1024+0 records out
1073741824 bytes (1.0GB) copied, 0.457494 seconds, 2.2GB/s
=== AFTER ===
Filesystem                Size      Used Available Use% Mounted on
/dev/vda4                99.4G      9.7G     89.7G  10% /data
-rw-r--r--    1 root     root        1.0G Sep 18 10:46 /data/storage-pressure-test.bin
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 1000
Concurrency  : 10

Load test completed

Application metrics:
{"pid":13,"uptime":745.243735543,"memory":{"rss":65036288,"heapUsed":12568928,"heapTotal":16039936},"storage":{"transactionsBytes":17817442,"logsBytes":21883460}}%                                                                                                                                 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman sh -c '
echo "=== DATA ==="
ls -lh /data

echo "=== LOGS ==="
ls -lh /logs

echo "=== STORAGE ==="
df -h /data
'
=== DATA ===
total 1G     
-rw-r--r--    1 root     root        1.0G Sep 18 10:46 storage-pressure-test.bin
-rw-r--r--    1 root     root       17.0M Sep 18 10:46 transactions.log
=== LOGS ===
total 21M    
-rw-r--r--    1 root     root       20.9M Sep 18 10:46 application.log
=== STORAGE ===
Filesystem                Size      Used Available Use% Mounted on
/dev/vda4                99.4G      9.7G     89.7G  10% /data
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman rm -f /data/storage-pressure-test.bin
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman df -h /data
Filesystem                Size      Used Available Use% Mounted on
/dev/vda4                99.4G      8.7G     90.7G   9% /data
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman sh -c 'wc -c /logs/application.log'
21883460 /logs/application.log
eerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stop loki
loki
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps --filter name=loki
CONTAINER ID  IMAGE       COMMAND     CREATED     STATUS      PORTS       NAMES
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 1000
Concurrency  : 10

Load test completed

Application metrics:
{"pid":13,"uptime":1091.851276227,"memory":{"rss":64700416,"heapUsed":14058056,"heapTotal":16039936},"storage":{"transactionsBytes":17897335,"logsBytes":21982353}}%                                                                                                                                
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman sh -c 'wc -c /logs/application.log'
21982353 /logs/application.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc %
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman start loki
loki
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps --filter name=loki
CONTAINER ID  IMAGE                         COMMAND               CREATED       STATUS        PORTS                   NAMES
739916f94c1c  docker.io/grafana/loki:3.5.0  -config.file=/etc...  20 hours ago  Up 3 seconds  0.0.0.0:3100->3100/tcp  loki
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -s "http://localhost:3100/loki/api/v1/labels"
{"status":"success","data":["container","engine","filename","job","service_name"]}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -s "http://localhost:3100/loki/api/v1/query_range?query=%7Bcontainer%3D%22cube-root-ms-podman%22%7D&limit=5"
{"status":"success","data":{"resultType":"streams","result":[],"stats":{"summary":{"bytesProcessedPerSecond":0,"linesProcessedPerSecond":0,"totalBytesProcessed":0,"totalLinesProcessed":0,"execTime":0.007025,"queueTime":0.000382,"subqueries":0,"totalEntriesReturned":0,"splits":2,"shards":2,"totalPostFilterLines":0,"totalStructuredMetadataBytesProcessed":0},"querier":{"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":0,"headChunkLines":0,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":0,"headChunkStructuredMetadataBytes":0,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":0,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"ingester":{"totalReached":2,"totalChunksMatched":0,"totalBatches":2,"totalLinesSent":0,"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":0,"headChunkLines":0,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":0,"headChunkStructuredMetadataBytes":0,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":210250,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"cache":{"chunk":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"index":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"result":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"statsResult":{"entriesFound":0,"entriesRequested":1,"entriesStored":1,"bytesReceived":0,"bytesSent":0,"requests":2,"downloadTime":7000,"queryLengthServed":0},"volumeResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"seriesResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"labelResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"instantMetricResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0}},"index":{"totalChunks":0,"postFilterChunks":0,"shardsDuration":0,"usedBloomFilters":false}}}}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps -a --filter name=promtail
CONTAINER ID  IMAGE                             COMMAND               CREATED       STATUS                   PORTS       NAMES
9f570c521139  docker.io/grafana/promtail:3.5.0  -config.file=/etc...  20 hours ago  Exited (0) 20 hours ago              promtail
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman logs --tail 50 promtail
level=info ts=2026-09-17T09:33:24.541864095Z caller=promtail.go:135 msg="Reloading configuration file" sha3sum=416ab509ce8b7b1d53edeae9e2288c42cf7f144ea2cd5b5d467cbf228f37b28a
level=info ts=2026-09-17T09:33:24.548790389Z caller=server.go:368 msg="server listening on addresses" http=[::]:9080 grpc=[::]:43087
level=info ts=2026-09-17T09:33:24.548916222Z caller=main.go:173 msg="Starting Promtail" version="(version=3.5.0, branch=k248, revision=4b16bc4f)"
level=warn ts=2026-09-17T09:33:24.549054431Z caller=promtail.go:265 msg="enable watchConfig"
level=info ts=2026-09-17T09:33:29.549686857Z caller=filetargetmanager.go:373 msg="Adding target" key="/logs/application.log:{container=\"cube-root-ms-podman\", engine=\"podman\", job=\"podman-application\"}"
level=info ts=2026-09-17T09:33:29.550225232Z caller=filetarget.go:343 msg="watching new directory" directory=/logs
level=info ts=2026-09-17T09:33:29.55336015Z caller=tailer.go:147 component=tailer msg="tail routine: started" path=/logs/application.log
ts=2026-09-17T09:33:29.553444358Z caller=log.go:168 level=info msg="Seeked /logs/application.log - &{Offset:332 Whence:0}"
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman start promtail
promtail
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps --filter name=promtail
CONTAINER ID  IMAGE                             COMMAND               CREATED       STATUS        PORTS       NAMES
9f570c521139  docker.io/grafana/promtail:3.5.0  -config.file=/etc...  20 hours ago  Up 4 seconds              promtail
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=100 CONCURRENCY=10 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 100
Concurrency  : 10

Load test completed

Application metrics:
{"pid":13,"uptime":1612.257874406,"memory":{"rss":63614976,"heapUsed":14282584,"heapTotal":15253504},"storage":{"transactionsBytes":17905227,"logsBytes":21992145}}%                                                                                                                                
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -s "http://localhost:3100/loki/api/v1/query_range?query=%7Bcontainer%3D%22cube-root-ms-podman%22%7D&limit=5"
{"status":"success","data":{"resultType":"streams","result":[{"stream":{"__stream_shard__":"1","container":"cube-root-ms-podman","detected_level":"unknown","engine":"podman","filename":"/logs/application.log","job":"podman-application","service_name":"cube-root-ms-podman"},"values":[["1789709401630396935","{\"timestamp\":\"2026-09-17T11:29:21.560Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-50000\"}"],["1789709401630391476","{\"timestamp\":\"2026-09-17T11:29:21.547Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-49998\"}"],["1789709401630389101","{\"timestamp\":\"2026-09-17T11:29:21.533Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-49996\"}"]]},{"stream":{"__stream_shard__":"0","container":"cube-root-ms-podman","detected_level":"unknown","engine":"podman","filename":"/logs/application.log","job":"podman-application","service_name":"cube-root-ms-podman"},"values":[["1789709401630394185","{\"timestamp\":\"2026-09-17T11:29:21.553Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-49999\"}"],["1789709401630389851","{\"timestamp\":\"2026-09-17T11:29:21.540Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-49997\"}"]]}],"stats":{"summary":{"bytesProcessedPerSecond":72521027,"linesProcessedPerSecond":612532,"totalBytesProcessed":700782,"totalLinesProcessed":5919,"execTime":0.009663,"queueTime":0.000061,"subqueries":0,"totalEntriesReturned":5,"splits":1,"shards":1,"totalPostFilterLines":5919,"totalStructuredMetadataBytesProcessed":79582},"querier":{"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":0,"headChunkLines":0,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":0,"headChunkStructuredMetadataBytes":0,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":0,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"ingester":{"totalReached":1,"totalChunksMatched":2,"totalBatches":1,"totalLinesSent":5,"store":{"totalChunksRef":1,"totalChunksDownloaded":1,"chunksDownloadTime":559878,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":481032,"headChunkLines":4454,"decompressedBytes":219750,"decompressedLines":1465,"compressedBytes":563059,"totalDuplicates":0,"postFilterLines":5919,"headChunkStructuredMetadataBytes":35632,"decompressedStructuredMetadataBytes":43950},"chunkRefsFetchTime":135792,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"cache":{"chunk":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"index":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"result":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"statsResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"volumeResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"seriesResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"labelResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"instantMetricResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0}},"index":{"totalChunks":0,"postFilterChunks":0,"shardsDuration":0,"usedBloomFilters":false}}}}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stop loki
loki
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=100 CONCURRENCY=10 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 100
Concurrency  : 10

Load test completed

Application metrics:
{"pid":13,"uptime":1726.520688545,"memory":{"rss":63254528,"heapUsed":13924096,"heapTotal":15253504},"storage":{"transactionsBytes":17921011,"logsBytes":22011729}}%                                                                                                                                
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman start loki
loki
keerthana@Keerthanas-MacBook-Air podman-migration-poc % sleep 10
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -s "http://localhost:3100/loki/api/v1/query_range?query=%7Bcontainer%3D%22cube-root-ms-podman%22%7D&limit=5"
{"status":"success","data":{"resultType":"streams","result":[{"stream":{"__stream_shard__":"1","container":"cube-root-ms-podman","detected_level":"unknown","engine":"podman","filename":"/logs/application.log","job":"podman-application","service_name":"cube-root-ms-podman"},"values":[["1789709401630396935","{\"timestamp\":\"2026-09-17T11:29:21.560Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-50000\"}"],["1789709401630391476","{\"timestamp\":\"2026-09-17T11:29:21.547Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-49998\"}"],["1789709401630389101","{\"timestamp\":\"2026-09-17T11:29:21.533Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-49996\"}"]]},{"stream":{"__stream_shard__":"0","container":"cube-root-ms-podman","detected_level":"unknown","engine":"podman","filename":"/logs/application.log","job":"podman-application","service_name":"cube-root-ms-podman"},"values":[["1789709401630394185","{\"timestamp\":\"2026-09-17T11:29:21.553Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-49999\"}"],["1789709401630389851","{\"timestamp\":\"2026-09-17T11:29:21.540Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-49997\"}"]]}],"stats":{"summary":{"bytesProcessedPerSecond":39154457,"linesProcessedPerSecond":336572,"totalBytesProcessed":859002,"totalLinesProcessed":7384,"execTime":0.021939,"queueTime":0.000074,"subqueries":0,"totalEntriesReturned":5,"splits":1,"shards":1,"totalPostFilterLines":7384,"totalStructuredMetadataBytesProcessed":91302},"querier":{"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":0,"headChunkLines":0,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":0,"headChunkStructuredMetadataBytes":0,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":0,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"ingester":{"totalReached":1,"totalChunksMatched":3,"totalBatches":1,"totalLinesSent":5,"store":{"totalChunksRef":1,"totalChunksDownloaded":1,"chunksDownloadTime":9818215,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":639252,"headChunkLines":5919,"decompressedBytes":219750,"decompressedLines":1465,"compressedBytes":1061245,"totalDuplicates":0,"postFilterLines":7384,"headChunkStructuredMetadataBytes":47352,"decompressedStructuredMetadataBytes":43950},"chunkRefsFetchTime":164750,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"cache":{"chunk":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"index":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"result":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"statsResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"volumeResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"seriesResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"labelResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"instantMetricResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0}},"index":{"totalChunks":0,"postFilterChunks":0,"shardsDuration":0,"usedBloomFilters":false}}}}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman logs --tail 30 promtail
level=info ts=2026-09-17T09:33:24.541864095Z caller=promtail.go:135 msg="Reloading configuration file" sha3sum=416ab509ce8b7b1d53edeae9e2288c42cf7f144ea2cd5b5d467cbf228f37b28a
level=info ts=2026-09-17T09:33:24.548790389Z caller=server.go:368 msg="server listening on addresses" http=[::]:9080 grpc=[::]:43087
level=info ts=2026-09-17T09:33:24.548916222Z caller=main.go:173 msg="Starting Promtail" version="(version=3.5.0, branch=k248, revision=4b16bc4f)"
level=warn ts=2026-09-17T09:33:24.549054431Z caller=promtail.go:265 msg="enable watchConfig"
level=info ts=2026-09-17T09:33:29.549686857Z caller=filetargetmanager.go:373 msg="Adding target" key="/logs/application.log:{container=\"cube-root-ms-podman\", engine=\"podman\", job=\"podman-application\"}"
level=info ts=2026-09-17T09:33:29.550225232Z caller=filetarget.go:343 msg="watching new directory" directory=/logs
level=info ts=2026-09-17T09:33:29.55336015Z caller=tailer.go:147 component=tailer msg="tail routine: started" path=/logs/application.log
ts=2026-09-17T09:33:29.553444358Z caller=log.go:168 level=info msg="Seeked /logs/application.log - &{Offset:332 Whence:0}"
level=info ts=2026-09-18T05:29:55.96735223Z caller=promtail.go:135 msg="Reloading configuration file" sha3sum=416ab509ce8b7b1d53edeae9e2288c42cf7f144ea2cd5b5d467cbf228f37b28a
level=info ts=2026-09-18T05:29:55.973162874Z caller=server.go:368 msg="server listening on addresses" http=[::]:9080 grpc=[::]:36333
level=info ts=2026-09-18T05:29:55.973274291Z caller=main.go:173 msg="Starting Promtail" version="(version=3.5.0, branch=k248, revision=4b16bc4f)"
level=warn ts=2026-09-18T05:29:55.973377583Z caller=promtail.go:265 msg="enable watchConfig"
level=info ts=2026-09-18T05:30:00.973046698Z caller=filetargetmanager.go:373 msg="Adding target" key="/logs/application.log:{container=\"cube-root-ms-podman\", engine=\"podman\", job=\"podman-application\"}"
level=info ts=2026-09-18T05:30:00.98670245Z caller=filetarget.go:343 msg="watching new directory" directory=/logs
level=info ts=2026-09-18T05:30:00.988114038Z caller=tailer.go:147 component=tailer msg="tail routine: started" path=/logs/application.log
ts=2026-09-18T05:30:00.988228496Z caller=log.go:168 level=info msg="Seeked /logs/application.log - &{Offset:448 Whence:0}"
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=25000 CONCURRENCY=50 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 25000
Concurrency  : 50

Load test completed

Application metrics:
{"pid":13,"uptime":2215.889636288,"memory":{"rss":82640896,"heapUsed":20779696,"heapTotal":35176448},"storage":{"transactionsBytes":19959905,"logsBytes":24525623}}%                                                                                                                                
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream cube-root-ms-podman
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO           BLOCK IO           PIDS        CPU TIME    AVG CPU%
7c1d2f4789da  cube-root-ms-podman  1.11%       59.04MB / 2.035GB  2.90%       2.7kB / 1.188kB  106.5kB / 1.074GB  18          25.370699s  1.11%
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=50000 CONCURRENCY=100 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 50000
Concurrency  : 100

Load test completed

Application metrics:
{"pid":13,"uptime":2603.02916466,"memory":{"rss":82087936,"heapUsed":14333912,"heapTotal":33865728},"storage":{"transactionsBytes":24048799,"logsBytes":29564517}}%                                                                                                                                 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream cube-root-ms-podman
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO           BLOCK IO           PIDS        CPU TIME     AVG CPU %
7c1d2f4789da  cube-root-ms-podman  2.47%       58.26MB / 2.035GB  2.86%       2.7kB / 1.188kB  106.5kB / 1.082GB  18          1m4.524399s  2.47%
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

