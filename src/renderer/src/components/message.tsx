import { Events } from '@/config/enum'
import emitter from '@/config/mitt'
import { SnackbarMessage, SnackbarProvider, useSnackbar, VariantType } from 'notistack'
import { useEffect } from 'react'

/**
 * 通用message组件
 * @returns null
 */
function Toast () {
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    emitter.on(Events.messageOpen, (e) => {
      enqueueSnackbar(e.message, {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        variant: e.variant,
        autoHideDuration: e.duration ?? 3000
      })
    })
    return () => {
      emitter.off(Events.messageOpen)
    }
  }, [])
  return (
    <SnackbarProvider></SnackbarProvider>
  )
}
export default function Message () {
  return (
    <SnackbarProvider>
      <Toast />
    </SnackbarProvider>
  )
}
