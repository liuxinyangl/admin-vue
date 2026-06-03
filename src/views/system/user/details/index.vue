<template>
	<div class="ele-body">
		<el-card shadow="never" header="基本信息">
			<el-form size="mini" v-loading="loading" label-width="120px" class="ele-form-detail">
				<el-form-item label="账号:">
					<div class="ele-text-secondary">{{ user.username }}</div>
				</el-form-item>
				<el-form-item label="用户名:">
					<div class="ele-text-secondary">{{ user.nickname }}</div>
				</el-form-item>
				<el-form-item label="简介:">
					<div class="ele-text-secondary">{{ user.introduction }}</div>
				</el-form-item>
				<el-form-item label="组织机构:">
					<div class="ele-text-secondary">
						{{user.organizationId}}
					</div>
				</el-form-item>
				<el-form-item label="性别:">
					<div class="ele-text-secondary">{{ user.sex===0?'未知':user.sex===1?'男' :user.sex===2?'女':""}}</div>
				</el-form-item>
				<el-form-item label="手机号:">
					<div class="ele-text-secondary">{{ user.phone }}</div>
				</el-form-item>
				<el-form-item label="邮箱:">
					<div class="ele-text-secondary">{{ user.email }}</div>
				</el-form-item>
				<el-form-item label="角色:">
					<el-tag v-for="(item, index) in user.roleCodes" :key="item+'-'+index" size="mini" type="primary"
						:disable-transitions="true">
						{{ item }}
					</el-tag>
				</el-form-item>
				<el-form-item label="创建时间:">
					<div class="ele-text-secondary">{{ user.createTime }}</div>
				</el-form-item>
				<el-form-item label="状态:">
					<div class="ele-text-secondary">
						<ele-dot v-if="user.status === 0" type="danger" text="禁用" />
						<ele-dot v-else type="success" :ripple="true" text="正常" />
					</div>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import {
		setPageTabTitle
	} from '@/utils/page-tab-util';
	import {
		getUser
	} from '@/api/system/user';
	const ROUTE_PATH = '/system/user/details';

	export default {
		name: 'SystemUserDetails',
		data() {
			return {
				user: {},
				loading: true
			};
		},
		mounted(){
			this.$nextTick(()=>{
				
			})
		},
		methods: {
			query() {
				const id = this.$route.query.id;
				if (!id || this.user._id === id) {
					return;
				}
				this.loading = true;
				getUser(id)
					.then((data) => {
						this.loading = false;
						this.user = {
							...data,
							createTime: this.$util.toDateString(data.createTime)
						};
						// 修改页签标题
						if (this.$route.path === ROUTE_PATH) {
							setPageTabTitle(data.nickname + '的信息');
						}
					})
					.catch((e) => {
						this.loading = false;
						
					});
			}
		},
		watch: {
			$route: {
				handler(route) {
					const {
						path
					} = route;
					if (path !== ROUTE_PATH) {
						return;
					}
					this.query();
				},
				immediate: true
			}
		}
	};
</script>
