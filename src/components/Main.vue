<template>
  <div>
    <div id="nav">
      <router-link to="/main">Home</router-link>
      |
      <router-link to="/main/about">About</router-link>
      |
      <el-button @click.prevent="logout">logout</el-button>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import { getToken, removeToken } from '../utils/auth'

  export default {
    name: 'Main',
    methods: {
      logout () {
        const remove = removeToken()
        console.log(remove);
        this.$router.replace('/')
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
