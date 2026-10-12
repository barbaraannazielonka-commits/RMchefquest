import React from 'react';
import { ChefHat, Volume2, VolumeX, BookOpen, User, MapPin, Sun, Moon } from 'lucide-react';
import { PlayerProfile, DifficultyMode } from '../types/game';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  currentView: 'home' | 'map' | 'level' | 'certificate';
  setCurrentView: (view: 'home' | 'map' | 'level' | 'certificate') => void;
  player: PlayerProfile;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerProfile>>;
  onOpenGlossary: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  player,
  setPlayer,
  onOpenGlossary,
  onOpenProfile
}) => {
  const toggleSound = () => {
    soundManager.playClick();
    const nextSound = !player.soundEnabled;
    soundManager.setSoundEnabled(nextSound);
    soundManager.setVoiceEnabled(nextSound);
    setPlayer(prev => ({
      ...prev,
      soundEnabled: nextSound,
      voiceEnabled: nextSound
    }));
  };

  const toggleDifficulty = () => {
    soundManager.playClick();
    const nextDiff: DifficultyMode = player.difficulty === 'rookie' ? 'pro' : 'rookie';
    setPlayer(prev => ({ ...prev, difficulty: nextDiff }));
  };

  const toggleTheme = () => {
    soundManager.playClick();
    const nextTheme = player.theme === 'light' ? 'dark' : 'light';
    setPlayer(prev => ({ ...prev, theme: nextTheme }));
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 text-zinc-100 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <button
          onClick={() => {
            soundManager.playClick();
            setCurrentView(player.completedLevels.length > 0 ? 'map' : 'home');
          }}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors shrink-0">
            <ChefHat className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-zinc-100 whitespace-nowrap shrink-0">
            Chef Quest
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <button
            onClick={() => {
              soundManager.playClick();
              setCurrentView('map');
            }}
            className={`flex items-center gap-1.5 hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'map' ? 'text-amber-400 font-semibold' : ''
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>World Map</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenGlossary();
            }}
            className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-4 h-4" />
            <span>Culinary Glossary</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenProfile();
            }}
            className="flex items-center gap-1.5 hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0"
          >
            <User className="w-4 h-4" />
            <span>Chef Dossier</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Difficulty Segmented Button */}
          <button
            onClick={toggleDifficulty}
            title="Click to toggle between Rookie and Pro Chef difficulty"
            className="px-3 py-1.5 text-xs font-semibold rounded-md border border-zinc-700 bg-zinc-900 hover:border-amber-500/50 text-zinc-300 hover:text-zinc-100 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Mode</span>
            <span className={player.difficulty === 'pro' ? 'text-amber-400' : 'text-emerald-400'}>
              {player.difficulty === 'pro' ? 'Pro Chef' : 'Rookie Chef'}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={player.soundEnabled ? 'Mute sound' : 'Enable sound'}
            className="p-2 rounded-md border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-zinc-100 transition-colors shrink-0"
          >
            {player.soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle (Light / Dark Mode) */}
          <button
            onClick={toggleTheme}
            aria-label={player.theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            title={player.theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            className="p-2 rounded-md border border-zinc-800 bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-amber-400 transition-colors shrink-0"
          >
            {player.theme === 'light' ? (
              <Moon className="w-4 h-4 text-indigo-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Player Score Chip / Button */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenProfile();
            }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-colors whitespace-nowrap shrink-0"
          >
            <span>{player.name || 'Chef'}</span>
            <span className="text-zinc-500">·</span>
            <span className="tabular-nums">{player.totalScore} XP</span>
          </button>
        </div>
      </div>
    </header>
  );
};
