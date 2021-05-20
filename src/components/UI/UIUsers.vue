<template>
  <div class="UI__Users grid" v-if="users.users.length">
    <div class="UI__Users__circle grid" v-for="(user, index) in users.users" :key="index" :style="`background: ${color(user.color)};`">u</div>
  </div>
</template>

<script>
import Users from '@/GL/Users'
import * as THREE from 'three'
export default {
  name: 'UI__Users',
  data() {
    return {
      users: Users,
    }
  },
  methods: {
    color(color) {
      const colorC = new THREE.Color()
      const convertedColor = colorC.copyLinearToSRGB(color)
      console.log(convertedColor.getHexString())
      return '#' + convertedColor.getHexString()
    },
  },
}
</script>

<style lang="scss">
.UI__Users {
  position: fixed;
  z-index: 100;
  color: white;
  right: 10px;
  top: 10px;

  &__circle {
    width: 32px;
    height: 32px;
    border-radius: 100%;
    margin: 0 8px;
  }
}
</style>
