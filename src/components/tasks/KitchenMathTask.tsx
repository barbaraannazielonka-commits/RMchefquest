import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { KitchenMathTaskData } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface KitchenMathTaskProps {
  task: KitchenMathTaskData;
  onComplete: (score: number) => void;
  difficulty: 'rookie' | 'pro';
}

export const KitchenMathTask: React.FC<KitchenMathTaskProps> = ({
  task,
  onComplete,
  difficulty
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submittedStatus, setSubmittedStatus] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const handleInputChange = (problemId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [problemId]: val }));
    // Reset submitted state for this problem when typing
    if (submittedStatus[problemId] !== undefined) {
      setSubmittedStatus(prev => {
        const copy = { ...prev };
        delete copy[problemId];
        return copy;
      });
    }
  };

  const handleCheckProblem = (problemId: string) => {
    soundManager.playClick();
    const problem = task.problems.find(p => p.id === problemId);
    if (!problem) return;

    const userNum = parseFloat(answers[problemId]?.replace(',', '.'));
    if (isNaN(userNum)) {
      soundManager.playError();
      return;
    }

    const tolerance = problem.tolerance || 0.05;
    const isCorrect = Math.abs(userNum - problem.correctAnswer) <= tolerance;

    if (isCorrect) {
      soundManager.playSuccess();
      setSubmittedStatus(prev => ({ ...prev, [problemId]: true }));
    } else {
      soundManager.playError();
      setSubmittedStatus(prev => ({ ...prev, [problemId]: false }));
    }
  };

  const allProblemsCorrect = task.problems.every(p => submittedStatus[p.id] === true);

  return (
    <div className="space-y-6">
      {/* Task Top Banner */}
      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            <span>Kitchen Math & Yield Precision</span>
          </span>
          <p className="text-xs text-zinc-300 mt-1">
            {task.recipeTitle} · {task.instructions}
          </p>
        </div>

        <div className="text-xs font-bold text-zinc-400 tabular-nums shrink-0">
          Correct: <span className="text-emerald-400">
            {Object.values(submittedStatus).filter(Boolean).length}
          </span> / {task.problems.length}
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        {task.problems.map((problem, index) => {
          const isSubmitted = submittedStatus[problem.id] !== undefined;
          const isCorrect = submittedStatus[problem.id] === true;
          const showHint = revealedHints[problem.id] || difficulty === 'rookie';

          return (
            <div
              key={problem.id}
              className={`p-5 rounded-2xl border transition-all ${
                isCorrect
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                  : isSubmitted && !isCorrect
                  ? 'bg-red-950/20 border-red-500/30'
                  : 'bg-zinc-900 border-zinc-800'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-zinc-950 border border-zinc-800 flex items-center justify-center text-xs font-bold text-amber-400">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Problem {index + 1}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setRevealedHints(prev => ({ ...prev, [problem.id]: !prev[problem.id] }));
                  }}
                  className="text-xs text-zinc-400 hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Hide Formula' : 'Formula Hint'}</span>
                </button>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-zinc-400">
                  {problem.scenario}
                </p>
                <h5 className="text-sm font-bold text-white">
                  {problem.question}
                </h5>
              </div>

              {/* Formula Hint if revealed */}
              {showHint && (
                <div className="mt-3 p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-xs text-amber-300">
                  <span className="font-semibold">Calculation Guide:</span> {problem.hint}
                </div>
              )}

              {/* Interactive Input Form */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex flex-wrap items-center gap-3">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="e.g. 2.4"
                    value={answers[problem.id] || ''}
                    onChange={(e) => handleInputChange(problem.id, e.target.value)}
                    disabled={isCorrect}
                    className="w-32 px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 tabular-nums disabled:opacity-60"
                  />
                  <span className="ml-2 text-xs font-bold text-zinc-400">
                    {problem.unit}
                  </span>
                </div>

                {!isCorrect ? (
                  <button
                    type="button"
                    onClick={() => handleCheckProblem(problem.id)}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-lg transition-colors"
                  >
                    Check Answer
                  </button>
                ) : (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Exact!</span>
                  </span>
                )}
              </div>

              {/* Explanation on verification */}
              {isSubmitted && (
                <div className={`mt-3 text-xs p-3 rounded-lg flex items-start gap-2 ${
                  isCorrect
                    ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                    : 'bg-red-950/40 text-red-300 border border-red-500/30'
                }`}>
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{problem.explanation}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {allProblemsCorrect && (
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 flex items-center justify-between gap-4 animate-in fade-in">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Kitchen Math Certified! Zero Ingredient Waste</span>
            </h4>
            <p className="text-xs text-emerald-300 mt-1">
              +{task.points} XP earned for mathematical accuracy and portion control.
            </p>
          </div>

          <button
            onClick={() => onComplete(task.points)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-all"
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
