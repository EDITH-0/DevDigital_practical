import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { alertService } from '../utils/alert.service'
const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
}

const defaultProps = {
  id: 'default-alert',
  fade: true,
}

const popupOptions: any = {
  position: 'top-right',
  autoClose: 5000,
  theme: 'colored',
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
}

function Alert({ id, fade }: any) {
  const [alerts, setAlerts] = useState<any>([])

  const callAlert = (type: string, message: string) => {
    switch (type) {
      case 'Success':
        toast.success(message, popupOptions)
        break

      case 'Info':
        toast.info(message, popupOptions)
        break

      case 'Error':
        toast.error(message, popupOptions)
        break

      case 'Warning':
        toast.warn(message, popupOptions)
        break

      default:
        break
    }
  }

  useEffect(() => {
    const subscription = alertService.onAlert(id).subscribe((alert) => {
      if (!alert.message) {
        setAlerts((alertsIfBlock: any) => {
          const filteredAlerts = alertsIfBlock.filter(
            (x: any) => x.keepAfterRouteChange,
          )

          filteredAlerts.forEach((x: any) => delete x.keepAfterRouteChange)
          return filteredAlerts
        })
      } else {
        setAlerts((alertsElseBlock: any) => [...alertsElseBlock, alert])
        callAlert(alert.type, alert.message)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (!alerts.length) return null

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

Alert.propTypes = propTypes
Alert.defaultProps = defaultProps
export default Alert
