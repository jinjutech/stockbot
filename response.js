'use strict';

exports.Response = function(body, options) {
  options = options || {};
  return {
    statusCode: options.statusCode || 200,
    isBase64Encoded: options.isBase64Encoded || false,
    body: JSON.stringify(body),
  }
}
