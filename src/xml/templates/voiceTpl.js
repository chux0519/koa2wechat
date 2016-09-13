let voiceTpl = (msg)=>{
	let{
		to:ToUserName,
		from:FromUserName,
		ts:CreateTime,
		mediaId:MediaId
	} = msg
	let retStr =
`<xml>
<ToUserName><![CDATA[${ToUserName}]]></ToUserName>
<FromUserName><![CDATA[${FromUserName}]]></FromUserName>
<CreateTime>${CreateTime}</CreateTime>
<MsgType><![CDATA[voice]]></MsgType>
<Voice>
<MediaId><![CDATA[${MediaId}]]></MediaId>
</Voice>
</xml>`
	return retStr
}

export default voiceTpl