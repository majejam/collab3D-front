<template>
  <div class="UI">
    <div class="UI__topbar grid">
      <Button @click="SceneObject.addObject('box')">Add cube</Button>
      <div class="UI__topbar__icons grid grid-between" v-if="ObjectControls.transform">
        <Icons name="scale" @click="changeMode('scale')" :active="mode == 'scale'" />
        <Icons name="move" @click="changeMode('translate')" :active="mode == 'translate'" />
        <Icons name="rotate" @click="changeMode('rotate')" :active="mode == 'rotate'" />
      </div>
    </div>
    <UIViewport />
  </div>
</template>

<script>
import Button from '@/components/UI/Button'
import Icons from '@/components/Icons/Icons'
import UIViewport from '@/components/UI/UIViewport'
import SceneObject from '@/GL/SceneObject'
import ObjectControls from '@/GL/ObjectControls'
export default {
  name: 'UI',
  components: { Button, UIViewport, Icons },
  data() {
    return {
      SceneObject: SceneObject,
      ObjectControls: ObjectControls,
      mode: 'translate',
    }
  },
  methods: {
    changeMode(mode) {
      this.mode = mode
      this.ObjectControls.transform.setMode(mode)
    },
    reset() {
      this.mode = ''
      this.ObjectControls.transform.setMode('')
    },
  },
}
</script>

<style lang="scss">
.UI {
  position: fixed;
  top: 0;
  left: 0;

  &__topbar {
    position: fixed;
    top: 10px;
    left: 10px;

    &__icons {
      margin-left: 16px;
      width: 100px;
    }
  }
}
</style>
