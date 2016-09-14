import {handler as defaultHandler} from '../handler/handler'

let WeHandler = (handler)=>{
	return async (ctx,next)=>{
		if(!ctx.wechat.req) console.log("no request from client")
		let xml = ctx.wechat.req
		if(!handler) handler = defaultHandler

		let res = await handler(xml)
		ctx.wechat.res = res

		await next()
	}
}
export {WeHandler}
export default WeHandler
