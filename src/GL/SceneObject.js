import Socket from '@/socket/index.js'
import Object3D from '@/GL/Object3D'
import Engine from '@/GL/Engine'
import ObjectControls from '@/GL/ObjectControls'
import * as THREE from 'three'
class SceneObject {
  constructor() {
    this.objects = new Array()
    this.id = 1
  }

  init() {
    this.setEvents()
  }

  addObject(type) {
    const obj = new Object3D({
      type: type,
      interactable: true,
      position: { x: 0, y: 0, z: 0 },
    })
    // Set that an object has been add to back
    Socket.addObject('test', obj.mesh.realtimeid)
  }

  synchAddObject(type) {
    new Object3D({
      type: type,
      interactable: true,
      position: { x: 0, y: 0, z: 0 },
    })
  }

  /**
   * Helpers
   */
  add(mesh) {
    const data = {
      id: this.id,
    }

    mesh.realtimeid = this.id

    const object = {
      mesh: mesh,
      data: data,
    }

    this.objects.push(object)
    this.id += 1
  }

  remove(id) {
    const objs = this.objects.filter(obj => {
      if (obj.mesh.realtimeid === id) {
        ObjectControls.detach()
        Engine.scene.remove(obj.mesh)
      }
      return obj.mesh.realtimeid !== id
    })
    this.objects = objs
  }

  getObjects() {
    return this.objects
  }

  findObject(id) {
    let returnedObj = null
    for (const obj of this.objects) {
      if (obj.mesh.realtimeid === id) {
        returnedObj = obj
        break
      } else returnedObj = undefined
    }
    return returnedObj
  }

  setEvents() {
    Socket.socket.on('updateDatas', (objectMoved, objectId) => {
        let refactoredObject = null
        const loader = new THREE.ObjectLoader()
        loader.parse(objectMoved, (object) => {
          refactoredObject = object
        })
        const currentObj = this.findObject(objectId)
        if (currentObj) {
          currentObj.mesh.position.set(refactoredObject.position.x, refactoredObject.position.y, refactoredObject.position.z)
          currentObj.mesh.rotation.set(refactoredObject.rotation.x, refactoredObject.rotation.y, refactoredObject.rotation.z)
          currentObj.mesh.scale.set(refactoredObject.scale.x, refactoredObject.scale.y, refactoredObject.scale.z)
        }
    })
    Socket.socket.on('addObjectRoom', () => {
      this.synchAddObject('box')
    })
    Socket.socket.on('deleteObjectInRoom', (objectId) => {
      this.remove(objectId)
    })
    Socket.socket.on('userJoined', (userId) => {
      Socket.userJoined('test', userId)
    })
    Socket.socket.on('initRoomData', data => {
      data.sceneData.objects.forEach(object => {
        this.synchAddObject('box')
        let refactoredObject = null
        const loader = new THREE.ObjectLoader()
        loader.parse(object.objectMoved, (object) => {
          refactoredObject = object
        })
        const currentObj = this.findObject(object.objectId)
        if (currentObj) {
          currentObj.mesh.position.set(refactoredObject.position.x, refactoredObject.position.y, refactoredObject.position.z)
          currentObj.mesh.rotation.set(refactoredObject.rotation.x, refactoredObject.rotation.y, refactoredObject.rotation.z)
          currentObj.mesh.scale.set(refactoredObject.scale.x, refactoredObject.scale.y, refactoredObject.scale.z)
        }
      })
    })
  }
}

const SceneObjectInstance = new SceneObject()

export default SceneObjectInstance
