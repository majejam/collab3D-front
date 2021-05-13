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

  setEvents() {
    this.transform.addEventListener('dragging-changed', event => {
      Camera.controls.enabled = !event.value
      console.log(this.transform.object.realtimeid)
      console.log('moving')
      Socket.moveObject(Socket.roomKey, this.transform.object.position, this.transform.object.realtimeid)
    })

    // this.transform.addEventListener('objectChange', () => {
    //   console.log('movindzdzg')
    // })

    this.transform.addEventListener('mouseUp', () => {
      setTimeout(() => {
        this.dragging = false
      }, 100)
    })

    this.transform.addEventListener('mouseDown', () => {
      this.dragging = true
    })

    Socket.socket.on('updateDatas', (data) => {
      if(data.sceneData.objectId === this.transform.object.realtimeid) {
        this.transform.object.position = data.sceneData.objectPosition
      }
    })
  }

  removeEvents() {}
}

const ObjectControlsInstance = new ObjectControls()

export default ObjectControlsInstance
