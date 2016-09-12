import xml2js from 'xml2js'

let msgParser = (xmlStr)=>{
	return new Promise((resolve,reject)=>{
		xml2js.parseString(xmlStr,(err,result)=>{
			if(err) reject(err)
			resolve(result)
		})
	})
}

export default msgParser