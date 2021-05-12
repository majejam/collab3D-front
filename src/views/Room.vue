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
    if(this.$route.params.roomKey) {
      Socket.join(this.$route.params.roomKey)
    } else {
      Socket.init()
    }
  },
  methods: {
    handleTest() {
      Socket.testing()
    }
  }
}
</script>
