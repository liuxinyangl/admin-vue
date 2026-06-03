export default {
	data() {
		return {
			//表格高度被减数
			mix_initTableHeight: 305,
			//表格高度不固定偏移 - 不同页面data中加入此参数并修改值即可！
			mix_initTableHeightOffset: 51,
			// 搜索表单是否展开
			mix_searchExpand: false,
			// 展开按钮是否显示
			mix_showExpandBtn: false,
			// 固定表格高度
			mix_fixedHeight: true,

		}
	},
	computed: {
		// 表格高度
		mix_tableHeight() {
			if (!this.mix_showExpandBtn) return void 0;
			//固定高度
			if(this.mix_fixedHeight){
				if(this.mix_searchExpand){
					//展开
					return `calc(100vh - ${this.mix_initTableHeight}px - ${this.mix_initTableHeightOffset}px)`;
				}else{
					//收缩
					return `calc(100vh - ${this.mix_initTableHeight}px)`;
				}
			}else{
			//自动高度
				return void 0;
			}
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.mix_expandBtnInit()
		})
	},
	methods: {
		/* 销毁表格 */
		mix_reloadTable(tableRefName) {
			var tblRef = this.$refs[tableRefName];
			if (tblRef) {
				tblRef.reRenderTable();
			}
		},
		/* 搜索展开改变事件 */
		mix_onExpandChange(value) {
			this.mix_searchExpand = value;
		},
		// 展开按钮初始化
		mix_expandBtnInit() {
			var screenWidth = this.$util.screenWidth();
			if (screenWidth < 1200) {
				this.mix_showExpandBtn = false
				this.mix_searchExpand = true
			} else {
				this.mix_showExpandBtn = true
				this.mix_searchExpand = false
			}
		},

	},
};
