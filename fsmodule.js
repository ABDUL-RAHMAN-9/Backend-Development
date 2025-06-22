const fs = require("fs");

// fs.readFiles("file1.txt", "utf8", (err, data) => {
//     console.log(err, data);
// });

// fs.writeFile("file2.txt", "This is New File 2.", () => {
//     console.log("Written new file");
// });

b = fs.writeFileSync("file2.txt", "This is new data");
console.log(b);

console.log("Finished reading file");
