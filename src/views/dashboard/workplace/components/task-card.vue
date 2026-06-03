<template>
	<el-card shadow="never" :body-style="CardBodyStyle+';overflow: hidden;'" class="workplace-table-card">
		<template v-slot:header>
			<span>{{ title }}</span>
			<more-icon @remove="onRemove" @edit="onEdit" />
		</template>
		<el-scrollbar :style="ScrollbarHeight+';'" wrapStyle="overflow-x: hidden;" viewStyle="padding: 0 10px 10px;">
			<table class="ele-table" style="table-layout: fixed">
				<colgroup>
					<col width="25" />
					<col width="65" />
					<col />
					<col width="65" />
				</colgroup>
				<thead>
					<tr style="background: none">
						<th></th>
						<th>优先级</th>
						<th class="ele-elip">任务名称</th>
						<th style="text-align: center">状态</th>
					</tr>
				</thead>
				<vue-draggable tag="tbody" :animation="300" v-model="taskList" handle=".sort-handle"
					:set-data="() => void 0">
					<tr v-for="d in taskList" :key="d.id">
						<td style="text-align: center">
							<i class="sort-handle el-icon-_nav ele-text-placeholder"></i>
						</td>
						<td>
							<el-tag style="margin:0 auto;display: block;" size="mini" class="ele-tag-round"
								:type="['danger', 'warning', 'primary'][d.priority - 1]">
								{{ d.priority }}
							</el-tag>
						</td>
						<td class="ele-elip">
							<el-link type="primary" :underline="false" class="ele-inline">
								{{ d.taskName }}
							</el-link>
						</td>
						<td style="text-align: center">
							<span :class="
                ['ele-text-warning', 'ele-text-success', 'ele-text-info'][
                  d.status
                ]
              ">
								{{ ['未开始', '进行中', '已完成'][d.status] }}
							</span>
						</td>
					</tr>
				</vue-draggable>
			</table>
		</el-scrollbar>
	</el-card>
</template>

<script>
	import VueDraggable from 'vuedraggable';
	import MoreIcon from './more-icon.vue';
	import cardMixins from '../card-mixins.js';

	export default {
		components: {
			VueDraggable,
			MoreIcon
		},
		mixins: [cardMixins],
		props: {
			title: String
		},
		data() {
			return {
				taskList: []
			};
		},
		created() {
			this.queryTaskList();
		},
		methods: {
			queryTaskList() {
				this.taskList = [{
						id: 1,
						priority: 1,
						taskName: '解决项目一的bug',
						status: 0
					},
					{
						id: 2,
						priority: 2,
						taskName: '解决项目二的bug',
						status: 0
					},
					{
						id: 3,
						priority: 2,
						taskName: '解决项目三的bug',
						status: 1
					},
					{
						id: 4,
						priority: 3,
						taskName: '解决项目四的bug',
						status: 1
					},
					{
						id: 5,
						priority: 3,
						taskName: '解决项目五的bug',
						status: 2
					},
					{
						id: 6,
						priority: 3,
						taskName: '解决项目六的bug',
						status: 2
					},
					{
						id: 7,
						priority: 1,
						taskName: '解决项目六的bug',
						status: 2
					}
				];
			},
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
	.ele-table tbody>tr:last-child td {
		border-bottom: none;
	}

	.ele-table {
		td {
			padding-top: 11px;
			padding-bottom: 11px;
		}

		tr.sortable-chosen {
			background: hsla(0, 0%, 60%, 0.1);
		}
	}

	.workplace-table-card .sort-handle {
		cursor: move;
		font-size: 18px;
	}
</style>
