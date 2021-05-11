import Vue from 'vue'
import Bus from '@/utils/bus'
import Debounce from '@/utils/debounce'

const Viewport = new Vue({
  data() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 1025,
    }
  },
  created() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.isMobile = window.innerWidth < 1025
    this.isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints
    this.resizeSmoothDebounced = Debounce(this.onResizeDebounced, 400)
    this.checkTouch()
    this.checkAndroid()
    this.setEvents()
  },
  methods: {
    checkAndroid() {
      var ua = navigator.userAgent.toLowerCase()
      var isAndroid = ua.indexOf('android') > -1
      if (isAndroid) document.documentElement.classList.add('is-android')
      else document.documentElement.classList.remove('is-android')
    },
    checkTouch() {
      if (this.isTouch) {
        document.documentElement.classList.add('is-touch')
      } else {
        document.documentElement.classList.remove('is-touch')
      }
    },

    setEvents() {
      window.addEventListener('resize', this.onResize.bind(this), false)
    },

    onResize() {
      this.isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints
      this.checkTouch()
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.isMobile = window.innerWidth < 1024
      Bus.$emit('resize')

      this.resizeSmoothDebounced()
    },

    onResizeDebounced() {
      Bus.$emit('resizeDebounce')
    },
  },
})

Vue.prototype.$viewport = Viewport

export default Viewport
