import Raf from '@/utils/raf'
export default class ViewportInfo {
  constructor(scene) {
    this.objects = this.vertices = this.triangles = 0
    this.scene = scene

    this._update = this.update.bind(this)

    this.setEvents()
  }

  update() {
    this.objects = this.vertices = this.triangles = 0
    for (let i = 0, l = this.scene.children.length; i < l; i++) {
      let object = this.scene.children[i]

      object.traverseVisible(object => {
        this.objects++

        if (object.isMesh && object.interactable) {
          var geometry = object.geometry

          if (geometry.isGeometry) {
            this.vertices += geometry.vertices.length
            this.triangles += geometry.faces.length
          } else if (geometry.isBufferGeometry) {
            this.vertices += geometry.attributes.position.count

            if (geometry.index !== null) {
              this.triangles += geometry.index.count / 3
            } else {
              this.triangles += geometry.attributes.position.count / 3
            }
          }
        }
      })
    }
  }

  setEvents() {
    Raf.add(this._update)
  }

  removeEvents() {
    Raf.remove(this._update)
  }
}
