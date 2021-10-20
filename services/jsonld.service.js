const { JsonLdService } = require('@semapps/jsonld');

module.exports = {
  mixins: [JsonLdService],
  settings: {
    baseUri: process.env.SEMAPPS_HOME_URL
  }
};