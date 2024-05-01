'use client'

import { TranscriptPanel } from '@/components/transcript-panel'
import { useRef, useState } from 'react'
import { RealtimeSession } from 'speechmatics'

export default function Home() {
  const [session, setSession] = useState<RealtimeSession | null>(null)
  const [transcription, setTranscription] = useState<string | null>(null)
  const tcRef = useRef(transcription)
  const [translation, setTranslation] = useState<string | null>(null)
  const tlRef = useRef(translation)

  const listDevices = () => {
    console.log('clicked')
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.log('enumerateDevices() not supported.')
    } else {
      // List microphones.
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices = devices.filter((d) => d.kind === 'audioinput')
        console.log(devices)
      })
    }
  }

  const stopTranscript = () => session?.stop()

  const startTranscript = async () => {
    let s: RealtimeSession
    // create a session with JWT
    if (!session) {
      // fetch key
      const { key_value } = await fetch('/api/key').then((res) => res.json())
      s = new RealtimeSession({ apiKey: key_value })
      setSession(s)
    } else {
      s = session
    }

    //add listeners
    s.addListener('RecognitionStarted', () => {
      console.log('RecognitionStarted')
    })

    s.addListener('Error', (error) => {
      console.log('session error', error)
    })

    s.addListener('AddTranscript', (message) => {
      console.log('AddTranscript', message)
      const updatedT = `${tcRef.current ?? ''} ${message.metadata.transcript}`
      setTranscription(updatedT)
    })

    s.addListener('AddTranslation', (message) => {
      console.log('AddTranslation', message)
      const updatedT = `${tlRef.current ?? ''} ${message.results.map(
        (res) => res.content ?? ''
      )}`
      setTranslation(updatedT)
    })

    s.addListener('AddPartialTranscript', (message) => {
      console.log('AddPartialTranscript', message)
    })

    s.addListener('EndOfTranscript', () => {
      console.log('EndOfTranscript')
    })

    //start session which is an async method
    s.start({
      transcription_config: { language: 'en', output_locale: 'en-GB' },
      translation_config: { target_languages: ['cmn'] },
    }).then(async () => {
      //setup audio stream
      // TODO pull out into state
      let stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 16000,
      })

      mediaRecorder.start(1000)

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          s.sendAudio(event.data)
        }
      }
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <button onClick={listDevices}>Select device</button>
      <button onClick={startTranscript}>START</button>
      <button onClick={stopTranscript}>STOP</button>
      <TranscriptPanel
        transcription={transcription}
        translation={translation}
      />
    </main>
  )
}
