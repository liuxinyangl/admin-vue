<template>
	<div>
		<!-- 数据表格 -->
		<ele-pro-table ref="table" :columns="columns" :datasource="datasource" height="calc(100vh - 256px)"
			full-height="calc(100vh - 116px)" tool-class="ele-toolbar-form" cache-key="systemOrgUserTable">
			<!-- 表头工具栏 -->
			<template v-slot:toolbar>
				<org-user-search @search="reload"></org-user-search>
			</template>
			<!-- 角色列 -->
			<template v-slot:roles="{ row }">
				<el-tag v-for="(item, index) in row.roleCodes" :key="item + '-' + index" type="primary" size="mini"
					:disable-transitions="true">
					{{ item }}
				</el-tag>
			</template>
			<!-- 状态列 -->
			<template v-slot:status="{ row }">
				<ele-dot type="success" v-if="row.status == 1" text="正常" />
				<ele-dot type="danger" v-else text="异常" :ripple="true" />
			</template>
			<!-- 操作列 -->
			<template v-slot:action="{ row }">
        <el-link
          type="primary"
          :underline="false"
          icon="el-icon-edit"
          @click="openEdit(row)"
        >
          修改
        </el-link>
      </template>
		</ele-pro-table>
		<!-- 编辑弹窗 -->
		<org-user-edit :data="current" :visible.sync="showEdit" :organization-list="organizationList"
			:organization-id="organizationId" @done="reload" />
	</div>
</template>

<script>
	import OrgUserSearch from './org-user-search.vue';
	import OrgUserEdit from './org-user-edit.vue';
	import {
		pageOrgUser
	} from '@/api/system/organization';
	export default {
		components: {
			OrgUserSearch,
			OrgUserEdit
		},
		props: {
			// 机构id
			organizationId: String,
			// 全部机构
			organizationList: Array
		},
		data() {
			return {
				// 表格列配置
				columns: [{
						columnKey: 'index',
						type: 'index',
						width: 45,
						align: 'center',
					},
					{
						prop: 'username',
						label: '用户账号',
						sortable: 'custom',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						prop: 'nickname',
						label: '用户名',
						sortable: 'custom',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						prop: 'phone',
						label: '手机号',
						sortable: 'custom',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						columnKey: 'roles',
						label: '角色',
						showOverflowTooltip: true,
						minWidth: 110,
						slot: 'roles'
					},
					{
						prop: 'status',
						label: '状态',
						align: 'center',
						sortable: 'custom',
						width: 80,
						resizable: false,
						slot: 'status'
					},
					{
						prop: 'createTime',
						label: '创建时间',
						sortable: 'custom',
						showOverflowTooltip: true,
						minWidth: 110,
						formatter: (_row, _column, cellValue) => {
							return this.$util.toDateString(cellValue);
						}
					},
					{
					  columnKey: 'action',
					  label: '操作',
					  width: 70,
					  align: 'center',
					  resizable: false,
					  slot: 'action',
					  showOverflowTooltip: true
					}
				],
				// 当前编辑数据
				current: null,
				// 是否显示编辑弹窗
				showEdit: false
			};
		},
		methods: {
			/* 表格数据源 */
			datasource({
				page,
				limit,
				where,
				order
			}) {
				return pageOrgUser({
					...where,
					...order,
					page,
					limit,
					_id: this.organizationId
				});
			},
			/* 刷新表格 */
			reload(where) {
				this.$refs.table.reload({
					page: 1,
					where: where
				});
			},
			/* 显示编辑 */
			openEdit(row) {
				this.current = row;
				this.showEdit = true;
			},
		},
		watch: {
			// 监听机构id变化
			organizationId() {
				this.reload();
			}
		}
	};
</script>
