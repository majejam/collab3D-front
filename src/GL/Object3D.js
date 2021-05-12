import * as THREE from 'three'
import Engine from '@/GL/Engine'
import ObjectControls from '@/GL/ObjectControls'
import SceneObject from '@/GL/SceneObject'

export default class Object3D {
  constructor(opt = {}) {
    this.geometry = null
    this.material = null
    this.mesh = null
    this.opt = opt

    this.createObject(this.opt.type)

    if (this.opt.interactable) this.addControls()
  }

  createObject(type) {
    switch (type) {
      case 'box':
        this.createBox()
        break
      default:
        console.log(`Sorry, ${type} not yet defined.`)
    }
  }

  createBox() {
    this.color = this.opt.color ? this.opt.color : 0x00ff00
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
    this.material = new THREE.MeshBasicMaterial({ color: this.color })
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.mesh.interactable = true

    this.position(1 + Math.round(Math.random() * 20), 1, 1)
    Engine.scene.add(this.mesh)
    console.log(this.mesh)
    SceneObject.add(this.mesh)
  }

  /**
   * Helpers
   */

  position(x, y, z) {
    this.mesh.position.set(x, y, z)
  }

  addControls() {
    ObjectControls.attach(this.mesh)
  }

  removeControls() {
    ObjectControls.detach()
  }
}
