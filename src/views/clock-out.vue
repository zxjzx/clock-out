<template>
  <el-row>
    <el-col :span="12">
      <el-form :label-position="labelPosition" label-suffix=" :" label-width="160px" :model="clock">
        <el-form-item label="Project Name">
          <el-select v-model="clock.project" filterable clearable placeholder="choose one">
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">举报</el-button>
        </el-form-item>
      </el-form>

    </el-col>

    <el-col>
      <el-table
        :data="clockOutList"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createdFormat"
          label="创建时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="outtimeFormat"
          label="打卡时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="projectid"
          label="项目名称">
        </el-table-column>
        <el-table-column
          prop="userid"
          label="操作人">
        </el-table-column>
      </el-table>
    </el-col>
  </el-row>

</template>

<script>
  export default {
    name: 'clock-out',
    data () {
      return {
        list: [],
        clock: {},
        labelPosition: 'right',
        clockOutList:[]
      }
    },
    created () {
      console.log(this.userinfo)
      this.getList()
      this.getClockRecordList()
    },
    methods: {
      getClockRecordList () {
        this.$http.get('getClockRecordList').then(res => {
          console.log(res)
          console.log(res.data[0].created);
          console.log(this.$timeFormat(new Date(res.data[0].created)));
          let list = res.data.map(item=>{
            item.createdFormat = this.$timeFormat(new Date(item.created));
            item.outtimeFormat = this.$timeFormat(new Date(item.created));
            return item
          });
          console.log(list);
          this.clockOutList = list;
        })
      },
      getList () {
        this.$http.get('getProjectList').then(res => {
          console.log(res)
          if (res.code == 0) {
            this.list = res.data
          }
        })
      },
      onSubmit () {

        //获取当前标准时间
        let nowTime = JSON.stringify(this.$timeFormat(new Date()))
        let obj = {
          projectid: this.clock.project,
          create: nowTime,
          outtime: nowTime,
          userid: this.$store.state.userinfo.id
        }
        console.log(obj)
        this.$http.post('addClockRecord', obj).then(res => {
          console.log(res);
          this.getClockRecordList()
        })
      }
    }

  }
</script>

<style scoped>

</style>
