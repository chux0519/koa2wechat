let meta = {
	from:"from here",
	to:"to there",
	ts:new Date().getTime()
}
let textObj = {
	meta:meta,
	type:"text",
	content:"hello koa2wechat"
}
let imageObj = {
	meta:meta,
	type:'image',
	mediaId:"mediaId"
}
let voiceObj = {
	meta:meta,
	type:'voice',
	mediaId:"mediaId"
}
let videoObj = {
	meta:meta,
	type:'video',
	mediaId:"mediaId",
	title:"title",	//*
	desc:"desc"	//*
}
let musicObj = {
	meta:meta,
	type:'music',
	title:"title",	//*
	desc:"desc"	//*
}
// let res = new ReplyXML(textObj).getRes()
let builder = new ReplyXML()
let res1 = builder.genXML(textObj)
console.log("text : \n",res1)

let res2 = builder.genXML(imageObj)
console.log("image : \n",res2)

let res3 = builder.genXML(voiceObj)
console.log("voice : \n",res3)


let res4 = builder.genXML(videoObj)
console.log("video : \n",res4)
 
let res5 = builder.genXML(musicObj)
console.log("music : \n",res5)

let newsObj = {
	meta:meta,
	type:'news'
}
let res6 = builder.genXML(newsObj)
console.log("news : \n",res6)