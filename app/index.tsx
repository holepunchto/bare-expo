import { useState, useEffect } from 'react'
import { Text } from 'react-native'
import { Worklet } from 'react-native-bare-kit'
import bundle from "../app/app.bundle"

export default function() {
  const [response, setReponse] = useState<string | null>(null)

  useEffect(() => {
    const worklet = new Worklet()

    worklet.start('/app.bundle',bundle)

    const rpc = new worklet.RPC(() => { /* No reply */ })

    const req = rpc.request('ping')

    req.send('Hello from React Native!')

    req.reply('utf8').then((res: string) => setReponse(res))
  }, [])

  return (
    <Text>{response}</Text>
  )
}