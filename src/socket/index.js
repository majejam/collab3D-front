import { io } from 'socket.io-client'

class Socket {
  constructor() {
    console.log(io)
    this.socket = io('http://localhost:9000')
    console.log('Connection')
  }

  init() {
    this.socket.emit('create', 'hello')
  }

  testing() {
    console.log("testing!!!")
    this.socket.emit('test', 'hey')
  }
}

const SocketInstance = new Socket()

export default SocketInstance
