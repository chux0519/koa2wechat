import axios from 'axios'
import textTpl from '../xml/textTpl'
import {geo as config} from './config'

let getAddress = (xml)=>{
	return new Promise((resolve,reject)=>{
		console.log("now get the user's address")
		let{key,baseUrl} = config
		let {Latitude,Longitude,Precision} = xml
		let url = baseUrl + 
		`regeo?key=${key}&location=${Longitude},${Latitude}&radius=${Precision}`
		axios.get(url)
		.then(response=>{
			let address = ''
			if(response.data.status == 1){
				 address = response.data.regeocode.formatted_address
				 console.log("The address is : ",address)
			}
			let msg = `Welcome my friend from ${address}`
			resolve(msg)
		})
		.catch(e=>reject(e))
	})
}

const welcomeMsg = 
`Welcome to subscribe! 
To get weather:
send:"tq,cityname"
for example,send: "tq,成都"
and you will get the real-time weather and temp`

let eventHandler = (xml)=>{
	let rpl = {}
	rpl.ToUserName = xml.FromUserName
	rpl.FromUserName = xml.ToUserName
	rpl.Content = ''
	rpl.CreateTime = new Date().getTime()
	let eventType = xml.Event
	switch(eventType){
		case 'subscribe':
			rpl.Content = welcomeMsg
			break
		case 'LOCATION':
			return getAddress(xml)
				.then(msg=>{
					rpl.Content = msg
					return Promise.resolve(textTpl(rpl))
				})
				.catch(e=>{
					console.log("erro happened in function getAddress : ",e)
				})
		default:
			rpl.Content = eventType
	}
	return Promise.resolve(textTpl(rpl))
}

export default eventHandler
