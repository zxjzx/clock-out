<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu router :default-active="$route.path" mode="vertical"
               :collapse="isCollapse"
               :collapse-transition="false"
               background-color="#304156"
               text-color="#bfcbd9" active-text-color="#409EFF">
        <menu-tree :list="routerList"></menu-tree>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import MenuTree from './menu-tree'
  export default {
    name: 'sidebar',
    components: {MenuTree},
    data() {
      return {
        number: true,
      }
    },
    computed: {
      isCollapse() {
        return !this.$store.state.opened
      },
    },
    created() {
      let routes = this.$router.options.routes;
      let result = routes.filter(item => item.name == 'main');
      this.routerList = result[0].children
    },
  }
</script>

<style scoped>

</style>
