import Socket from '@/socket/index.js'
class SceneObject {
  constructor() {
    this.objects = new Array()
    this.id = 1
  }

  init() {
    this.setEvents()
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
    const ids = id
    var objs = this.objects.filter(obj => {
      return obj.data.id !== ids
    })
    this.objects = objs
  }

  getObjects() {
    return this.objects
  }

  findObject(id) {
    let returnedObj = null
    for(const obj of this.objects) {
      if (obj.mesh.realtimeid === id) {
        returnedObj = obj
        break
      }
      else returnedObj = undefined
    }
    return returnedObj
  }

  setEvents() {
    Socket.socket.on('updateDatas', (data) => {
      data.sceneData.objects.forEach(object => {
        const currentObj = this.findObject(object.objectId)
        if(currentObj) {
          currentObj.mesh.position.set(object.objectPosition.x, object.objectPosition.y, object.objectPosition.z)
        }
      })
    })
  }
}

const SceneObjectInstance = new SceneObject()

export default SceneObjectInstance
