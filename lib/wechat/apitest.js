'use strict';

var _WechatApi = require('./WechatApi');

var _WechatApi2 = _interopRequireDefault(_WechatApi);

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wechatapi = new _WechatApi2.default(_config.weconfig);

// 上传临时素材-thumb
// wechatapi
// .uploadTemp('thumb',__dirname + '/../../test/logo.png')
// .then(response=>console.log(response.data))
// .catch(e=>{console.log(e)})

// 上传临时素材 voice
// server error 猜想并不支持amr格式
// wechatapi
// .uploadTemp('voice',__dirname + '/../../material/voice.amr')
// .then(response=>console.log(response.data))
// .catch(e=>{console.log(e)})

// 上传临时素材 video
// { type: 'video',
//   media_id: 'u5wuHcNGTjqIFwilRkn4k6vX9tBNIQJjzwhKQRvFcXatE0NDCbXM2mU2ceUB86cT',
//   created_at: 1474353546 }
//   AAYjdrUc-1H9eggJWMD53jxqgY2GLetwiwJ_uR64jhKY38Cc8U8-Bp5bFWWJPzg0
// wechatapi
// .uploadTemp('video',__dirname + '/../../material/gf.mp4')
// .then(response=>console.log(response.data))
// .catch(e=>{console.log(e)})


// 下载临时素材
// 视频只支持http协议
// let mediaId = 'AAYjdrUc-1H9eggJWMD53jxqgY2GLetwiwJ_uR64jhKY38Cc8U8-Bp5bFWWJPzg0'
// wechatapi
// .downloadTemp(mediaId,__dirname + '/../../material',true)
// .then(filename=>{
// 	console.log(`==>${filename} downloaded!`)
// })
// .catch(e=>console.log(e))

// 上传永久素材-news 注意 articles 长度<=8
// { media_id: 'LnFqDNEdJXP8Mt8lfcrKcsQ7QsxUDgVa_23horR0Hi0' }
// { media_id: 'LnFqDNEdJXP8Mt8lfcrKcs0O5KWbohXDMa_Lb3CwPn4' }
// let thumb_media_id = 'LnFqDNEdJXP8Mt8lfcrKcipoGRdbxawd5iF-4CoBjRk'
// let articles = [{
//        "title": 'logo',
//        "thumb_media_id": thumb_media_id,
//        "author": "徐涌盛",
//        "digest": "digest",
//        "show_cover_pic": 1,
//        "content": "这里是内容1",
//        "content_source_url": "https://github.com/chux0519"
//     },
//     {
//        "title": 'logo2',
//        "thumb_media_id": thumb_media_id,
//        "author": "徐涌盛",
//        "digest": "digest2",
//        "show_cover_pic": 1,
//        "content": "这里是内容2",
//        "content_source_url": "https://github.com/chux0519"
//     }]
// wechatapi.uploadNews(articles)
// .then(response=>{
// 	console.log(response.data)
// })
// .catch(e=>console.log(e))


// 上传永久素材-thumb
// { media_id: 'LnFqDNEdJXP8Mt8lfcrKcipoGRdbxawd5iF-4CoBjRk', // url: 'http://mmbiz.qpic.cn/mmbiz_png/oruMlMibbW0fpyNFohCUlhZNCFzyLdI1MqnZB3ib69AMwaniaRf8lK0Av3cyvSZxneFKL8cLca67JShM4Wz1ibXjsQ/0?wx_fmt=png' }

// wechatapi
// .uploadPerm('thumb',__dirname + '/../../test/logo.png')
// .then(response=>console.log(response.data))
// .catch(e=>{console.log(e)})

// 上传永久素材-image
// { media_id: 'LnFqDNEdJXP8Mt8lfcrKctnwaBVhh1Zq7VoRaBEOZN8',
// url: 'http://mmbiz.qpic.cn/mmbiz_png/oruMlMibbW0fpyNFohCUlhZNCFzyLdI1MqnZB3ib69AMwaniaRf8lK0Av3cyvSZxneFKL8cLca67JShM4Wz1ibXjsQ/0?wx_fmt=png' }

// wechatapi
// .uploadPerm('image',__dirname + '/../../test/logo.png')
// .then(response=>console.log(response.data))
// .catch(e=>{console.log(e)})


// 上传永久素材-video
// { media_id: 'LnFqDNEdJXP8Mt8lfcrKckzvFfJcIuHQNWv039vuqZA' }
// let videoDesc = {
//   "title":"VIDEO_TITLE",
//   "introduction":"INTRODUCTION"
// }
// wechatapi
// .uploadPerm('video',__dirname + '/../../material/gf.mp4',videoDesc)
// .then(response=>console.log(response.data))
// .catch(e=>{console.log(e)})

// 上传永久素材-voice
// server err
// wechatapi
// .uploadPerm('voice',__dirname + '/../../material/voice.amr')
// .then(response=>console.log(response.data))
// .catch(e=>{console.log(e)})


// 下载永久素材-articles
// let mediaId = 'LnFqDNEdJXP8Mt8lfcrKcsQ7QsxUDgVa_23horR0Hi0'
// wechatapi.downloadPerm('news',mediaId,'./')
// .then(response=>{
// 	if(response.data)
// 		console.log(response.data)
// 	else
// 		console.log(response)
// })
// .catch(e=>console.log(e))

// 下载永久素材-video
// let mediaId = 'LnFqDNEdJXP8Mt8lfcrKckzvFfJcIuHQNWv039vuqZA'
// wechatapi.downloadPerm('video',mediaId,__dirname + '/../../material')
// .then(response=>{
// 	if(response.data)
// 		console.log(response.data)
// 	else
// 		console.log(response)
// })
// .catch(e=>console.log(e))

// 下载永久素材-image
// 测试号测试时有问题，文件会莫名其妙大几百b
// curl和axios下载的结果相同，初步认为是微信服务器/或者是测试号的原因
// let mediaId = 'LnFqDNEdJXP8Mt8lfcrKctnwaBVhh1Zq7VoRaBEOZN8'

// wechatapi.downloadPerm('thumb',mediaId,__dirname + '/../../material')
// .then(response=>{
// 	if(response.data)
// 		console.log(response.data)
// 	else
// 		console.log(response)
// })
// .catch(e=>console.log(e))


// 删除永久素材
// wechatapi.removePerm("123456")
// .then(msg=>console.log(msg))
// .catch(e=>console.log(e))

// 更改永久图文消息 
// let mediaId = 'LnFqDNEdJXP8Mt8lfcrKcsQ7QsxUDgVa_23horR0Hi0'
// // 不能改变已经放上去图文素材的长度 index<length
// let index = 0
// let article = {
//        "title": "这里是更新后的标题",
//        "thumb_media_id": 'LnFqDNEdJXP8Mt8lfcrKcipoGRdbxawd5iF-4CoBjRk',
//        "author": "徐涌盛",
//        "digest": "",
//        "show_cover_pic": 1,
//        "content": "这里是内容",
//        "content_source_url": "https://github.com/chux0519"
//     }
// wechatapi.updateNews(mediaId,index,article)
// .then(msg=>console.log(msg))
// .catch(e=>console.log(e))

// 获取永久素材条数 
// { voice_count: 0, video_count: 4, image_count: 5, news_count: 1 }
// wechatapi.getPermCount()
// .then(response=>console.log(response.data))
// .catch(e=>console.log(e))

// 批量获取永久素材
// wechatapi.batchGetPerm("image",0,5)
// .then(response=>console.log(response.data))
// .catch(e=>console.log(e))