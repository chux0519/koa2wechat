import Koa from 'koa'
import sha1 from 'sha1'
import config from './config'
import Loader from './wechat/Loader'
import handler from './handler/handler'

const app = new Koa()


app.use(Loader(config,handler))

app.listen(3000)