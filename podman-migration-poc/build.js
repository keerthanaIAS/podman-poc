const fs = require("fs");

fs.mkdirSync("dist", { recursive: true });

fs.writeFileSync(
  "dist/build-info.json",
  JSON.stringify(
    {
      application: "cube-root-ms-podman-poc",
      builtAt: new Date().toISOString(),
      node: process.version
    },
    null,
    2
  )
);

console.log("Build completed");