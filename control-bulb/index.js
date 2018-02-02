const lifx = require('lifx-http-api');
require('dotenv').config();

module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  let client = new lifx({
    bearerToken: process.env.LIFX_TOKEN
  });

  let options = {
    color: 'blue',
    from_color: 'white',
    period: 2,
    cycles: 5,
    persist: false,
    power_on: true
  };

  client
    .breathe('all', options)
    .then(result => {
      context.res = {
        // status: 200, /* Defaults to 200 */
        body: result
      };

      context.done();
    })
    .catch(err => {
      context.res = {
        status: 500,
        body: result
      };
    });
};
