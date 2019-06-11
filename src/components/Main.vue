<template>
  <div>

    <div class="app-wrapper" :class="classObj">
      <sidebar class="sidebar-container"></sidebar>
      <div v-if="$store.state.device==='mobile'&&$store.state.opened" class="drawer-bg" @click="handleClickOutside"/>
      <div class="main-container">
        <div @click="toggleMenu" style="cursor: pointer"><i class="el-icon-s-operation" style="font-size: 16px"></i>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>

  import sidebar from './sidebar'

  const { body } = document
  const WIDTH = 992
  export default {
    name: 'Main',
    components: { sidebar },
    data () {
      return {
        activeIndex: '/main',
      }
    },
    watch: {
      $route (route) {
        if (this.$store.state.device === 'mobile' && this.$store.state.opened) {
          this.$store.commit('closeSideBar')
        }
      }
    },

    computed: {
      classObj () {
        return {
          hideSidebar: !this.$store.state.opened,
          openSidebar: this.$store.state.opened,
          withoutAnimation: true,
          mobile: this.$store.state.device === 'mobile'
        }
      }
    },
    beforeMount () {
      window.addEventListener('resize', this.resizeHandle)
    },
    mounted () {
      this.getWidth()
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.resizeHandle)
    },
    methods: {
      toggleMenu () {
        this.$store.commit('toggleState')
      },

      getWidth () {
        const rect = body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
      },
      resizeHandle () {
        const isMobile = this.getWidth()
        this.$store.commit('toggleDevice', isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          this.$store.commit('closeSideBar')
        }
      },
      handleClickOutside () {
        this.$store.commit('closeSideBar')
      }
    }
  }
</script>

<style lang="scss" scoped>

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

</style>
