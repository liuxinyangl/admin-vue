<template>
	<div class="ele-body">
		<el-card shadow="never">
			<!-- 搜索表单 -->
			<login-record-search @search="reload" />
			<!-- 数据表格 -->
			<ele-pro-table ref="table" :datasource="datasource" :columns="columns" cache-key="systemLoginRecordTable"
				:height="mix_tableHeight" :pageSize="20" :pageSizes="[20,50,100]">
				<!-- 表头右侧工具栏 -->
				<template v-slot:toolkit>
					<span v-if="mix_showExpandBtn" class="ele-text-info ele-text-small ele-action">固定高度</span>
					<el-switch v-if="mix_showExpandBtn" class="ele-action" v-model="mix_fixedHeight"
						@change="mix_reloadTable('table')" />
					<el-divider class="ele-action" direction="vertical" />
				</template>
				<!-- 表头工具栏 -->
				<template v-slot:toolbar>
					<el-button size="small" type="primary" icon="el-icon-download" class="ele-btn-icon"
						@click="exportData">
						导出
					</el-button>
				</template>
			</ele-pro-table>
		</el-card>
	</div>
</template>

<script>
	import {
		utils,
		writeFile
	} from 'xlsx';
	import LoginRecordSearch from './components/login-record-search.vue';
	import {
		pageLoginRecords
	} from '@/api/system/login-record';
	import tblContentMixin from '@/mixins/tblContentMixin.js';

	export default {
		name: 'SystemLoginRecord',
		components: {
			LoginRecordSearch
		},
		mixins: [tblContentMixin],
		data() {
			return {
				mix_initTableHeightOffset: 51,
				// 表格列配置
				columns: [{
						columnKey: 'index',
						type: 'index',
						width: 45,
						align: 'center',
						showOverflowTooltip: true,
						fixed: 'left'
					},
					{
						prop: 'user.username',
						label: '账号',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						prop: 'user.nickname',
						label: '用户名',
						showOverflowTooltip: true,
						minWidth: 110
					}, {
						prop: 'user.userId',
						label: '用户ID',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						prop: 'tenantId',
						label: '租户ID',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						prop: 'context.CLIENTIP',
						label: 'IP地址',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						prop: 'context.SOURCE',
						label: '登录源',
						showOverflowTooltip: true,
						minWidth: 110,
						sortable: 'custom',
					},
					{
						prop: 'context.CLIENTUA',
						label: 'UA标识',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						prop: 'createTime',
						label: '登录时间',
						showOverflowTooltip: true,
						minWidth: 180,
						formatter: (_row, _column, cellValue) => {
							return this.$util.toDateString(cellValue);
						}
					}
				],
			};
		},
		methods: {
			/* 表格数据源 */
			async datasource({
				page,
				limit,
				where,
				order
			}) {
				var data = await pageLoginRecords({
					...where,
					...order,
					page,
					limit
				});
				data.list = data.list.map(item => {
					return {
						context: JSON.parse(item.context),
						user: JSON.parse(item.user),

						createTime: item.createTime,
						key: item.key,
						loginUserId: item.loginUserId,
						tenantId: item.tenantId,
					}
				})
				return data;
			},
			/* 刷新表格 */
			reload(where) {
				this.$refs.table.reload({
					page: 1,
					where: where
				});
			},
			/* 导出数据 */
			exportData() {

			}
		}
	};
</script>
