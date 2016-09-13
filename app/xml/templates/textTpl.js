let textTpl = (msg)=>{
	let{
		ToUserName,
		FromUserName,
		CreateTime,
		Content
	} = msg
	let retStr =
	`<xml>
	<ToUserName><![CDATA[${ToUserName}]]></ToUserName>
	<FromUserName><![CDATA[${FromUserName}]]></FromUserName>
	<CreateTime>${CreateTime}</CreateTime>
	<MsgType><![CDATA[text]]></MsgType>
	<Content><![CDATA[${Content}]]></Content>
	</xml>`
	return retStr
}

export default textTpl