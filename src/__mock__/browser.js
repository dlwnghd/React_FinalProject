import { setupWorker } from 'msw'
import { handler } from './Apis/handler'

export const worker = setupWorker(...handler)
