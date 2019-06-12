<template>
  <div id="app" class="ev-scrollbar">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted () {
      this.$store.getters.getStorage
    }
  }
</script>
<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
  }

  #app, html, body {
    height: 100%;
  }
  #app{
    overflow-x: auto;
    overflow-y: auto;
  }

</style>
