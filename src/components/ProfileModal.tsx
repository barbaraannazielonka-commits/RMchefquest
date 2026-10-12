import React, { useState } from 'react';
import { X, Award, RotateCcw, User, Star, ShieldCheck, BookOpen, AlertTriangle } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { LEVELS_DATA } from '../data/levelsData';
import { soundManager } from '../utils/audio';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerProfile;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerProfile>>;
  onResetProgress: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  player,
  setPlayer,
  onResetProgress
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [nameInput, setNameInput] = useState(player.name || '');
  const [nameSavedNotice, setNameSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleDifficultyChange = (diff: 'rookie' | 'pro') => {
    soundManager.playClick();
    setPlayer(prev => ({ ...prev, difficulty: diff }));
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    setPlayer(prev => ({ ...prev, name: nameInput.trim() || 'Apprentice' }));
    setNameSavedNotice(true);
    setTimeout(() => setNameSavedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Chef Dossier & Academy Records
              </h3>
              <p className="text-xs text-zinc-400">
                {player.name || 'Apprentice'} · Restaurant- og matfag
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Chef Name Editor */}
          <form onSubmit={handleSaveName} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="editChefName" className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Chef Name
              </label>
              {nameSavedNotice && (
                <span className="text-xs font-bold text-emerald-400">
                  ✓ Name updated successfully!
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                id="editChefName"
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter new chef name..."
                className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold rounded-lg transition-colors shrink-0"
              >
                Save Name
              </button>
            </div>
          </form>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
              <span className="block text-2xl font-extrabold text-amber-400 tabular-nums">
                {player.totalScore}
              </span>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Total XP
              </span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
              <span className="block text-2xl font-extrabold text-emerald-400 tabular-nums">
                {player.completedLevels.length} / 7
              </span>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Stations Cleared
              </span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center">
              <span className="block text-2xl font-extrabold text-purple-400 tabular-nums">
                {player.badges.length}
              </span>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Badges Earned
              </span>
            </div>
          </div>

          {/* Difficulty Setting Switch */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Training Difficulty
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Switch anytime without resetting your progression.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDifficultyChange('rookie')}
                className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                  player.difficulty === 'rookie'
                    ? 'bg-amber-500/10 border-amber-500 text-white font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <span>Rookie Chef (A2–B1)</span>
                <p className="text-[10px] text-zinc-400 font-normal mt-0.5">Scaffolded hints & translations</p>
              </button>

              <button
                type="button"
                onClick={() => handleDifficultyChange('pro')}
                className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                  player.difficulty === 'pro'
                    ? 'bg-amber-500/10 border-amber-500 text-white font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <span>Pro Chef (B1–B2)</span>
                <p className="text-[10px] text-zinc-400 font-normal mt-0.5">Authentic rush scenarios</p>
              </button>
            </div>
          </div>

          {/* Theme Display Switch */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                Display Theme
              </h4>
              <p className="text-[11px] text-zinc-400">
                Choose between kitchen dark mode or bright culinary studio light mode.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setPlayer(prev => ({ ...prev, theme: 'dark' }));
                }}
                className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                  player.theme === 'dark'
                    ? 'bg-amber-500/10 border-amber-500 text-white font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <span>🌙 Dark Charcoal Kitchen</span>
                <p className="text-[10px] text-zinc-400 font-normal mt-0.5">Deep contrast restaurant atmosphere</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setPlayer(prev => ({ ...prev, theme: 'light' }));
                }}
                className={`p-3 rounded-lg border text-left text-xs transition-colors ${
                  player.theme === 'light'
                    ? 'bg-amber-500/10 border-amber-500 text-white font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                }`}
              >
                <span>☀️ Daylight Culinary Studio</span>
                <p className="text-[10px] text-zinc-400 font-normal mt-0.5">High-contrast bright classroom mode</p>
              </button>
            </div>
          </div>

          {/* Unlocked Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Station Badges
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {LEVELS_DATA.map((lvl) => {
                const isEarned = player.completedLevels.includes(lvl.id);
                const badge = lvl.badgeAwarded;

                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                      isEarned
                        ? 'bg-zinc-950 border-emerald-500/40 text-zinc-200'
                        : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-600 opacity-60'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isEarned ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'bg-zinc-900 text-zinc-700'
                    }`}>
                      <Award className="w-4 h-4" />
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-xs font-bold block text-white">
                        {badge.title}
                      </span>
                      <p className="text-[11px] text-zinc-400 leading-snug">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reset Game Section */}
          <div className="pt-4 border-t border-zinc-800">
            {!showConfirmReset ? (
              <button
                type="button"
                onClick={() => setShowConfirmReset(true)}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset game progress & start over</span>
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-red-300">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Are you sure you want to reset all game data?</span>
                </div>
                <p className="text-xs text-zinc-300">
                  This will reset all cleared stations, XP points, and unlocked badges on this browser.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowConfirmReset(false);
                      onResetProgress();
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
                  >
                    Yes, Reset Progress
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmReset(false)}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
