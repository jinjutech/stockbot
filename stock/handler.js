'use strict';

const request = require('request');
const sinaStock = require('sina-stock');

function getMarkdownMsg(data) {
  console.log(data)
  const result = []
  for (let i = 0; i < data.length; i++) {
    result.push(`${i + 1}. ${data[i].code}`)
  }
  return result.join('\n');
}

module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);
};

module.exports.notifyDingding = (event, context, callback) => {
  const msg = 'hello';
  const accessToken = '601d8c7b44ca18e1472f42c24b8eb791074071b2c0ee305af0a4f096996dad0b';
  const url = `https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`;
  const stockCodes = ['sz002410', 'sz000333', 'sh601318', 'sh601628', 'sz002632'];
  const body = {
    msgtype: 'markdown', 
    title: 'stock',
    text: '',
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

  sinaStock.stock(stockCodes, (data) => {
    body.text = getMarkdownMsg(data);
    request(options, (error, response, body) => {
      callback(error, response, body);
    })
  })
};

module.exports.stocks = (event, context, callback) => {

}

module.exports.stock = (event, context, callback) => {
  
}