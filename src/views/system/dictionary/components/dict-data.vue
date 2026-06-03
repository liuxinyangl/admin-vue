<template>
	<div>
		<!-- 数据表格 -->
		<ele-pro-table ref="table" :columns="columns" :datasource="datasource" :selection.sync="selection"
			height="calc(100vh - 205px)" full-height="calc(100vh - 116px)" tool-class="ele-toolbar-form" :needPage="false" 
			cache-key="systemDictDataTable">
			<template v-slot:toolkit>
				<el-button size="small" type="success" icon="el-icon-plus" class="ele-btn-icon" @click="openEdit()">
					添加字典小项
				</el-button>
				<el-button size="small" type="danger" icon="el-icon-delete" class="ele-btn-icon" @click="removeBatch" :disabled="selection?.length == 0">
					删除字典小项
				</el-button>
			</template>
			<!-- 操作列 -->
			<template v-slot:action="{ row }">
				<el-popconfirm class="ele-action" title="确定要删除此项吗？" @confirm="remove(row)">
					<template v-slot:reference>
						<el-link type="danger" :underline="false" icon="el-icon-delete">
							删除
						</el-link>
					</template>
				</el-popconfirm>
			</template>
		</ele-pro-table>
		<!-- 新增弹窗 -->
		<dict-data-edit :visible.sync="showEdit" :oldDictData="oldDictData" :dictId="data._id" :dictParentName="dictParentName" @done="reload" />
	</div>
</template>

<script>
	import DictDataEdit from './dict-data-edit.vue';
	import {
		updateDict,
		listDictData
	} from '@/api/system/dictionary';

	export default {
		components: {
			DictDataEdit
		},
		props: {
			// 选中的字典数据
			data: Object,
			// 字典大项名称
			dictParentName: String,
		},
		data() {
			return {
				// 表格列配置
				columns: [{
						columnKey: 'selection',
						type: 'selection',
						width: 45,
						align: 'center'
					},
					{
						columnKey: 'index',
						type: 'index',
						width: 45,
						align: 'center',
						showOverflowTooltip: true
					},
					{
						prop: 'dictDataName',
						label: '字典小项名称',
						sortable: 'custom',
						showOverflowTooltip: true,
						minWidth: 120
					},
					{
						prop: 'dictDataCode',
						label: '字典小项编码',
						sortable: 'custom',
						showOverflowTooltip: true,
						minWidth: 110
					},
					{
						columnKey: 'action',
						label: '操作',
						width: 90,
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
				// 目前的字典小项数据
				oldDictData: [],
			};
		},
		methods: {
			/* 表格数据源 */
			datasource() {
				if(this.data._id) return listDictData(this.data._id);
			},
			/* 刷新表格 */
			reload(where) {
				this.$refs.table.reload();
			},
			/* 显示编辑 */
			openEdit(row) {
				this.current = row;
				this.showEdit = true;
				this.oldDictData = this.$refs.table.getData()||[];
			},
			/* 删除 */
			remove(row) {
				const loading = this.$loading({
					lock: true
				});
				var dictDataCode = row.dictDataCode;
				var dictData = this.$refs.table.getData()||[];
				dictData = this.$util.deepClone(dictData)
				dictData = dictData.filter(item => {
					return item.dictDataCode != dictDataCode
				})
				var d = {
					_id: this.data._id,
					dictData,
				};
				updateDict(d)
					.then((msg) => {
						loading.close();
						this.$message.success(msg);
						this.reload();
					})
					.catch((e) => {
						loading.close();
						this.$message.error(e.message);
					});
			},
			/* 批量删除 */
			removeBatch() {
				if (!this.selection.length) {
					this.$message.error('请至少选择一条数据');
					return;
				}
				this.$confirm('确定要删除选中的字典项吗?', '提示', {
						type: 'warning'
					})
					.then(() => {
						const loading = this.$loading({
							lock: true
						});
						var dictData = this.$refs.table.getData()||[];
						dictData = this.$util.deepClone(dictData)
						dictData = dictData.filter(item => {
							for (var i = 0; i < this.selection.length; i++) {
								if (this.selection[i].dictDataCode == item.dictDataCode) {
									return false
								}
							}
							return true;
						})
						updateDict({
								_id: this.data._id,
								dictData,
							})
							.then((msg) => {
								loading.close();
								this.$message.success(msg);
								this.reload();
							})
							.catch((e) => {
								loading.close();
							});
					})
					.catch((e) => {
						console.error(e)
					});
			}
		},
		watch: {
			// 监听字典id变化
			'data._id'() {
				this.reload();
			}
		}
	};
</script>
