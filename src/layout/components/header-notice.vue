<!-- 顶栏消息通知 -->
<template>
	<div class="ele-notice-group" @click="goMessagePage">
		<el-badge :value="unreadNum" :hidden="!unreadNum">
			<i class="el-icon-bell"></i>
		</el-badge>
	</div>
</template>

<script>
	import {
		getUnreadNotice
	} from '@/api/layout';

	export default {
		data() {
			return {
				// 是否显示
				visible: false,
				// 未读数量
				unreadNum: 0
			};
		},
		computed: {

		},
		created() {
			this.query();
		},
		methods: {
			/* 查询数据 */
			query() {
				getUnreadNotice()
					.then((result) => {
						this.unreadNum = result
					})
					.catch((e) => {
						this.$message.error(e.message);
					});
			},
			goMessagePage(){
				if(this.$route.path != '/user/message'){
					this.$router.push('/user/message')
				}
			},
		}
	};
</script>

<style lang="scss">
	.ele-notice-group {
		display: block;

		.el-badge {
			line-height: 1;
			display: block;
		}
	}
</style>
