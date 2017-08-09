'use strict';

const request = require('request');
const sinaStock = require('sina-stock');
const util = require('util');

const stocks = ['sz002410', 'sz000333', 'sh601318', 'sh601628', 'sz002362', 'sz002155', 'sz000651',
  'sh600756', 'sh600728', 'sz002362', 'sz000002', 'sh000001'];

function getMarkdownMsg(data) {
  const result = []
  const MSG_FORMAT = '- %s %d %s';
  for(const item of data) {
    item.ratio = ((item.current - item.close) * 100 / item.close).toFixed(2);
    item.ratioStr = `${item.ratio}%`;
    const color = item.ratio === 0? 'black': item.ratio < 0? 'green': 'red';
    // item.ratioStr = `<span style="color:${color};font-weight:bold">${item.ratioStr}</span>`;
    item.ratioStr = `**${item.ratioStr}**`;
    item.link = `[${item.name}](http://image.sinajs.cn/newchart/min/n/${item.code}.gif)`;
    item.link = pad(item.link, 70);
    result.push(util.format(MSG_FORMAT, item.link, item.current, item.ratioStr));
  }
  return result.join('\n');
}

module.exports.notifyDingding = (event, context, callback) => {
  const msg = 'hello';
  const accessToken = '601d8c7b44ca18e1472f42c24b8eb791074071b2c0ee305af0a4f096996dad0b';
  const url = `https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`;
  const body = {
    msgtype: 'markdown', 
    markdown: {
      title: '最新价格',
      text: '',
    },
  };

  const options = {
    uri: url,
    method: 'POST',
    json: body,
  }; 

  sinaStock.stock(stocks, (err, data) => {
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