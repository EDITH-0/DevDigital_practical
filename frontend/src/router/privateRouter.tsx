import React from 'react'
import { Route, Navigate } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props: any) => {
        if (localStorage.getItem('auth_token')) {
          return <Component {...props} />
        } else {
          return <Route path="*" element={<Navigate to="/" replace />} />
        }
      }}
    />
  )
}

export default PrivateRoute
