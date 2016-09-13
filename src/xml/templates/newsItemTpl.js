let newsItemTpl = (article)=>{
	let{
		title="default title",
		desc="default description",
		picUrl="default pic url",
		url="default origin url"
	} = article
	let ret = ''
	ret = 
`<item>
<Title><![CDATA[${title}]]></Title>
<Description><![CDATA[${desc}]]></Description>
<PicUrl><![CDATA[${picUrl}]]></PicUrl>
<Url><![CDATA[${url}]]></Url>
</item>`
	return ret
}

export default newsItemTpl