import { Button, notification, Space } from 'antd'
import { useKUNGalgameUserStore } from '@/store/modules/kungalgamer'
import { kungalgameErrorHandler } from './errorHandler'

interface ErrorResponseData {
  code: number
  message: string
}

/**
 * Acts as an interceptor, first recognizing common errors based on predictable status codes.
 * Then identifies errors based on custom backend status codes
 * If unable to recognize, it throws an error.
 */
export const onRequestError = async (response: Response) => {
  const [api] = notification.useNotification()
  if (response.status === 401) {
    api['error']({
      message: '登陆过期，请重新登陆',
    })
    return
  }

  if (response.status === 404) {
    Message(
      'Not Found, request address is incorrect.',
      '资源未找到，请求地址出错',
      'error'
    )
    return
  }

  const data: ErrorResponseData = await response.json()
  kungalgameErrorHandler(data.code)
}
