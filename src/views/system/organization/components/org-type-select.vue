<!-- 机构类型选择下拉框 -->
<template>
	<el-select clearable :value="value" class="ele-fluid" :placeholder="placeholder" @input="updateValue">
		<el-option v-for="item in data" :key="item.dictDataCode" :value="item.dictDataCode"
			:label="item.dictDataName" />
	</el-select>
</template>

<script>
	import {
		getDictDataByCode
	} from '@/api/system/dictionary';

	export default {
		props: {
			// 选中的数据(v-modal)
			value: String,
			// 提示信息
			placeholder: {
				type: String,
				default: '请选择机构类型'
			}
		},
		data() {
			return {
				// 机构类型数据
				data: []
			};
		},
		created() {
			// this.getData()
		},
		methods: {
			/* 更新选中数据 */
			updateValue(value) {
				this.$emit('input', value);
			},
			getData() {
				/* 获取机构类型数据 */
				getDictDataByCode('organizationType')
					.then((list) => {
						this.data = list;
					})
					.catch((e) => {

					});
			},

		}
	};
</script>
