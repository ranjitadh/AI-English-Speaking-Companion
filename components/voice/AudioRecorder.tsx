'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Mic, Square, Play, Pause, Loader2, RotateCcw } from 'lucide-react'

interface AudioRecorderProps {
    onRecordingComplete: (audioBlob: Blob) => void
}

export function AudioRecorder({ onRecordingComplete }: AudioRecorderProps) {
    const [isRecording, setIsRecording] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)
    const [recordingDuration, setRecordingDuration] = useState(0)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])
    const audioPlayerRef = useRef<HTMLAudioElement | null>(null)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const mediaRecorder = new MediaRecorder(stream)
            mediaRecorderRef.current = mediaRecorder
            audioChunksRef.current = []

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data)
                }
            }

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
                const url = URL.createObjectURL(audioBlob)
                setAudioUrl(url)
                onRecordingComplete(audioBlob)
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorder.start()
            setIsRecording(true)
            setRecordingDuration(0)

            timerRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1)
            }, 1000)

        } catch (error) {
            console.error('Error accessing microphone:', error)
            alert("Microphone access denied or not available.")
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }

    const togglePlayback = () => {
        if (!audioPlayerRef.current && audioUrl) {
            audioPlayerRef.current = new Audio(audioUrl)
            audioPlayerRef.current.onended = () => setIsPlaying(false)
        }

        if (isPlaying) {
            audioPlayerRef.current?.pause()
        } else {
            audioPlayerRef.current?.play()
        }
        setIsPlaying(!isPlaying)
    }

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-muted/20">
            <div className="text-2xl font-mono font-bold">
                {formatDuration(recordingDuration)}
            </div>

            <div className="flex gap-4">
                {!isRecording && !audioUrl && (
                    <Button onClick={startRecording} size="lg" className="rounded-full w-16 h-16 bg-red-500 hover:bg-red-600">
                        <Mic className="h-8 w-8 text-white" />
                    </Button>
                )}

                {isRecording && (
                    <Button onClick={stopRecording} size="lg" className="rounded-full w-16 h-16" variant="destructive">
                        <Square className="h-6 w-6 fill-current" />
                    </Button>
                )}

                {!isRecording && audioUrl && (
                    <div className="flex gap-2">
                        <Button onClick={togglePlayback} size="icon" className="rounded-full w-12 h-12">
                            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        </Button>
                        <Button onClick={() => { setAudioUrl(null); setRecordingDuration(0); }} variant="outline" size="icon" className="rounded-full w-12 h-12">
                            <RotateCcw className="h-5 w-5" />
                        </Button>
                    </div>
                )}
            </div>
            {isRecording && <p className="text-sm text-red-500 animate-pulse">Recording...</p>}
        </div>
    )
}


