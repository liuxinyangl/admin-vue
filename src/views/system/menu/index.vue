<template>
	<div class="ele-body">
		<el-card shadow="never">
			<!-- 搜索表单 -->
			<menu-search @search="reload" :mix_showExpandBtn="mix_showExpandBtn" />
			<!-- 数据表格 -->
			<ele-pro-table ref="table" row-key="menuId" :columns="columns" :datasource="datasource"
				:default-expand-all="true" :need-page="false" :parse-data="parseData" cache-key="systemMenuTable"
				@done="onDone" :height="mix_tableHeight" :pageSize="20" :pageSizes="[20,50,100]">
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
					<el-button class="ele-btn-icon" size="small" @click="expandAll">
						展开全部
					</el-button>
					<el-button class="ele-btn-icon" size="small" @click="foldAll">
						折叠全部
					</el-button>
				</template>
				<!-- 标题列 -->
				<template v-slot:title="{ row }">
					<i :class="row.icon"></i>{{ row.title }}<span v-if="row.hide==1" class="hide-tooltip">{{'隐藏'}}</span>
				</template>
				<!-- 类型列 -->
				<template v-slot:menuType="{ row }">
					<el-tag v-if="isUrl(row.path)" type="danger" size="mini" :disable-transitions="true">
						外链
					</el-tag>
					<el-tag v-else-if="isUrl(row.component)" type="warning" size="mini" :disable-transitions="true">
						内链
					</el-tag>
					<el-tag v-else-if="isDirectory(row)" type="info" size="mini" :disable-transitions="true">
						目录
					</el-tag>
					<el-tag v-else :type="['primary', 'danger'][row.menuType]" size="mini" :disable-transitions="true">
						{{ ['菜单', '按钮'][row.menuType] }}
					</el-tag>
				</template>
				<!-- 操作列 -->
				<template v-slot:action="{ row }">
					<el-link type="primary" :disabled="row.menuType !== 0" :underline="false" icon="el-icon-plus" @click="openEdit(null, row.menuId)">
						添加
					</el-link>
					<el-link type="primary" :underline="false" icon="el-icon-edit" @click="openEdit(row)">
						修改
					</el-link>
					<el-popconfirm class="ele-action" title="确定要删除吗？" @confirm="remove(row)">
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
		<menu-edit :data="current" :parent-id="parentId" :menu-list="menuList" :visible.sync="showEdit"
			@done="reload" />
	</div>
</template>

<script>
	import MenuSearch from './components/menu-search.vue';
	import MenuEdit from './components/menu-edit.vue';
	import {
		listMenus,
		removeMenu
	} from '@/api/system/menu';
	import tblContentMixin from '@/mixins/tblContentMixin.js';

	export default {
		mixins: [tblContentMixin],
		name: 'SystemMenu',
		components: {
			MenuSearch,
			MenuEdit
		},
		data() {
			return {
				// 表格列配置
				columns: [
					// {
					// 	columnKey: 'index',
					// 	type: 'index',
					// 	width: 45,
					// 	align: 'center',
					// 	showOverflowTooltip: true,
					// },
					{
						prop: 'title',
						label: '菜单名称',
						showOverflowTooltip: true,
						minWidth: 220,
						slot: 'title'
					},
					{
						prop: 'menuType',
						label: '类型',
						align: 'center',
						showOverflowTooltip: true,
						width: 58,
						slot: 'menuType'
					},
					{
						prop: 'path',
						label: '菜单地址',
						showOverflowTooltip: true,
						minWidth: 220
					},
					{
						prop: 'component',
						label: '组件路径',
						showOverflowTooltip: true,
						minWidth: 220
					},
					{
						prop: 'authority',
						label: '权限标识',
						showOverflowTooltip: true,
						minWidth: 180
					},
					{
						prop: 'hide',
						label: '可见',
						align: 'center',
						showOverflowTooltip: true,
						width: 60,
						formatter: (_row, _column, cellValue) => {
							return ['是', '否'][cellValue];
						}
					},
					{
						prop: 'sortNumber',
						label: '排序',
						align: 'center',
						showOverflowTooltip: true,
						width: 60
					},
					{
						prop: 'createTime',
						label: '创建时间',
						showOverflowTooltip: true,
						minWidth: 110,
						formatter: (_row, _column, cellValue) => {
							return this.$util.toDateString(cellValue);
						}
					},
					{
						columnKey: 'action',
						label: '操作',
						width: 190,
						align: 'center',
						resizable: false,
						slot: 'action',
						showOverflowTooltip: true,
						fixed: 'right',
					}
				],
				// 当前编辑数据
				current: null,
				// 是否显示编辑弹窗
				showEdit: false,
				// 全部菜单数据
				menuList: [],
				// 上级菜单id
				parentId: null,
				mix_initTableHeight: 260,
			};
		},
		methods: {
			/* 表格数据源 */
			datasource({ where }) {
				return listMenus({
					...where
				});
			},
			/* 数据转为树形结构 */
			parseData(data) {
				this.menuList = data.list || [];
				return this.$util.toTreeData({
					data: data.list,
					idField: 'menuId',
					parentIdField: 'parentId'
				});
			},
			/* 表格渲染完成回调 */
			onDone({ data }) {
				
			},
			/* 刷新表格 */
			reload(where) {
				this.$refs.table.reload({
					where: where
				});
			},
			/* 显示编辑 */
			openEdit(row, parentId) {
				this.current = row;
				this.parentId = parentId;
				this.showEdit = true;
			},
			/* 删除 */
			remove(row) {
				if (row.children?.length) {
					this.$message.error('请先删除子节点');
					return;
				}
				const loading = this.$loading({
					lock: true
				});
				removeMenu(row._id, row.createUserId)
					.then((msg) => {
						loading.close();
						this.$message.success(msg);
						this.reload();
					})
					.catch((e) => {
						loading.close();
					});
			},
			/* 展开全部 */
			expandAll() {
				this.$refs.table.toggleRowExpansionAll(true);
			},
			/* 折叠全部 */
			foldAll() {
				this.$refs.table.toggleRowExpansionAll(false);
			},
			/* 判断是否是外链 */
			isUrl(url) {
				return !!(
					url &&
					(url.startsWith('http://') ||
						url.startsWith('https://') ||
						url.startsWith('//'))
				);
			},
			/* 判断是否是目录 */
			isDirectory(d) {
				return !!d.children?.length && !d.component;
			}
		}
	};
</script>
<style lang="scss" scoped>
	.hide-tooltip{
		font-size: 12px;
		display: inline-block;
		margin: 0 4px;
		background: var(--background-color-base);
		text-align: center;
		height: 18px;
		line-height: 18px;
		width: 36px;
		border-radius: 4px;
		color: var(--color-text-secondary);
	}
</style>