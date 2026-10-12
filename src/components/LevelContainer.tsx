import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Star, Award, Compass } from 'lucide-react';
import { LevelData, PlayerProfile } from '../types/game';
import { MatchingTask } from './tasks/MatchingTask';
import { SequencingTask } from './tasks/SequencingTask';
import { HazardSpotterTask } from './tasks/HazardSpotterTask';
import { DialogueTask } from './tasks/DialogueTask';
import { KitchenMathTask } from './tasks/KitchenMathTask';
import { HeadChefFinalMission } from './tasks/HeadChefFinalMission';
import { soundManager } from '../utils/audio';

interface LevelContainerProps {
  level: LevelData;
  player: PlayerProfile;
  onTaskCompleted: (levelId: number, taskId: string, pointsEarned: number) => void;
  onLevelFinished: (levelId: number) => void;
  onBackToMap: () => void;
}

export const LevelContainer: React.FC<LevelContainerProps> = ({
  level,
  player,
  onTaskCompleted,
  onLevelFinished,
  onBackToMap
}) => {
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  const currentTask = level.tasks[activeTaskIndex];
  const isLastTask = activeTaskIndex === level.tasks.length - 1;
  const isLevelCompletedBefore = player.completedLevels.includes(level.id);

  const handleTaskDone = (points: number) => {
    soundManager.playSuccess();
    const taskId = currentTask.id;
    if (!completedTaskIds.includes(taskId)) {
      setCompletedTaskIds(prev => [...prev, taskId]);
      onTaskCompleted(level.id, taskId, points);
    }

    if (isLastTask) {
      // Level fully finished!
      onLevelFinished(level.id);
    } else {
      setActiveTaskIndex(prev => prev + 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Navigation & Level Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToMap();
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to World Map</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Station {level.id} of 7</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-amber-400">{level.country}</span>
          </div>
        </div>

        {/* Level Banner Card */}
        <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
          <div className="h-44 sm:h-52 w-full relative">
            <img
              src={level.image}
              alt={level.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                  <span>{level.flag}</span>
                  <span>{level.location}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {level.title}
                </h1>
                <p className="text-xs text-zinc-300 italic">
                  {level.norwegianTitle}
                </p>
              </div>

              {/* Awarded Badge Preview */}
              <div className="hidden md:flex items-center gap-2.5 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-zinc-800 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-zinc-400">Target Badge</span>
                  <span className="text-xs font-bold text-white">{level.badgeAwarded.title}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-zinc-950/80 border-t border-zinc-800/80 text-xs text-zinc-300 leading-relaxed">
            {level.storyContext}
          </div>
        </div>
      </div>

      {/* Task Tabs */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {level.tasks.map((t, idx) => {
            const isCompleted = completedTaskIds.includes(t.id) || (isLevelCompletedBefore && idx <= activeTaskIndex);
            const isActive = idx === activeTaskIndex;

            return (
              <button
                key={t.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTaskIndex(idx);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-amber-500 text-zinc-950 shadow-md ring-2 ring-amber-500/40'
                    : isCompleted
                    ? 'bg-zinc-900 border border-emerald-500/30 text-emerald-300 hover:bg-zinc-850'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full bg-zinc-950 flex items-center justify-center text-[10px] text-zinc-400">
                    {idx + 1}
                  </span>
                )}
                <span>Task {idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Task Title & Points */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">
              {currentTask.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              {currentTask.subtitle}
            </p>
          </div>

          <div className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30 tabular-nums shrink-0">
            +{currentTask.points} XP
          </div>
        </div>

        {/* Active Task Render */}
        <div className="pt-2">
          {currentTask.type === 'matching' && (
            <MatchingTask
              task={currentTask as any}
              onComplete={handleTaskDone}
              difficulty={player.difficulty}
            />
          )}

          {currentTask.type === 'sequencing' && (
            <SequencingTask
              task={currentTask as any}
              onComplete={handleTaskDone}
              difficulty={player.difficulty}
            />
          )}

          {currentTask.type === 'hazard_spotter' && (
            <HazardSpotterTask
              task={currentTask as any}
              onComplete={handleTaskDone}
              difficulty={player.difficulty}
            />
          )}

          {currentTask.type === 'dialogue' && (
            <DialogueTask
              task={currentTask as any}
              onComplete={handleTaskDone}
              difficulty={player.difficulty}
            />
          )}

          {currentTask.type === 'kitchen_math' && (
            <KitchenMathTask
              task={currentTask as any}
              onComplete={handleTaskDone}
              difficulty={player.difficulty}
            />
          )}

          {currentTask.type === 'head_chef_grand_challenge' && (
            <HeadChefFinalMission
              onComplete={handleTaskDone}
              difficulty={player.difficulty}
              playerName={player.name}
            />
          )}
        </div>
      </div>

    </div>
  );
};
