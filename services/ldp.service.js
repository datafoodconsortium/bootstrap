const { LdpService } = require('@semapps/ldp');
const urlJoin = require('url-join');
const ontologies = require('../ontologies');
const containers = require('../containers');

module.exports = {
  mixins: [LdpService],
  settings: {
    baseUrl: process.env.SEMAPPS_HOME_URL,
    ontologies,
    containers,
    defaultContainerOptions: {
      // jsonContext: urlJoin(process.env.SEMAPPS_HOME_URL, 'context.json'),
      allowAnonymousEdit: false,
      allowAnonymousDelete: false
    }
  }
};
