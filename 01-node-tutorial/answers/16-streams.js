const { createReadStream } = require("fs");
const stream = createReadStream("../content/big.txt", {
  encoding: "utf8",
  highWaterMark: 200,
});

let counter = 0;

stream.on("data", (result) => {
  counter++;
  console.log(`Result ${counter}:\n`, result);
});
stream.on("end", () => {
  console.log(`Stream ended. Total chunks received: ${counter}`);
});

// Handle errors
stream.on("error", (error) => {
  console.error("Error reading the file:", error);
});
