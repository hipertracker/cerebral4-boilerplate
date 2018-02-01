import StorageModule from '@cerebral/storage'
import Useragent from '@cerebral/useragent'

export const useragent = Useragent({
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

export const storage = StorageModule({
  target: localStorage,
  json: true,
  sync: {
    'query': 'query',
  },
  prefix: 'myapp',
})
