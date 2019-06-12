<template>
  <div v-if="visitedViews.length">
    <div class="p-10">
      <el-tag
        :class="isActive(item)?'active':''"
        :key="index"
        v-for="(item,index) in visitedViews"
        closable
        type="primary"
        :disable-transitions="false"
        @click="toTagLink(item)"
        @close="handleClose(item)">
        {{item.title}}
      </el-tag>
    </div>
    <hr class="m-t-0">
  </div>
</template>

<script>
  export default {
    name: "tags-view",
    watch: {
      $route() {
        this.addTags()
      },
    },
    computed: {
      visitedViews() {
        return this.$store.state.visitedViews
      },

    },
    methods: {
      isActive(route) {
        return route.path === this.$route.path
      },
      addTags() {
        const {name} = this.$route;
        if (name) {
          this.$store.commit('addViewRoute', this.$route)
        }
        return false
      },
      handleClose(tag) {
        this.$store.dispatch('deleteViewRoute', tag).then((res) => {
          console.log(res);
          if (this.visitedViews.some(item => item.path === tag.path)) {
            return
          } else {
            let last = this.visitedViews[this.visitedViews.length - 1]
            this.$router.push({
              path: last.path
            })
          }
        })

      },
      toTagLink(tag) {
        this.$router.push({
          path: tag.path
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .el-tag {
    cursor: pointer;
  }

  .active {
    background: #409EFF;
    color: #ffffff;

    &::before {
      content: '';
      background: #fff;
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      position: relative;
      margin-right: 2px;
    }
  }
</style>
