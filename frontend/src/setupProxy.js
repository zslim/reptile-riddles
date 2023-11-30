const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware("/api/**", { target: "http://localhost:8080" }));
  // app.use(createProxyMiddleware("/socket", { target: "http://localhost:9090", ws: true, changeOrigin: true }));
};

