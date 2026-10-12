import React, { useState } from 'react';
import { Volume2, MessageSquare, CheckCircle2, AlertCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { DialogueTaskData } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface DialogueTaskProps {
  task: DialogueTaskData;
  onComplete: (score: number) => void;
  difficulty: 'rookie' | 'pro';
}

export const DialogueTask: React.FC<DialogueTaskProps> = ({
  task,
  onComplete,
  difficulty: _difficulty
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const selectedOption = task.options.find(o => o.id === selectedOptionId);

  const handleSelectOption = (id: string) => {
    if (hasSubmitted && selectedOption?.isOptimal) return;
    soundManager.playClick();
    setSelectedOptionId(id);
    setHasSubmitted(false);
  };

  const handleSubmit = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);

    if (selectedOption.isOptimal) {
      soundManager.playSuccess();
    } else {
      soundManager.playError();
    }
  };

  const handleRetry = () => {
    soundManager.playClick();
    setSelectedOptionId(null);
    setHasSubmitted(false);
  };

  return (
    <div className="space-y-6">
      {/* Context Top Banner */}
      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
          <MessageSquare className="w-4 h-4" />
          <span>Workplace Dialogue Scenario</span>
        </div>
        <p className="text-xs text-zinc-300">
          {task.context}
        </p>
      </div>

      {/* Dialogue Bubble: Colleague or Customer Speaking */}
      <div className="space-y-4">
        {task.initialDialogue.map((msg, idx) => (
          <div key={idx} className="flex items-start gap-3 bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">
              {msg.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">
                  {msg.name} ({msg.speaker})
                </span>
                <button
                  type="button"
                  onClick={() => soundManager.speak(msg.text)}
                  className="flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-400 transition-colors"
                  title="Listen in English"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Listen</span>
                </button>
              </div>

              <p className="text-sm sm:text-base text-zinc-100 font-medium leading-relaxed">
                "{msg.text}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Response Options */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
          Choose Your Professional English Response:
        </h4>

        <div className="space-y-3">
          {task.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isChecked = hasSubmitted && isSelected;

            return (
              <div
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isChecked && opt.isOptimal
                    ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/30'
                    : isChecked && !opt.isOptimal
                    ? 'bg-red-950/30 border-red-500 text-red-200'
                    : isSelected
                    ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500/50'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      "{opt.playerResponse}"
                    </p>
                  </div>
                  <div className="shrink-0 mt-0.5">
                    <div className={`w-4 h-4 rounded-full border ${isSelected ? 'bg-amber-500 border-amber-400' : 'border-zinc-700'}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit / Retry Action Controls */}
      {!hasSubmitted ? (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectedOptionId}
            className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 shadow-md transition-all disabled:opacity-40"
          >
            Deliver Response
          </button>
        </div>
      ) : selectedOption && (
        <div className="space-y-4 animate-in fade-in">
          {/* Reaction and Feedback box */}
          <div
            className={`p-5 rounded-2xl border ${
              selectedOption.isOptimal
                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                : 'bg-red-950/40 border-red-500/50 text-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {selectedOption.isOptimal ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              )}

              <div className="space-y-2 flex-1">
                <div className="text-xs font-bold uppercase tracking-wider">
                  {selectedOption.isOptimal ? 'Professional Hospitality Standard Achieved' : 'Miscommunication / Room for Improvement'}
                </div>

                <div className="text-xs sm:text-sm font-medium italic">
                  Their reaction: "{selectedOption.colleagueReaction}"
                </div>

                <p className="text-xs leading-relaxed text-zinc-300">
                  {selectedOption.feedback}
                </p>

                <div className="text-xs font-semibold text-amber-300 border-t border-zinc-800/80 pt-2 mt-2">
                  Key English Lesson: {selectedOption.professionalEnglishNote}
                </div>
              </div>
            </div>
          </div>

          {/* Next or Retry Button */}
          <div className="flex items-center justify-end gap-3">
            {!selectedOption.isOptimal ? (
              <button
                type="button"
                onClick={handleRetry}
                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Another Response</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onComplete(selectedOption.points)}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold rounded-xl shadow flex items-center gap-1.5 transition-all"
              >
                <span>Task Complete · Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
