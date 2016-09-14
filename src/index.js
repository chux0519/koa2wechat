import 'babel-polyfill'
import WeConnector from './wechat/WeConnector'
import Wechat from './wechat/Wechat'
import WeReply from './wechat/WeReply'
import WeHandler from './wechat/WeHandler'

export {Wechat,WeConnector,WeHandler,WeReply}

export let k2w = {
	Wechat:Wechat,
	WeConnector:WeConnector,
	WeHandler:WeHandler,
	WeReply:WeReply
}
