<template>
  <div>
    <el-row>
      <el-form :label-position="labelPosition" label-suffix=" :" :inline="true" :model="tableForm">
        <el-form-item label="Reportee">
          <userlist-select :value.sync="tableForm.reportee" @change="searchSubmit"/>
        </el-form-item>
        <el-form-item label="Reporter">
          <userlist-select :value.sync="tableForm.reporter" @change="searchSubmit"/>
        </el-form-item>
        <el-form-item label="Time Range">
          <el-date-picker
            v-model="tableForm.time"
            type="datetimerange"
            range-separator="-"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            align="right"
            @change="searchSubmit">
          </el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="searchSubmit">Search</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-table
          :data="dataList"
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>
          <el-table-column
            prop="content"
            label="Content">
          </el-table-column>
          <el-table-column
            prop="outUsername"
            label="Reportee">
          </el-table-column>
          <el-table-column
            prop="reportName"
            label="Reporter">
          </el-table-column>
          <el-table-column
            prop="createdFormat"
            label="Created">
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
  </div>
</template>

<script>
  import UserlistSelect from '../components/userlist-select'
  import Utils from '../utils/ev-utils'
  export default {
    name: 'tipoff-record',
    components: { UserlistSelect },
    data () {
      return {
        dataList: [],
        labelPosition: 'right',
        tableForm: {
          time: [new Date(Utils.getTodayDate()), new Date()]
        },
        page: {
          currentPage: 1,
          pageSize: 20,
          total: 0
        }
      }
    },
    created () {
      this.searchSubmit()
    },
    methods: {
      searchSubmit () {
        let obj = {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          reporterid: this.tableForm.reporter,
          outid: this.tableForm.reportee,
          startTime: this.tableForm.time ? JSON.stringify(this.$timeFormat(this.tableForm.time[0])) : null,
          endTime: this.tableForm.time ? JSON.stringify(this.$timeFormat(this.tableForm.time[1])) : null,
        }

        this.$http.post('getTipoffList', obj).then(res => {
          this.dataList = res.data.result.map(item => {
            item.createdFormat = this.$timeFormat(new Date(item.created))
            return item
          })
          this.dataList = res.data.result
          this.page.total = res.data.total
        })
      },
      resetForm () {
        this.tableForm = {
          time: [new Date(Utils.getTodayDate()), new Date()]
        }
        this.searchSubmit()
      },
      //分页查询打卡记录
      handleCurrentChange (val) {
        this.page.currentPage = val
        this.searchSubmit()
        console.log(`当前页: ${val}`)
      },
    }
  }
</script>

<style scoped>

</style>
