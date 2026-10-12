import React, { useState } from 'react';
import { Volume2, CheckCircle, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { MatchingTaskData } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface MatchingTaskProps {
  task: MatchingTaskData;
  onComplete: (score: number) => void;
  difficulty: 'rookie' | 'pro';
}

export const MatchingTask: React.FC<MatchingTaskProps> = ({
  task,
  onComplete,
  difficulty
}) => {
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [showNorwegianHints, setShowNorwegianHints] = useState<boolean>(difficulty === 'rookie');

  // Shuffle definitions once
  const [shuffledDefinitions] = useState(() => {
    return [...task.items].sort(() => Math.random() - 0.5);
  });

  const handleSelectTerm = (id: string) => {
    soundManager.playClick();
    if (matchedPairs.includes(id)) return;
    setSelectedTermId(id);
    setErrorFeedback(null);

    // Speak term in English
    const item = task.items.find(i => i.id === id);
    if (item) {
      soundManager.speak(item.term);
    }
  };

  const handleSelectDefinition = (defItemId: string) => {
    if (!selectedTermId) {
      setErrorFeedback('Please select a kitchen term on the left first!');
      return;
    }

    if (matchedPairs.includes(defItemId)) return;

    if (selectedTermId === defItemId) {
      // Correct match!
      soundManager.playSuccess();
      const nextMatched = [...matchedPairs, selectedTermId];
      setMatchedPairs(nextMatched);
      setSelectedTermId(null);
      setErrorFeedback(null);

      if (nextMatched.length === task.items.length) {
        setTimeout(() => {
          onComplete(task.points);
        }, 1200);
      }
    } else {
      // Incorrect match
      soundManager.playError();
      const termItem = task.items.find(i => i.id === selectedTermId);
      const defItem = task.items.find(i => i.id === defItemId);
      setErrorFeedback(
        `Not quite! "${termItem?.term}" does not match that function. ${
          difficulty === 'rookie' ? `Hint: Check the Norwegian translation (${termItem?.norwegian}).` : 'Try again!'
        }`
      );
    }
  };

  const isAllComplete = matchedPairs.length === task.items.length;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            {task.subtitle}
          </div>
          <p className="text-xs text-zinc-300 mt-1">
            {task.instructions}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              setShowNorwegianHints(!showNorwegianHints);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              showNorwegianHints
                ? 'bg-amber-500/10 border-amber-500/50 text-amber-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showNorwegianHints ? 'Hide Norsk Hints' : 'Show Norsk Hints'}</span>
          </button>

          <div className="text-xs font-bold text-zinc-400 tabular-nums">
            Matched: <span className="text-amber-400">{matchedPairs.length}</span> / {task.items.length}
          </div>
        </div>
      </div>

      {/* Error feedback banner */}
      {errorFeedback && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorFeedback}</span>
        </div>
      )}

      {/* Matching Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Column: English Terms */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
            Step 1: Select Kitchen Term
          </h4>
          <div className="space-y-2.5">
            {task.items.map((item) => {
              const isMatched = matchedPairs.includes(item.id);
              const isSelected = selectedTermId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectTerm(item.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isMatched
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 cursor-default'
                      : isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-white ring-2 ring-amber-500/40 shadow-lg'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:bg-zinc-850'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{item.term}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundManager.speak(item.term);
                        }}
                        title="Listen to English pronunciation"
                        className="p-1 hover:text-amber-400 text-zinc-400 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {showNorwegianHints && (
                      <p className="text-xs text-amber-400/80 mt-0.5 font-medium">
                        Norsk: {item.norwegian}
                      </p>
                    )}
                  </div>

                  <div>
                    {isMatched ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <div className={`w-3 h-3 rounded-full border ${isSelected ? 'bg-amber-500 border-amber-400' : 'border-zinc-700'}`} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Definitions & Functions */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
            Step 2: Match Function / Definition
          </h4>
          <div className="space-y-2.5">
            {shuffledDefinitions.map((item) => {
              const isMatched = matchedPairs.includes(item.id);

              return (
                <div
                  key={`def-${item.id}`}
                  onClick={() => handleSelectDefinition(item.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    isMatched
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300 cursor-default opacity-80'
                      : selectedTermId
                      ? 'bg-zinc-900 border-zinc-700 hover:border-amber-400/80 hover:bg-zinc-850 text-zinc-200'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-amber-400/90 uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                      {item.definition}
                    </p>
                  </div>

                  <div>
                    {isMatched && (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Completion Banner */}
      {isAllComplete && (
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 flex items-center justify-between gap-4 animate-in fade-in">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Matching Complete! Excellent Kitchen Vocabulary</span>
            </h4>
            <p className="text-xs text-emerald-300 mt-1">
              +{task.points} XP earned. Ready for the next station task!
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
