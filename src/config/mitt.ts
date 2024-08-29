import mitt from 'mitt'
import { MittEvents } from '#/mitt'
const emitter = mitt<MittEvents>()
export default emitter
