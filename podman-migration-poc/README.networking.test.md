# Part 1 — First understand the networking model:

* a normal multi-container Podman setup:

Container A
     │
     │ Podman network
     │
Container B

- Podman provides the network and container-to-container connectivity.
- With a user-defined Podman network, containers can communicate using container/network DNS names.

* For example:

http://service-b:4000

instead of:
http://localhost:4000

That distinction is important.

## Part 2 — Why we're testing security:

* It's:
        "Can they communicate only where they are supposed to communicate?"

* Imagine:

API
 │
 ├──→ Transaction Service
 │
 └──→ User Service

* You don't want:

Transaction Service
       │
       ├──→ User Service     allowed?
       ├──→ MongoDB          allowed?
       ├──→ Loki             allowed?
       └──→ random container allowed?

**So today's security testing will check**:

1. Test A — Expected communication
Service A → Service B
- should work.

2. Test B — Host exposure
Can your Mac directly access Service B?
    If B is supposed to be internal:
        Mac → Service B
- should not be exposed unnecessarily.

3. Test C — Network isolation
Put another container outside the application network:

Service A ───── Service B
                  ▲
                  │
              isolated
              container
- Check whether the isolated container can access B.

4. Test D — Port exposure
We will distinguish:
    EXPOSE 4000

from:
    -p 4000:4000
- These are not the same thing.
- EXPOSE is metadata/documentation.
- -p actually publishes the container port through the host networking path.
- That's an important migration/security concept.

### What you're learning here
===============================
A Podman network contains things such as:

Network
 ├── subnet
 ├── gateway
 ├── DNS behavior
 └── connected containers

Conceptually:

Podman network
       │
       ├── container A
       ├── container B
       └── container C

#### Terminal Logs of networking POC: 

keerthana@Mac-47 podman-migration-poc % cd /Applications/podman-poc/podman-migration-poc
keerthana@Mac-47 podman-migration-poc % podman machine list
podman info
NAME                     VM TYPE     CREATED      LAST UP            CPUS        MEMORY      DISK SIZE
podman-machine-default*  applehv     11 days ago  Currently running  5           2GiB        100GiB
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
    idlePercent: 98.62
    systemPercent: 0.67
    userPercent: 0.71
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
  freeLocks: 2017
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
  memAvailable: 1305214976
  memFree: 600039424
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
  uptime: 2h 41m 55.00s (Approximately 0.08 days)
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
    number: 13
    paused: 0
    running: 3
    stopped: 10
  graphDriverName: overlay
  graphOptions:
    overlay.mountopt: nodev
  graphRoot: /var/home/core/.local/share/containers/storage
  graphRootAllocated: 106769133568
  graphRootUsed: 9500925952
  graphStatus:
    Backing Filesystem: xfs
    Native Overlay Diff: "true"
    Supports d_type: "true"
    Supports shifting: "false"
    Supports volatile: "true"
    Using metacopy: "false"
  imageCopyTmpDir: /var/tmp
  imageStore:
    number: 138
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

keerthana@Mac-47 podman-migration-poc % podman ps -a
CONTAINER ID  IMAGE                               COMMAND               CREATED      STATUS                    PORTS                      NAMES
b49ea2614a7c                                                            10 days ago  Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  f31df1fb1106-infra
d8e2559e5602  localhost/podman-poc-app:pod        node app.js           10 days ago  Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  podman-app
cf0aa34751bb  docker.io/library/mongo:8           mongod                10 days ago  Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  podman-mongodb
c3cc372c14a2                                                            10 days ago  Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp                      0625b91c0000-infra
36d65eaeda31  docker.io/library/mongo:7           mongod                10 days ago  Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp, 27017/tcp                 mern-mongodb
12795a7ef310  localhost/user-service:latest       npm start             10 days ago  Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp                      mern-user-service
0edb28ddb9fd  localhost/product-service:latest    npm start             10 days ago  Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp                      mern-product-service
827fc97a8dcc  localhost/api-gateway:latest        npm start             10 days ago  Exited (0) 292 years ago  0.0.0.0:3000->3000/tcp                      mern-api-gateway
4e47e20fb91b  localhost/cube-transaction-ms:test  node --max_old_sp...  5 days ago   Exited (0) 5 days ago     0.0.0.0:6000->6000/tcp                      cube-transaction-test
9f570c521139  docker.io/grafana/promtail:3.5.0    -config.file=/etc...  3 days ago   Up 2 hours                      promtail
739916f94c1c  docker.io/grafana/loki:3.5.0        -config.file=/etc...  3 days ago   Up 2 hours                0.0.0.0:3100->3100/tcp                      loki
3a66b0a18650  docker.io/grafana/grafana:12.1.1                          3 days ago   Exited (0) 3 days ago     0.0.0.0:3000->3000/tcp                      grafana
e2e7b53d82e2  localhost/cube-root-ms:podman-poc   npm start             2 hours ago  Up 2 hours                0.0.0.0:3001->3001/tcp                      cube-root-ms-podman
keerthana@Mac-47 podman-migration-poc % podman network ls
NETWORK ID    NAME            DRIVER
2f259bab93aa  podman          bridge
dbc8f61d183e  podman-logging  bridge
keerthana@Mac-47 podman-migration-poc % podman network inspect podman
[
     {
          "name": "podman",
          "id": "2f259bab93aaaaa2542ba43ef33eb990d0999ee1b9924b557b7be53c0b7a1bb9",
          "driver": "bridge",
          "network_interface": "podman0",
          "created": "2026-09-21T09:36:06.172987266+05:30",
          "subnets": [
               {
                    "subnet": "10.88.0.0/16",
                    "gateway": "10.88.0.1"
               }
          ],
          "ipv6_enabled": false,
          "internal": false,
          "dns_enabled": false,
          "ipam_options": {
               "driver": "host-local"
          },
          "containers": {
               "e2e7b53d82e298aa68d5ad20044f5aebaa9705bc6a98849c9031c70c8822ac5a": {
                    "name": "cube-root-ms-podman",
                    "interfaces": {
                         "eth0": {
                              "subnets": [
                                   {
                                        "ipnet": "10.88.0.2/16",
                                        "gateway": "10.88.0.1"
                                   }
                              ],
                              "mac_address": "36:e4:25:3a:87:2f"
                         }
                    }
               }
          }
     }
]
keerthana@Mac-47 podman-migration-poc % 

* Create a dedicated application network:
------------------------------------------
keerthana@Mac-47 podman-migration-poc % podman network create microservice-net
microservice-net
keerthana@Mac-47 podman-migration-poc % podman network ls
NETWORK ID    NAME              DRIVER
9012e5c7f4f0  microservice-net  bridge
2f259bab93aa  podman            bridge
dbc8f61d183e  podman-logging    bridge
keerthana@Mac-47 podman-migration-poc % podman network inspect microservice-net
[
     {
          "name": "microservice-net",
          "id": "9012e5c7f4f051b3f70f02c8971331f9f15c21af5dd37b55073fee63115144d4",
          "driver": "bridge",
          "network_interface": "podman2",
          "created": "2026-09-21T06:49:02.517065213Z",
          "subnets": [
               {
                    "subnet": "10.89.1.0/24",
                    "gateway": "10.89.1.1"
               }
          ],
          "ipv6_enabled": false,
          "internal": false,
          "dns_enabled": true,
          "ipam_options": {
               "driver": "host-local"
          },
          "containers": {}
     }
]
keerthana@Mac-47 podman-migration-poc % 

**Think**:

microservice-net
       │
       ├── Service A
       └── Service B

This becomes our communication boundary.

**Create Service B**:
---------------------
From your project directory:
----------------------------
mkdir -p network-poc/service-b
cd network-poc/service-b

Create:
--------
cat > package.json <<'EOF'
{
  "name": "service-b",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js"
  }
}
EOF

Then:
-----
cat > server.js <<'EOF'
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      service: 'service-b',
      status: 'UP'
    }));
    return;
  }

  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({
    service: 'service-b',
    message: 'Request received from another container'
  }));
});

server.listen(4000, '0.0.0.0', () => {
  console.log('Service B listening on port 4000');
});
EOF

Create its Dockerfile:
---------------------
cat > Dockerfile <<'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY server.js .

EXPOSE 4000

CMD ["npm", "start"]
EOF

Build it:
--------
podman build -t service-b:network-poc .

keerthana@Mac-47 service-b % podman build -t service-b:network-poc .
STEP 1/6: FROM node:18-alpine
STEP 2/6: WORKDIR /app
--> dd27dd180328
STEP 3/6: COPY package.json .
--> 11b65ce26ff8
STEP 4/6: COPY server.js .
--> badf04222968
STEP 5/6: EXPOSE 4000
--> cc746b2b3057
STEP 6/6: CMD ["npm", "start"]
COMMIT service-b:network-poc
--> b1115d673954
Successfully tagged localhost/service-b:network-poc
b1115d673954f78a02992d9188787be952411606af348c56dd5215fdaebeb530
keerthana@Mac-47 service-b %

**Run Service B ONLY inside Podman network**:
--------------------------------------------
keerthana@Mac-47 service-b % podman run -d \
  --name service-b \
  --network microservice-net \
  service-b:network-poc
a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba
keerthana@Mac-47 service-b % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED        STATUS        PORTS                   NAMES
9f570c521139  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  3 days ago     Up 2 hours                            promtail
739916f94c1c  docker.io/grafana/loki:3.5.0       -config.file=/etc...  3 days ago     Up 2 hours    0.0.0.0:3100->3100/tcp  loki
e2e7b53d82e2  localhost/cube-root-ms:podman-poc  npm start             2 hours ago    Up 2 hours    0.0.0.0:3001->3001/tcp  cube-root-ms-podman
a41e27db843f  localhost/service-b:network-poc    npm start             5 seconds ago  Up 5 seconds  4000/tcp                service-b
keerthana@Mac-47 service-b % podman inspect service-b
[
     {
          "Id": "a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba",
          "Created": "2026-09-21T12:27:08.18353257+05:30",
          "Path": "docker-entrypoint.sh",
          "Args": [
               "npm",
               "start"
          ],
          "State": {
               "OciVersion": "1.3.0",
               "Status": "running",
               "Running": true,
               "Paused": false,
               "Restarting": false,
               "OOMKilled": false,
               "Dead": false,
               "Pid": 28729,
               "ConmonPid": 28727,
               "ExitCode": 0,
               "Error": "",
               "StartedAt": "2026-09-21T12:27:08.250506014+05:30",
               "FinishedAt": "0001-01-01T00:00:00Z",
               "CgroupPath": "/user.slice/user-501.slice/user@501.service/user.slice/libpod-a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba.scope",
               "CheckpointedAt": "0001-01-01T00:00:00Z",
               "RestoredAt": "0001-01-01T00:00:00Z"
          },
          "Image": "b1115d673954f78a02992d9188787be952411606af348c56dd5215fdaebeb530",
          "ImageDigest": "sha256:fdd414f657f2071a267c701139b8f6229c6b031cc620dfacaa79fae57364f9b2",
          "ImageName": "localhost/service-b:network-poc",
          "Rootfs": "",
          "Pod": "",
          "ResolvConfPath": "/run/user/501/containers/overlay-containers/a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba/userdata/resolv.conf",
          "HostnamePath": "/run/user/501/containers/overlay-containers/a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba/userdata/hostname",
          "HostsPath": "/run/user/501/containers/overlay-containers/a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba/userdata/hosts",
          "StaticDir": "/var/home/core/.local/share/containers/storage/overlay-containers/a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba/userdata",
          "OCIConfigPath": "/var/home/core/.local/share/containers/storage/overlay-containers/a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba/userdata/config.json",
          "OCIRuntime": "crun",
          "ConmonPidFile": "/run/user/501/containers/overlay-containers/a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba/userdata/conmon.pid",
          "PidFile": "/run/user/501/containers/overlay-containers/a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba/userdata/pidfile",
          "Name": "service-b",
          "RestartCount": 0,
          "Driver": "overlay",
          "MountLabel": "system_u:object_r:container_file_t:s0:c649,c959",
          "ProcessLabel": "system_u:system_r:container_t:s0:c649,c959",
          "AppArmorProfile": "",
          "EffectiveCaps": [
               "CAP_CHOWN",
               "CAP_DAC_OVERRIDE",
               "CAP_FOWNER",
               "CAP_FSETID",
               "CAP_KILL",
               "CAP_NET_BIND_SERVICE",
               "CAP_SETFCAP",
               "CAP_SETGID",
               "CAP_SETPCAP",
               "CAP_SETUID",
               "CAP_SYS_CHROOT"
          ],
          "BoundingCaps": [
               "CAP_CHOWN",
               "CAP_DAC_OVERRIDE",
               "CAP_FOWNER",
               "CAP_FSETID",
               "CAP_KILL",
               "CAP_NET_BIND_SERVICE",
               "CAP_SETFCAP",
               "CAP_SETGID",
               "CAP_SETPCAP",
               "CAP_SETUID",
               "CAP_SYS_CHROOT"
          ],
          "ExecIDs": [],
          "GraphDriver": {
               "Name": "overlay",
               "Data": {
                    "LowerDir": "/var/home/core/.local/share/containers/storage/overlay/7ebddc189b7599a4a24629581d236a2717c079ffb44cfa09a3590c6f58035a13/diff:/var/home/core/.local/share/containers/storage/overlay/3e937543e2daea7971a494924fbaa257ec84bc9eecc212f444fa527bff049d1e/diff:/var/home/core/.local/share/containers/storage/overlay/89c2eee637ac241eeb1f7768a3054226b5a59366ad855dcf9a285b7e52a719d2/diff:/var/home/core/.local/share/containers/storage/overlay/ae7d08cbb6aa28a395ceee1820a08308d29d33c0a5c10c9bbe76e02f34838dd1/diff:/var/home/core/.local/share/containers/storage/overlay/4c8afbeff0e19fe2f3e4d7d1618d73a38ccb3a9d2625b88e932b92164fda38fe/diff:/var/home/core/.local/share/containers/storage/overlay/a16e98724c05975ee8c40d8fe389c3481373d34ab20a1cf52ea2accc43f71f4c/diff",
                    "MergedDir": "/var/home/core/.local/share/containers/storage/overlay/4d5dbaa171156a64922ecea6477c441ddaa7a49a622fde03ce219b3b3f0f986a/merged",
                    "UpperDir": "/var/home/core/.local/share/containers/storage/overlay/4d5dbaa171156a64922ecea6477c441ddaa7a49a622fde03ce219b3b3f0f986a/diff",
                    "WorkDir": "/var/home/core/.local/share/containers/storage/overlay/4d5dbaa171156a64922ecea6477c441ddaa7a49a622fde03ce219b3b3f0f986a/work"
               }
          },
          "Mounts": [],
          "Dependencies": [],
          "NetworkSettings": {
               "EndpointID": "",
               "Gateway": "",
               "IPAddress": "",
               "IPPrefixLen": 0,
               "IPv6Gateway": "",
               "GlobalIPv6Address": "",
               "GlobalIPv6PrefixLen": 0,
               "MacAddress": "",
               "Bridge": "",
               "SandboxID": "",
               "HairpinMode": false,
               "LinkLocalIPv6Address": "",
               "LinkLocalIPv6PrefixLen": 0,
               "Ports": {
                    "4000/tcp": null
               },
               "SandboxKey": "/run/user/501/netns/netns-ce085dcd-918c-e66c-8fea-54a8e1f5fdd9",
               "Networks": {
                    "microservice-net": {
                         "EndpointID": "",
                         "Gateway": "10.89.1.1",
                         "IPAddress": "10.89.1.2",
                         "IPPrefixLen": 24,
                         "IPv6Gateway": "",
                         "GlobalIPv6Address": "",
                         "GlobalIPv6PrefixLen": 0,
                         "MacAddress": "5e:9b:91:50:6b:5c",
                         "NetworkID": "9012e5c7f4f051b3f70f02c8971331f9f15c21af5dd37b55073fee63115144d4",
                         "DriverOpts": null,
                         "IPAMConfig": null,
                         "Links": null,
                         "Aliases": [
                              "a41e27db843f"
                         ]
                    }
               }
          },
          "Namespace": "",
          "IsInfra": false,
          "IsService": false,
          "KubeExitCodePropagation": "invalid",
          "lockNumber": 31,
          "Config": {
               "Hostname": "a41e27db843f",
               "Domainname": "",
               "User": "",
               "AttachStdin": false,
               "AttachStdout": false,
               "AttachStderr": false,
               "Tty": false,
               "OpenStdin": false,
               "StdinOnce": false,
               "Env": [
                    "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                    "container=podman",
                    "NODE_VERSION=18.20.8",
                    "YARN_VERSION=1.22.22",
                    "HOME=/root",
                    "HOSTNAME=a41e27db843f"
               ],
               "Cmd": [
                    "npm",
                    "start"
               ],
               "Image": "localhost/service-b:network-poc",
               "Volumes": null,
               "WorkingDir": "/app",
               "Entrypoint": [
                    "docker-entrypoint.sh"
               ],
               "OnBuild": null,
               "Labels": {
                    "io.buildah.version": "1.45.0"
               },
               "Annotations": {
                    "io.container.manager": "libpod",
                    "org.opencontainers.image.stopSignal": "15",
                    "org.systemd.property.KillSignal": "15",
                    "org.systemd.property.TimeoutStopUSec": "uint64 10000000"
               },
               "StopSignal": "SIGTERM",
               "HealthcheckOnFailureAction": "none",
               "HealthLogDestination": "local",
               "HealthcheckMaxLogCount": 5,
               "HealthcheckMaxLogSize": 500,
               "CreateCommand": [
                    "podman",
                    "run",
                    "-d",
                    "--name",
                    "service-b",
                    "--network",
                    "microservice-net",
                    "service-b:network-poc"
               ],
               "Umask": "0022",
               "Timeout": 0,
               "StopTimeout": 10,
               "Passwd": true,
               "sdNotifyMode": "container",
               "ExposedPorts": {
                    "4000/tcp": {}
               }
          },
          "HostConfig": {
               "Binds": [],
               "CgroupManager": "systemd",
               "CgroupMode": "private",
               "ContainerIDFile": "",
               "LogConfig": {
                    "Type": "journald",
                    "Config": null,
                    "Path": "",
                    "Tag": "",
                    "Size": "-1B"
               },
               "NetworkMode": "bridge",
               "PortBindings": {},
               "RestartPolicy": {
                    "Name": "no",
                    "MaximumRetryCount": 0
               },
               "AutoRemove": false,
               "AutoRemoveImage": false,
               "Annotations": {
                    "io.container.manager": "libpod",
                    "org.opencontainers.image.stopSignal": "15",
                    "org.systemd.property.KillSignal": "15",
                    "org.systemd.property.TimeoutStopUSec": "uint64 10000000"
               },
               "VolumeDriver": "",
               "VolumesFrom": null,
               "CapAdd": [],
               "CapDrop": [],
               "Dns": [],
               "DnsOptions": null,
               "DnsSearch": null,
               "ExtraHosts": null,
               "HostsFile": "",
               "GroupAdd": null,
               "IpcMode": "shareable",
               "Cgroup": "",
               "Cgroups": "default",
               "Links": null,
               "OomScoreAdj": 0,
               "PidMode": "private",
               "Privileged": false,
               "PublishAllPorts": false,
               "ReadonlyRootfs": false,
               "SecurityOpt": [],
               "Tmpfs": {},
               "UTSMode": "private",
               "UsernsMode": "",
               "ShmSize": 65536000,
               "Runtime": "oci",
               "ConsoleSize": [
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
               "OomKillDisable": false,
               "PidsLimit": 0,
               "Ulimits": [
                    {
                         "Name": "RLIMIT_NOFILE",
                         "Soft": 524288,
                         "Hard": 524288
                    },
                    {
                         "Name": "RLIMIT_NPROC",
                         "Soft": 7757,
                         "Hard": 7757
                    }
               ],
               "CpuCount": 0,
               "CpuPercent": 0,
               "IOMaximumIOps": 0,
               "IOMaximumBandwidth": 0,
               "CgroupConf": null
          },
          "UseImageHosts": false,
          "UseImageHostname": false
     }
]
keerthana@Mac-47 service-b % podman inspect service-b --format '{{.NetworkSettings.Networks}}'
map[microservice-net:0x508903f76120]
keerthana@Mac-47 service-b % 

* Now Service B is roughly:
----------------------------
Mac
 │
 │  ❌ no -p 4000:4000
 │
Podman VM
 │
 └── microservice-net
        │
        └── service-b:4000

- This is the first security concept.
- The service can exist without being directly exposed to the host.

**Test from the HOST**:
------------------------
keerthana@Mac-47 service-b % curl http://localhost:4000/health
curl: (7) Failed to connect to localhost port 4000 after 0 ms: Couldn't connect to server

**Create Service A**:
---------------------
Go back:
-----------
cd /Applications/podman-poc/podman-migration-poc
mkdir -p network-poc/service-a
cd network-poc/service-a

Create:
-------
cat > Dockerfile <<'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY server.js .

CMD ["node", "server.js"]
EOF

Create package:
--------------
cat > package.json <<'EOF'
{
  "name": "service-a",
  "version": "1.0.0"
}
EOF

Create server:
--------------
cat > server.js <<'EOF'
const http = require('http');

const options = {
  hostname: 'service-b',
  port: 4000,
  path: '/health',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', chunk => data += chunk);

  res.on('end', () => {
    console.log('Response from Service B:', data);
  });
});

req.on('error', (err) => {
  console.error('Service B communication failed:', err.message);
});

req.end();
EOF

Build:
------
podman build -t service-a:network-poc .

Run:
----
podman run --rm \
  --name service-a \
  --network microservice-net \
  service-a:network-poc

keerthana@Mac-47 service-a % podman build -t service-a:network-poc .
STEP 1/5: FROM node:18-alpine
STEP 2/5: WORKDIR /app
--> Using cache dd27dd1803287fbaaa0e2d5b655a24f74fc3a0e2dc5283b5410edc8f205e195c
--> dd27dd180328
STEP 3/5: COPY package.json .
--> e0505586709e
STEP 4/5: COPY server.js .
--> 895befff4420
STEP 5/5: CMD ["node", "server.js"]
COMMIT service-a:network-poc
--> c66add836ad9
Successfully tagged localhost/service-a:network-poc
c66add836ad9fa27d03f35850c68ee688ddaa79c09111ea0dd4bc5c64531de30
keerthana@Mac-47 service-a % podman run --rm \
  --name service-a \
  --network microservice-net \
  service-a:network-poc
Response from Service B: {"service":"service-b","status":"UP"}
keerthana@Mac-47 service-a % 

**What should happen**?

You should get something like:
Response from Service B: {"service":"service-b","status":"UP"}

- This is the core test.

We have proven:
service-a
    │
    │ DNS name: service-b
    │ port: 4000
    ▼
service-b

- without publishing Service B's port to the host.

**Understand what actually happened**:
-------------------------------------
You didn't tell Service A:
172.x.x.x

You told it:
service-b

- Podman networking/DNS resolves that container name on the shared network.

Conceptually:
------------
service-a
    │
    │ DNS lookup
    ▼
service-b
    │
    ▼
container IP
    │
    ▼
port 4000

- So if Service B's IP changes because the container is recreated, Service A doesn't need a hard-coded IP.
- That's one of the reasons container-name/service-name based discovery matters.

**Now the security test**:
--------------------------
* Create a third container that is not attached to microservice-net.

keerthana@Mac-47 service-a % podman run --rm \
  --name isolated-client \
  docker.io/library/alpine:3.20 \
  sh -c "wget -qO- http://service-b:4000/health || echo 'ACCESS FAILED'"
Trying to pull docker.io/library/alpine:3.20...
Getting image source signatures
Copying blob sha256:3f26bc2dec0b515f1c2818f6e13a8f1da1f88179a008445d4e587233386bff78
Copying config sha256:ab3fe4defd29ba6231229a4d41440ac8bde8218e85870e53876277faa24b35c4
Writing manifest to image destination
wget: bad address 'service-b:4000'
ACCESS FAILED
keerthana@Mac-47 service-a % 

* The expected result is:
ACCESS FAILED

Why?
Because:
isolated-client
       │
       X
       │
microservice-net
       │
service-b
- The isolated container isn't participating in that network.

**Attach it to the network and test again**:
--------------------------------------------
keerthana@Mac-47 service-a % podman run --rm \
  --name isolated-client \
  --network microservice-net \
  docker.io/library/alpine:3.20 \
  sh -c "wget -qO- http://service-b:4000/health"
{"service":"service-b","status":"UP"}%                                                                                                                                
keerthana@Mac-47 service-a % podman run --rm \
  --name isolated-client \
  docker.io/library/alpine:3.20 \
  sh -c "wget -qO- http://service-b:4000/health || echo 'ACCESS FAILED'"
wget: bad address 'service-b:4000'
ACCESS FAILED


# What we have done so far

We created:

```text
Service A
Service B
   │
   └── microservice-net
```

## 1. Service B

We created a small HTTP service:

```text
Service B → port 4000
```

and put it into:

```text
microservice-net
```

Podman gave it:

```text
IP = 10.89.1.2
```

---

## 2. Service A

We created another container and also put it into:

```text
microservice-net
```

Then Service A called:

```text
http://service-b:4000/health
```

and got:

```text
{"service":"service-b","status":"UP"}
```

So we proved:

> **Microservice A can communicate with Microservice B through a Podman network.**

That's test #1. ✅

---

# Now what was the "security" test?

There were actually **two simple security observations**.

### Security observation #1 — B isn't exposed to your Mac

We ran:

```bash
curl http://localhost:4000/health
```

and got:

```text
Couldn't connect to server
```

Why?

Because we started B with:

```bash
podman run ... --network microservice-net service-b:network-poc
```

We did **NOT** do:

```bash
-p 4000:4000
```

Therefore:

```text
Your Mac
   │
   │ localhost:4000 ❌
   │
   X
   │
Service B :4000
```

But:

```text
Service A
   │
   │ service-b:4000 ✅
   ▼
Service B
```

### Meaning

B can be an **internal service** without publishing its port to the host.

That's a useful security property.

---

# Security observation #2 — Network isolation

Then we created this:

```text
Container outside network
          │
          X
          │
microservice-net
          │
      Service B
```

We ran:

```bash
podman run --rm \
  docker.io/library/alpine:3.20 \
  sh -c "wget -qO- http://service-b:4000/health"
```

Result:

```text
wget: bad address 'service-b:4000'
ACCESS FAILED
```

Then we put that container on:

```text
--network microservice-net
```

and suddenly:

```text
{"service":"service-b","status":"UP"}
```

So we proved:

> **A container that isn't connected to the network cannot use that network's DNS/service name to reach B.**

That's our second security observation. ✅

---

# So what does Podman networking actually give us?

Think of `microservice-net` like a **private room**.

```text
                 Podman
                   │
          ┌────────┴─────────┐
          │ microservice-net │
          │                  │
          │ Service A        │
          │     ↓            │
          │ Service B        │
          │                  │
          └──────────────────┘
```

Only containers attached to that network participate in that network.

A container outside:

```text
                    X
                    │
              Other container
                    │
          ┌─────────┴─────────┐
          │ microservice-net  │
          │                   │
          │ Service A         │
          │ Service B         │
          └───────────────────┘
```

---

# But here's the important limitation

**Don't conclude that Service B is fully secured.**

We haven't proved that.

In fact, our test exposed something important:

```text
Any container that joins microservice-net
             │
             ▼
       service-b:4000
```

can currently reach B.

We just demonstrated that with the Alpine container.

So Podman networking currently gives us:

```text
Network isolation       ✅
Internal communication  ✅
DNS discovery           ✅
Avoid host exposure     ✅
```

But we haven't established:

```text
Service A → B only
Service C → B blocked
Service A → only port 4000
```

That is a **more granular security policy**.

---

# Why does this matter for your migration?

Your real application is not:

```text
A → B
```

It will be more like:

```text
                    ┌── Transaction Service
                    │
API Gateway ─────────┼── User Service
                    │
                    ├── Database
                    │
                    └── Other services
```

You need to know:

> "Can I control which services are allowed to communicate with which other services?"

That's where today's next test matters.


---

## So today's progress is actually simple

### Networking

**Done ✅**

```text
Service A
    ↓
microservice-net
    ↓
Service B
```

We proved communication.

### Security

**Partially done ✅**

We proved:

1. B isn't unnecessarily published to the host.
2. Containers outside the network can't resolve/reach B through that network.
3. Containers inside the network can reach B.

**one practical test — multiple networks**:
-------------------------------------------

keerthana@Mac-47 service-a % podman network create backend-net
backend-net
keerthana@Mac-47 service-a % podman network ls
NETWORK ID    NAME              DRIVER
b3d2332c7338  backend-net       bridge
9012e5c7f4f0  microservice-net  bridge
2f259bab93aa  podman            bridge
dbc8f61d183e  podman-logging    bridge
keerthana@Mac-47 service-a % podman network connect backend-net service-b
keerthana@Mac-47 service-a % podman inspect service-b --format '{{json .NetworkSettings.Networks}}'
{"backend-net":{"EndpointID":"","Gateway":"10.89.2.1","IPAddress":"10.89.2.2","IPPrefixLen":24,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"c2:93:fd:8c:ce:c5","NetworkID":"b3d2332c73380a5b86f3bac58f7ffcc9d1b8eb663ae0e50d509f598f3711da0e","DriverOpts":null,"IPAMConfig":null,"Links":null,"Aliases":["a41e27db843f"]},"microservice-net":{"EndpointID":"","Gateway":"10.89.1.1","IPAddress":"10.89.1.2","IPPrefixLen":24,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"5e:9b:91:50:6b:5c","NetworkID":"9012e5c7f4f051b3f70f02c8971331f9f15c21af5dd37b55073fee63115144d4","DriverOpts":null,"IPAMConfig":null,"Links":null,"Aliases":["a41e27db843f"]}}
keerthana@Mac-47 service-a % 

* What we're expecting

Service B will now be on two networks:

                 service-b
                /         \
               /           \
microservice-net          backend-net

This is the important Podman concept:

One container can belong to multiple Podman networks.

keerthana@Mac-47 service-a % podman network create backend-net
backend-net
keerthana@Mac-47 service-a % podman network ls
NETWORK ID    NAME              DRIVER
b3d2332c7338  backend-net       bridge
9012e5c7f4f0  microservice-net  bridge
2f259bab93aa  podman            bridge
dbc8f61d183e  podman-logging    bridge
keerthana@Mac-47 service-a % podman network connect backend-net service-b
keerthana@Mac-47 service-a % podman inspect service-b --format '{{json .NetworkSettings.Networks}}'
{"backend-net":{"EndpointID":"","Gateway":"10.89.2.1","IPAddress":"10.89.2.2","IPPrefixLen":24,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"c2:93:fd:8c:ce:c5","NetworkID":"b3d2332c73380a5b86f3bac58f7ffcc9d1b8eb663ae0e50d509f598f3711da0e","DriverOpts":null,"IPAMConfig":null,"Links":null,"Aliases":["a41e27db843f"]},"microservice-net":{"EndpointID":"","Gateway":"10.89.1.1","IPAddress":"10.89.1.2","IPPrefixLen":24,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"5e:9b:91:50:6b:5c","NetworkID":"9012e5c7f4f051b3f70f02c8971331f9f15c21af5dd37b55073fee63115144d4","DriverOpts":null,"IPAMConfig":null,"Links":null,"Aliases":["a41e27db843f"]}}
keerthana@Mac-47 service-a % podman network connect backend-net service-a
Error: no container with name or ID "service-a" found: no such container
keerthana@Mac-47 service-a % podman run -d \
  --name service-a \
  --network microservice-net \
  service-a:network-poc
241fd510f9d1fbb2530e78095fe549f76c8c9f5991def4a0d010cfb2e430bfe5
keerthana@Mac-47 service-a % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED      STATUS      PORTS                   NAMES
9f570c521139  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  4 days ago   Up 5 hours                          promtail
739916f94c1c  docker.io/grafana/loki:3.5.0       -config.file=/etc...  4 days ago   Up 5 hours  0.0.0.0:3100->3100/tcp  loki
e2e7b53d82e2  localhost/cube-root-ms:podman-poc  npm start             5 hours ago  Up 5 hours  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
a41e27db843f  localhost/service-b:network-poc    npm start             3 hours ago  Up 3 hours  4000/tcp                service-b
keerthana@Mac-47 service-a % podman network connect backend-net service-a
keerthana@Mac-47 service-a % podman inspect service-a --format '{{json .NetworkSettings.Networks}}'
{"backend-net":{"EndpointID":"","Gateway":"","IPAddress":"","IPPrefixLen":0,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"","NetworkID":"b3d2332c73380a5b86f3bac58f7ffcc9d1b8eb663ae0e50d509f598f3711da0e","DriverOpts":null,"IPAMConfig":null,"Links":null,"Aliases":["241fd510f9d1"]},"microservice-net":{"EndpointID":"","Gateway":"","IPAddress":"","IPPrefixLen":0,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"","NetworkID":"9012e5c7f4f051b3f70f02c8971331f9f15c21af5dd37b55073fee63115144d4","DriverOpts":null,"IPAMConfig":null,"Links":null,"Aliases":["241fd510f9d1"]}}
keerthana@Mac-47 service-a % podman rm service-a
service-a
keerthana@Mac-47 service-a % podman run -d \
  --name service-a \
  --network microservice-net \
  service-a:network-poc \
  sh -c "node server.js; sleep 3600"
8e3dac7c734028cd38060fb672fce86542962b8403ddc42bbc26c2a2df193665
keerthana@Mac-47 service-a % podman network connect backend-net service-a
keerthana@Mac-47 service-a % podman inspect service-a --format '{{json .NetworkSettings.Networks}}'
{"backend-net":{"EndpointID":"","Gateway":"10.89.2.1","IPAddress":"10.89.2.3","IPPrefixLen":24,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"0e:cf:81:9e:3a:31","NetworkID":"b3d2332c73380a5b86f3bac58f7ffcc9d1b8eb663ae0e50d509f598f3711da0e","DriverOpts":null,"IPAMConfig":null,"Links":null,"Aliases":["8e3dac7c7340"]},"microservice-net":{"EndpointID":"","Gateway":"10.89.1.1","IPAddress":"10.89.1.7","IPPrefixLen":24,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"da:6b:3d:3d:47:54","NetworkID":"9012e5c7f4f051b3f70f02c8971331f9f15c21af5dd37b55073fee63115144d4","DriverOpts":null,"IPAMConfig":null,"Links":null,"Aliases":["8e3dac7c7340"]}}
keerthana@Mac-47 service-a % podman ps
CONTAINER ID  IMAGE                              COMMAND               CREATED         STATUS         PORTS                   NAMES
9f570c521139  docker.io/grafana/promtail:3.5.0   -config.file=/etc...  4 days ago      Up 5 hours                             promtail
739916f94c1c  docker.io/grafana/loki:3.5.0       -config.file=/etc...  4 days ago      Up 5 hours     0.0.0.0:3100->3100/tcp  loki
e2e7b53d82e2  localhost/cube-root-ms:podman-poc  npm start             5 hours ago     Up 5 hours     0.0.0.0:3001->3001/tcp  cube-root-ms-podman
a41e27db843f  localhost/service-b:network-poc    npm start             3 hours ago     Up 3 hours     4000/tcp                service-b
8e3dac7c7340  localhost/service-a:network-poc    sh -c node server...  10 seconds ago  Up 11 seconds                          service-a
keerthana@Mac-47 service-a % 

The **two networks part is confusing because we were testing the concept, not building something your application necessarily needs.**

### What are we actually trying to check?

Your real question is:

> **If we migrate Docker → Podman, can one microservice securely communicate with another microservice?**

So we created a very small example:

```text
Service A  →  Service B
```

### Step 1 — We created `microservice-net`

We put both services on it:

```text
microservice-net
      │
      ├── Service A
      │
      └── Service B
```

Then Service A called:

```text
service-b:4000
```

and got:

```text
{"service":"service-b","status":"UP"}
```

✅ **This proves Podman can do microservice-to-microservice communication.**

---

### Step 2 — Why did we create `backend-net`?

Only to demonstrate that **Podman can separate networks**.

We made:

```text
microservice-net
backend-net
```

Then we connected Service A and Service B to both:

```text
             microservice-net
              /            \
        Service A        Service B
             \              /
               backend-net
```

This was **not because your application needs two networks**.

We were checking:

> "Can a Podman container belong to multiple networks?"

Answer: **Yes.**

And we saw Service A has:

```text
microservice-net → 10.89.1.7
backend-net      → 10.89.2.3
```

---

### So what is the actual takeaway?

Think of networks like **separate rooms**.

```text
Room 1: microservice-net
    A ───── B

Room 2: backend-net
    A ───── B
```

A container can be in one room or multiple rooms.

For your migration POC, the **important test** was actually this:

```text
Service A
    │
    │ service-b:4000
    ↓
Service B
```

And we already proved it works.

The second network was just to understand **network segmentation/multiple-network capability**.

**We don't need to keep doing more with the second network.** We can finish this networking test and move to the next important migration risk.


**Test from your Mac**:
-------------------------
Service B is reachable from the Podman network, but we did not publish port 4000 to your Mac:

keerthana@Mac-47 service-a % curl http://localhost:4000/health
curl: (7) Failed to connect to localhost port 4000 after 0 ms: Couldn't connect to server
keerthana@Mac-47 service-a % 

✅ This is the expected result.

### What this proves

```text
Mac → localhost:4000 → Service B
                  ❌
```

Because we started Service B **without**:

```bash
-p 4000:4000
```

So Service B's port 4000 is **not exposed to the host**.

But:

```text
Service A → service-b:4000 → Service B
                         ✅
```

works because both containers are on the Podman network.

### Networking POC — DONE ✅

We verified the important things:

1. **Service-to-service communication** — A → B works.
2. **Podman DNS** — A can find B using `service-b`.
3. **Internal-only service** — B doesn't need a host port.
4. **Network isolation** — containers outside the network couldn't reach B.
5. **Multiple networks** — Podman containers can join multiple networks.

For your migration, the key conclusion is:

> **Podman supports internal microservice communication and network isolation without exposing every service to the host.**


### Service A → Service B

We created:

```text
microservice-net
       │
   ┌───┴───┐
   │       │
Service A  Service B
```

Because both are in the same Podman network:

```text
Service A → service-b:4000 → Service B
```

Here:

* `service-b` = **DNS name** (Podman resolves the container name to its IP)
* `4000` = Service B's application port
* Same network = A can reach B

We **didn't** use:

```bash
-p 4000:4000
```

Therefore:

```text
Mac → localhost:4000 → ❌
A   → service-b:4000 → ✅
```

So yes, you've understood the important part.

### Network isolation — one sentence

**A container that is NOT connected to `microservice-net` cannot use that network's `service-b` DNS/reachability.**

That's all we meant by network isolation. ✅

# Podman provides the DNS resolution for containers on a user-defined network:

Think of it very simply:

### Without Podman DNS

If Service A wanted to call Service B, it would need B's IP:

```text
Service A → 10.89.1.2:4000 → Service B
```

But IPs can change when containers restart. So using IP directly is inconvenient.

### With Podman network

When we created:

```bash
podman network create microservice-net
```

Podman created the network **with DNS support**.

Then when we started:

```bash
podman run ... --name service-b --network microservice-net ...
```

Podman registered the container name `service-b` on that network.

So Service A can simply do:

```text
service-b:4000
```

Podman resolves:

```text
service-b
   ↓
10.89.1.2
   ↓
Service B
```

### So yes:

```text
podman network create
        ↓
Podman network + DNS support
        ↓
service-b registered
        ↓
Service A uses "service-b"
        ↓
Podman resolves name → container IP
```

You **didn't create a separate DNS server or DNS configuration**.

That's why our Service A code could use:

```js
hostname: 'service-b'
```

instead of:

```js
hostname: '10.89.1.2'
```

**This is one of the useful features of Podman networking: container-to-container communication can use stable service/container names instead of hardcoding changing IP addresses.**                                                                                     -->*important point*

## What we checked
1. A → B using service-b DNS        ✅
   Proved containers can communicate.

2. B has no host port published      ✅
   Mac cannot directly access B.

3. Container outside the network     ❌ cannot reach B
   Proved network isolation.

4. Container inside the network      ✅ can reach B
   Proved network membership controls connectivity.

5. Multiple networks                 ✅
   Proved a service can join separate network segments.

## here in podman advantage without using ip we can use container name to communicate what if same container name is that possible - practical output:
keerthana@Mac-47 podman-migration-poc % podman run -d --name service-b alpine:3.20 sleep 3600
Error: creating container storage: the container name "service-b" is already in use by a41e27db843fdd2eaba389dffc3aaac71f3dea59586bbffceee1fe1d6bb1d2ba. You have to remove that container to be able to reuse that name: that name is already in use

# network failovers:-
-----------------------------------------------------------
# Scenario 1 — Container restart → DNS/network recovery
-----------------------------------------------------------

keerthana@Mac-36 podman-migration-poc % cd /Applications/podman-poc/podman-migration-poc
keerthana@Mac-36 podman-migration-poc % podman ps -a --filter name=service-a --filter name=service-b
CONTAINER ID  IMAGE                            COMMAND               CREATED       STATUS                    PORTS       NAMES
a41e27db843f  localhost/service-b:network-poc  npm start             22 hours ago  Exited (0) 292 years ago  4000/tcp    service-b
8e3dac7c7340  localhost/service-a:network-poc  sh -c node server...  19 hours ago  Exited (0) 18 hours ago               service-a
keerthana@Mac-36 podman-migration-poc % podman rm -f service-a service-b 2>/dev/null || true
service-a
service-b
keerthana@Mac-36 podman-migration-poc % podman network rm backend-net 2>/dev/null || true
podman network create backend-net
backend-net
backend-net
keerthana@Mac-36 podman-migration-poc % podman run -d \
  --name service-b \
  --network backend-net \
  -p 4000:4000 \
  node:22-alpine \
  node -e "require('http').createServer((req,res)=>{res.end(JSON.stringify({service:'service-b',status:'UP'}))}).listen(4000,'0.0.0.0')"
fc0bfe1e3a945621eef6784677886aa72aedc4a46bd5bf5210fc300a82fd6c96
keerthana@Mac-36 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                             COMMAND               CREATED        STATUS        PORTS                   NAMES
fc0bfe1e3a94  docker.io/library/node:22-alpine  node -e require('...  3 seconds ago  Up 3 seconds  0.0.0.0:4000->4000/tcp  service-b
keerthana@Mac-36 podman-migration-poc % podman run -d \
  --name service-a \
  --network backend-net \
  node:22-alpine \
  sleep 3600
4254d78c3497aa1367d7171f784850d597838d1398c9c6cac7dd7029a21b91f3
keerthana@Mac-36 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                             COMMAND               CREATED         STATUS         PORTS                   NAMES
fc0bfe1e3a94  docker.io/library/node:22-alpine  node -e require('...  47 seconds ago  Up 48 seconds  0.0.0.0:4000->4000/tcp  service-b
4254d78c3497  docker.io/library/node:22-alpine  sleep 3600            8 seconds ago   Up 8 seconds                           service-a
keerthana@Mac-36 podman-migration-poc % podman exec service-a node -e "require('http').get('http://service-b:4000/health',r=>{let d='';r.on('data',x=>d+=x);r.on('end',()=>console.log(d))}).on('error',e=>console.log('ERROR:',e.message))"
{"service":"service-b","status":"UP"}
keerthana@Mac-36 podman-migration-poc % podman restart service-a
service-a
keerthana@Mac-36 podman-migration-poc % podman ps
CONTAINER ID  IMAGE                             COMMAND               CREATED             STATUS             PORTS                   NAMES
fc0bfe1e3a94  docker.io/library/node:22-alpine  node -e require('...  About a minute ago  Up About a minute  0.0.0.0:4000->4000/tcp  service-b
4254d78c3497  docker.io/library/node:22-alpine  sleep 3600            35 seconds ago      Up 5 seconds                               service-a
keerthana@Mac-36 podman-migration-poc % podman exec service-a node -e "require('http').get('http://service-b:4000/health',r=>{let d='';r.on('data',x=>d+=x);r.on('end',()=>console.log(d))}).on('error',e=>console.log('ERROR:',e.message))"
{"service":"service-b","status":"UP"}
keerthana@Mac-36 podman-migration-poc % podman inspect service-a --format '{{json .NetworkSettings.Networks}}'
{"backend-net":{"EndpointID":"","Gateway":"10.89.2.1","IPAddress":"10.89.2.4","IPPrefixLen":24,"IPv6Gateway":"","GlobalIPv6Address":"","GlobalIPv6PrefixLen":0,"MacAddress":"6e:86:65:d9:0f:39","NetworkID":"ad367daaaa8953d447a65bf7b708c0449c811cfb78c693944262d451755f367a","DriverOpts":null,"IPAMConfig":null,"Links":null,"Aliases":["4254d78c3497"]}}
keerthana@Mac-36 podman-migration-poc % podman network inspect backend-net
[
     {
          "name": "backend-net",
          "id": "ad367daaaa8953d447a65bf7b708c0449c811cfb78c693944262d451755f367a",
          "driver": "bridge",
          "network_interface": "podman3",
          "created": "2026-09-22T04:31:21.804367729Z",
          "subnets": [
               {
                    "subnet": "10.89.2.0/24",
                    "gateway": "10.89.2.1"
               }
          ],
          "ipv6_enabled": false,
          "internal": false,
          "dns_enabled": true,
          "ipam_options": {
               "driver": "host-local"
          },
          "containers": {
               "4254d78c3497aa1367d7171f784850d597838d1398c9c6cac7dd7029a21b91f3": {
                    "name": "service-a",
                    "interfaces": {
                         "eth0": {
                              "subnets": [
                                   {
                                        "ipnet": "10.89.2.4/24",
                                        "gateway": "10.89.2.1"
                                   }
                              ],
                              "mac_address": "6e:86:65:d9:0f:39"
                         }
                    }
               },
               "fc0bfe1e3a945621eef6784677886aa72aedc4a46bd5bf5210fc300a82fd6c96": {
                    "name": "service-b",
                    "interfaces": {
                         "eth0": {
                              "subnets": [
                                   {
                                        "ipnet": "10.89.2.2/24",
                                        "gateway": "10.89.2.1"
                                   }
                              ],
                              "mac_address": "f6:1d:f5:11:96:bc"
                         }
                    }
               }
          }
     }
]
keerthana@Mac-36 podman-migration-poc % 

- Container restart does not break Podman's container networking or DNS resolution.                                           -->*important note*

-----------------------------------------------------------------------
## Scenario 2 — Network failure → recovery
-----------------------------------------------------------------------
keerthana@Mac-36 podman-migration-poc % podman exec service-a node -e "require('http').get('http://service-b:4000/health',r=>{let d='';r.on('data',x=>d+=x);r.on('end',()=>console.log('BEFORE FAILURE:',d))}).on('error',e=>console.log('BEFORE FAILURE ERROR:',e.message))"
BEFORE FAILURE: {"service":"service-b","status":"UP"}
keerthana@Mac-36 podman-migration-poc % podman network disconnect backend-net service-a
keerthana@Mac-36 podman-migration-poc % podman exec service-a node -e "require('http').get('http://service-b:4000/health',r=>{let d='';r.on('data',x=>d+=x);r.on('end',()=>console.log('AFTER FAILURE:',d))}).on('error',e=>console.log('AFTER FAILURE ERROR:',e.message))"
AFTER FAILURE ERROR: getaddrinfo EAI_AGAIN service-b
keerthana@Mac-36 podman-migration-poc % podman network connect backend-net service-a
keerthana@Mac-36 podman-migration-poc % podman exec service-a node -e "require('http').get('http://service-b:4000/health',r=>{let d='';r.on('data',x=>d+=x);r.on('end',()=>console.log('AFTER RECOVERY:',d))}).on('error',e=>console.log('AFTER RECOVERY ERROR:',e.message))"
AFTER RECOVERY: {"service":"service-b","status":"UP"}
keerthana@Mac-36 podman-migration-poc % podman network inspect backend-net
[
     {
          "name": "backend-net",
          "id": "ad367daaaa8953d447a65bf7b708c0449c811cfb78c693944262d451755f367a",
          "driver": "bridge",
          "network_interface": "podman3",
          "created": "2026-09-22T04:31:21.804367729Z",
          "subnets": [
               {
                    "subnet": "10.89.2.0/24",
                    "gateway": "10.89.2.1"
               }
          ],
          "ipv6_enabled": false,
          "internal": false,
          "dns_enabled": true,
          "ipam_options": {
               "driver": "host-local"
          },
          "containers": {
               "4254d78c3497aa1367d7171f784850d597838d1398c9c6cac7dd7029a21b91f3": {
                    "name": "service-a",
                    "interfaces": {
                         "eth0": {
                              "subnets": [
                                   {
                                        "ipnet": "10.89.2.5/24",
                                        "gateway": "10.89.2.1"
                                   }
                              ],
                              "mac_address": "56:e1:c6:a5:ef:55"
                         }
                    }
               },
               "fc0bfe1e3a945621eef6784677886aa72aedc4a46bd5bf5210fc300a82fd6c96": {
                    "name": "service-b",
                    "interfaces": {
                         "eth0": {
                              "subnets": [
                                   {
                                        "ipnet": "10.89.2.2/24",
                                        "gateway": "10.89.2.1"
                                   }
                              ],
                              "mac_address": "f6:1d:f5:11:96:bc"
                         }
                    }
               }
          }
     }
]
keerthana@Mac-36 podman-migration-poc % 

* The important part is:
------------------------
BEFORE FAILURE: {"service":"service-b","status":"UP"}

        ↓ disconnect

AFTER FAILURE ERROR: getaddrinfo EAI_AGAIN service-b

        ↓ reconnect

AFTER RECOVERY: {"service":"service-b","status":"UP"}

Also notice that after reconnecting, service-a received a new IP:
-----------------------------------------------------------------
Before: 10.89.2.4
After:  10.89.2.5

Yet communication recovered using service-b DNS, so the application wasn't dependent on a fixed container IP.             -->*important note*

------------------------------------------------------------------
### networking check — host → container published port
------------------------------------------------------------------
keerthana@Mac-36 podman-migration-poc % curl http://localhost:4000/health
\{"service":"service-b","status":"UP"}%   

* The important part is:
-p 4000:4000

This explicitly publishes:
      Mac localhost:4000
              ↓
      Podman VM
              ↓
      service-b:4000



# two different Podman networks + multi-network container communication:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman network create network-a
podman network create network-b
network-a
network-b
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman run -d \
  --name service-b \
  --network network-b \
  alpine \
  sh -c 'mkdir -p /www && echo "{\"service\":\"service-b\",\"status\":\"UP\"}" > /www/health && busybox httpd -f -p 4000 -h /www'
4eb536db3846228e53dd6ef260e5a114c8ea5ea0ac4e2996a6ca3f017f4ce74f
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman ps
CONTAINER ID  IMAGE                              COMMAND     CREATED      STATUS      PORTS                   NAMES
8fe96bed1006  localhost/cube-root-ms:podman-poc  npm start   5 hours ago  Up 4 hours  0.0.0.0:3001->3001/tcp  cube-root-ms-podman
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman run -d \
  --name service-a \
  --network network-a \
  alpine \
  sleep 3600
9f8e8784e84a771f2333ca11af0c3da8b31833c1971bec0730cb4e41c4793ad0
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman exec service-a wget -qO- http://service-b:4000/health
wget: bad address 'service-b:4000'
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

*Why*?
service-a is on network-a, while service-b is only on network-b. They are isolated.

* After connect service-a to the second network - *podman network connect network-b service-a*
* Test again — should PASS:
podman exec service-a wget -qO- http://service-b:4000/health
Expected:
{"service":"service-b","status":"UP"}
* Verify the actual network attachments
podman inspect service-a --format '{{json .NetworkSettings.Networks}}'
- You should see both network-a and network-b.

**So the test is**:
one container → two networks → communicate with services on each network.

**To list the one service two network command log**:
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman network ls
NETWORK ID    NAME              DRIVER
9012e5c7f4f0  microservice-net  bridge
8c7dac9deaed  network-a         bridge
b6d89539d39c  network-b         bridge
2f259bab93aa  podman            bridge
dbc8f61d183e  podman-logging    bridge
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman inspect service-a --format '{{range $name, $network := .NetworkSettings.Networks}}{{$name}}{{"\n"}}{{end}}'
network-a
network-b
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman inspect service-a | grep -A 10 '"Networks"'
               "Networks": {
                    "network-a": {
                         "EndpointID": "",
                         "Gateway": "10.89.2.1",
                         "IPAddress": "10.89.2.2",
                         "IPPrefixLen": 24,
                         "IPv6Gateway": "",
                         "GlobalIPv6Address": "",
                         "GlobalIPv6PrefixLen": 0,
                         "MacAddress": "8a:df:11:bb:f4:d0",
                         "NetworkID": "8c7dac9deaeda2d977456c4e6f5b9040ff7a6b810c0987e9e8e04e11190268ce",
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman inspect service-a --format '{{.Name}} → {{range $name, $network := .NetworkSettings.Networks}}{{$name}} {{end}}'
podman inspect service-b --format '{{.Name}} → {{range $name, $network := .NetworkSettings.Networks}}{{$name}} {{end}}'
service-a → network-a network-b 
service-b → network-b 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

* Very simple distinction
                 Podman
                   │
        ┌──────────┴──────────┐
        │                     │
    Networking             Runtime
        │                     │
     bridge                  crun
        │                     │
 service-a                runs process
 service-b

keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman inspect service-a --format '{{.HostConfig.NetworkMode}}'
bridge
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman info --format '{{.Host.OCIRuntime}}'
{crun crun-1.29.1-1.fc44.aarch64 /usr/bin/crun crun version 1.29.1
commit: f0d911de5587342cfeb16473bf32ecdfeaf25957
rundir: /run/user/501/crun
spec: 1.0.0
+SYSTEMD +SELINUX +APPARMOR +CAP +SECCOMP +EBPF +CRIU +LIBKRUN +WASM:wasmedge +JSON_C}
keerthana@Keerthanas-MacBook-Air podman-migration-poc % 

* So:
------
bridge → handles container networking
crun → creates/runs the container
slirp4netns/pasta → can provide networking for rootless containers in configurations where they are selected

* 
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman info --format '{{.Host.NetworkBackend}}'
netavark
keerthana@Keerthanas-MacBook-Air podman-migration-poc % podman info --debug | grep -iE 'pasta|slirp|netavark|networkBackend'
  networkBackend: netavark
  networkBackendInfo:
    backend: netavark
    package: netavark-2.1.0-1.fc44.aarch64
    path: /usr/libexec/podman/netavark
    version: netavark 2.1.0
  pasta:
    executable: /usr/bin/pasta
      pasta 0^20260728.gf8df3f1-2.fc44.aarch64-pasta
  rootlessNetworkCmd: pasta

* So:
-----
Network backend: Netavark
Rootless network command: Pasta
slirp4netns: not being used
Container runtime: crun

* Your stack is:

                 Podman
                   │
        ┌──────────┴──────────┐
        │                     │
    Networking             Runtime
        │                     │
    Netavark                 crun
        │
   ┌────┴─────┐
   │          │
 bridge      pasta (Podman Advanced Slirp‑less Tunneling Adapter)
 networks    (rootless networking)

# Static IP:
keerthana@Mac-89 podman-migration-poc % cd /Applications/podman-poc/podman-migration-poc
keerthana@Mac-89 podman-migration-poc % podman network create \
  --subnet 10.89.10.0/24 \
  --gateway 10.89.10.1 \
  static-ip-test
static-ip-test
keerthana@Mac-89 podman-migration-poc % podman network inspect static-ip-test
[
     {
          "name": "static-ip-test",
          "id": "dc6ccf8b16c3f7710e66a8302fd7998730eb76acaa99b3c6158a78d453fbaafb",
          "driver": "bridge",
          "network_interface": "podman6",
          "created": "2026-09-23T11:16:03.838521962Z",
          "subnets": [
               {
                    "subnet": "10.89.10.0/24",
                    "gateway": "10.89.10.1"
               }
          ],
          "ipv6_enabled": false,
          "internal": false,
          "dns_enabled": true,
          "ipam_options": {
               "driver": "host-local"
          },
          "containers": {}
     }
]
keerthana@Mac-89 podman-migration-poc % podman run -d \
  --name static-ip-test \
  --network static-ip-test \
  --ip 10.89.10.10 \
  localhost/cube-root-ms:podman-poc
153519095c2845882d8d5b111c0242729a8e87a87a54feb70fe64120072921c5
keerthana@Mac-89 podman-migration-poc % podman inspect static-ip-test \
  --format '{{.NetworkSettings.Networks.static-ip-test.IPAddress}}'
Error: template: inspect:1: bad character U+002D '-'
keerthana@Mac-89 podman-migration-poc % podman inspect static-ip-test \
  --format '{{index .NetworkSettings.Networks "static-ip-test" | .IPAddress}}'
Error: template: inspect:1:64: executing "inspect" at <.IPAddress>: can't evaluate field IPAddress in type interface {}
keerthana@Mac-89 podman-migration-poc % podman inspect static-ip-test \
  --format '{{(index .NetworkSettings.Networks "static-ip-test").IPAddress}}'
10.89.10.10
keerthana@Mac-89 podman-migration-poc % podman restart static-ip-test
static-ip-test
keerthana@Mac-89 podman-migration-poc % podman inspect static-ip-test \
  --format '{{(index .NetworkSettings.Networks "static-ip-test").IPAddress}}'
10.89.10.10
keerthana@Mac-89 podman-migration-poc % podman rm -f static-ip-test
static-ip-test
keerthana@Mac-89 podman-migration-poc % podman run -d \
  --name static-ip-test \
  --network static-ip-test \
  --ip 10.89.10.10 \
  localhost/cube-root-ms:podman-poc
a6f1a5cff541f0c77063a97b74ac29d458549945419067394d8331b9ed34aaec
keerthana@Mac-89 podman-migration-poc % podman inspect static-ip-test \
  --format '{{(index .NetworkSettings.Networks "static-ip-test").IPAddress}}'
10.89.10.10
keerthana@Mac-89 podman-migration-poc % 

* If all three checks work:
| Test                  | Result we want              |
| --------------------- | --------------------------- |
| Static IP assignment  | `10.89.10.10`               |
| Restart               | Still `10.89.10.10`         |
| Recreate with same IP | Can get `10.89.10.10` again |

* This proves Podman can support Docker Compose-style static IP requirements when explicitly configured.
