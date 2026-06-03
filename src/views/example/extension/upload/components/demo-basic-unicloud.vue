<template>
	<el-card shadow="never" header="unicloud 上传测试">
		<ele-image-upload v-model="images" :limit="1" :disabled="disabled" :before-upload="onBeforeUpload" :drag="true" @upload="onUpload" />
		<el-button @click="delPic">删除云存储图片</el-button>
	</el-card>
</template>

<script>
	import EleImageUpload from 'ele-admin/es/ele-image-upload';
	import request from '@/utils/request';
	import UniCloudStorage from 'uni-cloud-storage'
	import {
		API_BASE_URL,
		UniCloud_SpaceID,
		UniCloud_clientSecret
	} from '@/config/setting';
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
			async delPic(){
				const res = await request.delete(`${API_BASE_URL}/system/oss/delCloudPic?id=your-file-id`);
				console.log(res)
			},
			async onUpload(item) {
				// file name progress status uid url
				// null(未上传)、uploading(上传中)、exception(上传失败)、done(上传完成)
				item.status = 'uploading';
				item.progress = 0;
				
				
				const unics = new UniCloudStorage(UniCloud_SpaceID, UniCloud_clientSecret);
				unics.upload(item.file, 'dir/fileName').then(res=>{
					item.status = 'done';
					console.log(res)
					// target :  "https://your-cdn-domain.example/path/to/file.png"
				}).catch(err=>{
					console.error(err)
				})
				
				
				
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
