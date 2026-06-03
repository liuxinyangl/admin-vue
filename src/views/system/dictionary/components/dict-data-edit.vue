<!-- 字典项编辑弹窗 -->
<template>
	<ele-modal width="500px" :visible="visible" :close-on-click-modal="true" :title="isUpdate ? '修改字典小项' : '添加字典小项'"
		@update:visible="updateVisible">
		<el-form :model="form" ref="form" :rules="rules" label-width="120px">
			<el-form-item label="字典大项名称:">
				<el-input :disabled="true" :value="dictParentName" />
			</el-form-item>
			<el-form-item label="字典小项名称:" prop="dictDataName">
				<el-input clearable :maxlength="20" v-model="form.dictDataName" placeholder="请输入字典小项名称" />
			</el-form-item>
			<el-form-item label="字典小项值:" prop="dictDataCode">
				<el-input clearable :maxlength="20" v-model="form.dictDataCode" placeholder="请输入字典小项值" />
			</el-form-item>
		</el-form>
		<template v-slot:footer>
			<el-button @click="updateVisible(false)">取消 </el-button>
			<el-button type="primary" :loading="loading" @click="save">
				保存
			</el-button>
		</template>
	</ele-modal>
</template>

<script>
	import {
		addDictData,
		updateDict
	} from '@/api/system/dictionary';

	export default {
		props: {
			// 弹窗是否打开
			visible: Boolean,
			dictId: String,
			dictParentName: String,
			oldDictData: Array,
		},
		data() {
			const defaultForm = {
				dictDataName: '',
				dictDataCode: '',
			};
			return {
				defaultForm,
				// 表单数据
				form: {
					...defaultForm
				},
				// 表单验证规则
				rules: {
					dictDataName: [{
						required: true,
						message: '请输入字典小项名称',
						trigger: 'blur'
					}],
					dictDataCode: [{
						required: true,
						message: '请输入字典小项编码',
						trigger: 'blur'
					}],
				},
				// 提交状态
				loading: false,
				// 是否是修改
				isUpdate: false
			};
		},
		methods: {
			/* 保存编辑 */
			save() {
				this.$refs.form.validate((valid) => {
					if (!valid) {
						return false;
					}
					this.loading = true;
					addDictData(this.dictId, [...this.oldDictData, this.form])
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
						this.$util.assignObject(this.form, this.data);
						this.isUpdate = true;
					} else {
						this.isUpdate = false;
					}
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
