<template>
  <div class="UI__ColorPicker">
    <input type="color" id="meshColor" name="meshColor" v-model="color" @input="onChange" @change="onChange" />
  </div>
</template>

<script>
import Bus from '@/utils/bus'
import ObjectControls from '@/GL/ObjectControls'
export default {
  name: 'ColorPicker',
  data() {
    return {
      color: '#e66465',
    }
  },
  mounted() {
    Bus.$on('MeshAttach', mesh => {
      this.color = '#' + mesh.material.color.getHexString()
    })
  },
  methods: {
    onChange() {
      ObjectControls.changeColor(this.color)
    },
  },
}
</script>

<style lang="scss">
.UI__ColorPicker {
  input {
    height: 24px;
    width: 24px;
    border: none;
    outline: none;
  }
}
</style>
