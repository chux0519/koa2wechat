import {textTpl} from '../xml/templates'
// return a Promise
let defaultHandler = (xml)=>{
	// default
	let rpl = {}
	rpl.ToUserName = xml.FromUserName
	rpl.FromUserName = xml.ToUserName
	rpl.Content = `Hello from koa2wechat`
	rpl.CreateTime = new Date().getTime()
	return Promise.resolve(textTpl(rpl))
}

export default defaultHandler