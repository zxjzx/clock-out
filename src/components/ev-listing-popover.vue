<template>

  <el-popover
    placement="top-start"
    width="400"
    :title="data.Name"
    trigger="hover">



    <div>
      {{data.Phone}}
      <el-image
        style="width: 100px; height: 100px;border-radius: 50px;"
        :src="data.img"
        fit="contain"></el-image>

      <img :src="data.img" alt="">

      <el-row><img :src="data.img" alt=""></el-row>
      <div v-if="data.Related_Company__r && data.Related_Company__r.Name">
        {{data.Related_Company__r.Name}}
        <ev-popover :data="data.Related_Company__r"/>
      </div>
    </div>
    <el-button slot="reference" v-show="data.Id"
                 class="ev-link link-hover">
      <i class="ev-icon ev-icon-landlord green" v-show="data.Has_More_Listing__c"></i> {{data.Name}};&nbsp;
    </el-button>

  </el-popover>
</template>

<script>
  export default {
    name: 'ev-popover',
    props:{
      data:{
        type:Object,
        default:{}
      }
    },
    created(){
      console.log(this.data);
    },
    data(){
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      }
    }
  };
</script>

<style scoped>
  .green{
    color: #3DD693;
  }
</style>



