export const api = {
	baseUrl:'https://api.weixin.qq.com/cgi-bin/',
	// 临时素材
	material:{
		// access_token=ACCESS_TOKEN&type=TYPE
		upload:'media/upload?',
		// access_token=ACCESS_TOKEN&media_id=MEDIA_ID
		download:'media/get?'
	},
	// 永久素材
	permanent:{
		// access_token=ACCESS_TOKEN
		uploadNews:'material/add_news?',
		// access_token=ACCESS_TOKEN
		upload:'material/add_material?',
		// access_token=ACCESS_TOKEN
		download:'material/get_material?',
		// access_token=ACCESS_TOKEN
		remove:'material/del_material?',
		// access_token=ACCESS_TOKEN
		updateNews:'material/update_news?',
		// access_token=ACCESS_TOKEN
		getCount:'material/get_materialcount?',
		// access_token=ACCESS_TOKEN
		batchGet:'material/batchget_material?'
	}
}