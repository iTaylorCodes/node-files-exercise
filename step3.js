const fs = require("fs");
const process = require("process");
const axios = require("axios");

function handleDataOutput(text, output) {
  if (output) {
    fs.writeFile(output, text, "utf8", (err) => {
      if (err) {
        console.log(`Couldn't write ${output}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleDataOutput(data, out);
    }
  });
}

function webcat(url, out) {
  axios
    .get(url)
    .then((data) => {
      handleDataOutput(data, out);
    })
    .catch((err) => {
      console.log(`Error fetching ${url}: ${err}`);
      process.exit(1);
    });
}

let path;
let outputFile;

if (process.argv[2] === "--out") {
  outputFile = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webcat(path);
} else {
  cat(path, outputFile);
}
