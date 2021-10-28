const ApiGatewayService = require('moleculer-web');
const E = require("moleculer-web").Errors;
const path = require('path');

module.exports = {
  mixins: [ApiGatewayService],
  settings: {
    server: true,
    routes: [
      // {
      //   path: '/ontology',
      //   use: [
      //     ApiGatewayService.serveStatic('./public/ontology.ttl', {
      //       setHeaders: res => {
      //         res.setHeader('Access-Control-Allow-Origin', '*');
      //         res.setHeader('Content-Type', 'text/turtle; charset=utf-8');
      //       }
      //     })
      //   ]
      // },
      {
        path: "/1.5/",
        authentication: true,
        aliases: {
          "/": "api.getVersion"
        }
      },
      {
        path: "/1.6/",
        authentication: true,
        aliases: {
          "/": "api.getVersion"
        }
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
      if( payload == null )
        return Promise.reject(new E.UnAuthorizedError(E.ERR_INVALID_TOKEN));
    }
  },
  actions: {
    getVersion(ctx) {
      let url = ctx.options.parentCtx.params.req.baseUrl;
      let version = url.replace(/\//g, '');
      ctx.meta.$responseHeaders = {
        "Content-Type": `application/ld+json; charset=utf-8`
      };
      let json = require(path.resolve(__dirname, '../public/'+version+'.json'));
      return json;
    }
  }
};
