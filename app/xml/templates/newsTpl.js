// `<xml>
// <ToUserName><![CDATA[toUser]]></ToUserName>
// <FromUserName><![CDATA[fromUser]]></FromUserName>
// <CreateTime>12345678</CreateTime>
// <MsgType><![CDATA[news]]></MsgType>
// <ArticleCount>2</ArticleCount>
// <Articles>
// <item>
// <Title><![CDATA[title1]]></Title> 
// <Description><![CDATA[description1]]></Description>
// <PicUrl><![CDATA[picurl]]></PicUrl>
// <Url><![CDATA[url]]></Url>
// </item>
// <item>
// <Title><![CDATA[title]]></Title>
// <Description><![CDATA[description]]></Description>
// <PicUrl><![CDATA[picurl]]></PicUrl>
// <Url><![CDATA[url]]></Url>
// </item>
// </Articles>
// </xml> `

// *
//  * news template
//  * @param  {Obj} msg ,for example:
//  *  {
//  *   ToUserName:"ToUserName",
//  *   FromUserName:"FromUserName",
//  *   CreateTime:12345678,
//  *   Articles:[
//  *   			{
//  *   				
//  *    	 		},
//  *   
//  *   		]
//  *       
//  *       }
//  * 
//  * @return {[type]}     [description]
 
// let newsTpl = (msg)=>{
// 	let{
// 		ToUserName,
// 		FromUserName,
// 		CreateTime,
// 	} = msg
// 	let retStr =
// 	`<xml>
// 	<ToUserName><![CDATA[${ToUserName}]]></ToUserName>
// 	<FromUserName><![CDATA[${FromUserName}]]></FromUserName>
// 	<CreateTime>${CreateTime}</CreateTime>
// 	<MsgType><![CDATA[video]]></MsgType>
// 	<Video>
// 	<MediaId><![CDATA[${MediaId}]]></MediaId>
// 	<Title><![CDATA[${Title}]]></Title>
// 	<Description><![CDATA[${Description}]]></Description>
// 	</Video> 
// 	</xml>`
// 	return retStr
// }

let newsTpl = ''

export default newsTpl