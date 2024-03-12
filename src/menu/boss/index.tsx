import AntDesign from 'react-native-vector-icons/AntDesign'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BossHome from './home'
import BossMember from './member'
import BossChat from './chat'
import BossManage from './manage'
import { pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

const Tab = createBottomTabNavigator()
export default function BossTabLayout() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: themeColor.primary }}>
      <Tab.Screen
        name="index"
        component={BossHome}
        options={{
          title: '首页',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={pxToDp(48)} color={color} />,
        }}
      />
      <Tab.Screen
        name="manage"
        component={BossManage}
        options={{
          title: '管理招聘',
          tabBarIcon: ({ color }) => <AntDesign name="inbox" size={pxToDp(48)} color={color} />,
        }}
      />
      <Tab.Screen
        name="chat"
        component={BossChat}
        options={{
          title: '聊天',
          tabBarIcon: ({ color }) => <AntDesign name="message1" size={pxToDp(48)} color={color} />,
        }}
      />
      <Tab.Screen
        name="member"
        component={BossMember}
        options={{
          title: '我的',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={pxToDp(48)} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
