'use strict';

const request = require('request');
const sinaStock = require('sina-stock');

const stocks = {
  sz002410: '小广',
  sz000333: '美的',
  sh601318: '平安',
  sh601628: '人寿',
  sz002362: '汉王',
};

function getMarkdownMsg(data) {
  const result = []
  for (let i = 0; i < data.length; i++) {
    const v = data[i];
    v.name = stocks[v.code] || '';
    const ratio = ((v.current - v.opening) * 100 / v.opening).toFixed(2);
    result.push(`${i + 1}. ${v.name}\t\t(${v.low}/${v.high})\t\t${v.current}\t\t**${ratio}%**`);
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
  const body = {
    msgtype: 'markdown', 
    markdown: {
      title: 'stock',
      text: '',
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

  sinaStock.stock(Object.keys(stocks), (err, data) => {
    body.markdown.text = getMarkdownMsg(data);
    request(options, (error, response, body) => {
      callback(error, response, body);
    })
  })
};

module.exports.stocks = (event, context, callback) => {

}

module.exports.stock = (event, context, callback) => {
  
}