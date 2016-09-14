import Koa from 'koa'

// middle ware
import {WeConnector,WeHandler} from './src/index'
// util class
import {Wechat,WeReply} from './src/index'

import {weconfig} from './config'

const app = new Koa()
const wechat = new Wechat(weconfig)

app
// connect and reply
.use(WeConnector(weconfig.token))
// handle and gen response xml string
.use(WeHandler(null))

app.listen(3000,()=>{
	console.log('Listening on port 3000')
})