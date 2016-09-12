import axios from 'axios'
import textTpl from '../xml/textTpl'
import {weather as config} from './config'

let getWeather = (actions)=>{
	console.log("now getWeather")
	return new Promise((resolve,reject)=>{
		let {appid,baseUrl} = config
		let prefix_url = baseUrl + `weather?appid=${appid}&q=`
		let city = ''
		// default city is Chengdu
		if(actions.length===0){
			city = '成都'
		}
		else if(actions.length > 0){
			city = actions[0].trim() 
			city.length > 0? city = city:city='成都'
		}
		console.log('target city : ', city)
		let url = prefix_url + city
		axios.get(encodeURI(url))
		.then(response=>{
			let weatherJSON = response.data
			let resolveStr = ''
			if(weatherJSON.cod === 200 && weatherJSON.main.temp && weatherJSON.weather){
				let temp  = Math.round(weatherJSON.main.temp-273.15)
				resolveStr = `Weather:${weatherJSON.weather[0].main},Temp now:${temp}`
			}
			else{
				resolveStr = 'Not found city'
			}
			resolve(resolveStr)
		})
		.catch(e=>{
			reject(e)
		})
	})

}



let textHandler = (xml)=>{
	let rpl = {}
	rpl.ToUserName = xml.FromUserName
	rpl.FromUserName = xml.ToUserName
	rpl.Content = ''
	rpl.CreateTime = new Date().getTime()

	let content = xml.Content.trim()
	let actions = content.split(',')
	console.log("actions array : ",actions)
	switch(actions[0].trim()){
		case 'tq':
			return getWeather(actions.slice(1))
			.then(content=>{
				console.log(content)
				rpl.Content = content
				rpl.CreateTime = new Date().getTime()
				console.log("rplObj: ",rpl)
				let rplXML = textTpl(rpl)
				console.log("replyXML: ",rplXML)
				return Promise.resolve(rplXML)
			})
		default:
			rpl.Content = xml.Content
	}
	return Promise.resolve(textTpl(rpl))

}

// let xml = {
// 	FromUserName:'FromUserName',
// 	ToUserName:'ToUserName',
// 	Content:'tq'
// }
// textHandler(xml).then(msg=>{
// 	console.log("should send replyXML")
// })

export default textHandler