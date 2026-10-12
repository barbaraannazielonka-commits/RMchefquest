import React, { useState } from 'react';
import { Award, Star, CheckCircle, ArrowRight, MessageSquareQuote } from 'lucide-react';
import { LevelData, PlayerProfile } from '../types/game';
import { soundManager } from '../utils/audio';

interface LevelReflectionModalProps {
  level: LevelData;
  player: PlayerProfile;
  isOpen: boolean;
  onSaveAndContinue: (answers: { answer1: string; answer2: string; answer3: string }) => void;
}

export const LevelReflectionModal: React.FC<LevelReflectionModalProps> = ({
  level,
  player: _player,
  isOpen,
  onSaveAndContinue
}) => {
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    onSaveAndContinue({
      answer1: ans1.trim() || 'Reviewed key vocabulary and technique.',
      answer2: ans2.trim() || 'Balancing speed with food safety principles.',
      answer3: ans3.trim() || 'Clear English team communication at the pass.'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
        
        {/* Celebration Header & Badge Award */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
              {[1, 2, 3].map(s => (
                <Star key={s} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              Station {level.id} Cleared!
            </h3>
            <p className="text-xs text-amber-300 font-semibold mt-0.5">
              Badge Unlocked: {level.badgeAwarded.title}
            </p>
          </div>

          <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed">
            {level.badgeAwarded.description}
          </p>
        </div>

        {/* Reflection Form */}
        <form onSubmit={handleSubmit} className="space-y-4 border-t border-zinc-800 pt-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
            <MessageSquareQuote className="w-4 h-4 text-amber-400" />
            <span>Chef Reflection & English Journal</span>
          </div>

          <div className="space-y-3 text-left">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                1. {level.reflection.q1}
              </label>
              <input
                type="text"
                value={ans1}
                onChange={(e) => setAns1(e.target.value)}
                placeholder="e.g. Learned terms like chinois and mandoline..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                2. {level.reflection.q2}
              </label>
              <input
                type="text"
                value={ans2}
                onChange={(e) => setAns2(e.target.value)}
                placeholder="e.g. Prioritizing safety before rushing..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1">
                3. {level.reflection.q3}
              </label>
              <input
                type="text"
                value={ans3}
                onChange={(e) => setAns3(e.target.value)}
                placeholder="e.g. 'Behind, hot pan!' and polite allergen verification..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-98"
            >
              <span>Save to Dossier & Return to Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
