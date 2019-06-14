<template>
  <div>

    <div class="app-wrapper" :class="classObj">
      <sidebar class="sidebar-container"></sidebar>
      <div v-if="$store.state.device==='mobile'&&$store.state.opened" class="drawer-bg" @click="handleClickOutside"/>
      <div class="main-container">
        <div class="fixed-header">
          <header-bar/>
        </div>
        <div class="m-t-50">
          <!--          <tags-view/>-->
          <div class="p-20">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import sidebar from './side-bar'
  import HeaderBar from './header-bar'
  import TagsView from './tags-view';

  const {body} = document;
  const WIDTH = 750;
  export default {
    name: 'Main',
    components: {sidebar, HeaderBar, TagsView},
    watch: {
      $route() {
        this.replaceUrl();
        if (this.$store.state.device === 'mobile' && this.$store.state.opened) {
          this.$store.commit('closeSideBar')
        }
      }
    },
    created() {
      this.replaceUrl()
    },

    computed: {
      classObj() {
        return {
          hideSidebar: !this.$store.state.opened,
          openSidebar: this.$store.state.opened,
          withoutAnimation: true,
          mobile: this.$store.state.device === 'mobile'
        }
      }
    },
    beforeMount() {
      let flag = true;
      window.addEventListener('resize', () => {
        if (!flag) {
          return
        }
        flag = false;
        setTimeout(() => {
          flag = true;
          this.resizeHandle();
        }, 500)

      })
    },
    mounted() {
      this.getWidth()
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeHandle)
    },
    methods: {
      getWidth() {
        const rect = body.getBoundingClientRect();
        // console.log(rect.width);
        return rect.width - 1 < WIDTH
      },
      resizeHandle() {
        const isMobile = this.getWidth();
        this.$store.commit('toggleDevice', isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          this.$store.commit('closeSideBar')
        }
      },
      handleClickOutside() {
        this.$store.commit('closeSideBar')
      },
      replaceUrl() {
        if (this.$route.name === 'main') {
          this.$router.replace({name: 'clock-out'})
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $sideBarWidth: 210px;
  .app-wrapper {
    &:after {
      content: "";
      display: table;
      clear: both;
    }

    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .m-t-50 {
    margin-top: 50px;
  }

</style>
