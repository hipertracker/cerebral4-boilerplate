import HttpProvider, { HttpProviderError } from '@cerebral/http'
import { redirectToSignal } from '@cerebral/router/operators'
import StorageModule from '@cerebral/storage'
import Useragent from '@cerebral/useragent'
import { Module } from 'cerebral'
import router from './router'
import * as sequences from './sequences'

const useragent = Useragent({
  parse: {
    browser: true,
    device: true,
  },
  feature: true,
  window: true,
  offline: {
    checkOnLoad: false,
    interceptRequests: true,
    reconnect: {
      initialDelay: 3,
      delay: 1.5,
    },
    requests: false,
  },
})

const storage = StorageModule({
  target: localStorage,
  json: true,
  sync: {
    'query': 'query',
  },
  prefix: 'myapp',
})

export default Module({
  state: {
    query: '',
    data: null,
    errors: null,
  },
  signals: {
    homeRouted: sequences.routeToHome,
    networkFailed: sequences.recoverNetworkFailure,
  },
  modules: {
    router,
    storage,
    useragent,
  },
  providers: {
    // see: https://cerebraljs.com/docs/introduction/debugger.html
    http: HttpProvider({
      baseUrl: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000' : '',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json',
      },
      withCredentials: false,
    }),
  },
  catch: [
    [HttpProviderError, redirectToSignal('networkFailed')],
  ],
})
