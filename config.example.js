let config = {
	wechat:{
		local_token_path:__dirname + '/app/token.txt',
		appid:"your app id",
		secret:"your secret"
	}
}

export const {wechat} = config
export default config