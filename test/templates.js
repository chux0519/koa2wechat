import chai from 'chai'
import textTpl from '../src/xml/templates/textTpl'
import imageTpl from '../src/xml/templates/imageTpl'
import voiceTpl from '../src/xml/templates/voiceTpl'
import videoTpl from '../src/xml/templates/videoTpl'
import musicTpl from '../src/xml/templates/musicTpl'
import newsTpl from '../src/xml/templates/newsTpl'

chai.should()

describe('wTpl Test', function() {

  describe('textTpl fn', function() {

    it('should return formatted xml when the input is textMsg', ()=> {
		let msg = {
			FromUserName:'FromUserName',
			ToUserName:'ToUserName',
			CreateTime:new Date().getTime(),
			Content:'Content'
		}
		let{
			ToUserName,
			FromUserName,
			CreateTime,
			Content
		} = msg
		let correct = 
	`<xml>
	<ToUserName><![CDATA[${ToUserName}]]></ToUserName>
	<FromUserName><![CDATA[${FromUserName}]]></FromUserName>
	<CreateTime>${CreateTime}</CreateTime>
	<MsgType><![CDATA[text]]></MsgType>
	<Content><![CDATA[${Content}]]></Content>
	</xml>`
		let result = textTpl(msg)
		result.should.equal(correct)
    });

  });

  describe('imageTpl fn', function() {

    it('should return formatted xml when the input is imageMsg', ()=> {
		let msg = {
			FromUserName:'FromUserName',
			ToUserName:'ToUserName',
			CreateTime:new Date().getTime(),
			Content:'Content'
		}
		let{
			ToUserName,
			FromUserName,
			CreateTime,
			Content
		} = msg
		let correct = 
	`<xml>
	<ToUserName><![CDATA[${ToUserName}]]></ToUserName>
	<FromUserName><![CDATA[${FromUserName}]]></FromUserName>
	<CreateTime>${CreateTime}</CreateTime>
	<MsgType><![CDATA[text]]></MsgType>
	<Content><![CDATA[${Content}]]></Content>
	</xml>`
		let result = textTpl(msg)
		result.should.equal(correct)
    });

  });

});
