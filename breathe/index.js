const lifx = require('lifx-http-api');
require('dotenv').config();

module.exports = function(context, req) {
  context.log('JavaScript HTTP trigger function processed a request.');

  if (req.query.color) {
    let client = new lifx({
      bearerToken: process.env.LIFX_TOKEN
    });

    let options = {
      color: req.query.color,
      period: 2,
      cycles: 2,
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
          body: err
        };

        context.done();
      });
  } else {
    context.res = {
      body: 'Please pass a valid color',
      status: 500
    };

    context.done();
  }
};
