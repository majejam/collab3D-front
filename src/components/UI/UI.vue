<template>
  <div class="UI">
    <div class="UI__topbar">
      <Button @click="SceneObject.addObject('box')">Add cube</Button>
    </div>
    <UIViewport />
  </div>
</template>

<script>
import Button from '@/components/UI/Button'
import UIViewport from '@/components/UI/UIViewport'
import SceneObject from '@/GL/SceneObject'
export default {
  name: 'UI',
  components: { Button, UIViewport },
  data() {
    return {
      SceneObject: SceneObject,
    }
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
  }
}
</style>
