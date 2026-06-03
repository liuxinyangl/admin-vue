<template>
	<el-card shadow="never" header="OSS 上传测试">
		<ele-image-upload v-model="images" :limit="1" :disabled="disabled" :before-upload="onBeforeUpload" :drag="true" @upload="onUpload" />
	</el-card>
</template>

<script>
	import EleImageUpload from 'ele-admin/es/ele-image-upload';
	import request from '@/utils/request';
	import OSS from 'ali-oss';
	import { API_BASE_URL } from '@/config/setting';
	export default {
		components: {
			EleImageUpload
		},
		data() {
			return {
				// 已上传数据
				images: [],
				// 禁用
				disabled: false
			};
		},
		methods: {
			async onUpload(item) {
				// file name progress status uid url
				// null(未上传)、uploading(上传中)、exception(上传失败)、done(上传完成)
				item.status = 'uploading';
				item.progress = 0;
				var uid = item.uid || Date.now();
				var name = uid+'-'+item.name;
				
				try{
					// 获取STS签名，注意可以持久保存 client 实例！！！
					const sts = await request.get(`${API_BASE_URL}/system/oss/STSToken`);
					const client = new OSS({
					    region: 'oss-cn-chengdu',
					    accessKeyId: sts.data.Credentials.AccessKeyId,
					    accessKeySecret: sts.data.Credentials.AccessKeySecret,
					    stsToken: sts.data.Credentials.SecurityToken,
					    bucket: process.env.VUE_APP_OSS_BUCKET || 'your-oss-bucket'
					});
					
					// 上传
					const r1 = await client.put(`test/${name}`, item.file);
					// r1.url 地址、 r1.name 名称  ---->  给后台保存
					console.log(r1)
					this.$message.success('上传成功')
					
					
					item.status = 'done';
					item.progress = 100;
					
					//删除
					// await client.delete('test/1665906475622-9.png');
					
				}catch(e){
					console.error(e)
					item.status = 'exception';
					this.$message.error('上传失败，请重试')
				}
				
				return

				if (res.data.code === 0) {
					return res.data.data;
				}
				const timer = setInterval(() => {
					item.progress += 20;
					if (item.progress === 100) {
						item.status = 'done';
						clearInterval(timer);
					}
				}, 1000);
			},
			onBeforeUpload(file) {
				if (!file.type.startsWith('image')) {
					this.$message.error('只能选择图片');
					return false;
				}
				if (file.size / 1024 / 1024 > 0.1) {
					this.$message.error('大小不能超过 102kb');
					return false;
				}
			},
		}
	};
</script>
