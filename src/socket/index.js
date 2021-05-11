import { io } from 'socket.io-client'

export default class Socket {
  constructor() {
    console.log(io)
    const socket = io('http://localhost:9000/')

    socket.emit('create', 'hello')
  }
}
