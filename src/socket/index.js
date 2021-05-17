import { io } from 'socket.io-client'

class Socket {
  constructor() {
    this.socket = io('https://euclid-back.herokuapp.com:9000')
    this.roomKey = null
    this.userId = null
    console.log('Connection')
  }

  init() {
    this.socket.emit('create', 'test')
  }

  join(roomKey) {
    this.socket.emit('join', roomKey)
  }

  userJoined(roomKey, userId) {
    this.socket.emit('initDatas', roomKey, userId)
  }

  moveObject(roomKey, objectMoved, objectId) {
    this.socket.emit('objectMoved', roomKey, objectMoved, objectId)
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
