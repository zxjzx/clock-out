<template>
  <div>

    <el-menu router
             :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
      <el-menu-item index="/main">Home</el-menu-item>
      <el-menu-item index="/main/about">About</el-menu-item>
      <el-menu-item index="/main/clock-out">Clock Out</el-menu-item>
      <el-menu-item index="/main/tipoff-record">Tipoff Record</el-menu-item>
      <el-submenu index="/setting">
        <template slot="title">Setting</template>
        <el-menu-item index="/main/project-setting">Project Setting</el-menu-item>
        <el-menu-item index="/main/user-setting">User Info Setting</el-menu-item>
      </el-submenu>
      <el-menu-item @click.native="logout" style="float: right">Log Out</el-menu-item>
    </el-menu>

    <div style="margin: 24px;">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import {removeToken } from '../utils/auth'

  export default {
    name: 'Main',
    data () {
      return {
        activeIndex: '/main',
      }
    },
    created(){
      console.log(this.$store.state);
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      logout () {
        this.$confirm('Confirm Log Out ?')
          .then(() => {
            this.$store.dispatch('removeStorage');
            const remove = removeToken()
            console.log(remove)
            this.$router.replace('/')
          })
          .catch(_ => {
          })

      }
    }
  }
</script>

<style scoped>
  #nav {
    padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

  &
  .router-link-exact-active {
    color: #42b983;
  }

  }
  }
</style>
