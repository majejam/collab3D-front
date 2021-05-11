<template>
  <div>
    <span>Socket</span>
  </div>
</template>

<script>
import Socket from '@/socket/index.js'
export default {
  name: 'Home',
  mounted() {
    Socket.init()
  },
}
</script>
