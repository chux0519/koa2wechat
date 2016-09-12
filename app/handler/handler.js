import eventHandler from './eventHandler'
import textHandler from './textHandler'
import defaultHandler from './defaultHandler'

// return Promise
let handler = (xml)=>{
	let {ToUserName,FromUserName,MsgType} = xml
	if(!MsgType) return
	switch(MsgType){
		case 'event':
			return eventHandler(xml)
		case 'text':
			return textHandler(xml)
		default:
			return defaultHandler(xml)
	}
}

export default handler