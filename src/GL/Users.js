import Socket from '@/socket/index.js'
class Users {
  constructor() {
    this.users = new Array()
    this.setEvents()
  }

  add(data) {
    if (this.getUser(data) === null) {
      this.users.push({ id: data, color: Math.random() * 0xffffff })
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
