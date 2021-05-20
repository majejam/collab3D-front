import * as THREE from 'three'
import Engine from '@/GL/Engine'
import ObjectControls from '@/GL/ObjectControls'
import SceneObject from '@/GL/SceneObject'
import Raf from '@/utils/raf'

export default class Object3D {
  constructor(opt = { position: {} }) {
    this.geometry = null
    this.material = null
    this.mesh = null
    this.opt = opt
    this.createObject(this.opt.type)

    //if (this.opt.userAdded) this.addControls()

    this._update = this.update.bind(this)
    Raf.add(this._update)
  }

  createObject(type) {
    switch (type) {
      case 'box':
        this.createBox()
        break

      case 'TorusKnot':
        this.createTorusKnot()
        break

      case 'TorusGeometry':
        this.createTorusGeometry()
        break

      default:
        console.log(`Sorry, ${type} not yet defined.`)
    }
  }

  createBox() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
    this.setupMaterial()
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.meshBase()
  }

  createTorusKnot() {
    this.geometry = new THREE.TorusKnotGeometry(1, 0.2, 100, 16)
    this.setupMaterial()
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.meshBase()
  }

  createTorusGeometry() {
    this.geometry = new THREE.TorusGeometry(1, 0.2, 16, 100)
    this.setupMaterial()
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.meshBase()
  }

  createMeshInfos() {
    this.mesh.interactable = true
    this.mesh.realtimeid = 0
    this.mesh.isSelected = false
    this.mesh.selected = this.selected.bind(this)
    this.mesh.unselected = this.unselected.bind(this)
    this.mesh.collab = this.moveCollab.bind(this)
    this.mesh.change = this.change.bind(this)
    this.mesh.delete = this.delete.bind(this)
  }

  meshBase() {
    this.createMeshInfos()

    this.position(this.getPosition().x, this.getPosition().y, this.getPosition().z)

    this.createShaderMesh()

    Engine.scene.add(this.mesh)
    SceneObject.add(this.mesh)
  }

  setupMaterial() {
    this.color = this.opt.color ? this.opt.color : 0x888888
    this.material = new THREE.MeshBasicMaterial({ color: this.color })
  }

  createShaderMesh() {
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.BackSide })
    this.shadedMesh = new THREE.Mesh(this.geometry, mat)
    this.shadedMesh.scale.multiplyScalar(1.05)
    Engine.scene.add(this.shadedMesh)
    this.shadedMesh.visible = false
  }

  selected(color) {
    this.mesh.isSelected = true
    this.shadedMesh.material.color.set(color)
    this.shadedMesh.visible = true
  }

  unselected() {
    this.mesh.isSelected = false
    this.shadedMesh.visible = false
  }

  delete() {
    Engine.scene.remove(this.mesh)
    Engine.scene.remove(this.shadedMesh)
  }

  /**
   * Helpers
   */

  change(obj) {
    this.setSpaceValues(this.mesh, obj)
    this.setSpaceValues(this.shadedMesh, this.mesh, 0.05)
    this.material.color.set(obj.material.color)
  }

  setSpaceValues(currentObj, newObj, offset = 0) {
    currentObj.position.set(newObj.position.x, newObj.position.y, newObj.position.z)
    currentObj.rotation.set(newObj.rotation.x, newObj.rotation.y, newObj.rotation.z)
    currentObj.scale.set(newObj.scale.x + offset, newObj.scale.y + offset, newObj.scale.z + offset)
  }

  getPosition() {
    return {
      x: this.opt.position.x ? this.opt.position.x : 0,
      y: this.opt.position.y ? this.opt.position.y : 0,
      z: this.opt.position.z ? this.opt.position.z : 0,
    }
  }

  position(x, y, z) {
    this.mesh.position.set(x, y, z)
  }

  moveCollab() {
    //this.shadedMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
    this.setSpaceValues(this.shadedMesh, this.mesh, 0.05)
  }

  addControls() {
    ObjectControls.attach(this.mesh)
  }

  removeControls() {
    ObjectControls.detach()
  }

  update() {
    if (this.shadedMesh) {
      //this.shadedMesh.position.set(this.mesh.position.x, this.mesh.position.y, this.mesh.position.z)
    }
  }
}
