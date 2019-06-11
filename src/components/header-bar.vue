<template>
  <div class="header-container">
    <div style="display: flex;justify-items: center">
      <div @click="toggleMenu" class="toggle">
        <i class="el-icon-s-fold font-20" v-if="$store.state.opened"></i>
        <i class="el-icon-s-unfold font-20" v-else></i>
      </div>

      <div class="m-l-20">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
            <span v-if="index==levelList.length-1">{{ item.meta.title }}</span>
            <a v-else >{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>



    <div class="log-out">
      <el-tooltip class="item" @click.native="logout" effect="dark" content="Log Out" placement="bottom">
        <i class="el-icon-switch-button font-20"></i>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
  import { removeToken } from '../utils/auth'

  export default {
    name: 'header-bar',
    data(){
      return {
        levelList:[]
      }
    },
    watch:{
      $route(){
        this.getLevelList()
      }
    },
    created() {
      this.getLevelList()
    },
    mounted () {
      console.log(this.levelList)
    },
    methods: {
      getLevelList(){
        let matched = this.$route.matched.filter(item => item.meta);
        this.levelList = matched
      },
      toggleMenu () {
        this.$store.commit('toggleState')
      },
      logout () {
        this.$confirm('Confirm Log Out ?')
          .then(() => {
            this.$store.dispatch('removeStorage')
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
  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    background: #ffffff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);
    height: 50px;
    overflow: hidden;
  }

  .log-out {
    margin-right: 20px;
    cursor: pointer;
  }

  .toggle {
    margin-left: 20px;
    cursor: pointer;
  }

  .font-20 {
    font-size: 20px;
  }
</style>
