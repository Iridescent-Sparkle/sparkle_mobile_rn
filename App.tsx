import * as React from 'react'
import { Pressable, SafeAreaView, Text, View } from 'react-native'
import {
  Container,
  ConversationDetail,
  TextInput,
  useChatContext,
} from 'react-native-chat-uikit'

// 修改默认值
const appKey = '1109240309169711#demo'
const userId = 'iridescent'
const userPs = '890224'
const peerId = '<conversation ID>'

function SendMessage() {
  const [page, setPage] = React.useState(0)
  const [id, setId] = React.useState(userId)
  const [ps, setPs] = React.useState(userPs)
  const [peer, setPeer] = React.useState(peerId)
  const im = useChatContext()
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ConversationDetail
        convId={peer}
        convType={0}
        onBack={() => {
          setPage(0)
        }}
      />
    </SafeAreaView>
  )
}

function App(): React.JSX.Element {
  return (
    <Container options={{ appKey }}>
      <SendMessage />
    </Container>
  )
}

export default App
