import { Button } from '@fruits-chain/react-native-xiaoshu'
import FastImage from 'react-native-fast-image'
import React from 'react'
import { Text, View } from 'react-native'
import { IMAGE_PREFIX } from '@/core/constants'
import { create } from '@/core/styleSheet'

const GUIDE_DATA = {
  resume: {
    title: '你当前的身份是"牛人"',
    button: '切换为"Boss"身份',
    img: 'job_offers.png',
  },
  recruit: {
    title: '你当前的身份是"Boss"',
    button: '切换为"牛人"身份',
    img: 'job_hunt.png',
  },
}

function UserChange() {
  // const router = useRouter()
  // const { type } = useLocalSearchParams<{ type: 'resume' | 'recruit' }>()

  const handleContinueClick = () => {
    // router.push('/(auth)/(password)/verification-code')
  }

  return (
    <View style={styles.container}>
      <FastImage
        style={styles.banner}
        source={{
          uri: `${IMAGE_PREFIX}/${GUIDE_DATA.resume.img}`,
        }}
      >
      </FastImage>
      <Text style={styles.title}>{GUIDE_DATA.resume.title}</Text>
      <Button style={styles.button} onPress={handleContinueClick}>{GUIDE_DATA.resume.button}</Button>
    </View>
  )
}

const styles = create({
  container: {
    position: 'relative',
    top: -64,
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: 630,
    height: 540,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
  },
  button: {
    width: '90%',
    borderRadius: 40,
    marginTop: 42,
  },
})

export default UserChange
