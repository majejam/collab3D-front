import Bus from '@/utils/bus'
import Raf from '@/utils/raf'
import viewport from '@/utils/viewport'
import * as THREE from 'three'

class Engine {
  constructor() {
    this.$el = null
    this.scene = null
    this.camera = null
    this.renderer = null

    this._update = this.update.bind(this)
    this._onResize = this.onResize.bind(this)
  }

  init(el) {
    this.$el = el
    this.camera = new THREE.PerspectiveCamera(65, viewport.width / viewport.height, 0.1, 10000)
    this.camera.position.z = 10
    this.scene = new THREE.Scene()

    if (window.WebGL2RenderingContext !== undefined && !/\bforcewebgl1\b/.test(window.location.search)) {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.$el,
        context: this.$el.getContext('webgl2', {
          alpha: false,
          powerPreference: 'high-performance',
          antialias: true,
        }),
      })
    } else {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.$el,
        powerPreference: 'high-performance',
        antialias: true,
      })
    }

    this.onResize()

    this.debug()

    Bus.$on('resize', this._onResize)
    Raf.add(this._update)
  }

  debug() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)
  }

  onResize() {
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    console.log('resize')
    this.camera.aspect = viewport.width / viewport.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(viewport.width, viewport.height)
  }

  onMouseMove(event) {
    Raf.addOnce(
      function () {
        this._updateMouse(event)
      }.bind(this)
    )
  }

  updateMouse(event) {
    this.mouse.x = (event.clientX / viewport.width) * 2 - 1
    this.mouse.y = -(event.clientY / viewport.height) * 2 + 1
  }

  update() {
    this.renderer.render(this.scene, this.camera)
  }

  setEvents() {}

  removeEvents() {}
}

const EngineInstance = new Engine()

export default EngineInstance
