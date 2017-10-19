'use strict';

const request = require('request');
const sinaStock = require('sina-stock');
const util = require('util');
const {Response} = require('./response');

const stocks = [
  'sz002410', // 广联达
  'sz002155', // 联通
  'sz002230', // 科大讯飞
  'sz000333', // 美的
  'sh601318', // 中国平安
  // 'sh601628', // 中国人寿
  'sz002362', // 汉王科技
  'sz002155', // 湖南黄金
  // 'sz000651', // 格力电器
  'sh600756', // 浪潮软件
  'sh600728', // 佳都科技
  // 'sz000002', // 万科A
  'sz002314', // 南山控股
  'sh000001', // 上证指数
];

function getMarkdownMsg(data) {
  const result = []
  const MSG_FORMAT = '- %s %d %s';
  for(const item of data) {
    item.ratio = ((item.current - item.close) * 100 / item.close).toFixed(2);
    item.ratioStr = `${item.ratio}%`;
    item.ratioStr = `**${item.ratioStr}**`;
    item.link = `[${item.name}](http://image.sinajs.cn/newchart/min/n/${item.code}.gif)`;
    result.push(util.format(MSG_FORMAT, item.link, item.current, item.ratioStr));
  }
  return result.join('\n');
}

exports.notifyDingding = (event, context, callback) => {
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
      callback(null, Response(body));
    })
  })
};

exports.stocks = (event, context, callback) => {
  callback(null, Response({data: []}));
}

exports.stock = (event, context, callback) => {
  callback(null, Response({data: null}));
}
