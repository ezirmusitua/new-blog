const config = require('../../config.prod.json');
export const environment = {
  production: true,
  resourcePath: config.server.host + ':' + config.server.port,
};
