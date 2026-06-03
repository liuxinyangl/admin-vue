<!-- 机构选择下拉框 -->
<template>
	<ele-tree-select clearable :value="value || ''" :data="orgData" label-key="organizationName" value-key="_id"
		default-expand-all :placeholder="placeholder" :disabled="disabled" @input="updateValue" />
</template>

<script>
	import {
		listOrganizations,
	} from '@/api/system/organization';
	export default {
		data() {
			return {
				data: []
			}
		},
		computed: {
			orgData() {
				if(this.isSuperAdmin){
					//Super需要一个租户过滤
					var data = this.data.filter(item=>{
						return item.tenantId == this.tenantId
					})
					return this.$util.toTreeData({
						data,
						idField: '_id',
						parentIdField: 'parentId',
						childrenField: 'children',
					});
				}else{
					return this.$util.toTreeData({
						data: this.data,
						idField: '_id',
						parentIdField: 'parentId',
						childrenField: 'children',
					});
				}
			}
		},
		props: {
			value: Number | String,
			// 提示信息
			placeholder: {
				type: String,
				default: '请选择机构'
			},
			disabled: {
				default: false
			},
			// 传入的tenantId
			tenantId: String,
			// 是否Super超级管理员
			isSuperAdmin: Boolean,
		},
		methods: {
			/* 更新选中数据 */
			updateValue(value) {
				this.$emit('input', value);
			},
			// 获取数据
			getData() {
				listOrganizations()
					.then((list) => {
						this.data = list;
					})
					.catch((e) => {});
			},
		}
	};
</script>
