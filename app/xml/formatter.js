import _ from 'lodash'

let formater = (xmlObj)=>{
	let ret = {}
	let props = Object.keys(xmlObj)
	props.map((prop)=>{
		let flattened = _.flattenDeep(xmlObj[prop])
		if(flattened.length===0) ret[prop] = ''
		else if(flattened.length===1) ret[prop] = flattened[0]
		else ret[prop] = flattened
	})
	return ret
}

export default formater