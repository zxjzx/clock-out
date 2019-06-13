<template>
  <div>
    <el-button type="primary" class="m-b-20" icon="el-icon-circle-plus-outline" @click.native="toAddUser">
      Add
    </el-button>
    <el-row>
      <el-col :span="16">
        <el-table
          :data="userList"
          style="width: 100%" border>
          <el-table-column
            type="index">
          </el-table-column>

          <el-table-column
            prop="username"
            label="Username">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="Nickname">
          </el-table-column>

          <el-table-column
            prop="projectName"
            label="Project Name">
          </el-table-column>

          <el-table-column label="Operate">
            <template slot-scope="scope">
              <el-button type="primary" @click.native.prevent="toEditUser(scope.row)">Edit</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.row)"
                type="danger"
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
    data() {
      return {
        userList: []
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      //删除某一行
      deleteRow(item) {

        this.$confirm('Confirm Delete this data ?')
          .then(() => {
            let obj = {userId: item.id};
            this.$http.post('deleteUser', obj).then(res => {
              if (res.code === 0) {
                this.$message.success('Delete success !');
                this.getUserList();
              } else {
                this.$message.error(res.sqlMessage)
              }
            })
          })
          .catch(_ => {
          });


      },
      getUserList() {
        this.$http.post('getUserList').then(res => {
          console.log(res)
          this.userList = res.data
        })
      },
      toAddUser() {
        this.$router.push({
          name: 'user-add-setting'
        })
      },
      toEditUser(item) {
        this.$router.push({name: 'user-edit-setting', params: {id: item.id}})
      },
    }
  }
</script>

<style scoped>

</style>
