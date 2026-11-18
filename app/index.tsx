import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { Worklet } from 'react-native-bare-kit'
import b4a from 'b4a'

export default function () {
  const [response, setResponse] = useState<string | null>(null)

  useEffect(() => {
    const worklet = new Worklet()

    const source = `
    const { IPC } = BareKit

    IPC.on('data', (data) => console.log(data.toString()))
    IPC.write(Buffer.from('Hello from Bare!'))
    `

    worklet.start('/app.js', source)

    const { IPC } = worklet

    IPC.on('data', (data: Uint8Array) => setResponse(b4a.toString(data)))
    IPC.write(b4a.from('Hello from React Native!'))

    return () => {
      worklet.terminate()
    }
  }, [])

  return <Text>{response}</Text>
}
