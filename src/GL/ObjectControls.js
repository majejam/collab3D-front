import Engine from '@/GL/Engine'
import Camera from '@/GL/Camera'

import { TransformControls } from '@/GL/controls/TransformControls.js'

class ObjectControls {
  constructor() {
    this.camera = null
    this.transform = null
    this.renderer = null
    this.scene = null
  }

  init() {
    this.camera = Engine.camera
    this.renderer = Engine.renderer
    this.scene = Engine.scene
    this.transform = new TransformControls(this.camera, this.renderer.domElement)
    this.scene.add(this.transform)

    this.setEvents()
  }

  attach(mesh) {
    this.transform.attach(mesh)
  }

  detach() {
    this.transform.detach()
  }

  setEvents() {
    this.transform.addEventListener('dragging-changed', event => {
      Camera.controls.enabled = !event.value
    })
  }

  removeEvents() {}
}

const ObjectControlsInstance = new ObjectControls()

export default ObjectControlsInstance
