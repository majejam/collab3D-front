import { io } from 'socket.io-client'

class Socket {
  constructor() {
    this.socket = io('http://localhost:9000')
    this.roomKey = null
    console.log('Connection')
  }

  init() {
    this.socket.emit('create', 'hello')
  }

  join(roomKey) {
    this.socket.emit('join', roomKey)
  }

  moveX(roomKey) {
    this.socket.emit('moveX', roomKey)
  }

  moveObject(roomKey, objectPosition, objectId) {
    this.socket.emit('objectMoved', roomKey, objectPosition, objectId)
  }
}

const SocketInstance = new Socket()

export default SocketInstance
