<!-- 搜索表单 -->
<template>
	<el-form label-width="77px" class="ele-form-search" @keyup.enter.native="search" @submit.native.prevent>
		<el-row :gutter="15">
			<el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<el-form-item label="菜单名称:">
					<el-input clearable v-model="where.title" placeholder="请输入" />
				</el-form-item>
			</el-col>
			<el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<el-form-item label="菜单地址:">
					<el-input clearable v-model="where.path" placeholder="请输入" />
				</el-form-item>
			</el-col>
			<!-- <el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<el-form-item label="权限标识:">
					<el-input clearable v-model="where.authority" placeholder="请输入" />
				</el-form-item>
			</el-col> -->
			<el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<el-form-item label="类型:">
					<el-select clearable v-model="where.menuType" placeholder="请选择类型">
					    <el-option
					      v-for="item in [{value:0,label:'菜单'},{value:1,label:'按钮'}]"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
				</el-form-item>
			</el-col>
			<el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<div class="ele-form-actions ele-text-right">
					<el-button type="primary" icon="el-icon-search" class="ele-btn-icon" @click="search">
						查询
					</el-button>
					<el-button @click="reset">重置</el-button>
				</div>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	import tblSearchMixin from '@/mixins/tblSearchMixin.js';
	export default {
		mixins: [tblSearchMixin],
		data() {
			// 默认表单数据
			const defaultWhere = {
				title: '',
				path: '',
				// authority: ''
				menuType: '',
			};
			return {
				// 表单数据
				where: {
					...defaultWhere
				}
			};
		},
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
			}
		}
	};
</script>
