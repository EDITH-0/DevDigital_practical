interface APICallProp {
  endPoint: string
  method: 'POST' | 'GET'
  hasAuth?: boolean
  reqData?: any
  signal?: any
}
export default function APICallData({
  endPoint,
  method,
  hasAuth,
  reqData = null,
  signal = null,
}: APICallProp) {
  const token = localStorage.getItem('auth_token')
  const defaultHeader = signal
    ? {
        url: endPoint,
        method: method,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: hasAuth
            ? token
              ? 'Bearer ' + token
              : undefined
            : undefined,
        },
        signal: signal.signal,
        data: reqData,
      }
    : {
        url: endPoint,
        method: method,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: hasAuth
            ? token
              ? 'Bearer ' + token
              : undefined
            : undefined,
        },
        data: reqData,
      }
  return defaultHeader
}
