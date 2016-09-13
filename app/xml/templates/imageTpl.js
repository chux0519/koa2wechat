let imageTpl = (msg)=>{
	let{
		ToUserName,
		FromUserName,
		CreateTime,
		MediaId
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