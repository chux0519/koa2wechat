import {ReplyBuilder} from '../index'

const welcomeMsg = 'hello from koa2wechat'

// return a Promise
let defaultHandler = (xml)=>{
	// builder used to generate xml string
	let replyBuilder = new ReplyBuilder()

	let {FromUserName,ToUserName} = xml
	let meta = {from:ToUserName,to:FromUserName,ts:new Date().getTime()}
	let textRpl = {
		meta:meta,
		type:"text",
		content:welcomeMsg
	}
	let rpl = replyBuilder.genXML(textRpl)
	return Promise.resolve(rpl)
}

export default defaultHandler