<template>
	<div class="ele-body">
		<el-card shadow="never" v-loading="loading">
			<ele-split-layout width="260px" allow-collapse :right-style="{ overflow: 'hidden' }">
				<div>
					<!-- 操作按钮 -->
					<ele-toolbar class="ele-toolbar-actions">
						<div class="action-wrap">
							<span class="ele-text-heading ele-text-info">组织机构树</span>
							<div v-if="!g_isSuperAdmin">
								<el-button title="增加组织机构" size="small" type="success" icon="el-icon-plus"
									class="ele-btn-icon" @click="openEdit()">
								</el-button>
								<el-button title="修改组织机构" size="small" type="primary" icon="el-icon-edit"
									class="ele-btn-icon" :disabled="!current || current?._id=='-1'"
									@click="openEdit(current)">
								</el-button>
								<el-button title="删除组织机构" size="small" type="danger" icon="el-icon-delete"
									class="ele-btn-icon" :disabled="!current || current?._id=='-1'" @click="remove">
								</el-button>
							</div>
						</div>
					</ele-toolbar>
					<div class="ele-border-lighter sys-organization-list">
						<el-tree ref="tree" :data="data" highlight-current node-key="_id"
							:props="{ label: 'organizationName' }" :expand-on-click-node="false"
							:default-expand-all="true" @node-click="onNodeClick" />
					</div>
				</div>
				<template v-slot:content>
					<org-user-list v-if="current" :organization-list="data" :organization-id="current._id" />
					<el-alert v-else title="请选择左侧的组织机构" type="warning" show-icon class="ele-alert-border" />
				</template>
			</ele-split-layout>
		</el-card>
		<!-- 编辑弹窗 -->
		<org-edit :visible.sync="showEdit" :data="editData" :parent-id="parentId" :organization-list="data"
			@done="query" />
	</div>
</template>

<script>
	import OrgUserList from './components/org-user-list.vue';
	import OrgEdit from './components/org-edit.vue';
	import {
		listOrganizations,
		addOrganization,
		updateOrganization,
		removeOrganization,
		pageOrgUser
	} from '@/api/system/organization';

	export default {
		name: 'SystemOrganization',
		components: {
			OrgUserList,
			OrgEdit
		},
		data() {
			return {
				// 加载状态
				loading: true,
				// 树形数据
				data: [],
				// 选中数据
				current: null,
				// 是否显示表单弹窗
				showEdit: false,
				// 编辑回显数据
				editData: null,
				// 上级id
				parentId: null
			};
		},
		created() {
			this.query();
		},
		methods: {
			/* 查询 */
			query() {
				this.loading = true;
				listOrganizations()
					.then((list) => {
						this.loading = false;
						list.unshift({
							_id: "-1",
							parentId: "",
							disabled: true,
							children: [],
							organizationName: "未分配的用户",
						})
						this.data = this.$util.toTreeData({
							data: list,
							idField: '_id',
							parentIdField: 'parentId'
						});
					})
					.catch((e) => {
						this.loading = false;
					});
			},
			/* 选择数据 */
			onNodeClick(row) {
				if (row) {
					this.current = row;
					this.parentId = row._id;
					this.$refs.tree.setCurrentKey(row._id);
				} else {
					this.current = null;
					this.parentId = null;
				}
			},
			/* 显示编辑 */
			openEdit(item) {
				this.editData = item;
				this.showEdit = true;
			},
			/* 删除 */
			remove() {
				this.$confirm('确定要删除选中的机构吗?', '提示', {
						type: 'warning'
					})
					.then(() => {
						const loading = this.$loading({
							lock: true
						});
						removeOrganization(this.current._id, this.current.createUserId)
							.then((msg) => {
								loading.close();
								this.$message.success(msg);
								this.onNodeClick(null);
								this.query();
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

<style lang="scss" scoped>
	.sys-organization-list {
		height: calc(100vh - 200px);
		box-sizing: border-box;
		border-width: 1px;
		border-style: solid;
		overflow: auto;
	}

	.sys-organization-list :deep(.el-tree-node__content) {
		height: 40px;

		&>.el-tree-node__expand-icon {
			margin-left: 10px;
		}
	}

	.action-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
