import React, { Component } from 'react'
import qmark from 'qmark'
import Puppeteer from './puppeteer.js'
import nsa from './nsajs/index.js'
import GoogleURL from 'google-url'

const styles = {
  wrapper: {
    background: '#FFF',
    boxShadow: '0 0 10px 1px #CCC',
    flexGrow: 1,
    display: 'flex',
    borderRadius: 5
  },
  loading: {
    flexGrow: 1,
    backgroundImage: 'url(./img/spinner.gif)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '150px 150px',
    backgroundPosition: 'center center'
  }
}
const googleUrl = new GoogleURL({ key: GOOGLE_APIKEY })
const PUPPETEER = 'p2p connected, start sending gyro data'
const CONNECT = 'waiting for connection'
const ERROR = 'something went wrong'
const NOID = 'no signal data was found'

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = { status: null }
  }

  componentDidMount() {
    const signal = atob(qmark('signal'))
    if (signal) {
      nsa.connect(signal)
        .then(data => {
          googleUrl.shorten(`${location.origin}${location.pathname}?signal=${btoa(JSON.stringify(data))}`, (err, shortUrl) => {
            // remove the length of https://goo.gl/
            const id = shortUrl.substr(15)
            console.log(id)
            this.setState({  mode: CONNECT, id  })
          })
        })
        .catch(err => this.setState({ mode: ERROR, msg: err  }))
    } else {
      this.setState({  mode: NOID, msg: '' })
    }
    nsa.on('connect', () => this.setState({ mode: PUPPETEER }))
  }

  render() {
    const { mode } = this.state
    let content = <div style={styles.loading}></div>

    if (mode === PUPPETEER) {
      content = <Puppeteer />
    }
    if (mode === CONNECT) {
      content = <div>This is your ID: {this.state.id}</div>
    }
    if (mode === ERROR) {
      content = <div>Error: {this.state.msg}</div>
    }
    if (mode === NOID) {
      content = <div>Error: no theater</div>
    }

    return <div style={styles.wrapper}>
      {content}
    </div>
  }
}

export default Controls