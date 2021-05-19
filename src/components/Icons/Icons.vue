<template>
  <div class="Icons grid" :class="className" @click="$emit('click')">
    <Scale v-if="name === 'scale'" :color="color" />
    <Move v-if="name === 'move'" :color="color" />
    <Rotate v-if="name === 'rotate'" :color="color" />
    <Pointer v-if="name === 'pointer'" :color="color" />
  </div>
</template>

<script>
import Scale from '@/components/Icons/Scale'
import Move from '@/components/Icons/Move'
import Rotate from '@/components/Icons/Rotate'
import Pointer from '@/components/Icons/Pointer'
export default {
  name: 'Icons',
  components: { Scale, Move, Rotate, Pointer },
  props: {
    name: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#FFFFFF',
    },
  },
  computed: {
    className() {
      return [
        'Icons--' + this.name,
        {
          'Icons--active': this.active,
        },
        {
          'Icons--deactivated': !this.active,
        },
      ]
    },
  },
}
</script>

<style lang="scss">
.Icons {
  width: 24px;
  height: 24px;
  cursor: pointer;

  svg {
    width: 100%;
    height: 100%;
  }

  &--active {
    opacity: 1;
  }

  &--deactivated {
    opacity: 0.3;
  }
}
</style>
