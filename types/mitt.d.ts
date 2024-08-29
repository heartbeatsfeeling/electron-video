import { Events } from '@/config/enum'
import { SnackbarMessage, VariantType } from 'notistack'

export interface Message {
  message: SnackbarMessage
  variant: VariantType
  duration?: number
}
export type MittEvents = {
  [Events.messageOpen]: Message
  [Events.messageClose]: undefined
}
