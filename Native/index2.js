const http = require("http");
const url = require("url");

const data = require("./contacts");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const endpoint = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (endpoint === "/contacts" && req.method === "GET") {
    if (query.id) {
      const dataObj = data.find((obj) => obj.id === parseInt(query.id));
      if (dataObj) {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(dataObj));
      } else {
        res.statusCode = 404;
        res.end("Data object not found");
      }
    } else {
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    }
  } else if (endpoint === "/contacts" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newData = JSON.parse(body);
      newData.id = data.length + 1;
      data.push(newData);
      res.setHeader("Content-Type", "application/json");
      res.statusCode = 201;
      res.end(JSON.stringify(newData));
    });
  } else if (endpoint === "/contacts" && req.method === "DELETE") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const deletedData = JSON.parse(body);
      const index = data.findIndex((obj) => obj.id === deletedData.id);
      if (index >= 0) {
        data.splice(index, 1);
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(deletedData));
      } else {
        res.statusCode = 404;
        res.end("Data object not found");
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Endpoint not found");
  }
});

server.listen(3000, () => {
  console.log("Server started on port 3000");
});