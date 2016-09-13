import defaultHandler from './defaultHandler'

// return Promise
let handler = (xml)=>{
	let {MsgType} = xml
	if(!MsgType) return
	// more about MsgType: http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
	switch(MsgType){
		// when client subscribe,case 'event' occurs
		case 'event':
		case 'text':
		case 'image':
		case 'voice':
		case 'video':
		case 'shortvideo':
		case 'location':
		case 'link':
		default:
			return defaultHandler(xml)
	}
}
export {handler}
export default handler