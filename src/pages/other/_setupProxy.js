const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // La ruta que quieres redirigir al backend
    createProxyMiddleware({
      target: 'https://mern-blog-api-eight.vercel.app', // La URL de tu servidor backend
      changeOrigin: true,
			secure: false,
			headers: {
				'Access-Control-Allow-Origin': 'http://localhost:3000'
			}
    })
  );
};
