const { LdpService } = require('@semapps/ldp');
const ontologies = require('../ontologies');
const containers = require('../containers');

module.exports = {
  mixins: [LdpService],
  settings: {
    baseUrl: process.env.SEMAPPS_HOME_URL + 'ldp/',
    ontologies,
    containers,
    defaultContainerOptions: {
      allowAnonymousEdit: true,
      allowAnonymousDelete: true
    }
  }
};
