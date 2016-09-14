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
│   ├── handler
│   │   ├── defaultHandler.js
│   │   └── handler.js
│   ├── index.js
│   ├── wechat
│   │   ├── Loader.js
│   │   └── Wechat.js
│   └── xml
│       ├── formatter.js
│       ├── parser.js
│       ├── templates
│       │   ├── imageTpl.js
│       │   ├── musicTpl.js
│       │   ├── newsTpl.js
│       │   ├── textTpl.js
│       │   ├── videoTpl.js
│       │   └── voiceTpl.js
│       └── templates.js
├── package.json
├── readme.en.md（英文版的readme）
├── readme.md（说明）
├── server.js（示例koa服务）
├── src（源码）
│   ├── handler（handler）
│   │   ├── defaultHandler.js（默认的handler）
│   │   └── handler.js
│   ├── index.js（主文件）
│   ├── wechat（微信相关）
│   │   ├── Loader.js（wLoader函数，返回aync函数作为koa2的中间件）
│   │   ├── Reply.js（ReplyBuilder类，用于构建相应的xml字符串）
│   │   ├── token.txt（用于维护access_token，存储到本地）
│   │   └── Wechat.js（微信介入相关，Wechat类）
│   └── xml（xml解析拼凑相关）
│       ├── formatter.js（xml2js后格式化为object的文件）
│       ├── parser.js（xml2js解析xml文件）
│       ├── templates（回复模板）
│       │   ├── imageTpl.js
│       │   ├── musicTpl.js
│       │   ├── newsItemTpl.js
│       │   ├── newsTpl.js
│       │   ├── textTpl.js
│       │   ├── videoTpl.js
│       │   └── voiceTpl.js
│       └── templates.js（导出所有模板）
└── test（测试）
    ├── mocha.opts（mocha选项）
    ├── ReplyBuilder.js（reply测试/未完成）
    └── templates.js（template测试/未完成）
```
