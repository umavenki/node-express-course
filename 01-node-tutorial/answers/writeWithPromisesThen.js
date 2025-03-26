const { writeFile, readFile } = require("fs").promises;

writeFile("./temporary/temp.txt", "First line1\n")
  .then(() => writeFile("./temporary/temp.txt", "Second line\n", { flag: "a" }))
  .then(() => writeFile("./temporary/temp.txt", "Third line\n", { flag: "a" }))
  .then(() => readFile("./temporary/temp.txt", "utf8"))
  .then((data) => console.log("File contents:\n", data))
  .catch((error) => console.error("Error:", error));
