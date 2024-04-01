import { Toast } from '@fruits-chain/react-native-xiaoshu'
import AliyunOSS from 'aliyun-oss-react-native'
import { request } from '@/core/api/index'

export async function initOssClient() {
  try {
    const { data: stsToken } = await request.get({}, {
      url: '/user/sts',
    })

    const endPoint = 'oss-cn-chengdu.aliyuncs.com'

    const configuration = {
      maxRetryCount: 3,
      timeoutIntervalForRequest: 30,
      timeoutIntervalForResource: 24 * 60 * 60,
    }

    AliyunOSS.initWithSecurityToken(stsToken.securityToken, stsToken.accessKeyId, stsToken.accessKeySecret, endPoint, configuration)
    return AliyunOSS
  }
  catch (error) {
    Toast.fail('网络错误')
  }
}
