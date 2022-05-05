'use strict';

module.exports.hello = async (event) => {
  var apiUrl = process.env.HELLO_URL;
  var apiKey = process.env.HELLO_APIKEY;
  console.log(apiUrl);
  console.log(apiKey);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
module.exports.main = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};
