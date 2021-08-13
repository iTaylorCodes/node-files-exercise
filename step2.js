const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

function webcat(url) {
  axios
    .get(url)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(`Error fetching ${url}: ${err}`);
      process.exit(1);
    });
}

let path = process.argv[2];

if (path.slice(0, 4) === "http") {
  webcat(path);
} else {
  cat(path);
}
