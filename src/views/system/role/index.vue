<template>
	<div class="ele-body">
		<el-card shadow="never">
			<!-- 搜索表单 -->
			<role-search @search="reload" :mix_showExpandBtn="mix_showExpandBtn" />
			<!-- 数据表格 -->
			<ele-pro-table ref="table" :columns="columns" :datasource="datasource" :selection.sync="selection"
				cache-key="systemRoleTable" :height="mix_tableHeight" :pageSize="20" :pageSizes="[20,50,100]">
				<!-- 表头右侧工具栏 -->
				<template v-slot:toolkit>
					<span v-if="mix_showExpandBtn" class="ele-text-info ele-text-small ele-action">固定高度</span>
					<el-switch v-if="mix_showExpandBtn" class="ele-action" v-model="mix_fixedHeight"
						@change="mix_reloadTable('table')" />
					<el-divider class="ele-action" direction="vertical" />
				</template>
				<!-- 表头工具栏 -->
				<template v-slot:toolbar>
					<el-button size="small" type="primary" icon="el-icon-plus" class="ele-btn-icon" @click="openEdit()">
						添加
					</el-button>
					<el-button size="small" type="danger" icon="el-icon-delete" class="ele-btn-icon"
						@click="removeBatch">
						删除
					</el-button>
				</template>
				<template v-slot:isAdmin="{ row }">
					<el-tag type="danger" size="small" class="ele-text-primary" v-if="row.isAdmin == 1">管理员</el-tag>
					<span class="ele-text-info" v-else>普通</span>
				</template>
				<!-- 操作列 -->
				<template v-slot:action="{ row }">
					<el-link type="primary" :underline="false" icon="el-icon-edit" @click="openEdit(row)">
						修改
					</el-link>
					<el-link :disabled="row.isAdmin == 1" type="primary" :underline="false" icon="el-icon-finished" @click="openAuth(row)">
						分配权限
					</el-link>
					<el-popconfirm class="ele-action" title="确定要删除此角色吗？" @confirm="remove(row)">
						<template v-slot:reference>
							<el-link type="danger" :underline="false" icon="el-icon-delete">
								删除
							</el-link>
						</template>
					</el-popconfirm>
				</template>
			</ele-pro-table>
		</el-card>
		<!-- 编辑弹窗 -->
		<role-edit :data="current" :visible.sync="showEdit" @done="reload" />
		<!-- 权限分配弹窗 -->
		<role-auth :data="current" :visible.sync="showAuth" />
	</div>
</template>

<script>
	import RoleSearch from './components/role-search.vue';
	import RoleEdit from './components/role-edit.vue';
	import RoleAuth from './components/role-auth.vue';
	import {
		pageRoles,
		removeRole,
		removeRoles
	} from '@/api/system/role';
	import tblContentMixin from '@/mixins/tblContentMixin.js';


	export default {
		name: 'SystemRole',
		components: {
			RoleSearch,
			RoleEdit,
			RoleAuth
		},
		mixins: [tblContentMixin],
		data() {
			return {
				// 表格列配置
				columns: [{
						columnKey: 'selection',
						type: 'selection',
						width: 45,
						align: 'center',
						fixed: 'left'
					},
					{
						columnKey: 'index',
						type: 'index',
						width: 45,
						align: 'center',
						showOverflowTooltip: true,
						fixed: 'left'
					},
					{
						prop: 'roleName',
						label: '角色名称',
						sortable: 'custom',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						prop: 'roleCode',
						label: '角色编码',
						sortable: 'custom',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						prop: 'isAdmin',
						label: '权限',
						minWidth: 60,
						slot: "isAdmin"
					},
					{
						prop: 'comments',
						label: '备注',
						sortable: 'custom',
						showOverflowTooltip: true,
						minWidth: 110
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
						width: 230,
						align: 'center',
						resizable: false,
						slot: 'action',
						showOverflowTooltip: true
					}
				],
				// 表格选中数据
				selection: [],
				// 当前编辑数据
				current: null,
				// 是否显示编辑弹窗
				showEdit: false,
				// 是否显示导入弹窗
				showAuth: false,
				// 展开偏移-覆盖
				mix_initTableHeightOffset: 51,
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
				return pageRoles({
					...where,
					...order,
					page,
					limit
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
			/* 显示分配权限 */
			openAuth(row) {
				this.current = row;
				this.showAuth = true;
			},
			/* 删除 */
			remove(row) {
				const loading = this.$loading({
					lock: true
				});
				removeRole(row._id, row.createUserId, row.roleCode)
					.then((msg) => {
						loading.close();
						this.$message.success(msg);
						this.reload();
					})
					.catch((e) => {
						loading.close();
					});
			},
			/* 批量删除 */
			removeBatch() {
				if (!this.selection.length) {
					this.$message.error('请至少选择一条数据');
					return;
				}
				this.$confirm('确定要删除选中的角色吗?', '提示', {
						type: 'warning'
					})
					.then(() => {
						const loading = this.$loading({
							lock: true
						});
						var _id = [], createUserId = [], roleCode=[];
						this.selection.forEach(d => {
							_id.push(d._id);
							createUserId.push(d.createUserId);
							roleCode.push(d.roleCode);
						})
						removeRoles(_id.join(','), createUserId.join(','), roleCode.join(','))
							.then((msg) => {
								loading.close();
								this.$message.success(msg);
								this.reload();
							})
							.catch((e) => {
								loading.close();
							});
					})
					.catch(() => {});
			}
		}
	};
</script>
