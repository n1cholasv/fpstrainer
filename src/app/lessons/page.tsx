import Link from 'next/link';
import { getLessons, initializeLessons } from '@/lib/actions';
import { ProgressStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

function getStatusColor(status: ProgressStatus) {
  switch (status) {
    case ProgressStatus.COMPLETED:
    case ProgressStatus.MASTERED:
      return 'bg-green-500';
    case ProgressStatus.IN_PROGRESS:
      return 'bg-yellow-500';
    default:
      return 'bg-gray-500';
  }
}

function getStatusText(status: ProgressStatus) {
  switch (status) {
    case ProgressStatus.COMPLETED:
      return 'Completed';
    case ProgressStatus.MASTERED:
      return 'Mastered';
    case ProgressStatus.IN_PROGRESS:
      return 'In Progress';
    default:
      return 'Not Started';
  }
}

function getDifficultyStars(difficulty: number) {
  return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
}

export default async function LessonsPage() {
  let lessons: Awaited<ReturnType<typeof getLessons>> = [];
  let error = null;
  
  try {
    await initializeLessons();
    lessons = await getLessons();
  } catch (e) {
    console.error('Database error:', e);
    error = 'Unable to connect to database. Please check your connection.';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Training Lessons</h1>
            <p className="text-slate-300">
              Master FPS fundamentals through structured practice
            </p>
          </div>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-400 mb-2">Database Connection Error</h3>
            <p className="text-red-300">{error}</p>
            <p className="text-sm text-red-400 mt-2">
              Please ensure the Supabase database is properly configured and accessible.
            </p>
          </div>
        )}

        <div className="grid gap-6">
          {lessons.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-slate-400">No lessons found. Please check your database connection.</p>
            </div>
          )}
          {lessons.map((lesson) => {
            const progress = lesson.userProgress[0];
            const status = progress?.status || ProgressStatus.NOT_STARTED;
            
            return (
              <div key={lesson.id} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-semibold">{lesson.title}</h2>
                      <span className="text-sm text-slate-400">
                        {getDifficultyStars(lesson.difficulty)}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
                        <span className="text-sm text-slate-300">
                          {getStatusText(status)}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4">{lesson.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium mb-2 text-blue-400">Objectives:</h4>
                        <ul className="text-sm text-slate-300 space-y-1">
                          {lesson.objectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-400 mt-1">•</span>
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2 text-purple-400">Recommended Games:</h4>
                        <ul className="text-sm text-slate-300 space-y-1">
                          {lesson.gameRecommendations.map((game, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-purple-400 mt-1">•</span>
                              {game}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {progress && (
                      <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                        <span>Attempts: {progress.attempts}</span>
                        {progress.bestScore && (
                          <span>Best Score: {progress.bestScore}%</span>
                        )}
                        {progress.lastScore && (
                          <span>Last Score: {progress.lastScore}%</span>
                        )}
                        {lesson.minimumScore && (
                          <span>Target: {lesson.minimumScore}%</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    {status === ProgressStatus.NOT_STARTED ? 'Start Lesson' : 'Continue'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}