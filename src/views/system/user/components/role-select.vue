<!-- 角色选择下拉框 -->
<template>
	<el-select multiple clearable :value="value" class="ele-block" :placeholder="placeholder" @input="updateValue">
		<el-option v-for="(item,index) in dataComp" :key="item.roleCode+' - '+index" :value="item.roleCode" :label="item.roleName" />
	</el-select>
</template>

<script>
	import {
		listRoles
	} from '@/api/system/role';

	export default {
		props: {
			value: Array,
			// 提示信息
			placeholder: {
				type: String,
				default: '请选择角色'
			},
			// 传入的tenantId
			tenantId: String,
			// 是否Super超级管理员
			isSuperAdmin: Boolean,
		},
		data() {
			return {
				data: []
			};
		},
		computed: {
			dataComp(){
				if(this.isSuperAdmin){
					return this.data.filter(item=>{
						return item.tenantId == this.tenantId
					})
				}else{
					return this.data
				}
			}
		},
		methods: {
			/* 获取角色数据，非Super不能获取管理员角色 */
			getData(){
				listRoles()
					.then((list) => {
						this.data = list;
					})
					.catch((e) => {
						
					});
			},
			updateValue(value) {
				this.$emit('input', value);
			}
		}
	};
</script>
