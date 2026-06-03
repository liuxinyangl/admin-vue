<template>
  <div class="ele-body oss-dashboard">
    <el-row :gutter="15">
      <el-col
        v-for="item in summaryCards"
        :key="item.label"
        :lg="6"
        :md="12"
        :sm="12"
        :xs="24"
      >
        <el-card shadow="never" class="summary-card">
          <div class="summary-icon" :class="item.type">
            <i :class="item.icon"></i>
          </div>
          <div class="summary-content">
            <div class="summary-value">{{ item.value }}</div>
            <div class="summary-label">{{ item.label }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :lg="14" :md="24" :sm="24" :xs="24">
        <el-card shadow="never" header="公开仓库清理">
          <el-table :data="securityItems" size="small" style="width: 100%">
            <el-table-column prop="name" label="项目" min-width="160" />
            <el-table-column prop="owner" label="责任" width="120" />
            <el-table-column label="状态" width="120">
              <template v-slot="{ row }">
                <el-tag :type="row.done ? 'success' : 'warning'" size="small">
                  {{ row.done ? '已处理' : '待处理' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="note" label="说明" min-width="220" />
          </el-table>
        </el-card>
      </el-col>

      <el-col :lg="10" :md="24" :sm="24" :xs="24">
        <el-card shadow="never" header="环境配置状态">
          <div
            v-for="item in envItems"
            :key="item.key"
            class="env-row ele-border-lighter"
          >
            <div>
              <div class="env-name">{{ item.label }}</div>
              <div class="env-key">{{ item.key }}</div>
            </div>
            <el-tag :type="item.configured ? 'success' : 'info'" size="small">
              {{ item.configured ? '已配置' : '未配置' }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="15">
      <el-col :lg="12" :md="24" :sm="24" :xs="24">
        <el-card shadow="never" header="维护任务">
          <el-timeline>
            <el-timeline-item
              v-for="item in maintenanceTasks"
              :key="item.title"
              :type="item.type"
              :timestamp="item.stage"
            >
              <div class="task-title">{{ item.title }}</div>
              <div class="task-desc ele-text-secondary">{{ item.desc }}</div>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>

      <el-col :lg="12" :md="24" :sm="24" :xs="24">
        <el-card shadow="never" header="模块覆盖">
          <el-row :gutter="12">
            <el-col
              v-for="item in moduleItems"
              :key="item.name"
              :md="12"
              :sm="12"
              :xs="24"
            >
              <div class="module-item ele-border-lighter">
                <i :class="item.icon"></i>
                <div>
                  <div class="module-name">{{ item.name }}</div>
                  <div class="module-desc ele-text-secondary">{{ item.desc }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    API_BASE_URL,
    MAP_WebService_Key,
    MAP_Webjs_Key,
    UniCloud_SpaceID,
    UniCloud_clientSecret
  } from '@/config/setting';

  export default {
    name: 'MaintenanceOpenSource',
    data() {
      return {
        securityItems: [
          {
            name: '公开演示账号',
            owner: '文档',
            done: true,
            note: 'README 不再展示线上账号和默认密码。'
          },
          {
            name: 'uniCloud 服务配置',
            owner: '配置',
            done: true,
            note: '真实空间 ID 和 client secret 已改为环境变量。'
          },
          {
            name: '地图与 OSS 参数',
            owner: '配置',
            done: true,
            note: '公开仓库仅保留 .env.example 占位项。'
          },
          {
            name: 'Git 历史凭据',
            owner: '仓库',
            done: false,
            note: '如历史提交含真实凭据，需要重写历史或轮换密钥。'
          }
        ],
        maintenanceTasks: [
          {
            stage: '当前',
            type: 'success',
            title: '配置样例整理',
            desc: '保持 .env.example 与源码读取项同步，降低部署踩坑。'
          },
          {
            stage: '下一步',
            type: 'primary',
            title: '补充 CI 构建检查',
            desc: '在 GitHub Actions 中运行依赖安装和生产构建。'
          },
          {
            stage: '持续',
            type: 'warning',
            title: '依赖风险治理',
            desc: '跟踪 Vue2、vue-i18n、vm2 等 EOL 或安全告警。'
          }
        ],
        moduleItems: [
          {
            name: '租户管理',
            icon: 'el-icon-office-building',
            desc: '支持 SaaS 多租户组织隔离。'
          },
          {
            name: '权限体系',
            icon: 'el-icon-lock',
            desc: '包含菜单、角色、用户和按钮权限。'
          },
          {
            name: '文件能力',
            icon: 'el-icon-folder-opened',
            desc: '覆盖文件记录、上传和云存储。'
          },
          {
            name: '运维示例',
            icon: 'el-icon-set-up',
            desc: '包含表格、表单、上传、地图等示例。'
          }
        ]
      };
    },
    computed: {
      envItems() {
        return [
          {
            key: 'VUE_APP_API_BASE_URL',
            label: 'API 服务地址',
            configured: this.isConfigured(API_BASE_URL)
          },
          {
            key: 'VUE_APP_UNICLOUD_SPACE_ID',
            label: 'uniCloud 空间 ID',
            configured: this.isConfigured(UniCloud_SpaceID)
          },
          {
            key: 'VUE_APP_UNICLOUD_CLIENT_SECRET',
            label: 'uniCloud Client Secret',
            configured: this.isConfigured(UniCloud_clientSecret)
          },
          {
            key: 'VUE_APP_MAP_WEBJS_KEY',
            label: '高德 Web JS Key',
            configured: this.isConfigured(MAP_Webjs_Key)
          },
          {
            key: 'VUE_APP_MAP_WEBSERVICE_KEY',
            label: '高德 WebService Key',
            configured: this.isConfigured(MAP_WebService_Key)
          }
        ];
      },
      summaryCards() {
        return [
          {
            label: '开源许可证',
            value: 'AGPL-3.0',
            icon: 'el-icon-document-checked',
            type: 'blue'
          },
          {
            label: '配置来源',
            value: '.env',
            icon: 'el-icon-setting',
            type: 'green'
          },
          {
            label: '核心模块',
            value: this.moduleItems.length,
            icon: 'el-icon-menu',
            type: 'orange'
          },
          {
            label: '待治理项',
            value: this.securityItems.filter((item) => !item.done).length,
            icon: 'el-icon-warning-outline',
            type: 'red'
          }
        ];
      }
    },
    methods: {
      isConfigured(value) {
        return Boolean(value && !String(value).includes('your-'));
      }
    }
  };
</script>

<style lang="scss" scoped>
  .oss-dashboard {
    .el-card {
      margin-bottom: 15px;
    }
  }

  .summary-card {
    :deep(.el-card__body) {
      display: flex;
      align-items: center;
      min-height: 82px;
    }
  }

  .summary-icon {
    width: 46px;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-right: 14px;
    font-size: 24px;

    &.blue {
      color: #2f7de1;
      background: rgba(47, 125, 225, 0.1);
    }

    &.green {
      color: #17a673;
      background: rgba(23, 166, 115, 0.1);
    }

    &.orange {
      color: #d9822b;
      background: rgba(217, 130, 43, 0.12);
    }

    &.red {
      color: #c0392b;
      background: rgba(192, 57, 43, 0.1);
    }
  }

  .summary-value {
    font-size: 22px;
    line-height: 1.2;
    font-weight: 600;
  }

  .summary-label,
  .env-key,
  .module-desc,
  .task-desc {
    font-size: 12px;
  }

  .env-row {
    min-height: 54px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-style: solid;

    &:last-child {
      border-bottom: 0;
    }
  }

  .env-name,
  .module-name,
  .task-title {
    font-weight: 500;
  }

  .env-key {
    margin-top: 3px;
    color: #909399;
    word-break: break-all;
  }

  .module-item {
    min-height: 76px;
    display: flex;
    align-items: flex-start;
    padding: 14px;
    margin-bottom: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;

    i {
      margin-right: 10px;
      margin-top: 2px;
      font-size: 20px;
      color: #2f7de1;
    }
  }
</style>
