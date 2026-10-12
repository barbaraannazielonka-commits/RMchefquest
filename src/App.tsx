import React, { useState, useEffect } from 'react';
import { PlayerProfile } from './types/game';
import { LEVELS_DATA } from './data/levelsData';
import { Header } from './components/Header';
import { HomeHero } from './components/HomeHero';
import { WorldMap } from './components/WorldMap';
import { LevelContainer } from './components/LevelContainer';
import { LevelReflectionModal } from './components/LevelReflectionModal';
import { GraduationCertificate } from './components/GraduationCertificate';
import { GlossaryModal } from './components/GlossaryModal';
import { ProfileModal } from './components/ProfileModal';
import { soundManager } from './utils/audio';

const STORAGE_KEY = 'chef_quest_player_profile_v1';

const INITIAL_PROFILE: PlayerProfile = {
  name: '',
  avatar: 'chef-hat',
  difficulty: 'rookie',
  totalScore: 0,
  unlockedLevel: 1,
  completedLevels: [],
  levelStars: {},
  badges: [],
  reflections: {},
  soundEnabled: true,
  voiceEnabled: true,
  theme: 'dark'
};

export default function App() {
  const [player, setPlayer] = useState<PlayerProfile>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      } catch {
        // Fallback to initial
      }
    }
    return INITIAL_PROFILE;
  });

  const [currentView, setCurrentView] = useState<'home' | 'map' | 'level' | 'certificate'>(() => {
    return player.name ? 'map' : 'home';
  });

  const [currentLevelId, setCurrentLevelId] = useState<number>(1);
  const [reflectionLevelId, setReflectionLevelId] = useState<number | null>(null);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Sync to localStorage and body theme
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch {
      // Storage unavailable
    }

    if (typeof document !== 'undefined') {
      if (player.theme === 'light') {
        document.body.classList.add('theme-light');
        document.body.classList.remove('theme-dark');
      } else {
        document.body.classList.add('theme-dark');
        document.body.classList.remove('theme-light');
      }
    }
  }, [player]);

  const handleStartGame = () => {
    setCurrentView('map');
  };

  const handleSelectLevel = (levelId: number) => {
    setCurrentLevelId(levelId);
    setCurrentView('level');
  };

  const handleTaskCompleted = (levelId: number, taskId: string, pointsEarned: number) => {
    setPlayer(prev => ({
      ...prev,
      totalScore: prev.totalScore + pointsEarned
    }));
  };

  const handleLevelFinished = (levelId: number) => {
    const level = LEVELS_DATA.find(l => l.id === levelId);
    if (!level) return;

    soundManager.playLevelComplete();

    // Mark completed and award badge
    setPlayer(prev => {
      const isAlreadyCompleted = prev.completedLevels.includes(levelId);
      const nextCompleted = isAlreadyCompleted ? prev.completedLevels : [...prev.completedLevels, levelId];
      const nextUnlocked = Math.max(prev.unlockedLevel, levelId < 7 ? levelId + 1 : 7);
      const nextBadges = prev.badges.includes(level.badgeAwarded.id)
        ? prev.badges
        : [...prev.badges, level.badgeAwarded.id];

      return {
        ...prev,
        completedLevels: nextCompleted,
        unlockedLevel: nextUnlocked,
        badges: nextBadges,
        levelStars: {
          ...prev.levelStars,
          [levelId]: 3
        }
      };
    });

    // If level 7 completed, award certificate directly, or trigger reflection first
    setReflectionLevelId(levelId);
  };

  const handleSaveReflection = (answers: { answer1: string; answer2: string; answer3: string }) => {
    if (!reflectionLevelId) return;

    setPlayer(prev => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [reflectionLevelId]: answers
      }
    }));

    const finishedLevel = reflectionLevelId;
    setReflectionLevelId(null);

    if (finishedLevel === 7) {
      setCurrentView('certificate');
    } else {
      setCurrentView('map');
    }
  };

  const handleResetProgress = () => {
    soundManager.playClick();
    localStorage.removeItem(STORAGE_KEY);
    setPlayer(INITIAL_PROFILE);
    setCurrentView('home');
  };

  const activeLevelData = LEVELS_DATA.find(l => l.id === currentLevelId) || LEVELS_DATA[0];
  const reflectionLevelData = reflectionLevelId ? LEVELS_DATA.find(l => l.id === reflectionLevelId) : null;

  return (
    <div className={`min-h-screen ${player.theme === 'light' ? 'theme-light bg-slate-50 text-slate-900' : 'theme-dark bg-zinc-950 text-zinc-100'} flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200 transition-colors duration-200`}>
      
      {/* Universal Top Bar */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        player={player}
        setPlayer={setPlayer}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'home' && (
          <HomeHero
            player={player}
            setPlayer={setPlayer}
            onStartGame={handleStartGame}
            onOpenGlossary={() => setIsGlossaryOpen(true)}
          />
        )}

        {currentView === 'map' && (
          <WorldMap
            player={player}
            onSelectLevel={handleSelectLevel}
            onViewCertificate={() => setCurrentView('certificate')}
          />
        )}

        {currentView === 'level' && (
          <LevelContainer
            level={activeLevelData}
            player={player}
            onTaskCompleted={handleTaskCompleted}
            onLevelFinished={handleLevelFinished}
            onBackToMap={() => setCurrentView('map')}
          />
        )}

        {currentView === 'certificate' && (
          <GraduationCertificate
            player={player}
            onBackToMap={() => setCurrentView('map')}
          />
        )}
      </main>

      {/* Post-Level Reflection Modal */}
      {reflectionLevelData && (
        <LevelReflectionModal
          level={reflectionLevelData}
          player={player}
          isOpen={true}
          onSaveAndContinue={handleSaveReflection}
        />
      )}

      {/* Bilingual Culinary Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />

      {/* Chef Dossier & Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        player={player}
        setPlayer={setPlayer}
        onResetProgress={handleResetProgress}
      />

      {/* High-Legibility Footer */}
      <footer className={`border-t py-6 text-sm font-medium no-print transition-colors ${
        player.theme === 'light'
          ? 'bg-white border-zinc-300 text-black'
          : 'bg-zinc-950 border-zinc-800 text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className={`font-semibold tracking-wide ${
            player.theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            Nannestad High School- Barbara Anna Zielonka
          </span>
          <div className={`flex items-center gap-4 ${
            player.theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            <button
              onClick={() => setIsGlossaryOpen(true)}
              className={`hover:underline font-medium transition-colors ${
                player.theme === 'light' ? 'text-black hover:text-amber-600' : 'text-white hover:text-amber-400'
              }`}
            >
              Glossary
            </button>
            <span aria-hidden="true" className={player.theme === 'light' ? 'text-black' : 'text-white'}>·</span>
            <button
              onClick={() => setIsProfileOpen(true)}
              className={`hover:underline font-medium transition-colors ${
                player.theme === 'light' ? 'text-black hover:text-amber-600' : 'text-white hover:text-amber-400'
              }`}
            >
              Chef Dossier
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
