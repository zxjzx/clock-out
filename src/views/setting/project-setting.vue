<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-form :label-position="labelPosition" :model="formLabelAlign" >
          <el-form-item label="Project Name">
            <el-input v-model="formLabelAlign.name" placeholder="Project Name"></el-input>
          </el-form-item>
          <el-form-item label="Description">
            <el-input type="textarea" v-model="formLabelAlign.description" placeholder="Description"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Add</el-button>
            <el-button @click="onCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: 'project-setting',
    data () {
      return {
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          description: '',
        }
      }
    },
    methods: {
      onSubmit () {
        console.log(this.formLabelAlign)
        console.log('submit!')
        this.$http.post('/addProject', this.formLabelAlign).then(res => {
          console.log(res)
          if (res.code === 0) {
            console.log('success')
            this.$message.success('Add success !')
            this.formLabelAlign = {}
          } else {
            this.$message.error(res.sqlMessage)
          }
        })
      },
      onCancel(){
        this.formLabelAlign = {}
      }
    }
  }
</script>

<style scoped>

</style>
