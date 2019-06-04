<template>
  <div>
    <div id="nav">
      <router-link to="/main">Home</router-link> |
      <router-link to="/main/about">About</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'Main'
  }
</script>

<style scoped>
  #nav {
    padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
  &.router-link-exact-active {
     color: #42b983;
   }
  }
  }
</style>
