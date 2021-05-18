import * as THREE from 'three'
import ObjectControls from '@/GL/ObjectControls'

export default class Keyboard {
  constructor() {
    this.setEvents()
  }

  setEvents() {
    window.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        case 81: // Q
          ObjectControls.transform.setSpace(ObjectControls.transform.space === 'local' ? 'world' : 'local')
          break

        case 16: // Shift
          ObjectControls.transform.setTranslationSnap(1)
          ObjectControls.transform.setRotationSnap(THREE.MathUtils.degToRad(15))
          ObjectControls.transform.setScaleSnap(0.25)
          break

        case 87: // W
          ObjectControls.transform.setMode('translate')
          break

        case 69: // E
          ObjectControls.transform.setMode('rotate')
          break

        case 82: // R
          ObjectControls.transform.setMode('scale')
          break

        case 187:
        case 107: // +, =, num+
          ObjectControls.transform.setSize(ObjectControls.transform.size + 0.1)
          break

        case 189:
        case 109: // -, _, num-
          ObjectControls.transform.setSize(Math.max(ObjectControls.transform.size - 0.1, 0.1))
          break

        case 88: // X
          ObjectControls.transform.showX = !ObjectControls.transform.showX
          break

        case 89: // Y
          ObjectControls.transform.showY = !ObjectControls.transform.showY
          break

        case 90: // Z
          ObjectControls.transform.showZ = !ObjectControls.transform.showZ
          break

        case 8: // Backspace
          ObjectControls.delete()
          break
      }
    })
    window.addEventListener('keyup', function (event) {
      switch (event.keyCode) {
        case 16: // Shift
          ObjectControls.transform.setTranslationSnap(0)
          ObjectControls.transform.setRotationSnap(THREE.MathUtils.degToRad(0))
          ObjectControls.transform.setScaleSnap(0)

          break
      }
    })
  }

  removeEvents() {}
}
