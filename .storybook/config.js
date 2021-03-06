import React from 'react'
import { configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import pck from '../package.json'
import 'intersection-observer'
import './base.css'

setOptions({
  name: pck.name,
  url: pck.repository ? pck.repository.url : null,
  showDownPanel: false,
})

/**
 * Use require.context to load dynamically: https://webpack.github.io/docs/context.html
 */
const req = require.context('../stories', true, /story\.js$/)

function loadStories() {
  req.keys().forEach(req)
}

configure(loadStories, module)
