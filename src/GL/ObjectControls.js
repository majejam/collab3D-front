import Engine from '@/GL/Engine'
import Camera from '@/GL/Camera'

import { TransformControls } from '@/GL/controls/TransformControls.js'

class ObjectControls {
  constructor() {
    this.camera = null
    this.transform = null
    this.renderer = null
    this.scene = null

    this.timeout = null

    this.dragging = false
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
    if (!this.dragging) this.transform.detach()
  }

  throttled(delay, fn) {
    let lastCall = 0
    return function (...args) {
      const now = new Date().getTime()
      if (now - lastCall < delay) {
        return
      }
      lastCall = now
      return fn(...args)
    }
  }

  objMove(_e) {
    console.log('obj move')
    console.log(_e, this.transform.object.realtimeid)
  }

  setEvents() {
    this._objMove = this.objMove.bind(this)
    const tHandler = this.throttled(1000, this._objMove)

    this.transform.addEventListener('dragging-changed', event => {
      console.log('dragging changed')
      Camera.controls.enabled = !event.value
    })

    this.transform.addEventListener('objectChange', tHandler)

    this.transform.addEventListener('mouseUp', () => {
      console.log('mouse up')
      setTimeout(() => {
        this.dragging = false
      }, 100)
    })

    this.transform.addEventListener('mouseDown', () => {
      console.log('mouse down')
      this.dragging = true
    })
  }

  removeEvents() {}
}

const ObjectControlsInstance = new ObjectControls()

export default ObjectControlsInstance
