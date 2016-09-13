import axios from 'axios'
import fs from 'fs'


const readFile = (path) => {
	return new Promise((resolve,reject)=>{
		fs.readFile(path,'utf8',(err,data) =>{
			if(err) reject(err)
			resolve(data)
		})
	})
}

const writeFile = (token,path)=> {
	return new Promise((resolve,reject)=>{
		fs.writeFile(path,token,(err)=>{
			if(err) reject(err)
			else {
				console.log("saved new token:",token)
				resolve(token)
			}
		})
	})
}

class Wechat{

	constructor(config){
		this.appid = config.appid
		this.secret = config.secret
		this.localTokenPath = config.local_token_path
		this.baseUrl = 'https://api.weixin.qq.com/cgi-bin/'
		this.tokenUrl = this.baseUrl + 
		`token?grant_type=client_credential&appid=${config.appid}&secret=${config.secret}`
		this.getToken().then(token=>console.log("ok"))
	}

	isValidToken(token){
		if(!token || !token.access_token || !token.expires_in) return false
		let now = new Date().getTime()
		if(now < token.expires_in) return true
		return false
	}

	// return a Promise
	// resolve token{Obj}
	getToken(){
		let that = this
		// token is in the Instace allready
		if(this.token){
			if(this.isValidToken(this.token)){
				return Promise.resolve(this.token)
			}
		}
		// getLocalToken
		return readFile(this.localTokenPath)
		.then(localTokenStr => {
			let localToken = JSON.parse(localTokenStr)
			console.log("local token",localToken)
			if(that.isValidToken(localToken)){
				return Promise.resolve(localToken)
			}
			else{
				return that.getRemoteToken(that.tokenUrl)
			}
		})
		.then(token=>{
			that.token = token
			let tokenStr = JSON.stringify(token)
			return writeFile(tokenStr,that.localTokenPath)
		})
		.catch(err=>{
			console.log(err)
		})
	}

	getRemoteToken(url){
		return new Promise((resolve,reject)=>{
			axios.get(url)
			.then((response)=>{
				let token = response.data
				let now = new Date().getTime()
				// minus 30s delay
				token.expires_in = now + (token.expires_in - 30)*1000
				console.log("returned from remote:",token)
				resolve(token)
			})
			.catch(err=>{
				console.log(err)
				reject(err)
			})
		})
	}

}
export default Wechat