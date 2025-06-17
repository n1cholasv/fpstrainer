'use server'

import { prisma } from './prisma'
import { defaultLessons } from './lessons'
import { MeasurementType, ProgressStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function initializeLessons() {
  const existingLessons = await prisma.lesson.count()
  
  if (existingLessons === 0) {
    await prisma.lesson.createMany({
      data: defaultLessons.map(lesson => ({
        title: lesson.title,
        description: lesson.description,
        objectives: lesson.objectives,
        gameRecommendations: lesson.gameRecommendations,
        difficulty: lesson.difficulty,
        minimumScore: lesson.minimumScore
      }))
    })
  }
}

export async function getLessons() {
  return await prisma.lesson.findMany({
    include: {
      userProgress: true,
      measurements: {
        orderBy: { recordedAt: 'desc' },
        take: 1
      }
    },
    orderBy: { difficulty: 'asc' }
  })
}

export async function getLesson(id: string) {
  return await prisma.lesson.findUnique({
    where: { id },
    include: {
      userProgress: true,
      measurements: {
        orderBy: { recordedAt: 'desc' }
      }
    }
  })
}

export async function startLesson(lessonId: string) {
  const existingProgress = await prisma.userProgress.findFirst({
    where: { lessonId }
  })

  if (existingProgress) {
    await prisma.userProgress.update({
      where: { id: existingProgress.id },
      data: { 
        status: ProgressStatus.IN_PROGRESS,
        attempts: { increment: 1 }
      }
    })
  } else {
    await prisma.userProgress.create({
      data: {
        lessonId,
        status: ProgressStatus.IN_PROGRESS,
        attempts: 1
      }
    })
  }
  
  revalidatePath('/lessons')
}

export async function recordMeasurement(
  lessonId: string, 
  type: MeasurementType, 
  value: number, 
  unit: string,
  notes?: string
) {
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } })
  if (!lesson) throw new Error('Lesson not found')

  await prisma.measurement.create({
    data: {
      lessonId,
      type,
      value,
      unit,
      notes
    }
  })

  const progress = await prisma.userProgress.findFirst({
    where: { lessonId }
  })

  if (progress) {
    const isCompleted = lesson.minimumScore ? value >= lesson.minimumScore : false
    
    await prisma.userProgress.update({
      where: { id: progress.id },
      data: {
        lastScore: value,
        bestScore: progress.bestScore ? Math.max(progress.bestScore, value) : value,
        completed: isCompleted,
        completedAt: isCompleted ? new Date() : undefined,
        status: isCompleted ? ProgressStatus.COMPLETED : ProgressStatus.IN_PROGRESS
      }
    })
  }

  revalidatePath('/lessons')
  revalidatePath(`/lessons/${lessonId}`)
}