import React from 'react';
import { CheckCircle2, Lock, Star, ChevronRight, Award, Compass, Play } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { LEVELS_DATA } from '../data/levelsData';
import { soundManager } from '../utils/audio';

interface WorldMapProps {
  player: PlayerProfile;
  onSelectLevel: (levelId: number) => void;
  onViewCertificate: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  player,
  onSelectLevel,
  onViewCertificate
}) => {
  const allCompleted = LEVELS_DATA.every(lvl => player.completedLevels.includes(lvl.id));
  const progressPercent = Math.round((player.completedLevels.length / LEVELS_DATA.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Banner: Academy Progress */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <Compass className="w-4 h-4" />
              <span>Global Kitchen Academy · Expedition Map</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome, {player.name}
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Complete each culinary station in sequence to unlock international kitchens, earn specialist badges, and graduate as an International Head Chef.
            </p>
          </div>

          <div className="flex items-center gap-6 bg-zinc-950 p-4 rounded-xl border border-zinc-800 shrink-0">
            <div className="text-center">
              <span className="block text-2xl font-extrabold text-amber-400 tabular-nums">
                {player.totalScore}
              </span>
              <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Total XP
              </span>
            </div>
            <div className="h-8 w-px bg-zinc-800" />
            <div className="text-center">
              <span className="block text-2xl font-extrabold text-emerald-400 tabular-nums">
                {player.completedLevels.length} / {LEVELS_DATA.length}
              </span>
              <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider">
                Levels Cleared
              </span>
            </div>
            {allCompleted && (
              <>
                <div className="h-8 w-px bg-zinc-800" />
                <button
                  onClick={() => {
                    soundManager.playSuccess();
                    onViewCertificate();
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 text-xs font-bold rounded-lg shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>View Diploma</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-medium">
            <span>Academy Graduation Progress</span>
            <span className="text-amber-400 font-bold tabular-nums">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-zinc-950 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Levels Pathway Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span>The 7 Culinary Stations</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEVELS_DATA.map((lvl, index) => {
            const isCompleted = player.completedLevels.includes(lvl.id);
            const isUnlocked = lvl.id <= player.unlockedLevel;
            const stars = player.levelStars[lvl.id] || (isCompleted ? 3 : 0);

            return (
              <div
                key={lvl.id}
                className={`relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
                  isCompleted
                    ? 'bg-zinc-900/90 border-emerald-500/30 hover:border-emerald-500/60 shadow-lg'
                    : isUnlocked
                    ? 'bg-zinc-900/95 border-amber-500/50 hover:border-amber-500 ring-1 ring-amber-500/20 shadow-xl'
                    : 'bg-zinc-950/70 border-zinc-800/80 opacity-60'
                }`}
              >
                {/* Visual Level Image Header */}
                <div className="relative h-40 w-full overflow-hidden bg-zinc-950">
                  <img
                    src={lvl.image}
                    alt={lvl.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      !isUnlocked ? 'filter grayscale brightness-50' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />

                  {/* Top badges on image */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-white border border-white/10">
                    <span>{lvl.flag}</span>
                    <span>Level {lvl.id}</span>
                  </div>

                  <div className="absolute top-3 right-3">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 bg-emerald-500/90 text-zinc-950 font-bold px-2 py-0.5 rounded text-[11px] shadow">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Cleared</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="flex items-center gap-1 bg-amber-500 text-zinc-950 font-bold px-2 py-0.5 rounded text-[11px] shadow animate-pulse">
                        <Play className="w-3 h-3 fill-current" />
                        <span>Ready</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 bg-zinc-800 text-zinc-400 font-medium px-2 py-0.5 rounded text-[11px]">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs text-amber-400/90 font-medium mb-1">
                      {lvl.location}
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {lvl.title}
                    </h4>
                    <p className="text-xs text-zinc-400 italic mt-0.5">
                      {lvl.norwegianTitle}
                    </p>
                    <p className="text-xs text-zinc-300 mt-2.5 line-clamp-2 leading-relaxed">
                      {lvl.summary}
                    </p>
                  </div>

                  {/* Stars & Action Button */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map((starIdx) => (
                        <Star
                          key={starIdx}
                          className={`w-3.5 h-3.5 ${
                            starIdx <= stars
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-zinc-700'
                          }`}
                        />
                      ))}
                    </div>

                    {isUnlocked ? (
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onSelectLevel(lvl.id);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                          isCompleted
                            ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                            : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-md'
                        }`}
                      >
                        <span>{isCompleted ? 'Replay' : 'Enter Station'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[11px] text-zinc-600 font-medium flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>Requires Lvl {lvl.id - 1}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
