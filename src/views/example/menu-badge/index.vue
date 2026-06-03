<template>
  <div class="ele-body">
    <el-card shadow="never">
      <el-form label-width="90px" style="max-width: 360px; padding-top: 20px">
        <el-form-item label="菜单:">
          <ele-tree-select
            clearable
            v-model="path"
            :data="menus"
            default-expand-all
            placeholder="请选择菜单"
          />
        </el-form-item>
        <el-form-item label="徽章值:">
          <el-input
            v-model="badge"
            placeholder="请输入徽章值"
            clearable
            :maxlength="20"
          />
        </el-form-item>
        <el-form-item label="徽章颜色:">
          <el-select
            v-model="color"
            placeholder="请选择徽章颜色"
            clearable
            class="ele-fluid"
          >
            <el-option label="primary" value="primary" />
            <el-option label="success" value="success" />
            <el-option label="warning" value="warning" />
            <el-option label="danger" value="danger" />
            <el-option label="info" value="info" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="setBadge">更新</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { formatTreeData } from 'ele-admin';

  export default {
    name: 'ExampleMenuBadge',
    data() {
      return {
        path: '',
        badge: '',
        color: ''
      };
    },
    computed: {
      menus() {
        return formatTreeData(this.$store.state.user.menus, (m) => {
          return {
            ...m,
            value: m.path,
            label: m.meta.title
          };
        });
      }
    },
    methods: {
      setBadge() {
        if (!this.path) {
          this.$message.error('请选择菜单');
          return;
        }
        this.$store.dispatch('user/setMenuBadge', {
          path: this.path,
          value: this.badge,
          color: this.color || undefined
        });
      }
    }
  };
</script>
