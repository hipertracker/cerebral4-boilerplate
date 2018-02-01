import { set } from 'cerebral/operators'
import { props, state } from 'cerebral/tags'
// import * as actions from './actions'

const loadData = [
  // actions.fetchData, //async
  // {
  //   ok: actions.updateState,
  //   failed: set(state`errors`, props`error`),
  // },
]

export const routeToHome = loadData

export const recoverNetworkFailure = set(state`errors`, props`response`)

export const clearErrors = set(state`errors`, null)
