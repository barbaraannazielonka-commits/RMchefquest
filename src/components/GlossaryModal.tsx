import React, { useState } from 'react';
import { X, Search, Volume2, BookOpen, Filter } from 'lucide-react';
import { GLOSSARY_ITEMS, GlossaryItem } from '../data/glossaryData';
import { soundManager } from '../utils/audio';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Terms' },
    { id: 'equipment', label: 'Equipment (Utstyr)' },
    { id: 'technique', label: 'Techniques (Teknikker)' },
    { id: 'safety', label: 'Safety (Trygghet)' },
    { id: 'service', label: 'Service & Jargon' },
    { id: 'allergens', label: 'Allergens (Allergener)' }
  ];

  const filteredItems = GLOSSARY_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.termEn.toLowerCase().includes(q) ||
      item.termNo.toLowerCase().includes(q) ||
      item.definitionEn.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Norwegian-English Culinary Glossary
              </h3>
              <p className="text-xs text-zinc-400">
                Faguttrykk og kjøkkenspråk for Restaurant- og matfag
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

        {/* Search & Category Filter */}
        <div className="p-4 sm:p-6 border-b border-zinc-800/80 space-y-4 bg-zinc-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in English or Norwegian (e.g. chinois, sear, faresone)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-700 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-zinc-950 font-bold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3.5 flex-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              No matching culinary terms found for "{searchQuery}".
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors space-y-2 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">
                        {item.termEn}
                      </h4>
                      <button
                        type="button"
                        onClick={() => soundManager.speak(item.termEn)}
                        title="Listen to English pronunciation"
                        className="p-1 text-zinc-400 hover:text-amber-400 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-xs font-semibold text-amber-400/90">
                      Norsk: {item.termNo}
                    </span>
                  </div>

                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 shrink-0">
                    {item.category}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {item.definitionEn}
                </p>

                <div className="pt-2 border-t border-zinc-900 flex items-start gap-1.5 text-xs text-zinc-400 italic">
                  <span className="text-amber-400 font-semibold not-italic">Example:</span>
                  <span>"{item.exampleSentence}"</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
