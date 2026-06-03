<!-- 顶栏右侧区域 -->
<template>
	<div class="ele-admin-header-tool">
		<!-- 全屏切换 -->
		<!-- <div class="ele-admin-header-tool-item hidden-xs-only" @click="toggleFullscreen">
			<i v-if="fullscreen" class="el-icon-_screen-restore"></i>
			<i v-else class="el-icon-_screen-full"></i>
		</div> -->
		<!-- 语言切换 -->
		<!-- <div class="ele-admin-header-tool-item">
      <i18n-icon />
    </div> -->
		<!-- 消息通知 -->
		<div class="ele-admin-header-tool-item">
			<header-notice />
		</div>
		<!-- 主题 -->
		<div class="ele-admin-header-tool-item" @click="openSetting">
			<i class="el-icon-_palette" style="color: var(--color-primary);"></i>
		</div>
		<!-- 用户信息 -->
		<div class="ele-admin-header-tool-item">
			 <el-popover
			    placement="bottom"
			    width="180"
			    trigger="hover">
				<div slot="reference" class="header-tool-avatar" style="height: 56px;">
					<el-avatar shape="square" size="medium" :src="avatarSrc" />
					&nbsp;<span :title="loginUser.nickname" class="header-nickname ele-elip">{{loginUser.nickname}}</span>&nbsp;
					<i class="el-icon-caret-bottom ele-text-small"></i>
				</div>
				<div class="header-tool-avatar-wrap">
					<div :title="loginUser.nickname" class="ele-elip header-tool-avatar2">
						{{loginUser.nickname}}
					</div>
					<div class="header-tool-avatar3">
						<div>
							<el-button type="primary" plain class="ele-fluid" icon="el-icon-user" @click="onUserDropClick('profile')" size="mini">{{$t('layout.header.profile')}}</el-button>
						</div>
						<div>
							<el-button type="primary" plain class="ele-fluid" icon="el-icon-key" @click="onUserDropClick('password')" size="mini">{{$t('layout.header.password')}}</el-button>
						</div>
						<div>
							<el-button type="danger" plain class="ele-fluid" icon="el-icon-switch-button" @click="onUserDropClick('logout')" size="mini">{{$t('layout.header.logout')}}</el-button>
						</div>
						
					</div>
					
				</div>
			  </el-popover>
		</div>
		<!-- <div class="ele-admin-header-tool-item ledtime">
			<div class="ledtime-date ele-text-heading"> </div>
			<div class="ledtime-time ele-text-heading"> </div>
		</div> -->
		<!-- 修改密码弹窗 -->
		<password-modal :visible.sync="passwordVisible" />
		<!-- 主题设置弹窗 -->
		<setting-modal :visible.sync="settingVisible" />
	</div>
</template>

<script>
	import HeaderNotice from './header-notice.vue';
	import PasswordModal from './password-modal.vue';
	import SettingModal from './setting-modal.vue';
	import I18nIcon from './i18n-icon.vue';
	import {
		logout
	} from '@/utils/page-tab-util';

	export default {
		components: {
			HeaderNotice,
			PasswordModal,
			SettingModal,
			I18nIcon
		},
		props: {
			// 是否是全屏
			fullscreen: Boolean
		},
		data() {
			return {
				// 是否显示修改密码弹窗
				passwordVisible: false,
				// 是否显示主题设置抽屉
				settingVisible: false
			};
		},
		computed: {
			// 当前用户信息
			loginUser() {
				return this.$store.state.user.info;
			},
			avatarSrc(){
				return this.loginUser.avatar
			},
		},
		mounted() {
			this.$nextTick(() => {
				
			})
		},
		methods: {
			/* 用户信息点击事件 */
			onUserDropClick(command) {
				if (command === 'password') {
					this.passwordVisible = true;
				} else if (command === 'profile') {
					if (this.$route.fullPath !== '/user/profile') {
						this.$router.push('/user/profile');
					}else{
						this.$message.info('已进入个人中心页面')
					}
				} else if (command === 'logout') {
					// 退出登录
					this.$confirm(
							this.$t('layout.logout.message'),
							this.$t('layout.logout.title'), {
								type: 'warning'
							}
						)
						.then(() => {
							logout();
						})
						.catch(() => {});
				}
			},
			/* 全屏切换 */
			toggleFullscreen() {
				this.$emit('fullscreen');
			},
			/* 打开设置抽屉 */
			openSetting() {
				this.settingVisible = true;
			}
		}
	};
</script>
<style lang="scss">
	.header-tool-avatar{
		height: 56px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.header-nickname{
			font-size: 14px;
			display: inline-block;
			max-width: 80px;
			margin-left: 6px;
		}
	}
	.header-tool-avatar-wrap{
		.header-tool-avatar2{
			background-color: var(--color-info-1);
			height: 48px;
			line-height: 48px;
			border-radius: 4px;
			text-indent: 20px;
			font-size: 14px;
			font-weight: bold;
			letter-spacing: 1px;
			color: var(--color-text-primary);
		}
		.header-tool-avatar3{
			margin-top: 14px;
			> div{
				margin-bottom: 10px;
			}
		}
	}
</style>
