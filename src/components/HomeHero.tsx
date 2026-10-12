import React, { useState } from 'react';
import { ChefHat, ArrowRight, ShieldCheck, Globe, Sparkles, Award } from 'lucide-react';
import { PlayerProfile, DifficultyMode } from '../types/game';
import { soundManager } from '../utils/audio';
import { IMAGES } from '../assets/images';

interface HomeHeroProps {
  player: PlayerProfile;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerProfile>>;
  onStartGame: () => void;
  onOpenGlossary: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  player,
  setPlayer,
  onStartGame,
  onOpenGlossary
}) => {
  const [nameInput, setNameInput] = useState(player.name || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyMode>(player.difficulty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    const finalName = nameInput.trim() || 'Chef Apprentice';
    setPlayer(prev => ({
      ...prev,
      name: finalName,
      difficulty: selectedDifficulty
    }));
    onStartGame();
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Hero Banner with measured scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={IMAGES.hero}
          alt="Modern professional culinary academy kitchen"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 filter brightness-90"
          onError={(e) => {
            // Styled CSS fallback container
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & Adventure Context */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
              <span>Restaurant- og matfag</span>
              <span aria-hidden="true">·</span>
              <span>Global Kitchen Academy</span>
              <span aria-hidden="true">·</span>
              <span>English A2–B2</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Chef Quest: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                Your Journey to an International Kitchen
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed">
              Step into the shoes of an ambitious culinary apprentice admitted to the prestigious Global Kitchen Academy.
              Master English communication, essential kitchen tools, food hygiene, international gastronomy, and rush service leadership across 7 progressive culinary stages.
            </p>

            {/* Core Competencies strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800/80">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">7 Culinary Worlds</h4>
                  <p className="text-xs text-zinc-400">Norway to Italy, Japan, Mexico, India & France</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">Hygiene & Safety</h4>
                  <p className="text-xs text-zinc-400">Mattilsynet rules, allergens & hazard control</p>
                </div>
              </div>

              <div className="flex items-start gap-3 col-span-2 sm:col-span-1">
                <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-purple-400 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200">Head Chef Diploma</h4>
                  <p className="text-xs text-zinc-400">Personalized graduation certificate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Player Profile Setup Card */}
          <div className="lg:col-span-5">
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-black/80 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-amber-400" />
                  <span>Enrol in the Academy</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Enter your chef name and choose your English training difficulty.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="chefName" className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Your Chef Name
                  </label>
                  <input
                    type="text"
                    id="chefName"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="e.g. Chef Henrik or Nora"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-sm font-medium"
                    maxLength={30}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                    Training Level (Difficulty)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedDifficulty('rookie');
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        selectedDifficulty === 'rookie'
                          ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500/50'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-amber-400 flex items-center justify-between">
                        <span>Rookie Chef</span>
                        <span className="text-[10px] text-zinc-400">A2–B1</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-normal">
                        Guided vocabulary support, extra hints, and clear sentence models.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedDifficulty('pro');
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        selectedDifficulty === 'pro'
                          ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500/50'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-orange-400 flex items-center justify-between">
                        <span>Pro Chef</span>
                        <span className="text-[10px] text-zinc-400">B1–B2</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-normal">
                        Authentic rush pacing, complex customer dialogues, and advanced kitchen math.
                      </p>
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
                  >
                    <span>Start Your Journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    onOpenGlossary();
                  }}
                  className="text-xs text-zinc-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Preview Norwegian-English Kitchen Glossary</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
