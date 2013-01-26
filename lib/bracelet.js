var express = require('express')
  , app = express();

app.use(express.bodyParser());

/**
 * Register `/*` get route with Express.
 *
 * Returns a JSON object defiend by a REST-style url or 404.
 */

app.get('/*', function (req, res) {
  var param = req.params[0];
  if ('favicon.ico' === param || !param.length) res.send(404);
  param = param.split('/');
  var json = {};
  for (var i = 0, l = param.length; i < l; i++) {
    if (0 === i % 2) {
      json[param[i]] = '';
    } else {
      if (!isNaN(parseFloat(param[i])) && isFinite(param[i])) {
        json[param[i-1]] = parseFloat(param[i]);
      } else if ('[' === param[i][0] && ']' === param[i][param[i].length-1]) {
        param[i] = param[i].replace('[', '').replace(']', '').split(',');
        var arr = [];
        for (var a = 0, b = param[i].length; a < b; a++) {
          arr.push(param[i][a]);
        }
        json[param[i-1]] = arr;
      } else if ('{' === param[i][0] && '}' === param[i][param[i].length-1]) {
        json[param[i-1]] = JSON.parse(param[i]);
      } else if ('true' === param[i] || 'false' === param[i]) {
        json[param[i-1]] = 'true' === param[i] || !'false' === param[i];
      } else {
        json[param[i-1]] = param[i];
      }
    }
  }
  
  if (req.query.callback) {
    res.jsonp(json);
  } else {
    res.send(json);
  }
});

/**
 * Register `/*` post route with Express.
 *
 * Returns the JSON you posted to the route or 404.
 */

app.post('/*', function (req, res) {
  if ('object' === typeof req.body) {
    if (req.query.callback) {
      res.jsonp(req.body);
    } else {
      res.send(req.body);
    }
  } else {
    res.send(404);
  }
});

/**
 * Exports Express listen function.
 *
 * @param {Integer} port
 */
  
exports.listen = function (port) {
  app.listen(port);
};