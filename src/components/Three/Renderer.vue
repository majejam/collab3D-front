<template>
  <div>
    <canvas ref="webglrenderer"> </canvas>

    <div class="debug" v-if="engine.infos">
      <ul>
        <li>Objects : {{ engine.infos.objects }}</li>
        <li>Vertices : {{ engine.infos.vertices }}</li>
        <li>Trangles : {{ engine.infos.triangles }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Engine from '@/GL/Engine'
export default {
  name: 'Renderer',
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
