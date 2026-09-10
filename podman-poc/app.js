// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.end("Hello from Podman!");
// });

// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

const http = require("http");
const { MongoClient } = require("mongodb");

// const client = new MongoClient("mongodb://mongodb:27017");
const client = new MongoClient("mongodb://localhost:27017");

async function start() {
  await client.connect();

  const db = client.db("podman_demo");
  const collection = db.collection("messages");

  await collection.insertOne({
    message: "Hello from Podman Compose!",
    createdAt: new Date(),
  });

  console.log("Connected to MongoDB");

  const server = http.createServer(async (req, res) => {
    const messages = await collection.find().toArray();

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(messages));
  });

  server.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

start().catch(console.error);