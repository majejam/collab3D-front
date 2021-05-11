<template>
  <div>
    <span>Socket</span>
    <button @click="handleTest">Test Socket</button>
  </div>
</template>

<script>
import Socket from '@/socket/index.js'
export default {
  name: 'Home',
  mounted() {
    Socket.init()
  },
  methods: {
    handleTest() {
      Socket.testing()
    }
  }
}
</script>
