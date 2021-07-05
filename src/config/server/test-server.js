import {setupServer} from 'msw/node'
import {handlers} from '../../utils/service-handlers'

const server = setupServer(...handlers)

export * from 'msw'
export {server}
