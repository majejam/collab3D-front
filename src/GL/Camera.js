import Raf from '@/utils/raf'
import Engine from '@/GL/Engine'
import viewport from '@/utils/viewport'
import * as THREE from 'three'
import ObjectControls from '@/GL/ObjectControls'

import { OrbitControls } from '@/GL/controls/OrbitControls.js'

class Camera {
  constructor() {
    this.camera = null
    this.controls = null
    this.renderer = null
    this.scene = null
    this.intersects = null
    this.currentInteractableObjectHovered = null
    this.currentObject = null

    this.mouse = {
      x: 0,
      y: 0,
    }
  }

  init() {
    this.camera = Engine.camera
    this.renderer = Engine.renderer
    this.scene = Engine.scene

    this.raycaster = new THREE.Raycaster()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.setEvents()
  }

  raycast() {
    this.raycaster.setFromCamera(this.mouse, this.camera)
    this.intersects = this.raycaster.intersectObjects(this.scene.children)

    if (this.intersects.length > 0 && this.intersects[0].object.interactable) {
      this.currentInteractableObjectHovered = this.intersects[0].object
    } else {
      this.currentInteractableObjectHovered = null
    }
  }

  updateMouse(event) {
    this.mouse.x = (event.clientX / viewport.width) * 2 - 1
    this.mouse.y = -(event.clientY / viewport.height) * 2 + 1
  }

  onClick() {
    if (this.currentInteractableObjectHovered !== null) {
      this.currentObject = this.currentInteractableObjectHovered
      ObjectControls.attach(this.currentObject)
    } else {
      this.currentObject = null
      ObjectControls.detach()
    }
  }

  update() {
    this.raycast()
  }

  onResize() {}

  setEvents() {
    this._update = this.update.bind(this)
    this._updateMouse = this.updateMouse.bind(this)
    this._onClick = this.onClick.bind(this)
    Raf.add(this._update)
    this.renderer.domElement.addEventListener('mousemove', this._updateMouse)
    this.renderer.domElement.addEventListener('click', this._onClick)
  }

  removeEvents() {}
}

const CameraInstance = new Camera()

export default CameraInstance
