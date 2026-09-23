import React, { useState } from 'react';
import { GameState } from '../types/game';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  RotateCcw, 
  User, 
  Plus, 
  Trash2, 
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface ScoreCalculatorProps {
  gameState: GameState;
  isSerbian: boolean;
}

interface PlayerScoreData {
  id: number;
  name: string;
  // 1. Village tiles VP (Printed & Upgraded)
  printedVp: number;
  // 2. Autumn Storage tiles (Barn, Blacksmith, Stone yard, Timber yard)
  barnWood: number;
  barnStone: number;
  barnIron: number;
  barnGold: number;
  isBarnUpgraded: boolean;
  blacksmithIron: number;
  isBlacksmithUpgraded: boolean;
  stoneYardStone: number;
  isStoneYardUpgraded: boolean;
  timberYardWood: number;
  isTimberYardUpgraded: boolean;
  // 3. Winter Scoring Tiles
  keythedral: boolean; // 12 pts
  keyMarketGreenMeeples: number; // 2 pts each
  mercerResourceSets: number; // 5 pts per set of 3 (Wood+Stone+Iron)
  scholarChosenSkills: number; // 3 pts each of chosen type
  scribesSkillSets: number; // 10 pts per set of 3
  villageHallChosenMeeples: number; // 1 pt each
  watermillChosenResources: number; // 1 pt each
  windmillAnyResourceSets5: number; // 5 pts per 5
  apothecaryMeeplesSets5: number; // 3 pts per 5
  craftsmanMeepleSets3: number; // 3 pts per set of (Blue+Red+Yellow)
  jewellerGold: number; // 2 pts each
  keyGuildSkillsSets5: number; // 10 pts per 5
  // 4. Boats
  keyflowerTransportCapacity: number; // pts = capacity (x2 if boat 2b)
  hasBoat2bDouble: boolean;
  seaBastionLoopTiles: number; // 1 pt per tile
  seaBreeseBoatPoints: number; // points on connected boats
  hasFlipperBoat: boolean; // 2 pts
  hasIanvincibleBoat: boolean; // 5 pts
  whiteWindUnusedWorkers: number; // 1 pt each
  // 5. Turn Order tiles in winter
  turnOrderConnectedRoads: number; // 1 pt per road
  // 6. Remaining Gold
  unusedGold: number; // 1 pt each
}

// Touch-friendly stepper for mobile & tablet (no annoying keyboard pops)
const TouchStepper: React.FC<{
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
}> = ({ value, onChange, min = 0, max = 999, step = 1 }) => {
  return (
    <div className="flex items-center gap-1 bg-stone-100 p-0.5 sm:p-1 rounded-xl border border-stone-300 shrink-0">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, (value || 0) - step))}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white active:bg-stone-200 text-stone-900 font-bold text-base flex items-center justify-center shadow-xs border border-stone-200 touch-manipulation select-none active:scale-90 transition-transform"
      >
        -
      </button>
      <span className="w-8 sm:w-10 text-center font-mono font-black text-xs sm:text-sm text-stone-900 select-none">
        {value || 0}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, (value || 0) + step))}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-500 active:bg-amber-600 text-stone-950 font-bold text-base flex items-center justify-center shadow-xs border border-amber-400 touch-manipulation select-none active:scale-90 transition-transform"
      >
        +
      </button>
    </div>
  );
};

export const ScoreCalculator: React.FC<ScoreCalculatorProps> = ({ gameState, isSerbian }) => {
  const [scores, setScores] = useState<PlayerScoreData[]>(() =>
    gameState.players.map((p) => ({
      id: p.id,
      name: isSerbian ? `Igrač ${p.id}` : `Player ${p.id}`,
      printedVp: 0,
      barnWood: 0,
      barnStone: 0,
      barnIron: 0,
      barnGold: 0,
      isBarnUpgraded: false,
      blacksmithIron: 0,
      isBlacksmithUpgraded: false,
      stoneYardStone: 0,
      isStoneYardUpgraded: false,
      timberYardWood: 0,
      isTimberYardUpgraded: false,
      keythedral: false,
      keyMarketGreenMeeples: 0,
      mercerResourceSets: 0,
      scholarChosenSkills: 0,
      scribesSkillSets: 0,
      villageHallChosenMeeples: 0,
      watermillChosenResources: 0,
      windmillAnyResourceSets5: 0,
      apothecaryMeeplesSets5: 0,
      craftsmanMeepleSets3: 0,
      jewellerGold: 0,
      keyGuildSkillsSets5: 0,
      keyflowerTransportCapacity: 0,
      hasBoat2bDouble: false,
      seaBastionLoopTiles: 0,
      seaBreeseBoatPoints: 0,
      hasFlipperBoat: false,
      hasIanvincibleBoat: false,
      whiteWindUnusedWorkers: 0,
      turnOrderConnectedRoads: 0,
      unusedGold: 0,
    }))
  );

  const [activePlayerTab, setActivePlayerTab] = useState(1);
  const [showDetailedRanking, setShowDetailedRanking] = useState(false);

  const calculateTotal = (p: PlayerScoreData): number => {
    let total = 0;
    // 1. Printed & Upgraded VP
    total += Number(p.printedVp) || 0;

    // 2. Autumn Yards
    const barnMultiplier = p.isBarnUpgraded ? 2 : 1;
    total += ((p.barnWood + p.barnStone + p.barnIron + p.barnGold) || 0) * barnMultiplier;

    const bsMultiplier = p.isBlacksmithUpgraded ? 2 : 1;
    total += (p.blacksmithIron || 0) * bsMultiplier;

    const syMultiplier = p.isStoneYardUpgraded ? 2 : 1;
    total += (p.stoneYardStone || 0) * syMultiplier;

    const tyMultiplier = p.isTimberYardUpgraded ? 2 : 1;
    total += (p.timberYardWood || 0) * tyMultiplier;

    // 3. Winter Tiles
    if (p.keythedral) total += 12;
    total += (p.keyMarketGreenMeeples || 0) * 2;
    total += (p.mercerResourceSets || 0) * 5;
    total += (p.scholarChosenSkills || 0) * 3;
    total += (p.scribesSkillSets || 0) * 10;
    total += (p.villageHallChosenMeeples || 0) * 1;
    total += (p.watermillChosenResources || 0) * 1;
    total += (p.windmillAnyResourceSets5 || 0) * 5;
    total += (p.apothecaryMeeplesSets5 || 0) * 3;
    total += (p.craftsmanMeepleSets3 || 0) * 3;
    total += (p.jewellerGold || 0) * 2;
    total += (p.keyGuildSkillsSets5 || 0) * 10;

    // 4. Boats
    const boatMultiplier = p.hasBoat2bDouble ? 2 : 1;
    total += (p.keyflowerTransportCapacity || 0) * boatMultiplier;
    total += (p.seaBastionLoopTiles || 0) * 1;
    total += Number(p.seaBreeseBoatPoints) || 0;
    if (p.hasFlipperBoat) total += 2;
    if (p.hasIanvincibleBoat) total += 5;
    total += (p.whiteWindUnusedWorkers || 0) * 1;

    // 5. Turn Order
    total += (p.turnOrderConnectedRoads || 0) * 1;

    // 6. Unused Gold
    total += Number(p.unusedGold) || 0;

    return total;
  };

  const updatePlayer = (id: number, field: keyof PlayerScoreData, value: any) => {
    setScores((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const rankedPlayers = [...scores].sort((a, b) => calculateTotal(b) - calculateTotal(a));
  const activePlayer = scores.find((p) => p.id === activePlayerTab) || scores[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Title & Podium Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4" />
              <span>{isSerbian ? 'Konačni obračun poena' : 'End-Game Victory Points'}</span>
            </div>
            <h1 className="font-medieval text-2xl sm:text-3xl font-extrabold tracking-wide">
              {isSerbian ? 'Računač poena za Keyflower' : 'Keyflower Score Calculator'}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              {isSerbian
                ? 'Unesite sakupljene zgrade, resurse na ambarima, zimske bonuse, brodove i preostalo zlato za svakog igrača.'
                : 'Enter village tiles, barn stored resources, winter bonus cards, boats, and gold for each player.'}
            </p>
          </div>

          <button
            onClick={handleTriggerConfetti}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-medieval font-bold text-sm shadow-lg flex items-center justify-center gap-2 shrink-0 transition-all"
          >
            <Sparkles className="w-4 h-4 text-stone-950" />
            <span>{isSerbian ? 'Proslavi pobednika! 🎉' : 'Celebrate Winner! 🎉'}</span>
          </button>
        </div>

        {/* Live Leaderboard Standings */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 mt-6 pt-5 border-t border-white/10">
          {rankedPlayers.map((player, index) => {
            const total = calculateTotal(player);
            return (
              <div
                key={player.id}
                onClick={() => setActivePlayerTab(player.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  activePlayerTab === player.id
                    ? 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-400/50'
                    : 'bg-white/5 border-white/10 text-stone-300 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold">
                    {index === 0 ? '🥇 1.' : index === 1 ? '🥈 2.' : index === 2 ? '🥉 3.' : `#${index + 1}`}
                  </span>
                  <span className="font-mono text-[10px] text-amber-300">P{player.id}</span>
                </div>
                <div className="font-medieval font-bold text-xs truncate">{player.name}</div>
                <div className="font-mono font-black text-lg sm:text-xl text-amber-400 mt-1">
                  {total} <span className="text-[10px] text-stone-400 font-sans">VP</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Player Tab Switcher */}
      <div className="bg-stone-200/80 p-2 rounded-2xl flex items-center gap-1.5 overflow-x-auto border border-stone-300">
        {scores.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePlayerTab(p.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activePlayerTab === p.id
                ? 'bg-amber-700 text-white shadow-md'
                : 'bg-white text-stone-700 hover:bg-stone-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{p.name}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-xs font-mono ${
              activePlayerTab === p.id ? 'bg-amber-900 text-amber-200' : 'bg-stone-200 text-stone-800'
            }`}>
              {calculateTotal(p)} VP
            </span>
          </button>
        ))}
      </div>

      {/* Active Player Scoring Form */}
      <div className="bg-stone-50 rounded-3xl p-4 sm:p-6 border-2 border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 gap-2">
          <div>
            <span className="text-xs font-bold uppercase text-stone-500">
              {isSerbian ? 'Unos bodova za igrača:' : 'Scoring for player:'}
            </span>
            <h2 className="font-medieval text-xl sm:text-2xl font-black text-stone-900">
              {activePlayer.name}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={activePlayer.name}
              onChange={(e) => updatePlayer(activePlayer.id, 'name', e.target.value)}
              placeholder="Ime igrača"
              className="text-xs font-medium px-3 py-1.5 rounded-xl border border-stone-300 bg-white"
            />
            <div className="bg-amber-600 text-white px-4 py-1.5 rounded-xl font-mono font-black text-base shadow-xs">
              {calculateTotal(activePlayer)} VP
            </div>
          </div>
        </div>

        {/* Section 1: Printed & Upgraded VP on village tiles */}
        <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-stone-900 font-bold font-medieval text-sm sm:text-base">
            <Award className="w-5 h-5 text-amber-600" />
            <span>{isSerbian ? '1. Poeni na pločicama sela (Štampani / Nadograđeni)' : '1. Village Tiles Victory Points (Printed / Upgraded)'}</span>
          </div>
          <p className="text-xs text-stone-600">
            {isSerbian
              ? 'Zbrojite odštampane zvezdice sa pločica u selu (npr. Kovačnica 7, Zlatar 7, Pilana 7, Vajar 7, Bunar susedni tajlovi, početni dom 2 VP...).'
              : 'Sum up all printed star victory points from village tiles (e.g. Forge 7, Goldsmith 7, Sawmill 7, Sculptor 7, Well adjacent, Home 2 VP...).'}
          </p>

          <div className="flex items-center justify-between gap-3 flex-wrap">
            <label className="text-xs font-bold text-stone-700">
              {isSerbian ? 'Ukupno odštampanih poena sa tajlova:' : 'Total printed VP from tiles:'}
            </label>
            <TouchStepper
              value={activePlayer.printedVp}
              onChange={(val) => updatePlayer(activePlayer.id, 'printedVp', val)}
            />
          </div>
        </div>

        {/* Section 2: Autumn Storage Yards */}
        <div className="bg-orange-50/70 rounded-2xl p-4 border border-orange-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medieval font-bold text-sm sm:text-base text-orange-950">
              {isSerbian ? '2. Jesenja skladišta resursa (Ambar, Kovač, Kamenolom, Drvara)' : '2. Autumn Storage Yards (Barn, Blacksmith, Stone Yard, Timber Yard)'}
            </div>
          </div>
          <p className="text-xs text-orange-900/80">
            {isSerbian
              ? 'Resursi koji su uspešno prevezeni i fizički stoje na ovim jesenjim tajlovima na kraju igre (1 VP svaki, ili 2 VP ako je tajl nadograđen).'
              : 'Resources transported and physically located on these autumn tiles at end of game (1 VP each, or 2 VP if upgraded).'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Barn */}
            <div className="bg-white p-3 rounded-xl border border-orange-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-800">
                <span>{isSerbian ? 'Ambar (Barn)' : 'Barn (Any)'}</span>
                <label className="flex items-center gap-1 text-[11px] font-normal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activePlayer.isBarnUpgraded}
                    onChange={(e) => updatePlayer(activePlayer.id, 'isBarnUpgraded', e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>{isSerbian ? 'Nadograđen (2x)' : 'Upgraded (2x)'}</span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Resursa:' : 'Resources:'}</span>
                <TouchStepper
                  value={activePlayer.barnWood + activePlayer.barnStone + activePlayer.barnIron + activePlayer.barnGold}
                  onChange={(val) => updatePlayer(activePlayer.id, 'barnWood', val)}
                />
              </div>
            </div>

            {/* Blacksmith */}
            <div className="bg-white p-3 rounded-xl border border-orange-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-800">
                <span>{isSerbian ? 'Kovač (Gvožđe)' : 'Blacksmith (Iron)'}</span>
                <label className="flex items-center gap-1 text-[11px] font-normal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activePlayer.isBlacksmithUpgraded}
                    onChange={(e) => updatePlayer(activePlayer.id, 'isBlacksmithUpgraded', e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>{isSerbian ? 'Nadograđen' : 'Upgraded'}</span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Gvožđa:' : 'Iron count:'}</span>
                <TouchStepper
                  value={activePlayer.blacksmithIron}
                  onChange={(val) => updatePlayer(activePlayer.id, 'blacksmithIron', val)}
                />
              </div>
            </div>

            {/* Stone Yard */}
            <div className="bg-white p-3 rounded-xl border border-orange-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-800">
                <span>{isSerbian ? 'Kamenolom (Kamen)' : 'Stone Yard (Stone)'}</span>
                <label className="flex items-center gap-1 text-[11px] font-normal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activePlayer.isStoneYardUpgraded}
                    onChange={(e) => updatePlayer(activePlayer.id, 'isStoneYardUpgraded', e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>{isSerbian ? 'Nadograđen' : 'Upgraded'}</span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Kamena:' : 'Stone count:'}</span>
                <TouchStepper
                  value={activePlayer.stoneYardStone}
                  onChange={(val) => updatePlayer(activePlayer.id, 'stoneYardStone', val)}
                />
              </div>
            </div>

            {/* Timber Yard */}
            <div className="bg-white p-3 rounded-xl border border-orange-200 text-xs space-y-2">
              <div className="flex items-center justify-between font-bold text-stone-800">
                <span>{isSerbian ? 'Drvara (Drvo)' : 'Timber Yard (Wood)'}</span>
                <label className="flex items-center gap-1 text-[11px] font-normal cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activePlayer.isTimberYardUpgraded}
                    onChange={(e) => updatePlayer(activePlayer.id, 'isTimberYardUpgraded', e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>{isSerbian ? 'Nadograđen' : 'Upgraded'}</span>
                </label>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Drva:' : 'Wood count:'}</span>
                <TouchStepper
                  value={activePlayer.timberYardWood}
                  onChange={(val) => updatePlayer(activePlayer.id, 'timberYardWood', val)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Winter Scoring Tiles */}
        <div className="bg-sky-50/70 rounded-2xl p-4 border border-blue-200 shadow-xs space-y-4">
          <div className="font-medieval font-bold text-sm sm:text-base text-blue-950">
            {isSerbian ? '3. Zimske bodovne pločice (Winter Tiles)' : '3. Winter Scoring Tiles'}
          </div>
          <p className="text-xs text-blue-900/80">
            {isSerbian
              ? 'Popunite polja samo za one zimske pločice koje se nalaze u selu ovog igrača:'
              : 'Fill only for the winter tiles owned in this player village:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {/* Keythedral */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 flex items-center justify-between">
              <div>
                <span className="font-bold block text-stone-900">Keythedral</span>
                <span className="text-stone-500 text-[11px]">{isSerbian ? 'Ravno 12 poena' : '12 points flat'}</span>
              </div>
              <input
                type="checkbox"
                checked={activePlayer.keythedral}
                onChange={(e) => updatePlayer(activePlayer.id, 'keythedral', e.target.checked)}
                className="w-5 h-5 rounded text-blue-600 cursor-pointer"
              />
            </div>

            {/* Key Market */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Key Market (2 VP po zelenom radniku)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Zelenih radnika:' : 'Green meeples:'}</span>
                <TouchStepper
                  value={activePlayer.keyMarketGreenMeeples}
                  onChange={(val) => updatePlayer(activePlayer.id, 'keyMarketGreenMeeples', val)}
                />
              </div>
            </div>

            {/* Mercer's Guild */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Mercer\'s Guild (5 VP po setu 3 resursa)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Setova (D+K+G):' : 'Sets (W+S+I):'}</span>
                <TouchStepper
                  value={activePlayer.mercerResourceSets}
                  onChange={(val) => updatePlayer(activePlayer.id, 'mercerResourceSets', val)}
                />
              </div>
            </div>

            {/* Scholar */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Scholar (3 VP po izabranoj veštini)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Veština izabranog tipa:' : 'Chosen skills:'}</span>
                <TouchStepper
                  value={activePlayer.scholarChosenSkills}
                  onChange={(val) => updatePlayer(activePlayer.id, 'scholarChosenSkills', val)}
                />
              </div>
            </div>

            {/* Scribes */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Scribes (10 VP po setu 3 različite veštine)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Setova sve 3 veštine:' : 'Full 3-skill sets:'}</span>
                <TouchStepper
                  value={activePlayer.scribesSkillSets}
                  onChange={(val) => updatePlayer(activePlayer.id, 'scribesSkillSets', val)}
                />
              </div>
            </div>

            {/* Village Hall */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Village Hall (1 VP po radniku izabrane boje)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Radnika te boje:' : 'Meeples of colour:'}</span>
                <TouchStepper
                  value={activePlayer.villageHallChosenMeeples}
                  onChange={(val) => updatePlayer(activePlayer.id, 'villageHallChosenMeeples', val)}
                />
              </div>
            </div>

            {/* Watermill */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Watermill (1 VP po izabranom resursu)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Resursa tog tipa:' : 'Resources count:'}</span>
                <TouchStepper
                  value={activePlayer.watermillChosenResources}
                  onChange={(val) => updatePlayer(activePlayer.id, 'watermillChosenResources', val)}
                />
              </div>
            </div>

            {/* Windmill */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Windmill (5 VP za svakih 5 resursa)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Setova od 5 resursa:' : 'Sets of 5 res:'}</span>
                <TouchStepper
                  value={activePlayer.windmillAnyResourceSets5}
                  onChange={(val) => updatePlayer(activePlayer.id, 'windmillAnyResourceSets5', val)}
                />
              </div>
            </div>

            {/* Apothecary */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Apothecary (3 VP za svakih 5 radnika)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Setova od 5 radnika:' : 'Sets of 5 meeples:'}</span>
                <TouchStepper
                  value={activePlayer.apothecaryMeeplesSets5}
                  onChange={(val) => updatePlayer(activePlayer.id, 'apothecaryMeeplesSets5', val)}
                />
              </div>
            </div>

            {/* Craftsman's Guild */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Craftsman\'s Guild (3 VP po setu P+C+Ž)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Setova (Plavi+Crveni+Žuti):' : 'B+R+Y Sets:'}</span>
                <TouchStepper
                  value={activePlayer.craftsmanMeepleSets3}
                  onChange={(val) => updatePlayer(activePlayer.id, 'craftsmanMeepleSets3', val)}
                />
              </div>
            </div>

            {/* Jeweller */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Jeweller (2 VP po zlatu)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Komada zlata:' : 'Gold count:'}</span>
                <TouchStepper
                  value={activePlayer.jewellerGold}
                  onChange={(val) => updatePlayer(activePlayer.id, 'jewellerGold', val)}
                />
              </div>
            </div>

            {/* Key Guild */}
            <div className="bg-white p-3 rounded-xl border border-blue-200 space-y-1">
              <span className="font-bold block text-stone-900">Key Guild (10 VP za svakih 5 veština)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Setova od 5 veština:' : 'Sets of 5 skills:'}</span>
                <TouchStepper
                  value={activePlayer.keyGuildSkillsSets5}
                  onChange={(val) => updatePlayer(activePlayer.id, 'keyGuildSkillsSets5', val)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Boats, Turn Orders & Unused Gold */}
        <div className="bg-cyan-50/60 rounded-2xl p-4 border border-cyan-200 shadow-xs space-y-4">
          <div className="font-medieval font-bold text-sm sm:text-base text-cyan-950">
            {isSerbian ? '4. Brodovi osvojeni u zimi, Redosled i Zlato' : '4. Boats Won in Winter, Turn Order & Unused Gold'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {/* Keyflower Boat */}
            <div className="bg-white p-3 rounded-xl border border-cyan-200 space-y-2">
              <span className="font-bold block text-stone-900">Keyflower Brod (Transportni kapacitet)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Ukupan transport:' : 'Transport capacity:'}</span>
                <TouchStepper
                  value={activePlayer.keyflowerTransportCapacity}
                  onChange={(val) => updatePlayer(activePlayer.id, 'keyflowerTransportCapacity', val)}
                />
              </div>
              <label className="flex items-center gap-1.5 text-[11px] text-amber-900 cursor-pointer pt-1 border-t border-stone-100">
                <input
                  type="checkbox"
                  checked={activePlayer.hasBoat2bDouble}
                  onChange={(e) => updatePlayer(activePlayer.id, 'hasBoat2bDouble', e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>{isSerbian ? 'Letnji Brod 2b (Duplira transport i bodove!)' : 'Boat 2b (Doubles points!)'}</span>
              </label>
            </div>

            {/* Sea Bastion */}
            <div className="bg-white p-3 rounded-xl border border-cyan-200 space-y-1">
              <span className="font-bold block text-stone-900">Sea Bastion (1 VP po tajlu u putnoj petlji)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Tajlova u petlji:' : 'Tiles in loop:'}</span>
                <TouchStepper
                  value={activePlayer.seaBastionLoopTiles}
                  onChange={(val) => updatePlayer(activePlayer.id, 'seaBastionLoopTiles', val)}
                />
              </div>
            </div>

            {/* Sea Breese */}
            <div className="bg-white p-3 rounded-xl border border-cyan-200 space-y-1">
              <span className="font-bold block text-stone-900">Sea Breese (Brodovi spojeni rekom)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Poeni sa brodova:' : 'Boat river points:'}</span>
                <TouchStepper
                  value={activePlayer.seaBreeseBoatPoints}
                  onChange={(val) => updatePlayer(activePlayer.id, 'seaBreeseBoatPoints', val)}
                />
              </div>
            </div>

            {/* Flipper & Ianvincible */}
            <div className="bg-white p-3 rounded-xl border border-cyan-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">Flipper (2 VP)</span>
                <input
                  type="checkbox"
                  checked={activePlayer.hasFlipperBoat}
                  onChange={(e) => updatePlayer(activePlayer.id, 'hasFlipperBoat', e.target.checked)}
                  className="rounded text-cyan-600 cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">Ianvincible (5 VP)</span>
                <input
                  type="checkbox"
                  checked={activePlayer.hasIanvincibleBoat}
                  onChange={(e) => updatePlayer(activePlayer.id, 'hasIanvincibleBoat', e.target.checked)}
                  className="rounded text-cyan-600 cursor-pointer"
                />
              </div>
            </div>

            {/* White Wind */}
            <div className="bg-white p-3 rounded-xl border border-cyan-200 space-y-1">
              <span className="font-bold block text-stone-900">White Wind (1 VP po preostalom radniku)</span>
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-500">{isSerbian ? 'Radnika:' : 'Workers:'}</span>
                <TouchStepper
                  value={activePlayer.whiteWindUnusedWorkers}
                  onChange={(val) => updatePlayer(activePlayer.id, 'whiteWindUnusedWorkers', val)}
                />
              </div>
            </div>

            {/* Turn Order Connected Roads & Gold */}
            <div className="bg-white p-3 rounded-xl border border-cyan-200 space-y-2">
              <div className="flex items-center justify-between gap-1">
                <span className="text-stone-700 font-bold">{isSerbian ? 'Puteva na redosledima (1 VP):' : 'Turn order roads:'}</span>
                <TouchStepper
                  value={activePlayer.turnOrderConnectedRoads}
                  onChange={(val) => updatePlayer(activePlayer.id, 'turnOrderConnectedRoads', val)}
                />
              </div>
              <div className="flex items-center justify-between gap-1 pt-1 border-t border-stone-100">
                <span className="text-stone-700 font-bold">{isSerbian ? 'Preostalo zlato (1 VP):' : 'Unallocated Gold:'}</span>
                <TouchStepper
                  value={activePlayer.unusedGold}
                  onChange={(val) => updatePlayer(activePlayer.id, 'unusedGold', val)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
