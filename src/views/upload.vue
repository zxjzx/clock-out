<template>
  <div>
    <input type="file" name="logo" @change="upPhoto($event)">
    <p>22222</p>
    <input type="file" name="logo"  @change="upload($event)">

    <br>
    <br>
    <h2>本地环境支持上传的方式</h2>
    <form action="http://localhost:4000/api/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="logo">
      <input type="submit" value="提交">
    </form>
<!--    /api/upload-->

<!--    http://localhost:8080/api/upload-->
<!--    http://localhost:8081/api/upload-->
    <br>
    <h2>线上环境支持</h2>
    <form action="/api/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="logo">
      <input type="submit" value="提交">
    </form>


    <h2>element upload online</h2>

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

    <h2>上传并预览</h2>
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

    <el-button @click="getAllFile">获取所有的图片</el-button>

    <div class="demo-image">
      <div class="block" v-for="fit in imgList" :key="fit.id">
        <span class="demonstration">{{ fit.id }}</span>
        <el-image
          style="width: 100px; height: 100px"
          :src="fit.url"
          fit="contain"></el-image>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "upload",
    data() {
      return {
        file:'',
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
        imgList:[],
      };
    },
    methods:{
      getAllFile(){
        this.$http.get('getFileList').then(res=>{
          console.log(res);
          let list = res.data.map(item=>{
            item.url = 'http://47.244.244.87:8088'+item.path
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

      upPhoto(e){
        console.log(e.srcElement.files[0]);
        let imgSrc = e.srcElement.files[0];
        let fordata = new FormData();
        fordata.append("images", imgSrc);
        console.log(fordata);
        this.$http.post("upload",fordata).then(res=>{
          console.log(res);
        })

      },
      upload(e){
        let imgSrc = e.srcElement.files[0];
        let fordata = new FormData();
        fordata.append("images", imgSrc);
        console.log(fordata)
        this.$http.upload("upload",fordata).then(res=>{
          console.log(res);
        })
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
    }
  }
</script>

<style scoped>

</style>
