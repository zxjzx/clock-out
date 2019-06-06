<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-form :label-position="labelPosition" label-width="160px" :model="user">
          <el-form-item label="Project Name">
            <project-select :value.sync="user.projectId"/>
          </el-form-item>
          <el-form-item label="Username">
            <el-input type="text" v-model="user.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Nick Name">
            <el-input v-model="user.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Role">
            <el-input v-model="user.role" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">Add</el-button>
            <el-button @click="onCancel">Cancel</el-button>
            <el-button type="warning" @click.native.prevent="returnPage">Return</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ProjectSelect from '../../components/project-select'

  export default {
    name: 'user-edit',
    components: { ProjectSelect },
    data () {
      return {
        labelPosition: 'right',
        user: {
          username: '',
          password: '',
        },
      }
    },
    methods: {
      returnPage () {
        this.$router.back()
      },
      onSubmit () {
        let { username, password, nickname, role, projectId } = this.user
        let obj = {
          projectId: projectId,
          password: md5(password),
          username: JSON.stringify(username),
          nickname: JSON.stringify(nickname),
          role: JSON.stringify(role)
        }
        this.$http.post('/addUser', obj).then(res => {
          console.log(res)
          if (res.code === 0) {
            console.log('success')
            this.$message.success('Add success !')
            this.user = {}
          } else {
            this.$message.error(res.sqlMessage)
          }
        })
      },
      onCancel () {
        this.user = {}
      }
    }

  }
</script>

<style scoped>

</style>
