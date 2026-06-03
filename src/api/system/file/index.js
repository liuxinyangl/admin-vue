import request from '@/utils/request';

/**
 * 上传文件
 */
export async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request.post('/system/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  if (res.data.code === 0) {
    return res.data.data ?? res.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 新增文件记录
 */
export async function addFile(data) {
  const res = await request.post('/system/file-record/add', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 分页查询文件上传记录
 */
export async function pageFile(params) {
  const res = await request.get('/system/file-record/page', { params });
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除文件
 */
export async function removeFile(params) {
  const res = await request.delete('/system/file-record/remove', { params });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
