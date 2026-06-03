import request from '@/utils/request';
import { MAP_WebService_Key } from '@/config/setting';	

/**
 * 高德 IP定位
 */
export async function getLocation() {
  const res = await request.get('https://restapi.amap.com/v3/ip', {
    params: {
		key: MAP_WebService_Key
	}
  });
  if (res.data.status == 1) {
    return {
		province: res.data.province,
		city: res.data.city,
		adcode: res.data.adcode,
	}
  }
  return Promise.reject(new Error(res.data.info));
}

/**
 * 高德 天气查询
 */
export async function getWeather(adcode) {
  const res = await request.get('https://restapi.amap.com/v3/weather/weatherInfo', {
    params: {
		key: MAP_WebService_Key,
		city: adcode,
	}
  });
  if (res.data.status == 1) {
    return {
		lives: res.data.lives,
	}
  }
  return Promise.reject(new Error(res.data.info));
}