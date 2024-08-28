import mitt from 'mitt'
import { Events } from 'type/mitt'
const emitter = mitt<Events>()
export default emitter

emitter.on('messageOpen', () => {
//
})

emitter.emit('messageOpen', '111')
