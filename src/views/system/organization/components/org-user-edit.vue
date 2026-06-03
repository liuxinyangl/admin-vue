<!-- 用户编辑弹窗 -->
<template>
	<ele-modal width="400px" :visible="visible" :close-on-click-modal="true" custom-class="ele-dialog-form"
		:title="isUpdate ? '修改用户' : '添加用户'" @update:visible="updateVisible">
		<el-form ref="form" :model="form" :rules="rules" label-width="82px">
			<el-row :gutter="15">
				<el-col v-bind="styleResponsive ? { sm: 24 } : { span: 24 }">
					<el-form-item label="用户账号:" prop="username">
						<el-input clearable :disabled="true" v-model="form.username" placeholder="请输入账号" />
					</el-form-item>
				</el-col>
				<el-col v-bind="styleResponsive ? { sm: 24 } : { span: 24 }">
					<el-form-item label="用户名:" prop="nickname">
						<el-input clearable :disabled="true" v-model="form.nickname" placeholder="请输入用户名" />
					</el-form-item>
				</el-col>
				<el-col v-bind="styleResponsive ? { sm: 24 } : { span: 24 }">
					<el-form-item label="所属机构:">
						<org-select ref="orgRef" :data="organizationList" placeholder="请选择所属机构"
							v-model="form.organizationId" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<template v-slot:footer>
			<el-button @click="updateVisible(false)">取消</el-button>
			<el-button type="primary" :loading="loading" @click="save">
				保存
			</el-button>
		</template>
	</ele-modal>
</template>

<script>
	import OrgSelect from './org-select.vue';
	import {
		updateUser
	} from '@/api/system/user';

	export default {
		components: {
			OrgSelect
		},
		props: {
			// 弹窗是否打开
			visible: Boolean,
			// 修改回显的数据
			data: Object,
			// 全部机构
			organizationList: Array,
			// 机构id
			organizationId: String
		},
		data() {
			const defaultForm = {
				_id: "", //用户id
				organizationId: null,
				username: '',
				nickname: '',
			};
			return {
				defaultForm,
				// 表单数据
				form: {
					...defaultForm
				},
				// 表单验证规则
				rules: {},
				// 提交状态
				loading: false,
				// 是否是修改
				isUpdate: false
			};
		},
		computed: {
			// 是否开启响应式布局
			styleResponsive() {
				return this.$store.state.theme.styleResponsive;
			}
		},
		methods: {
			/* 保存编辑 */
			save() {
				this.$refs.form.validate((valid) => {
					if (!valid) {
						return false;
					}
					this.loading = true;
					const data = {
						...this.form,
					};
					updateUser(data)
						.then((msg) => {
							this.loading = false;
							this.$message.success(msg);
							this.updateVisible(false);
							this.$emit('done');
						})
						.catch((e) => {
							this.loading = false;
						});
				});
			},
			/* 更新visible */
			updateVisible(value) {
				this.$emit('update:visible', value);
			}
		},
		watch: {
			visible(visible) {
				if (visible) {
					if (this.data) {
						this.$util.assignObject(this.form, {
							...this.data,
						});
						this.isUpdate = true;
					} else {
						this.form.organizationId = this.organizationId;
						this.isUpdate = false;
					}
					this.$nextTick(()=>{
						this.$refs.orgRef.getData()
					})
				} else {
					this.$refs.form.clearValidate();
					this.form = {
						...this.defaultForm
					};
				}
			}
		}
	};
</script>
