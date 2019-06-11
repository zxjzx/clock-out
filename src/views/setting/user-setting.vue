<template>
  <div>
    <el-button type="primary"  icon="el-icon-circle-plus-outline" @click.native="toAddUser">
      Add
    </el-button>
    <el-row>
      <el-col :span="16">
        <el-table
          :data="userList"
          style="width: 100%">
          <el-table-column
            type="index">
          </el-table-column>

          <el-table-column
            prop="username"
            label="username">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="nickname">
          </el-table-column>

          <el-table-column
            prop="projectName"
            label="project Name">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <router-link :to="{name:'user-edit-setting',params:{id:scope.row.id}}">Edit</router-link>
              &nbsp;
              <el-button
                @click.native.prevent="deleteRow(scope.row)"
                type="text"
                size="small">
                Delete
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'user-setting',
    data () {
      return {
        userList: []
      }
    },
    created () {
      this.getUserList()
    },
    methods: {
      //删除某一行
      deleteRow (item) {
        let obj = {
          userId: item.id
        }
        this.$http.post('deleteUser', obj).then(res => {
          if (res.code === 0) {
            this.$message.success('Delete success !')
          } else {
            this.$message.error(res.sqlMessage)
          }
        })
      },
      getUserList () {
        this.$http.post('getUserList').then(res => {
          console.log(res)
          this.userList = res.data
        })
      },
      toAddUser(){
        this.$router.push({
          name:'user-add-setting'
        })
      }
    }
  }
</script>

<style scoped>

</style>
