<template>
  <div class="about">
    <h1>This is an about page{{mymessage}}</h1>
    <h2 class="mycss">This is an about page{{mymessage}}</h2>
    <el-button @click="addUser">add user</el-button>
  </div>
</template>
<script>
  export default {
    name: 'About',
    data () {
      return {
        mymessage: '我的信心'
      }
    },
    created () {
      this.getInitData()
    },
    methods: {
      getInitData () {

        console.log(this)
        let that = this
        this.$http.get('/getme').then(res => {
          console.log(res)
        }, error => {
          console.log(this)
          console.log(error)
          this.$message.error(error)

        })
        this.$http.get('/getDBList').then(res => {
          console.log(res)
        })

      },
      addUser () {
        let obj = {
          username:'zhangxja',
          password:789
        }
        this.$http.post('/addUser',obj).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>
  .mycss {
    box-shadow: 0 0 3px 5px rgba(222, 222, 222, .3);
  }
</style>
