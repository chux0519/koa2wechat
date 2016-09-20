import {textTpl,videoTpl,imageTpl,voiceTpl,musicTpl,newsTpl} from '../xml/templates'

const welcomeStr = 'https://github.com/chux0519'
class WeReply{

	/**
	 * [constructor]
	 * @param  {obj} rplObj必须包含meta（object）,type（string）属性，比如:
	 *      rplObj = {
	 *       			meta:{from:"",to:"",ts:new Date().getTime()},//meta必须包含from，to字段
	 *       			type:"text",//可以取值： text/image/voice/video/music/news 即回复的几种类型
	 *       			${key}:${value}//剩余字段根据类型不同选取不同方式
	 *        			}
	 * 
	 * @return {String}        [xml string]
	 */
	constructor(rplObj){
		this.rplXml = {}
		this.ret = {}
		if(rplObj) this.init(rplObj)
	}

	genXML(rplObj){
		this.init(rplObj)
		return this.getRes()
	}

	init(rplObj){
		this.rplXml = {}
		this.ret = {}
		if (!this.getMeta(rplObj)){
			console.log("error!please correct the meta data")
			return ''
		}
		if(!rplObj.type) console.log("type is undefined in : ",rplObj)
		let type = rplObj.type
		this.rplXml.type = type
		switch(type){
			case 'text':
				this._initText(rplObj)
				break
			case 'image':
				this._initImage(rplObj)
				break
			case 'voice':
				this._initVoice(rplObj)
				break
			case 'video':
				this._initVideo(rplObj)
				break
			case 'music':
				this._initMusic(rplObj)
				break
			case 'news':
				this._initNews(rplObj)
				break
			default:
				{
					console.log(`type : ${type} is not supported,return default xml`)
					this._initText({type:'text',content:welcomeStr})
				}
		}
	}

	getRes(){
		return this.ret
	}

	getMeta(rplObj){
		let {meta} = rplObj
		if( !meta.hasOwnProperty('from') || !meta.hasOwnProperty('to')) return false
		this.rplXml.from = meta.from
		this.rplXml.to = meta.to
		this.rplXml.ts = meta.ts || new Date().getTime()
		return true
	}

	_initText(rplObj){
		if(!rplObj.content || (typeof rplObj.content)!=='string' ) this.rplXml.content = welcomeStr
		this.rplXml.content = rplObj.content
		this.ret = textTpl(this.rplXml)
	}

	_initImage(rplObj){
		if(!rplObj.mediaId){
			console.log("can't find `mediaId` in : ",rplObj)
			return ''
		}
		this.rplXml.mediaId = rplObj.mediaId
		this.ret = imageTpl(this.rplXml)
	}

	_initVoice(rplObj){
		if(!rplObj.mediaId){
			console.log("can't find `mediaId` in : ",rplObj)
			return ''
		}
		this.rplXml.mediaId = rplObj.mediaId
		this.ret = voiceTpl(this.rplXml)
	}


	_initVideo(rplObj){
		if(!rplObj.mediaId){
			console.log("can't find `mediaId` in : ",rplObj)
			return ''
		}
		let {mediaId,title="no title",desc="no description"} = rplObj
		this.rplXml.mediaId = mediaId
		this.rplXml.title = title
		this.rplXml.desc = desc
		this.ret = videoTpl(this.rplXml)
	}

	_initMusic(rplObj){
		let {
			title="music title",
			desc="music description",
			musicUrl="muscic url",
			HQUrl="HQ music url",
			thumb="thumb mediaId"
		} = rplObj
		this.rplXml.title = title
		this.rplXml.desc = desc
		this.rplXml.musicUrl = musicUrl
		this.rplXml.HQUrl = HQUrl
		this.rplXml.thumb = thumb
		this.ret = musicTpl(this.rplXml)
	}

	_initNews(rplObj){
		let {articles=[{}]} = rplObj
		this.rplXml.articles = articles
		this.ret = newsTpl(this.rplXml)
	}

}

export default WeReply