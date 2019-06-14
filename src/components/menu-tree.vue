<template>
  <div>
    <div v-for="item in list">
      <el-menu-item v-if="!item.children && !item.hidden && isAdminShow(item.meta)"
                    :index="headUrl+strUrl+item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <el-submenu v-if="item.children && item.children.length && isAdminShow(item.meta)"
                  :index="headUrl+strUrl+item.path">
        <template slot="title">
          <i :class="item.meta.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <menu-tree :list="item.children" :path="strUrl+item.path"></menu-tree>
      </el-submenu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "menu-tree",
    props: ['list', 'path'],
    data() {
      return {
        headUrl: '/main/',
        strUrl: '',
      }
    },
    created() {
      if (this.path) {
        this.strUrl += this.path + '/';
      }
    },
    methods: {
      isAdminShow(meta) {
        if (meta.role && this.$store.state.userinfo.role !== meta.role) {
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped>

</style>
