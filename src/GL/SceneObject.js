import Socket from '@/socket/index.js'
import Object3D from '@/GL/Object3D'
import Engine from '@/GL/Engine'
import ObjectControls from '@/GL/ObjectControls'
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
    Socket.addObject('hello', obj)
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
    Socket.socket.on('updateDatas', data => {
      data.sceneData.objects.forEach(object => {
        const currentObj = this.findObject(object.objectId)
        if (currentObj) {
          currentObj.mesh.position.set(object.objectPosition.x, object.objectPosition.y, object.objectPosition.z)
        }
      })
    })
    Socket.socket.on('addObjectRoom', () => {
      this.synchAddObject('box')
    })
    Socket.socket.on('deleteObjectInRoom', (objectId) => {
      this.remove(objectId)
    })
  }
}

const SceneObjectInstance = new SceneObject()

export default SceneObjectInstance
