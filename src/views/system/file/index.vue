<template>
	<div class="ele-body">
		<el-card shadow="never">
			<!-- 搜索表单 -->
			<file-search @search="reload" />
			<!-- 数据表格 -->
			<ele-pro-table ref="table" :columns="columns" :datasource="datasource" cache-key="systemFileTable"
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
					<el-upload action="" :show-file-list="false" :before-upload="onUpload"
						class="ele-action ele-inline-block">
						<el-button size="small" type="primary" icon="el-icon-upload2" class="ele-btn-icon">
							上传
						</el-button>
					</el-upload>
					<!-- <el-button size="small" type="danger" icon="el-icon-delete" class="ele-btn-icon"
						@click="removeBatch">
						删除
					</el-button> -->
				</template>
				<!-- 文件名称 -->
				<template v-slot:fileName="{ row }">
					<span v-html="fileNameHtml(row)"></span>
				</template>
				<!-- 文件路径列 -->
				<template v-slot:filePath="{ row }">
					<a :href="row.filePath" target="_blank">
						{{ row.filePath }}
					</a>
				</template>
				<!-- 操作列 -->
				<template v-slot:action="{ row }">
					<el-link type="primary" :underline="false" icon="el-icon-download" :href="row.filePath"
						target="_blank">
						下载
					</el-link>
					<el-popconfirm class="ele-action" title="确定要删除此文件吗？" @confirm="remove(row)">
						<template v-slot:reference>
							<el-link type="danger" :underline="false" icon="el-icon-delete">
								删除
							</el-link>
						</template>
					</el-popconfirm>
				</template>
			</ele-pro-table>
		</el-card>
	</div>
</template>

<script>
	import FileSearch from './components/file-search.vue';
	import UniCloudStorage from 'uni-cloud-storage'
	import {
		UniCloud_SpaceID,
		UniCloud_clientSecret
	} from '@/config/setting';
	import {
		addFile,
		pageFile,
		removeFile
	} from '@/api/system/file';
	import tblContentMixin from '@/mixins/tblContentMixin.js';

	export default {
		name: 'SystemFile',
		components: {
			FileSearch
		},
		mixins: [tblContentMixin],
		data() {
			return {
				// 查询条件，仅用于fileName上色使用
				where: {},
				// 表格列配置
				columns: [
					// {
					// 	columnKey: 'selection',
					// 	type: 'selection',
					// 	width: 45,
					// 	align: 'center',
					// 	fixed: 'left'
					// },
					{
						columnKey: 'index',
						type: 'index',
						width: 45,
						align: 'center',
						showOverflowTooltip: true,
						fixed: 'left'
					},
					{
						prop: 'fileName',
						label: '文件名称',
						showOverflowTooltip: true,
						slot: 'fileName'
					},
					{
						prop: 'filePath',
						label: '文件路径',
						showOverflowTooltip: true,
						slot: 'filePath'
					},
					{
						prop: 'fileSize',
						label: '文件大小',
						sortable: 'custom',
						showOverflowTooltip: true,
						width: 110,
						formatter: (row) => {
							if (row.fileSize < 1024) {
								return row.fileSize + 'B';
							} else if (row.fileSize < 1024 * 1024) {
								return (row.fileSize / 1024).toFixed(1) + 'KB';
							} else if (row.fileSize < 1024 * 1024 * 1024) {
								return (row.fileSize / 1024 / 1024).toFixed(1) + 'M';
							} else {
								return (row.fileSize / 1024 / 1024 / 1024).toFixed(1) + 'G';
							}
						}
					},
					{
						prop: 'contentType',
						label: '文件类型',
						showOverflowTooltip: true,
						width: 100,
					},
					{
						prop: 'createUserName',
						label: '上传人',
						showOverflowTooltip: true,
						width: 110
					},
					{
						prop: 'createTime',
						label: '上传时间',
						sortable: 'custom',
						showOverflowTooltip: true,
						width: 160,
						formatter: (_row, _column, cellValue) => {
							return this.$util.toDateString(cellValue);
						}
					},
					{
						columnKey: 'action',
						label: '操作',
						width: 130,
						align: 'center',
						resizable: false,
						slot: 'action',
						showOverflowTooltip: true
					}
				],
				// 表格选中数据
				// selection: []
			};
		},
		methods: {
			fileNameHtml(row){
				var where = this.where;
				if(!where) return row.fileName;
				if(where.fileName){
					var _ = where.fileName;
					var fileName = row.fileName;
					var reg = new RegExp(_, "gi")
					fileName = fileName.replace(reg, "<b style='color:red;'>"+_+"</b>");
					return fileName
				}
				return row.fileName;
			},
			/* 表格数据源 */
			datasource({
				page,
				limit,
				where,
				order
			}) {
				return pageFile({
					...where,
					...order,
					page,
					limit
				});
			},
			/* 刷新表格 */
			reload(where) {
				this.where = where;
				this.$refs.table.reload({
					page: 1,
					where: where
				});
			},
			/* 删除 */
			remove(row) {
				if (!this.$hasPermission("sys:file:remove")) {
					return this.$message.error("该用户没有删除权限");
				}
				const loading = this.$messageLoading('正在删除');
				removeFile({
						_id: row._id,
						fileId: row.fileId,
						createUserId: row.createUserId,
					})
					.then((msg) => {
						loading.close();
						this.$message.success(msg);
						this.reload();
					})
					.catch((e) => {
						loading.close();
					});
			},
			/* 上传 */
			onUpload(file) {
				if (!this.$hasPermission("sys:file:add")) {
					return this.$message.error("该用户没有上传权限");
				}
				if (file.size / 1024 / 1024 > 10) {
					this.$message.error('文件大小不能超过 10MB');
					return false;
				}
				const loading = this.$messageLoading('正在上传');

				const unics = new UniCloudStorage(UniCloud_SpaceID, UniCloud_clientSecret);
				unics.upload(file, file.name).then(res => {
					if (!res.success) {
						loading.close();
						this.$message.error('上传出错 [success:false]');
						console.error(res)
						return;
					}
					//写入文件记录
					var dataObj = {
						fileId: res.data.id,
						filePath: res.data.target,
						fileName: file.name,
						fileSize: file.size,
						contentType: file.type,
					};
					addFile(dataObj)
						.then((msg) => {
							loading.close();
							this.$message.success('上传成功');
							this.reload();
						})
						.catch((e) => {
							loading.close();
						});
				}).catch(err => {
					loading.close();
					this.$message.error('上传出错 [unics]');
					console.error(err)
				})
				return false;
			},


		}
	};
</script>
