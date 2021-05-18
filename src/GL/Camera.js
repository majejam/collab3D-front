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
    this.dragging = false
    this.timeout = null

    this.intersectray = 0

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

    if (this.intersects.length > 0) {
      var intersect = this.intersects.filter(itr => {
        return itr.object.interactable === true
      })
      if (intersect.length > 0) {
        this.currentInteractableObjectHovered = intersect[0].object
      } else {
        this.currentInteractableObjectHovered = null
      }
      this.intersectray = intersect.length
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
    } else if (!this.dragging) {
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

    this.controls.addEventListener('change', () => {
      clearTimeout(this.timeout)
      this.dragging = true
      this.timeout = setTimeout(() => {
        this.dragging = false
      }, 100)
    })

    window.addEventListener('dblclick', () => {
      this.controls.target = new THREE.Vector3(this.currentObject.position.x, this.currentObject.position.y, this.currentObject.position.z)
      this.controls.update()
    })
  }

  removeEvents() {}
}

const CameraInstance = new Camera()

export default CameraInstance
