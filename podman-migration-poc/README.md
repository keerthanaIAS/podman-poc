# Terminal log:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % cd /Applications/podman-poc
keerthana@Keerthanas-MacBook-Air podman-poc % mkdir -p podman-migration-poc/data
mkdir -p podman-migration-poc/logs
mkdir -p podman-migration-poc/k8s
mkdir -p podman-migration-poc/scripts
keerthana@Keerthanas-MacBook-Air podman-poc % cd podman-migration-poc
keerthana@Keerthanas-MacBook-Air podman-migration-poc % pwd
find . -maxdepth 2 -type f | sort
/Applications/podman-poc/podman-migration-poc
keerthana@Keerthanas-MacBook-Air podman-migration-poc % touch Dockerfile
touch Jenkinsfile
touch package.json
touch build.js
touch server.js

keerthana@Keerthanas-MacBook-Air podman-migration-poc % touch k8s/namespace.yaml
touch k8s/deployment.yaml
touch k8s/service.yaml
touch k8s/pvc.yaml
keerthana@Keerthanas-MacBook-Air podman-migration-poc % touch scripts/run-docker.sh
touch scripts/run-podman.sh
touch scripts/load-test.sh
touch scripts/storage-test.sh
touch scripts/resource-test.sh
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ./scripts/run-docker.sh
zsh: permission denied: ./scripts/run-docker.sh
keerthana@Keerthanas-MacBook-Air podman-migration-poc % pwd
/Applications/podman-poc/podman-migration-poc
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ls -la
total 56
drwxr-xr-x@ 12 keerthana  staff   384 Sep 16 11:00 .
drwxr-xr-x   8 keerthana  staff   256 Sep 16 10:57 ..
-rw-r--r--@  1 keerthana  staff    93 Sep 16 11:00 .dockerignore
-rw-r--r--@  1 keerthana  staff   316 Sep 16 10:59 build.js
drwxr-xr-x@  2 keerthana  staff    64 Sep 16 10:57 data
-rw-r--r--@  1 keerthana  staff   604 Sep 16 10:59 Dockerfile
-rw-r--r--@  1 keerthana  staff  4322 Sep 16 11:01 Jenkinsfile
drwxr-xr-x@  6 keerthana  staff   192 Sep 16 10:58 k8s
drwxr-xr-x@  2 keerthana  staff    64 Sep 16 10:57 logs
-rw-r--r--@  1 keerthana  staff   215 Sep 16 10:59 package.json
drwxr-xr-x@  7 keerthana  staff   224 Sep 16 10:58 scripts
-rw-r--r--@  1 keerthana  staff  2175 Sep 16 10:59 server.js
keerthana@Keerthanas-MacBook-Air podman-migration-poc % chmod +x scripts/*.sh
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ls -l scripts/
total 40
-rwxr-xr-x@ 1 keerthana  staff  617 Sep 16 11:01 load-test.sh
-rwxr-xr-x@ 1 keerthana  staff  405 Sep 16 11:01 resource-test.sh
-rwxr-xr-x@ 1 keerthana  staff  784 Sep 16 11:00 run-docker.sh
-rwxr-xr-x@ 1 keerthana  staff  784 Sep 16 11:00 run-podman.sh
-rwxr-xr-x@ 1 keerthana  staff  637 Sep 16 11:01 storage-test.sh
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman --version
podman version 6.1.1
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman info
OS: darwin/arm64
buildOrigin: brew
provider: applehv
version: 6.1.1

Cannot connect to Podman. Please verify your connection to the Linux system using `podman system connection list`, or try `podman machine init` and `podman machine start` to manage a new Linux VM
Error: unable to connect to Podman socket: failed to connect: dial tcp 127.0.0.1:49741: connect: connection refused
keerthana@Keerthanas-MacBook-Air podman-migration-poc % docker --version
Docker version 29.8.0, build 88096ef
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman machine list
NAME                     VM TYPE     CREATED     LAST UP         CPUS        MEMORY      DISK SIZE
podman-machine-default*  applehv     6 days ago  18 minutes ago  5           2GiB        100GiB
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
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman info
Client:
  APIVersion: 6.1.1
  BuildOrigin: brew
  Built: 1788354743
  BuiltTime: Wed Sep  2 18:42:23 2026
  GitCommit: ""
  GoVersion: go1.27.1
  Os: darwin
  OsArch: darwin/arm64
  Version: 6.1.1
host:
  arch: arm64
  buildahVersion: 1.45.0
  cdiSpecDirs:
  - /etc/cdi
  - /var/run/cdi
  cgroupControllers:
  - cpu
  - io
  - memory
  - pids
  cgroupManager: systemd
  cgroupVersion: v2
  conmon:
    package: conmon-2.2.1-2.fc44.aarch64
    path: /usr/bin/conmon
    version: 'conmon version 2.2.1, commit: '
  cpuUtilization:
    idlePercent: 96.83
    systemPercent: 1.77
    userPercent: 1.4
  cpus: 5
  databaseBackend: sqlite
  distribution:
    distribution: fedora
    variant: podman-machine-os
    version: "44"
  emulatedArchitectures:
  - linux/386
  - linux/amd64
  - linux/arm64be
  eventLogger: journald
  freeLocks: 2023
  hostname: localhost.localdomain
  idMappings:
    gidmap:
    - container_id: 0
      host_id: 1000
      size: 1
    - container_id: 1
      host_id: 100000
      size: 1000000
    uidmap:
    - container_id: 0
      host_id: 501
      size: 1
    - container_id: 1
      host_id: 100000
      size: 1000000
  kernel: 7.1.8-200.fc44.aarch64
  linkmode: dynamic
  logDriver: journald
  memAvailable: 1648889856
  memFree: 1450860544
  memTotal: 2035326976
  networkBackend: netavark
  networkBackendInfo:
    backend: netavark
    defaultNetwork: podman
    dns:
      package: aardvark-dns-2.1.0-1.fc44.aarch64
      path: /usr/libexec/podman/aardvark-dns
      version: aardvark-dns 2.1.0
    package: netavark-2.1.0-1.fc44.aarch64
    path: /usr/libexec/podman/netavark
    version: netavark 2.1.0
  ociRuntime:
    name: crun
    package: crun-1.29.1-1.fc44.aarch64
    path: /usr/bin/crun
    version: |-
      crun version 1.29.1
      commit: f0d911de5587342cfeb16473bf32ecdfeaf25957
      rundir: /run/user/501/crun
      spec: 1.0.0
      +SYSTEMD +SELINUX +APPARMOR +CAP +SECCOMP +EBPF +CRIU +LIBKRUN +WASM:wasmedge +JSON_C
  os: linux
  pasta:
    executable: /usr/bin/pasta
    package: passt-0^20260728.gf8df3f1-2.fc44.aarch64
    version: |
      pasta 0^20260728.gf8df3f1-2.fc44.aarch64-pasta
      Copyright Red Hat
      GNU General Public License, version 2 or later
        <https://www.gnu.org/licenses/old-licenses/gpl-2.0.html>
      This is free software: you are free to change and redistribute it.
      There is NO WARRANTY, to the extent permitted by law.
  remoteSocket:
    exists: true
    path: unix:///run/user/501/podman/podman.sock
  rootlessNetworkCmd: pasta
  rootlessPortForwarder: rootlessport
  security:
    apparmorEnabled: false
    capabilities: CAP_CHOWN,CAP_DAC_OVERRIDE,CAP_FOWNER,CAP_FSETID,CAP_KILL,CAP_NET_BIND_SERVICE,CAP_SETFCAP,CAP_SETGID,CAP_SETPCAP,CAP_SETUID,CAP_SYS_CHROOT
    rootless: true
    seccompEnabled: true
    seccompProfilePath: /usr/share/containers/seccomp.json
    selinuxEnabled: true
  serviceIsRemote: true
  swapFree: 0
  swapTotal: 0
  uptime: 0h 0m 52.00s
  variant: v8
plugins:
  authorization: null
  log:
  - k8s-file
  - none
  - passthrough
  - journald
  network:
  - bridge
  - macvlan
  - ipvlan
  volume:
  - local
registries:
  docker.io:
    Blocked: false
    Insecure: false
    Location: docker.io
    MirrorByDigestOnly: false
    Mirrors: null
    NamespaceProxy: ""
    Prefix: docker.io
    PullFromMirror: ""
  search:
  - docker.io
store:
  containerStore:
    number: 9
    paused: 0
    running: 0
    stopped: 9
  graphDriverName: overlay
  graphOptions:
    overlay.mountopt: nodev
  graphRoot: /var/home/core/.local/share/containers/storage
  graphRootAllocated: 106769133568
  graphRootUsed: 8014934016
  graphStatus:
    Backing Filesystem: xfs
    Native Overlay Diff: "true"
    Supports d_type: "true"
    Supports shifting: "false"
    Supports volatile: "true"
    Using metacopy: "false"
  imageCopyTmpDir: /var/tmp
  imageStore:
    number: 79
  runRoot: /run/user/501/containers
  transientStore: false
  volumePath: /var/home/core/.local/share/containers/storage/volumes
version:
  APIVersion: 6.1.1
  BuildOrigin: 'Copr: packit/podman-container-tools-podman-29700'
  Built: 1788307200
  BuiltTime: Wed Sep  2 05:30:00 2026
  GitCommit: 8303f2e25b675ea7f82099d615c60969aec15870
  GoVersion: go1.26.7-X:nodwarf5
  Os: linux
  OsArch: linux/arm64
  Version: 6.1.1

keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman run --rm hello-world
Resolved "hello-world" as an alias (/usr/share/containers/registries.conf.d/000-shortnames.conf)
Trying to pull quay.io/podman/hello:latest...
Getting image source signatures
Copying blob sha256:1ff9adeff4443b503b304e7aa4c37bb90762947125f4a522b370162a7492ff47
Copying config sha256:83fc7ce1224f5ed3885f6aaec0bb001c0bbb2a308e3250d7408804a720c72a32
Writing manifest to image destination
!... Hello Podman World ...!

Project:   https://github.com/containers/podman
Website:   https://podman.io
Desktop:   https://podman-desktop.io
Documents: https://docs.podman.io
YouTube:   https://youtube.com/@Podman
X/Twitter: @Podman_io
Mastodon:  @Podman_io@fosstodon.org
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
api new twelve bust: 1789537292
--> 6ec214434e15
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
--> 9df18572eb4a
STEP 10/13: COPY . .
--> f6a9005f7d3c
STEP 11/13: RUN npm run build

> cube-root-ms-podman-poc@1.0.0 build
> node build.js

Build completed
--> cdd9cd4fce65
STEP 12/13: EXPOSE 3001
--> d84dba24afe0
STEP 13/13: CMD ["npm", "start"]
COMMIT cube-root-ms:podman-poc
--> c4d70b547e55
Successfully tagged localhost/cube-root-ms:podman-poc
c4d70b547e55ddbd183af434deb487c1dc9e6fd09eaf6cdad07d9751fce99388
================================
Starting container
================================
Error: statfs /Applications/podman-poc/podman-migration-poc/data: no such file or directory
keerthana@Keerthanas-MacBook-Air podman-migration-poc % -v "$(pwd)/data:/data"
zsh: command not found: -v
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman volume create cube-data
podman volume create cube-logs
cube-data
cube-logs
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman volume ls
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
keerthana@Keerthanas-MacBook-Air podman-migration-poc % chmod +x scripts/run-podman.sh
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
api new twelve bust: 1789537397
--> 838bfb699c7a
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
--> bc18ad4813c1
STEP 10/13: COPY . .
--> 026e00331c79
STEP 11/13: RUN npm run build

> cube-root-ms-podman-poc@1.0.0 build
> node build.js

Build completed
--> 788ead4d10e7
STEP 12/13: EXPOSE 3001
--> 8a5984d81e08
STEP 13/13: CMD ["npm", "start"]
COMMIT cube-root-ms:podman-poc
--> fbd15ddf4569
Successfully tagged localhost/cube-root-ms:podman-poc
fbd15ddf45691c9822b7f979e4809f09ebf6acb18974a3ae0b322bd3d168a103
================================
Creating Podman volumes
================================
================================
Starting container
================================
2d3e4f0af32b0af686ae1b51d710e7de1047b5f421ed6fa233087a50c5c68d3a
Waiting for application...
Podman application is UP
{"status":"UP","engine":"podman","hostname":"2d3e4f0af32b"}%                                                                           
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND     CREATED         STATUS         PORTS                   NAMES
2d3e4f0af32b  localhost/cube-root-ms:podman-poc  npm start   10 seconds ago  Up 10 seconds  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-001","amount":1000}'
{"success":true,"transaction":{"transactionId":"TXN-001","amount":1000,"timestamp":"2026-09-16T05:44:14.492Z"}}%                       
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman cat /data/transactions.log
{"transactionId":"TXN-001","amount":1000,"timestamp":"2026-09-16T05:44:14.492Z"}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman volume ls
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
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman cat /logs/application.log
{"timestamp":"2026-09-16T05:44:14.493Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-001"}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman logs cube-root-ms-podman

> cube-root-ms-podman-poc@1.0.0 start
> node server.js

Application running on port 3001
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ./scripts/resource-test.sh podman
================================
Resource Test
================================
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO      BLOCK IO           PIDS        CPU TIME    AVG CPU %
2d3e4f0af32b  cube-root-ms-podman  0.47%       34.37MB / 2.035GB  1.69%       2kB / 838B  12.29kB / 12.29kB  18          445.768ms   0.47%

Application metrics:
{"pid":13,"uptime":93.762003158,"memory":{"rss":58576896,"heapUsed":9138744,"heapTotal":10797056},"storage":{"transactionsBytes":81,"logsBytes":99}}
Storage:
  0B    data
  0B    logs
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream cube-root-ms-podman
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO      BLOCK IO           PIDS        CPU TIME    AVG CPU %
2d3e4f0af32b  cube-root-ms-podman  0.42%       34.43MB / 2.035GB  1.69%       2kB / 838B  12.29kB / 12.29kB  18          448.221ms   0.42%
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman wc -l /data/transactions.log
1 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman restart cube-root-ms-podman
cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % sleep 5
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman cat /data/transactions.log
{"transactionId":"TXN-001","amount":1000,"timestamp":"2026-09-16T05:44:14.492Z"}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 1000
Concurrency  : 10

Load test completed

Application metrics:
{"pid":13,"uptime":210.891054479,"memory":{"rss":65171456,"heapUsed":11165984,"heapTotal":16302080},"storage":{"transactionsBytes":79974,"logsBytes":98992}}%                                                                                                                 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman wc -l /data/transactions.log
1001 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream cube-root-ms-podman
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO         BLOCK IO      PIDS        CPU TIME    AVGCPU %
2d3e4f0af32b  cube-root-ms-podman  0.83%       40.15MB / 2.035GB  1.97%       2.14kB / 908B  0B / 4.096kB  18          1.835192s   0.83%
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman cat /metrics/local
cat: can't open '/metrics/local': No such file or directory
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=10000 CONCURRENCY=20 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 10000
Concurrency  : 20

Load test completed

Application metrics:
{"pid":13,"uptime":301.084332459,"memory":{"rss":81260544,"heapUsed":17751344,"heapTotal":34652160},"storage":{"transactionsBytes":888868,"logsBytes":1097886}}%                                                                                                              
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman wc -l /data/transactions.log
11001 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3001/metrics/local
{"pid":13,"uptime":341.558884278,"memory":{"rss":81260544,"heapUsed":17775488,"heapTotal":34652160},"storage":{"transactionsBytes":888868,"logsBytes":1097886}}%                                                                                                              
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -s http://localhost:3001/metrics/local | jq
{
  "pid": 13,
  "uptime": 349.092330045,
  "memory": {
    "rss": 81260544,
    "heapUsed": 17794872,
    "heapTotal": 34652160
  },
  "storage": {
    "transactionsBytes": 888868,
    "logsBytes": 1097886
  }
}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % sleep 30
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream cube-root-ms-podman
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO         BLOCK IO      PIDS        CPU TIME    AVGCPU %
2d3e4f0af32b  cube-root-ms-podman  2.76%       57.63MB / 2.035GB  2.83%       2.28kB / 978B  0B / 4.096kB  18          10.871075s  2.76%
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -s http://localhost:3001/metrics/local | jq
{
  "pid": 13,
  "uptime": 399.7438989,
  "memory": {
    "rss": 81260544,
    "heapUsed": 17814840,
    "heapTotal": 34652160
  },
  "storage": {
    "transactionsBytes": 888868,
    "logsBytes": 1097886
  }
}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman wc -l /data/transactions.log
11001 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman restart cube-root-ms-podman
cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % sleep 5
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman wc -l /data/transactions.log
11001 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=100000 CONCURRENCY=50 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 100000
Concurrency  : 50

Load test completed

Application metrics:
{"pid":13,"uptime":649.639845544,"memory":{"rss":83001344,"heapUsed":13286192,"heapTotal":35176448},"storage":{"transactionsBytes":9077763,"logsBytes":11186781}}%                                                                                                            
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman wc -l /data/transactions.log
111001 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -s http://localhost:3001/metrics/local | jq
{
  "pid": 13,
  "uptime": 696.743126367,
  "memory": {
    "rss": 83001344,
    "heapUsed": 13322040,
    "heapTotal": 35176448
  },
  "storage": {
    "transactionsBytes": 9077763,
    "logsBytes": 11186781
  }
}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream cube-root-ms-podman
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO            BLOCK IO      PIDS        CPU TIME AVG CPU %
2d3e4f0af32b  cube-root-ms-podman  11.14%      58.7MB / 2.035GB   2.88%       2.42kB / 1.048kB  0B / 12.39MB  18          1m18.250798s 11.14%
keerthana@Keerthanas-MacBook-Air podman-migration-poc % du -sh /Applications/podman-poc/podman-migration-poc
 64K    /Applications/podman-poc/podman-migration-poc
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman rm -f cube-root-ms-podman
cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman volume ls
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
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ./scripts/run-docker.sh
================================
Building Docker image
================================
ERROR: failed to connect to the docker API at unix:///Users/keerthana/.docker/run/docker.sock; check if the path is correct and if thedaemon is running: dial unix /Users/keerthana/.docker/run/docker.sock: connect: no such file or directory
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ./scripts/run-docker.sh
================================
Building Docker image
================================
[+] Building 51.0s (15/15) FINISHED                                                                               docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                              0.1s
 => => transferring dockerfile: 643B                                                                                              0.0s
 => [internal] load metadata for docker.io/library/node:18-alpine                                                                 2.7s
 => [auth] library/node:pull token for registry-1.docker.io                                                                       0.0s
 => [internal] load .dockerignore                                                                                                 0.0s
 => => transferring context: 133B                                                                                                 0.0s
 => CACHED [1/9] FROM docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e    0.0s
 => => resolve docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e           0.0s
 => [internal] load build context                                                                                                 0.0s
 => => transferring context: 13.12kB                                                                                              0.0s
 => [2/9] RUN apk add --no-cache git bash tzdata                                                                                 43.1s
 => [3/9] RUN cp /usr/share/zoneinfo/Asia/Calcutta /etc/localtime                                                                 0.1s 
 => [4/9] WORKDIR /app                                                                                                            0.0s
 => [5/9] COPY package*.json ./                                                                                                   0.0s
 => [6/9] RUN echo "api new twelve bust: 1789539049"                                                                              0.1s
 => [7/9] RUN npm cache clean --force &&     npm install --legacy-peer-deps --force                                               3.3s
 => [8/9] COPY . .                                                                                                                0.0s
 => [9/9] RUN npm run build                                                                                                       0.3s
 => exporting to image                                                                                                            1.1s
 => => exporting layers                                                                                                           0.6s
 => => exporting manifest sha256:536ecb5145be33d81e99a24374ddb8f9e11fa50ca98c904d1b74a8ea3852192a                                 0.0s
 => => exporting config sha256:4d3b51ef0ebf6b7baf33ea90ecb3363746480f4ce78cfe0d36db9bbe0c6f6d85                                   0.0s
 => => exporting attestation manifest sha256:25202704fdc991eb26151ba4bbbb67d2b43587baf33f0a8d7d1b892ae0c08d1d                     0.0s
 => => exporting manifest list sha256:63f9ef273684d5a8296433aaf73df973b7b829192540fb698cda848dee0b287b                            0.0s
 => => naming to docker.io/library/cube-root-ms:docker-poc                                                                        0.0s
 => => unpacking to docker.io/library/cube-root-ms:docker-poc                                                                     0.4s

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/mqzobqnam72oq3mexn5yunp70
================================
Starting container
================================
1e1472a47f027b6914d8bbb7b139be52f5c8f389e08647428461889de5c8e9a2
docker: Error response from daemon: mounts denied: 
The path /Applications/podman-poc/podman-migration-poc/logs is not shared from the host and is not known to Docker.
You can configure shared paths from Docker -> Preferences... -> Resources -> File Sharing.
See https://docs.docker.com/go/mac-file-sharing/ for more info.

Run 'docker run --help' for more information

What's next:
    Debug this container error with Gordon → docker ai "help me fix this container error"
keerthana@Keerthanas-MacBook-Air podman-migration-poc % docker rm -f cube-root-ms-docker 2>/dev/null || true
cube-root-ms-docker
keerthana@Keerthanas-MacBook-Air podman-migration-poc % docker volume create cube-data
docker volume create cube-logs
cube-data
cube-logs
keerthana@Keerthanas-MacBook-Air podman-migration-poc % chmod +x scripts/run-docker.sh
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ./scripts/run-docker.sh
================================
Building Docker image
================================
[+] Building 5.7s (14/14) FINISHED                                                                                docker:desktop-linux
 => [internal] load build definition from Dockerfile                                                                              0.0s
 => => transferring dockerfile: 643B                                                                                              0.0s
 => [internal] load metadata for docker.io/library/node:18-alpine                                                                 1.1s
 => [internal] load .dockerignore                                                                                                 0.0s
 => => transferring context: 133B                                                                                                 0.0s
 => [1/9] FROM docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e           0.0s
 => => resolve docker.io/library/node:18-alpine@sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e           0.0s
 => [internal] load build context                                                                                                 0.0s
 => => transferring context: 1.55kB                                                                                               0.0s
 => CACHED [2/9] RUN apk add --no-cache git bash tzdata                                                                           0.0s
 => CACHED [3/9] RUN cp /usr/share/zoneinfo/Asia/Calcutta /etc/localtime                                                          0.0s
 => CACHED [4/9] WORKDIR /app                                                                                                     0.0s
 => CACHED [5/9] COPY package*.json ./                                                                                            0.0s
 => [6/9] RUN echo "api new twelve bust: 1789539174"                                                                              0.1s
 => [7/9] RUN npm cache clean --force &&     npm install --legacy-peer-deps --force                                               3.3s
 => [8/9] COPY . .                                                                                                                0.0s
 => [9/9] RUN npm run build                                                                                                       0.3s
 => exporting to image                                                                                                            0.8s
 => => exporting layers                                                                                                           0.5s
 => => exporting manifest sha256:64ad97783b754e4f0c1ed4909564c33eb6e5906ec1b4fddc2b3bd44d7c3b17f4                                 0.0s
 => => exporting config sha256:59652b149fab2c4ce39be297a8e5e83efb44ac6a52f45e6f6fb6285c6e945aa0                                   0.0s
 => => exporting attestation manifest sha256:45a1d2aabe80a210a8a9e3736f6e2f7d609f1ef07ff8603bedd56b409eda2fcf                     0.0s
 => => exporting manifest list sha256:dcedb925814d587a5088c4c44368c07c77e3761d2fea927d4f22a3dc5e433731                            0.0s
 => => naming to docker.io/library/cube-root-ms:docker-poc                                                                        0.0s
 => => unpacking to docker.io/library/cube-root-ms:docker-poc                                                                     0.3s

View build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/xvia74f0jv2qcuwtayxn4e293
================================
Creating Docker volumes
================================
================================
Starting container
================================
5e4cc15741aa9eae29987f090ca98ce612dc801fdacaf4c54ef344918230078e
Waiting for application...
Docker application is UP
{"status":"UP","engine":"docker","hostname":"5e4cc15741aa"}%                                                                           
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3001/health
{"status":"UP","engine":"docker","hostname":"5e4cc15741aa"}%                                                                           
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"DOCKER-001","amount":1000}'
{"success":true,"transaction":{"transactionId":"DOCKER-001","amount":1000,"timestamp":"2026-09-16T06:13:13.892Z"}}%                    
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 1000
Concurrency  : 10

Load test completed

Application metrics:
{"pid":18,"uptime":24.224516803,"memory":{"rss":64258048,"heapUsed":11426568,"heapTotal":16039936},"storage":{"transactionsBytes":79977,"logsBytes":98995}}%                                                                                                                  
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=100000 CONCURRENCY=50 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 100000
Concurrency  : 50

Load test completed

Application metrics:
{"pid":18,"uptime":644.016218126,"memory":{"rss":94437376,"heapUsed":10958600,"heapTotal":50118656},"storage":{"transactionsBytes":8268872,"logsBytes":10187890}}%                                                                                                            
keerthana@Keerthanas-MacBook-Air podman-migration-poc % docker exec cube-root-ms-docker wc -l /data/transactions.log
101001 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % docker restart cube-root-ms-docker
cube-root-ms-docker
keerthana@Keerthanas-MacBook-Air podman-migration-poc % sleep 5
keerthana@Keerthanas-MacBook-Air podman-migration-poc % docker exec cube-root-ms-docker wc -l /data/transactions.log
101001 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % docker stats --no-stream cube-root-ms-docker
CONTAINER ID   NAME                  CPU %     MEM USAGE / LIMIT     MEM %     NET I/O         BLOCK I/O    PIDS
5e4cc15741aa   cube-root-ms-docker   0.00%     31.89MiB / 7.748GiB   0.40%     1.17kB / 126B   0B / 4.1kB   18
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -s http://localhost:3001/metrics/local | jq
{
  "pid": 18,
  "uptime": 51.805216106,
  "memory": {
    "rss": 57331712,
    "heapUsed": 8580152,
    "heapTotal": 10534912
  },
  "storage": {
    "transactionsBytes": 8268872,
    "logsBytes": 10187890
  }
}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % which ab
/usr/sbin/ab
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ab -V
This is ApacheBench, Version 2.3 <$Revision: 1923142 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

keerthana@Keerthanas-MacBook-Air podman-migration-poc % 


✅ Current comparison:
| Test                      |    Podman |     Docker |
| ------------------------- | --------: | ---------: |
| Build                     |         ✅ |          ✅ |
| Start                     |         ✅ |          ✅ |
| Health                    |         ✅ |          ✅ |
| Single transaction        |         ✅ |          ✅ |
| 1K transactions           |         ✅ |          ✅ |
| 100K transactions         |         ✅ |          ✅ |
| 100K test time            |  ~8–9 min |    ~10 min |
| Request failures observed |         0 |          0 |
| Transaction storage       |  ~9.08 MB |  ~8.27 MB* |
| Logs                      | ~11.19 MB | ~10.19 MB* |

Very important:-
We shouldn't conclude that Podman is faster than Docker from this test.

Why?
Your current script does:
100,000 requests
        ↓
100,000 separate curl processes
        ↓
xargs controls 50 at a time
        ↓
application

So we're measuring:
Mac + curl process creation + xargs + network + container + Node + file I/O

—not just Docker vs Podman.



keerthana@Keerthanas-MacBook-Air podman-migration-poc % cat > transaction.json <<'EOF'
{"transactionId":"AB-LOAD-TEST","amount":100}
EOF
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ab -n 100000 -c 50 \
  -p transaction.json \
  -T application/json \
  http://localhost:3001/transactions
This is ApacheBench, Version 2.3 <$Revision: 1923142 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 10000 requests
Completed 20000 requests
Completed 30000 requests
Completed 40000 requests
Completed 50000 requests
Completed 60000 requests
Completed 70000 requests
Completed 80000 requests
Completed 90000 requests
Completed 100000 requests
Finished 100000 requests


Server Software:        
Server Hostname:        localhost
Server Port:            3001

Document Path:          /transactions
Document Length:        115 bytes

Concurrency Level:      50
Time taken for tests:   33.194 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      25800000 bytes
Total body sent:        19300000
HTML transferred:       11500000 bytes
Requests per second:    3012.59 [#/sec] (mean)
Time per request:       16.597 [ms] (mean)
Time per request:       0.332 [ms] (mean, across all concurrent requests)
Transfer rate:          759.03 [Kbytes/sec] received
                        567.80 kb/s sent
                        1326.84 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    4   2.4      4      38
Processing:     4   13   5.8     12     181
Waiting:        4   11   4.6     10     155
Total:          5   17   5.6     16     181

Percentage of the requests served within a certain time (ms)
  50%     16
  66%     17
  75%     18
  80%     19
  90%     21
  95%     24
  98%     29
  99%     34
 100%    181 (longest request)
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % docker stats --no-stream cube-root-ms-docker
CONTAINER ID   NAME                  CPU %     MEM USAGE / LIMIT     MEM %     NET I/O         BLOCK I/O    PIDS
5e4cc15741aa   cube-root-ms-docker   0.00%     72.13MiB / 7.748GiB   0.91%     59MB / 59.4MB   0B / 4.1kB   18
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -s http://localhost:3001/metrics/local | jq
{
  "pid": 18,
  "uptime": 435.645997696,
  "memory": {
    "rss": 97382400,
    "heapUsed": 16253184,
    "heapTotal": 51953664
  },
  "storage": {
    "transactionsBytes": 16768872,
    "logsBytes": 20587890
  }
}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

## Docker result:

| Metric           |             Result |
| ---------------- | -----------------: |
| Requests         |            100,000 |
| Concurrency      |                 50 |
| Failed           |              **0** |
| Throughput       | **3,012.59 req/s** |
| Avg response     |        **16.6 ms** |
| 95% response     |          **24 ms** |
| 99% response     |          **34 ms** |
| Docker memory    |      **72.13 MiB** |
| Node RSS         |      **~92.9 MiB** |
| Transaction file |       **16.77 MB** |
| Log file         |       **20.59 MB** |


keerthana@Keerthanas-MacBook-Air podman-migration-poc % docker stop cube-root-ms-docker
cube-root-ms-docker
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
api new twelve bust: 1789540484
--> e9433721e53b
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
--> 90e4b0eec3e8
STEP 10/13: COPY . .
--> d7315f52910e
STEP 11/13: RUN npm run build

> cube-root-ms-podman-poc@1.0.0 build
> node build.js

Build completed
--> d5cc3f6a98c1
STEP 12/13: EXPOSE 3001
--> eb9473762130
STEP 13/13: CMD ["npm", "start"]
COMMIT cube-root-ms:podman-poc
--> e17ad9a394d2
Successfully tagged localhost/cube-root-ms:podman-poc
e17ad9a394d2cc7a85fc663149e5bbf0973814b73ede6bef49ddddfe644befc6
================================
Creating Podman volumes
================================
================================
Starting container
================================
ef2068768cac1e20fbe629a4b9d6d0773476fc2e8f69e10623f09fadfdf6def8
Waiting for application...
Podman application is UP
{"status":"UP","engine":"podman","hostname":"ef2068768cac"}%                                                                           
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3001/health
{"status":"UP","engine":"podman","hostname":"ef2068768cac"}%                                                                           
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ab -n 100000 -c 50 \
  -p transaction.json \
  -T application/json \
  http://localhost:3001/transactions
This is ApacheBench, Version 2.3 <$Revision: 1923142 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking localhost (be patient)
Completed 10000 requests
Completed 20000 requests
Completed 30000 requests
Completed 40000 requests
Completed 50000 requests
Completed 60000 requests
Completed 70000 requests
Completed 80000 requests
Completed 90000 requests
Completed 100000 requests
Finished 100000 requests


Server Software:        
Server Hostname:        localhost
Server Port:            3001

Document Path:          /transactions
Document Length:        115 bytes

Concurrency Level:      50
Time taken for tests:   36.987 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      25800000 bytes
Total body sent:        19300000
HTML transferred:       11500000 bytes
Requests per second:    2703.63 [#/sec] (mean)
Time per request:       18.494 [ms] (mean)
Time per request:       0.370 [ms] (mean, across all concurrent requests)
Transfer rate:          681.19 [Kbytes/sec] received
                        509.57 kb/s sent
                        1190.76 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    4   2.3      4      54
Processing:     4   14   8.3     12     159
Waiting:        4   12   6.5     10     158
Total:          5   18   8.0     16     160

Percentage of the requests served within a certain time (ms)
  50%     16
  66%     18
  75%     20
  80%     21
  90%     26
  95%     31
  98%     41
  99%     50
 100%    160 (longest request)
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream cube-root-ms-podman
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO      BLOCK IO      PIDS        CPU TIME    AVG CPU %
ef2068768cac  cube-root-ms-podman  29.58%      61.34MB / 2.035GB  3.01%       2kB / 838B  0B / 4.096kB  18          31.033674s  29.58%
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -s http://localhost:3001/metrics/local | jq
{
  "pid": 13,
  "uptime": 108.457678014,
  "memory": {
    "rss": 84267008,
    "heapUsed": 18492648,
    "heapTotal": 35438592
  },
  "storage": {
    "transactionsBytes": 17577763,
    "logsBytes": 21586781
  }
}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

### Docker vs Podman:

| Metric              |       Docker |       Podman |
| ------------------- | -----------: | -----------: |
| Requests            |      100,000 |      100,000 |
| Concurrency         |           50 |           50 |
| Failed              |        **0** |        **0** |
| Requests/sec        | **3,012.59** | **2,703.63** |
| Test time           |    33.19 sec |    36.99 sec |
| Avg response        |  **16.6 ms** |  **18.5 ms** |
| 95% response        |    **24 ms** |    **31 ms** |
| 99% response        |    **34 ms** |    **50 ms** |
| Longest request     |       181 ms |       160 ms |
| Container memory    |    72.13 MiB |     61.34 MB |
| Node RSS            |     ~92.9 MB |     ~80.4 MB |
| Failed transactions |        **0** |        **0** |

What this tells us:-
Functionally:
Podman passed. ✅:-
Image builds
Application starts
Health check works
100K transactions work
No failed requests
Storage works
Logs work
Container restart persistence already passed

Performance in this particular local test:
Docker processed about 11% more requests/sec than Podman:
2703.63 / 3012.59 ≈ 89.7%

- Podman also used less container memory in this snapshot.

But this is not enough to call Podman a production performance blocker. It's one local run on your Mac, and Podman is running through its Linux VM (podman machine), so the environment itself can affect the numbers.

More important finding: npm vulnerability
----------------------------------------
Your Podman build showed:
2 high severity vulnerabilities

That is coming from the dependency audit, not from Podman itself.
We should record it as a dependency/security finding, not a Podman blocker.

- Next test: restart persistence on Podman:-

keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman wc -l /data/transactions.log
211001 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman restart cube-root-ms-podman
sleep 5
cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman wc -l /data/transactions.log
211001 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

#### Core POC status:
| Area                | Docker | Podman |
| ------------------- | ------ | ------ |
| Image build         | ✅      | ✅      |
| Application startup | ✅      | ✅      |
| Health check        | ✅      | ✅      |
| 100K requests       | ✅      | ✅      |
| Failed requests     | 0      | 0      |
| Logs                | ✅      | ✅      |
| Storage persistence | ✅      | ✅      |
| Container restart   | ✅      | ✅      |
| Resource usage      | ✅      | ✅      |

##### Our flow will be:

Podman image → Minikube → Kubernetes Deployment → Service → transaction test → logs/storage

keerthana@Keerthanas-MacBook-Air podman-migration-poc % minikube start
😄  minikube v1.38.1 on Darwin 26.4.1 (arm64)
🎉  minikube 1.39.0 is available! Download it: https://github.com/kubernetes/minikube/releases/tag/v1.39.0
💡  To disable this notice, run: 'minikube config set WantUpdateNotification false'

✨  Using the docker driver based on existing profile
👍  Starting "minikube" primary control-plane node in "minikube" cluster
🚜  Pulling base image v0.0.50 ...
🔄  Restarting existing docker container for "minikube" ...
🐳  Preparing Kubernetes v1.35.1 on Docker 29.2.1 ...
🔎  Verifying Kubernetes components...
🌟  Enabled addons: 

👍  Starting "minikube-m02" worker node in "minikube" cluster
🚜  Pulling base image v0.0.50 ...
🔄  Restarting existing docker container for "minikube-m02" ...
🌐  Found network options:
    ▪ NO_PROXY=192.168.49.2
🐳  Preparing Kubernetes v1.35.1 on Docker 29.2.1 ...
    ▪ env NO_PROXY=192.168.49.2
🔎  Verifying Kubernetes components...
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get nodes
NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   12d   v1.35.1
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman save -o cube-root-ms-podman.tar localhost/cube-root-ms:podman-poc
keerthana@Keerthanas-MacBook-Air podman-migration-poc % minikube image load cube-root-ms-podman.tar
keerthana@Keerthanas-MacBook-Air podman-migration-poc % minikube image ls | grep cube-root-ms
localhost/cube-root-ms:podman-poc
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/pvc.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
namespace/cube-poc created
persistentvolumeclaim/cube-transaction-pvc created
deployment.apps/cube-root-ms created
service/cube-root-ms created
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get all -n cube-poc
NAME                                READY   STATUS              RESTARTS   AGE
pod/cube-root-ms-68d4494568-8dt62   0/1     ContainerCreating   0          5s
pod/cube-root-ms-68d4494568-vj6pt   0/1     ErrImagePull        0          5s

NAME                   TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
service/cube-root-ms   NodePort   10.97.58.153   <none>        3001:30361/TCP   4s

NAME                           READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/cube-root-ms   0/2     2            0           5s

NAME                                      DESIRED   CURRENT   READY   AGE
replicaset.apps/cube-root-ms-68d4494568   2         2         0       5s
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get pods -n cube-poc -o wide
NAME                            READY   STATUS         RESTARTS   AGE   IP            NODE       NOMINATED NODE   READINESS GATES
cube-root-ms-68d4494568-8dt62   0/1     ErrImagePull   0          8s    10.244.0.23   minikube   <none>           <none>
cube-root-ms-68d4494568-vj6pt   0/1     ErrImagePull   0          8s    10.244.0.24   minikube   <none>           <none>
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get pods -n cube-poc -o wide
NAME                            READY   STATUS             RESTARTS   AGE   IP            NODE       NOMINATED NODE   READINESS GATES
cube-root-ms-68d4494568-8dt62   0/1     ErrImagePull       0          20s   10.244.0.23   minikube   <none>           <none>
cube-root-ms-68d4494568-vj6pt   0/1     ImagePullBackOff   0          20s   10.244.0.24   minikube   <none>           <none>
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get pods -n cube-poc -o wide -w
NAME                            READY   STATUS             RESTARTS   AGE   IP            NODE       NOMINATED NODE   READINESS GATES
cube-root-ms-68d4494568-8dt62   0/1     ImagePullBackOff   0          29s   10.244.0.23   minikube   <none>           <none>
cube-root-ms-68d4494568-vj6pt   0/1     ImagePullBackOff   0          29s   10.244.0.24   minikube   <none>           <none>
cube-root-ms-68d4494568-vj6pt   0/1     ErrImagePull       0          32s   10.244.0.24   minikube   <none>           <none>
cube-root-ms-68d4494568-8dt62   0/1     ErrImagePull       0          36s   10.244.0.23   minikube   <none>           <none>
cube-root-ms-68d4494568-vj6pt   0/1     ImagePullBackOff   0          44s   10.244.0.24   minikube   <none>           <none>
cube-root-ms-68d4494568-8dt62   0/1     ImagePullBackOff   0          49s   10.244.0.23   minikube   <none>           <none>
cube-root-ms-68d4494568-vj6pt   0/1     ErrImagePull       0          61s   10.244.0.24   minikube   <none>           <none>
cube-root-ms-68d4494568-8dt62   0/1     ErrImagePull       0          66s   10.244.0.23   minikube   <none>           <none>
^C%                                                                                                                                    
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl -n cube-poc set image deployment/cube-root-ms \
  cube-root-ms=localhost/cube-root-ms:podman-poc
deployment.apps/cube-root-ms image updated
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl -n cube-poc patch deployment cube-root-ms \
  -p '{"spec":{"template":{"spec":{"containers":[{"name":"cube-root-ms","imagePullPolicy":"IfNotPresent"}]}}}}'
deployment.apps/cube-root-ms patched (no change)
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get pods -n cube-poc -w
NAME                            READY   STATUS             RESTARTS   AGE
cube-root-ms-57d784f8d8-2xdm4   1/1     Running            0          10s
cube-root-ms-57d784f8d8-l7k98   0/1     Running            0          4s
cube-root-ms-68d4494568-8dt62   0/1     ImagePullBackOff   0          105s
cube-root-ms-57d784f8d8-l7k98   1/1     Running            0          7s
cube-root-ms-68d4494568-8dt62   0/1     Terminating        0          108s
cube-root-ms-68d4494568-8dt62   0/1     Terminating        0          108s
cube-root-ms-68d4494568-8dt62   0/1     Terminating        0          108s
cube-root-ms-68d4494568-8dt62   0/1     ContainerStatusUnknown   0          109s
cube-root-ms-68d4494568-8dt62   0/1     ContainerStatusUnknown   0          109s
cube-root-ms-68d4494568-8dt62   0/1     ContainerStatusUnknown   0          109s
^C%                                                                                                                                    
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get pods -n cube-poc -o wide
NAME                            READY   STATUS    RESTARTS   AGE   IP            NODE       NOMINATED NODE   READINESS GATES
cube-root-ms-57d784f8d8-2xdm4   1/1     Running   0          78s   10.244.0.25   minikube   <none>           <none>
cube-root-ms-57d784f8d8-l7k98   1/1     Running   0          72s   10.244.0.26   minikube   <none>           <none>
keerthana@Keerthanas-MacBook-Air podman-migration-poc % minikube service cube-root-ms -n cube-poc --url
http://127.0.0.1:58817
❗  Because you are using a Docker driver on darwin, the terminal needs to be open to run it.

--> this will be in run state

keerthana@Keerthanas-MacBook-Air podman-migration-poc % http://127.0.0.1:58817/health
zsh: no such file or directory: http://127.0.0.1:58817/health
keerthana@Keerthanas-MacBook-Air podman-migration-poc % http://127.0.0.1:58817/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"K8S-001","amount":1000}'
zsh: no such file or directory: http://127.0.0.1:58817/transactions
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://127.0.0.1:58817/health
{"status":"UP","engine":"podman","hostname":"cube-root-ms-57d784f8d8-2xdm4"}%                                                     
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -X POST http://127.0.0.1:58817/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"K8S-001","amount":1000}'
{"success":true,"transaction":{"transactionId":"K8S-001","amount":1000,"timestamp":"2026-09-16T07:04:39.420Z"}}%                  
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl exec -n cube-poc cube-root-ms-57d784f8d8-2xdm4 -- \
  cat /data/transactions.log
{"transactionId":"K8S-001","amount":1000,"timestamp":"2026-09-16T07:04:39.420Z"}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl exec -n cube-poc cube-root-ms-57d784f8d8-l7k98 -- \
  cat /data/transactions.log
{"transactionId":"K8S-001","amount":1000,"timestamp":"2026-09-16T07:04:39.420Z"}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get pvc -n cube-poc
NAME                   STATUS   VOLUME          CAPACITY   ACCESS MODES   STORAGECLASS   VOLUMEATTRIBUTESCLASS   AGE
cube-transaction-pvc   Bound    pvc-0c819212-22dc-4399-a3ee-6ad8b5a15808   1Gi        RWO            standard       <unset>          8m13s
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl describe pod -n cube-poc cube-root-ms-57d784f8d8-2xdm4 | grep -A5 -B2 /data
      CONTAINER_ENGINE:  podman
    Mounts:
      /data from transaction-storage (rw)
      /logs from application-logs (rw)
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-9prfb (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl exec -n cube-poc cube-root-ms-57d784f8d8-2xdm4 -- \
  wc -l /data/transactions.log
1 /data/transactions.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl delete pod -n cube-poc cube-root-ms-57d784f8d8-2xdm4
pod "cube-root-ms-57d784f8d8-2xdm4" deleted from cube-poc namespace
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get pods -n cube-poc -w
NAME                            READY   STATUS    RESTARTS   AGE
cube-root-ms-57d784f8d8-l7k98   1/1     Running   0          8m59s
cube-root-ms-57d784f8d8-m2ptw   1/1     Running   0          43s
^C%                                                              
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get pods -n cube-poc
NAME                            READY   STATUS    RESTARTS   AGE
cube-root-ms-57d784f8d8-l7k98   1/1     Running   0          9m5s
cube-root-ms-57d784f8d8-m2ptw   1/1     Running   0          49s
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl exec -n cube-poc cube-root-ms-57d784f8d8-m2ptw -- \
  cat /data/transactions.log
{"transactionId":"K8S-001","amount":1000,"timestamp":"2026-09-16T07:04:39.420Z"}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl logs -n cube-poc cube-root-ms-57d784f8d8-m2ptw

> cube-root-ms-podman-poc@1.0.0 start
> node server.js

Application running on port 3001
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl exec -n cube-poc cube-root-ms-57d784f8d8-m2ptw -- \
  cat /logs/application.log
cat: can't open '/logs/application.log': No such file or directory
command terminated with exit code 1
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get svc -n cube-poc
NAME           TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)       AGE
cube-root-ms   NodePort   10.97.58.153   <none>        3001:30361/TCP   11m
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

**Let's test the actual Service with the 100K benchmark first.**:

keerthana@Keerthanas-MacBook-Air podman-migration-poc % ab -n 100000 -c 50 \
  -p transaction.json \
  -T application/json \
  http://127.0.0.1:60210/transactions
This is ApacheBench, Version 2.3 <$Revision: 1923142 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 127.0.0.1 (be patient)
Completed 10000 requests
Completed 20000 requests
Completed 30000 requests
Completed 40000 requests
Completed 50000 requests
Completed 60000 requests
Completed 70000 requests
Completed 80000 requests
Completed 90000 requests
Completed 100000 requests
Finished 100000 requests


Server Software:        
Server Hostname:        127.0.0.1
Server Port:            60210

Document Path:          /transactions
Document Length:        115 bytes

Concurrency Level:      50
Time taken for tests:   79.973 seconds
Complete requests:      100000
Failed requests:        0
Total transferred:      25800000 bytes
Total body sent:        19400000
HTML transferred:       11500000 bytes
Requests per second:    1250.43 [#/sec] (mean)
Time per request:       39.986 [ms] (mean)
Time per request:       0.800 [ms] (mean, across all concurrent requests)
Transfer rate:          315.05 [Kbytes/sec] received
                        236.90 kb/s sent
                        551.95 kb/s total

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0    1   1.1      1      26
Processing:     1   38 197.2      6    6171
Waiting:        1   37 196.8      6    6171
Total:          1   39 197.1      7    6172

Percentage of the requests served within a certain time (ms)
  50%      7
  66%     12
  75%     14
  80%     16
  90%     44
  95%     60
  98%    368
  99%   1068
 100%   6172 (longest request)
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

* Kubernetes result:

| Metric       | Podman direct | Kubernetes Service |
| ------------ | ------------: | -----------------: |
| Requests     |          100K |               100K |
| Concurrency  |            50 |                 50 |
| Failed       |         **0** |              **0** |
| Requests/sec |      2,703.63 |       **1,250.43** |
| Avg response |       18.5 ms |        **40.0 ms** |
| 95%          |         31 ms |          **60 ms** |
| 99%          |         50 ms |       **1,068 ms** |
| Max          |        160 ms |       **6,172 ms** |

What does this mean?
The important result is:
Podman container → ~2,704 req/s

but
Kubernetes Service → ~1,250 req/s

So the Kubernetes path introduced significant overhead/variability in this local Minikube setup.

But this is not automatically a production blocker. We are going through:
ab
 ↓
localhost
 ↓
Minikube NodePort
 ↓
Kubernetes Service
 ↓
Pod
 ↓
Node.js
 ↓
PVC

And our application does a synchronous file write on every transaction:
POST
 ↓
fs.appendFileSync()
 ↓
response

That storage operation can strongly affect latency under concurrency.

* Next: check Kubernetes resource usage:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl top pods -n cube-poc
error: Metrics API not available
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl get pods -n cube-poc -o wide
NAME                            READY   STATUS    RESTARTS   AGE     IP            NODE       NOMINATED NODE   READINESS GATES
cube-root-ms-57d784f8d8-l7k98   1/1     Running   0          18m     10.244.0.26   minikube   <none>           <none>
cube-root-ms-57d784f8d8-m2ptw   1/1     Running   0          9m50s   10.244.0.27   minikube   <none>           <none>
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl describe pod -n cube-poc -l app=cube-root-ms | grep -A12 "Limits"
    Limits:
      cpu:     1
      memory:  512Mi
    Requests:
      cpu:      250m
      memory:   256Mi
    Liveness:   http-get http://:3001/health delay=10s timeout=1s period=10s #success=1 #failure=3
    Readiness:  http-get http://:3001/health delay=5s timeout=1s period=5s #success=1 #failure=3
    Environment:
      NODE_ENV:          poc
      CONTAINER_ENGINE:  podman
    Mounts:
      /data from transaction-storage (rw)
--
    Limits:
      cpu:     1
      memory:  512Mi
    Requests:
      cpu:      250m
      memory:   256Mi
    Liveness:   http-get http://:3001/health delay=10s timeout=1s period=10s #success=1 #failure=3
    Readiness:  http-get http://:3001/health delay=5s timeout=1s period=5s #success=1 #failure=3
    Environment:
      NODE_ENV:          poc
      CONTAINER_ENGINE:  podman
    Mounts:
      /data from transaction-storage (rw)
keerthana@Keerthanas-MacBook-Air podman-migration-poc % minikube addons enable metrics-server
💡  metrics-server is an addon maintained by Kubernetes. For any concerns contact minikube on GitHub.
You can view the list of minikube maintainers at: https://github.com/kubernetes/minikube/blob/master/OWNERS
    ▪ Using image registry.k8s.io/metrics-server/metrics-server:v0.8.1
🌟  The 'metrics-server' addon is enabled
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl top pods -n cube-poc
error: Metrics API not available
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl top pods -n cube-poc
error: Metrics API not available
keerthana@Keerthanas-MacBook-Air podman-migration-poc % sleep 30
keerthana@Keerthanas-MacBook-Air podman-migration-poc % kubectl top pods -n cube-poc
NAME                            CPU(cores)   MEMORY(bytes)   
cube-root-ms-57d784f8d8-l7k98   1m           80Mi            
cube-root-ms-57d784f8d8-m2ptw   2m           80Mi   

keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND     CREATED      STATUS         PORTS                   NAMES
ef2068768cac  localhost/cube-root-ms:podman-poc  npm start   53 minutes ago  Up 46 minutes  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stop cube-root-ms-podman
cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman --version
podman info
kubectl version --client
node --version
npm --version
podman version 6.1.1
Client:
  APIVersion: 6.1.1
  BuildOrigin: brew
  Built: 1788354743
  BuiltTime: Wed Sep  2 18:42:23 2026
  GitCommit: ""
  GoVersion: go1.27.1
  Os: darwin
  OsArch: darwin/arm64
  Version: 6.1.1
host:
  arch: arm64
  buildahVersion: 1.45.0
  cdiSpecDirs:
  - /etc/cdi
  - /var/run/cdi
  cgroupControllers:
  - cpu
  - io
  - memory
  - pids
  cgroupManager: systemd
  cgroupVersion: v2
  conmon:
    package: conmon-2.2.1-2.fc44.aarch64
    path: /usr/bin/conmon
    version: 'conmon version 2.2.1, commit: '
  cpuUtilization:
    idlePercent: 98.52
    systemPercent: 0.73
    userPercent: 0.75
  cpus: 5
  databaseBackend: sqlite
  distribution:
    distribution: fedora
    variant: podman-machine-os
    version: "44"
  emulatedArchitectures:
  - linux/386
  - linux/amd64
  - linux/arm64be
  eventLogger: journald
  freeLocks: 2020
  hostname: localhost.localdomain
  idMappings:
    gidmap:
    - container_id: 0
      host_id: 1000
      size: 1
    - container_id: 1
      host_id: 100000
      size: 1000000
    uidmap:
    - container_id: 0
      host_id: 501
      size: 1
    - container_id: 1
      host_id: 100000
      size: 1000000
  kernel: 7.1.8-200.fc44.aarch64
  linkmode: dynamic
  logDriver: journald
  memAvailable: 1539100672
  memFree: 1015283712
  memTotal: 2035326976
  networkBackend: netavark
  networkBackendInfo:
    backend: netavark
    defaultNetwork: podman
    dns:
      package: aardvark-dns-2.1.0-1.fc44.aarch64
      path: /usr/libexec/podman/aardvark-dns
      version: aardvark-dns 2.1.0
    package: netavark-2.1.0-1.fc44.aarch64
    path: /usr/libexec/podman/netavark
    version: netavark 2.1.0
  ociRuntime:
    name: crun
    package: crun-1.29.1-1.fc44.aarch64
    path: /usr/bin/crun
    version: |-
      crun version 1.29.1
      commit: f0d911de5587342cfeb16473bf32ecdfeaf25957
      rundir: /run/user/501/crun
      spec: 1.0.0
      +SYSTEMD +SELINUX +APPARMOR +CAP +SECCOMP +EBPF +CRIU +LIBKRUN +WASM:wasmedge +JSON_C
  os: linux
  pasta:
    executable: /usr/bin/pasta
    package: passt-0^20260728.gf8df3f1-2.fc44.aarch64
    version: |
      pasta 0^20260728.gf8df3f1-2.fc44.aarch64-pasta
      Copyright Red Hat
      GNU General Public License, version 2 or later
        <https://www.gnu.org/licenses/old-licenses/gpl-2.0.html>
      This is free software: you are free to change and redistribute it.
      There is NO WARRANTY, to the extent permitted by law.
  remoteSocket:
    exists: true
    path: unix:///run/user/501/podman/podman.sock
  rootlessNetworkCmd: pasta
  rootlessPortForwarder: rootlessport
  security:
    apparmorEnabled: false
    capabilities: CAP_CHOWN,CAP_DAC_OVERRIDE,CAP_FOWNER,CAP_FSETID,CAP_KILL,CAP_NET_BIND_SERVICE,CAP_SETFCAP,CAP_SETGID,CAP_SETPCAP,CAP_SETUID,CAP_SYS_CHROOT
    rootless: true
    seccompEnabled: true
    seccompProfilePath: /usr/share/containers/seccomp.json
    selinuxEnabled: true
  serviceIsRemote: true
  swapFree: 0
  swapTotal: 0
  uptime: 1h 48m 35.00s (Approximately 0.04 days)
  variant: v8
plugins:
  authorization: null
  log:
  - k8s-file
  - none
  - passthrough
  - journald
  network:
  - bridge
  - macvlan
  - ipvlan
  volume:
  - local
registries:
  docker.io:
    Blocked: false
    Insecure: false
    Location: docker.io
    MirrorByDigestOnly: false
    Mirrors: null
    NamespaceProxy: ""
    Prefix: docker.io
    PullFromMirror: ""
  search:
  - docker.io
store:
  containerStore:
    number: 10
    paused: 0
    running: 0
    stopped: 10
  graphDriverName: overlay
  graphOptions:
    overlay.mountopt: nodev
  graphRoot: /var/home/core/.local/share/containers/storage
  graphRootAllocated: 106769133568
  graphRootUsed: 8132661248
  graphStatus:
    Backing Filesystem: xfs
    Native Overlay Diff: "true"
    Supports d_type: "true"
    Supports shifting: "false"
    Supports volatile: "true"
    Using metacopy: "false"
  imageCopyTmpDir: /var/tmp
  imageStore:
    number: 98
  runRoot: /run/user/501/containers
  transientStore: false
  volumePath: /var/home/core/.local/share/containers/storage/volumes
version:
  APIVersion: 6.1.1
  BuildOrigin: 'Copr: packit/podman-container-tools-podman-29700'
  Built: 1788307200
  BuiltTime: Wed Sep  2 05:30:00 2026
  GitCommit: 8303f2e25b675ea7f82099d615c60969aec15870
  GoVersion: go1.26.7-X:nodwarf5
  Os: linux
  OsArch: linux/arm64
  Version: 6.1.1

Client Version: v1.36.1
Kustomize Version: v5.8.1
v26.5.0
11.17.0
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

* One important finding:
Kubernetes /logs currently uses:

emptyDir: {}

So when the pod is recreated, those file logs disappear.
That is not a Podman failure. It's a Kubernetes logging/storage design issue. In production, application logs should normally go to stdout/stderr and be collected by the logging system.

