<template>
  <div class="errPage-container">
    <el-row>
      <el-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          Oops!
        </h1>
        <h2 class="font-20 m-b-10">The webmaster said that you can not enter this page...</h2>
        <h6 class="m-b-10">If you are not satisfied, please contact the webmaster.</h6>
        <h6 class="m-b-10">or you can go back:</h6>
        <el-button icon="arrow-left" class="pan-back-btn" @click="back">
          Return
        </el-button>
      </el-col>
      <el-col :span="12">
        <img src="../assets/401.gif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "no-permission",
    methods: {
      back() {
        this.$router.go(-2);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
  }
</style>



