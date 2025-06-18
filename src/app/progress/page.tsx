import Link from 'next/link';
import { getLessons } from '@/lib/actions';
import { ProgressStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

function getProgressPercentage(status: ProgressStatus, bestScore?: number | null, minimumScore?: number | null) {
  if (status === ProgressStatus.COMPLETED || status === ProgressStatus.MASTERED) {
    return 100;
  }
  
  if (bestScore && minimumScore) {
    return Math.min((bestScore / minimumScore) * 100, 100);
  }
  
  if (status === ProgressStatus.IN_PROGRESS) {
    return 25;
  }
  
  return 0;
}

export default async function ProgressPage() {
  const lessons = await getLessons();
  
  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(lesson => {
    const progress = lesson.userProgress[0];
    return progress?.status === ProgressStatus.COMPLETED || progress?.status === ProgressStatus.MASTERED;
  }).length;
  
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Training Progress</h1>
            <p className="text-slate-300">
              Track your improvement across all FPS fundamentals
            </p>
          </div>
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {Math.round(overallProgress)}%
            </div>
            <div className="text-slate-300">Overall Progress</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {completedLessons}/{totalLessons}
            </div>
            <div className="text-slate-300">Lessons Completed</div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {lessons.reduce((total, lesson) => total + (lesson.userProgress[0]?.attempts || 0), 0)}
            </div>
            <div className="text-slate-300">Total Practice Sessions</div>
          </div>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Lesson Progress Breakdown</h2>
          
          <div className="space-y-6">
            {lessons.map((lesson) => {
              const progress = lesson.userProgress[0];
              const status = progress?.status || ProgressStatus.NOT_STARTED;
              const progressPercentage = getProgressPercentage(status, progress?.bestScore, lesson.minimumScore);
              
              return (
                <div key={lesson.id} className="border-b border-slate-700 pb-6 last:border-b-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-medium">{lesson.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mt-1">
                        <span>Difficulty: {'★'.repeat(lesson.difficulty)}{'☆'.repeat(5 - lesson.difficulty)}</span>
                        <span>Target: {lesson.minimumScore}%</span>
                      </div>
                    </div>
                    <Link
                      href={`/lessons/${lesson.id}`}
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      View Details →
                    </Link>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">Progress</span>
                      <span className="text-slate-300">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {progress && (
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Status:</span>
                        <span className="ml-2 text-slate-300">
                          {status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Attempts:</span>
                        <span className="ml-2 text-slate-300">{progress.attempts}</span>
                      </div>
                      {progress.bestScore && (
                        <div>
                          <span className="text-slate-400">Best Score:</span>
                          <span className="ml-2 text-green-400 font-medium">{progress.bestScore}%</span>
                        </div>
                      )}
                      {progress.lastScore && (
                        <div>
                          <span className="text-slate-400">Last Score:</span>
                          <span className="ml-2 text-slate-300">{progress.lastScore}%</span>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!progress && (
                    <div className="text-slate-400 text-sm">
                      No practice sessions recorded yet
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/lessons"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Continue Training
          </Link>
        </div>
      </div>
    </div>
  );
}