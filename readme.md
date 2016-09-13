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
1. 安装
```javascript
    npm install koa2wechat
```
2. 引入模块（默认导出{Wechat,wLoader,ReplyBuilder}，下文详细介绍）
```javascript
    import {wLoader} from 'koa2wechat'
    import Koa from 'koa2'
```
3. 引入配置文件
```javascript
    import config from './config'
```
   配置文件示例：config.example.js
```javascript
    let config = {
        wechat:{
            local_token_path:__dirname + '/src/token.txt',
            appid:"your app id",
            secret:"your secret"
        }
    }

    export const {wechat} = config
    export default config
```
4. 装载中间件、启动服务
```javascript
    const app = new Koa()
    app.use(wLoader(config.wechat,null))
    app.listen(3000)
```
   此时公众号会默认自动回复文本消息，若要自定义规则需要将上面的null替换为根据业务逻辑写出的handler

5. 根据业务逻辑自定义handler

    例如：/src/handler/defaultHandler.js
    
```javascript
    import {ReplyBuilder} from 'koa2wechat'
    // ReplyBuilder是一个类，用于创建各类返回信息，生成对应的xml字符串
    const welcomeMsg = 'hello from koa2wechat'

    // 返回一个Promise对象
    let defaultHandler = (xml)=>{
        // 获取来源FromUserName，在回复信息中将其设置为目的地 `to`
        // 获取我们公众号的标识ToUserName，在回复信息中将其设置为发送地 `from`
        let {FromUserName,ToUserName} = xml

        // 这里可以插入需要执行的业务逻辑代码，比如判断消息来源是谁，他回复了什么类型的数据之类的


        // 实例化builder
        let replyBuilder = new ReplyBuilder()

        // 生成回复将会使用到的meta信息，包括 本机`from`， 目标`to`， 时间戳`ts`（时间戳非必选项）
        let meta = {from:ToUserName,to:FromUserName,ts:new Date().getTime()}
        // 回复文本类型的数据，要构造选项`type` 和 回复内容`content` 以及上面获取的 meta 信息
        let textRpl = {
            meta:meta,
            type:"text",
            content:welcomeMsg
        }
        // 传入回复选项，生成相应的xml字符串
        let rpl = replyBuilder.genXML(textRpl)
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
        // more about MsgType: http://mp.weixin.qq.com/wiki/17/f298879f8fb29ab98b2f2971d42552fd.html
        switch(MsgType){
            // 订阅的时候会触发'event'
            case 'event':
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

7.示例程序在这里：

#####结构说明：

