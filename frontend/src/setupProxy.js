const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware("/api/**", {target: `http://${process.env.BE_HOST}:${process.env.BE_PORT}/`}));
};
