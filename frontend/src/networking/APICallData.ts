interface APICallProp {
  endPoint: string
  method: 'POST' | 'GET'
  hasAuth?: boolean
  reqData?: any
  signal?: any
  extraHeaders?: any
}
export default function APICallData({
  endPoint,
  method,
  hasAuth,
  reqData = null,
  signal = null,
  extraHeaders,
}: APICallProp) {
  const token = localStorage.getItem('auth_token')
  const defaultHeader = signal
    ? {
        url: endPoint,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: hasAuth
            ? token
              ? 'Bearer ' + token
              : undefined
            : undefined,
        },
        signal: signal.signal,
        data: reqData,
        ...extraHeaders,
      }
    : {
        url: endPoint,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: hasAuth
            ? token
              ? 'Bearer ' + token
              : undefined
            : undefined,
          ...extraHeaders,
        },
        data: reqData,
      }
  return defaultHeader
}
