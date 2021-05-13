import Engine from '@/GL/Engine'
import Camera from '@/GL/Camera'
import Socket from '@/socket/index.js'

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
    Socket.moveObject(Socket.roomKey, this.transform.object.position, this.transform.object.realtimeid)
  }

  setEvents() {
    this._objMove = this.objMove.bind(this)
    const tHandler = this.throttled(300, this._objMove)

    this.transform.addEventListener('dragging-changed', event => {
      console.log('dragging changed')
      Camera.controls.enabled = !event.value
      console.log(this.transform.object.realtimeid)
      console.log('moving')
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

    Socket.socket.on('updateDatas', (data) => {
      for(const object of data.sceneData.objects) {
        console.log(this.transform.object.realtimeid)
        if(object.objectId === this.transform.object.realtimeid) {
          this.transform.object.position = object.objectPosition
        }
      }
    })
  }

  removeEvents() {}
}

const ObjectControlsInstance = new ObjectControls()

export default ObjectControlsInstance
