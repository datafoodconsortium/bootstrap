const ApiGatewayService = require('moleculer-web');
const E = require("moleculer-web").Errors;

module.exports = {
  mixins: [ApiGatewayService],
  settings: {
    server: true,
    routes: [
      {
        path: '/ontology',
        use: [
          ApiGatewayService.serveStatic('./public/ontology.ttl', {
            setHeaders: res => {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Content-Type', 'text/turtle; charset=utf-8');
            }
          })
        ]
      }
    ],
    cors: {
      origin: '*',
      methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
      exposedHeaders: '*'
    }
  },
  methods: {
    // Authorize if token payload email is DFC
    async authenticate(ctx, route, req, res) {
      const payload = await ctx.call('auth.authenticate', { route, req, res } );
      if( payload == null || payload.email !== "testdfc@tutanota.com" )
        return Promise.reject(new E.UnAuthorizedError(E.ERR_INVALID_TOKEN));
    }
  }
};
