export default {
	data() {
		return {

		}
	},
	computed: {
		g_user() {
			return this.$store.state.user.info || {};
		},
		g_isSuperAdmin() {
			return this.g_user.tenantId === '0';
		},
	},
	methods: {

	}
};
