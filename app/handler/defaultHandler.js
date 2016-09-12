import textTpl from '../xml/textTpl'

let defaultHandler = (xml)=>{
	// default to echo
	let rpl = {}
	rpl.ToUserName = xml.FromUserName
	rpl.FromUserName = xml.ToUserName
	rpl.Content = `I don't understand`
	rpl.CreateTime = new Date().getTime()
	return Promise.resolve(textTpl(rpl))
}

export default defaultHandler