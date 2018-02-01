import { Compute } from 'cerebral'
import { props, state } from 'cerebral/tags'
import _isEmpty from 'lodash/isEmpty'
import _uniq from 'lodash/uniq'

export default function syncStatewithUrl (items) {
  const map = items.reduce((acc, {urlKey, statePath, sep, keyPath}) => {
    let computedValue = Compute(state`${statePath}`, stateValue => {
      if (stateValue instanceof Array && sep)
        return _uniq(stateValue).join(sep)
      return stateValue
    })
    if (keyPath) {
      computedValue = Compute(
        state`${statePath}.${state`${keyPath}`}`,
        (stateValue) => {
          if (stateValue instanceof Array && sep) {
            return _uniq(stateValue).join(sep)
          }
          return stateValue
        },
      )
    }
    return {...acc, [urlKey]: computedValue}
  }, {})

  const rmap = items.reduce((acc, {urlKey, statePath, sep, keyPath}) => {
    let computedValue = Compute(
      state`${statePath}`,
      props`${urlKey}`,
      (previousStateValue, urlValue) => {
        if (urlValue === undefined) return previousStateValue
        if (sep && _isEmpty(urlValue)) return previousStateValue
        if (sep) return _uniq(urlValue.split(sep))
        return urlValue
      },
    )
    if (keyPath) {
      computedValue = Compute(
        state`${statePath}.${state`${keyPath}`}`,
        props`${urlKey}`,
        (previousStateValue, urlValue) => {
          if (urlValue === undefined) return previousStateValue
          if (sep && _isEmpty(urlValue)) return previousStateValue
          if (sep) return _uniq(urlValue.split(sep))
          return urlValue
        },
      )
    }
    return {...acc, [statePath]: computedValue}
  }, {})

  return {map, rmap}
}
