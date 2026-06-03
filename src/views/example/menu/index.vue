<template>
  <div class="ele-body">
    <el-card shadow="never">
      <div>
        菜单一和菜单二是同一个路由同一个组件, 只是路由参数不同,
        侧栏会选中各自对应的菜单:
      </div>
      <div>参数 id : {{ id }}</div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'ExampleMenu',
    data() {
      return {
        id: undefined
      };
    },
    watch: {
      $route: {
        handler() {
          const path = this.$route.path;
          if (path !== '/example/menu') {
            return;
          }
          this.id = this.$route.query.id;
        },
        immediate: true
      }
    }
  };
</script>
