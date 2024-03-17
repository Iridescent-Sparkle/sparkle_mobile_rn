import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { useEffect } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { useChatContext } from 'react-native-chat-uikit'
import GeniusChat from './chat'
import GeniusCollect from './collect'
import GeniusDeliver from './deliver'
import GeniusHome from './home'
import GeniusMember from './member'
import GeniusChatList from './chatList'
import { themeColor } from '@/core/styleSheet/themeColor'
import { pxToDp } from '@/core/styleSheet'
import { isAndroid } from '@/core/tools/validator'

const Tab = createBottomTabNavigator()

export default function GeniusTabLayout() {
  const im = useChatContext()

  useEffect(() => {
    im.logout({})

    isAndroid()
      ? im.login({
        userId: 'iridescent',
        userToken: 'YWMtBev8nuRTEe6tpQM6fmSvg7rwTfmHDU88ngW_aTxCUQQN5uXA37MR7pCad8v9wVnqAwMAAAGOTDW4LzeeSACUtyj6rSDYVMAtG1FaDx9pw4_3CeAkSw4paJA9SJr8UQ',
        usePassword: false,
        result: (res) => {
          console.log(JSON.stringify(res))
        },
      })
      : im.login({
        userId: 'sparkle',
        userToken: 'YWMtMRND7uOwEe6yUuf-Up4XP7rwTfmHDU88ngW_aTxCUQQReqjQ464R7pNPk4Lixj9uAwMAAAGOSAqWXzeeSABMcPmwaedRoxVlj1HuGGfirYHMWr5OJQt7_d5fjOfnfQ',
        usePassword: false,
        result: (res) => {
          console.log(JSON.stringify(res))
        },
      })
  }, [])
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: themeColor.primary }}>
      <Tab.Screen
        name="index"
        component={GeniusHome}
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <Feather name="home" size={pxToDp(48)} color={color} />,
        }}
      />
      <Tab.Screen
        name="collect"
        component={GeniusCollect}
        options={{
          title: '收藏',
          tabBarIcon: ({ color }) => <Feather name="bookmark" size={pxToDp(48)} color={color} />,
        }}
      />
      <Tab.Screen
        name="deliver"
        component={GeniusDeliver}
        options={{
          title: '投递',
          tabBarIcon: ({ color }) => <Feather name="briefcase" size={pxToDp(48)} color={color} />,
        }}
      />
      <Tab.Screen
        name="chat"
        component={GeniusChat}
        options={{
          title: '聊天',
          tabBarIcon: ({ color }) => <Feather name="message-circle" size={pxToDp(48)} color={color} />,
        }}
      />
      <Tab.Screen
        name="chatList"
        component={GeniusChatList}
        options={{
          title: '通讯录',
          tabBarIcon: ({ color }) => <Feather name="message-circle" size={pxToDp(48)} color={color} />,
        }}
      />
      <Tab.Screen
        name="member"
        component={GeniusMember}
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
