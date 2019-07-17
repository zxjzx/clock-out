<template>
  <div>

    <el-button @click="getAllFile" type="warning">获取所有的图片</el-button>

    <div class="demo-image">
      <div class="block" v-for="fit in imgList" :key="fit.id">
        <span class="demonstration">type:{{ fit.type }},size:{{Math.floor(fit.size/1024)}}k</span>
        <br>
        <el-image
          style="width: 100px; height: 100px"
          :src="fit.url"
          fit="contain"></el-image>
        <br>
        <span class="operation" @click="download(fit)">download</span>
        <span class="operation" @click="deleteFile(fit)" type="danger">delete</span>
      </div>
    </div>


    <hr>
    <h2>Element upload online</h2>

    <el-upload
      class="upload-demo"
      drag
      name="logo"
      action="/api/upload/"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

    <hr>

    <h2>线上环境上传并预览</h2>
    <el-upload
      class="upload-demo"
      action="/api/upload/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      name="logo"
      list-type="picture">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>


    <br>
    <h2>本地环境支持上传的方式</h2>
    <form action="http://localhost:4000/api/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="logo">
      <input type="submit" value="提交">
    </form>

    <br>
    <h2>线上环境支持</h2>
    <form action="/api/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="logo">
      <input type="submit" value="提交">
    </form>

  </div>
</template>

<script>
  export default {
    name: "upload",
    data() {
      return {
        file: '',
        fileList: [],
        imgList: [],
      };
    },
    methods: {
      getAllFile() {
        this.$http.get('getFileList').then(res => {
          console.log(res);
          let list = res.data.map(item => {
            item.url = 'https://47.244.244.87:8088' + item.path
          })
          this.imgList = res.data;
          console.log(this.imgList)
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      download(fit) {
        console.log(fit);
        let obj = {
          filename: fit.filename,
          path: fit.path
        }
        this.$http.post('download', obj).then(res => {
          console.log(res);
        })
      },
      deleteFile(fit) {
        let obj = {
          filename: fit.filename,
          path: fit.path,
          id: fit.id,
        }
        this.$http.post('deleteFile', obj).then(res => {
          this.$message.success(res.data)
        })
      }

    }
  }
</script>

<style scoped>
  .demo-image .block {
    padding: 30px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
  }

  .demo-image .demonstration {
    text-align: center;
    color: #8492a6;
    font-size: 14px;
    margin-bottom: 20px;
  }

  .operation {
    cursor: pointer;
    color: red;
  }

  .operation:hover {
    font-weight: 600;
  }
</style>
