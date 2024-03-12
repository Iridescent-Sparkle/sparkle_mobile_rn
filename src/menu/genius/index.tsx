import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Feather from 'react-native-vector-icons/Feather'
import GeniusHome from './home'
import GeniusCollect from './collect'
import GeniusDeliver from './deliver'
import GeniusChat from './chat'
import GeniusMember from './member'
import { pxToDp } from '@/core/styleSheet'
import { themeColor } from '@/core/styleSheet/themeColor'

const Tab = createBottomTabNavigator()
export default function GeniusTabLayout() {
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
