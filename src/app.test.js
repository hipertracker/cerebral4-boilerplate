import { Container } from '@cerebral/react'
import { Snapshot } from 'cerebral/test'
import React from 'react'
import renderer from 'react-test-renderer'
import app from './app'
import App from './components/App'

// see: https://cerebraljs.com/docs/api/test.html

test('homeRouted', () => {
  return Snapshot(app).
    run('homeRouted').
    then(snapshot => {
      const tree = renderer.create(
        <Container controller={snapshot.controller}>
          <App/>
        </Container>,
      ).toJSON()
      expect(tree).toMatchSnapshot()
      expect(snapshot.get()).toMatchSnapshot()
    })
})


