const { writeFileSync, readFileSync } = require("fs");
const lines = ["firstLine\n", "secondLine\n", "thirdLine\n"];
const fileContent = lines.join("");

writeFileSync("./temporary1/fileApp.txt", fileContent, { flag: "a" });
console.log("Text has been updated");

const data = readFileSync("./temporary1/fileApp.txt");
console.log(data);
