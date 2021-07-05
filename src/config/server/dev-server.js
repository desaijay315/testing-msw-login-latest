import {setupWorker, rest} from 'msw'
import {handlers} from '../../utils/service-handlers'
import {homepageURL} from '../../../package.json'

const fullUrl = new URL(homepageURL)

const server = setupWorker(...handlers)

server.start({
  quiet: true,
  serviceWorker: {
    url: fullUrl.pathname + 'mockServiceWorker.js',
  },
})

export * from 'msw'
export {server}

window.msw = {
  server,
  rest,
}