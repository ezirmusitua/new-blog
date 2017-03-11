const config = require('../../config.prod.json');
export const environment = {
  production: false,
  resourcePath: config.server.host + ':' + config.server.port,
};
