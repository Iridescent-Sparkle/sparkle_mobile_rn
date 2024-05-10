import { Toast } from '@fruits-chain/react-native-xiaoshu'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import Pdf from 'react-native-pdf'
import { create } from '@/core/styleSheet'
import Page from '@/core/components/Page'

function ResumePreview() {
  const route = useRoute<{ key: any, name: any, params: { accessUrl: string, fileName: string, fileSize: number } }>()

  return (
    <Page title="预览简历" isScrollView={false}>
      <Pdf
        trustAllCerts={false}
        onError={() => {
          Toast.fail('简历预览失败')
        }}
        source={{
          cache: true,
          method: 'GET',
          uri: route.params.accessUrl,
        }}
        style={styles.pdf}
      />
    </Page>
  )
}

const styles = create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
})

export default ResumePreview
