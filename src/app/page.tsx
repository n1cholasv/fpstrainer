import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Image 
              src="/icon.svg" 
              alt="FPS Trainer Logo" 
              width={48} 
              height={48}
              className="inline-block"
            />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              FPS Trainer
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Master your FPS skills through deliberate practice and precise measurement. 
            Track your progress across essential gaming fundamentals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
            <div className="mb-6">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                🎯
              </div>
              <h2 className="text-2xl font-semibold mb-3">Structured Training</h2>
              <p className="text-slate-300">
                Five carefully designed lessons focusing on core FPS mechanics: 
                crosshair placement, tracking, flick shots, target switching, and reaction time.
              </p>
            </div>
            <Link 
              href="/lessons"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start Training
            </Link>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
            <div className="mb-6">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                📊
              </div>
              <h2 className="text-2xl font-semibold mb-3">Track Progress</h2>
              <p className="text-slate-300">
                Measure your improvement with detailed metrics and performance tracking. 
                Each lesson requires meeting specific benchmarks before progression.
              </p>
            </div>
            <Link 
              href="/progress"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              View Progress
            </Link>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">Why Deliberate Practice?</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-3">🎮</div>
              <h4 className="font-medium mb-2">Game-Specific Skills</h4>
              <p className="text-sm text-slate-400">
                Focus on mechanics that directly translate to better FPS performance
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📈</div>
              <h4 className="font-medium mb-2">Measurable Progress</h4>
              <p className="text-sm text-slate-400">
                Track concrete metrics to see real improvement over time
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-medium mb-2">Structured Advancement</h4>
              <p className="text-sm text-slate-400">
                Progress through lessons only after mastering prerequisites
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
