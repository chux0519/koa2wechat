let musicTpl = (msg)=>{
	let{
		ToUserName,
		FromUserName,
		CreateTime,
		MediaId,
		Title,
		Description,
		MusicUrl,
		HQMusicUrl,
		ThumbMediaId
	} = msg
	let retStr =
	`<xml>
	<ToUserName><![CDATA[${ToUserName}]]></ToUserName>
	<FromUserName><![CDATA[${FromUserName}]]></FromUserName>
	<CreateTime>${CreateTime}</CreateTime>
	<MsgType><![CDATA[music]]></MsgType>
	<Music>
	<Title><![CDATA[${Title}]]></Title>
	<Description><![CDATA[${Description}]]></Description>
	<MusicUrl><![CDATA[${MusicUrl}]]></MusicUrl>
	<HQMusicUrl><![CDATA[${HQMusicUrl}]]></HQMusicUrl>
	<ThumbMediaId><![CDATA[${ThumbMediaId}]]></ThumbMediaId>
	</Music>
	</xml>`
	return retStr
}

export default musicTpl