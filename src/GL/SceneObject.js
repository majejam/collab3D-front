class SceneObject {
  constructor() {
    this.objects = new Array()
    this.id = 0
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
    this.objects.forEach(obj => {
      if (obj.data.id === id) return obj
      else return undefined
    })
  }
}

const SceneObjectInstance = new SceneObject()

export default SceneObjectInstance
