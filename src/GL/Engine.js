import Bus from '@/utils/bus'
import Raf from '@/utils/raf'
import viewport from '@/utils/viewport'
import * as THREE from 'three'
import Camera from '@/GL/Camera'
import Keyboard from '@/GL/Keyboard'
import ObjectControls from '@/GL/ObjectControls'
// import Object3D from '@/GL/Object3D'
import ViewportInfo from '@/GL/ViewportInfo'
import SceneObject from '@/GL/SceneObject'

class Engine {
  constructor() {
    this.$el = null
    this.scene = null
    this.camera = null
    this.renderer = null

    this.controls = null

    this.transform = null

    this.infos = null

    this._update = this.update.bind(this)
    this._onResize = this.onResize.bind(this)
  }

  init(el) {
    this.createRenderer(el)

    this.createScene()

    this.createHelper(100, 100)

    Camera.init()

    ObjectControls.init()

    this.onResize()

    new Keyboard()

    this.infos = new ViewportInfo(this.scene)

    this.setEvents()

    SceneObject.init()
  }

  createRenderer(el) {
    this.$el = el
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
  }

  createScene() {
    this.camera = new THREE.PerspectiveCamera(65, viewport.width / viewport.height, 0.1, 10000)
    this.camera.position.z = 10
    this.scene = new THREE.Scene()
  }

  createHelper(sx, sy) {
    const gridHelper = new THREE.GridHelper(sx, sy)
    this.scene.add(gridHelper)
  }

  onResize() {
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

  setEvents() {
    Bus.$on('resize', this._onResize)
    Raf.add(this._update)
  }

  removeEvents() {
    Bus.$off('resize', this._onResize)
    Raf.remove(this._update)
  }
}

const EngineInstance = new Engine()

export default EngineInstance
