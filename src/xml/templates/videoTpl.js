let videoTpl = (msg)=>{
	let{
		to:ToUserName,
		from:FromUserName,
		ts:CreateTime,
		mediaId:MediaId,
		title:Title,
		desc:Description
	} = msg
	let retStr =
	`<xml>
	<ToUserName><![CDATA[${ToUserName}]]></ToUserName>
	<FromUserName><![CDATA[${FromUserName}]]></FromUserName>
	<CreateTime>${CreateTime}</CreateTime>
	<MsgType><![CDATA[video]]></MsgType>
	<Video>
	<MediaId><![CDATA[${MediaId}]]></MediaId>
	<Title><![CDATA[${Title}]]></Title>
	<Description><![CDATA[${Description}]]></Description>
	</Video> 
	</xml>`
	return retStr
}

export default videoTpl