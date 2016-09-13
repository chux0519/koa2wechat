'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _templates = require('../xml/templates');

// return a Promise
var defaultHandler = function defaultHandler(xml) {
	// default
	var rpl = {};
	rpl.ToUserName = xml.FromUserName;
	rpl.FromUserName = xml.ToUserName;
	rpl.Content = 'Hello from koa2wechat';
	rpl.CreateTime = new Date().getTime();
	return Promise.resolve((0, _templates.textTpl)(rpl));
};

exports.default = defaultHandler;