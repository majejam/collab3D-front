import Engine from '@/GL/Engine'
import Camera from '@/GL/Camera'
import Socket from '@/socket/index.js'
import Bus from '@/utils/bus'

import { TransformControls } from '@/GL/controls/TransformControls.js'

class ObjectControls {
  constructor() {
    this.camera = null
    this.transform = null
    this.renderer = null
    this.scene = null

    this.timeout = null

    this.currentMesh = null

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
    this.detach()
    this.currentMesh = mesh
    this.transform.attach(mesh)
    // Send object being modify to back
    Bus.$emit('MeshAttach', mesh)
    Socket.objectStart(Socket.roomKey, this.transform.object.realtimeid)
  }

  detach() {
    if (!this.dragging) {
      // Send object not being modify to back
      if (this.transform.object) Socket.objectStop(Socket.roomKey, this.transform.object.realtimeid)
      this.transform.detach()
      this.currentMesh = null
    }
  }

  delete() {
    // Trigger delete method to back
    Socket.deleteObject(Socket.roomKey, this.currentMesh.realtimeid)
    // Remove it locally
    this.currentMesh.delete()
    this.scene.remove(this.currentMesh)
    this.detach()
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

  changeColor(color) {
    if (this.currentMesh) {
      this.currentMesh.material.color.set(color)
    }
    Socket.moveObject(Socket.roomKey, this.currentMesh, this.currentMesh.realtimeid)
  }

  objMove(_e) {
    console.log('obj move')
    console.log(_e, this.transform.object)
    Socket.moveObject(Socket.roomKey, this.transform.object, this.transform.object.realtimeid)
  }

  setEvents() {
    this._objMove = this.objMove.bind(this)
    const tHandler = this.throttled(10, this._objMove)

    this.transform.addEventListener('dragging-changed', event => {
      console.log('dragging changed')
      Camera.controls.enabled = !event.value
      console.log('moving')
    })

    this.transform.addEventListener('objectChange', tHandler)

    this.transform.addEventListener('objectChange', () => {
      this.transform.object.collab()
    })

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
