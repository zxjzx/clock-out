<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu router :default-active="$route.path" mode="vertical" :collapse="isCollapse" :collapse-transition="false"
               background-color="#304156"
               text-color="#bfcbd9" active-text-color="#409EFF">
        <div v-for="(item,index) in routerList" :key="index">
          <el-menu-item :index="headerUrl+item.path" v-if="!item.children && isAdminShow(item.meta)">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>

          <el-submenu :index="headerUrl+item.path"
                      v-if="item.children && item.children.length && isAdminShow(item.meta)">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item :index="headerUrl+item.path+'/'+p.path" v-for="(p,pIndex) in item.children" :key="pIndex"
                          v-if="!p.hidden">
              <i :class="p.meta.icon"></i>
              {{p.name}}
            </el-menu-item>
          </el-submenu>
        </div>
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
        isAdmin: this.$store.state.userinfo.role === 'admin',
        headerUrl: '/main/'
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
      console.log(routerList);
      this.routerList = routerList
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
