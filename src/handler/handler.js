import defaultHandler from './defaultHandler'

/**
 * 示例 handler
 * @param  {obj} xml , 根据微信服务器推送的xml数据转化的Object，譬如，
 *		当接收到文本信息的时候，xml为:
 *        {
 *         	ToUserName:"",
 *         	FromUserName:"",
 *         	CreateTime:12345678,
 *         	MsgType:"text",
 *         	Content:"this is a test",
 *         	MsgId:1234567890123456
 *        }
 *		接收到图片信息的时候为：
 *        {
 *         	ToUserName:"",
 *         	FromUserName:"",
 *         	CreateTime:12345678,
 *         	MsgType:"image",
 *         	PicUrl:"",
 *         	MediaId:"",
 *         	MsgId:1234567890123456
 *        }
 *  其他类型同理，具体信息参考 http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
 * @return {Promise}     [一定记得返回Promise对象]
 */
let handler = (xml)=>{
	let {MsgType} = xml
	if(!MsgType) return
	// more about MsgType: http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
	switch(MsgType){
		// 订阅的时候会触发'event'
		case 'event':
		case 'text':
		case 'image':
		case 'voice':
		case 'video':
		case 'shortvideo':
		case 'location':
		case 'link':
		default:
		// 这里的defaultHandler是一个Promise对象
			return defaultHandler(xml)
	}
}
export {handler}
export default handler
