import sha1 from 'sha1'
import getRawBody from 'raw-body'
import msgParser from '../xml/parser'
import formater from '../xml/formatter'
import {Exceptions,ExceptionHandler} from './Exception'

/**
 * middle ware
 * @param  {String} token [notice this token is for encrypt not access_token]
 * @return {async fn}       [middle ware]
 */
let WeConnector = (_token)=>{
	// return a middleware async fn
	const token = _token
	return async(ctx,next)=>{
		try{
			ctx.wechat = {}
			let{signature,timestamp,nonce,echostr} = ctx.query;
			if(!signature || !timestamp || ! nonce){
				// not from wechat
				throw new Exceptions.Unauthorized(`wrong signature`)
			}
			let sha = sha1([token,timestamp,nonce].sort().join(''))

			// get for wechat server test
			if(ctx.method==='GET'){
				if(sha === signature){
					ctx.body = echostr
					return
				}

				else{
					throw new Exceptions.Unauthorized(`wrong signature`)
				}
			}
			// post for logic layer
			else if(ctx.method==='POST'){
				if(sha!==signature){
					throw new Exceptions.Unauthorized(`wrong signature`)
				}
				// get rawData
				let rawData = await getRawBody(ctx.req,{
					length:ctx.length,
	                limit:'1mb',
	                encoding:ctx.charset
				})

				// parse xml
				let xmlData = await msgParser(rawData)

				// format xml
				let xml = formater(xmlData.xml)
				console.info("xml obj : ",xml)

				ctx.wechat.req = xml

				// handle the request
				await next()

				// handle error
				if(!ctx.wechat.res) throw new Exceptions.ImplementError(`Can't handle the request ${ctx.wechat.req}`)
				
				// reply xml
				ctx.status = 200
				ctx.type = 'application/xml'
				ctx.body = ctx.wechat.res
				
			}
		}
		catch(e){
			console.log(e)
			ctx.body = ExceptionHandler(e)
		}
	}
}

export default WeConnector