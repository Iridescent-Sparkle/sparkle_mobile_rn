import { Text, View } from 'react-native'
import React from 'react'
import RenderHtml from 'react-native-render-html'
import { create, pxToDp } from '@/core/styleSheet'

interface Props {
  title: string
  content: string
}

function RecruitAboutCard(props: Props) {
  const { title, content } = props

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${title}：`}</Text>
      <RenderHtml baseStyle={styles.content} contentWidth={pxToDp(100)} source={{ html: content }}></RenderHtml>
    </View>
  )
}

const styles = create({
  container: {
    overflow: 'hidden',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#212121',
    marginVertical: 32,
  },
  content: {
    color: '#5B5B5B',
    fontSize: 24,
    lineHeight: 36,
  },
})

export default RecruitAboutCard
