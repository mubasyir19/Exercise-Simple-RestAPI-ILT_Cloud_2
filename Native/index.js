const http = require("http");
const contacts = require("./contacts");

(async () => {
  const server = http.createServer((request, response) => {
    response.setHeader("Content-Type", "application/json");

    const { url } = request;

    if (url === "/contacts") {
      const { method } = request;

      if (method === "POST") {
        let body = "";

        request.on("data", (chunk) => {
          body += chunk.toString();
        });
        response.statusCode = 200;
        return response.end(
          JSON.stringify({
            data: body,
          })
        );
      } else {
        response.statusCode = 400;
        return response.end(
          JSON.stringify({
            message: "Bad request",
            data: [],
          })
        );
      }
    } else {
      response.statusCode = 404;
      return response.end(
        JSON.stringify({
          message: "Endpoint not found",
          data: [],
        })
      );
    }
  });

  server.listen(3000, "localhost", () => {
    console.log("Server running on http://localhost:3000");
  });
})();
