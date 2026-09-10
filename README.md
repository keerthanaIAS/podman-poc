* Main Point: wihtout docker application run we can build the podmod container but docker need to run docker daemon(app have to run).
Example error: exit status 1: Cannot connect to the Docker daemon at unix:///Users/keerthana/.docker/run/docker.sock. Is the docker daemon running?
This is called rootless.

* Second Point: It generates Kubernetes YAML from your Podman Pod. podman generate kube podman-demo-pod > podman-pod.yaml.

* Third Point: Registry push/pull

# Think of it like this:

| Tool           | Main purpose                             |
| -------------- | ---------------------------------------- |
| **Docker**     | Build and run containers                 |
| **Podman**     | Build and run containers                 |
| **Kubernetes** | Manage many containers/pods across nodes |

## Simple relationship:

        Docker / Podman
              ↓
        Run containers
              ↓
        Kubernetes
              ↓
        Manage containers as Pods
        across multiple nodes

### Podman can:
1. Build images
2. Run containers
3. Manage containers
4. Manage pods locally
5. Generate Kubernetes YAML from Podman workloads
6. Run some Kubernetes YAML locally using Podman

#### Podman vs Docker:
    Both are used to build and run containers.

|                | **Docker**                  | **Podman**                            |
| -------------- | --------------------------- | ------------------------------------- |
| Main job       | Run containers              | Run containers                        |
| Architecture   | Uses Docker daemon          | **Daemonless**                        |
| Rootless       | Supported                   | **Strong focus on rootless**          |
| Commands       | `docker run`                | `podman run`                          |
| Images         | OCI/Docker compatible       | OCI/Docker compatible                 |
| Kubernetes     | Works with Kubernetes       | Works with Kubernetes                 |
| Pod support    | Added later                 | **Built-in concept**                  |
| Docker Compose | Yes                         | Podman Compose / compatible options   |
| Common usage   | Very popular in development | Popular in Linux/Red Hat environments |

**The biggest difference**:
1. Docker:
        docker CLI
            ↓
        Docker daemon
            ↓
        container

2. Podman:
        podman CLI
            ↓
        container
- Podman doesn't require a long-running central daemon to manage containers.

##### we can use podman build image like docker after that we can use docker deploy/ swam or kubernetes?

- Yes. Exactly.
- You can use Podman to build a container image, and that image can then be used by other container/orchestration tools.
            Podman
              ↓
            Build image
              ↓
            myapp:1.0
              ↓
            Push to registry
              ↓
            ┌───────────────┬────────────────┐
            │ Docker Swarm  │ Kubernetes     │
            │               │                │
            │ pulls image   │ pulls image    │
            │ runs it       │ runs it        │
            └───────────────┴────────────────┘

**For example**:
1. Build with Podman
podman build -t myapp:1.0 .

2. Push the image to a registry
For example:
podman tag myapp:1.0 yourusername/myapp:1.0
podman push yourusername/myapp:1.0

3. Use the same image in Kubernetes
containers:
  - name: myapp
    image: yourusername/myapp:1.0
Then:
kubectl apply -f deployment.yaml
Or use it in Docker Swarm
docker service create \
  --name myapp \
  yourusername/myapp:1.0

# POC 1. Podman → build image → run container:

1. Check Podman:
- podman --version
- podman info

2. Create our POC:
- mkdir podman-poc
- cd podman-poc
- Create app.js
- Create Dockerfile - *Important: Podman can use the same Dockerfile format you already know from Docker. You don't need a special "Podmanfile."*

3. Build the image:
- podman build -t podman-demo:1.0 .
- podman images

4. Run it:
- podman run -d --name podman-demo-container -p 3000:3000 podman-demo:1.0
- podman ps
- open: http://localhost:3000
- You should see:
- Hello from Podman!

**What you just learned**:
        Dockerfile
           ↓
        podman build
           ↓
        Image: podman-demo:1.0
           ↓
        podman run
           ↓
        Container
           ↓
        Application

**Terminal Log**:
keerthana@Keerthanas-MacBook-Air podman-poc % podman build -t podman-demo:1.0 .
STEP 1/5: FROM node:22-alpine
Resolved "node" as an alias (/usr/share/containers/registries.conf.d/000-shortnames.conf)
Trying to pull docker.io/library/node:22-alpine...
Getting image source signatures
Copying blob sha256:5e275a5205a078c58e96d07db2891244cea6f217eb335edba0807ddf3661b59e
Copying blob sha256:5de55e5ef9c033997441461efe7ba23a986db059c0bb78b38f84ee0d72b99167
Copying blob sha256:b05773cc67e1fae38d08591539fcbce6de089281d25fb69a383adc38773c3b6c
Copying blob sha256:2b8c8ae4a685bc76bf1ef092a36b1864b9faa9530a8b5e4af7d45d57ad3eda75
Copying config sha256:828963118f6838ebdaf6b01b9b24d10c5dffe2f4aaf3ebca33d0d3f74366833e
Writing manifest to image destination
STEP 2/5: WORKDIR /app
--> bd1bea053308
STEP 3/5: COPY app.js .
--> 8019308166ea
STEP 4/5: EXPOSE 3000
--> dd30eb119cce
STEP 5/5: CMD ["node", "app.js"]
COMMIT podman-demo:1.0
--> 31c22266de42
Successfully tagged localhost/podman-demo:1.0
31c22266de420445d9a7c1dd7f1069dabdaa11a07095eaa3535ae82a765799b4
keerthana@Keerthanas-MacBook-Air podman-poc % podman images
REPOSITORY              TAG         IMAGE ID      CREATED        SIZE
localhost/podman-demo   1.0         31c22266de42  8 seconds ago  163 MB
docker.io/library/node  22-alpine   828963118f68  6 weeks ago    163 MB
keerthana@Keerthanas-MacBook-Air podman-poc % podman run -d --name podman-demo-container -p 3000:3000 podman-demo:1.0
a481e7f4b95312d65dcdaddbbdcf79b649e1d7b5d9129ab3ffccb224601c8c09
keerthana@Keerthanas-MacBook-Air podman-poc % podman ps
CONTAINER ID  IMAGE                      COMMAND      CREATED        STATUS        PORTS                   NAMES
a481e7f4b953  localhost/podman-demo:1.0  node app.js  4 seconds ago  Up 4 seconds  0.0.0.0:3000->3000/tcp  podman-demo-container
keerthana@Keerthanas-MacBook-Air podman-poc % 

## 2. Podman Compose with multiple containers:

* Node.js + MongoDB
---------------------
- This will teach you why Compose exists.

- Without Compose, you'd manually run:
        Node container
        MongoDB container

- With Compose, we define both in one YAML file and start them together.

1. Stop the current container:
- podman stop podman-demo-container
- podman rm podman-demo-container

2. Create compose.yaml:
- compose.yaml

3. Check whether Compose is available:
- podman compose version
- podman compose up -d

**What this YAML means**:
compose.yaml
     │
     ├── app
     │    └── Node.js container
     │
     └── mongodb
          └── MongoDB container

* depends_on:
  - mongodb

means:
Start the MongoDB service as a dependency of the app service.

* One important correction to your mental model                                                                           -->*important notes*                                                                                          
*Compose is not an orchestrator like Kubernetes. It's primarily a convenient way to define and run a group of related containers, typically on one machine.*

- podman compose ps
- podman ps

**Terminal Logs**:
keerthana@Keerthanas-MacBook-Air podman-poc % podman stop podman-demo-container
podman-demo-container
keerthana@Keerthanas-MacBook-Air podman-poc % podman rm podman-demo-container
podman-demo-container
keerthana@Keerthanas-MacBook-Air podman-poc % podman compose version
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

Docker Compose version v2.39.1-desktop.1
keerthana@Keerthanas-MacBook-Air podman-poc % podman compose up -d
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

[+] Running 10/10
 ✔ mongodb Pulled                                                                                                         16.1s 
   ✔ 8f403d14f259 Download complete                                                                                        0.4s 
   ✔ cb1fdcd5213f Download complete                                                                                        0.7s 
   ✔ 9b8ad59537cf Download complete                                                                                        0.8s 
   ✔ ae311fb0b285 Download complete                                                                                        0.8s 
   ✔ cc23361d1878 Download complete                                                                                        0.9s 
   ✔ 9332cde1e070 Download complete                                                                                        3.3s 
   ✔ 9952e002d570 Download complete                                                                                       10.0s 
   ✔ 49946cbc5ba8 Download complete                                                                                        0.3s 
   ✔ 68e148b0614f Download complete                                                                                        0.0s 
WARN[0016] Docker Compose is configured to build using Bake, but buildkit isn't enabled 
[+] Running 0/1
[+] Running 0/1 Building                                                                                                   0.2s 
 ⠸ Service app  Building                                                                                                   0.3s 
STEP 1/6: FROM node:22-alpine
STEP 2/6: WORKDIR /app
[+] Running 0/18
 ⠧ Service app  Building                                                                                                   0.7s 
--> 50b00d9a3e19
STEP 4/6: EXPOSE 3000
[+] Running 0/13
 ⠇ Service app  Building                                                                                                   0.8s 
--> ce904852c75a
STEP 6/6: LABEL "com.docker.compose.image.builder"="classic"
COMMIT docker.io/library/podman-poc-app
--> c78d02c509c2
[+] Running 0/1gged docker.io/library/podman-poc-app:latest
 ⠋ Service app  Building                                                                                                   1.0s 
[+] Running 5/5ilt c78d02c509c2
 ✔ Service app                 Built                                                                                       1.0s 
 ✔ app                         Built                                                                                       0.0s 
 ✔ Network podman-poc_default  Created                                                                                     0.0s 
 ✔ Container podman-mongodb    Started                                                                                     0.2s 
 ✔ Container podman-app        Started                                                                                     0.2s 
keerthana@Keerthanas-MacBook-Air podman-poc % podman compose ps
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

NAME             IMAGE                                     COMMAND         SERVICE   CREATED          STATUS          PORTS
podman-app       docker.io/library/podman-poc-app:latest   "node app.js"   app       17 seconds ago   Up 16 seconds   0.0.0.0:3000->3000/tcp
podman-mongodb   docker.io/library/mongo:8                 "mongod"        mongodb   17 seconds ago   Up 16 seconds   0.0.0.0:27017->27017/tcp
keerthana@Keerthanas-MacBook-Air podman-poc % podman ps
CONTAINER ID  IMAGE                                    COMMAND      CREATED         STATUS         PORTS                     NAMES
13d6bfefeaf8  docker.io/library/mongo:8                mongod       20 seconds ago  Up 21 seconds  0.0.0.0:27017->27017/tcp  podman-mongodb
7f406bd7cb53  docker.io/library/podman-poc-app:latest  node app.js  20 seconds ago  Up 20 seconds  0.0.0.0:3000->3000/tcp    podman-app
keerthana@Keerthanas-MacBook-Air podman-poc % 

- Our Node.js application doesn't actually connect to MongoDB yet.
- So right now we have:
┌─────────────────┐
│ Node.js         │
│ container       │
└────────┬────────┘
         │
         │ depends_on
         ↓
┌─────────────────┐
│ MongoDB         │
│ container       │
└─────────────────┘

4. make Node.js talk to MongoDB through the Compose network:
- Install MongoDB driver:
    npm init -y
    npm install mongodb
- Change app.js
- Important part:
    Look at this:
    mongodb://mongodb:27017

    Why mongodb?
    Because in compose.yaml we named the service:
    services:
      app:
        ...
      mongodb:
        image: mongo:8
    * Compose gives the containers a network where the service name becomes the hostname.

    So:
    Node container
        │
        │ mongodb:27017
        ↓
    MongoDB container
    You do NOT use localhost:27017 from inside the Node container.

    localhost would mean:
    "this Node container itself"
    * That's a very important container networking concept.

- Rebuild and restart:
Because we changed app.js:
    podman compose down
    podman compose up -d --build
    podman compose ps
    podman logs podman-app
        * You should see:
        Connected to MongoDB
        Server running on port 3000

        * Then open:
        http://localhost:3000
        You should get JSON containing the message stored in MongoDB.

- This is the real Compose POC: two containers, one Compose file, and container-to-container communication through the Compose network.

**Terminal Log**:
keerthana@Keerthanas-MacBook-Air podman-poc % npm init -y
Wrote to /Applications/podman-poc/podman-poc/package.json:

{
  "name": "podman-poc",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs"
}


keerthana@Keerthanas-MacBook-Air podman-poc % npm install mongodb

added 12 packages, and audited 13 packages in 4s

found 0 vulnerabilities
keerthana@Keerthanas-MacBook-Air podman-poc % podman compose down
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

[+] Running 3/3
 ✔ Container podman-app        Removed                                                                                    10.1s 
 ✔ Container podman-mongodb    Removed                                                                                     0.1s 
 ✔ Network podman-poc_default  Removed                                                                                     0.0s 
keerthana@Keerthanas-MacBook-Air podman-poc % podman compose up -d --build
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

WARN[0000] Docker Compose is configured to build using Bake, but buildkit isn't enabled 
[+] Running 0/1
 ⠙ Service app  Building                                                                                                   1.2s 
Sending build context to Docker daemon  1.345MB
[+] Running 0/1node:22-alpine
 ⠹ Service app  Building                                                                                                   1.3s 
--> Using cache 81ecfdea58085e613bd8b07b58359f27c9e6cb8de04947a16cf46759601d5564
[+] Running 0/18
 ⠴ Service app  Building                                                                                                   1.6s 
[+] Running 0/10
 ⠦ Service app  Building                                                                                                   1.7s 
[+] Running 0/1a
 ⠧ Service app  Building                                                                                                   1.8s 
--> d61fac039930
STEP 6/6: LABEL "com.docker.compose.image.builder"="classic"
COMMIT docker.io/library/podman-poc-app:latest
--> f3f27ff04869
[+] Running 0/1gged docker.io/library/podman-poc-app:latest
 ⠇ Service app  Building                                                                                                   1.9s 
[+] Running 5/5ilt f3f27ff04869
 ✔ Service app                 Built                                                                                       1.9s 
 ✔ app                         Built                                                                                       0.0s 
 ✔ Network podman-poc_default  Created                                                                                     0.0s 
 ✔ Container podman-mongodb    Started                                                                                     0.2s 
 ✔ Container podman-app        Started                                                                                     0.2s 
keerthana@Keerthanas-MacBook-Air podman-poc % podman compose ps
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

NAME             IMAGE                       COMMAND    SERVICE   CREATED         STATUS         PORTS
podman-mongodb   docker.io/library/mongo:8   "mongod"   mongodb   4 seconds ago   Up 3 seconds   0.0.0.0:27017->27017/tcp
keerthana@Keerthanas-MacBook-Air podman-poc % podman logs podman-app
node:internal/modules/cjs/loader:1433
  throw err;
  ^

Error: Cannot find module 'mongodb'
Require stack:
- /app/app.js
    at Function._resolveFilename (node:internal/modules/cjs/loader:1430:15)
    at defaultResolveImpl (node:internal/modules/cjs/loader:1040:19)
    at resolveForCJSWithHooks (node:internal/modules/cjs/loader:1045:22)
    at Function._load (node:internal/modules/cjs/loader:1216:25)
    at wrapModuleLoad (node:internal/modules/cjs/loader:254:19)
    at Module.require (node:internal/modules/cjs/loader:1527:12)
    at require (node:internal/modules/helpers:147:16)
    at Object.<anonymous> (/app/app.js:12:25)
    at Module._compile (node:internal/modules/cjs/loader:1781:14)
    at Object..js (node:internal/modules/cjs/loader:1913:10) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [ '/app/app.js' ]
}

Node.js v22.23.2
keerthana@Keerthanas-MacBook-Air podman-poc % ls
Dockerfile              compose.yaml            package-lock.json
app.js                  node_modules            package.json
keerthana@Keerthanas-MacBook-Air podman-poc % podman compose down
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

[+] Running 3/3
 ✔ Container podman-app        Removed                                                                                     0.0s 
 ✔ Container podman-mongodb    Removed                                                                                     0.1s 
 ✔ Network podman-poc_default  Removed                                                                                     0.0s 
keerthana@Keerthanas-MacBook-Air podman-poc % podman compose up -d --build
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

WARN[0000] Docker Compose is configured to build using Bake, but buildkit isn't enabled 
[+] Running 0/1
 ⠋ Service app  Building                                                                                                   1.1s 
Sending build context to Docker daemon  1.345MB
[+] Running 0/1node:22-alpine
 ⠙ Service app  Building                                                                                                   1.2s 
--> Using cache 81ecfdea58085e613bd8b07b58359f27c9e6cb8de04947a16cf46759601d5564
[+] Running 0/18
 ⠴ Service app  Building                                                                                                   1.6s 
[+] Running 0/1e
 ⠧ Service app  Building                                                                                                   4.8s 

added 12 packages, and audited 13 packages in 3s

found 0 vulnerabilities
npm notice
npm notice New major version of npm available! 10.9.8 -> 12.0.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v12.0.2
[+] Running 0/1pdate run: npm install -g npm@12.0.2
 ⠋ Service app  Building                                                                                                   5.1s 
[+] Running 0/11
 ⠸ Service app  Building                                                                                                   5.4s 
[+] Running 0/13
 ⠼ Service app  Building                                                                                                   5.5s 
--> 27a5aabb253c
STEP 7/8: CMD ["node", "app.js"]
[+] Running 0/1e
 ⠴ Service app  Building                                                                                                   5.6s 
COMMIT docker.io/library/podman-poc-app:latest
--> ed48a334781d
[+] Running 0/1gged docker.io/library/podman-poc-app:latest
 ⠦ Service app  Building                                                                                                   5.7s 
[+] Running 5/5ilt ed48a334781d
 ✔ Service app                 Built                                                                                       5.8s 
 ✔ app                         Built                                                                                       0.0s 
 ✔ Network podman-poc_default  Created                                                                                     0.0s 
 ✔ Container podman-mongodb    Started                                                                                     0.2s 
 ✔ Container podman-app        Started                                                                                     0.2s 
keerthana@Keerthanas-MacBook-Air podman-poc % podman compose ps
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

NAME             IMAGE                                     COMMAND         SERVICE   CREATED         STATUS         PORTS
podman-app       docker.io/library/podman-poc-app:latest   "node app.js"   app       4 seconds ago   Up 4 seconds   0.0.0.0:3000->3000/tcp
podman-mongodb   docker.io/library/mongo:8                 "mongod"        mongodb   4 seconds ago   Up 4 seconds   0.0.0.0:27017->27017/tcp
keerthana@Keerthanas-MacBook-Air podman-poc % podman logs podman-app
Connected to MongoDB
Server running on port 3000
keerthana@Keerthanas-MacBook-Air podman-poc % 

- What you have now:
                 Compose
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
    podman-app           podman-mongodb
    Node.js               MongoDB
       │                     │
       └──── mongodb:27017 ──┘
             communication

- Notice the important point:
    mongodb://mongodb:27017
    mongodb is the Compose service name, not localhost.

### 3. Podman Pod:
* This is the logical next step before connecting Podman to Kubernetes.
- We'll learn:
        Podman Pod
           ├── Node.js container
           └── MongoDB container
- We'll specifically test:
        Create a Podman Pod
        Run multiple containers inside it
        Understand shared networking
        Inspect the Pod
        Stop/remove the Pod
        Podman Pod vs Kubernetes Pod

1. Stop Compose:
podman compose down
podman ps

2. Create a Podman Pod:
podman pod create --name podman-demo-pod -p 3000:3000 -p 27017:27017
podman pod ps
    You should see:
    podman-demo-pod

3. Run MongoDB inside the Pod:
podman run -d \
  --pod podman-demo-pod \
  --name podman-mongodb \
  mongo:8
podman pod ps
podman ps

4. Run Node.js inside the same Pod:
Use the image we already built: podman images
Find: podman-poc-app
Then:
podman run -d \
  --pod podman-demo-pod \
  --name podman-app \
  podman-poc-app:latest
podman pod ps
podman ps

5. Test:
Open: http://localhost:3000
You should get the MongoDB data again.

* The important thing we're proving:
    - we're manually creating one Pod and putting two containers inside it:
             Podman Pod
        podman-demo-pod
              │
       ┌──────┴──────┐
       ↓             ↓
  podman-app    podman-mongodb
   Node.js         MongoDB
       │             │
       └── shared ───┘
          network

**Terminal logs**:
keerthana@Keerthanas-MacBook-Air podman-poc % podman compose down
>>>> Executing external compose provider "/usr/local/bin/docker-compose". Please see podman-compose(1) for how to disable this message. <<<<

[+] Running 3/3
 ✔ Container podman-app        Removed                                                                                                 10.1s 
 ✔ Container podman-mongodb    Removed                                                                                                  0.1s 
 ✔ Network podman-poc_default  Removed                                                                                                  0.0s 
keerthana@Keerthanas-MacBook-Air podman-poc % podman ps
CONTAINER ID  IMAGE       COMMAND     CREATED     STATUS      PORTS       NAMES
keerthana@Keerthanas-MacBook-Air podman-poc % podman pod create --name podman-demo-pod -p 3000:3000 -p 27017:27017
f31df1fb1106339facb1a4505dd9f3a9e704c2c019f39e93f2cdb2b5723f1234
keerthana@Keerthanas-MacBook-Air podman-poc % podman pod ps
POD ID        NAME             STATUS      CREATED        INFRA ID      # OF CONTAINERS
f31df1fb1106  podman-demo-pod  Created     4 seconds ago  b49ea2614a7c  1
keerthana@Keerthanas-MacBook-Air podman-poc % podman run -d \
  --pod podman-demo-pod \
  --name podman-mongodb \
  mongo:8
f4609392f1bcac22bf3d47f7a7c0092028517d64b035e1ab465e59e67306f1f4
keerthana@Keerthanas-MacBook-Air podman-poc % podman pod ps
POD ID        NAME             STATUS      CREATED         INFRA ID      # OF CONTAINERS
f31df1fb1106  podman-demo-pod  Running     14 seconds ago  b49ea2614a7c  2
keerthana@Keerthanas-MacBook-Air podman-poc % podman ps
CONTAINER ID  IMAGE                      COMMAND     CREATED         STATUS        PORTS                                             NAMES
b49ea2614a7c                                         17 seconds ago  Up 8 seconds  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  f31df1fb1106-infra
f4609392f1bc  docker.io/library/mongo:8  mongod      8 seconds ago   Up 8 seconds  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  podman-mongodb
keerthana@Keerthanas-MacBook-Air podman-poc % podman images
REPOSITORY                        TAG         IMAGE ID      CREATED       SIZE
docker.io/library/podman-poc-app  latest      ed48a334781d  2 hours ago   174 MB
<none>                            <none>      f3f27ff04869  2 hours ago   163 MB
<none>                            <none>      c78d02c509c2  3 hours ago   163 MB
localhost/podman-demo             1.0         31c22266de42  3 hours ago   163 MB
docker.io/library/mongo           8           68e148b0614f  30 hours ago  833 MB
docker.io/library/node            22-alpine   828963118f68  6 weeks ago   163 MB
keerthana@Keerthanas-MacBook-Air podman-poc % podman run -d \
  --pod podman-demo-pod \
  --name podman-app \
  podman-poc-app:latest
926a08f0077999ade88e52a5d3af6ec74811bcdbeb9386b558291e304491dbb1
keerthana@Keerthanas-MacBook-Air podman-poc % podman pod ps
podman ps
POD ID        NAME             STATUS      CREATED             INFRA ID      # OF CONTAINERS
f31df1fb1106  podman-demo-pod  Running     About a minute ago  b49ea2614a7c  3
CONTAINER ID  IMAGE                                    COMMAND      CREATED             STATUS         PORTS                                             NAMES
b49ea2614a7c                                                        About a minute ago  Up 58 seconds  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  f31df1fb1106-infra
f4609392f1bc  docker.io/library/mongo:8                mongod       58 seconds ago      Up 58 seconds  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  podman-mongodb
926a08f00779  docker.io/library/podman-poc-app:latest  node app.js  5 seconds ago       Up 5 seconds   0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  podman-app
keerthana@Keerthanas-MacBook-Air podman-poc % 

* got localhost 3000 site not reachable so need to fix that.

* Fix app.js:
- Change:
const client = new MongoClient("mongodb://mongodb:27017");
- to:
const client = new MongoClient("mongodb://localhost:27017");

- Because now:
Pod
 ├── Node.js
 │     └── localhost:3000
 │
 └── MongoDB
       └── localhost:27017

- But there's another issue
    Your current Node container was created from the old image.
    So rebuild:
    podman build -t podman-poc-app:pod .

- Then remove only the Node container:
podman rm -f podman-app

- Start it again inside the existing Pod:
podman run -d \
  --pod podman-demo-pod \
  --name podman-app \
  podman-poc-app:pod

- Check:
podman logs podman-app

- You want:
Connected to MongoDB
Server running on port 3000

- Then:
http://localhost:3000
should work.

* Terminal Logs:
keerthana@Keerthanas-MacBook-Air podman-poc % podman build -t podman-poc-app:pod .
STEP 1/7: FROM node:22-alpine
STEP 2/7: WORKDIR /app
--> Using cache bd1bea053308e38d611bd0b09eea856346075060503c833ba144cb24450f3c41
--> bd1bea053308
STEP 3/7: COPY package*.json ./
--> bce8bcb2e91b
STEP 4/7: RUN npm install

added 12 packages, and audited 13 packages in 904ms

found 0 vulnerabilities
npm notice
npm notice New major version of npm available! 10.9.8 -> 12.0.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v12.0.2
npm notice To update run: npm install -g npm@12.0.2
npm notice
--> 2cc516168edc
STEP 5/7: COPY app.js .
--> d7dfb7806e54
STEP 6/7: EXPOSE 3000
--> 7e28f7605f00
STEP 7/7: CMD ["node", "app.js"]
COMMIT podman-poc-app:pod
--> 4087e6f4f7f2
Successfully tagged localhost/podman-poc-app:pod
4087e6f4f7f26bdf885a7a61507553a0405f642cebff73e0045f1af847650598
keerthana@Keerthanas-MacBook-Air podman-poc % podman rm -f podman-app
podman-app
keerthana@Keerthanas-MacBook-Air podman-poc % podman run -d \
  --pod podman-demo-pod \
  --name podman-app \
  podman-poc-app:pod
d8e2559e5602e7d85623885c6cdf10a5ed09fc746ebd1d91edf1e4546be09ced
keerthana@Keerthanas-MacBook-Air podman-poc % podman logs podman-app
Connected to MongoDB
Server running on port 3000
keerthana@Keerthanas-MacBook-Air podman-poc % 

**What did we actually do?**                                                                                                    
1. We created an empty Pod:
Think:
Podman Pod
└── empty

The -p here means:
Mac port 3000 → Pod port 3000
Mac port 27017 → Pod port 27017

2. We put MongoDB inside the Pod:
podman run -d \
  --pod podman-demo-pod \
  --name podman-mongodb \
  mongo:8

Now:
Podman Pod
└── MongoDB

MongoDB listens on:
27017

3. We put Node.js inside the SAME Pod:
podman run -d \
  --pod podman-demo-pod \
  --name podman-app \
  podman-poc-app:pod

Now:
Podman Pod
├── MongoDB
└── Node.js

4. Why did we change mongodb → localhost?
* In Compose:
Node container
      │
      │ mongodb:27017
      ↓
MongoDB container
- because Compose gives mongodb as a hostname.

* But inside a Podman Pod:
        SAME NETWORK
             │
    ┌────────┴────────┐
    ↓                 ↓
 Node.js            MongoDB
 :3000              :27017
- They share the Pod's network namespace.

* And how does localhost:3000 work?
    This part is port forwarding.
- You created the Pod with:
-p 3000:3000

- which means:
Your Mac
localhost:3000
      ↓
Pod port 3000
      ↓
Node.js container
      ↓
Node listens on 3000

- So when you open:
http://localhost:3000
the request reaches your Node application.

**So what have we learned?**                                                                                                        -->*important notes*

* Compose POC:
Multiple containers managed together by a Compose YAML file.
        Compose
         ├── Node
         └── MongoDB

* Podman Pod POC:
Multiple containers grouped inside one Podman Pod and sharing the Pod's network namespace.
        Pod
         ├── Node
         └── MongoDB

- this is why Podman Pods are useful for your Kubernetes learning:
        Podman Pod
           ↓
        Node + MongoDB
- is conceptually similar to:
        Kubernetes Pod
           ↓
        Container + Container

#### 4. Podman Volumes + MongoDB persistence:

1. Check current Pod:
podman pod ps
podman ps

2. Create a volume:
podman volume create mongo-data
podman volume ls

3. Stop and remove the current MongoDB container:
podman rm -f podman-mongodb
podman ps

* Terminal logs:
keerthana@Keerthanas-MacBook-Air podman-poc % podman pod ps
POD ID        NAME             STATUS      CREATED         INFRA ID      # OF CONTAINERS
f31df1fb1106  podman-demo-pod  Running     48 minutes ago  b49ea2614a7c  3
keerthana@Keerthanas-MacBook-Air podman-poc % podman ps
CONTAINER ID  IMAGE                         COMMAND      CREATED         STATUS         PORTS                                             NAMES
b49ea2614a7c                                             48 minutes ago  Up 48 minutes  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  f31df1fb1106-infra
f4609392f1bc  docker.io/library/mongo:8     mongod       48 minutes ago  Up 48 minutes  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  podman-mongodb
d8e2559e5602  localhost/podman-poc-app:pod  node app.js  35 minutes ago  Up 35 minutes  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  podman-app
keerthana@Keerthanas-MacBook-Air podman-poc % podman volume create mongo-data
mongo-data
keerthana@Keerthanas-MacBook-Air podman-poc % podman volume ls
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
keerthana@Keerthanas-MacBook-Air podman-poc % podman rm -f podman-mongodb
podman-mongodb
keerthana@Keerthanas-MacBook-Air podman-poc % podman ps
CONTAINER ID  IMAGE                         COMMAND      CREATED         STATUS         PORTS                                             NAMES
b49ea2614a7c                                             56 minutes ago  Up 55 minutes  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  f31df1fb1106-infra
d8e2559e5602  localhost/podman-poc-app:pod  node app.js  43 minutes ago  Up 43 minutes  0.0.0.0:3000->3000/tcp, 0.0.0.0:27017->27017/tcp  podman-app
keerthana@Keerthanas-MacBook-Air podman-poc % 

4. Start MongoDB with the volume:
Run:

podman run -d \
  --pod podman-demo-pod \
  --name podman-mongodb \
  -v mongo-data:/data/db \
  mongo:8
What this means
-v mongo-data:/data/db
       ↓          ↓
   Podman       MongoDB's
   volume      data directory

So MongoDB's actual database files will be stored in mongo-data, not only inside the container.
- Then check: podman ps
- podman logs podman-mongodb

5. Insert a test document:
podman exec podman-mongodb mongosh \
  --eval 'use podman_demo; db.messages.insertOne({message:"Volume test"})'
podman exec podman-mongodb mongosh \
  --eval 'use podman_demo; db.messages.find().toArray()'

6. Then delete MongoDB again:
podman rm -f podman-mongodb

7. And recreate it with the same volume:
podman run -d \
  --pod podman-demo-pod \
  --name podman-mongodb \
  -v mongo-data:/data/db \
  mongo:8

8. Finally:
podman exec podman-mongodb mongosh \
  --eval 'use podman_demo; db.messages.find().toArray()'
- If "Volume test" is still there → POC successful.

* Terminal Logs:
keerthana@Keerthanas-MacBook-Air podman-poc % podman exec podman-mongodb mongosh \
  --eval 'use podman_demo; db.messages.insertOne({message:"Volume test"})'
switched to db podman_demo;
keerthana@Keerthanas-MacBook-Air podman-poc % podman exec podman-mongodb mongosh \
  --eval 'use podman_demo; db.messages.find().toArray()'
switched to db podman_demo;
keerthana@Keerthanas-MacBook-Air podman-poc % podman rm -f podman-mongodb
podman-mongodb
keerthana@Keerthanas-MacBook-Air podman-poc % podman run -d \
  --pod podman-demo-pod \
  --name podman-mongodb \
  -v mongo-data:/data/db \
  mongo:8
f36b1d000f3aaa69aa62c22fc9762050d5be23aed195d87e84354e3ea9f5795d
keerthana@Keerthanas-MacBook-Air podman-poc % podman exec podman-mongodb mongosh \
  --eval 'use podman_demo; db.messages.find().toArray()'
switched to db podman_demo;
keerthana@Keerthanas-MacBook-Air podman-poc % podman exec podman-mongodb mongosh podman_demo \
  --eval 'db.messages.find().toArray()'
[]
keerthana@Keerthanas-MacBook-Air podman-poc % podman exec podman-mongodb mongosh podman_demo \
  --eval 'db.messages.insertOne({message:"Volume test"})'
{
  acknowledged: true,
  insertedId: ObjectId('6aa2850e8c0a98f679985e4c')
}
keerthana@Keerthanas-MacBook-Air podman-poc % podman exec podman-mongodb mongosh podman_demo \
  --eval 'db.messages.find().toArray()'
[
  { _id: ObjectId('6aa2850e8c0a98f679985e4c'), message: 'Volume test' }
]
keerthana@Keerthanas-MacBook-Air podman-poc % podman rm -f podman-mongodb
podman-mongodb
keerthana@Keerthanas-MacBook-Air podman-poc % podman run -d \
  --pod podman-demo-pod \
  --name podman-mongodb \
  -v mongo-data:/data/db \
  mongo:8
cf0aa34751bbd3d01ebcba40481ed0ca7988e879fadb7b36e067b734dcbd35e7
keerthana@Keerthanas-MacBook-Air podman-poc % podman exec podman-mongodb mongosh podman_demo \
  --eval 'db.messages.find().toArray()'
[
  { _id: ObjectId('6aa2850e8c0a98f679985e4c'), message: 'Volume test' }
]
keerthana@Keerthanas-MacBook-Air podman-poc % 

##### 5. Podmon registry push and pull:

* The important thing we are proving:
Podman
  ↓
Build image
  ↓
Push image
  ↓
Docker Hub
  ↓
Kubernetes pulls image
  ↓
Kubernetes Pod

* prove the clean Podman image → registry → Kubernetes flow with the Node app.

* Terminal Logs:
keerthana@Keerthanas-MacBook-Air podman-poc % minikube start
😄  minikube v1.38.1 on Darwin 26.4.1 (arm64)
🎉  minikube 1.39.0 is available! Download it: https://github.com/kubernetes/minikube/releases/tag/v1.39.0
💡  To disable this notice, run: 'minikube config set WantUpdateNotification false'

✨  Using the docker driver based on existing profile
👍  Starting "minikube" primary control-plane node in "minikube" cluster
🚜  Pulling base image v0.0.50 ...
🔄  Restarting existing docker container for "minikube" ...
🐳  Preparing Kubernetes v1.35.1 on Docker 29.2.1 ...
❗  [WARNING] For full functionality, the 'csi-hostpath-driver' addon requires the 'volumesnapshots' addon to be enabled.

You can enable 'volumesnapshots' addon by running: 'minikube addons enable volumesnapshots'

🔎  Verifying Kubernetes components...
    ▪ Using image registry.k8s.io/sig-storage/livenessprobe:v2.8.0
    ▪ Using image registry.k8s.io/sig-storage/csi-resizer:v1.6.0
    ▪ Using image registry.k8s.io/sig-storage/csi-snapshotter:v6.1.0
    ▪ Using image registry.k8s.io/sig-storage/csi-provisioner:v3.3.0
    ▪ Using image registry.k8s.io/sig-storage/csi-attacher:v4.0.0
    ▪ Using image registry.k8s.io/sig-storage/csi-external-health-monitor-controller:v0.7.0
    ▪ Using image registry.k8s.io/sig-storage/csi-node-driver-registrar:v2.6.0
    ▪ Using image registry.k8s.io/sig-storage/hostpathplugin:v1.9.0
🔎  Verifying csi-hostpath-driver addon...
🌟  Enabled addons: csi-hostpath-driver

👍  Starting "minikube-m02" worker node in "minikube" cluster
🚜  Pulling base image v0.0.50 ...
🤷  docker "minikube-m02" container is missing, will recreate.
🔥  Creating docker container (CPUs=2, Memory=3072MB) ...
🌐  Found network options:
    ▪ NO_PROXY=192.168.49.2
🐳  Preparing Kubernetes v1.35.1 on Docker 29.2.1 ...
    ▪ env NO_PROXY=192.168.49.2
🔎  Verifying Kubernetes components...

❗  /usr/local/bin/kubectl is version 1.32.2, which may have incompatibilities with Kubernetes 1.35.1.
    ▪ Want kubectl v1.35.1? Try 'minikube kubectl -- get pods -A'
🏄  Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl apply -f podman-k8s.yaml
deployment.apps/podman-app created
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl get pods
NAME                          READY   STATUS              RESTARTS        AGE
node-agent-588x7              1/1     Running             3 (7m49s ago)   3d5h
podman-app-74fd775c86-js5tq   0/1     ContainerCreating   0               4s
vpa-demo-5554dcb5c7-g2wbj     1/1     Running             2 (7m49s ago)   2d6h
vpa-demo-5554dcb5c7-pxxm5     1/1     Running             3 (7m49s ago)   3d1h
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl logs deployment/podman-app
Error from server (BadRequest): container "podman-app" in pod "podman-app-74fd775c86-js5tq" is waiting to start: ContainerCreating
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl logs deployment/podman-app
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl get pods
NAME                          READY   STATUS    RESTARTS        AGE
node-agent-588x7              1/1     Running   3 (8m35s ago)   3d5h
podman-app-74fd775c86-js5tq   1/1     Running   1 (10s ago)     50s
vpa-demo-5554dcb5c7-g2wbj     1/1     Running   2 (8m35s ago)   2d6h
vpa-demo-5554dcb5c7-pxxm5     1/1     Running   3 (8m35s ago)   3d1h
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl logs deployment/podman-app
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl logs deployment/podman-app
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl get pod podman-app-74fd775c86-js5tq -o wide
NAME                          READY   STATUS      RESTARTS      AGE    IP            NODE       NOMINATED NODE   READINESS GATES
podman-app-74fd775c86-js5tq   0/1     Completed   2 (56s ago)   2m6s   10.244.0.22   minikube   <none>           <none>
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl describe pod podman-app-74fd775c86-js5tq
Name:             podman-app-74fd775c86-js5tq
Namespace:        default
Priority:         0
Service Account:  default
Node:             minikube/192.168.49.2
Start Time:       Thu, 10 Sep 2026 16:52:35 +0530
Labels:           app=podman-app
                  pod-template-hash=74fd775c86
Annotations:      <none>
Status:           Running
IP:               10.244.0.22
IPs:
  IP:           10.244.0.22
Controlled By:  ReplicaSet/podman-app-74fd775c86
Containers:
  podman-app:
    Container ID:   docker://e7c7ed02ea2be646bfd578375479934cf7f1c7f80562c75cdaf4ee33c4643eae
    Image:          keerthanalp/podman-poc-app:1.0
    Image ID:       docker-pullable://keerthanalp/podman-poc-app@sha256:2daf06190bca752056e8eaf093db9ed6339f0021a3bb94fa013f8258f1177835
    Port:           3000/TCP
    Host Port:      0/TCP
    State:          Terminated
      Reason:       Completed
      Exit Code:    0
      Started:      Thu, 10 Sep 2026 16:54:00 +0530
      Finished:     Thu, 10 Sep 2026 16:54:30 +0530
    Last State:     Terminated
      Reason:       Completed
      Exit Code:    0
      Started:      Thu, 10 Sep 2026 16:53:15 +0530
      Finished:     Thu, 10 Sep 2026 16:53:45 +0530
    Ready:          False
    Restart Count:  2
    Environment:    <none>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-5jk4q (ro)
Conditions:
  Type                        Status
  PodReadyToStartContainers   True 
  Initialized                 True 
  Ready                       False 
  ContainersReady             False 
  PodScheduled                True 
Volumes:
  kube-api-access-5jk4q:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason     Age                 From               Message
  ----     ------     ----                ----               -------
  Normal   Scheduled  2m12s               default-scheduler  Successfully assigned default/podman-app-74fd775c86-js5tq to minikube
  Normal   Pulling    2m12s               kubelet            Pulling image "keerthanalp/podman-poc-app:1.0"
  Normal   Pulled     2m3s                kubelet            Successfully pulled image "keerthanalp/podman-poc-app:1.0" in 8.791s (8.791s including waiting). Image size: 170427036 bytes.
  Normal   Created    47s (x3 over 2m3s)  kubelet            Container created
  Normal   Started    47s (x3 over 2m3s)  kubelet            Container started
  Normal   Pulled     47s (x2 over 92s)   kubelet            Container image "keerthanalp/podman-poc-app:1.0" already present on machine and can be accessed by the pod
  Warning  BackOff    16s (x2 over 61s)   kubelet            Back-off restarting failed container podman-app in pod podman-app-74fd775c86-js5tq_default(ac81452f-e410-4df2-ae0c-a89d1c8e4b84)
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl get pod podman-app-74fd775c86-js5tq -o jsonpath='{.spec.containers[0].command}{" "}{.spec.containers[0].args}{"\n"}'
 
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl logs podman-app-74fd775c86-js5tq --previous
MongoServerSelectionError: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
    at Topology.selectServer (/app/node_modules/mongodb/lib/sdam/topology.js:348:38)
    at async Topology._connect (/app/node_modules/mongodb/lib/sdam/topology.js:220:28)
    at async Topology.connect (/app/node_modules/mongodb/lib/sdam/topology.js:171:13)
    at async topologyConnect (/app/node_modules/mongodb/lib/mongo_client.js:257:17)
    at async MongoClient._connect (/app/node_modules/mongodb/lib/mongo_client.js:270:13)
    at async MongoClient.connect (/app/node_modules/mongodb/lib/mongo_client.js:195:13)
    at async start (/app/app.js:18:3) {
  errorLabelSet: Set(0) {},
  reason: TopologyDescription {
    type: 'Unknown',
    servers: Map(1) { 'localhost:27017' => [ServerDescription] },
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    setName: null,
    maxElectionId: null,
    maxSetVersion: null,
    commonWireVersion: 0,
    logicalSessionTimeoutMinutes: null
  },
  code: undefined,
  [cause]: MongoNetworkError: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017
      at Socket.<anonymous> (/app/node_modules/mongodb/lib/cmap/connect.js:314:44)
      at Object.onceWrapper (node:events:634:26)
      at Socket.emit (node:events:519:28)
      at emitErrorNT (node:internal/streams/destroy:170:8)
      at emitErrorCloseNT (node:internal/streams/destroy:129:3)
      at process.processTicksAndRejections (node:internal/process/task_queues:89:21) {
    errorLabelSet: Set(3) { 'SystemOverloadedError', 'RetryableError', 'ResetPool' },
    beforeHandshake: false,
    [cause]: AggregateError [ECONNREFUSED]: 
        at internalConnectMultiple (node:net:1135:18)
        at afterConnectMultiple (node:net:1716:7) {
      code: 'ECONNREFUSED',
      [errors]: [Array]
    }
  }
}
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl apply -f podman-k8s.yaml
deployment.apps/podman-app configured
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl get pods
NAME                          READY   STATUS              RESTARTS        AGE
node-agent-588x7              1/1     Running             3 (23m ago)     3d6h
podman-app-74fd775c86-js5tq   0/1     Completed           7 (6m25s ago)   15m
podman-app-78f4cb68cd-bwg46   0/2     ContainerCreating   0               5s
vpa-demo-5554dcb5c7-g2wbj     1/1     Running             2 (23m ago)     2d6h
vpa-demo-5554dcb5c7-pxxm5     1/1     Running             3 (23m ago)     3d2h
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl get pods -w
NAME                          READY   STATUS              RESTARTS        AGE
node-agent-588x7              1/1     Running             3 (23m ago)     3d6h
podman-app-74fd775c86-js5tq   0/1     Completed           7 (6m29s ago)   15m
podman-app-78f4cb68cd-bwg46   0/2     ContainerCreating   0               9s
vpa-demo-5554dcb5c7-g2wbj     1/1     Running             2 (23m ago)     2d6h
vpa-demo-5554dcb5c7-pxxm5     1/1     Running             3 (23m ago)     3d2h
podman-app-74fd775c86-js5tq   0/1     CrashLoopBackOff    7 (66s ago)     16m
podman-app-78f4cb68cd-bwg46   2/2     Running             0               21s
podman-app-74fd775c86-js5tq   0/1     Terminating         7 (66s ago)     16m
podman-app-74fd775c86-js5tq   0/1     Terminating         7               16m
podman-app-74fd775c86-js5tq   0/1     Completed           7               16m
podman-app-74fd775c86-js5tq   0/1     Completed           7               16m
podman-app-74fd775c86-js5tq   0/1     Completed           7               16m
^X^C%                                                                                                                                        
keerthana@Keerthanas-MacBook-Air podman-poc % 
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl get pods   
NAME                          READY   STATUS    RESTARTS      AGE
node-agent-588x7              1/1     Running   3 (23m ago)   3d6h
podman-app-78f4cb68cd-bwg46   2/2     Running   0             31s
vpa-demo-5554dcb5c7-g2wbj     1/1     Running   2 (23m ago)   2d6h
vpa-demo-5554dcb5c7-pxxm5     1/1     Running   3 (23m ago)   3d2h
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl logs podman-app-78f4cb68cd-bwg46           
Defaulted container "podman-app" out of: podman-app, mongodb
Connected to MongoDB
Server running on port 3000
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl port-forward deployment/podman-app 3000:3000
Forwarding from 127.0.0.1:3000 -> 3000
Forwarding from [::1]:3000 -> 3000
Handling connection for 3000
Handling connection for 3000
^C%                                                                                                                                          
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl exec deployment/podman-app -c mongodb -- \
  mongosh podman_demo \
  --eval 'db.messages.insertOne({message:"Hello from Kubernetes MongoDB"})'
{
  acknowledged: true,
  insertedId: ObjectId('6aa29763cd65759850ac9e59')
}
keerthana@Keerthanas-MacBook-Air podman-poc % kubectl port-forward deployment/podman-app 3000:3000
Forwarding from 127.0.0.1:3000 -> 3000
Forwarding from [::1]:3000 -> 3000
Handling connection for 3000
Handling connection for 3000
Handling connection for 3000


* So the complete flow is proven:
--------------------------------
Podman
  ↓
Build Node image
  ↓
Push image to Docker Hub
  ↓
Kubernetes pulls image
  ↓
Kubernetes Pod
├── Node.js
└── MongoDB
      ↓
Node → localhost:27017 → MongoDB
      ↓
HTTP response


*The POC flow completed was*:

1. Podman build image
       ↓
2. Create Podman Pod
       ↓
3. Put Node + MongoDB containers inside the Pod
       ↓
4. Create Podman volume for MongoDB
       ↓
5. Store data in volume
       ↓
6. Delete MongoDB container
       ↓
7. Recreate MongoDB using same volume
       ↓
8. Data still exists ✅
       ↓
9. Push Podman-built image to Docker Hub
       ↓
10. Kubernetes pulls that image
       ↓
11. Kubernetes runs Node + MongoDB
       ↓
12. Node successfully reads MongoDB data ✅