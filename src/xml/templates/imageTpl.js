let imageTpl = (msg)=>{
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
<MsgType><![CDATA[image]]></MsgType>
<Image>
<MediaId><![CDATA[${MediaId}]]></MediaId>
</Image>
</xml>`
	return retStr
}

export default imageTpl