import { io } from 'socket.io-client'

class Socket {
  constructor() {
    this.socket = io('http://localhost:9000')
    this.roomKey = null
    this.userId = null
    console.log('Connection')
  }

  init() {
    this.socket.emit('create', 'hello')
  }

  join(roomKey) {
    this.socket.emit('join', roomKey)
  }

  userJoined(roomKey, userId) {
    this.socket.emit('initDatas', roomKey, userId)
  }

  moveX(roomKey) {
    this.socket.emit('moveX', roomKey)
  }

  moveObject(roomKey, objectPosition, objectId) {
    this.socket.emit('objectMoved', roomKey, objectPosition, objectId)
  }

  addObject(roomKey, objectId) {
    this.socket.emit('addObject', roomKey, objectId)
  }

  deleteObject(roomKey, objectId) {
    this.socket.emit('deleteObject', roomKey, objectId)
  }
}

const SocketInstance = new Socket()

export default SocketInstance
