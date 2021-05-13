<template>
  <div>
    <Renderer />
    <!-- <button @click="handleMoveX">Test Socket</button>
    <span>{{ currentPositionX }}</span> -->
  </div>
</template>

<script>
import Socket from '@/socket/index.js'
import Renderer from '@/components/Three/Renderer'
export default {
  name: 'Home',
  components: { Renderer },
  data() {
    return {
      io: Socket,
      currentPositionX: 0
    }
  },
  mounted() {
    if(this.$route.params.roomKey) {
      this.io.roomKey = this.$route.params.roomKey
      this.io.join(this.$route.params.roomKey)
      this.io.socket.on('send roomInfos', function(data) {
        console.log(data)
      })
    } else {
      this.io.init()
      this.io.roomKey = 'hello'
    }
  },
  methods: {
    handleMoveX() {
      this.io.moveX("hello")
      this.currentPositionX++
    }
  },
  created() {
    // this.io.socket.on('updateDatas', (data) => {
    //   console.log(data)
    //   this.currentPositionX = data.sceneData.objectPosition[1]
    // })
  }
}
</script>
