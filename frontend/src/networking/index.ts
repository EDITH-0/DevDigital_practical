import axios from 'axios'
import APICallData from './APICallData'



interface APICallProp {
  endPoint: string
  method: 'POST' | 'GET'
  hasAuth?: boolean
  reqData?: any
  signal?: any
}

export default async function APICall({
  endPoint,
  method,
  hasAuth = true,
  reqData = null,
  signal = null,
}: APICallProp) {
  try {
    const res = await axios(
      APICallData({
        endPoint,
        method,
        hasAuth,
        reqData,
        signal,
      }),
    )
    return res
  } catch (error: any) {
    return error.response
  }
}
