<template>
  <div class="UI__Viewport" v-if="engine.infos">
    <ul>
      <li>Objects : {{ engine.infos.objects }}</li>
      <li>Vertices : {{ engine.infos.vertices }}</li>
      <li>Trangles : {{ engine.infos.triangles }}</li>
    </ul>
  </div>
</template>

<script>
import Engine from '@/GL/Engine'
export default {
  name: 'UI__Viewport',
  data() {
    return {
      engine: Engine,
    }
  },
}
</script>

<style lang="scss">
.UI__Viewport {
  position: fixed;
  z-index: 100;
  color: white;
  left: 10px;
  bottom: 10px;
}
</style>
