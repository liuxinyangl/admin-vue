<template>
	<!-- tenantName   comments   menuIds[] -->
	<div class="ele-body">
		<el-card shadow="never">
			<ele-split-layout width="360px" allow-collapse :right-style="{ overflow: 'hidden' }">
				<!-- 表格 -->
				<ele-pro-table ref="table" :columns="columns" :datasource="datasource" height="calc(100vh - 210px)"
					:need-page="false" :toolkit="[]" :current.sync="current" highlight-current-row class="tenant-table"
					tool-class="ele-toolbar-actions" title="租户列表" @row-click="rowClick">
					<!-- 表头工具栏 -->
					<template v-slot:toolkit>
						<div style="margin: 5px 0">
							<el-button size="small" type="success" icon="el-icon-plus" class="ele-btn-icon"
								@click="openEdit()">
								添加
							</el-button>
							<el-button size="small" type="primary" plain icon="el-icon-edit" class="ele-btn-icon"
								:disabled="!current" @click="openEdit(current)">
								修改
							</el-button>
							<el-button size="small" type="danger" icon="el-icon-delete" class="ele-btn-icon"
								:disabled="!current" @click="removeTenantFn">
								删除
							</el-button>
						</div>
					</template>
				</ele-pro-table>
				<template v-slot:content>
					<el-row :gutter="15">
						<el-col v-bind="styleResponsive ? { md: 24 } : { span: 24 }">
							<ele-pro-table ref="tableRight" row-key="menuId" :datasource="menus" :columns="columnsRight"
								:default-expand-all="true" :need-page="false"
								:title="curTenantName" height="calc(100vh - 206px)"
								:selection.sync="selection" stripe size="mini">
								<template v-slot:toolbar>
									<el-alert style="width:calc(100% - 20px);" v-if="!current" title="请在左侧选择一个租户" type="error" show-icon class="ele-alert-border"/>
									<el-button v-if="current" :disabled="!current" size="mini" type="primary" class="ele-btn-icon"
										@click="save">
										保存分配
									</el-button>
									<sub style="margin-left: 10px;" v-if="current" class="ele-text-secondary ele-text-small">为租户的管理员，分配功能</sub>
								</template>
								<template v-slot:menuType="{ row }">
									<el-tag v-if="row.menuType === 0" type="success" size="mini"
										:disable-transitions="true">菜单</el-tag>
									<el-tag v-if="row.menuType === 1" type="danger" size="mini"
										:disable-transitions="true">按钮</el-tag>
								</template>
								<template v-slot:title="{ row }">
									<div class="title-wrap">
										<span class="title-divide"
											:style="{width: row.level*20 + 'px'}"></span>&nbsp;{{row.title}}&nbsp;<i v-if="row.hide==1" class="ele-text-small ele-text-danger">不显示</i>
									</div>
								</template>
							</ele-pro-table>
						</el-col>
					</el-row>
				</template>
			</ele-split-layout>
		</el-card>
		<!-- 编辑弹窗 -->
		<tenant-edit :visible.sync="showEdit" :data="editData" @done="editDone" />
	</div>
</template>

<script>
	import {
		getTenantList,
		getSuperMenuList,
		removeTenant,
		updateTenant,
	} from '@/api/system/tenant';
	import TenantEdit from './components/tenant-edit.vue';

	export default {
		name: 'SystemTenant',
		components: {
			TenantEdit
		},
		computed: {
			// 是否开启响应式布局
			styleResponsive() {
				return this.$store.state.theme.styleResponsive;
			},
			curTenantName(){
				return this.current?.tenantName;
			},
		},
		async mounted() {
			this.getSuperMenus()
		},
		data() {
			return {
				// 表格列配置
				columns: [{
						width: 80,
						align: 'center',
						prop: '_id',
						label: 'ID 编号',
						showOverflowTooltip: true
					},
					{
						prop: 'tenantName',
						width: 180,
						label: '租户名称',
						showOverflowTooltip: true
					},
					{
						prop: 'comments',
						label: '备注',
						showOverflowTooltip: true
					}
				],
				columnsRight: [{
						width: 45,
						type: 'selection',
						columnKey: 'selection',
						selectable: (row, index) => {
							return row.deleted != 1;
						},
						align: 'center'
					},
					{
						columnKey: 'index',
						type: 'index',
						width: 45,
						align: 'center',
						showOverflowTooltip: true,
					}, {
						prop: 'title',
						label: '菜单名称',
						showOverflowTooltip: true,
						slot: "title"
					},
					{
						prop: 'menuType',
						label: '类型',
						width: 60,
						showOverflowTooltip: true,
						slot: "menuType"
					}, {
						prop: 'authority',
						width: 180,
						label: '权限标识',
						showOverflowTooltip: true
					}
				],
				// 当前编辑数据
				current: null,
				// 是否显示编辑弹窗
				showEdit: false,
				// 编辑回显数据
				editData: null,
				// 菜单数据
				menus: [],
				selection: [],

			};
		},
		methods: {
			/* tenant数据源 */
			datasource() {
				return getTenantList();
			},
			//获取Super菜单
			getSuperMenus(cb) {
				getSuperMenuList().then(res => {
					//转成树
					const result = this.$util.toTreeData({
						data: res,
						idField: 'menuId',
						parentIdField: 'parentId',
						childrenField: 'children',
					});
					var menus = [];
					//按顺序把树摊平，否则选择框有点不动的bug
					(function exec(data, level) {
						for (var i = 0; i < data.length; i++) {
							data[i].level = level;
							menus.push(data[i])
							if (data[i].children && data[i].children.length > 0) {
								var _level = level + 1;
								exec(data[i].children, _level)
							}
						}
					})(result, 0);
					for (var i = 0; i < menus.length; i++) {
						var beforeStr = 0;
						for (var j = 0; j < menus[i].level; j++) {
							beforeStr += 1
						}
						menus[i].level = beforeStr;
						delete menus[i].children;
					}
					this.menus = menus;
					cb && cb()
				}).catch(err=>{
					cb && cb()
				})
			},
			rowClick(row, column, event) {
				this.$refs.tableRight.setSelectedRowKeys(row.menuIds);
			},
			/* 刷新表格 */
			reload() {
				this.$refs.table.reload();
			},
			/* 显示编辑 */
			openEdit(row) {
				this.editData = row;
				this.showEdit = true;
			},
			// 删除租户
			removeTenantFn() {
				this.$confirm('确定要删除吗?', '提示', {
						type: 'warning'
					})
					.then(() => {
						const loading = this.$loading({
							lock: true
						});
						removeTenant(this.current._id)
							.then((msg) => {
								loading.close();
								this.$message.success(msg);
								this.reload()
								this.$refs.tableRight.setSelectedRowKeys([]);
							})
							.catch((e) => {
								loading.close();
							});
					})
					.catch(() => {});
			},
			// 保存分配
			save() {
				var loading = this.$messageLoading("保存中...")
				updateTenant({
						_id: this.current._id + "",
						menuIds: this.selection.map(item => item.menuId),
					})
					.then((msg) => {
						this.$message.success(msg);
						
						this.$refs.tableRight.setSelectedRowKeys([]);
						this.reload()
						loading.close()
					})
					.catch((e) => {
						loading.close()
					});
			},
			editDone() {
				this.reload()
				this.$refs.tableRight.setSelectedRowKeys([]);
			},



		}
	};
</script>

<style lang="scss" scoped>
	.ele-body {
		:deep(.el-table__row) {
			cursor: pointer;
		}

		.title-wrap {
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.title-divide {
				display: block;
				height: 1px;
				border-top: 1px dashed var(--color-info-5);
				margin-right: 2px;
			}
		}
	}
</style>
