<!-- 角色权限分配弹窗 -->
<template>
	<ele-modal width="460px" title="分配权限" :visible="visible" @update:visible="updateVisible">
		<el-scrollbar v-loading="authLoading" style="height: 60vh" wrap-style="overflow-x: hidden;">
			<el-tree ref="tree" show-checkbox :data="authData" node-key="menuId" :default-expand-all="true"
				:props="{ label: 'title' }" :check-strictly="true" >
				<template v-slot="{ data }">
					<span>
						<i :class="data.icon"></i>
						<span style="display: inline-block;margin-right: 10px;"> {{ data.title }}</span>
						<el-tag size="mini" type="danger" v-if="data.menuType == 1">按钮</el-tag>
						
					</span>
				</template>
			</el-tree>
		</el-scrollbar>
		<template v-slot:footer>
			<el-button @click="updateVisible(false)">取消</el-button>
			<el-button type="primary" :loading="loading" @click="save">
				保存
			</el-button>
		</template>
	</ele-modal>
</template>

<script>
	import {
		getRoleMenuData,
		getRoleMenuIds,
		setRoleMenuIds,
		
	} from '@/api/system/role';

	export default {
		props: {
			// 弹窗是否打开
			visible: Boolean,
			// 当前角色数据
			data: Object
		},
		data() {
			return {
				// 权限数据
				authData: [],
				// 权限数据请求状态
				authLoading: false,
				// 提交状态
				loading: false,
			};
		},
		methods: {
			/* 查询权限数据 */
			query() {
				this.authData = [];
				if (!this.data) {
					return;
				}
				this.authLoading = true;
				getRoleMenuData(this.data.tenantId).then(data => {
					this.authLoading = false;
					// 转成树形结构的数据
					this.authData = this.$util.toTreeData({
						data: data,
						idKey: 'menuId',
						pidKey: 'parentId'
					});
					// 回显选中的数据
					getRoleMenuIds(this.data._id).then(menuIds => {
						for(var i=0; i<menuIds.length; i++){
							this.$refs.tree.setChecked(menuIds[i], true)
						}
					})
				}).catch((e) => {
					this.authLoading = false;
				});
			},
			/* 保存权限分配 */
			save() {
				this.loading = true;
				// const ids = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys());
				const ids = this.$refs.tree.getCheckedKeys();
				setRoleMenuIds(this.data._id, ids, this.data.createUserId)
					.then((msg) => {
						this.loading = false;
						this.$message.success(msg);
						this.updateVisible(false);
					})
					.catch((e) => {
						this.loading = false;
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
					this.query();
				}
			}
		}
	};
</script>
