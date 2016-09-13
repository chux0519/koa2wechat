let textTpl = (msg)=>{
	let{
		to:ToUserName,
		from:FromUserName,
		ts:CreateTime,
		content:Content
	} = msg
	if (!ToUserName || !FromUserName || !CreateTime || !Content) return ''
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