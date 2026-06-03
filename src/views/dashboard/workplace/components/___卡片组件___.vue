<template>
	<el-card shadow="never" :body-style="CardBodyStyle+';'" class="workplace-card-ccc">
		<template v-slot:header>
			<span>{{ title }}</span>
			<more-icon @remove="onRemove" @edit="onEdit" />
		</template>
		<el-scrollbar :style="ScrollbarHeight+';'" wrapStyle="overflow-x: hidden;" viewStyle="padding: 0px 0px;">
			<div>
				内容123
			</div>
		</el-scrollbar>
	</el-card>
</template>

<script>
	import MoreIcon from './more-icon.vue';
	import cardMixins from '../card-mixins.js';

	export default {
		components: {
			MoreIcon
		},
		mixins: [cardMixins],
		props: {
			title: String
		},
		data() {
			return {
				
			};
		},
		created() {
			
		},
		methods: {
			onRemove() {
				this.$emit('remove');
			},
			onEdit() {
				this.$emit('edit');
			}
		}
	};
</script>

<style lang="scss" scoped>
	.workplace-card-ccc{
		:deep(.xxx) {
		
		}
	}
</style>
