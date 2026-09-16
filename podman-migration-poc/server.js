const Fastify = require("fastify");
const fs = require("fs");
const os = require("os");

const app = Fastify({
  logger: false
});

const DATA_DIR = "/data";
const LOG_DIR = "/logs";

const TRANSACTION_FILE = `${DATA_DIR}/transactions.log`;
const APPLICATION_LOG = `${LOG_DIR}/application.log`;

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(LOG_DIR, { recursive: true });

function writeLog(data) {
  const log = {
    timestamp: new Date().toISOString(),
    ...data
  };

  fs.appendFileSync(
    APPLICATION_LOG,
    JSON.stringify(log) + "\n"
  );
}

app.get("/health", async () => {
  return {
    status: "UP",
    engine: process.env.CONTAINER_ENGINE || "unknown",
    hostname: os.hostname()
  };
});

app.post("/transactions", async (request, reply) => {
  const transaction = {
    transactionId:
      request.body?.transactionId ||
      `TXN-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`,

    amount: request.body?.amount || 100,

    timestamp: new Date().toISOString()
  };

  fs.appendFileSync(
    TRANSACTION_FILE,
    JSON.stringify(transaction) + "\n"
  );

  writeLog({
    event: "TRANSACTION_PROCESSED",
    transactionId: transaction.transactionId
  });

  return {
    success: true,
    transaction
  };
});

app.get("/metrics/local", async () => {
  const memory = process.memoryUsage();

  const transactionSize = fs.existsSync(TRANSACTION_FILE)
    ? fs.statSync(TRANSACTION_FILE).size
    : 0;

  const logSize = fs.existsSync(APPLICATION_LOG)
    ? fs.statSync(APPLICATION_LOG).size
    : 0;

  return {
    pid: process.pid,
    uptime: process.uptime(),

    memory: {
      rss: memory.rss,
      heapUsed: memory.heapUsed,
      heapTotal: memory.heapTotal
    },

    storage: {
      transactionsBytes: transactionSize,
      logsBytes: logSize
    }
  };
});

app.get("/", async () => {
  return {
    application: "cube-root-ms",
    poc: true,
    message: "Podman migration POC"
  };
});

app.listen(
  {
    host: "0.0.0.0",
    port: 3001
  },
  err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log("Application running on port 3001");
  }
);