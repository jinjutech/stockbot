'use strict';

const request = require('request');

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.sendToDingding = (event, context, callback) => {
  const msg = 'hello';
  const accessToken = '601d8c7b44ca18e1472f42c24b8eb791074071b2c0ee305af0a4f096996dad0b';
  const url = `https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`;
  const body = {
    msgtype: 'text', 
    text: {
      content: msg,
    }, 
    at: {
      atMobiles: [
        '156xxxx8827', 
        '189xxxx8325'
      ], 
      isAtAll: false
    }
  };

  const options = {
    uri: url,
    method: 'POST',
    json: body,
  }; 

  request(options, (error, response, body) => {
    callback(error, response, body);
  })

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};