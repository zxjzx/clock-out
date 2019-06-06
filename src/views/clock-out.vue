<template>
  <el-row>
    <el-col :span="12">
      <el-form :label-position="labelPosition" label-suffix=" :" label-width="160px" :inline="true">
        <el-form-item label="Project Name">
          <project-select :value.sync="projectid"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">打卡</el-button>
        </el-form-item>
      </el-form>

    </el-col>

    <el-col>
      <el-table
        :data="clockOutList"
        style="width: 100%">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
          prop="projectname"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="outtimeFormat"
          label="打卡时间">
        </el-table-column>

        <el-table-column
          prop="username"
          label="打卡人">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="reportRow(scope.row)"
              type="text"
              size="small">
              举报
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total">
      </el-pagination>
    </el-col>
  </el-row>

</template>

<script>
  import ProjectSelect from '../components/project-select'

  export default {
    name: 'clock-out',
    components: { ProjectSelect },
    data () {
      return {
        list: [],
        projectid: null,
        labelPosition: 'right',
        clockOutList: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    },
    created () {
      console.log(this.$store.state.userinfo)
      this.getList()
      this.getClockRecordList()
    },
    methods: {
      reportRow (item) {
        console.log(item)

        let obj = {
          reporterid: this.$store.state.userinfo.id,
          outid: item.userid,
          content: null,
          created: JSON.stringify(this.$timeFormat(new Date()))
        }
        this.$http.post('reportSome', obj).then(res => {
          console.log(res)
          if (res.status) {
            this.$message.success('operate success!')
          }
        })
      },

      //分页查询打卡记录
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.getClockRecordList()
        console.log(`当前页: ${val}`)
      },
      getClockRecordList () {
        let obj = {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        }
        this.$http.post('getClockRecordList', obj).then(res => {
          let list = res.data.result.map(item => {
            item.createdFormat = this.$timeFormat(new Date(item.created))
            item.outtimeFormat = this.$timeFormat(new Date(item.created))
            return item
          })

          this.page.total = res.data.total
          console.log(this.page.total)
          this.clockOutList = list
        })
      },
      //获取project list
      getList () {
        this.$http.get('getProjectList').then(res => {
          if (res.code === 0) {
            this.list = res.data
          }
        })
      },
      //打卡
      onSubmit () {

        //获取当前标准时间
        let nowTime = JSON.stringify(this.$timeFormat(new Date()))
        let obj = {
          projectid: this.projectid,
          create: nowTime,
          outtime: nowTime,
          userid: this.$store.state.userinfo.id
        }
        console.log(obj)
        this.$http.post('addClockRecord', obj).then(res => {
          console.log(res)
          if (res.status) {
            this.projectid = null
            this.$message.success('operate success!')
          }
          this.getClockRecordList()
        })
      }
    }

  }
</script>

<style scoped>

</style>
