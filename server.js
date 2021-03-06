var http = require('http');
var fs = require('fs');
var path = require('path');
http.createServer(function (request, response) {
	console.log("request starting...");
	var filePath = "." + request.url;
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
	case ".js":
		contentType = 'text/javascript';
		break;
	case ".css":
		contentType = 'text/css';
		break;
	}
	var whatMethod;
	if (request.method === "GET" && request.url === "/") {
		whatMethod = function (request, response) {
			fs.readFile("./todos/selectionIndex.html", function (error, content) {
				if (error) {
					response.writeHead(404, {
						"Content-Type": "text/html"
					});
					response.end("404 Not Found");
				}
				response.writeHead(200, {
					"Content-Type": contentType
				});
				response.end(content, "utf8");
			});
		};
	} else if (request.method === "GET" && request.url === "/read") {
		whatMethod = function (request, response) {
			fs.readFile("config.txt", function (err, data) {
				if (err) throw err;
				response.writeHead(200, {
					"Content-Type": "text/html"
				});
				response.write(data);
				response.end();
			});
		};
	} else if (request.method === "GET" && request.url === "/readUsers") {
		whatMethod = function (request, response) {
			fs.readFile("users.txt", function (err, data) {
				if (err) throw err;
				response.writeHead(200, {
					"Content-Type": "text/html"
				});
				response.write(data);
				response.end();
			});
		};
	} else if (request.method === "POST" && request.url === "/write") {
		whatMethod = function (request, response) {
			request.on("data", function (data) {
				fs.writeFile("config.txt", data, function (err) {
					if (err) throw err;
				});
			});
			request.on("end", function () {
				console.log("Saved successfully!");
			});
			response.writeHead(200, {
				"Content-Type": "text/html"
			});
			response.end();
		};
	}else if (request.method === "POST" && request.url === "/writeUsers") {
		whatMethod = function (request, response) {
			request.on("data", function (data) {
				fs.writeFile("users.txt", data, function (err) {
					if (err) throw err;
				});
			});
			request.on("end", function () {
				console.log("Registerd complated!");
			});
			response.writeHead(200, {
				"Content-Type": "text/html"
			});
			response.end();
		};
	}else if (request.method === "GET" && request.url === "/main") {
			whatMethod = function (request, response) {
				fs.readFile("./todos/index.html", function (error, content) {
					if (error) {
						response.writeHead(404, {
							"Content-Type": "text/html"
						});
						response.end("404 Not Found");
					}
					response.writeHead(200, {
						"Content-Type": contentType
					});
					response.end(content, "utf8");
				});
			};
		}else if (request.method === "GET" && request.url === "/signUpPage") {
			whatMethod = function (request, response) {
				fs.readFile("./todos/SignUp.html", function (error, content) {
					if (error) {
						response.writeHead(404, {
							"Content-Type": "text/html"
						});
						response.end("404 Not Found");
					}
					response.writeHead(200, {
						"Content-Type": contentType
					});
					response.end(content, "utf8");
				});
			};
		}
	else if (request.method === "GET" && request.url === "/signInPage") {
		whatMethod = function (request, response) {
			fs.readFile("./todos/SignIn.html", function (error, content) {
				if (error) {
					response.writeHead(404, {
						"Content-Type": "text/html"
					});
					response.end("404 Not Found");
				}
				response.writeHead(200, {
					"Content-Type": contentType
				});
				response.end(content, "utf8");
			});
		};
	}
	else {
		whatMethod = function (request, response) {
			fs.readFile("./todos/" + request.url, function (err, content) {
				if (err) {
					response.writeHead(404, {
						"Content-Type": "text/html"
					});
					response.end("404 Not Found");
				}
				response.writeHead(200);
				response.end(content, "utf8");
			});
		};
	}
	whatMethod(request, response);
}).listen(8080);