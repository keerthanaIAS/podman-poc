keerthana@Mac-89 docker-vs-podman-poc % ls -lh
total 24
-rw-r--r--@ 1 keerthana  staff   107B Sep 23 10:19 Dockerfile
-rw-r--r--@ 1 keerthana  staff   131B Sep 23 10:19 package.json
-rw-r--r--@ 1 keerthana  staff   542B Sep 23 10:19 server.js
keerthana@Mac-89 docker-vs-podman-poc % docker --version
podman --version
Docker version 29.8.0, build 88096ef
podman version 6.1.1
keerthana@Mac-89 docker-vs-podman-poc %
keerthana@Mac-89 docker-vs-podman-poc % docker info >/dev/null && echo "Docker: OK"
podman info >/dev/null && echo "Podman: OK"
Docker: OK
Podman: OK
keerthana@Mac-89 docker-vs-podman-poc % 

# Test 1 — Build + image size:
keerthana@Mac-89 docker-vs-podman-poc % echo "===== DOCKER BUILD ====="
time docker build --no-cache -t docker-vs-podman:docker .
===== DOCKER BUILD =====
[+] Building 3.2s (10/10) FINISHED                                                                                      docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                                    0.0s
 => => transferring dockerfile: 144B                                                                                                    0.0s
 => [internal] load metadata for docker.io/library/node:18-alpine                                                                       3.0s
 => [auth] library/node:pull token for registry-1.docker.io                                                                             0.0s
 => [internal] load .dockerignore                                                                                                       0.0s
 => => transferring context: 2B                                                                                                         0.0s
 => [1/4] FROM docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e                 0.0s
 => => resolve docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e                 0.0s
 => [internal] load build context                                                                                                       0.0s
 => => transferring context: 754B                                                                                                       0.0s
 => CACHED [2/4] WORKDIR /app                                                                                                           0.0s
 => [3/4] COPY package.json .                                                                                                           0.0s
 => [4/4] COPY server.js .                                                                                                              0.0s
 => exporting to image                                                                                                                  0.1s
 => => exporting layers                                                                                                                 0.0s
 => => exporting manifest sha256:d61a73167dc3df71a95ae4d339903dd12f1e1bbdb789aed8da81903eb45d13d4                                       0.0s
 => => exporting config sha256:8c98c92262cd50798b43a6a3090369be21f73b15a5ac1adf0632b0a2501e92f8                                         0.0s
 => => exporting attestation manifest sha256:7a1135a7343bdcf0a068c6bf22488ac8e40b933033466d9a5777a010d89b61f3                           0.0s
 => => exporting manifest list sha256:c62292dbd2aff2f9233d71ce12521bc5878a9d5936031c6c735b61b72882ac04                                  0.0s
 => => naming to docker.io/library/docker-vs-podman:docker                                                                              0.0s
 => => unpacking to docker.io/library/docker-vs-podman:docker                                                                           0.0s

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/kcc42g7nuurm0jk2wn60f9mi1
docker build --no-cache -t docker-vs-podman:docker .  0.20s user 0.26s system 11% cpu 3.967 total
keerthana@Mac-89 docker-vs-podman-poc % echo "===== DOCKER IMAGE ====="
docker image inspect docker-vs-podman:docker \
  --format 'Size={{.Size}} bytes'
===== DOCKER IMAGE =====
Size=179538259 bytes
keerthana@Mac-89 docker-vs-podman-poc % docker images docker-vs-podman:docker
                                                                                                                         i Info →   U  In Use
IMAGE                     ID             DISK USAGE   CONTENT SIZE   EXTRA
docker-vs-podman:docker   c62292dbd2af        180MB         44.9MB        
keerthana@Mac-89 docker-vs-podman-poc % echo "===== PODMAN BUILD ====="
time podman build --no-cache -t localhost/docker-vs-podman:podman .
===== PODMAN BUILD =====
STEP 1/6: FROM node:18-alpine
STEP 2/6: WORKDIR /app
--> 1a2fd1c87424
STEP 3/6: COPY package.json .
--> 142a4f5eb64f
STEP 4/6: COPY server.js .
--> 48405efc0b28
STEP 5/6: EXPOSE 3000
--> 3978fc0ec2be
STEP 6/6: CMD ["npm", "start"]
COMMIT localhost/docker-vs-podman:podman
--> 1f2be5606bc0
Successfully tagged localhost/docker-vs-podman:podman
1f2be5606bc023076a5fb52d71cf9e951ecb3a4b6e809efce1ab27b83ac9410c
podman build --no-cache -t localhost/docker-vs-podman:podman .  0.05s user 0.04s system 6% cpu 1.369 total
keerthana@Mac-89 docker-vs-podman-poc % echo "===== PODMAN IMAGE ====="
podman image inspect localhost/docker-vs-podman:podman \
  --format 'Size={{.Size}} bytes'
===== PODMAN IMAGE =====
Size=128027658 bytes
keerthana@Mac-89 docker-vs-podman-poc % podman images localhost/docker-vs-podman
REPOSITORY                  TAG         IMAGE ID      CREATED        SIZE
localhost/docker-vs-podman  podman      1f2be5606bc0  7 seconds ago  128 MB
keerthana@Mac-89 docker-vs-podman-poc % 

* Why --no-cache? Because we want a fair first-build comparison. Otherwise one engine might already have cached layers and the build-time result becomes misleading.

* Test 1 result:
| Metric                 |       Docker |       Podman |              Difference |
| ---------------------- | -----------: | -----------: | ----------------------: |
| Build time             |   **3.97 s** |   **1.37 s** |    Podman ~2.6 s faster |
| Image size (`inspect`) | **179.5 MB** | **128.0 MB** | Podman ~51.5 MB smaller |
| Reported image size    |   **180 MB** |   **128 MB** |          Podman smaller |

* But don't conclude Podman is inherently faster/smaller from this one test. The Docker build had to pull/resolve node:18-alpine during this run, which accounts for most of its 3 seconds. Podman may already have the base image locally.


## Test 2 — Runtime: startup + CPU + memory:
keerthana@Mac-89 docker-vs-podman-poc % echo "===== DOCKER START ====="
docker rm -f compare-docker 2>/dev/null || true

START=$(date +%s%N)
docker run -d \
  --name compare-docker \
  -p 3101:3000 \
  -e CONTAINER_ENGINE=docker \
  docker-vs-podman:docker
END=$(date +%s%N)

echo "Docker startup command time: $(( (END-START) / 1000000 )) ms"
===== DOCKER START =====
compare-docker
3e06d2e39f4b86987c32510ddd60637b34338501bd02befc4f296ea16f32336e
Docker startup command time: 242 ms
keerthana@Mac-89 docker-vs-podman-poc % curl -s http://localhost:3101/health
echo
{"status":"UP","engine":"docker","hostname":"3e06d2e39f4b"}
keerthana@Mac-89 docker-vs-podman-poc % docker stats compare-docker --no-stream
CONTAINER ID   NAME             CPU %     MEM USAGE / LIMIT     MEM %     NET I/O          BLOCK I/O     PIDS
3e06d2e39f4b   compare-docker   0.00%     43.71MiB / 7.748GiB   0.55%     308kB / 3.74kB   6.36MB / 0B   18
keerthana@Mac-89 docker-vs-podman-poc % echo "===== PODMAN START ====="
podman rm -f compare-podman 2>/dev/null || true

START=$(date +%s%N)
podman run -d \
  --name compare-podman \
  -p 3102:3000 \
  -e CONTAINER_ENGINE=podman \
  localhost/docker-vs-podman:podman
END=$(date +%s%N)

echo "Podman startup command time: $(( (END-START) / 1000000 )) ms"
===== PODMAN START =====
d27f5118450be61e5cc4d99348c556eb30e9e64d0c9b52273e9f74a3522c9dea
Podman startup command time: 490 ms
keerthana@Mac-89 docker-vs-podman-poc % curl -s http://localhost:3102/health
echo
{"status":"UP","engine":"podman","hostname":"d27f5118450b"}
keerthana@Mac-89 docker-vs-podman-poc % podman stats compare-podman --no-stream
ID            NAME            CPU %       MEM USAGE / LIMIT  MEM %       NET IO             BLOCK IO      PIDS        CPU TIME    AVG CPU %
d27f5118450b  compare-podman  6.94%       138.4MB / 2.035GB  6.80%       308.5kB / 3.912kB  84.85MB / 0B  18          590.276ms   6.94%
keerthana@Mac-89 docker-vs-podman-poc % 

* Test 2 result:
| Metric                  |       Docker |       Podman |
| ----------------------- | -----------: | -----------: |
| Container start command |   **242 ms** |   **490 ms** |
| Health                  |         ✅ UP |         ✅ UP |
| Memory                  | **43.7 MiB** | **138.4 MB** |
| Processes               |           18 |           18 |

* Current results:
| Test                 |   Docker |   Podman |
| -------------------- | -------: | -------: |
| Build time*          |   3.97 s |   1.37 s |
| Image size           | 179.5 MB | 128.0 MB |
| Container start      |   242 ms |   490 ms |
| Idle memory snapshot | 43.7 MiB | 138.4 MB |


### Test 3 — The important one: controlled load:
keerthana@Mac-89 docker-vs-podman-poc % curl -s http://localhost:3101/health
curl -s http://localhost:3102/health
{"status":"UP","engine":"docker","hostname":"3e06d2e39f4b"}{"status":"UP","engine":"podman","hostname":"d27f5118450b"}%                      
keerthana@Mac-89 docker-vs-podman-poc % >....                                                                                                

echo "URL=$URL"
echo "Requests=$TOTAL"
echo "Concurrency=$CONCURRENCY"

START=$(date +%s)

seq "$TOTAL" | xargs -P "$CONCURRENCY" -I {} curl -s -o /dev/null \
  -w "%{http_code}\n" "$URL" | sort | uniq -c

END=$(date +%s)

echo "Total time: $((END-START)) seconds"
EOF

chmod +x load-test.sh
keerthana@Mac-89 docker-vs-podman-poc % 

* Docker:
Open Terminal 1 and run:

docker stats compare-docker

Leave it running.

In Terminal 2:

./load-test.sh http://localhost:3101/health 10000 20

After it finishes, stop stats with Ctrl+C.

CONTAINER ID   NAME             CPU %     MEM USAGE / LIMIT     MEM %     NET I/O          BLOCK I/O        PIDS
3e06d2e39f4b   compare-docker   0.00%     64.35MiB / 7.748GiB   0.81%     5.2MB / 5.08MB   6.36MB / 4.1kB   18
keerthana@Mac-89 docker-vs-podman-poc % 
keerthana@Mac-89 docker-vs-podman-poc % ./load-test.sh http://localhost:3101/health 10000 20
URL=http://localhost:3101/health
Requests=10000
Concurrency=20
10000 200
Total time: 111 seconds
* Podman:
Terminal 1:

podman stats compare-podman

Terminal 2:

./load-test.sh http://localhost:3102/health 10000 20

Again, stop stats after completion.

ID            NAME            CPU %       MEM USAGE / LIMIT  MEM %       NET IO             BLOCK IO           PIDS        CPU TIME    AVG CPU %
d27f5118450b  compare-podman  2.39%       143.3MB / 2.035GB  7.04%       326.1kB / 21.15kB  84.85MB / 4.096kB  18          9.06581s    2.89%
keerthana@Mac-89 docker-vs-podman-poc % 
keerthana@Mac-89 docker-vs-podman-poc % ./load-test.sh http://localhost:3102/health 10000 20
URL=http://localhost:3102/health
Requests=10000
Concurrency=20
10000 200
Total time: 109 seconds

* Test 3 — 10,000 requests / 20 concurrency:
| Metric             |         Docker |           Podman |
| ------------------ | -------------: | ---------------: |
| Requests           |         10,000 |           10,000 |
| Concurrency        |             20 |               20 |
| HTTP 200           |     **10,000** |       **10,000** |
| Failed requests    |          **0** |            **0** |
| Total time         |    **111 sec** |      **109 sec** |
| Approx. throughput | **90.1 req/s** |   **91.7 req/s** |
| Memory during test |         ~64 MB |          ~143 MB |
| CPU observed       |  ~0% snapshot* | ~2.39% snapshot* |


#### Test 4: storage I/O:
keerthana@Mac-89 docker-vs-podman-poc % docker exec compare-docker sh -c '
  rm -f /tmp/test-data &&
  START=$(date +%s) &&
  dd if=/dev/zero of=/tmp/test-data bs=1M count=100 2>&1 &&
  END=$(date +%s) &&
  echo "Docker write time: $((END-START)) seconds"
'
100+0 records in
100+0 records out
104857600 bytes (100.0MB) copied, 0.035240 seconds, 2.8GB/s
Docker write time: 0 seconds
keerthana@Mac-89 docker-vs-podman-poc % podman exec compare-podman sh -c '
  rm -f /tmp/test-data &&
  START=$(date +%s) &&
  dd if=/dev/zero of=/tmp/test-data bs=1M count=100 2>&1 &&
  END=$(date +%s) &&
  echo "Podman write time: $((END-START)) seconds"
'
100+0 records in
100+0 records out
104857600 bytes (100.0MB) copied, 0.038830 seconds, 2.5GB/s
Podman write time: 0 seconds
keerthana@Mac-89 docker-vs-podman-poc % 
keerthana@Mac-89 docker-vs-podman-poc % docker exec compare-docker du -sh /tmp/test-data
podman exec compare-podman du -sh /tmp/test-data
100.0M  /tmp/test-data
100.0M  /tmp/test-data
keerthana@Mac-89 docker-vs-podman-poc % 

**Final Docker vs Podman POC results**:
| Test                          |                 Docker |                 Podman | Observation                                                  |
| ----------------------------- | ---------------------: | ---------------------: | ------------------------------------------------------------ |
| Image size                    |           **179.5 MB** |           **128.0 MB** | Podman smaller in this build                                 |
| Clean build time              |             **3.97 s** |             **1.37 s** | Podman faster here, but base-image pull/cache affects result |
| Container startup             |             **242 ms** |             **490 ms** | Docker faster                                                |
| Idle memory snapshot          |           **43.7 MiB** |           **138.4 MB** | Podman higher in this environment                            |
| 10K requests / 20 concurrency |              **111 s** |              **109 s** | Essentially same                                             |
| Successful requests           |      **10,000/10,000** |      **10,000/10,000** | Both 100% success                                            |
| Storage write — 100 MB        | **0.035 s / 2.8 GB/s** | **0.039 s / 2.5 GB/s** | Very close                                                   |
| Written data                  |             **100 MB** |             **100 MB** | Same                                                         |

##### The important conclusion:

For this controlled local POC:

**1. Application performance:**
Docker and Podman were effectively equivalent at **10,000 requests / 20 concurrency**, with **zero failures**.

**2. Storage I/O:**
Very close — no meaningful difference in this test.

**3. Podman advantages observed:**

* Smaller image in this particular build.
* Faster clean build in this particular run.
* Rootless/container architecture and Podman-specific operational capabilities are potential advantages, but those are architectural rather than measured performance wins here.

**4. Podman disadvantages observed:**

* Container startup was about **2× slower** in this test.
* Memory usage was noticeably higher for this tiny container.
* On macOS, Podman requires its **Linux VM to be running**. We actually observed the container engine initially failing until `podman machine start` was performed.

**5. Most important:**
We did **not** find a performance blocker in the 10K-request test.


# There are 3 important comparisons we haven't done:
# Test 1 — Restart/recovery:
keerthana@Mac-89 docker-vs-podman-poc % docker update --restart=unless-stopped compare-docker
docker inspect compare-docker --format '{{.HostConfig.RestartPolicy.Name}}'
compare-docker
unless-stopped
keerthana@Mac-89 docker-vs-podman-poc % time docker restart compare-docker
curl -s http://localhost:3101/health
echo
compare-docker
docker restart compare-docker  0.02s user 0.01s system 4% cpu 0.752 total

keerthana@Mac-89 docker-vs-podman-poc % podman update --restart=unless-stopped compare-podman
podman inspect compare-podman --format '{{.HostConfig.RestartPolicy.Name}}'
compare-podman
unless-stopped
keerthana@Mac-89 docker-vs-podman-poc % time podman restart compare-podman
curl -s http://localhost:3102/health
echo
compare-podman
podman restart compare-podman  0.04s user 0.01s system 19% cpu 0.277 total
{"status":"UP","engine":"podman","hostname":"d27f5118450b"}
keerthana@Mac-89 docker-vs-podman-poc % 

## Test 2 — Container crash recovery:
keerthana@Mac-89 docker-vs-podman-poc % docker top compare-docker
podman top compare-podman
UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD
root                4404                4381                0                   05:18               ?                   00:00:00            npm start
root                4436                4404                0                   05:18               ?                   00:00:00            node server.js
USER        PID         PPID        %CPU        ELAPSED        TTY         TIME        COMMAND
root        1           0           0.000       47.285475135s  ?           0s          npm start
root        13          1           0.000       46.285615426s  ?           0s          node server.js
keerthana@Mac-89 docker-vs-podman-poc % docker exec compare-docker sh -c 'kill 1'
keerthana@Mac-89 docker-vs-podman-poc % sleep 3
docker ps --filter name=compare-docker
curl -s http://localhost:3101/health
echo
CONTAINER ID   IMAGE                     COMMAND                  CREATED          STATUS         PORTS   NAMES
3e06d2e39f4b   docker-vs-podman:docker   "docker-entrypoint.s…"   24 minutes ago   Up 2 minutes   0.0.0.0:3101->3000/tcp, [::]:3101->3000/tcp   compare-docker
{"status":"UP","engine":"docker","hostname":"3e06d2e39f4b"}
keerthana@Mac-89 docker-vs-podman-poc % podman exec compare-podman sh -c 'kill 1'
keerthana@Mac-89 docker-vs-podman-poc % sleep 3
podman ps --filter name=compare-podman
curl -s http://localhost:3102/health
echo
CONTAINER ID  IMAGE                              COMMAND     CREATED         STATUS        PORTS                   NAMES
d27f5118450b  localhost/docker-vs-podman:podman  npm start   26 minutes ago  Up 2 minutes  0.0.0.0:3102->3000/tcp  compare-podman
{"status":"UP","engine":"podman","hostname":"d27f5118450b"}
keerthana@Mac-89 docker-vs-podman-poc % 

### Test 3 — Network latency:
keerthana@Mac-89 docker-vs-podman-poc % time for i in $(seq 1 1000); do
  curl -s -o /dev/null http://localhost:3101/health
done
keerthana@Mac-89 docker-vs-podman-poc % time for i in $(seq 1 1000); do
  curl -s -o /dev/null http://localhost:3102/health
done
keerthana@Mac-89 docker-vs-podman-poc % 
keerthana@Mac-89 docker-vs-podman-poc % echo "=== Docker 1000 requests ==="
time sh -c 'for i in $(seq 1 1000); do curl -s -o /dev/null http://localhost:3101/health; done'

echo
echo "=== Podman 1000 requests ==="
time sh -c 'for i in $(seq 1 1000); do curl -s -o /dev/null http://localhost:3102/health; done'
=== Docker 1000 requests ===
sh -c   3.55s user 4.18s system 44% cpu 17.224 total

=== Podman 1000 requests ===
sh -c   4.02s user 4.53s system 48% cpu 17.749 total

#### Compose compatibility:
keerthana@Mac-89 docker-vs-podman-poc % docker compose version
podman compose version
Docker Compose version v5.5.1
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

Docker Compose version v5.5.1
keerthana@Mac-89 docker-vs-podman-poc % 

keerthana@Mac-89 docker-vs-podman-poc % cat > compose.yml <<'EOF'
services:
  app:
    build: .
    container_name: compose-test-app
    ports:
      - "3200:3000"
    environment:
      CONTAINER_ENGINE: compose
EOF
keerthana@Mac-89 docker-vs-podman-poc % docker compose -f compose.yml up -d
curl -s http://localhost:3200/health
echo
docker compose -f compose.yml down
[+] Building 3.0s (12/12) FINISHED                                                                                                           
 => [internal] load local bake definitions                                                                                              0.0s
 => => reading from stdin 556B                                                                                                          0.0s
 => [internal] load build definition from Dockerfile                                                                                    0.0s
 => => transferring dockerfile: 144B                                                                                                    0.0s
 => [internal] load metadata for docker.io/library/node:18-alpine                                                                       2.6s
 => [auth] library/node:pull token for registry-1.docker.io                                                                             0.0s
 => [internal] load .dockerignore                                                                                                       0.0s
 => => transferring context: 2B                                                                                                         0.0s
 => [1/4] FROM docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e                 0.0s
 => => resolve docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e                 0.0s
 => [internal] load build context                                                                                                       0.0s
 => => transferring context: 63B                                                                                                        0.0s
 => CACHED [2/4] WORKDIR /app                                                                                                           0.0s
 => CACHED [3/4] COPY package.json .                                                                                                    0.0s
 => CACHED [4/4] COPY server.js .                                                                                                       0.0s
 => exporting to image                                                                                                                  0.1s
 => => exporting layers                                                                                                                 0.0s
 => => exporting manifest sha256:10386ece752b35fbb525bb26176514785d5997efbfcf1215219a619446432da6                                       0.0s
 => => exporting config sha256:2e6a6bda58023a523b305550858c2e4d85d09a65bd3fa0b96f02c473b1306d7e                                         0.0s
 => => exporting attestation manifest sha256:77ef13cd40377a1cc534271e79457a27e49c9588c80fe57d1f81b64ccb8bddfe                           0.0s
 => => exporting manifest list sha256:0f1148a0fe028ee7cf2a2fcf6e15965432aa87c1bc190c313f7fc4980f7b2c24                                  0.0s
 => => naming to docker.io/library/docker-vs-podman-poc-app:latest                                                                      0.0s
 => => unpacking to docker.io/library/docker-vs-podman-poc-app:latest                                                                   0.0s
 => resolving provenance for metadata file                                                                                              0.0s
[+] up 3/3
 ✔ Image docker-vs-podman-poc-app       Built                                                                                            3.2s
 ✔ Network docker-vs-podman-poc_default Created                                                                                          0.0s
 ✔ Container compose-test-app           Started                                                                                          0.2s

[+] down 2/2
 ✔ Container compose-test-app           Removed                                                                                          3.2s
 ✔ Network docker-vs-podman-poc_default Removed                                                                                          0.1s
keerthana@Mac-89 docker-vs-podman-poc % podman compose -f compose.yml up -d
curl -s http://localhost:3200/health
echo
podman compose -f compose.yml down
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

Sending build context to Docker daemon  5.908kB
STEP 1/7: FROM node:18-alpine
STEP 2/7: WORKDIR /app
--> 7db0921f1625
STEP 3/7: COPY package.json .
--> 09ce94bf4147
STEP 4/7: COPY server.js .
--> c18b07088ddc
STEP 5/7: EXPOSE 3000
--> 230ce663785e
STEP 6/7: CMD ["npm", "start"]
--> 314db2bbdb03
STEP 7/7: LABEL "com.docker.compose.image.builder"="classic"
COMMIT docker.io/library/docker-vs-podman-poc-app
--> 9d13cdc5a16e
Successfully tagged docker.io/library/docker-vs-podman-poc-app:latest
9d13cdc5a16e92cf183494247d55d1cd3aef5cb586a49ab5fffb81c45c112758
Successfully built 9d13cdc5a16e
Successfully tagged docker-vs-podman-poc-app
[+] up 3/3
 ✔ Image docker-vs-podman-poc-app       Built                                                                                            1.3s
 ✔ Network docker-vs-podman-poc_default Created                                                                                          0.0s
 ✔ Container compose-test-app           Started                                                                                          0.1s

>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

[+] down 2/2
 ✔ Container compose-test-app           Removed                                                                                          0.6s
 ✔ Network docker-vs-podman-poc_default Removed                                                                                          0.0s
keerthana@Mac-89 docker-vs-podman-poc % 

* Compose test result:
| Test                       | Docker Compose | `podman compose` |
| -------------------------- | -------------- | ---------------- |
| Build image                | ✅              | ✅                |
| Create network             | ✅              | ✅                |
| Start container            | ✅              | ✅                |
| Compose `up`               | ✅              | ✅                |
| Compose `down`             | ✅              | ✅                |
| Compose file compatibility | ✅              | ✅*               |

* So the test proves:
        Your Compose file works when invoked through podman compose with the currently configured external Docker Compose provider.

##### Bind-mounted storage:
keerthana@Mac-89 docker-vs-podman-poc % mkdir -p comparison-storage
rm -f comparison-storage/docker-test-data comparison-storage/podman-test-data
keerthana@Mac-89 docker-vs-podman-poc % docker run --rm \
  -v "$(pwd)/comparison-storage:/data" \
  docker-vs-podman:docker \
  sh -c 'START=$(date +%s%N); dd if=/dev/zero of=/data/docker-test-data bs=1M count=100 2>&1; END=$(date +%s%N); echo "Docker bind-mount write: $(( (END-START)/1000000 )) ms"'
docker: Error response from daemon: mounts denied: 
The path /Applications/podman-poc/docker-vs-podman-poc/comparison-storage is not shared from the host and is not known to Docker.
You can configure shared paths from Docker -> Preferences... -> Resources -> File Sharing.
See https://docs.docker.com/go/mac-file-sharing/ for more info.

Run 'docker run --help' for more information

What's next:
    Debug this container error with Gordon → docker ai "help me fix this container error"
keerthana@Mac-89 docker-vs-podman-poc % podman run --rm \
  -v "$(pwd)/comparison-storage:/data" \
  localhost/docker-vs-podman:podman \
  sh -c 'START=$(date +%s%N); dd if=/dev/zero of=/data/podman-test-data bs=1M count=100 2>&1; END=$(date +%s%N); echo "Podman bind-mount write: $(( (END-START)/1000000 )) ms"'
Error: statfs /Applications/podman-poc/docker-vs-podman-poc/comparison-storage: no such file or directory
keerthana@Mac-89 docker-vs-podman-poc % ls -lh comparison-storage
total 0
keerthana@Mac-89 docker-vs-podman-poc % 

* Docker Desktop requires that host path to be included in its file-sharing configuration.
* Podman runs the container inside its Linux VM, and /Applications/... is not directly visible inside that VM.

**Final important comparison results**:
| Area                           | Result                                                     |
| ------------------------------ | ---------------------------------------------------------- |
| Image size                     | Podman 128 MB vs Docker 179.5 MB in this build             |
| Build time                     | Podman 1.37s vs Docker 3.97s in this run*                  |
| Container startup              | Docker 0.242s vs Podman 0.490s                             |
| Runtime memory                 | Docker ~43.7 MiB vs Podman ~138.4 MB in this environment   |
| 10K requests / 20 concurrency  | Docker 111s vs Podman 109s                                 |
| Request success                | Both 10,000/10,000                                         |
| Container filesystem I/O       | Docker 2.8 GB/s vs Podman 2.5 GB/s                         |
| Restart                        | Both recovered successfully                                |
| Crash/PID1 recovery            | Both recovered successfully                                |
| 1K sequential network requests | Docker 17.224s vs Podman 17.749s                           |
| Compose                        | Works, **but Podman delegates to external Docker Compose** |
| macOS bind mount               | Both require host-path configuration/integration           |

**What I would call the real findings**:
**No major runtime blocker was found** in this small direct comparison.
The things I would carry forward to your actual migration review are:
        1. **Podman VM/resource model** — Podman on your Mac runs through a Linux VM, so memory and host-storage behavior differ from Docker Desktop.
        2. **Compose dependency** — your `podman compose` currently delegates to `/usr/local/bin/docker-compose`.
        3. **Host bind mounts** — path sharing/VM visibility needs explicit validation for the actual production `logs`/`data` paths.
        4. **Runtime performance** — this POC showed broadly comparable request throughput, networking and container filesystem I/O.
        5. **Recovery** — both engines passed restart and PID1-crash recovery in this test.

**Podman advantages/disadvantages**:

# Podman — Advantages

1. **Docker-compatible container images**

   * Your existing Dockerfile built successfully with Podman.
   * Existing application image structure does not need a complete redesign.

2. **Docker CLI-like experience**

   * Basic commands such as `build`, `run`, `ps`, `exec`, `stats`, `restart` worked similarly.
   * This reduces the learning/migration effort.

3. **Rootless capability**

   * Podman supports rootless containers, which can reduce the need for privileged container execution.

4. **Good runtime performance**

   * In our 10K-request test, both engines achieved **100% successful requests**.
   * Docker: 111 sec
   * Podman: 109 sec
   * So we found **no meaningful throughput disadvantage** in this test.

5. **Good recovery behavior**

   * Explicit restart worked.
   * Killing PID 1 and waiting for recovery also resulted in a healthy container.
   * `unless-stopped` restart policy was accepted.

6. **Storage performance was comparable**

   * Container filesystem write:

     * Docker: ~2.8 GB/s
     * Podman: ~2.5 GB/s
   * So we did not see a significant storage-I/O performance problem in this test.

7. **Networking was comparable**

   * 1,000 sequential requests:

     * Docker: 17.224 sec
     * Podman: 17.749 sec
   * Difference was only about 3%.

8. **Smaller image in this particular build**

   * Docker: ~179.5 MB
   * Podman: ~128 MB
   * But this should **not** be treated as an inherent Podman advantage because image/build conditions affect the result.

---

## Podman — Disadvantages / Migration Risks

1. **Podman VM dependency on macOS**

   * On your Mac, Podman runs containers inside a Linux VM.
   * This introduces another layer between the Mac host and containers.

2. **Host-path / bind-mount complexity**

   * Our final test exposed this directly.
   * Docker complained that the `/Applications/...` path wasn't shared with Docker Desktop.
   * Podman reported that the same host path wasn't available to its VM.
   * This is particularly important for your application because your real setup uses **`logs/` and `data/`**.

3. **Memory footprint was higher in our environment**

   * Docker snapshot: ~43.7 MiB
   * Podman snapshot: ~138.4 MB
   * But this is **not a production conclusion**, because the Docker and Podman VMs had different memory configurations.

4. **Startup was slower in this run**

   * Docker: ~242 ms
   * Podman: ~490 ms
   * Not a major issue by itself, but it is a measured difference in our environment.

5. **Compose has an external dependency**

   * `podman compose` reported:

     ```text
     Executing external compose provider "/usr/local/bin/docker-compose"
     ```
   * So your current setup is **not proving native Podman Compose compatibility**.
   * For your live Docker Compose application, this needs to be considered during migration.

6. **Operational differences still matter**

   * Although the basic Docker commands worked, Podman has differences around VM management, networking, storage paths, logging, and service startup.
   * We already saw several of these in your main migration POC.

---

### The important conclusion after all three tests

I would **not say "Podman is better than Docker" or "Docker is better than Podman."**

For your migration specifically, our testing shows:

> **Podman is technically capable of running the application workload with comparable basic performance and recovery, but the important migration risks are operational — especially VM/host integration, bind-mounted storage paths, Compose tooling dependency, and resource configuration.**

And this is actually consistent with what we found in your **main Podman migration POC**: the biggest questions aren't *"Can Podman run the Node application?"* — it clearly can.

The important question is:

**"Can Podman reproduce the production Docker environment — Compose, Jenkins, storage, logs, networking, restart behavior and operational management — without introducing a production blocker?"**

That's the question your POC should ultimately answer.

#### For this line : Executing external compose provider "/usr/local/bin/docker-compose" need to install podman compose:
keerthana@Mac-89 docker-vs-podman-poc % podman-compose --version
podman-compose version 1.6.0
podman version 6.1.1
keerthana@Mac-89 docker-vs-podman-poc % podman-compose -f compose.yml up -d
6d7f038db328bfefbd6cad543c068e0131fe4d4a14496b169be9ab471b758891
619587f018a75dda915ad716a126f8abf1bc9e1718abfe043eff0a81ed75f3c7
compose-test-app
keerthana@Mac-89 docker-vs-podman-poc % podman-compose -f compose.yml down 
compose-test-app
compose-test-app
6d7f038db328bfefbd6cad543c068e0131fe4d4a14496b169be9ab471b758891
keerthana@Mac-89 docker-vs-podman-poc %

* now it will use the native podman compose instead of docker compose.

##### Pull image test:
keerthana@Mac-89 docker-vs-podman-poc % docker image rm alpine:3.22 2>/dev/null || true
podman image rm docker.io/library/alpine:3.22 2>/dev/null || true
keerthana@Mac-89 docker-vs-podman-poc % docker image inspect alpine:3.22 >/dev/null 2>&1 && echo "Docker image still exists" || echo "Docker image removed"

podman image exists docker.io/library/alpine:3.22 && echo "Podman image still exists" || echo "Podman image removed"
Docker image removed
Podman image removed
keerthana@Mac-89 docker-vs-podman-poc % echo "=== Docker pull ==="
time docker pull alpine:3.22
=== Docker pull ===
3.22: Pulling from library/alpine
16fc4f52163f: Pull complete 
37a98a5c0ed3: Download complete 
237cf59f8e65: Download complete 
Digest: sha256:5291449c3df73caf6ed85e649dec1b9e818b39a5d8c871e97afc13e9cd5e8fa8
Status: Downloaded newer image for alpine:3.22
docker.io/library/alpine:3.22
docker pull alpine:3.22  0.03s user 0.04s system 1% cpu 4.405 total
keerthana@Mac-89 docker-vs-podman-poc % docker image rm alpine:3.22
Untagged: alpine:3.22
Deleted: sha256:5291449c3df73caf6ed85e649dec1b9e818b39a5d8c871e97afc13e9cd5e8fa8
keerthana@Mac-89 docker-vs-podman-poc % echo "=== Podman pull ==="
time podman pull docker.io/library/alpine:3.22
=== Podman pull ===
Trying to pull docker.io/library/alpine:3.22...
Getting image source signatures
Copying blob sha256:16fc4f52163f03cd2189c3d6a4b3f28a605cfb7919af64b3da4562cca69d2306
Copying config sha256:e09dd31eab4f4aeaade69891673134f31880ef51c6ee514b0cea072df06d7547
Writing manifest to image destination
e09dd31eab4f4aeaade69891673134f31880ef51c6ee514b0cea072df06d7547
podman pull docker.io/library/alpine:3.22  0.04s user 0.04s system 1% cpu 6.162 total
keerthana@Mac-89 docker-vs-podman-poc % echo "=== Docker image size ==="
docker image inspect alpine:3.22 --format 'Size={{.Size}} bytes' 2>/dev/null || echo "Docker image removed"

echo "=== Podman image size ==="
podman image inspect docker.io/library/alpine:3.22 --format 'Size={{.Size}} bytes'
=== Docker image size ===

Docker image removed
=== Podman image size ===
Size=8836215 bytes
keerthana@Mac-89 docker-vs-podman-poc % 

* Pull result:
| Test            |        Docker |        Podman |
| --------------- | ------------: | ------------: |
| Clean pull      |             ✅ |             ✅ |
| Pull time       | **4.405 sec** | **6.162 sec** |
| Image           | `alpine:3.22` | `alpine:3.22` |
| Pull successful |             ✅ |             ✅ |
| Image size      |     ~8.84 MB* |   **8.84 MB** |

* What did we find?

Both engines can pull the image successfully from Docker Hub.

In this run:
Docker: 4.405 sec
Podman: 6.162 sec

- So Docker completed the clean pull about 1.76 seconds faster in this particular run.