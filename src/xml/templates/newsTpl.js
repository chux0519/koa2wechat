import newsItemTpl from './newsItemTpl'

let newsTpl = (msg)=>{
	let{
		to:ToUserName,
		from:FromUserName,
		ts:CreateTime,
		articles
	} = msg
	// get head
	let head = 
`<xml>
<ToUserName><![CDATA[${ToUserName}]]></ToUserName>
<FromUserName><![CDATA[${FromUserName}]]></FromUserName>
<CreateTime>${CreateTime}</CreateTime>
<MsgType><![CDATA[news]]></MsgType>
<ArticleCount>${articles.length}</ArticleCount>
<Articles>`

	// get body
	let items = []
	articles.forEach(article=>{
		let{title="",desc="",picUrl="",url=""} = article
		items.push(newsItemTpl(article))
	})
	let body = items.join('\n')

	// get foot
	let foot = 
`</Articles>
</xml>`
	return [head,body,foot].join('\n')
}


export default newsTpl