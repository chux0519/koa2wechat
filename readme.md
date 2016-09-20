#koa2wechat

简单的微信公众平台接入中间件（koa2）

#####环境依赖
node v4.4.4+
npm v3.10.6
babel v6.14.0

#####实现功能
- 根据配置自动接入公众号
- 默认自动回复文本消息
- 支持自定义规则，进行自动回复（包括文本，图片，音乐，小视频，视频，图文类型）

#####快速开始
1.安装
```javascript
    npm install koa2wechat
```
2.引入模块（模块导出{Wechat,WeConnector,WeHandler,WeReply}，下文详细介绍）
```javascript
    import Koa from 'koa2'
    // 这两个是koa2中间件
    import {WeConnector,WeHandler} from './src/index'
```
3.引入配置文件
```javascript
    import {weconfig} from './config'
    // 或者 import config from './config'
    // let weconfig = config.weconfig
```
   配置文件示例：config.example.js
```javascript
    let config = {
    	weconfig:{
    		local_token_path:__dirname + '/src/token.txt',
    		appid:"your app id",
    		secret:"your secret",
    		token:"your token for encrypt"
    	}
    }

    export const {weconfig} = config
    export default config
```
4.装载中间件、启动服务
```javascript
    const app = new Koa()
    app
    // WeConnector可以使用 用户自定义的token 接入微信平台
    .use(WeConnector(weconfig.token))
    // 接入后，WeHandler 处理用户请求 这里的参数是根据业务逻辑编写的代码，具体看下面的介绍
    .use(WeHandler(null))
    app.listen(3000)
```
   此时公众号会默认自动回复文本消息，若要自定义规则需要将上面的null替换为根据业务逻辑写出的handler
   至此，之用到了4个模块中的2个模块，实际{WeConnector,WeHandler}这两个模块是koa2中间件
   剩下的{Wechat,WeReply}则是用于操作微信后台的工具类

5.根据业务逻辑自定义handler，要特别注意的是，handler一定要返回一个Promise或者它是一个Promise
    例如：/src/handler/defaultHandler.js

```javascript
    import {WeReply} from '../index'
    // WeReply 是一个类，用于创建各类返回信息，生成对应的xml字符串
    const welcomeMsg = 'hello from koa2wechat'

    // 返回一个Promise对象
    let defaultHandler = (xml)=>{
      // 获取来源FromUserName，在回复信息中将其设置为目的地 `to`
      // 获取我们公众号的标识ToUserName，在回复信息中将其设置为发送地 `from`
      let {FromUserName,ToUserName} = xml

      // 这里可以插入需要执行的业务逻辑代码，比如判断消息来源是谁，他回复了什么类型的数据之类的


      // 实例化weReply
      let weReply = new WeReply()

      // 生成回复将会使用到的meta信息，包括 本机`from`， 目标`to`， 时间戳`ts`（时间戳非必选项）
      let meta = {from:ToUserName,to:FromUserName,ts:new Date().getTime()}
      // 回复文本类型的数据，要构造选项`type` 和 回复内容`content` 以及上面获取的 meta 信息
      // 更多类型的数据在下面会提供
      let textRpl = {
        meta:meta,
        type:"text",
        content:welcomeMsg
      }
      // 传入回复选项，生成相应的xml字符串
      let rpl = weReply.genXML(textRpl)
      // 把Promise 返回回去
      return Promise.resolve(rpl)
    }

    export default defaultHandler

```
推荐方式
随着业务逻辑的复杂度增加，可以考虑使用一个handler来分发各个事件的handler来实现响应。比如实现一个handler
例如：src/handler/handler.js 配合上文的defaultHandler
```javascript
    import defaultHandler from './defaultHandler'

    /**
     * 示例 handler
     * @param  {obj} xml , 根据微信服务器推送的xml数据转化的Object，譬如，
     *      当接收到文本信息的时候，xml为:
     *        {
     *          ToUserName:"",
     *          FromUserName:"",
     *          CreateTime:12345678,
     *          MsgType:"text",
     *          Content:"this is a test",
     *          MsgId:1234567890123456
     *        }
     *      接收到图片信息的时候为：
     *        {
     *          ToUserName:"",
     *          FromUserName:"",
     *          CreateTime:12345678,
     *          MsgType:"image",
     *          PicUrl:"",
     *          MediaId:"",
     *          MsgId:1234567890123456
     *        }
     *  其他类型同理，具体信息参考 http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
     * @return {Promise}     [一定记得返回Promise对象]
     */
    let handler = (xml)=>{
        let {MsgType} = xml
        if(!MsgType) return
        switch(MsgType){
            // 下面定义了客户端可能的几种请求（应该是全部包含了的）
            // 订阅的时候会触发'event'
            case 'event':
            // 客户端发送文字/图片/语音/视频/小视频/地址/链接时，MsgType的相应值，可以参考
            // http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
            case 'text':
            case 'image':
            case 'voice':
            case 'video':
            case 'shortvideo':
            case 'location':
            case 'link':
            default:
            // 这里的defaultHandler是一个Promise对象
                return defaultHandler(xml)
        }
    }
    export {handler}
    export default handler
```
然后再将handler引入，将第4步中的null替换为handler即可
其实，到这里为止，我们一直没有用到Wechat对象，是因为，微信公众号有不同的类型
参考：[官方文档](http://mp.weixin.qq.com/wiki/7/2d301d4b757dedc333b9a9854b457b47.html)
（未认证订阅号	微信认证订阅号	未认证服务号	微信认证服务号）
不同类型的号，有不同的权限，譬如对素材的管理，用户的管理，等等。
所有的操作都涉及到access_token，而Wechat类的核心就是要维护access_token，
现在的Wechat类，只简单实现了对access_token的维护,
因此有需要的开发者可以自行实现在这个基础之上，自己需要的功能，譬如素材上传，对象分组等等。

6.示例程序在这里：

#####结构说明：
```
├── config.example.js（配置文件示例）
├── lib（编译后的文件）
│   ├── handler
│   │   ├── defaultHandler.js
│   │   └── handler.js
│   ├── index.js
│   ├── wechat
│   │   ├── Loader.js
│   │   └── Wechat.js
│   └── xml
│       ├── formatter.js
│       ├── parser.js
│       ├── templates
│       │   ├── imageTpl.js
│       │   ├── musicTpl.js
│       │   ├── newsTpl.js
│       │   ├── textTpl.js
│       │   ├── videoTpl.js
│       │   └── voiceTpl.js
│       └── templates.js
├── package.json
├── readme.en.md（英文版的readme）
├── readme.md（说明）
├── server.js（示例koa服务）
├── src（源码）
│   ├── handler（handler）
│   │   ├── defaultHandler.js（默认的handler）
│   │   └── handler.js
│   ├── index.js（主文件）
│   ├── wechat（微信相关）
│   │   ├── Loader.js（wLoader函数，返回aync函数作为koa2的中间件）
│   │   ├── Reply.js（ReplyBuilder类，用于构建相应的xml字符串）
│   │   ├── token.txt（用于维护access_token，存储到本地）
│   │   └── Wechat.js（微信介入相关，Wechat类）
│   └── xml（xml解析拼凑相关）
│       ├── formatter.js（xml2js后格式化为object的文件）
│       ├── parser.js（xml2js解析xml文件）
│       ├── templates（回复模板）
│       │   ├── imageTpl.js
│       │   ├── musicTpl.js
│       │   ├── newsItemTpl.js
│       │   ├── newsTpl.js
│       │   ├── textTpl.js
│       │   ├── videoTpl.js
│       │   └── voiceTpl.js
│       └── templates.js（导出所有模板）
└── test（测试）
    ├── mocha.opts（mocha选项）
    ├── ReplyBuilder.js（reply测试/未完成）
    └── templates.js（template测试/未完成）
```
###更新
2016-09-20-------------------增加新类WechatApi(实现素材上传下载接口)
导出接口：
```javascript
	/**
	 * [uploadTemp 用于上传临时素材]
	 * @param  {[string]} type      [媒体文件类型，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）]
	 * @param  {[string]} mediaPath [文件全路径，例如‘../../test.jpg’]
	 * @return {[Promise]}           [返回一个网络请求Promise]
	 */
     uploadTemp(type,mediaPath)

	/**
	 * [downloadTemp 下载临时素材]
	 * @param  {[string]} mediaId   [参数]
	 * @param  {[string]} directory [存储素材目录]
	 * @return {[promise]}           [成功将resolve已下载的素材名]
	 */
	downloadTemp(mediaId,directory,isVideo=false)
    
	/**
	 * [uploadNews 上传永久素材--图文]
	 * @param  {[object]} articles 详细字段参考：http://mp.weixin.qq.com/wiki/10/10ea5a44870f53d79449290dfd43d006.html
	 * 例如  {
	 *        "title": TITLE,
	 *        "thumb_media_id": THUMB_MEDIA_ID,
	 *        "author": AUTHOR,
	 *        "digest": DIGEST,
	 *        "show_cover_pic": SHOW_COVER_PIC(0 / 1),
	 *        "content": CONTENT,
	 *        "content_source_url": CONTENT_SOURCE_URL
	 *      }
	 * @return {[Promise]}          [axios Post]
	 */
	uploadNews(articles)
    
	/**
	 * [uploadPerm 上传除了图文类型的其他永久素材]
	 * @param  {[string]} type      [媒体文件类型，分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）]
	 * @param  {[string]} mediaPath [目标文件路径]
	 * @param  {[object]} videoDesc [只有上传类型为‘video’才需要，例如：
	 * {
	 * 		"title":VIDEO_TITLE,
	 * 		"introduction":INTRODUCTION
	 * 	}					  						  
	 * @return {[Promise]}           [axios POST]
	 */
	uploadPerm(type,mediaPath,videoDesc)
    
	/**
	 * [downloadPerm 下载永久素材]
	 * @param  {[string]} type      [如果要获取图文，则填写（news），获取视频填写（video），获取图片（image）、语音（voice）和缩略图（thumb）]
	 * @param  {[string]} mediaId   [media_id]
	 * @param  {[存储在本地的目录]} directory [图文直接返回字符串，不会写入本地]
	 * @return {[Promise]}           [获取图文最终返回json，其他多媒体类型最终返回文件名]
	 */
	downloadPerm(type,mediaId,directory)
    
	/**
	 * [removePerm 删除永久素材]
	 * @param  {[string]} mediaId [media_id]
	 * @return {[Promise]}         [最终返回json{status:true,item:form}，status代表是否删除成功。item为post的内容，如果不成功可以缓存下来]
	 */
	removePerm(mediaId)
    
	/**
	 * [updateNews 更新永久图文素材] 具体参数意义请参考：http://mp.weixin.qq.com/wiki/10/c7bad9a463db20ff8ccefeedeef51f9e.html
	 * @param  {[string]} mediaId [media_id]
	 * @param  {[int]} index   [index]
	 * @param  {[object]} article [article]
	 * @return {[type]}         [最终返回json{status:true,item:form}，status代表是否删除成功。item为post的内容，如果不成功可以缓存下来]
	 */
	updateNews(mediaId,index,article)
    
	/**
	 * [getPermCount 获取永久素材类型和个数]
	 * @return {[Promise]} 最终返回json，形如
	 * {
	 *	  "voice_count":COUNT,
	 *	  "video_count":COUNT,
	 *	  "image_count":COUNT,
	 *	  "news_count":COUNT
	 * }
	 */
	getPermCount()
    
	/**
	 * [batchGetPerm 批量获取某类型的永久素材信息]
	 * @param  {[string]} type   [素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）]
	 * @param  {[int]} offset [从全部素材的该偏移位置开始返回，0表示从第一个素材 返回]
	 * @param  {[int]} count  [返回素材的数量，取值在1到20之间]
	 * @return {[Promise]}        [最终返回参数请参考：http://mp.weixin.qq.com/wiki/15/8386c11b7bc4cdd1499c572bfe2e95b3.html]
	 */
	batchGetPerm(type,offset,count)
```

使用方法：
```javascript
// weconfig 和 新建Wechat对象的weconfig格式相同
let wechatapi = new WechatApi(weconfig)

// 上传临时素材-thumb
wechatapi
.uploadTemp('thumb',__dirname + '/../../test/logo.png')
.then(response=>console.log(response.data))
.catch(e=>{console.log(e)})

// 上传临时素材 voice
// server error 猜想并不支持amr格式
wechatapi
.uploadTemp('voice',__dirname + '/../../material/voice.amr')
.then(response=>console.log(response.data))
.catch(e=>{console.log(e)})

// 上传临时素材 video
wechatapi
.uploadTemp('video',__dirname + '/../../material/gf.mp4')
.then(response=>console.log(response.data))
.catch(e=>{console.log(e)})


// 下载临时素材
// 视频只支持http协议
wechatapi
.downloadTemp(mediaId,__dirname + '/../../material',true)
.then(filename=>{
	console.log(`==>${filename} downloaded!`)
})
.catch(e=>console.log(e))

// 上传永久素材-news 注意 articles 长度<=8
let thumb_media_id = 'LnFqDNEdJXP8Mt8lfcrKcipoGRdbxawd5iF-4CoBjRk'
let articles = [{
       "title": 'logo',
       "thumb_media_id": thumb_media_id,
       "author": "徐涌盛",
       "digest": "digest",
       "show_cover_pic": 1,
       "content": "这里是内容1",
       "content_source_url": "https://github.com/chux0519"
    },
    {
       "title": 'logo2',
       "thumb_media_id": thumb_media_id,
       "author": "徐涌盛",
       "digest": "digest2",
       "show_cover_pic": 1,
       "content": "这里是内容2",
       "content_source_url": "https://github.com/chux0519"
    }]
wechatapi.uploadNews(articles)
.then(response=>{
	console.log(response.data)
})
.catch(e=>console.log(e))


// 上传永久素材-thumb
wechatapi
.uploadPerm('thumb',__dirname + '/../../test/logo.png')
.then(response=>console.log(response.data))
.catch(e=>{console.log(e)})

// 上传永久素材-image
wechatapi
.uploadPerm('image',__dirname + '/../../test/logo.png')
.then(response=>console.log(response.data))
.catch(e=>{console.log(e)})


// 上传永久素材-video
wechatapi
.uploadPerm('video',__dirname + '/../../material/gf.mp4',videoDesc)
.then(response=>console.log(response.data))
.catch(e=>{console.log(e)})

// 上传永久素材-voice
wechatapi
.uploadPerm('voice',__dirname + '/../../material/voice.amr')
.then(response=>console.log(response.data))
.catch(e=>{console.log(e)})


// 下载永久素材-articles
let mediaId = 'LnFqDNEdJXP8Mt8lfcrKcsQ7QsxUDgVa_23horR0Hi0'
wechatapi.downloadPerm('news',mediaId,'./')
.then(response=>{
	if(response.data)
		console.log(response.data)
	else
		console.log(response)
})
.catch(e=>console.log(e))

// 下载永久素材-video
let mediaId = 'LnFqDNEdJXP8Mt8lfcrKckzvFfJcIuHQNWv039vuqZA'
wechatapi.downloadPerm('video',mediaId,__dirname + '/../../material')
.then(response=>{
	if(response.data)
		console.log(response.data)
	else
		console.log(response)
})
.catch(e=>console.log(e))

// 下载永久素材-image
// 测试号测试时有问题，文件会莫名其妙大几百b
// curl和axios下载的结果相同，初步认为是微信服务器/或者是测试号的原因
let mediaId = 'LnFqDNEdJXP8Mt8lfcrKctnwaBVhh1Zq7VoRaBEOZN8'

wechatapi.downloadPerm('thumb',mediaId,__dirname + '/../../material')
.then(response=>{
	if(response.data)
		console.log(response.data)
	else
		console.log(response)
})
.catch(e=>console.log(e))


// 删除永久素材
wechatapi.removePerm("123456")
.then(msg=>console.log(msg))
.catch(e=>console.log(e))

// 更改永久图文消息 
let mediaId = 'LnFqDNEdJXP8Mt8lfcrKcsQ7QsxUDgVa_23horR0Hi0'
// 不能改变已经放上去图文素材的长度 index<length
let index = 0
let article = {
       "title": "这里是更新后的标题",
       "thumb_media_id": 'LnFqDNEdJXP8Mt8lfcrKcipoGRdbxawd5iF-4CoBjRk',
       "author": "徐涌盛",
       "digest": "",
       "show_cover_pic": 1,
       "content": "这里是内容",
       "content_source_url": "https://github.com/chux0519"
    }
wechatapi.updateNews(mediaId,index,article)
.then(msg=>console.log(msg))
.catch(e=>console.log(e))

// 获取永久素材条数 
{ voice_count: 0, video_count: 4, image_count: 5, news_count: 1 }
wechatapi.getPermCount()
.then(response=>console.log(response.data))
.catch(e=>console.log(e))

// 批量获取永久素材
wechatapi.batchGetPerm("image",0,5)
.then(response=>console.log(response.data))
.catch(e=>console.log(e))
```