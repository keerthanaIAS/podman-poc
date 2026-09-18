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

###### Logs Test:

keerthana@Mac-2910 podman-poc % cp -R podman-migration-poc ~/podman-migration-poc
keerthana@Mac-2910 podman-poc % pwd
/Applications/podman-poc
keerthana@Mac-2910 podman-poc % cd ~/podman-migration-poc
keerthana@Mac-2910 podman-migration-poc % pwd
/Users/keerthana/podman-migration-poc
keerthana@Mac-2910 podman-migration-poc % ls -ld data logs
drwxr-xr-x@ 2 keerthana  staff  64 Sep 17 10:39 data
drwxr-xr-x@ 2 keerthana  staff  64 Sep 17 10:39 logs
keerthana@Mac-2910 podman-migration-poc % podman run -d \
  --name cube-root-ms-podman \
  -p 3001:3001 \
  -v "$(pwd)/data:/data" \
  -v "$(pwd)/logs:/logs" \
  -e CONTAINER_ENGINE=podman \
  localhost/cube-root-ms:podman-poc
4e64357e7c2f2e42f9c09f4f804a4c1a64ea143218abcf80f5779ba1b0ed17bb
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND     CREATED        STATUS        PORTS                   NAMES
4e64357e7c2f  localhost/cube-root-ms:podman-poc  npm start   8 seconds ago  Up 8 seconds  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % podman logs cube-root-ms-podman

> cube-root-ms-podman-poc@1.0.0 start
> node server.js

Application running on port 3001
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3001/health
{"status":"UP","engine":"podman","hostname":"4e64357e7c2f"}%         
keerthana@Mac-2910 podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-LOG-001","amount":100}'
{"success":true,"transaction":{"transactionId":"TXN-LOG-001","amount":100,"timestamp":"2026-09-17T05:10:12.689Z"}}%         
keerthana@Mac-2910 podman-migration-poc % cat logs/application.log
cat data/transactions.log
{"timestamp":"2026-09-17T05:10:12.693Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOG-001"}
{"transactionId":"TXN-LOG-001","amount":100,"timestamp":"2026-09-17T05:10:12.689Z"}
keerthana@Mac-2910 podman-migration-poc % mkdir -p monitoring/promtail
mkdir -p monitoring/loki
mkdir -p monitoring/grafana
keerthana@Mac-2910 podman-migration-poc % find monitoring -maxdepth 2 -type d
monitoring
monitoring/loki
monitoring/promtail
monitoring/grafana
keerthana@Mac-2910 podman-migration-poc % cd ~/podman-migration-poc
keerthana@Mac-2910 podman-migration-poc % cat > monitoring/loki/loki-config.yml <<'EOF'
auth_enabled: false

server:
  http_listen_port: 3100

common:
  path_prefix: /loki
  replication_factor: 1

  ring:
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: 2024-01-01
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

storage_config:
  filesystem:
    directory: /loki/chunks

limits_config:
  allow_structured_metadata: true
  volume_enabled: true

compactor:
  working_directory: /loki/compactor
EOF
keerthana@Mac-2910 podman-migration-poc % cat monitoring/loki/loki-config.yml
auth_enabled: false

server:
  http_listen_port: 3100

common:
  path_prefix: /loki
  replication_factor: 1

  ring:
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: 2024-01-01
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

storage_config:
  filesystem:
    directory: /loki/chunks

limits_config:
  allow_structured_metadata: true
  volume_enabled: true

compactor:
  working_directory: /loki/compactor
keerthana@Mac-2910 podman-migration-poc % podman pull docker.io/grafana/loki:3.5.0
Trying to pull docker.io/grafana/loki:3.5.0...
Getting image source signatures
Copying blob sha256:d82bc7a76a838c9a4a6025192429c2fed58f73742ef1fb9c8bb7b995fc3b7213
Copying blob sha256:2ae251fec02fb291b816530bdcf7100d568a00cf07a17962297fc48f43198368
Copying blob sha256:4e9f20d26c878a5db592123720f66b04bddf045879f6c0ad45e069a991543fa9
Copying blob sha256:0f8b424aa0b96c1c388a5fd4d90735604459256336853082afb61733438872b5
Copying blob sha256:2e4cf50eeb92ac3a7afe75e15d96a26dee99449f86b46c75b5d95f4418a5bca0
Copying blob sha256:d557676654e572af3e3173c90e7874644207fda32cd87e9d3d66b5d7b98a7b21
Copying blob sha256:d858cbc252ade14879807ff8dbc3043a26bbdb92087da98cda831ee040b172b3
Copying blob sha256:1069fc2daed1aceff7232f4b8ab21200dd3d8b04f61be9da86977a34a105dfdc
Copying blob sha256:b40161cd83fc5d470d6abe50e87aa288481b6b89137012881d74187cfbf9f502
Copying blob sha256:3f4e2c5863480125882d92060440a5250766bce764fee10acdbac18c872e4dc7
Copying blob sha256:80a8c047508ae5cd6a591060fc43422cb8e3aea1bd908d913e8f0146e2297fea
Copying blob sha256:ffeccacd1a73f8a1055b6788095c49c08bd4c9aed41238cd847871ed8f4bc8da
Copying blob sha256:acc196203923cd80240885f8d30c2a5f68925c13d0142a59c21cff393f156ca9
Copying blob sha256:9ff8ca30ade172a134e9c869d63886fda40dae5e2804e3649bbd0c3848343ec4
Copying blob sha256:1975d20307b8cf0ec57241e2acfe01b60e8bf5157a5e6ee2ecc1431e4e0608b1
Copying blob sha256:b400795ea231c6a25410446fb51718f306847e44a8317b8d9f398f1371b3c1d1
Copying config sha256:c8f7864de9ad688bb9219730b06c8941b86997dd2122f7066a6289e63c6f87e7
Writing manifest to image destination
c8f7864de9ad688bb9219730b06c8941b86997dd2122f7066a6289e63c6f87e7
keerthana@Mac-2910 podman-migration-poc % podman run -d \
  --name loki \
  -p 3100:3100 \
  -v "$(pwd)/monitoring/loki/loki-config.yml:/etc/loki/config.yml:ro" \
  -v "$(pwd)/monitoring/loki:/loki" \
  docker.io/grafana/loki:3.5.0 \
  -config.file=/etc/loki/config.yml
b22e8465e98603cf1d6a49e7bf09b958caf8df80deff18f79448fd812729e398
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED         STATUS         PORTS                   NAMES
4e64357e7c2f  localhost/cube-root-ms:podman-poc  npm start             5 minutes ago   Up 5 minutes   0.0.0.0:3001->3001/tcp  cube-root-ms-podman
b22e8465e986  docker.io/grafana/loki:3.5.0       -config.file=/etc...  15 seconds ago  Up 16 seconds  0.0.0.0:3100->3100/tcp  loki
keerthana@Mac-2910 podman-migration-poc % podman logs loki
level=info ts=2026-09-17T05:14:39.980302393Z caller=main.go:126 msg="Starting Loki" version="(version=3.5.0, branch=k248, revision=4b16bc4f)"
level=info ts=2026-09-17T05:14:39.980331226Z caller=main.go:127 msg="Loading configuration file" filename=/etc/loki/config.yml
level=info ts=2026-09-17T05:14:39.981232851Z caller=server.go:368 msg="server listening on addresses" http=[::]:3100 grpc=[::]:9095
level=info ts=2026-09-17T05:14:39.982379268Z caller=modules.go:1420 msg="Ruler storage is not configured; ruler will not be started."
level=info ts=2026-09-17T05:14:39.98810006Z caller=table_manager.go:136 index-store=tsdb-2024-01-01 msg="uploading tables"
level=info ts=2026-09-17T05:14:39.989737351Z caller=table_manager.go:300 index-store=tsdb-2024-01-01 msg="query readiness setup completed" duration=1.833µs distinct_users_len=0 distinct_users=
level=info ts=2026-09-17T05:14:39.989771976Z caller=shipper.go:165 index-store=tsdb-2024-01-01 msg="starting index shipper in RW mode"
level=info ts=2026-09-17T05:14:39.998804101Z caller=head_manager.go:308 index-store=tsdb-2024-01-01 component=tsdb-head-manager msg="loaded wals by period" groups=0
level=info ts=2026-09-17T05:14:39.999174643Z caller=manager.go:86 index-store=tsdb-2024-01-01 component=tsdb-manager msg="loaded leftover local indices" err=null successful=true buckets=0 indices=0 failures=0
level=info ts=2026-09-17T05:14:39.999532393Z caller=head_manager.go:308 index-store=tsdb-2024-01-01 component=tsdb-head-manager msg="loaded wals by period" groups=0
level=warn ts=2026-09-17T05:14:40.009778185Z caller=modules.go:1443 msg="RulerStorage is nil. Not starting the ruler."
level=info ts=2026-09-17T05:14:40.009894268Z caller=worker.go:131 component=querier msg="Starting querier worker using query-scheduler and scheduler ring for addresses"
level=info ts=2026-09-17T05:14:40.027446352Z caller=module_service.go:82 msg=starting module=cache-generation-loader
level=info ts=2026-09-17T05:14:40.02750256Z caller=module_service.go:82 msg=starting module=server
level=info ts=2026-09-17T05:14:40.027533852Z caller=module_service.go:82 msg=starting module=query-frontend-tripperware
level=info ts=2026-09-17T05:14:40.027539727Z caller=module_service.go:82 msg=starting module=memberlist-kv
level=info ts=2026-09-17T05:14:40.027564018Z caller=module_service.go:82 msg=starting module=ring
level=info ts=2026-09-17T05:14:40.027716393Z caller=module_service.go:82 msg=starting module=query-scheduler-ring
level=info ts=2026-09-17T05:14:40.027716852Z caller=ring.go:361 msg="ring doesn't exist in KV store yet"
level=info ts=2026-09-17T05:14:40.027783852Z caller=ring.go:361 msg="ring doesn't exist in KV store yet"
level=info ts=2026-09-17T05:14:40.027810685Z caller=module_service.go:82 msg=starting module=analytics
level=info ts=2026-09-17T05:14:40.027866685Z caller=module_service.go:82 msg=starting module=store
level=info ts=2026-09-17T05:14:40.027929977Z caller=basic_lifecycler.go:301 msg="instance not found in the ring" instance=b22e8465e986 ring=scheduler
level=info ts=2026-09-17T05:14:40.027939393Z caller=basic_lifecycler_delegates.go:63 msg="not loading tokens from file, tokens file pathis empty"
level=info ts=2026-09-17T05:14:40.027962852Z caller=module_service.go:82 msg=starting module=ingester-querier
level=info ts=2026-09-17T05:14:40.028066602Z caller=ringmanager.go:186 msg="waiting until scheduler is JOINING in the ring"
level=info ts=2026-09-17T05:14:40.02808056Z caller=ringmanager.go:190 msg="scheduler is JOINING in the ring"
level=info ts=2026-09-17T05:14:40.028102893Z caller=module_service.go:82 msg=starting module=rule-evaluator
level=info ts=2026-09-17T05:14:40.028106893Z caller=module_service.go:82 msg=starting module=compactor
level=info ts=2026-09-17T05:14:40.028121435Z caller=ringmanager.go:199 msg="waiting until scheduler is ACTIVE in the ring"
level=info ts=2026-09-17T05:14:40.028125518Z caller=module_service.go:82 msg=starting module=ingester
level=info ts=2026-09-17T05:14:40.028151977Z caller=ingester.go:564 component=ingester msg="recovering from checkpoint"
level=info ts=2026-09-17T05:14:40.028167518Z caller=basic_lifecycler.go:301 msg="instance not found in the ring" instance=b22e8465e986 ring=compactor
level=info ts=2026-09-17T05:14:40.028174185Z caller=basic_lifecycler_delegates.go:63 msg="not loading tokens from file, tokens file pathis empty"
level=info ts=2026-09-17T05:14:40.028191727Z caller=ring.go:361 msg="ring doesn't exist in KV store yet"
level=info ts=2026-09-17T05:14:40.028204185Z caller=module_service.go:82 msg=starting module=distributor
level=info ts=2026-09-17T05:14:40.028300352Z caller=compactor.go:443 msg="waiting until compactor is JOINING in the ring"
level=info ts=2026-09-17T05:14:40.02831281Z caller=compactor.go:447 msg="compactor is JOINING in the ring"
level=error ts=2026-09-17T05:14:40.028292143Z caller=ratestore.go:109 msg="error getting ingester clients" err="empty ring"
level=info ts=2026-09-17T05:14:40.028331435Z caller=ring.go:361 component=distributor msg="ring doesn't exist in KV store yet"
level=info ts=2026-09-17T05:14:40.028349685Z caller=compactor.go:457 msg="waiting until compactor is ACTIVE in the ring"
level=info ts=2026-09-17T05:14:40.028384727Z caller=basic_lifecycler.go:301 component=distributor msg="instance not found in the ring" instance=b22e8465e986 ring=distributor
level=info ts=2026-09-17T05:14:40.02884081Z caller=recovery.go:41 component=ingester msg="no checkpoint found, treating as no-op"
level=info ts=2026-09-17T05:14:40.028896643Z caller=ingester.go:580 component=ingester msg="recovered WAL checkpoint recovery finished" elapsed=746.25µs errors=false
level=info ts=2026-09-17T05:14:40.028908185Z caller=ingester.go:586 component=ingester msg="recovering from WAL"
level=info ts=2026-09-17T05:14:40.030215768Z caller=ingester.go:602 component=ingester msg="WAL segment recovery finished" elapsed=2.065833ms errors=false
level=info ts=2026-09-17T05:14:40.030223727Z caller=ingester.go:550 component=ingester msg="closing recoverer"
level=info ts=2026-09-17T05:14:40.03024006Z caller=ingester.go:558 component=ingester msg="WAL recovery finished" time=2.089875ms
level=info ts=2026-09-17T05:14:40.030276935Z caller=wal.go:157 msg=started component=wal
level=info ts=2026-09-17T05:14:40.030405477Z caller=lifecycler.go:677 component=ingester msg="not loading tokens from file, tokens file path is empty"
level=info ts=2026-09-17T05:14:40.030422143Z caller=ingester.go:771 component=ingester msg="sleeping for initial delay before starting periodic flushing" delay=13.654995515s
level=info ts=2026-09-17T05:14:40.03043206Z caller=lifecycler.go:704 component=ingester msg="instance not found in ring, adding with no tokens" ring=ingester
level=info ts=2026-09-17T05:14:40.030500852Z caller=lifecycler.go:546 component=ingester msg="auto-joining cluster after timeout" ring=ingester
level=info ts=2026-09-17T05:14:40.15034777Z caller=ringmanager.go:203 msg="scheduler is ACTIVE in the ring"
level=info ts=2026-09-17T05:14:40.15042027Z caller=module_service.go:82 msg=starting module=query-scheduler
level=info ts=2026-09-17T05:14:40.15052127Z caller=module_service.go:82 msg=starting module=query-frontend
level=info ts=2026-09-17T05:14:40.150571145Z caller=module_service.go:82 msg=starting module=querier
level=info ts=2026-09-17T05:14:40.221789313Z caller=compactor.go:461 msg="compactor is ACTIVE in the ring"
level=info ts=2026-09-17T05:14:40.221875646Z caller=loki.go:581 msg="Loki started" startup_time=316.296629ms
level=info ts=2026-09-17T05:14:43.153928809Z caller=scheduler.go:653 msg="this scheduler is in the ReplicationSet, will now accept requests."
level=info ts=2026-09-17T05:14:43.1539796Z caller=worker.go:232 component=querier msg="adding connection" addr=10.88.0.4:9095
level=info ts=2026-09-17T05:14:45.226447169Z caller=compactor.go:522 msg="this instance has been chosen to run the compactor, starting compactor"
level=info ts=2026-09-17T05:14:45.226627669Z caller=compactor.go:551 msg="waiting 10m0s for ring to stay stable and previous compactionsto finish before starting compactor"
level=info ts=2026-09-17T05:14:50.151760399Z caller=frontend_scheduler_worker.go:107 msg="adding connection to scheduler" addr=10.88.0.4:9095
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3100/ready
Ingester not ready: waiting for 15s after being ready
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3100/metrics | head
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0# HELP deprecated_flags_inuse_total The number of deprecated flags currently set.
# TYPE deprecated_flags_inuse_total counter
deprecated_flags_inuse_total 0
# HELP go_cgo_go_to_c_calls_calls_total Count of calls made from Go to C by the current process. Sourced from /cgo/go-to-c-calls:calls.
# TYPE go_cgo_go_to_c_calls_calls_total counter
go_cgo_go_to_c_calls_calls_total 0
# HELP go_cpu_classes_gc_mark_assist_cpu_seconds_total Estimated total CPU time goroutines spent performing GC tasks to assist the GC and prevent it from falling behind the application. This metric is an overestimate, and not directly comparable to system CPU time measurements. Compare only with other /cpu/classes metrics. Sourced from /cpu/classes/gc/mark/assist:cpu-seconds.
# TYPE go_cpu_classes_gc_mark_assist_cpu_seconds_total counter
go_cpu_classes_gc_mark_assist_cpu_seconds_total 0.002907296
# HELP go_cpu_classes_gc_mark_dedicated_cpu_seconds_total Estimated total CPU time spent performing GC tasks on processors (as defined by GOMAXPROCS) dedicated to those tasks. This metric is an overestimate, and not directly comparable to system CPU time measurements. Compare only with other /cpu/classes metrics. Sourced from /cpu/classes/gc/mark/dedicated:cpu-seconds.
100 64755    0 64755    0     0  7510k      0 --:--:-- --:--:-- --:--:-- 7904k
curl: (23) Failure writing output to destination, passed 2048 returned 0
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3100/ready
ready
eerthana@Mac-2910 podman-migration-poc % cat ~/podman-migration-poc/logs/application.log
{"timestamp":"2026-09-17T05:10:12.693Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOG-001"}
keerthana@Mac-2910 podman-migration-poc % podman network create podman-logging
podman-logging
keerthana@Mac-2910 podman-migration-poc % podman network connect podman-logging cube-root-ms-podman
podman network connect podman-logging loki
keerthana@Mac-2910 podman-migration-poc % podman network inspect podman-logging
[
     {
          "name": "podman-logging",
          "id": "dbc8f61d183eab381faa1e695e1cd6d0b88426fb32f1799154ef5791708b6b84",
          "driver": "bridge",
          "network_interface": "podman1",
          "created": "2026-09-17T05:16:53.743476197Z",
          "subnets": [
               {
                    "subnet": "10.89.0.0/24",
                    "gateway": "10.89.0.1"
               }
          ],
          "ipv6_enabled": false,
          "internal": false,
          "dns_enabled": true,
          "ipam_options": {
               "driver": "host-local"
          },
          "containers": {
               "4e64357e7c2f2e42f9c09f4f804a4c1a64ea143218abcf80f5779ba1b0ed17bb": {
                    "name": "cube-root-ms-podman",
                    "interfaces": {
                         "eth1": {
                              "subnets": [
                                   {
                                        "ipnet": "10.89.0.2/24",
                                        "gateway": "10.89.0.1"
                                   }
                              ],
                              "mac_address": "c2:d0:04:0c:d4:d0"
                         }
                    }
               },
               "b22e8465e98603cf1d6a49e7bf09b958caf8df80deff18f79448fd812729e398": {
                    "name": "loki",
                    "interfaces": {
                         "eth1": {
                              "subnets": [
                                   {
                                        "ipnet": "10.89.0.3/24",
                                        "gateway": "10.89.0.1"
                                   }
                              ],
                              "mac_address": "2e:31:c9:a0:7d:94"
                         }
                    }
               }
          }
     }
]
keerthana@Mac-2910 podman-migration-poc % cat > monitoring/promtail/promtail-config.yml <<'EOF'
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: podman-application
    static_configs:
      - targets:
          - localhost
        labels:
          job: podman-application
          container: cube-root-ms-podman
          engine: podman
          __path__: /logs/application.log
EOF
keerthana@Mac-2910 podman-migration-poc % cat monitoring/promtail/promtail-config.yml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: podman-application
    static_configs:
      - targets:
          - localhost
        labels:
          job: podman-application
          container: cube-root-ms-podman
          engine: podman
          __path__: /logs/application.log
keerthana@Mac-2910 podman-migration-poc % podman pull docker.io/grafana/promtail:3.5.0
Trying to pull docker.io/grafana/promtail:3.5.0...
Getting image source signatures
Copying blob sha256:990bb5536bce8e2f8750316032b9e49d70793d6f62c0a7986d579a4ba5f8c1db
Copying blob sha256:acbfb9f56dc526798e37a670906327c04a8e1aafb246b079891e440e9c2756b9
Copying blob sha256:b926be395aa562b857e4065636f6575effe95f79b9b23e08f5699bc4a9741d06
Copying blob sha256:3be09b22b3ba3348a2cb2838fc28cc2df62bf5014aa7a385e65a75d71722f33c
Copying config sha256:491d8e6cce57772f93393b451755c6f38b4854afc4414d6ab1fdad060bdc0a26
Writing manifest to image destination
491d8e6cce57772f93393b451755c6f38b4854afc4414d6ab1fdad060bdc0a26
keerthana@Mac-2910 podman-migration-poc % podman run -d \
  --name promtail \
  --network podman-logging \
  -v "$(pwd)/monitoring/promtail/promtail-config.yml:/etc/promtail/config.yml:ro" \
  -v "$(pwd)/monitoring/promtail:/tmp" \
  -v "$(pwd)/logs:/logs:ro" \
  docker.io/grafana/promtail:3.5.0 \
  -config.file=/etc/promtail/config.yml
e52440beec4952f7f484f4a1b5e0dc9281b1de0526f327f70ce802a88584b933
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED        STATUS        PORTS                   NAMES
4e64357e7c2f  localhost/cube-root-ms:podman-poc  npm start             8 minutes ago  Up 8 minutes  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
b22e8465e986  docker.io/grafana/loki:3.5.0       -config.file=/etc...  3 minutes ago  Up 3 minutes  0.0.0.0:3100->3100/tcp  loki
e52440beec49  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  4 seconds ago  Up 4 seconds                          promtail
keerthana@Mac-2910 podman-migration-poc % podman logs promtail
level=info ts=2026-09-17T05:17:55.236056569Z caller=promtail.go:135 msg="Reloading configuration file" sha3sum=416ab509ce8b7b1d53edeae9e2288c42cf7f144ea2cd5b5d467cbf228f37b28a
level=info ts=2026-09-17T05:17:55.237678939Z caller=server.go:368 msg="server listening on addresses" http=[::]:9080 grpc=[::]:35629
level=info ts=2026-09-17T05:17:55.237799356Z caller=main.go:173 msg="Starting Promtail" version="(version=3.5.0, branch=k248, revision=4b16bc4f)"
level=warn ts=2026-09-17T05:17:55.237915397Z caller=promtail.go:265 msg="enable watchConfig"
level=info ts=2026-09-17T05:18:00.237915018Z caller=filetargetmanager.go:373 msg="Adding target" key="/logs/application.log:{container=\"cube-root-ms-podman\", engine=\"podman\", job=\"podman-application\"}"
level=info ts=2026-09-17T05:18:00.239004306Z caller=filetarget.go:343 msg="watching new directory" directory=/logs
level=info ts=2026-09-17T05:18:00.241218424Z caller=tailer.go:147 component=tailer msg="tail routine: started" path=/logs/application.log
ts=2026-09-17T05:18:00.241323716Z caller=log.go:168 level=info msg="Seeked /logs/application.log - &{Offset:0 Whence:0}"
keerthana@Mac-2910 podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-LOG-002","amount":250}'
{"success":true,"transaction":{"transactionId":"TXN-LOG-002","amount":250,"timestamp":"2026-09-17T05:18:53.557Z"}}%                      
keerthana@Mac-2910 podman-migration-poc % tail -n 5 logs/application.log
{"timestamp":"2026-09-17T05:10:12.693Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOG-001"}
{"timestamp":"2026-09-17T05:18:53.560Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOG-002"}
keerthana@Mac-2910 podman-migration-poc % curl -G -s 'http://localhost:3100/loki/api/v1/query' \
  --data-urlencode 'query={container="cube-root-ms-podman"}'
log queries are not supported as an instant query type, please change your query to a range query type%                                  
keerthana@Mac-2910 podman-migration-poc % curl -G -s 'http://localhost:3100/loki/api/v1/query_range' \
  --data-urlencode 'query={container="cube-root-ms-podman"}' \
  --data-urlencode 'limit=20'
{"status":"success","data":{"resultType":"streams","result":[{"stream":{"container":"cube-root-ms-podman","detected_level":"unknown","engine":"podman","filename":"/logs/application.log","job":"podman-application","service_name":"cube-root-ms-podman"},"values":[["1789622333663374343","{\"timestamp\":\"2026-09-17T05:18:53.560Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-LOG-002\"}"],["1789622280241597215","{\"timestamp\":\"2026-09-17T05:10:12.693Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-LOG-001\"}"]]}],"stats":{"summary":{"bytesProcessedPerSecond":11825,"linesProcessedPerSecond":107,"totalBytesProcessed":220,"totalLinesProcessed":2,"execTime":0.018604,"queueTime":0.000803,"subqueries":0,"totalEntriesReturned":2,"splits":2,"shards":2,"totalPostFilterLines":2,"totalStructuredMetadataBytesProcessed":16},"querier":{"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":0,"headChunkLines":0,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":0,"headChunkStructuredMetadataBytes":0,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":0,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"ingester":{"totalReached":2,"totalChunksMatched":1,"totalBatches":3,"totalLinesSent":2,"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":220,"headChunkLines":2,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":2,"headChunkStructuredMetadataBytes":16,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":295791,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"cache":{"chunk":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"index":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"result":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"statsResult":{"entriesFound":0,"entriesRequested":1,"entriesStored":1,"bytesReceived":0,"bytesSent":0,"requests":2,"downloadTime":11333,"queryLengthServed":0},"volumeResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"seriesResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"labelResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"instantMetricResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0}},"index":{"totalChunks":0,"postFilterChunks":0,"shardsDuration":0,"usedBloomFilters":false}}}}
keerthana@Mac-2910 podman-migration-poc % podman pull docker.io/grafana/grafana:12.1.1
Trying to pull docker.io/grafana/grafana:12.1.1...
Getting image source signatures
Copying blob sha256:9f1d07f405236a143898b4b763d5e5a14ff6e6d9e80db74f85aa87aa53160ff4
Copying blob sha256:6e174226ea690ced550e5641249a412cdbefd2d09871f3e64ab52137a54ba606
Copying blob sha256:464d91115c2e79f2d8abaa4d034997fb2103a651478809b117b82e8b5c7911a9
Copying blob sha256:3540d00d3a8ddb843b14737f51a2f2e574af14d872498761dfb5c9831fe66b22
Copying blob sha256:4f4fb700ef54461cfa02571ae0db9a0dc1e0cdb5577484a6d75e68dc38e8acc1
Copying blob sha256:ded2bfdd8adf70aa3e0cffeff770f070acdef7dbdea0a2eb0aec18244cf935b7
Copying blob sha256:c049b4b5b81dbe2f9311c4c436945eefd0ff14a56fcb7d6f51716b8b1e1efd4c
Copying blob sha256:6b1ef42fa3bc2ca3cabd73a56c76f2b53c569a50affea7d74e39e49bdde5d005
Copying blob sha256:7f46d17c4b0fe75e2f741ef4a0dec54afd3bcf7fdb068a9187603b62c448d3e9
Copying blob sha256:476716c10da134c0654a5001b311edd5af20b24335a3b19636a04f1be8ddac33
Copying config sha256:084f3a553cf1777e85018b325d51228a6edb99d70730044bb6c56f5b04be3932
Writing manifest to image destination
084f3a553cf1777e85018b325d51228a6edb99d70730044bb6c56f5b04be3932
keerthana@Mac-2910 podman-migration-poc % podman run -d \
  --name grafana \
  --network podman-logging \
  -p 3000:3000 \
  -v "$(pwd)/monitoring/grafana:/var/lib/grafana" \
  docker.io/grafana/grafana:12.1.1
1d8d0008ffa911bb850b96a851addf5aea68f87d8a2e2ec61e80c55a7c06cfbd
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED         STATUS         PORTS                   NAMES
4e64357e7c2f  localhost/cube-root-ms:podman-poc  npm start             14 minutes ago  Up 14 minutes  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
b22e8465e986  docker.io/grafana/loki:3.5.0       -config.file=/etc...  9 minutes ago   Up 9 minutes   0.0.0.0:3100->3100/tcp  loki
e52440beec49  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  6 minutes ago   Up 6 minutes                           promtail
1d8d0008ffa9  docker.io/grafana/grafana:12.1.1                         6 seconds ago   Up 6 seconds   0.0.0.0:3000->3000/tcp  grafana
keerthana@Mac-2910 podman-migration-poc % 

* Check Grafana logs:
podman logs grafana - **HTTP Server Listen** we get

Then open:
===========
http://localhost:3000


Grafana's default login is:
============================
Username: admin
Password: admin --> can update this one

###### Log retrieval check:

**Restart test container, promtail, loki**: ✅ Passed

keerthana@Mac-2910 podman-migration-poc % podman restart cube-root-ms-podman
cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED         STATUS         PORTS                   NAMES
4e64357e7c2f  localhost/cube-root-ms:podman-poc  npm start             25 minutes ago  Up 5 seconds   0.0.0.0:3001->3001/tcp  cube-root-ms-podman
b22e8465e986  docker.io/grafana/loki:3.5.0       -config.file=/etc...  20 minutes ago  Up 20 minutes  0.0.0.0:3100->3100/tcp  loki
e52440beec49  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  17 minutes ago  Up 17 minutes                          promtail
1d8d0008ffa9  docker.io/grafana/grafana:12.1.1                         10 minutes ago  Up 10 minutes  0.0.0.0:3000->3000/tcp  grafana
keerthana@Mac-2910 podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-RESTART-001","amount":500}'
{"success":true,"transaction":{"transactionId":"TXN-RESTART-001","amount":500,"timestamp":"2026-09-17T05:35:27.066Z"}}%                  
keerthana@Mac-2910 podman-migration-poc % tail -n 5 logs/application.log
{"timestamp":"2026-09-17T05:10:12.693Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOG-001"}
{"timestamp":"2026-09-17T05:18:53.560Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOG-002"}
{"timestamp":"2026-09-17T05:35:27.073Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-RESTART-001"}
keerthana@Mac-2910 podman-migration-poc % 
keerthana@Mac-2910 podman-migration-poc % podman restart promtail
promtail
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED         STATUS         PORTS                   NAMES
4e64357e7c2f  localhost/cube-root-ms:podman-poc  npm start             27 minutes ago  Up 2 minutes   0.0.0.0:3001->3001/tcp  cube-root-ms-podman
b22e8465e986  docker.io/grafana/loki:3.5.0       -config.file=/etc...  22 minutes ago  Up 22 minutes  0.0.0.0:3100->3100/tcp  loki
e52440beec49  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  19 minutes ago  Up 4 seconds                           promtail
1d8d0008ffa9  docker.io/grafana/grafana:12.1.1                         12 minutes ago  Up 12 minutes  0.0.0.0:3000->3000/tcp  grafana
keerthana@Mac-2910 podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-PROMTAIL-001","amount":750}'
{"success":true,"transaction":{"transactionId":"TXN-PROMTAIL-001","amount":750,"timestamp":"2026-09-17T05:37:29.100Z"}}%                 
keerthana@Mac-2910 podman-migration-poc % tail -n 3 logs/application.log
{"timestamp":"2026-09-17T05:18:53.560Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOG-002"}
{"timestamp":"2026-09-17T05:35:27.073Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-RESTART-001"}
{"timestamp":"2026-09-17T05:37:29.103Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-PROMTAIL-001"}
keerthana@Mac-2910 podman-migration-poc % podman restart loki
loki
keerthana@Mac-2910 podman-migration-poc % 
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED         STATUS         PORTS                   NAMES
4e64357e7c2f  localhost/cube-root-ms:podman-poc  npm start             32 minutes ago  Up 6 minutes   0.0.0.0:3001->3001/tcp  cube-root-ms-podman
b22e8465e986  docker.io/grafana/loki:3.5.0       -config.file=/etc...  27 minutes ago  Up 6 seconds   0.0.0.0:3100->3100/tcp  loki
e52440beec49  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  24 minutes ago  Up 4 minutes                           promtail
1d8d0008ffa9  docker.io/grafana/grafana:12.1.1                         17 minutes ago  Up 17 minutes  0.0.0.0:3000->3000/tcp  grafana
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3100/ready
Ingester not ready: waiting for 15s after being ready
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3100/ready
Ingester not ready: waiting for 15s after being ready
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3100/ready
ready
keerthana@Mac-2910 podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-LOKI-RESTART-001","amount":1000}'
{"success":true,"transaction":{"transactionId":"TXN-LOKI-RESTART-001","amount":1000,"timestamp":"2026-09-17T05:42:38.819Z"}}%            
keerthana@Mac-2910 podman-migration-poc %  tail -n 3 logs/application.log
{"timestamp":"2026-09-17T05:35:27.073Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-RESTART-001"}
{"timestamp":"2026-09-17T05:37:29.103Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-PROMTAIL-001"}
{"timestamp":"2026-09-17T05:42:38.827Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOKI-RESTART-001"}


**Application recreation**:

****:

keerthana@Mac-2910 podman-migration-poc % podman rm -f cube-root-ms-podman
cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % podman ps -a
CONTAINER ID  IMAGE                               COMMAND               CREATED         STATUS                    PORTS                           NAMES
b49ea2614a7c                                                            6 days ago      Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  f31df1fb1106-infra
d8e2559e5602  localhost/podman-poc-app:pod        node app.js           6 days ago      Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  podman-app
cf0aa34751bb  docker.io/library/mongo:8           mongod                6 days ago      Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  podman-mongodb
c3cc372c14a2                                                            6 days ago      Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp                           0625b91c0000-infra
36d65eaeda31  docker.io/library/mongo:7           mongod                6 days ago      Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp, 27017/tcp                 mern-mongodb
12795a7ef310  localhost/user-service:latest       npm start             6 days ago      Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp                           mern-user-service
0edb28ddb9fd  localhost/product-service:latest    npm start             6 days ago      Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp                           mern-product-service
827fc97a8dcc  localhost/api-gateway:latest        npm start             5 days ago      Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp                           mern-api-gateway
4e47e20fb91b  localhost/cube-transaction-ms:test  node --max_old_sp...  45 hours ago    Exited (0) 41 hours ago   0.0.0.0:6000->6000/tcp                           cube-transaction-test
b22e8465e986  docker.io/grafana/loki:3.5.0        -config.file=/etc...  32 minutes ago  Up 5 minutes              0.0.0.0:3100->3100/tcp                           loki
e52440beec49  docker.io/grafana/promtail:3.5.0    -config.file=/etc...  29 minutes ago  Up 9 minutes                           promtail
1d8d0008ffa9  docker.io/grafana/grafana:12.1.1                          22 minutes ago  Up 22 minutes             0.0.0.0:3000->3000/tcp                           grafana
keerthana@Mac-2910 podman-migration-poc % podman run -d \
  --name cube-root-ms-podman \
  --network podman-logging \
  -p 3001:3001 \
  -v "$(pwd)/data:/data" \
  -v "$(pwd)/logs:/logs" \
  -e CONTAINER_ENGINE=podman \
  localhost/cube-root-ms:podman-poc
7689e768a9fba2412563ddbe8647f7f5e3ecd32e7a9823e7ef1cd841a5ae3ae3
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED         STATUS         PORTS                   NAMES
b22e8465e986  docker.io/grafana/loki:3.5.0       -config.file=/etc...  32 minutes ago  Up 5 minutes   0.0.0.0:3100->3100/tcp  loki
e52440beec49  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  29 minutes ago  Up 10 minutes                          promtail
1d8d0008ffa9  docker.io/grafana/grafana:12.1.1                         22 minutes ago  Up 22 minutes  0.0.0.0:3000->3000/tcp  grafana
7689e768a9fb  localhost/cube-root-ms:podman-poc  npm start             4 seconds ago   Up 4 seconds   0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3001/health
{"status":"UP","engine":"podman","hostname":"7689e768a9fb"}%                                                                             
keerthana@Mac-2910 podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-RECREATE-001","amount":1500}'
{"success":true,"transaction":{"transactionId":"TXN-RECREATE-001","amount":1500,"timestamp":"2026-09-17T05:47:37.085Z"}}%                
keerthana@Mac-2910 podman-migration-poc % tail -n 5 logs/application.log
{"timestamp":"2026-09-17T05:18:53.560Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOG-002"}
{"timestamp":"2026-09-17T05:35:27.073Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-RESTART-001"}
{"timestamp":"2026-09-17T05:37:29.103Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-PROMTAIL-001"}
{"timestamp":"2026-09-17T05:42:38.827Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOKI-RESTART-001"}
{"timestamp":"2026-09-17T05:47:37.089Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-RECREATE-001"}
keerthana@Mac-2910 podman-migration-poc % 

**Why did the logs survive?**
    *Because the log file is not stored inside the container.*
When we created the app, we mounted:
-----------------------------------
~/podman-migration-poc/logs
          ↓
       /logs
   inside container

Your command:
-------------
-v "$(pwd)/logs:/logs"

means:
------
Mac host
└── ~/podman-migration-poc/logs/application.log
                 │
                 │ mounted
                 ▼
        Container /logs/application.log

So when you did:

podman rm -f cube-root-ms-podman

the container disappeared, but the host file remained.

Then the new container:

7689e768a9fb

mounted the same host directory, so it immediately saw the existing log file.

And Grafana?
=============
Grafana is reading from Loki, not directly from the application container:
---------------------------       -----------------------------
Application
    ↓
Host application.log
    ↓
Promtail
    ↓
Loki storage
    ↓
Grafana

keerthana@Mac-2910 podman-migration-poc % podman stop promtail
promtail
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED            STATUS         PORTS                   NAMES
b22e8465e986  docker.io/grafana/loki:3.5.0       -config.file=/etc...  About an hour ago  Up 35 minutes  0.0.0.0:3100->3100/tcp  loki
1d8d0008ffa9  docker.io/grafana/grafana:12.1.1                         53 minutes ago     Up 53 minutes  0.0.0.0:3000->3000/tcp  grafana
7689e768a9fb  localhost/cube-root-ms:podman-poc  npm start             30 minutes ago     Up 30 minutes  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-PROMTAIL-DOWN-001","amount":2000}'
{"success":true,"transaction":{"transactionId":"TXN-PROMTAIL-DOWN-001","amount":2000,"timestamp":"2026-09-17T06:17:52.178Z"}}%           
keerthana@Mac-2910 podman-migration-poc % tail -n 3 logs/application.log
{"timestamp":"2026-09-17T05:42:38.827Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOKI-RESTART-001"}
{"timestamp":"2026-09-17T05:47:37.089Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-RECREATE-001"}
{"timestamp":"2026-09-17T06:17:52.186Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-PROMTAIL-DOWN-001"}
keerthana@Mac-2910 podman-migration-poc % podman start promtail
promtail
keerthana@Mac-2910 podman-migration-poc % 


keerthana@Mac-2910 podman-migration-poc % podman stop loki
loki
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED            STATUS            PORTS                   NAMES
e52440beec49  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  About an hour ago  Up 17 minutes                             promtail
1d8d0008ffa9  docker.io/grafana/grafana:12.1.1                         About an hour ago  Up About an hour  0.0.0.0:3000->3000/tcp  grafana
7689e768a9fb  localhost/cube-root-ms:podman-poc  npm start             48 minutes ago     Up 48 minutes     0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-LOKI-DOWN-001","amount":3000}'
{"success":true,"transaction":{"transactionId":"TXN-LOKI-DOWN-001","amount":3000,"timestamp":"2026-09-17T06:36:02.428Z"}}%               
keerthana@Mac-2910 podman-migration-poc % tail -n 3 logs/application.log
{"timestamp":"2026-09-17T05:47:37.089Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-RECREATE-001"}
{"timestamp":"2026-09-17T06:17:52.186Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-PROMTAIL-DOWN-001"}
{"timestamp":"2026-09-17T06:36:02.432Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOKI-DOWN-001"}
keerthana@Mac-2910 podman-migration-poc % podman logs --tail 30 promtail
level=info ts=2026-09-17T05:17:55.237799356Z caller=main.go:173 msg="Starting Promtail" version="(version=3.5.0, branch=k248, revision=4b16bc4f)"
level=warn ts=2026-09-17T05:17:55.237915397Z caller=promtail.go:265 msg="enable watchConfig"
level=info ts=2026-09-17T05:18:00.237915018Z caller=filetargetmanager.go:373 msg="Adding target" key="/logs/application.log:{container=\"cube-root-ms-podman\", engine=\"podman\", job=\"podman-application\"}"
level=info ts=2026-09-17T05:18:00.239004306Z caller=filetarget.go:343 msg="watching new directory" directory=/logs
level=info ts=2026-09-17T05:18:00.241218424Z caller=tailer.go:147 component=tailer msg="tail routine: started" path=/logs/application.log
ts=2026-09-17T05:18:00.241323716Z caller=log.go:168 level=info msg="Seeked /logs/application.log - &{Offset:0 Whence:0}"
level=info ts=2026-09-17T05:37:20.204096254Z caller=promtail.go:135 msg="Reloading configuration file" sha3sum=416ab509ce8b7b1d53edeae9e2288c42cf7f144ea2cd5b5d467cbf228f37b28a
level=info ts=2026-09-17T05:37:20.2120091Z caller=server.go:368 msg="server listening on addresses" http=[::]:9080 grpc=[::]:45899
level=info ts=2026-09-17T05:37:20.212188351Z caller=main.go:173 msg="Starting Promtail" version="(version=3.5.0, branch=k248, revision=4b16bc4f)"
level=warn ts=2026-09-17T05:37:20.212333143Z caller=promtail.go:265 msg="enable watchConfig"
level=info ts=2026-09-17T05:37:25.212945005Z caller=filetargetmanager.go:373 msg="Adding target" key="/logs/application.log:{container=\"cube-root-ms-podman\", engine=\"podman\", job=\"podman-application\"}"
level=info ts=2026-09-17T05:37:25.213849131Z caller=filetarget.go:343 msg="watching new directory" directory=/logs
level=info ts=2026-09-17T05:37:25.215896218Z caller=tailer.go:147 component=tailer msg="tail routine: started" path=/logs/application.log
ts=2026-09-17T05:37:25.216060509Z caller=log.go:168 level=info msg="Seeked /logs/application.log - &{Offset:313 Whence:0}"
level=info ts=2026-09-17T06:18:04.674740313Z caller=promtail.go:135 msg="Reloading configuration file" sha3sum=416ab509ce8b7b1d53edeae9e2288c42cf7f144ea2cd5b5d467cbf228f37b28a
level=info ts=2026-09-17T06:18:04.682839864Z caller=server.go:368 msg="server listening on addresses" http=[::]:9080 grpc=[::]:37097
level=info ts=2026-09-17T06:18:04.682958697Z caller=main.go:173 msg="Starting Promtail" version="(version=3.5.0, branch=k248, revision=4b16bc4f)"
level=warn ts=2026-09-17T06:18:04.683082739Z caller=promtail.go:265 msg="enable watchConfig"
level=info ts=2026-09-17T06:18:09.68341384Z caller=filetargetmanager.go:373 msg="Adding target" key="/logs/application.log:{container=\"cube-root-ms-podman\", engine=\"podman\", job=\"podman-application\"}"
level=info ts=2026-09-17T06:18:09.684266591Z caller=filetarget.go:343 msg="watching new directory" directory=/logs
level=info ts=2026-09-17T06:18:09.687360511Z caller=tailer.go:147 component=tailer msg="tail routine: started" path=/logs/application.log
ts=2026-09-17T06:18:09.687388803Z caller=log.go:168 level=info msg="Seeked /logs/application.log - &{Offset:641 Whence:0}"
level=warn ts=2026-09-17T06:36:03.710888712Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:04.458481824Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:06.185882048Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:09.541453706Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:14.214054986Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:24.576759833Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:53.828097717Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:37:43.569569623Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
keerthana@Mac-2910 podman-migration-poc % podman start loki
loki
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3100/ready
Ingester not ready: waiting for 15s after being ready
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3100/ready
ready
keerthana@Mac-2910 podman-migration-poc % curl -G -s 'http://localhost:3100/loki/api/v1/query_range' \
  --data-urlencode 'query={container="cube-root-ms-podman"} |= "TXN-LOKI-DOWN-001"' \
  --data-urlencode 'limit=20'
{"status":"success","data":{"resultType":"streams","result":[],"stats":{"summary":{"bytesProcessedPerSecond":48803,"linesProcessedPerSecond":323,"totalBytesProcessed":1055,"totalLinesProcessed":7,"execTime":0.021617,"queueTime":0.000886,"subqueries":0,"totalEntriesReturned":0,"splits":2,"shards":2,"totalPostFilterLines":0,"totalStructuredMetadataBytesProcessed":188},"querier":{"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":0,"headChunkLines":0,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":0,"headChunkStructuredMetadataBytes":0,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":0,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"ingester":{"totalReached":2,"totalChunksMatched":1,"totalBatches":2,"totalLinesSent":0,"store":{"totalChunksRef":1,"totalChunksDownloaded":1,"chunksDownloadTime":11105389,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":120,"headChunkLines":1,"decompressedBytes":935,"decompressedLines":6,"compressedBytes":300,"totalDuplicates":0,"postFilterLines":0,"headChunkStructuredMetadataBytes":8,"decompressedStructuredMetadataBytes":180},"chunkRefsFetchTime":444543,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"cache":{"chunk":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"index":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"result":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"statsResult":{"entriesFound":0,"entriesRequested":1,"entriesStored":1,"bytesReceived":0,"bytesSent":0,"requests":2,"downloadTime":145666,"queryLengthServed":0},"volumeResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"seriesResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"labelResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"instantMetricResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0}},"index":{"totalChunks":0,"postFilterChunks":0,"shardsDuration":0,"usedBloomFilters":false}}}}
keerthana@Mac-2910 podman-migration-poc % 

**Grafana Not retierive the log of loki down time**:

2026-09-17 11:48:09.687	
{"timestamp":"2026-09-17T06:17:52.186Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-PROMTAIL-DOWN-001"}
	2026-09-17 11:17:37.253	
{"timestamp":"2026-09-17T05:47:37.089Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-RECREATE-001"}
	2026-09-17 11:12:39.078	
{"timestamp":"2026-09-17T05:42:38.827Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOKI-RESTART-001"}
	2026-09-17 11:07:29.248	
{"timestamp":"2026-09-17T05:37:29.103Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-PROMTAIL-001"}
	2026-09-17 11:05:27.302	
{"timestamp":"2026-09-17T05:35:27.073Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-RESTART-001"}
	2026-09-17 10:48:53.663	
{"timestamp":"2026-09-17T05:18:53.560Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOG-002"}
	2026-09-17 10:48:00.241	
{"timestamp":"2026-09-17T05:10:12.693Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOG-001"}


keerthana@Mac-2910 podman-migration-poc % du -sh logs
du -sh monitoring/loki
4.0K    logs
 68K    monitoring/loki
keerthana@Mac-2910 podman-migration-poc % TOTAL_REQUESTS=1000 CONCURRENCY=10 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 1000
Concurrency  : 10
keerthana@Mac-2910 podman-migration-poc % du -sh logs
du -sh monitoring/loki
4.0K    logs
100K    monitoring/loki
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3001/health
{"status":"UP","engine":"podman","hostname":"7689e768a9fb"}%                                                                             
keerthana@Mac-2910 podman-migration-poc % grep -c "TRANSACTION_PROCESSED" logs/application.log
8
keerthana@Mac-2910 podman-migration-poc % tail -n 5 logs/application.log
{"timestamp":"2026-09-17T05:37:29.103Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-PROMTAIL-001"}
{"timestamp":"2026-09-17T05:42:38.827Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOKI-RESTART-001"}
{"timestamp":"2026-09-17T05:47:37.089Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-RECREATE-001"}
{"timestamp":"2026-09-17T06:17:52.186Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-PROMTAIL-DOWN-001"}
{"timestamp":"2026-09-17T06:36:02.432Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-LOKI-DOWN-001"}
keerthana@Mac-2910 podman-migration-poc % cat scripts/load-test.sh
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

curl -s http://localhost:3101/metrics/local%                                                                                             
keerthana@Mac-2910 podman-migration-poc % grep "localhost" scripts/load-test.sh
  http://localhost:3101/transactions \
curl -s http://localhost:3101/metrics/local
keerthana@Mac-2910 podman-migration-poc % grep "localhost" scripts/load-test.sh
  http://localhost:3101/transactions \
curl -s http://localhost:3101/metrics/local
keerthana@Mac-2910 podman-migration-poc % nano scripts/load-test.sh
keerthana@Mac-2910 podman-migration-poc % grep "localhost" scripts/load-test.sh
  http://localhost:3001/transactions \
curl -s http://localhost:3001/metrics/local
keerthana@Mac-2910 podman-migration-poc % TOTAL_REQUESTS=100 CONCURRENCY=10 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 100
Concurrency  : 10

Load test completed

Application metrics:
{"pid":13,"uptime":3581.910108124,"memory":{"rss":58740736,"heapUsed":9826280,"heapTotal":11583488},"storage":{"transactionsBytes":8607,"logsBytes":10655}}%                                                                                                                      
keerthana@Mac-2910 podman-migration-poc % grep -c "TRANSACTION_PROCESSED" logs/application.log
108
keerthana@Mac-2910 podman-migration-poc % 
keerthana@Mac-2910 podman-migration-poc % du -sh logs
du -sh monitoring/loki
 12K    logs
 96K    monitoring/loki
keerthana@Mac-2910 podman-migration-poc % TOTAL_REQUESTS=1000 CONCURRENCY=20 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 1000
Concurrency  : 20

Load test completed

Application metrics:
{"pid":13,"uptime":3725.076011435,"memory":{"rss":65114112,"heapUsed":11905688,"heapTotal":16302080},"storage":{"transactionsBytes":88500,"logsBytes":109548}}%                                                                                                                   
keerthana@Mac-2910 podman-migration-poc % grep -c "TRANSACTION_PROCESSED" logs/application.log
1108
keerthana@Mac-2910 podman-migration-poc % du -sh logs
du -sh monitoring/loki
128K    logs
224K    monitoring/loki
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3001/metrics/local
{"pid":13,"uptime":3734.396939368,"memory":{"rss":65114112,"heapUsed":11925504,"heapTotal":16302080},"storage":{"transactionsBytes":88500,"logsBytes":109548}}%                                                                                                                   
keerthana@Mac-2910 podman-migration-poc % 
keerthana@Mac-2910 podman-migration-poc % du -sh logs
du -sh monitoring/loki
128K    logs
224K    monitoring/loki
keerthana@Mac-2910 podman-migration-poc % TOTAL_REQUESTS=10000 CONCURRENCY=50 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 10000
Concurrency  : 50

Load test completed

Application metrics:
{"pid":13,"uptime":3850.877977805,"memory":{"rss":82923520,"heapUsed":14314592,"heapTotal":33865728},"storage":{"transactionsBytes":897394,"logsBytes":1108442}}%                                                                                                                 
keerthana@Mac-2910 podman-migration-poc % grep -c "TRANSACTION_PROCESSED" logs/application.log
du -sh logs
du -sh monitoring/loki
curl http://localhost:3001/metrics/local
11108
1.1M    logs
2.2M    monitoring/loki
{"pid":13,"uptime":3897.14324716,"memory":{"rss":82923520,"heapUsed":14339760,"heapTotal":33865728},"storage":{"transactionsBytes":897394,"logsBytes":1108442}}%                                                                                                                  
keerthana@Mac-2910 podman-migration-poc % podman stats --no-stream
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO             BLOCK IO           PIDS        CPU TIME   AVG CPU %
b22e8465e986  loki                 0.85%       82.62MB / 2.035GB  4.06%       251.8kB / 270.1kB  0B / 0B            11          7.706546s   0.85%
e52440beec49  promtail             0.35%       35.32MB / 2.035GB  1.74%       23.85kB / 229.8kB  139.3kB / 0B       11          7.395206s   0.35%
1d8d0008ffa9  grafana              0.36%       258.1MB / 2.035GB  12.68%      24.01MB / 285.1kB  189.2MB / 22.98MB  20          19.345031s  0.36%
7689e768a9fb  cube-root-ms-podman  0.28%       59.75MB / 2.035GB  2.94%       4.138kB / 1.188kB  73.73kB / 4.096kB  18          10.971465s  0.28%
keerthana@Mac-2910 podman-migration-poc % 

**One important finding**:

Your current logging architecture is:
-------------------------------------
Application
    ↓
/logs/application.log
    ↓
Promtail
    ↓
Loki
    ↓
Grafana

*The application is independent of Loki, which is good*.

But:
-----
Loki DOWN
   ↓
Application log ✅
   ↓
Promtail retry ⚠️
   ↓
Loki comes back
   ↓
Missed log ❌


**Log rotation**:

keerthana@Mac-2910 podman-migration-poc % ls -lh logs/application.log
-rw-r--r--  1 keerthana  staff   1.1M Sep 17 12:22 logs/application.log
keerthana@Mac-2910 podman-migration-poc % tail -n 2 logs/application.log
{"timestamp":"2026-09-17T06:52:06.229Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-9999"}
{"timestamp":"2026-09-17T06:52:06.232Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-10000"}
keerthana@Mac-2910 podman-migration-poc % 

1. Rename the current log:
keerthana@Mac-2910 podman-migration-poc % mv logs/application.log logs/application.log.1
keerthana@Mac-2910 podman-migration-poc % ls -lh logs/
total 2176
-rw-r--r--@ 1 keerthana  staff   1.1M Sep 17 12:22 application.log.1
keerthana@Mac-2910 podman-migration-poc % 

2. Now generate one transaction:
keerthana@Mac-2910 podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-ROTATION-001","amount":500}'
{"success":true,"transaction":{"transactionId":"TXN-ROTATION-001","amount":500,"timestamp":"2026-09-17T07:05:01.832Z"}}%                 
keerthana@Mac-2910 podman-migration-poc % ls -lh logs/
total 2184
-rw-r--r--  1 keerthana  staff   108B Sep 17 12:35 application.log
-rw-r--r--@ 1 keerthana  staff   1.1M Sep 17 12:22 application.log.1
keerthana@Mac-2910 podman-migration-poc % tail -n 3 logs/application.log.1
{"timestamp":"2026-09-17T06:52:06.220Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-9998"}
{"timestamp":"2026-09-17T06:52:06.229Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-9999"}
{"timestamp":"2026-09-17T06:52:06.232Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-10000"}
keerthana@Mac-2910 podman-migration-poc % 

**Result**:
| Test                                | Result |
| ----------------------------------- | ------ |
| Rename old log                      | ✅      |
| Application continues running       | ✅      |
| New `application.log` created       | ✅      |
| Old logs preserved                  | ✅      |
| New transaction written to new file | ✅      |
- So our application uses fs.appendFileSync() and opens the file for each write, meaning it handled this manual rotation nicely.

**So we should verify that Promtail noticed the new file and is collecting the new transaction.**:

keerthana@Mac-2910 podman-migration-poc % curl -G -s 'http://localhost:3100/loki/api/v1/query_range' \
  --data-urlencode 'query={container="cube-root-ms-podman"} |= "TXN-ROTATION-001"' \
  --data-urlencode 'limit=20'
{"status":"success","data":{"resultType":"streams","result":[{"stream":{"container":"cube-root-ms-podman","detected_level":"unknown","engine":"podman","filename":"/logs/application.log","job":"podman-application","service_name":"cube-root-ms-podman"},"values":[["1789628706325241880","{\"timestamp\":\"2026-09-17T07:05:01.840Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-ROTATION-001\"}"]]}],"stats":{"summary":{"bytesProcessedPerSecond":78819303,"linesProcessedPerSecond":547574,"totalBytesProcessed":1598196,"totalLinesProcessed":11103,"execTime":0.020277,"queueTime":0.001001,"subqueries":0,"totalEntriesReturned":1,"splits":2,"shards":2,"totalPostFilterLines":1,"totalStructuredMetadataBytesProcessed":304930},"querier":{"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":0,"headChunkLines":0,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":0,"headChunkStructuredMetadataBytes":0,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":0,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"ingester":{"totalReached":2,"totalChunksMatched":2,"totalBatches":3,"totalLinesSent":1,"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":136969,"headChunkLines":1280,"decompressedBytes":1461227,"decompressedLines":9823,"compressedBytes":98230,"totalDuplicates":0,"postFilterLines":1,"headChunkStructuredMetadataBytes":10240,"decompressedStructuredMetadataBytes":294690},"chunkRefsFetchTime":331211,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"cache":{"chunk":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"index":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"result":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"statsResult":{"entriesFound":1,"entriesRequested":1,"entriesStored":1,"bytesReceived":221,"bytesSent":0,"requests":2,"downloadTime":268001,"queryLengthServed":0},"volumeResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"seriesResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"labelResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"instantMetricResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0}},"index":{"totalChunks":0,"postFilterChunks":0,"shardsDuration":0,"usedBloomFilters":false}}}}
keerthana@Mac-2910 podman-migration-poc % 

✅ Log rotation + Promtail + Loki all worked.

**Let's check whether Promtail is still tracking the old rotated file or only the new file. This matters because with frequent rotations, we don't want duplicate/missing logs.**:

keerthana@Mac-2910 podman-migration-poc % podman logs --tail 30 promtail
level=info ts=2026-09-17T05:37:25.215896218Z caller=tailer.go:147 component=tailer msg="tail routine: started" path=/logs/application.log
ts=2026-09-17T05:37:25.216060509Z caller=log.go:168 level=info msg="Seeked /logs/application.log - &{Offset:313 Whence:0}"
level=info ts=2026-09-17T06:18:04.674740313Z caller=promtail.go:135 msg="Reloading configuration file" sha3sum=416ab509ce8b7b1d53edeae9e2288c42cf7f144ea2cd5b5d467cbf228f37b28a
level=info ts=2026-09-17T06:18:04.682839864Z caller=server.go:368 msg="server listening on addresses" http=[::]:9080 grpc=[::]:37097
level=info ts=2026-09-17T06:18:04.682958697Z caller=main.go:173 msg="Starting Promtail" version="(version=3.5.0, branch=k248, revision=4b16bc4f)"
level=warn ts=2026-09-17T06:18:04.683082739Z caller=promtail.go:265 msg="enable watchConfig"
level=info ts=2026-09-17T06:18:09.68341384Z caller=filetargetmanager.go:373 msg="Adding target" key="/logs/application.log:{container=\"cube-root-ms-podman\", engine=\"podman\", job=\"podman-application\"}"
level=info ts=2026-09-17T06:18:09.684266591Z caller=filetarget.go:343 msg="watching new directory" directory=/logs
level=info ts=2026-09-17T06:18:09.687360511Z caller=tailer.go:147 component=tailer msg="tail routine: started" path=/logs/application.log
ts=2026-09-17T06:18:09.687388803Z caller=log.go:168 level=info msg="Seeked /logs/application.log - &{Offset:641 Whence:0}"
level=warn ts=2026-09-17T06:36:03.710888712Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:04.458481824Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:06.185882048Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:09.541453706Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:14.214054986Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:24.576759833Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:36:53.828097717Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
level=warn ts=2026-09-17T06:37:43.569569623Z caller=client.go:419 component=client host=loki:3100 msg="error sending batch, will retry" status=-1 tenant= error="Post \"http://loki:3100/loki/api/v1/push\": dial tcp: lookup loki on 10.89.0.1:53: no such host"
ts=2026-09-17T07:04:22.0671775Z caller=log.go:168 level=info msg="Re-opening moved/deleted file /logs/application.log ..."
ts=2026-09-17T07:04:22.068407421Z caller=log.go:168 level=info msg="Waiting for /logs/application.log to appear..."
level=info ts=2026-09-17T07:04:26.318749539Z caller=tailer.go:207 component=tailer msg="skipping update of position for a file which does not currently exist" path=/logs/application.log
level=info ts=2026-09-17T07:04:26.319883584Z caller=filetarget.go:362 msg="removing directory from watcher" directory=/logs
level=info ts=2026-09-17T07:04:26.320202877Z caller=tailer.go:207 component=tailer msg="skipping update of position for a file which does not currently exist" path=/logs/application.log
level=info ts=2026-09-17T07:04:26.320331085Z caller=tailer.go:164 component=tailer msg="tail routine: tail channel closed, stopping tailer" path=/logs/application.log reason=null
level=info ts=2026-09-17T07:04:26.320355002Z caller=tailer.go:155 component=tailer msg="tail routine: exited" path=/logs/application.log
level=info ts=2026-09-17T07:04:26.320424669Z caller=tailer.go:118 component=tailer msg="position timer: exited" path=/logs/application.log
level=info ts=2026-09-17T07:04:26.320496336Z caller=tailer.go:245 component=tailer msg="stopped tailing file" path=/logs/application.log
level=info ts=2026-09-17T07:05:06.319385736Z caller=filetarget.go:343 msg="watching new directory" directory=/logs
level=info ts=2026-09-17T07:05:06.32455892Z caller=tailer.go:147 component=tailer msg="tail routine: started" path=/logs/application.log
ts=2026-09-17T07:05:06.324943588Z caller=log.go:168 level=info msg="Seeked /logs/application.log - &{Offset:0 Whence:0}"
keerthana@Mac-2910 podman-migration-poc % 

* What Promtail did
====================
When we renamed:
---------------
application.log → application.log.1

Promtail detected that the original file disappeared:
-----------------------------------------------------
Re-opening moved/deleted file /logs/application.log
Waiting for /logs/application.log to appear...

Then when the application created the new file:
-----------------------------------------------
application.log

Promtail started watching it again:
-----------------------------------
tail routine: started path=/logs/application.log
Seeked /logs/application.log - Offset:0

And we already verified TXN-ROTATION-001 reached Loki. ✅

**Final log-rotation result**:

application.log
      ↓ rename
application.log.1        ✅ old log preserved
      ↓
Promtail detects change   ✅
      ↓
new application.log       ✅
      ↓
Promtail watches new file  ✅
      ↓
Loki receives new logs    ✅

###### Podman VM restart behavior:

1. Check current restart policy:
keerthana@Mac-2910 podman-migration-poc % podman inspect -f '{{.Name}} -> RestartPolicy={{.HostConfig.RestartPolicy.Name}}' \
  cube-root-ms-podman loki promtail grafana
cube-root-ms-podman -> RestartPolicy=no
loki -> RestartPolicy=no
promtail -> RestartPolicy=no
grafana -> RestartPolicy=no

2. test actual Podman VM restart:
keerthana@Mac-2910 podman-migration-poc % podman machine stop
Machine "podman-machine-default" stopped successfully
keerthana@Mac-2910 podman-migration-poc % podman machine start
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
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE       COMMAND     CREATED     STATUS      PORTS       NAMES
keerthana@Mac-2910 podman-migration-poc % 

* So:
-----
Podman VM restart → containers did NOT automatically start.

This is because all four containers have:

RestartPolicy=no

Important conclusion:
=====================
This is not a Podman limitation. It's because we created the containers without a restart policy.

For production, we need to decide/configure something like:
----------------------------------------------------------
--restart=always
or:
--restart=unless-stopped

**Current POC result**:
Podman machine restart: ⚠️ Manual container restart required with current configuration.


**test restart=always with only the application**:
keerthana@Mac-2910 podman-migration-poc % podman ps -a --filter name=cube-root-ms-podman
CONTAINER ID  IMAGE                              COMMAND     CREATED      STATUS                    PORTS                   NAMES
7689e768a9fb  localhost/cube-root-ms:podman-poc  npm start   2 hours ago  Exited (1) 3 minutes ago  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % podman rm -f cube-root-ms-podman
cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % podman run -d \
  --name cube-root-ms-podman \
  --restart=always \
  --network podman-logging \
  -p 3001:3001 \
  -v "$(pwd)/data:/data" \
  -v "$(pwd)/logs:/logs" \
  -e CONTAINER_ENGINE=podman \
  localhost/cube-root-ms:podman-poc
d7bb3d2f6dc682814bcda19331cca4d46486a4076a6ece12e61b11146d7d862d
keerthana@Mac-2910 podman-migration-poc % podman inspect -f '{{.Name}} -> RestartPolicy={{.HostConfig.RestartPolicy.Name}}' cube-root-ms-podman
cube-root-ms-podman -> RestartPolicy=always
keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3001/health
{"status":"UP","engine":"podman","hostname":"d7bb3d2f6dc6"}%                                                                             
keerthana@Mac-2910 podman-migration-poc % 


**test VM restart**:

keerthana@Mac-2910 podman-migration-poc % curl http://localhost:3001/health
{"status":"UP","engine":"podman","hostname":"d7bb3d2f6dc6"}%                                                                             
keerthana@Mac-2910 podman-migration-poc % podman machine stop
Machine "podman-machine-default" stopped successfully
keerthana@Mac-2910 podman-migration-poc % podman machine start
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
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE       COMMAND     CREATED     STATUS      PORTS       NAMES
keerthana@Mac-2910 podman-migration-poc % 

Result:
========
Even with:

RestartPolicy=always

after:

Podman machine stop
→ Podman machine start
→ podman ps

the *application is not automatically running*.


**First, let's prove restart=always itself works**:
eerthana@Mac-2910 podman-migration-poc % podman start cube-root-ms-podman
cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND     CREATED            STATUS        PORTS                   NAMES
d7bb3d2f6dc6  localhost/cube-root-ms:podman-poc  npm start   About an hour ago  Up 4 seconds  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % podman kill cube-root-ms-podman
cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % podman ps
CONTAINER ID  IMAGE       COMMAND     CREATED     STATUS      PORTS       NAMES

**Result: restart=always**:

We did:
-------
podman start
→ app running
→ podman kill
→ podman ps

*Result*: No container running
- So restart=always did not automatically restart the container after podman kill in this Podman setup.               -->*important notes*


**We need to check how Podman 6.1.1 handles restart policies and whether a service manager is required.**:

keerthana@Mac-2910 podman-migration-poc % podman inspect cube-root-ms-podman | grep -A 8 -B 2 RestartPolicy
                    ]
               },
               "RestartPolicy": {
                    "Name": "always",
                    "MaximumRetryCount": 0
               },
               "AutoRemove": false,
               "AutoRemoveImage": false,
               "Annotations": {
                    "io.container.manager": "libpod",
                    "org.opencontainers.image.stopSignal": "15",
keerthana@Mac-2910 podman-migration-poc % 
keerthana@Mac-2910 podman-migration-poc % podman start cube-root-ms-podman
cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman kill cube-root-ms-podman -->*after 5sec we close the event terminal*
cube-root-ms-podman
keerthana@Mac-2910 podman-migration-poc % podman events                                            --> *this terminal will run while kill the podman*
2026-09-17 14:26:59.953552373 +0530 IST container sync b49ea2614a7c99ccadc60b2c5ae9a67b0d083fbdfa0d5277cbbc89b7c7f9aa4e (image=, name=f31df1fb1106-infra, pod_id=f31df1fb1106339facb1a4505dd9f3a9e704c2c019f39e93f2cdb2b5723f1234)
2026-09-17 14:26:59.953775915 +0530 IST container sync d8e2559e5602e7d85623885c6cdf10a5ed09fc746ebd1d91edf1e4546be09ced (image=localhost/podman-poc-app:pod, name=podman-app, pod_id=f31df1fb1106339facb1a4505dd9f3a9e704c2c019f39e93f2cdb2b5723f1234, io.buildah.version=1.45.0)
2026-09-17 14:26:59.953969248 +0530 IST container sync cf0aa34751bbd3d01ebcba40481ed0ca7988e879fadb7b36e067b734dcbd35e7 (image=docker.io/library/mongo:8, name=podman-mongodb, pod_id=f31df1fb1106339facb1a4505dd9f3a9e704c2c019f39e93f2cdb2b5723f1234, org.opencontainers.image.version=24.04)
2026-09-17 14:26:59.954121581 +0530 IST container sync c3cc372c14a2866b533b529d1f53c973803429ae557e0164ae9c21332e6f8e31 (image=, name=0625b91c0000-infra, pod_id=0625b91c00009a1fa597926d014d3382ec2ebbb2faab4ce7ccf1bbc19c10feff)
2026-09-17 14:26:59.954275206 +0530 IST container sync 36d65eaeda313f716163ffd43e91341314189a6d1b463a31b846c2fd127cbd0d (image=docker.io/library/mongo:7, name=mern-mongodb, pod_id=0625b91c00009a1fa597926d014d3382ec2ebbb2faab4ce7ccf1bbc19c10feff, org.opencontainers.image.version=22.04)
2026-09-17 14:26:59.954413998 +0530 IST container sync 12795a7ef3107fc91c261060d993bc49b9d429b3e4a544b37781e9abe43a7fc7 (image=localhost/user-service:latest, name=mern-user-service, pod_id=0625b91c00009a1fa597926d014d3382ec2ebbb2faab4ce7ccf1bbc19c10feff, io.buildah.version=1.45.0)
2026-09-17 14:26:59.954567748 +0530 IST container sync 0edb28ddb9fd3a8517f646171f65de15556784f3259b1831cf51a2163a9d2208 (image=localhost/product-service:latest, name=mern-product-service, pod_id=0625b91c00009a1fa597926d014d3382ec2ebbb2faab4ce7ccf1bbc19c10feff, io.buildah.version=1.45.0)
2026-09-17 14:26:59.954726873 +0530 IST container sync 827fc97a8dccaffd93e94b1cd7dd4af3368461afdd6378bb72245ed47e5598e5 (image=localhost/api-gateway:latest, name=mern-api-gateway, pod_id=0625b91c00009a1fa597926d014d3382ec2ebbb2faab4ce7ccf1bbc19c10feff, io.buildah.version=1.45.0)
2026-09-17 14:26:59.954885622 +0530 IST container sync 4e47e20fb91b46ba62bbdf21a9f23943bf4a6429054c3e9de3987584db49924c (image=localhost/cube-transaction-ms:test, name=cube-transaction-test, io.buildah.version=1.45.0)
2026-09-17 14:26:59.955028414 +0530 IST container sync b22e8465e98603cf1d6a49e7bf09b958caf8df80deff18f79448fd812729e398 (image=docker.io/grafana/loki:3.5.0, name=loki)
2026-09-17 14:26:59.955181331 +0530 IST container sync e52440beec4952f7f484f4a1b5e0dc9281b1de0526f327f70ce802a88584b933 (image=docker.io/grafana/promtail:3.5.0, name=promtail, org.opencontainers.image.ref.name=ubuntu, org.opencontainers.image.version=24.04)
2026-09-17 14:26:59.955335747 +0530 IST container sync 1d8d0008ffa911bb850b96a851addf5aea68f87d8a2e2ec61e80c55a7c06cfbd (image=docker.io/grafana/grafana:12.1.1, name=grafana, maintainer=Grafana Labs <hello@grafana.com>, org.opencontainers.image.source=https://github.com/grafana/grafana)
2026-09-17 14:26:59.95551408 +0530 IST container sync d7bb3d2f6dc682814bcda19331cca4d46486a4076a6ece12e61b11146d7d862d (image=localhost/cube-root-ms:podman-poc, name=cube-root-ms-podman, io.buildah.version=1.45.0)
2026-09-17 14:26:59.960308245 +0530 IST container kill d7bb3d2f6dc682814bcda19331cca4d46486a4076a6ece12e61b11146d7d862d (image=localhost/cube-root-ms:podman-poc, name=cube-root-ms-podman, io.buildah.version=1.45.0)
2026-09-17 14:26:59.966941825 +0530 IST container died d7bb3d2f6dc682814bcda19331cca4d46486a4076a6ece12e61b11146d7d862d (image=localhost/cube-root-ms:podman-poc, name=cube-root-ms-podman, io.buildah.version=1.45.0)
2026-09-17 14:27:00.1111095 +0530 IST container cleanup d7bb3d2f6dc682814bcda19331cca4d46486a4076a6ece12e61b11146d7d862d (image=localhost/cube-root-ms:podman-poc, name=cube-root-ms-podman, io.buildah.version=1.45.0)
^C
keerthana@Mac-2910 podman-migration-poc %

**What the events show**:

After:
--------
podman kill cube-root-ms-podman

Podman generated:
-----------------
container kill
container died
container cleanup

*But there is no restart event*. So in this POC, RestartPolicy=always is present, but it did not restart the container after podman kill.

*Podman's --restart policy does not take effect when the container is stopped using podman kill or podman stop.*        -->*important notes*

**simulate an actual application failure**:

* We will make the Node.js process exit inside the container. This is different from podman kill:

keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec cube-root-ms-podman sh -c 'kill 1'
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND     CREATED      STATUS         PORTS                   NAMES
d7bb3d2f6dc6  localhost/cube-root-ms:podman-poc  npm start   2 hours ago  Up 45 seconds  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 


**Grafana stop and test**:

keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stop grafana
grafana
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-GRAFANA-DOWN-001","amount":700}'
{"success":true,"transaction":{"transactionId":"TXN-GRAFANA-DOWN-001","amount":700,"timestamp":"2026-09-17T09:16:11.489Z"}}%        
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -G -s 'http://localhost:3100/loki/api/v1/query_range' \
  --data-urlencode 'query={container="cube-root-ms-podman"} |= "TXN-GRAFANA-DOWN-001"' \
  --data-urlencode 'limit=20'
{"status":"success","data":{"resultType":"streams","result":[{"stream":{"container":"cube-root-ms-podman","detected_level":"unknown","engine":"podman","filename":"/logs/application.log","job":"podman-application","service_name":"cube-root-ms-podman"},"values":[["1789636571758748259","{\"timestamp\":\"2026-09-17T09:16:11.503Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-GRAFANA-DOWN-001\"}"]]}],"stats":{"summary":{"bytesProcessedPerSecond":39583,"linesProcessedPerSecond":332,"totalBytesProcessed":238,"totalLinesProcessed":2,"execTime":0.006013,"queueTime":0.000493,"subqueries":0,"totalEntriesReturned":1,"splits":2,"shards":2,"totalPostFilterLines":1,"totalStructuredMetadataBytesProcessed":16},"querier":{"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":0,"headChunkLines":0,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":0,"headChunkStructuredMetadataBytes":0,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":0,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"ingester":{"totalReached":2,"totalChunksMatched":1,"totalBatches":3,"totalLinesSent":1,"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":238,"headChunkLines":2,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":1,"headChunkStructuredMetadataBytes":16,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":292125,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"cache":{"chunk":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"index":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"result":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"statsResult":{"entriesFound":1,"entriesRequested":1,"entriesStored":0,"bytesReceived":226,"bytesSent":0,"requests":1,"downloadTime":250666,"queryLengthServed":2656000000000},"volumeResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"seriesResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"labelResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"instantMetricResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0}},"index":{"totalChunks":0,"postFilterChunks":0,"shardsDuration":0,"usedBloomFilters":false}}}}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman start grafana
grafana
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3000/api/health
{
  "database": "ok",
  "version": "12.1.1",
  "commit": "df5de8219b41d1e639e003bf5f3a85913761d167"
}%                                                                
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

*So Grafana came back successfully and its own persistent data is healthy.*

**Restart policies for monitoring**:


✅ latest test is PASS: Grafana restarted and the log remained available in Loki.


###### Remaining Test Plan:

1. Batch 1 — Restart policies for monitoring:
* Currently:
-------------
App      → restart=always
Loki     → restart=no
Promtail → restart=no
Grafana  → restart=no
First configure the three monitoring containers with restart policies.
Because these containers already exist, recreate them with --restart=always.

keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman rm -f loki
loki
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman rm -f promtail
promtail
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman run -d \
  --name promtail \
  --restart=always \
  --network podman-logging \
  -v "$(pwd)/monitoring/promtail/promtail-config.yml:/etc/promtail/config.yml:ro" \
  -v "$(pwd)/monitoring/promtail:/tmp" \
  -v "$(pwd)/logs:/logs:ro" \
  docker.io/grafana/promtail:3.5.0 \
  -config.file=/etc/promtail/config.yml
9f570c521139d0d5368245f693d9e2c73181b99d91b49da38eda2f6c1efa3b40
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman run -d \
  --name loki \
  --restart=always \
  --network podman-logging \
  -p 3100:3100 \
  -v "$(pwd)/monitoring/loki/loki-config.yml:/etc/loki/config.yml:ro" \
  -v "$(pwd)/monitoring/loki:/loki" \
  docker.io/grafana/loki:3.5.0 \
  -config.file=/etc/loki/config.yml
739916f94c1c6f9c94bdbd34889829b20e2ad6ff30f73a6d71e7158d513915aa
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman rm -f grafana
grafana
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman run -d \
  --name grafana \
  --restart=always \
  --network podman-logging \
  -p 3000:3000 \
  -v "$(pwd)/monitoring/grafana:/var/lib/grafana" \
  docker.io/grafana/grafana:12.1.1
3a66b0a1865008749afe9bb9a8802b4b05dd94258c4bc887f9be1f4b8353e3f7
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman inspect -f '{{.Name}} -> RestartPolicy={{.HostConfig.RestartPolicy.Name}}' \
  cube-root-ms-podman loki promtail grafana
cube-root-ms-podman -> RestartPolicy=always
loki -> RestartPolicy=always
promtail -> RestartPolicy=always
grafana -> RestartPolicy=always
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED         STATUS         PORTS        NAMES
d7bb3d2f6dc6  localhost/cube-root-ms:podman-poc  npm start             2 hours ago     Up 29 minutes  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
9f570c521139  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  33 seconds ago  Up 33 seconds        promtail
739916f94c1c  docker.io/grafana/loki:3.5.0       -config.file=/etc...  26 seconds ago  Up 26 seconds  0.0.0.0:3100->3100/tcp  loki
3a66b0a18650  docker.io/grafana/grafana:12.1.1                         10 seconds ago  Up 10 seconds  0.0.0.0:3000->3000/tcp  grafana

2. Batch 2 — Verify monitoring after recreation:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3100/ready
Ingester not ready: waiting for 15s after being ready
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3100/ready
ready
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3000/api/health
{
  "database": "ok",
  "version": "12.1.1",
  "commit": "df5de8219b41d1e639e003bf5f3a85913761d167"
}%                                                                                                                    
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3001/health
{"status":"UP","engine":"podman","hostname":"d7bb3d2f6dc6"}%                                                          
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -X POST http://localhost:3001/transactions \
  -H "Content-Type: application/json" \
  -d '{"transactionId":"TXN-MONITOR-RECREATE-001","amount":1000}'
{"success":true,"transaction":{"transactionId":"TXN-MONITOR-RECREATE-001","amount":1000,"timestamp":"2026-09-17T09:34:33.843Z"}}%                                                                                                           
keerthana@Keerthanas-MacBook-Air podman-migration-poc % grep "TXN-MONITOR-RECREATE-001" logs/application.log
{"timestamp":"2026-09-17T09:34:33.846Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-MONITOR-RECREATE-001"}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -G -s 'http://localhost:3100/loki/api/v1/query_range' \
  --data-urlencode 'query={container="cube-root-ms-podman"} |= "TXN-MONITOR-RECREATE-001"' \
  --data-urlencode 'limit=20'
{"status":"success","data":{"resultType":"streams","result":[{"stream":{"container":"cube-root-ms-podman","detected_level":"unknown","engine":"podman","filename":"/logs/application.log","job":"podman-application","service_name":"cube-root-ms-podman"},"values":[["1789637674020784034","{\"timestamp\":\"2026-09-17T09:34:33.846Z\",\"event\":\"TRANSACTION_PROCESSED\",\"transactionId\":\"TXN-MONITOR-RECREATE-001\"}"]]}],"stats":{"summary":{"bytesProcessedPerSecond":44478,"linesProcessedPerSecond":369,"totalBytesProcessed":361,"totalLinesProcessed":3,"execTime":0.008116,"queueTime":0.000492,"subqueries":0,"totalEntriesReturned":1,"splits":2,"shards":2,"totalPostFilterLines":1,"totalStructuredMetadataBytesProcessed":24},"querier":{"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":0,"headChunkLines":0,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":0,"headChunkStructuredMetadataBytes":0,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":0,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"ingester":{"totalReached":2,"totalChunksMatched":1,"totalBatches":3,"totalLinesSent":1,"store":{"totalChunksRef":0,"totalChunksDownloaded":0,"chunksDownloadTime":0,"queryReferencedStructuredMetadata":false,"chunk":{"headChunkBytes":361,"headChunkLines":3,"decompressedBytes":0,"decompressedLines":0,"compressedBytes":0,"totalDuplicates":0,"postFilterLines":1,"headChunkStructuredMetadataBytes":24,"decompressedStructuredMetadataBytes":0},"chunkRefsFetchTime":252166,"congestionControlLatency":0,"pipelineWrapperFilteredLines":0}},"cache":{"chunk":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"index":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"result":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"statsResult":{"entriesFound":0,"entriesRequested":1,"entriesStored":1,"bytesReceived":0,"bytesSent":0,"requests":2,"downloadTime":80750,"queryLengthServed":0},"volumeResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"seriesResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"labelResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0},"instantMetricResult":{"entriesFound":0,"entriesRequested":0,"entriesStored":0,"bytesReceived":0,"bytesSent":0,"requests":0,"downloadTime":0,"queryLengthServed":0}},"index":{"totalChunks":0,"postFilterChunks":0,"shardsDuration":0,"usedBloomFilters":false}}}}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

3. Batch 3 — Podman VM restart with all restart policies:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman machine stop
podman machine start
Machine "podman-machine-default" stopped successfully
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
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE       COMMAND     CREATED     STATUS      PORTS       NAMES
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3001/health
curl http://localhost:3100/ready
curl http://localhost:3000/api/health
curl: (7) Failed to connect to localhost port 3001 after 0 ms: Couldn't connect to server
curl: (7) Failed to connect to localhost port 3100 after 0 ms: Couldn't connect to server
curl: (7) Failed to connect to localhost port 3000 after 0 ms: Couldn't connect to server
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman inspect -f '{{.Name}} -> {{.State.Status}} -> RestartPolicy={{.HostConfig.RestartPolicy.Name}}' \
  cube-root-ms-podman loki promtail grafana
cube-root-ms-podman -> exited -> RestartPolicy=always
loki -> exited -> RestartPolicy=always
promtail -> exited -> RestartPolicy=always
grafana -> exited -> RestartPolicy=always
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

4. Batch 4 — Storage persistence after VM restart:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % ls -lh data/
ls -lh logs/
du -sh data logs monitoring/loki monitoring/grafana
total 1792
-rw-r--r--  1 keerthana  staff   877K Sep 17 15:04 transactions.log
total 2184
-rw-r--r--  1 keerthana  staff   448B Sep 17 15:04 application.log
-rw-r--r--@ 1 keerthana  staff   1.1M Sep 17 12:22 application.log.1
896K    data
1.1M    logs
180K    monitoring/loki
 52M    monitoring/grafana
keerthana@Keerthanas-MacBook-Air podman-migration-poc % grep "TXN-MONITOR-RECREATE-001" logs/application.log
{"timestamp":"2026-09-17T09:34:33.846Z","event":"TRANSACTION_PROCESSED","transactionId":"TXN-MONITOR-RECREATE-001"}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl -G -s 'http://localhost:3100/loki/api/v1/query_range' \
  --data-urlencode 'query={container="cube-root-ms-podman"} |= "TXN-MONITOR-RECREATE-001"' \
  --data-urlencode 'limit=20'
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

5. Batch 5 — Resource limits / failure scenario:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream
ID          NAME        CPU %       MEM USAGE / LIMIT  MEM %       NET IO      BLOCK IO    PIDS        CPU TIME    AVG CPU %
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman inspect cube-root-ms-podman | grep -A 20 -B 5 '"Memory"'
                    0,
                    0
               ],
               "Isolation": "",
               "CpuShares": 0,
               "Memory": 0,
               "NanoCpus": 0,
               "CgroupParent": "user.slice",
               "BlkioWeight": 0,
               "BlkioWeightDevice": null,
               "BlkioDeviceReadBps": null,
               "BlkioDeviceWriteBps": null,
               "BlkioDeviceReadIOps": null,
               "BlkioDeviceWriteIOps": null,
               "CpuPeriod": 0,
               "CpuQuota": 0,
               "CpuRealtimePeriod": 0,
               "CpuRealtimeRuntime": 0,
               "CpusetCpus": "",
               "CpusetMems": "",
               "Devices": [],
               "DiskQuota": 0,
               "KernelMemory": 0,
               "MemoryReservation": 0,
               "MemorySwap": 0,
               "MemorySwappiness": null,
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman inspect cube-root-ms-podman | grep -A 20 -B 5 '"NanoCpus"' 
                    0
               ],
               "Isolation": "",
               "CpuShares": 0,
               "Memory": 0,
               "NanoCpus": 0,
               "CgroupParent": "user.slice",
               "BlkioWeight": 0,
               "BlkioWeightDevice": null,
               "BlkioDeviceReadBps": null,
               "BlkioDeviceWriteBps": null,
               "BlkioDeviceReadIOps": null,
               "BlkioDeviceWriteIOps": null,
               "CpuPeriod": 0,
               "CpuQuota": 0,
               "CpuRealtimePeriod": 0,
               "CpuRealtimeRuntime": 0,
               "CpusetCpus": "",
               "CpusetMems": "",
               "Devices": [],
               "DiskQuota": 0,
               "KernelMemory": 0,
               "MemoryReservation": 0,
               "MemorySwap": 0,
               "MemorySwappiness": null,
               "OomKillDisable": false,
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

6. Batch 6 — Final high-volume test:
We've already successfully tested:

100 transactions   ✅
1,000 transactions ✅
10,000 transactions ✅

For the POC, I'd next test:

50,000 transactions

but don't run this until we finish the restart/storage tests, because we should keep the environment stable first.

**Overall findings now**:
| Area                        | Result                                                 |
| --------------------------- | ------------------------------------------------------ |
| Application restart         | ✅                                                      |
| Application process failure | ✅ auto-restart                                         |
| Container recreation        | ✅                                                      |
| Loki restart                | ✅                                                      |
| Promtail restart            | ✅                                                      |
| Grafana restart             | ✅                                                      |
| Grafana failure isolation   | ✅                                                      |
| Promtail downtime recovery  | ✅                                                      |
| Log rotation                | ✅                                                      |
| 100 transactions            | ✅                                                      |
| 1,000 transactions          | ✅                                                      |
| 10,000 transactions         | ✅                                                      |
| Storage persistence         | ✅                                                      |
| Loki complete outage        | ⚠️ current logging design can lose/recovery-delay logs |
| VM restart                  | ⚠️ containers don't automatically start                |
| Container CPU limit         | ❌ not configured                                       |
| Container memory limit      | ❌ not configured                                       |

7. Next batch: Resource-limit testing:

* Test A — Memory limit:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman rm -f cube-root-ms-podman
cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman run -d \
  --name cube-root-ms-podman \
  --restart=always \
  --network podman-logging \
  -p 3001:3001 \
  -v "$(pwd)/data:/data" \
  -v "$(pwd)/logs:/logs" \
  -e CONTAINER_ENGINE=podman \
  --memory=128m \
  localhost/cube-root-ms:podman-poc
22b265c6d23591f94d2a59d964c941ea37de93135762531aa9bd8be45bafc029
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman inspect -f '{{.Name}} -> Memory={{.HostConfig.Memory}}' cube-root-ms-podman
cube-root-ms-podman -> Memory=134217728
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO          BLOCK IO      PIDS  CPU TIME    AVG CPU %
22b265c6d235  cube-root-ms-podman  5.60%       123.2MB / 134.2MB  91.78%      1.306kB / 628B  93.33MB / 0B  18  594.227ms   5.60%
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3001/health
{"status":"UP","engine":"podman","hostname":"22b265c6d235"}%                                                          
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

* Test B — Small load:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=1000 CONCURRENCY=20 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 1000
Concurrency  : 20

Load test completed

Application metrics:
{"pid":13,"uptime":44.524703059,"memory":{"rss":65196032,"heapUsed":12094056,"heapTotal":15515648},"storage":{"transactionsBytes":977660,"logsBytes":99341}}%                                                                               
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO          BLOCK IO           PIDS       CPU TIME    AVG CPU %
22b265c6d235  cube-root-ms-podman  3.70%       129.7MB / 134.2MB  96.64%      1.586kB / 768B  93.41MB / 4.096kB  18       1.721752s   3.70%
keerthana@Keerthanas-MacBook-Air podman-migration-poc % curl http://localhost:3001/metrics/local
{"pid":13,"uptime":50.420583619,"memory":{"rss":65196032,"heapUsed":12125352,"heapTotal":15515648},"storage":{"transactionsBytes":977660,"logsBytes":99341}}%                                                                               
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

**Result**:
| Check                           | Result       | Observation                                                            |
| ------------------------------- | ------------ | ---------------------------------------------------------------------- |
| Memory limit                    | ✅ Applied    | `128 MB`                                                               |
| Initial memory                  | ⚠️ High      | `123.2 MB / 134.2 MB` → **91.78%**                                     |
| Health                          | ✅ PASS       | App stayed `UP`                                                        |
| 1,000 requests / 20 concurrency | ✅ PASS       | Load completed                                                         |
| Memory after load               | ⚠️ Very high | `129.7 MB / 134.2 MB` → **96.64%**                                     |
| App process RSS                 | ~65 MB       | Node itself is not using 129 MB; container total includes other memory |
| Crash/OOM                       | ❌ No         | No OOM observed                                                        |

**Next batch — CPU limit + 10K load**:

* Test C — CPU limit:

keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman rm -f cube-root-ms-podman
cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman run -d \
  --name cube-root-ms-podman \
  --restart=always \
  --network podman-logging \
  -p 3001:3001 \
  -v "$(pwd)/data:/data" \
  -v "$(pwd)/logs:/logs" \
  -e CONTAINER_ENGINE=podman \
  --memory=256m \
  --cpus=0.5 \
  localhost/cube-root-ms:podman-poc
37afe186da5dd0adbda9680114b5bfe1f8a4cbf6c95989bfa46c33028c8c41cb
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman inspect -f '{{.Name}} -> Memory={{.HostConfig.Memory}} CPUQuota={{.HostConfig.CPUQuota}} CPUPeriod={{.HostConfig.CPUPeriod}}' cube-root-ms-podman
cube-root-ms-podman -> Memory=268435456 CPUQuota=Error: template: inspect:1:76: executing "inspect" at <.HostConfig.CPUQuota>: can't evaluate field CPUQuota in type *define.InspectContainerHostConfig
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman stats --no-stream

curl http://localhost:3001/health

TOTAL_REQUESTS=1000 CONCURRENCY=20 ./scripts/load-test.sh

podman stats --no-stream

curl http://localhost:3001/metrics/local
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO         BLOCK IO      PIDS CPU TIME    AVG CPU %
37afe186da5d  cube-root-ms-podman  4.08%       34.28MB / 268.4MB  12.77%      1.36kB / 628B  1.729MB / 0B  18 477.786ms   4.08%
{"status":"UP","engine":"podman","hostname":"37afe186da5d"}================================
Transaction Load Test
================================
Requests     : 1000
Concurrency  : 20

Load test completed

Application metrics:
{"pid":13,"uptime":20.474606679,"memory":{"rss":65196032,"heapUsed":12106528,"heapTotal":16302080},"storage":{"transactionsBytes":1057553,"logsBytes":198234}}
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO        BLOCK IO      PIDSCPU TIME    AVG CPU %
37afe186da5d  cube-root-ms-podman  7.44%       40.93MB / 268.4MB  15.25%      1.5kB / 698B  1.729MB / 0B  181.555691s   7.44%
{"pid":13,"uptime":20.601587788,"memory":{"rss":65196032,"heapUsed":12137376,"heapTotal":16302080},"storage":{"transactionsBytes":1057553,"logsBytes":198234}}%                                                                             
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=10000 CONCURRENCY=50 ./scripts/load-test.sh

podman stats --no-stream

curl http://localhost:3001/health

grep -c "TRANSACTION_PROCESSED" logs/application.log
================================
Transaction Load Test
================================
Requests     : 10000
Concurrency  : 50

Load test completed

Application metrics:
{"pid":13,"uptime":154.889997464,"memory":{"rss":83509248,"heapUsed":14605384,"heapTotal":34127872},"storage":{"transactionsBytes":1866447,"logsBytes":1197128}}
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO         BLOCK IO           PIDS      CPU TIME    AVG CPU %
37afe186da5d  cube-root-ms-podman  5.43%       60.01MB / 268.4MB  22.35%      1.92kB / 908B  1.729MB / 4.096kB  18      8.428329s   5.43%
{"status":"UP","engine":"podman","hostname":"37afe186da5d"}12004
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

* Current conclusion:

256 MB memory + 0.5 CPU handled 10K requests without failure.

Compared with the previous 128 MB test, this is much more comfortable:
----------------------------------------------------------------------
128 MB limit → ~97% container memory after 1K ⚠️
256 MB limit → ~22% container memory after 10K ✅

So the 128 MB limit is too tight for this POC workload, while 256 MB currently has substantial headroom.


**Next: 50K + storage test**:

keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== BEFORE ==="
du -sh data logs monitoring/loki
ls -lh data/transactions.log logs/application.log
=== BEFORE ===
2.1M    data
3.1M    logs
180K    monitoring/loki
-rw-r--r--  1 keerthana  staff   1.8M Sep 17 16:47 data/transactions.log
-rw-r--r--  1 keerthana  staff   1.1M Sep 17 16:47 logs/application.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % TOTAL_REQUESTS=50000 CONCURRENCY=100 ./scripts/load-test.sh
================================
Transaction Load Test
================================
Requests     : 50000
Concurrency  : 100

Load test completed

Application metrics:
{"pid":13,"uptime":856.217600363,"memory":{"rss":83951616,"heapUsed":12863776,"heapTotal":34127872},"storage":{"transactionsBytes":5955341,"logsBytes":6236022}}%                                                                           
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== PODMAN STATS ==="
podman stats --no-stream

echo "=== APP HEALTH ==="
curl http://localhost:3001/health

echo "=== APP METRICS ==="
curl http://localhost:3001/metrics/local
=== PODMAN STATS ===
ID            NAME                 CPU %       MEM USAGE / LIMIT  MEM %       NET IO           BLOCK IO           PIDS        CPU TIME    AVG CPU %
37afe186da5d  cube-root-ms-podman  4.34%       60.11MB / 268.4MB  22.39%      2.2kB / 1.048kB  1.729MB / 4.096kB  18        37.428458s  4.34%
=== APP HEALTH ===
{"status":"UP","engine":"podman","hostname":"37afe186da5d"}=== APP METRICS ===
{"pid":13,"uptime":861.940697476,"memory":{"rss":83951616,"heapUsed":12910528,"heapTotal":34127872},"storage":{"transactionsBytes":5955341,"logsBytes":6236022}}%                                                                           
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== AFTER ==="
du -sh data logs monitoring/loki
ls -lh data/transactions.log logs/application.log
=== AFTER ===
6.1M    data
7.1M    logs
180K    monitoring/loki
-rw-r--r--  1 keerthana  staff   5.7M Sep 17 16:59 data/transactions.log
-rw-r--r--  1 keerthana  staff   5.9M Sep 17 16:59 logs/application.log
keerthana@Keerthanas-MacBook-Air podman-migration-poc % echo "=== TRANSACTION COUNT ==="
grep -c "TRANSACTION_PROCESSED" logs/application.log
=== TRANSACTION COUNT ===
62004
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND     CREATED         STATUS         PORTS                   NAMES
37afe186da5d  localhost/cube-root-ms:podman-poc  npm start   14 minutes ago  Up 14 minutes  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

**50K result**:
| Test                | Result                           |
| ------------------- | -------------------------------- |
| Requests            | **50,000**                       |
| Concurrency         | **100**                          |
| Load test           | ✅ Completed                      |
| App health          | ✅ UP                             |
| Container           | ✅ Still running                  |
| Memory              | **60.11 MB / 268.4 MB (22.39%)** |
| CPU snapshot        | **4.34%**                        |
| Node RSS            | ~84 MB                           |
| Transaction log     | **1.8 MB → 5.7 MB**              |
| Application log     | **1.1 MB → 5.9 MB**              |
| Loki storage        | **180K → 180K**                  |
| Logged transactions | **62,004**                       |

