<template>
  <canvas ref="webglrenderer"> </canvas>
</template>

<script>
import Engine from '@/GL/Engine'
export default {
  name: 'Renderer',
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
</style>
