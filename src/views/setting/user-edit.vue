<template>
  <div>
    <el-button icon="el-icon-back" type="primary" class="m-b-20" @click.native.prevent="returnPage">Return</el-button>
    <el-row>
      <el-col :span="12">
        <el-form :label-position="labelPosition" label-width="160px" :model="user">
          <el-form-item label="Project Name">
            <project-select :value.sync="user.projectId"/>
          </el-form-item>
          <el-form-item label="Username" required>
            <el-input type="text" v-model="user.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Reset password" required>
            <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Nick Name">
            <el-input v-model="user.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Role">
            <el-input v-model="user.role" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">Confirm</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import ProjectSelect from '../../components/project-select'
  import md5 from 'md5'

  export default {
    name: 'user-edit',
    components: { ProjectSelect },
    data () {
      return {
        labelPosition: 'right',
        user: {},
      }
    },
    created () {
      this.getUserById()
    },
    methods: {
      getUserById () {
        this.$http.post('getUserInfo/' + this.$route.params.id).then(res => {
          console.log(res)
          this.user = JSON.parse(JSON.stringify(res.data[0]))
        })
      },
      returnPage () {
        this.$router.back()
      },
      onSubmit () {
        let { username, password, nickname, role, projectId } = this.user
        let obj = {
          id: this.$route.params.id,
          projectId: projectId,
          password: password?md5(password):null,
          username: username,
          nickname: nickname,
          role: role
        }
        console.log(obj)
        this.$http.post('/updateUserInfo', obj).then(res => {
          console.log(res)
          if (res.code === 0) {
            console.log('success')
            this.$message.success('Add success !')
            // this.$router.replace('/main/user-list-setting');
            this.$router.back()
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
