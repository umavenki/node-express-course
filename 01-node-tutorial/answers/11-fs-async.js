const { writeFile } = require("fs");
const filePath = "./temporary1/fileB.txt";
const line1 = "This is line1\n";
const line2 = "This is line2\n";
const line3 = "This is line3\n";

console.log("at start");

writeFile(filePath, line1, (err, result) => {
  console.log("at point 1");
  if (err) {
    console.log("This error happened: ", err);
  } else {
    writeFile(filePath, line2, { flag: "a" }, (err, result) => {
      if (err) {
        console.log("This error happened: ", err);
      } else {
        writeFile(filePath, line3, { flag: "a" }, (err, result) => {
          if (err) {
            console.log("This error happened: ", err);
          }
        });
      }
    });
  }
});
console.log("at end");
