<template>
  <div>
    <UI />
    <canvas ref="webglrenderer"> </canvas>
  </div>
</template>

<script>
import Engine from '@/GL/Engine'
import UI from '@/components/UI/UI'
export default {
  name: 'Renderer',
  components: { UI },
  data() {
    return {
      engine: Engine,
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
  height: 100vh;
}
</style>
