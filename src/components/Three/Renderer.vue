<template>
  <div>
    <canvas ref="webglrenderer"> </canvas>

    <span class="debug">{{ camera.intersectray }}</span>
  </div>
</template>

<script>
import Engine from '@/GL/Engine'
import Camera from '@/GL/Camera'
export default {
  name: 'Renderer',
  data() {
    return {
      camera: Camera,
    }
  },
  mounted() {
    Engine.init(this.$refs.webglrenderer)
  },
}
</script>

<style lang="scss">
canvas {
  width: 100%;
  height: 80vh;
}

.debug {
  position: fixed;
  z-index: 100;
  color: white;
  top: 10px;
  left: 10px;
}
</style>
