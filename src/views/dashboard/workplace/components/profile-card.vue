<!-- 用户信息 -->
<template>
	<el-card shadow="never" body-style="padding: 20px;">
		<div :class="[
			'ele-cell',
			'workplace-user-card',
			{ 'workplace-user-responsive': styleResponsive }
		  ]">
			<div class="ele-cell-content ele-cell">
				<el-avatar :size="68" :src="loginUser.avatar" />
				<div class="ele-cell-content">
					<h4 class="ele-elip">
						{{ loginUser.nickname }} , {{welcomeArr[welcomeIndex]?.a}} , {{welcomeArr[welcomeIndex]?.b}}
					</h4>
					<div class="ele-text-secondary ele-elip" style="margin-top: 8px">
						<i class="el-icon-coordinate"></i>&nbsp;{{location}}
						<em>{{weatherMessage}}</em>
					</div>
				</div>
			</div>
			<div class="workplace-count-group">
				<div class="workplace-count-item">
					<div class="workplace-count-header">
						<el-tag size="small" class="ele-tag-round">
							<i class="el-icon-menu"></i>
						</el-tag>
						<span class="workplace-count-name">项目数</span>
					</div>
					<div class="workplace-count-num ele-text-heading">3</div>
				</div>
				<div class="workplace-count-item">
					<div class="workplace-count-header">
						<el-tag type="warning" size="small" class="ele-tag-round">
							<i class="el-icon-finished"></i>
						</el-tag>
						<span class="workplace-count-name">待办项</span>
					</div>
					<div class="workplace-count-num ele-text-heading">6 / 24</div>
				</div>
				<div class="workplace-count-item">
					<div class="workplace-count-header">
						<el-tag type="success" size="small" class="ele-tag-round">
							<i class="el-icon-bell"></i>
						</el-tag>
						<span class="workplace-count-name">未读消息</span>
					</div>
					<div class="workplace-count-num ele-text-heading">89</div>
				</div>
			</div>
		</div>
	</el-card>
</template>

<script>
	import {
		getLocation,
		getWeather
	} from '@/api/dashboard/workplace';
	export default {
		data() {
			return {
				welcomeIndex: 0,
				welcomeArr: [
					{
						a: '早上好',
						b: '开始一天的工作吧！'
					},
					{
						a: '下午好',
						b: '完成一天的工作吧！'
					},
					{
						a: '晚上好',
						b: '完成工作后，请注意休息！'
					},
				],
				location: '',
				weatherMessage: '',
			}
		},
		created() {
			this.getWelcomeIndex();
			this.getAMapInfo();
		},
		computed: {
			// 当前登录用户信息
			loginUser() {
				return this.$store.state.user.info;
			},
			// 是否开启响应式布局
			styleResponsive() {
				return this.$store.state.theme.styleResponsive;
			},
			
		},
		methods: {
			getWelcomeIndex() {
				var hours = new Date().getHours();
				if(hours >= 5 && hours < 12){
					this.welcomeIndex = 0
				}else if(hours >= 12 && hours < 19){
					this.welcomeIndex = 1
				}else{
					this.welcomeIndex = 2
				}
			},
			getAMapInfo(){
				getLocation().then(res=>{
					this.location = res.province + res.city;
					getWeather(res.adcode).then(res2=>{
						var info = res2.lives[0];
						this.weatherMessage = `今日 天气${info.weather}, 气温 ${info.temperature}℃, 湿度 ${info.humidity}。`;
					}).catch(err2=>{
						console.log(err2)
					})
				}).catch(err=>{
					console.log(err)
				})
			},
		},
		activated() {
			this.getWelcomeIndex()
		},
	};
</script>

<style lang="scss" scoped>
	.workplace-user-card {
		.ele-cell-content {
			overflow: hidden;
		}

		.workplace-count-group {
			white-space: nowrap;
		}

		.workplace-count-item {
			padding: 0 5px 0 25px;
			box-sizing: border-box;
			display: inline-block;
			text-align: right;
		}

		.workplace-count-name {
			padding-left: 8px;
		}

		.workplace-count-num {
			font-size: 24px;
			margin-top: 6px;
		}
	}

	@media screen and (max-width: 992px) {
		.workplace-user-responsive .workplace-count-item {
			padding: 0 5px 0 10px;
		}
	}

	@media screen and (max-width: 768px) {
		.workplace-user-responsive.workplace-user-card {
			display: block;

			.workplace-count-group {
				display: block;
				margin-top: 15px;
				text-align: right;
			}
		}
	}
</style>
