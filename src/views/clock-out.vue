<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-form :label-position="labelPosition" label-suffix=" :" label-width="160px" :inline="true">
          <el-form-item label="Project Name" required>
            <project-select :value.sync="projectid"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">打卡</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <hr>
    <el-row>
      <el-form :label-position="labelPosition" label-suffix=" :" :inline="true" :model="tableForm">
        <el-form-item label="Project Name">
          <project-select :value.sync="tableForm.projectId" @change="searchSubmit"/>
        </el-form-item>
        <el-form-item label="User Info">
          <userlist-select :value.sync="tableForm.userId" @change="searchSubmit"/>
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
      <el-table
        :data="clockOutList"
        style="width: 100%">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="projectname"
          label="Project Name">
        </el-table-column>
        <el-table-column
          prop="outtimeFormat"
          label="Time">
        </el-table-column>

        <el-table-column
          prop="username"
          label="User">
        </el-table-column>

        <el-table-column label="Operate">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="reportRow(scope.row)"
              type="primary"
              size="small">
              Report
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
    </el-row>
  </div>


</template>

<script>
  import ProjectSelect from '../components/project-select'
  import UserlistSelect from '../components/userlist-select'
  import Utils from '../utils/ev-utils'

  export default {
    name: 'clock-out',
    components: {ProjectSelect, UserlistSelect},
    data() {
      return {
        list: [],
        tableForm: {
          projectId: this.$store.state.userinfo.projectId || null,
          userId: null,
          time: [new Date(Utils.getTodayDate()), new Date()]
        },
        projectid: this.$store.state.userinfo.projectId || null,
        labelPosition: 'right',
        clockOutList: [],

        page: {
          currentPage: 1,
          pageSize: 20,
          total: 0
        }
      }
    },
    created() {
      this.getClockRecordList()
    },
    methods: {
      resetForm() {
        this.tableForm = {
          time: [new Date(Utils.getTodayDate()), new Date()]
        };
        this.getClockRecordList()
      },
      reportRow(item) {
        let h = this.$createElement;
        this.$prompt(
          h('p', null, [
            h('span', null, 'Are you sure report '),
            h('strong', {style: 'color: #409EFF'}, ` ${item.username} ?`),
          ]),
          'title', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            inputPlaceholder: 'Report reason'
          }).then(({value}) => {
          let obj = {
            reporterid: user.id,
            outid: item.userid,
            content: JSON.stringify(value),
            created: JSON.stringify(this.$timeFormat(new Date()))
          };
          this.$http.post('reportSome', obj).then(res => {
            if (res.status) {
              this.$message.success('operate success!')
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Cancel input'
          });
        });


      },

      //分页查询打卡记录
      handleCurrentChange(val) {
        this.page.currentPage = val
        this.getClockRecordList()
      },
      searchSubmit() {
        // console.log(this.tableForm)
        this.getClockRecordList()
      },
      getClockRecordList() {
        let obj = {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          startTime: this.tableForm.time ? JSON.stringify(this.$timeFormat(this.tableForm.time[0])) : null,
          endTime: this.tableForm.time ? JSON.stringify(this.$timeFormat(this.tableForm.time[1])) : null,
          projectId: this.tableForm.projectId,
          userId: this.tableForm.userId,
        }
        this.$http.post('getClockRecordList', obj).then(res => {
          let list = res.data.result.map(item => {
            item.createdFormat = this.$timeFormat(new Date(item.created))
            item.outtimeFormat = this.$timeFormat(new Date(item.created))
            return item
          })

          this.page.total = res.data.total
          this.clockOutList = list
        })
      },
      //打卡
      onSubmit() {
        if(!this.projectid){
          this.$message.warning("project cann't be null");
          return
        }
        //获取当前标准时间
        let nowTime = JSON.stringify(this.$timeFormat(new Date()))
        let obj = {
          projectid: this.projectid,
          create: nowTime,
          outtime: nowTime,
          userid: this.$store.state.userinfo.id
        };
        this.$http.post('addClockRecord', obj).then(res => {
          if (res.status) {
            this.projectid = null
            this.$message.success('operate success!')
          }
          this.tableForm = {
            time: [new Date(Utils.getTodayDate()), new Date()]
          };
          this.getClockRecordList()
        })
      }
    }

  }
</script>

<style scoped>

</style>
