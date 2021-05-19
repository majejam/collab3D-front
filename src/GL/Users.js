import Socket from '@/socket/index.js'
import * as THREE from 'three'
class Users {
  constructor() {
    this.users = new Array()
    this.colors = new Array()
    this.createColors()
    this.setEvents()
  }

  createColors() {
    for (let index = 0; index <= 360; index += 40) {
      this.colors.push(new THREE.Color(`hsl(${index}, 100%, 50%)`))
    }
  }

  add(data) {
    if (this.getUser(data) === null) {
      this.users.push({ id: data, color: this.colors[Math.round(Math.random() * 9)] })
    }
  }

  remove(id) {
    const users = this.users.filter(user => {
      return user.id !== id
    })
    this.users = users
  }

  getUser(id) {
    let user = null
    for (const usr of this.users) {
      if (usr.id === id) {
        user = usr
        break
      } else user = null
    }
    return user
  }

  getUserColor(id) {
    if (this.getUser(id) !== null) {
      const color = this.getUser(id).color
      console.log(color)
      return color
    } else return 0xff0000
  }

  setEvents() {
    Socket.socket.on('users', users => {
      console.log(users)
      this.add(users)
    })
  }
}

const UsersInstance = new Users()

export default UsersInstance
