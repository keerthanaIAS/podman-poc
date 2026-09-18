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
