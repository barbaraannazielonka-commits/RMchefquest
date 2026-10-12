import React, { useState } from 'react';
import { Crown, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Volume2, ShieldCheck, Clock, Calculator, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';

interface HeadChefFinalMissionProps {
  onComplete: (score: number) => void;
  difficulty: 'rookie' | 'pro';
  playerName: string;
}

export const HeadChefFinalMission: React.FC<HeadChefFinalMissionProps> = ({
  onComplete,
  difficulty: _difficulty,
  playerName
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 9;

  // Step 1: Menu Choices
  const [starter, setStarter] = useState<string>('halibut-carpaccio');
  const [main, setMain] = useState<string>('arctic-char');
  const [dessert, setDessert] = useState<string>('cloudberry-parfait');

  // Step 2: Dietary Accommodations
  const [dietaryConfirmed, setDietaryConfirmed] = useState<boolean>(false);

  // Step 3: Yield calculations
  const [halibutKg, setHalibutKg] = useState<string>('');
  const [halibutMathSuccess, setHalibutMathSuccess] = useState<boolean>(false);

  // Step 4: Timeline items
  const [timelineOrder, setTimelineOrder] = useState<string[]>([
    't-mise', 't-sauce', 't-briefing', 't-service-start', 't-mains-away'
  ]);
  const [timelineSuccess, setTimelineSuccess] = useState<boolean>(false);

  // Step 5: Food Safety CCP
  const [ccpChoice, setCcpChoice] = useState<string>('');

  // Step 6: Budget calculation
  const [budgetAnswer, setBudgetAnswer] = useState<string>('');
  const [budgetSuccess, setBudgetSuccess] = useState<boolean>(false);

  // Step 7: Emergency Crisis
  const [crisisChoice, setCrisisChoice] = useState<string>('');

  // Step 8: Menu Description Writing
  const [menuCopy, setMenuCopy] = useState<string>(
    'Pan-seared Arctic char served over velvety parsnip purée, glazed seasonal root vegetables, and a delicate Hardanger cider reduction.'
  );

  // Step 9: Manager Defense
  const [defenseChoice, setDefenseChoice] = useState<string>('');

  const [stepError, setStepError] = useState<string | null>(null);

  // Step Validation & Progression
  const handleNextStep = () => {
    soundManager.playClick();
    setStepError(null);

    if (currentStep === 1) {
      if (!starter || !main || !dessert) {
        setStepError('Please select a starter, main course, and dessert.');
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!dietaryConfirmed) {
        setStepError('Please verify the allergen and vegan accommodation protocols.');
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      const val = parseFloat(halibutKg.replace(',', '.'));
      // 180g portion * 20 guests = 3,600g = 3.6 kg (with 10% trim buffer = ~4.0 kg, accept 3.6 to 4.0)
      if (isNaN(val) || val < 3.5 || val > 4.2) {
        soundManager.playError();
        setStepError('Calculation check: 180g per portion × 20 guests = 3,600g (3.6 kg). Including a 10% butchering trim buffer = 4.0 kg. Please enter 3.6 or 4.0 kg.');
        return;
      }
      soundManager.playSuccess();
      setHalibutMathSuccess(true);
      setCurrentStep(4);
    } else if (currentStep === 4) {
      // Validate timeline
      // Proper order: t-mise (14:00), t-sauce (16:00), t-briefing (18:30), t-service-start (19:00), t-mains-away (19:45)
      const correctOrder = ['t-mise', 't-sauce', 't-briefing', 't-service-start', 't-mains-away'];
      const isCorrect = timelineOrder.every((id, idx) => id === correctOrder[idx]);
      if (!isCorrect) {
        soundManager.playError();
        setStepError('Timeline check: Brigade briefing must happen before service starts, and stocks must be simmered before final reduction!');
        return;
      }
      soundManager.playSuccess();
      setTimelineSuccess(true);
      setCurrentStep(5);
    } else if (currentStep === 5) {
      if (ccpChoice !== 'ccp-75') {
        soundManager.playError();
        setStepError('Food Safety rule: Hot-held foods must stay above 60°C, and poultry/reheated foods must reach a core temperature of 75°C to guarantee pathogen kill.');
        return;
      }
      soundManager.playSuccess();
      setCurrentStep(6);
    } else if (currentStep === 6) {
      const val = parseFloat(budgetAnswer.replace(',', '.'));
      // Total menu price 600 NOK per guest. Target food cost 30% = 180 NOK ingredient budget per guest
      if (isNaN(val) || Math.abs(val - 180) > 5) {
        soundManager.playError();
        setStepError('Cost check: At 600 NOK per cover, a 30% food cost target equals (600 × 0.30) = 180 NOK per guest.');
        return;
      }
      soundManager.playSuccess();
      setBudgetSuccess(true);
      setCurrentStep(7);
    } else if (currentStep === 7) {
      if (crisisChoice !== 'crisis-sub') {
        soundManager.playError();
        setStepError('A Head Chef must remain calm, resourceful, and find immediate culinary solutions without compromising standards.');
        return;
      }
      soundManager.playSuccess();
      setCurrentStep(8);
    } else if (currentStep === 8) {
      if (menuCopy.trim().length < 30) {
        setStepError('Please write or keep an appetizing menu description highlighting sensory textures and flavours.');
        return;
      }
      soundManager.playSuccess();
      setCurrentStep(9);
    } else if (currentStep === 9) {
      if (defenseChoice !== 'defense-prof') {
        soundManager.playError();
        setStepError('Explain your decisions professionally, grounding your answers in food safety, guest experience, and culinary balance.');
        return;
      }
      // Grand completion!
      soundManager.playLevelComplete();
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore confetti error
      }
      onComplete(500);
    }
  };

  const moveTimelineItem = (index: number, dir: 'up' | 'down') => {
    soundManager.playClick();
    const copy = [...timelineOrder];
    const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= copy.length) return;
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setTimelineOrder(copy);
    setStepError(null);
  };

  const timelineLabels: Record<string, { time: string; title: string; desc: string }> = {
    't-mise': { time: '14:00', title: 'Deep Mise en Place & Vegetable Butchery', desc: 'Peel roots, portion fish, store on ice in walk-in cooler.' },
    't-sauce': { time: '16:00', title: 'Stock Reductions & Emulsions', desc: 'Simmer fish fumet, prepare cider reduction, clarify butter.' },
    't-briefing': { time: '18:30', title: 'Brigade & Front-of-House Briefing', desc: 'Align waitstaff on VIP dietary table positions and tasting notes.' },
    't-service-start': { time: '19:00', title: 'Gala Doors Open & Starters Away', desc: 'Begin firing cold starters and amuse-bouche at the pass.' },
    't-mains-away': { time: '19:45', title: 'Main Course Plating & Hot Pass Check', desc: 'Sear Arctic char, plate hot sides, inspect every rim before departure.' }
  };

  return (
    <div className="space-y-6">
      {/* Executive Summit Header */}
      <div className="bg-gradient-to-r from-amber-950/40 via-zinc-900 to-zinc-950 p-6 rounded-2xl border border-amber-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>Executive Head Chef Final Examination</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            The 20-Guest Diplomatic Academy Gala
          </h2>
          <p className="text-xs text-zinc-300 mt-1 max-w-xl">
            Candidate: <strong>{playerName}</strong> · Demonstrating executive competence across culinary craft, communication, and brigade leadership.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 bg-zinc-950/80 px-4 py-2 rounded-xl border border-zinc-800 shrink-0">
          <span className="text-xs font-semibold text-zinc-400 uppercase">Phase</span>
          <span className="text-base font-extrabold text-amber-400 tabular-nums">
            {currentStep} / {totalSteps}
          </span>
        </div>
      </div>

      {/* Error banner */}
      {stepError && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <span>{stepError}</span>
        </div>
      )}

      {/* Main Interactive Stage for Current Step */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 min-h-[380px]">
        
        {/* STEP 1: Menu Curation */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 1 of 9</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Design the 3-Course Gala Menu</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Select a balanced sequence that showcases Norwegian heritage ingredients elevated with international finesse.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Starter Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">Starter (Forrett)</label>
                <div className="space-y-2">
                  <div
                    onClick={() => setStarter('halibut-carpaccio')}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                      starter === 'halibut-carpaccio'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="font-bold text-zinc-200">Kveite Carpaccio</div>
                    <p className="text-[11px] text-zinc-400 mt-1">Thinly shaved Norwegian halibut, yuzu dressing, pickled radish & dill oil.</p>
                  </div>
                  <div
                    onClick={() => setStarter('scallop-ceviche')}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                      starter === 'scallop-ceviche'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="font-bold text-zinc-200">Smoked Scallop Tartar</div>
                    <p className="text-[11px] text-zinc-400 mt-1">Hand-dived Frøya scallops, crisp sourdough croutons, fermented apple gel.</p>
                  </div>
                </div>
              </div>

              {/* Main Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">Main (Hovedrett)</label>
                <div className="space-y-2">
                  <div
                    onClick={() => setMain('arctic-char')}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                      main === 'arctic-char'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="font-bold text-zinc-200">Pan-Seared Arctic Char</div>
                    <p className="text-[11px] text-zinc-400 mt-1">Crisp skin, silky parsnip purée, winter root vegetables & Hardanger cider sauce.</p>
                  </div>
                  <div
                    onClick={() => setMain('braised-reindeer')}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                      main === 'braised-reindeer'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="font-bold text-zinc-200">Glazed Reindeer Fillet</div>
                    <p className="text-[11px] text-zinc-400 mt-1">Juniper berry jus, celery root fondant, foraged lingonberry reduction.</p>
                  </div>
                </div>
              </div>

              {/* Dessert Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">Dessert</label>
                <div className="space-y-2">
                  <div
                    onClick={() => setDessert('cloudberry-parfait')}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                      dessert === 'cloudberry-parfait'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="font-bold text-zinc-200">Arctic Cloudberry Parfait</div>
                    <p className="text-[11px] text-zinc-400 mt-1">Whipped Røros sour cream, caramelized white chocolate, almond tuile.</p>
                  </div>
                  <div
                    onClick={() => setDessert('chocolate-ganache')}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                      dessert === 'chocolate-ganache'
                        ? 'bg-amber-500/10 border-amber-500 text-white'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="font-bold text-zinc-200">Dark Valrhona Tart</div>
                    <p className="text-[11px] text-zinc-400 mt-1">70% chocolate, sea buckthorn sorbet, roasted hazelnuts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Dietary Accommodations */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 2 of 9</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Special Dietary & Allergen Protocols</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Your guest manifest indicates: <strong>1 severe celiac (gluten)</strong>, <strong>2 strict vegans</strong>, and <strong>1 shellfish allergy</strong>.
              </p>
            </div>

            <div className="space-y-3 bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-300">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Celiac Guest:</strong> Replace almond tuile and sourdough crisps with certified gluten-free buckwheat tuile; cook with dedicated sanitized pans to ensure zero gluten cross-contact.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">2 Vegan Guests:</strong> Prepared salt-baked heritage beetroots with herb chimichurri & smoked almond cream; vegan berry sorbet for dessert.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Shellfish Allergy:</strong> Halibut/Char mains utilize pure fish fumet and vegetable reductions; zero shrimp or lobster stock in any prep line.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setDietaryConfirmed(!dietaryConfirmed);
                }}
                className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  dietaryConfirmed
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <CheckCircle2 className={`w-4 h-4 ${dietaryConfirmed ? 'text-emerald-400' : 'text-zinc-600'}`} />
                <span>I approve these dietary protocols and will brief station chefs personally</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Yield Math for 20 covers */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 3 of 9</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Ingredient Yield Calculations (20 Covers)</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Each guest portion requires <strong>180g of clean fish fillet</strong>. Calculate how much total raw fillet weight (kg) to order, factoring in a 10% portion/butchery safety buffer.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 max-w-md space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Total Clean Fillet Order (in kg):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="e.g. 3.6 or 4.0"
                  value={halibutKg}
                  onChange={(e) => setHalibutKg(e.target.value)}
                  className="w-36 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 tabular-nums"
                />
                <span className="text-xs font-bold text-zinc-400">kilograms (kg)</span>
              </div>
              <p className="text-[11px] text-zinc-400 italic">
                Formula: (180g × 20 portions) ÷ 1,000 = 3.6 kg base (+ 10% buffer = 4.0 kg).
              </p>
            </div>
          </div>
        )}

        {/* STEP 4: Timeline Sequencing */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 4 of 9</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Kitchen Prep & Service Master Timeline</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Arrange these 5 crucial shift milestones in correct chronological order so the brigade operates smoothly.
              </p>
            </div>

            <div className="space-y-2.5 max-w-2xl">
              {timelineOrder.map((id, index) => {
                const item = timelineLabels[id];
                return (
                  <div
                    key={id}
                    className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-14 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono font-bold text-amber-400 text-center">
                        {item.time}
                      </span>
                      <div>
                        <h5 className="text-xs font-bold text-white">{item.title}</h5>
                        <p className="text-[11px] text-zinc-400">{item.desc}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => moveTimelineItem(index, 'up')}
                        disabled={index === 0}
                        className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 disabled:opacity-30 text-xs font-bold"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveTimelineItem(index, 'down')}
                        disabled={index === timelineOrder.length - 1}
                        className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 disabled:opacity-30 text-xs font-bold"
                      >
                        ↓
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Food Safety CCP */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 5 of 9</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Critical Control Point (CCP) Audit</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Before sending dishes to the pass, which core temperature standard must be verified for hot-holding and pathogen elimination?
              </p>
            </div>

            <div className="space-y-3 max-w-xl">
              <div
                onClick={() => setCcpChoice('ccp-40')}
                className={`p-4 rounded-xl border cursor-pointer text-xs transition-all ${
                  ccpChoice === 'ccp-40' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="font-bold text-zinc-200">Core temperature 45°C</div>
                <p className="text-[11px] text-zinc-400 mt-1">Lukewarm holding in warm kitchen pass without digital probe verification.</p>
              </div>

              <div
                onClick={() => setCcpChoice('ccp-75')}
                className={`p-4 rounded-xl border cursor-pointer text-xs transition-all ${
                  ccpChoice === 'ccp-75' ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="font-bold text-emerald-300">Core temperature ≥ 75°C (Reheating) & Hot Holding ≥ 60°C</div>
                <p className="text-[11px] text-zinc-400 mt-1">Calibrated digital probe log recorded; cold walk-in strictly maintained below 4°C.</p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Budgeting & Food Cost % */}
        {currentStep === 6 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 6 of 9</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Gala Budget & Food Cost Economics</h3>
              <p className="text-xs text-zinc-400 mt-1">
                The academy charges <strong>600 NOK per guest</strong>. To hit the industry benchmark food cost of <strong>30%</strong>, what is your maximum ingredient budget per cover?
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 max-w-md space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Target Cost per Guest:
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="e.g. 180"
                  value={budgetAnswer}
                  onChange={(e) => setBudgetAnswer(e.target.value)}
                  className="w-36 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500 tabular-nums"
                />
                <span className="text-xs font-bold text-zinc-400">NOK</span>
              </div>
              <p className="text-[11px] text-zinc-400 italic">
                Formula: 600 NOK × 0.30 = ?
              </p>
            </div>
          </div>
        )}

        {/* STEP 7: Crisis Management */}
        {currentStep === 7 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 7 of 9</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Live Kitchen Crisis: 15 Minutes to Service</h3>
              <p className="text-xs text-zinc-400 mt-1">
                The delivery box of delicate edible microgreens was crushed in transport, and Station 2's induction burner has blown a fuse. What is your executive decision?
              </p>
            </div>

            <div className="space-y-3 max-w-xl">
              <div
                onClick={() => setCrisisChoice('crisis-sub')}
                className={`p-4 rounded-xl border cursor-pointer text-xs transition-all ${
                  crisisChoice === 'crisis-sub' ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="font-bold text-emerald-300">Culinary Pivot & Station Reorganization</div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Pivot garnish to crisp fried leek threads and fresh dill sprigs from the cold store. Shift searing pans to the central gas range and brief the brigade calmly: "Adapt and maintain precision."
                </p>
              </div>

              <div
                onClick={() => setCrisisChoice('crisis-cancel')}
                className={`p-4 rounded-xl border cursor-pointer text-xs transition-all ${
                  crisisChoice === 'crisis-cancel' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="font-bold text-zinc-200">Cancel the Main Course</div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Tell the diplomatic guests they can only eat soup and bread because the microgreens were damaged.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 8: Professional English Menu Description */}
        {currentStep === 8 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 8 of 9</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Write the English Menu Description</h3>
              <p className="text-xs text-zinc-400 mt-1">
                Refine the English description of the main course printed on the diplomats' menu cards. Ensure rich sensory adjectives (velvety, crisp, glazed).
              </p>
            </div>

            <div className="max-w-2xl space-y-3">
              <textarea
                rows={4}
                value={menuCopy}
                onChange={(e) => setMenuCopy(e.target.value)}
                className="w-full p-4 rounded-xl bg-zinc-950 border border-zinc-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Click speaker to preview audio pronunciation:</span>
                <button
                  type="button"
                  onClick={() => soundManager.speak(menuCopy)}
                  className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Listen to English Menu Copy</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 9: General Manager Presentation */}
        {currentStep === 9 && (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 9 of 9</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Executive Defense: Meeting General Manager Laurent</h3>
              <p className="text-xs text-zinc-400 mt-1">
                General Manager Laurent asks: "Chef, why should the academy board trust your brigade to execute this international banquet flawlessly?"
              </p>
            </div>

            <div className="space-y-3 max-w-xl">
              <div
                onClick={() => setDefenseChoice('defense-prof')}
                className={`p-4 rounded-xl border cursor-pointer text-xs transition-all ${
                  defenseChoice === 'defense-prof' ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="font-bold text-emerald-300">Executive Hospitality Defense</div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  "Monsieur Laurent, our menu balances Norwegian regional excellence with global culinary respect. We have established rigorous allergen protocols, calculated exact portion yields, and prepared adaptive contingency solutions. Our team communicates with clarity and pride."
                </p>
              </div>

              <div
                onClick={() => setDefenseChoice('defense-shrug')}
                className={`p-4 rounded-xl border cursor-pointer text-xs transition-all ${
                  defenseChoice === 'defense-shrug' ? 'bg-amber-500/10 border-amber-500 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                }`}
              >
                <div className="font-bold text-zinc-200">Casual Dismissal</div>
                <p className="text-[11px] text-zinc-400 mt-1">
                  "Well, we will just see what happens. If things go wrong, someone else will fix it."
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Navigation & Submission Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={() => {
            if (currentStep > 1) {
              soundManager.playClick();
              setCurrentStep(currentStep - 1);
              setStepError(null);
            }
          }}
          disabled={currentStep === 1}
          className="px-4 py-2 rounded-xl border border-zinc-800 text-xs font-semibold text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <button
          type="button"
          onClick={handleNextStep}
          className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 shadow-md flex items-center gap-2 transition-all transform active:scale-95"
        >
          <span>{currentStep === totalSteps ? 'Graduate as International Head Chef' : 'Verify & Next Phase'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
