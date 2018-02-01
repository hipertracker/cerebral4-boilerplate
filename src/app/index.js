import HttpProvider, { HttpProviderError } from '@cerebral/http'
import { redirectToSignal } from '@cerebral/router/operators'
import { Module } from 'cerebral'
import { storage, useragent } from './modules'
import info from './modules/info'
import search from './modules/search'
import router from './router'
import * as sequences from './sequences'

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
    search,
    info,
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
