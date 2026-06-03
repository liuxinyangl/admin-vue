<!-- 搜索表单 -->
<template>
	<el-form label-width="77px" class="ele-form-search" @keyup.enter.native="search" @submit.native.prevent>
		<el-row :gutter="15">
			<el-col v-bind="styleResponsive ? { lg: 6, md: 12 } : { span: 6 }">
				<el-form-item v-if="isSuperAdmin" label="所属租户:">
					<el-select clearable v-model="where.tenantId" placeholder="请选择所属租户">
						<el-option v-for="(item,index) in ($store.state.user.tenantData||[])" :label="item.tenantName"
							:key="item._id" :value="item._id" />
					</el-select>
				</el-form-item>
			</el-col>
			<el-col v-bind="styleResponsive ? { lg: 12, md: 12 } : { span: 12 }">
				<el-form-item label="登录时间:">
					<el-date-picker v-model="dateRange" type="datetimerange" :picker-options="pickerOptions"
						unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
						value-format="timestamp" class="ele-fluid" />
				</el-form-item>
			</el-col>
			<el-col v-bind="styleResponsive ? { lg: 6, md: 6 } : { span: 6 }">
				<div class="ele-form-actions">
					<el-button type="primary" @click="search" icon="el-icon-search" class="ele-btn-icon">
						查询
					</el-button>
					<el-button @click="reset">重置</el-button>
				</div>
			</el-col>
		</el-row>
	</el-form>
</template>

<script>
	export default {
		data() {
			// 默认表单数据
			const defaultWhere = {
				tenantId: '',
			};
			return {
				// 表单数据
				where: {
					...defaultWhere
				},
				// 日期范围选择
				dateRange: [],
				// 日期时间选择器快捷项
				pickerOptions: {
					shortcuts: [{
							text: '最近一周',
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
								picker.$emit('pick', [start, end]);
							}
						},
						{
							text: '最近一个月',
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
								picker.$emit('pick', [start, end]);
							}
						},
						{
							text: '最近三个月',
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
								picker.$emit('pick', [start, end]);
							}
						}
					]
				}
			};
		},
		computed: {
			// 是否开启响应式布局
			styleResponsive() {
				return this.$store.state.theme.styleResponsive;
			},
			user() {
				return this.$store.state.user.info || {}
			},
			isSuperAdmin() {
				return this.user.tenantId === '0'
			},
		},
		methods: {
			/* 搜索 */
			search() {
				const [d1, d2] = this.dateRange ?? [];
				this.$emit('search', {
					...this.where,
					createTimeStart: d1 ?? '',
					createTimeEnd: d2 ?? ''
				});
			},
			/*  重置 */
			reset() {
				this.where = {
					...this.defaultWhere
				};
				this.dateRange = [];
				this.search();
			}
		}
	};
</script>
