import request from '@/utils/request';

/**
 * 查询字典大项列表
 * @param params 查询条件
 */
export async function listDict() {
	const res = await request.get('/system/dict/list');
	if (res.data.code === 0) {
		return res.data.data;
	}
	return Promise.reject(new Error(res.data.message));
}
/**
 * 查询字典小项列表
 * @param _id=大项id
 */
export async function listDictData(_id) {
	const res = await request.get('/system/dict/listData?_id=' + _id);
	if (res.data.code === 0) {
		return res.data.data;
	}
	return Promise.reject(new Error(res.data.message));
}
/**
 * 添加字典小项
 * @param _id=大项id
 */
export async function addDictData(_id, dictData) {
	const res = await request.post('/system/dict/addDictData', {
		_id,
		dictData
	});
	if (res.data.code === 0) {
		return res.data.message;
	}
	return Promise.reject(new Error(res.data.message));
}

/**
 * 添加字典大项
 * @param data 字典信息
 */
export async function addDict(data) {
	const res = await request.post('/system/dict/add', data);
	if (res.data.code === 0) {
		return res.data.message;
	}
	return Promise.reject(new Error(res.data.message));
}

/**
 * 修改字典大项
 * @param data 字典信息
 */
export async function updateDict(data) {
	const res = await request.put('/system/dict/update', data);
	if (res.data.code === 0) {
		return res.data.message;
	}
	return Promise.reject(new Error(res.data.message));
}

/**
 * 删除字典大项
 * @param id 字典id
 */
export async function removeDict(_id, createUserId) {
	const res = await request.delete('/system/dict/remove', {
		params: {
			_id,
			createUserId
		}
	});
	if (res.data.code === 0) {
		return res.data.message;
	}
	return Promise.reject(new Error(res.data.message));
}

/**
 * 根据大项code查询小项集合
 * @param code 大项code
 */
export async function getDictDataByCode(dictCode){
	const res = await request.get('/system/dict/getDictDataByCode?dictCode=' + dictCode);
	if (res.data.code === 0) {
		return res.data.data;
	}
	return Promise.reject(new Error(res.data.message));
}
