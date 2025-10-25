import {Stack} from 'expo-router'
import React from 'react'

export default function TabLayout() {

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                animation: "slide_from_left"
            }}>
            <Stack.Screen
                name="home"
                options={{
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: true,
                    animation: "slide_from_right"
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    headerShown: true,
                    animation: "slide_from_right"
                }}
            />
        </Stack>
    )
}
