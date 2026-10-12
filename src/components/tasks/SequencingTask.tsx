import React, { useState } from 'react';
import { ArrowUp, ArrowDown, CheckCircle2, AlertCircle, Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { SequencingTaskData } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface SequencingTaskProps {
  task: SequencingTaskData;
  onComplete: (score: number) => void;
  difficulty: 'rookie' | 'pro';
}

export const SequencingTask: React.FC<SequencingTaskProps> = ({
  task,
  onComplete,
  difficulty
}) => {
  // Start with scrambled steps
  const [currentSteps, setCurrentSteps] = useState(() => {
    const scrambled = [...task.steps];
    // Deterministic shuffle that differs from target order
    return scrambled.reverse();
  });

  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<boolean>(difficulty === 'rookie');

  const moveStep = (index: number, direction: 'up' | 'down') => {
    soundManager.playClick();
    const newSteps = [...currentSteps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSteps.length) return;

    const temp = newSteps[index];
    newSteps[index] = newSteps[targetIndex];
    newSteps[targetIndex] = temp;

    setCurrentSteps(newSteps);
    setHasChecked(false);
    setIsCorrect(false);
    setFeedbackMessage(null);
  };

  const handleVerify = () => {
    soundManager.playClick();
    const isOrderCorrect = currentSteps.every((step, idx) => step.order === idx + 1);
    setHasChecked(true);

    if (isOrderCorrect) {
      soundManager.playSuccess();
      setIsCorrect(true);
      setFeedbackMessage(
        'Flawless culinary timing! Mise en place, prep, cooking, and resting are aligned in logical sequence.'
      );
      setTimeout(() => {
        onComplete(task.points);
      }, 1500);
    } else {
      soundManager.playError();
      setIsCorrect(false);
      // Find first misplaced step
      const firstErrorIdx = currentSteps.findIndex((s, idx) => s.order !== idx + 1);
      const misplaced = currentSteps[firstErrorIdx];
      setFeedbackMessage(
        `Step ${firstErrorIdx + 1} is out of order. Consider: should you "${misplaced.verb}" before or after earlier prep steps? ${
          task.norwegianHint ? `Hint: ${task.norwegianHint}` : ''
        }`
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Recipe Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            {task.recipeName}
          </span>
          <p className="text-xs text-zinc-300 mt-1">
            {task.instructions}
          </p>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            setShowHint(!showHint);
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 shrink-0"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showHint ? 'Hide Hint' : 'Show Chef Hint'}</span>
        </button>
      </div>

      {showHint && task.norwegianHint && (
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="block text-amber-300 mb-0.5">Chef's Guidance:</strong>
            {task.norwegianHint}
          </div>
        </div>
      )}

      {/* Steps List */}
      <div className="space-y-3">
        {currentSteps.map((step, index) => {
          const isThisStepCorrect = hasChecked && step.order === index + 1;
          const isThisStepWrong = hasChecked && step.order !== index + 1;

          return (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all flex items-start gap-4 ${
                isThisStepCorrect
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                  : isThisStepWrong
                  ? 'bg-red-950/20 border-red-500/30 text-red-200'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-200'
              }`}
            >
              {/* Order Number Badge */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <span className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-sm font-bold text-amber-400 tabular-nums">
                  {index + 1}
                </span>
                <span className="text-[10px] text-zinc-400 uppercase mt-1">Step</span>
              </div>

              {/* Step Details */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-zinc-800 text-amber-300 border border-zinc-700">
                    {step.verb}
                  </span>
                  <button
                    type="button"
                    onClick={() => soundManager.speak(step.text)}
                    title="Listen to step in English"
                    className="p-1 text-zinc-400 hover:text-amber-400 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed pt-1">
                  {step.text}
                </p>

                {hasChecked && (
                  <p className="text-xs text-zinc-400 italic pt-1 border-t border-zinc-800/60 mt-2">
                    💡 Culinary reason: {step.culinaryReason}
                  </p>
                )}
              </div>

              {/* Up / Down Controls */}
              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => moveStep(index, 'up')}
                  disabled={index === 0 || isCorrect}
                  className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move step up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveStep(index, 'down')}
                  disabled={index === currentSteps.length - 1 || isCorrect}
                  className="p-1.5 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  title="Move step down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feedback Banner */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${
            isCorrect
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-red-950/40 border-red-500/40 text-red-200'
          }`}
        >
          {isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={handleVerify}
          disabled={isCorrect}
          className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 shadow-md transition-all disabled:opacity-50"
        >
          Verify Cooking Sequence
        </button>
      </div>
    </div>
  );
};
