const {body} = document;
const WIDTH = 750;
export default {
  created(){
    this.resizeHandle();
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
  methods:{
    getWidth() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH
    },
    resizeHandle() {
      const isMobile = this.getWidth();
      this.$store.commit('toggleDevice', isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        this.$store.commit('closeSideBar')
      }
    },
  }
}
