import Bus from '@/utils/bus'
import Raf from '@/utils/raf'
import Engine from '@/GL/Engine'

import { OrbitControls } from '@/GL/controls/OrbitControls.js'

class Camera {
  constructor() {
    this.camera = null
    this.controls = null
    this.renderer = null
  }

  init() {
    this.camera = Engine.camera
    this.renderer = Engine.renderer

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }
  onResize() {}
  setEvents() {
    Bus.$on('resize', this._onResize)
    Raf.add(this._update)
  }

  removeEvents() {}
}

const CameraInstance = new Camera()

export default CameraInstance
