# Storage Terminal Logs:

keerthana@Mac-47 podman-migration-poc % podman pod ps
POD ID        NAME                    STATUS      CREATED      INFRA ID      # OF CONTAINERS
0625b91c0000  mern-microservices-pod  Exited      10 days ago  c3cc372c14a2  5
f31df1fb1106  podman-demo-pod         Exited      11 days ago  b49ea2614a7c  3
keerthana@Mac-47 podman-migration-poc % podman pod rm podman-demo-pod
f31df1fb1106339facb1a4505dd9f3a9e704c2c019f39e93f2cdb2b5723f1234
keerthana@Mac-47 podman-migration-poc % podman pod rm mern-microservices-pod
0625b91c00009a1fa597926d014d3382ec2ebbb2faab4ce7ccf1bbc19c10feff
keerthana@Mac-47 podman-migration-poc % podman system df
TYPE           TOTAL       ACTIVE      SIZE        RECLAIMABLE
Images         148         7           3.743GB     2.71GB (72%)
Containers     7           4           149.3kB     47.88kB (32%)
Local Volumes  14          2           1.508GB     1.37GB (91%)
keerthana@Mac-47 podman-migration-poc % podman run --rm alpine:3.20 sh -c '
echo "Starting storage test";
df -h /;
dd if=/dev/zero of=/tmp/storage-test bs=1M count=100;
echo "After writing:";
df -h /;
'
Starting storage test
Filesystem                Size      Used Available Use% Mounted on
overlay                  99.4G      8.9G     90.6G   9% /
100+0 records in
100+0 records out
104857600 bytes (100.0MB) copied, 0.032602 seconds, 3.0GB/s
After writing:
Filesystem                Size      Used Available Use% Mounted on
overlay                  99.4G      9.0G     90.5G   9% /
keerthana@Mac-47 podman-migration-poc % podman run --rm \
  --tmpfs /data:rw,size=20m \
  alpine:3.20 \
  sh -c '
echo "=== BEFORE ==="
df -h /data
echo "=== WRITING 30MB ==="
dd if=/dev/zero of=/data/testfile bs=1M count=30
echo "=== AFTER ==="
df -h /data
'
=== BEFORE ===
Filesystem                Size      Used Available Use% Mounted on
tmpfs                    20.0M         0     20.0M   0% /data
=== WRITING 30MB ===
dd: error writing '/data/testfile': No space left on device
21+0 records in
20+0 records out
20971520 bytes (20.0MB) copied, 0.006269 seconds, 3.1GB/s
=== AFTER ===
Filesystem                Size      Used Available Use% Mounted on
tmpfs                    20.0M     20.0M         0 100% /data