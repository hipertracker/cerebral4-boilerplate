import { Container } from '@cerebral/react'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App/index'
import controller from './controller'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render((
  <Container controller={controller}>
    <App/>
  </Container>
), document.getElementById('root'))

registerServiceWorker()
