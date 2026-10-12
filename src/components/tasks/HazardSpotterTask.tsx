import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, BookOpen, ArrowRight } from 'lucide-react';
import { HazardSpotterTaskData, HazardItem } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface HazardSpotterTaskProps {
  task: HazardSpotterTaskData;
  onComplete: (score: number) => void;
  difficulty: 'rookie' | 'pro';
}

export const HazardSpotterTask: React.FC<HazardSpotterTaskProps> = ({
  task,
  onComplete,
  difficulty: _difficulty
}) => {
  const [activeHazardId, setActiveHazardId] = useState<string>(task.hazards[0].id);
  const [resolvedHazards, setResolvedHazards] = useState<string[]>([]);
  const [selectedActionIndex, setSelectedActionIndex] = useState<Record<string, number>>({});

  const activeHazard = task.hazards.find(h => h.id === activeHazardId) || task.hazards[0];

  const handleResolve = (hazard: HazardItem) => {
    soundManager.playSuccess();
    const next = [...resolvedHazards, hazard.id];
    setResolvedHazards(next);

    if (next.length === task.hazards.length) {
      setTimeout(() => {
        onComplete(task.points);
      }, 1200);
    } else {
      // Advance to next unresolved
      const nextUnresolved = task.hazards.find(h => !next.includes(h.id));
      if (nextUnresolved) {
        setActiveHazardId(nextUnresolved.id);
      }
    }
  };

  const isAllResolved = resolvedHazards.length === task.hazards.length;

  return (
    <div className="space-y-6">
      {/* Task Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950 p-4 rounded-xl border border-zinc-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4" />
            <span>Kitchen Safety & Mattilsynet Standards</span>
          </span>
          <p className="text-xs text-zinc-300 mt-1">
            {task.instructions}
          </p>
        </div>

        <div className="text-xs font-bold text-zinc-400 tabular-nums shrink-0">
          Hazards Corrected: <span className="text-emerald-400">{resolvedHazards.length}</span> / {task.hazards.length}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Station Hazard List */}
        <div className="lg:col-span-5 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 px-1">
            Hazard Inspection Points
          </h4>

          <div className="space-y-2.5">
            {task.hazards.map((hazard, index) => {
              const isResolved = resolvedHazards.includes(hazard.id);
              const isSelected = activeHazardId === hazard.id;

              return (
                <div
                  key={hazard.id}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveHazardId(hazard.id);
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isResolved
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                      : isSelected
                      ? 'bg-red-950/30 border-red-500 text-white ring-2 ring-red-500/30'
                      : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-400">
                        Point {index + 1}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {hazard.locationDescription}
                      </span>
                    </div>
                    <h5 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      {hazard.title}
                    </h5>
                  </div>

                  <div>
                    {isResolved ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Hazard Analysis & Corrective SOP */}
        <div className="lg:col-span-7">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
            
            {/* Header */}
            <div className="border-b border-zinc-800 pb-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                  {activeHazard.locationDescription}
                </span>
                {resolvedHazards.includes(activeHazard.id) && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Hazard Corrected</span>
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                {activeHazard.title}
              </h3>
            </div>

            {/* Danger Description */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/30 text-xs text-red-200">
                <strong className="block text-red-300 font-bold mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Biological / Physical Risk:</span>
                </strong>
                <p className="leading-relaxed">{activeHazard.danger}</p>
              </div>

              {/* Norwegian Food Safety Authority Rule */}
              <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
                <strong className="block text-amber-300 font-bold mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Mattilsynet & Hygiene Guideline:</span>
                </strong>
                <p className="leading-relaxed">{activeHazard.mattilsynetRule}</p>
              </div>

              {/* Corrective SOP */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-200">
                <strong className="block text-emerald-400 font-bold mb-1">
                  Required Corrective SOP:
                </strong>
                <p className="leading-relaxed font-medium text-emerald-200">
                  {activeHazard.correctAction}
                </p>
                <p className="text-[11px] text-zinc-400 italic mt-2 border-t border-zinc-800 pt-2">
                  Why this matters: {activeHazard.whyItMatters}
                </p>
              </div>
            </div>

            {/* Action Resolution Button */}
            <div className="pt-2 flex justify-end">
              {resolvedHazards.includes(activeHazard.id) ? (
                <div className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>SOP Applied & Verified</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleResolve(activeHazard)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold rounded-xl shadow-md flex items-center gap-2 transition-all transform active:scale-95"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Apply Corrective Action</span>
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Completion Banner */}
      {isAllResolved && (
        <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 flex items-center justify-between gap-4 animate-in fade-in">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              <span>Inspection Passed! All Kitchen Hazards Neutralized</span>
            </h4>
            <p className="text-xs text-emerald-300 mt-1">
              +{task.points} XP awarded for food safety and Mattilsynet vigilance.
            </p>
          </div>

          <button
            onClick={() => onComplete(task.points)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold rounded-lg shadow flex items-center gap-1.5 transition-all"
          >
            <span>Proceed to Next Task</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
