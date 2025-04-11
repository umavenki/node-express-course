const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Welcome to home page");
  }
  if (req.url === "/about") {
    res.end("Welcome to about page");
  }
  res.end("Oops.We cannot find the page you are lookinh for");
});

server.listen(8000);
