import Koa from 'koa'
import config from './config'
import {Wechat,wLoader,wTpls} from './app/index'

const app = new Koa()

app.use(wLoader(config.wechat,null))

app.listen(3000)