import {handler as defaultHandler} from '../handler/handler'

let WeHandler = (handler)=>{
	return async (ctx,next)=>{
		if(!ctx.wechat.req){
			return
		}
		else{
			// 获取客户端推来的xml请求
			let xml = ctx.wechat.req
			// 设置默认的handler
			if(!handler) handler = defaultHandler
			// 处理请求
			let res = await handler(xml)
			// 将处理结果挂载到ctx.wechat.res
			ctx.wechat.res = res
		}

		// await next()
	}
}
export {WeHandler}
export default WeHandler
