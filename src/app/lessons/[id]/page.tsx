import Link from 'next/link';
import { getLesson } from '@/lib/actions';
import { notFound } from 'next/navigation';
import { ProgressStatus } from '@prisma/client';
import StartLessonButton from '@/components/StartLessonButton';
import MeasurementForm from '@/components/MeasurementForm';

function getStatusColor(status: ProgressStatus) {
  switch (status) {
    case ProgressStatus.COMPLETED:
    case ProgressStatus.MASTERED:
      return 'text-green-400';
    case ProgressStatus.IN_PROGRESS:
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
}

function getStatusText(status: ProgressStatus) {
  switch (status) {
    case ProgressStatus.COMPLETED:
      return 'Completed ✓';
    case ProgressStatus.MASTERED:
      return 'Mastered ★';
    case ProgressStatus.IN_PROGRESS:
      return 'In Progress...';
    default:
      return 'Not Started';
  }
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lesson = await getLesson(id);
  
  if (!lesson) {
    notFound();
  }

  const progress = lesson.userProgress[0];
  const status = progress?.status || ProgressStatus.NOT_STARTED;
  const canPractice = status === ProgressStatus.IN_PROGRESS;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/lessons"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to Lessons
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-slate-400">
                    Difficulty: {'★'.repeat(lesson.difficulty)}{'☆'.repeat(5 - lesson.difficulty)}
                  </span>
                  <span className={`font-medium ${getStatusColor(status)}`}>
                    {getStatusText(status)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-slate-300 mb-8 text-lg leading-relaxed">
              {lesson.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-400">Learning Objectives</h3>
                <ul className="space-y-3">
                  {lesson.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1 text-lg">•</span>
                      <span className="text-slate-300">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-400">Recommended Training</h3>
                <ul className="space-y-3">
                  {lesson.gameRecommendations.map((game, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1 text-lg">•</span>
                      <span className="text-slate-300">{game}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {lesson.minimumScore && (
              <div className="bg-slate-700/50 rounded-lg p-4 mb-8">
                <h4 className="font-semibold mb-2 text-yellow-400">Success Criteria</h4>
                <p className="text-slate-300">
                  Achieve a minimum score of <strong>{lesson.minimumScore}%</strong> to complete this lesson
                  and progress to the next level.
                </p>
              </div>
            )}

            <div className="flex gap-4">
              {status === ProgressStatus.NOT_STARTED && (
                <StartLessonButton lessonId={lesson.id} />
              )}
              
              {canPractice && (
                <div className="flex gap-4">
                  <StartLessonButton lessonId={lesson.id} />
                  <span className="text-slate-400 text-sm self-center">
                    Ready to record your practice session
                  </span>
                </div>
              )}

              {status === ProgressStatus.COMPLETED && (
                <div className="text-green-400 font-medium">
                  ✓ Lesson completed! You can continue practicing or move to the next lesson.
                </div>
              )}
            </div>
          </div>

          {canPractice && (
            <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700 mb-8">
              <h3 className="text-xl font-semibold mb-4">Record Your Performance</h3>
              <MeasurementForm lessonId={lesson.id} />
            </div>
          )}

          {progress && (
            <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700 mb-8">
              <h3 className="text-xl font-semibold mb-4">Your Progress</h3>
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{progress.attempts}</div>
                  <div className="text-sm text-slate-400">Attempts</div>
                </div>
                {progress.bestScore && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{progress.bestScore}%</div>
                    <div className="text-sm text-slate-400">Best Score</div>
                  </div>
                )}
                {progress.lastScore && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">{progress.lastScore}%</div>
                    <div className="text-sm text-slate-400">Last Score</div>
                  </div>
                )}
                {lesson.minimumScore && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">{lesson.minimumScore}%</div>
                    <div className="text-sm text-slate-400">Target</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {lesson.measurements.length > 0 && (
            <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
              <h3 className="text-xl font-semibold mb-4">Measurement History</h3>
              <div className="space-y-3">
                {lesson.measurements.slice(0, 10).map((measurement) => (
                  <div key={measurement.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-300">
                        {new Date(measurement.recordedAt).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-slate-400">
                        {measurement.type.replace('_', ' ').toLowerCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {measurement.value}{measurement.unit}
                      </span>
                      {measurement.notes && (
                        <span className="text-sm text-slate-400">
                          - {measurement.notes}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}