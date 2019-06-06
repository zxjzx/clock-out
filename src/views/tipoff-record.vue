<template>
  <el-row>
    <el-col :span="16">
      <el-table
        :data="dataList"
        style="width: 100%">
        <el-table-column
          type="index">
        </el-table-column>

        <el-table-column
          prop="created"
          label="created">
        </el-table-column>
        <el-table-column
          prop="content"
          label="content">
        </el-table-column>

        <el-table-column
          prop="outUsername"
          label="被举报人">
        </el-table-column>
        <el-table-column
          prop="reportName"
          label="举报人">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'tipoff-record',
    data () {
      return {
        dataList: []
      }
    },
    created () {
      this.tipoffList()
    },
    methods:{
      tipoffList(){
        this.$http.post('getTipoffList').then(res => {
          console.log(res.data)
          this.dataList = res.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
