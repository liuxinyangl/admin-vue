export default {
	data() {
		return {
			// 搜索表单是否展开
			mix_searchExpand: false,

		}
	},
	props: {
		mix_showExpandBtn: Boolean,
	},
	methods: {
		/* 搜索展开/收起 */
		mix_toggleExpand() {
			this.mix_searchExpand = !this.mix_searchExpand;
			this.$emit('expand-change', this.mix_searchExpand);
		},
	}
};
