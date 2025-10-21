import {Stack} from 'expo-router'
import React from 'react'
import { useColorScheme } from '@/hooks/use-color-scheme'
import {ColorSchemeName} from "react-native"

export default function TabLayout() {
  const colorScheme: ColorSchemeName = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="home"
        options={{
          title: 'Home',
        }}
      />
    </Stack>
  )
}
