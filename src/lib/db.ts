import { prisma } from './prisma'
import { defaultLessons } from './lessons'

export async function ensureLessonsExist() {
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

export async function fetchLessons() {
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