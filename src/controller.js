import { Controller } from 'cerebral'
import app from './app'

// SEE: https://cerebraljs.com/docs/introduction/debugger.html
const Devtools = (
  process.env.NODE_ENV === 'development'
    ? require('cerebral/devtools').default : null
)

const controller = Controller(app, {
  devtools: Devtools && Devtools({
    host: 'localhost:8585',
    reconnect: false,
  }),
})

export default controller
