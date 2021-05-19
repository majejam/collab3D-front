import Socket from '@/socket/index.js'
import Users from '@/GL/Users'
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
      userAdded: true,
      position: { x: 0, y: 0, z: 0 },
    })
    // Set that an object has been add to back
    Socket.addObject('test', obj.mesh.realtimeid)
  }

  synchAddObject(type) {
    new Object3D({
      type: type,
      interactable: true,
      userAdded: false,
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
      } else returnedObj = null
    }
    return returnedObj
  }

  setEvents() {
    Socket.socket.on('updateDatas', (objectMoved, objectId) => {
      let refactoredObject = null
      const loader = new THREE.ObjectLoader()
      loader.parse(objectMoved, object => {
        refactoredObject = object
      })
      const currentObj = this.findObject(objectId)
      if (currentObj) {
        currentObj.mesh.change(refactoredObject)
      }
    })
    Socket.socket.on('addObjectRoom', () => {
      this.synchAddObject('box')
    })
    Socket.socket.on('deleteObjectInRoom', objectId => {
      this.remove(objectId)
    })
    Socket.socket.on('userJoined', userId => {
      Socket.userJoined('test', userId)
    })
    Socket.socket.on('initRoomData', data => {
      data.sceneData.objects.forEach(object => {
        this.synchAddObject('box')
        let refactoredObject = null
        const loader = new THREE.ObjectLoader()
        loader.parse(object.objectMoved, object => {
          refactoredObject = object
        })
        const currentObj = this.findObject(object.objectId)
        if (currentObj) {
          currentObj.mesh.change(refactoredObject)
        }
      })
    })
    Socket.socket.on('startMoving', (objectId, userId) => {
      // Create outline of objectSelected
      console.log(objectId, userId)
      Users.add(userId)
      const currentObj = this.findObject(objectId)
      if (currentObj) {
        console.log(Users.getUserColor(userId))
        currentObj.mesh.selected(Users.getUserColor(userId))
        currentObj.mesh.interactable = false
      }
    })
    Socket.socket.on('stopMoving', (objectId, userId) => {
      // Remove outline of objectSelected
      console.log(objectId, userId)
      const currentObj = this.findObject(objectId)
      if (currentObj) {
        currentObj.mesh.unselected()
        currentObj.mesh.interactable = true
      }
    })
  }
}

const SceneObjectInstance = new SceneObject()

export default SceneObjectInstance
