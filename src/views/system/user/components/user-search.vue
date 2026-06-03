<!-- 搜索表单 -->
<template>
	<el-form label-width="77px" class="ele-form-search" @keyup.enter.native="search" @submit.native.prevent>
		<el-row :gutter="15">
			<el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<el-form-item label="用户账号:">
					<el-input clearable v-model="where.username" placeholder="请输入" />
				</el-form-item>
			</el-col>
			<el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<el-form-item label="用户名:">
					<el-input clearable v-model="where.nickname" placeholder="请输入" />
				</el-form-item>
			</el-col>
			<el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<el-form-item label="组织机构:">
					<org-select :data="orgData" v-model="where.organizationId" class="ele-fluid"></org-select>
				</el-form-item>
			</el-col>
			<el-col v-if="mix_searchExpand" v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<el-form-item label="性别:">
					<el-select clearable v-model="where.sex" placeholder="请选择" class="ele-fluid">
						<el-option label="男" :value="1" />
						<el-option label="女" :value="2" />
					</el-select>
				</el-form-item>
			</el-col>
			<!-- 按钮 -->
			<el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<div class="ele-form-actions ele-text-right">
					<el-button type="primary" icon="el-icon-search" class="ele-btn-icon" @click="search">
						查询
					</el-button>
					<el-button @click="reset">重置</el-button>
					<el-link v-if="mix_showExpandBtn" type="primary" :underline="false" @click="mix_toggleExpand">
					  <template v-if="mix_searchExpand">
					    收起<i class="el-icon-arrow-up"></i>
					  </template>
					  <template v-else>
					    展开<i class="el-icon-arrow-down"></i>
					  </template>
					</el-link>
				</div>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import tblSearchMixin from '@/mixins/tblSearchMixin.js';
	import orgSelect from '@/views/system/organization/components/org-select.vue';

	export default {
		data() {
			// 默认表单数据
			const defaultWhere = {
				username: '',
				nickname: '',
				sex: undefined,
				organizationId: '',
			};
			return {
				// 表单数据
				where: {
					...defaultWhere
				},
			};
		},
		props: {
			orgData: Array
		},
		mixins: [tblSearchMixin],
		components: {orgSelect},
		computed: {
			// 是否开启响应式布局
			styleResponsive() {
				return this.$store.state.theme.styleResponsive;
			}
		},
		methods: {
			/* 搜索 */
			search() {
				this.$emit('search', this.where);
			},
			/*  重置 */
			reset() {
				this.where = {
					...this.defaultWhere
				};
				this.search();
			},
			
		}
	};
</script>
