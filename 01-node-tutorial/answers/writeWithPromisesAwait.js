const { rejects } = require("assert");
const { resolve } = require("path");

const { writeFile, readFile } = require("fs").promises;

const writer = async () => {
  // return new Promise(resolve, reject) => {
  //     writeFile("./temporary1/temp.txt", fileContent, {flag: "a",});
  // };
  //   try {
  //     const lines = ["firstLine\n", "secondLine\n", "thirdLine\n"];
  //     const fileContent = lines.join("");
  //     result = await writeFile("./temporary/temp.txt", fileContent, {
  //       flag: "a",
  //     });
  //   } catch (err) {
  //     console.log("An error occurred: ", err);
  //   }
  try {
    await writeFile("./temporary/temp.txt", "First line\n");
    await writeFile("./temporary/temp.txt", "Second line\n", { flag: "a" });
    await writeFile("./temporary/temp.txt", "Third line\n", { flag: "a" });
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};

const reader = async () => {
  try {
    const data = await readFile("./temporary/temp.txt", "utf8");
    console.log("File contents:\n", data);
  } catch (error) {
    console.error("Error reading file:", error);
  }
  //   new Promise((resolve, reject) => {
  //     readFile("./temporary/temp.txt", "utf8", (err, data) => {
  //       if (err) {
  //         reject(err);
  //       } else {
  //         resolve(data);
  //       }
  //     });
  //   });
  //   try {
  //     result = await readFile("./temporary1/temp.txt");
  //     console.log(result);
  //   } catch (err) {
  //     console.log("An error occurred: ", err);
  //   }
};

const readWrite = async () => {
  try {
    await writer();
    await reader();
    // const data = await reader();
    // const result = await writer();
    // console.log(data);
  } catch (err) {
    console.log("An error occurred: ", err);
  }
};

readWrite();
