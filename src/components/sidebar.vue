<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu router :default-active="defaultUrl" mode="vertical" :collapse="isCollapse" :collapse-transition="false"
               background-color="#304156"
               text-color="#bfcbd9" active-text-color="#409EFF">
        <el-menu-item index="/main/clock-out">
          <i class="el-icon-time"></i>
          <span slot="title">Clock Out</span>
        </el-menu-item>
        <el-menu-item index="/main/tipoff-record">
          <i class="el-icon-alarm-clock"></i>
          <span slot="title">Tipoff Record</span>
        </el-menu-item>
        <el-submenu index="/setting">
          <template slot="title">
            <i class="menu-icon el-icon-setting"></i>
            <span slot="title">Setting</span>
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
    data () {
      return {
        number: true,
        defaultUrl: '/main/clock-out'
      }
    },
    watch: {
      $route (newValue) {
        console.log(newValue.path)
        this.defaultUrl = newValue.path
      }
    },
    computed: {
      isCollapse () {
        return !this.$store.state.opened
      }

    },
    created () {
      // console.log(this.$store.state.sidebar)
      // console.log(this.sidebar)
    },
    mounted () {
      let href = window.location.href
      this.defaultUrl = href.split('#')[1]
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
