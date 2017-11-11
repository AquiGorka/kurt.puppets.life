import Peer from 'simple-peer'
import { EventEmitter } from 'events'

class NSAJS extends EventEmitter {
  constructor() {
    super()
    this.peer = new Peer({ trickle: false })
    this.peer.on('connect', () => this.emit('connect'))
  }

  connect(signal) {
    if (signal) {
      return new Promise((resolve, reject) => {
        this.peer.on('signal', data => resolve(data))
        this.peer.signal(signal)
      })
    } else {
      return Promise.reject('Puppet connect error: Please provide the signal data.')
    }
  }

  send(data) {
    this.peer.send(JSON.stringify(data))
  }
}

export default new NSAJS