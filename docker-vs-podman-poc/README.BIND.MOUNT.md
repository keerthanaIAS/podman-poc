# What is a bind mount?

*Can Docker and Podman take a folder from your Mac and use it as storage inside the container?*
This is called a bind mount.

* We created this folder on your Mac:

/Users/keerthana/docker-vs-podman-storage

* Then we told Docker:

Mac folder
    ↓
container /data

and Podman:

Mac folder
    ↓
container /data

- Inside each container, we created a 100 MB file.

* Docker created:
docker-test-data   100M

* Podman created:
podman-test-data   100M

* And when we checked the Mac folder:
ls -lh ~/docker-vs-podman-storage

- we saw both files.

That proves:
✅ Docker can mount the Mac folder into the container.
✅ Podman can mount the Mac folder into the container.
✅ Data written by the container appears on the Mac.

* We also measured write speed

Docker:
100 MB → 0.169 sec → 589 MB/s

Podman:
100 MB → 0.158 sec → 631 MB/s

- They are very close.

* So we found:
No important Docker-vs-Podman storage performance difference in this test.

**Final finding**:
Bind mount test = PASS for both Docker and Podman.
|                      | Docker   | Podman   |
| -------------------- | -------- | -------- |
| Host folder mounted  | ✅        | ✅        |
| Container can write  | ✅        | ✅        |
| 100 MB written       | ✅        | ✅        |
| File remains on host | ✅        | ✅        |
| Performance          | 589 MB/s | 631 MB/s |
| Migration blocker?   | No       | **No**   |


# Terminal logs:
keerthana@Mac-89 docker-vs-podman-poc % mkdir -p ~/docker-vs-podman-storage
rm -f ~/docker-vs-podman-storage/docker-test-data
rm -f ~/docker-vs-podman-storage/podman-test-data
keerthana@Mac-89 docker-vs-podman-poc % ls -ld ~/docker-vs-podman-storage
drwxr-xr-x@ 2 keerthana  staff  64 Sep 23 15:15 /Users/keerthana/docker-vs-podman-storage
keerthana@Mac-89 docker-vs-podman-poc % docker run --rm \
  -v "$HOME/docker-vs-podman-storage:/data" \
  docker-vs-podman:docker \
  sh -c 'START=$(date +%s%N); dd if=/dev/zero of=/data/docker-test-data bs=1M count=100 2>&1; END=$(date +%s%N); echo "Docker bind-mount write: $(( (END-START)/1000000 )) ms"'
100+0 records in
100+0 records out
104857600 bytes (100.0MB) copied, 0.169770 seconds, 589.0MB/s
Docker bind-mount write: 0 ms
keerthana@Mac-89 docker-vs-podman-poc % podman run --rm \
  -v "$HOME/docker-vs-podman-storage:/data" \
  localhost/docker-vs-podman:podman \
  sh -c 'START=$(date +%s%N); dd if=/dev/zero of=/data/podman-test-data bs=1M count=100 2>&1; END=$(date +%s%N); echo "Podman bind-mount write: $(( (END-START)/1000000 )) ms"'
100+0 records in
100+0 records out
104857600 bytes (100.0MB) copied, 0.158468 seconds, 631.0MB/s
Podman bind-mount write: 0 ms
keerthana@Mac-89 docker-vs-podman-poc % ls -lh ~/docker-vs-podman-storage
total 409600
-rw-r--r--  1 keerthana  staff   100M Sep 23 15:15 docker-test-data
-rw-r--r--  1 keerthana  staff   100M Sep 23 15:15 podman-test-data
keerthana@Mac-89 docker-vs-podman-poc % 
