'use client'

import { startLesson } from '@/lib/actions'
import { useState } from 'react'

interface StartLessonButtonProps {
  lessonId: string
}

export default function StartLessonButton({ lessonId }: StartLessonButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleStart = async () => {
    setIsLoading(true)
    try {
      await startLesson(lessonId)
    } catch (error) {
      console.error('Failed to start lesson:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleStart}
      disabled={isLoading}
      className="bg-green-600 hover:bg-green-700 disabled:bg-green-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
    >
      {isLoading ? 'Starting...' : 'Start Practice Session'}
    </button>
  )
}