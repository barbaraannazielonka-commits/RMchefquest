import React from 'react';
import { Award, Printer, ArrowLeft, Star, ShieldCheck, ChefHat, Sparkles } from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { soundManager } from '../utils/audio';

interface GraduationCertificateProps {
  player: PlayerProfile;
  onBackToMap: () => void;
}

export const GraduationCertificate: React.FC<GraduationCertificateProps> = ({
  player,
  onBackToMap
}) => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top Controls (Hidden when printing) */}
      <div className="no-print flex items-center justify-between">
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

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold rounded-lg shadow flex items-center gap-2 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Certificate (PDF)</span>
        </button>
      </div>

      {/* Official Graduation Diploma Card */}
      <div className="relative bg-gradient-to-b from-stone-900 via-zinc-950 to-stone-900 border-8 border-amber-600/40 rounded-3xl p-8 sm:p-14 text-center shadow-2xl overflow-hidden print:bg-white print:text-black print:border-amber-700">
        
        {/* Ornate Gold Border Line */}
        <div className="absolute inset-3 border border-amber-500/30 rounded-2xl pointer-events-none" />

        {/* Header Insignia */}
        <div className="space-y-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 mx-auto flex items-center justify-center text-zinc-950 shadow-xl ring-4 ring-amber-500/20">
            <ChefHat className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-amber-400">
              GLOBAL KITCHEN ACADEMY · OSLO & INTERNATIONAL CAMPUSES
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight pt-2 print:text-black">
              Certificate of Graduation
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 font-serif italic pt-1 print:text-zinc-600">
              Restaurant- og matfag · International Culinary Competence Program
            </p>
          </div>
        </div>

        {/* Recipient Details */}
        <div className="my-10 space-y-3">
          <p className="text-xs uppercase tracking-widest text-zinc-400">
            This diploma certifies that
          </p>
          <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-serif tracking-wide border-b border-amber-500/40 pb-3 max-w-lg mx-auto print:text-amber-800">
            {player.name || 'Executive Chef Candidate'}
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed pt-2 print:text-zinc-700">
            has successfully completed all seven rigorous stages of the international culinary curriculum, demonstrating mastery in professional kitchen English, hygiene and safety, global gastronomic techniques, recipe scaling, and brigade leadership.
          </p>
        </div>

        {/* Title Awarded */}
        <div className="inline-block bg-amber-500/10 border border-amber-500/40 rounded-xl px-6 py-3 my-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 block">
            Official Culinary Title Awarded
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-white tracking-wider flex items-center justify-center gap-2 mt-0.5 print:text-black">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>INTERNATIONAL HEAD CHEF</span>
            <Sparkles className="w-5 h-5 text-amber-400" />
          </span>
        </div>

        {/* Badges and Competencies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 text-left border-t border-b border-zinc-800/80 py-6 print:border-zinc-300">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-zinc-500">Hygiene & Safety</span>
            <p className="text-xs font-semibold text-zinc-200 print:text-black">Mattilsynet Compliant</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-zinc-500">Language Level</span>
            <p className="text-xs font-semibold text-zinc-200 print:text-black">Professional English (A2–B2)</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-zinc-500">Total Experience</span>
            <p className="text-xs font-semibold text-amber-400 tabular-nums print:text-amber-800">{player.totalScore} XP Mastered</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-zinc-500">Curriculum Tier</span>
            <p className="text-xs font-semibold text-emerald-400 capitalize print:text-emerald-800">{player.difficulty} Chef Distinction</p>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="grid grid-cols-2 sm:grid-cols-3 items-end gap-6 pt-4 text-xs">
          <div className="text-left space-y-1">
            <div className="font-serif italic text-sm text-zinc-300 print:text-black">Chef Kristin Lind</div>
            <div className="h-px w-36 bg-zinc-700 print:bg-zinc-400" />
            <p className="text-[10px] text-zinc-500 uppercase">Head of Culinary Faculty</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-amber-500/50 flex items-center justify-center text-amber-400 p-2 shadow-inner">
              <div className="w-full h-full rounded-full border border-dashed border-amber-500/50 flex items-center justify-center text-[9px] font-bold uppercase tracking-tighter">
                Official Seal
              </div>
            </div>
            <span className="text-[10px] text-zinc-500 mt-1">{currentDate}</span>
          </div>

          <div className="text-right space-y-1">
            <div className="font-serif italic text-sm text-zinc-300 print:text-black">Director Laurent Dupont</div>
            <div className="h-px w-36 bg-zinc-700 ml-auto print:bg-zinc-400" />
            <p className="text-[10px] text-zinc-500 uppercase">Executive Director</p>
          </div>
        </div>

      </div>
    </div>
  );
};
