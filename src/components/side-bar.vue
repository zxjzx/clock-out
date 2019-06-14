<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu router :default-active="$route.path" mode="vertical" :collapse="isCollapse" :collapse-transition="false"
               background-color="#304156"
               text-color="#bfcbd9" active-text-color="#409EFF">
        <el-menu-item index="/main/clock-out">
          <i class="el-icon-time"></i>
          <span slot="title">Clock Out</span>
        </el-menu-item>
        <el-menu-item index="/main/tipoff-record" v-if="isAdmin">
          <i class="el-icon-alarm-clock"></i>
          <span slot="title">Tipoff Record</span>
        </el-menu-item>

        <el-submenu index="/setting">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>Setting</span>
          </template>
          <el-menu-item index="/main/setting/project-setting">
            <i class="el-icon-goods"></i>
            Project Setting
          </el-menu-item>
          <el-menu-item index="/main/setting/user-list-setting">
            <i class="el-icon-user"></i>
            User Info Setting
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>

  export default {
    name: 'sidebar',
    data() {
      return {
        number: true,
        routerList: [],
        isAdmin: this.$store.state.userinfo.role === 'admin'
      }
    },
    watch: {},
    computed: {
      isCollapse() {
        return !this.$store.state.opened
      },
    },
    created() {
      let routes = this.$router.options.routes;
      let result = routes.filter(item => item.name == 'main');
      let routerList = result[0].children;
    },
    methods: {}
  }
</script>

<style scoped>

</style>
