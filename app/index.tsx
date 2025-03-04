import { useState, useEffect } from 'react'
import { Text, Platform } from 'react-native'
import * as Notifications from 'expo-notifications'

import { Worklet } from 'react-native-bare-kit'

async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    console.warn('❌ Push notification permission denied');
    return;
  }

  console.log('✅ Push notification permission granted');

  // Only register for push tokens on iOS (Android doesn't need this)
  if (Platform.OS === 'ios' && __DEV__) {
    const token = await Notifications.getDevicePushTokenAsync()
    console.log('📱 APNs Device Token:', token.data);
  }
}


export default function() {
  const [response, setReponse] = useState<string | null>(null)

  useEffect(() => {
    requestNotificationPermissions()
    const worklet = new Worklet()

    const source = `
    console.log('Worklet is running!')
    const { IPC } = BareKit

    IPC.setEncoding('utf8')
    IPC.on('data', (data) => console.log(data))
    IPC.write('Hello from Bare!')
    `

    worklet.start('/app.js', source)

    const { IPC } = worklet

    IPC.setEncoding('utf8')
    IPC.on('data', (data: string) => setReponse(data))
    IPC.write('Hello from React Native!')
  }, [])

  return <Text>{response}</Text>
}
