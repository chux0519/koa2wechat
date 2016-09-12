
const config = {
	// openweahter api, link:http://openweathermap.org/
	weather:{
		appid:'your appid',
		baseUrl:'api.openweathermap.org/data/2.5/'
	},
	// amap api, link:http://lbs.amap.com/
	geo:{
		key:'your key',
		baseUrl:'http://restapi.amap.com/v3/geocode/'
	}
}

export const { weather,geo } = config

export default config


