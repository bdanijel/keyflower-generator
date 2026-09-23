import React, { useState } from 'react';
import { KeyflowerTile } from '../types/game';
import { getSeasonTheme, getTileIcon } from './HexTile';
import { X, Sparkles, Award, ShieldAlert, RotateCw, MapPin, ArrowRight, BookOpen } from 'lucide-react';

interface TileModalProps {
  tile: KeyflowerTile | null;
  isSerbian: boolean;
  onClose: () => void;
}

export const TileModal: React.FC<TileModalProps> = ({ tile, isSerbian, onClose }) => {
  const [showUpgraded, setShowUpgraded] = useState(false);
  const [boatSide, setBoatSide] = useState<'A' | 'B'>('A');

  if (!tile) return null;

  const theme = getSeasonTheme(tile.category);
  const displayName = isSerbian ? tile.nameSr : tile.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-stone-50 rounded-3xl shadow-2xl border-4 border-amber-900/20 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`p-4 sm:p-5 flex items-start justify-between ${theme.headerBg} relative`}>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-xs shadow-inner">
              {getTileIcon(tile.icon, 'w-8 h-8 text-white')}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-white/25 px-2 py-0.5 rounded-full">
                  {isSerbian ? theme.labelSr : theme.labelEn}
                </span>
                <span className="text-[11px] font-semibold bg-black/25 px-2 py-0.5 rounded-full">
                  {tile.roads === 0 
                    ? (isSerbian ? '0 Puteva' : '0 Roads')
                    : (isSerbian ? `${tile.roads} ${tile.roads === 1 ? 'Put' : 'Puta'}` : `${tile.roads} Roads`)}
                </span>
              </div>
              <h2 className="font-medieval text-lg sm:text-xl font-bold tracking-wide text-white drop-shadow-xs">
                {displayName}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-stone-800">
          
          {/* Summer Boat Side Selector */}
          {tile.isSummerBoat && tile.boatSides && (
            <div className="bg-amber-100/90 rounded-2xl p-4 border border-amber-300">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-xs uppercase tracking-wider text-amber-900">
                  {isSerbian ? 'Izbor strane letnjeg broda:' : 'Summer Boat Side Selection:'}
                </span>
                <div className="flex bg-amber-200/90 p-1 rounded-xl gap-1">
                  <button
                    onClick={() => setBoatSide('A')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      boatSide === 'A' ? 'bg-amber-600 text-white shadow' : 'text-amber-950 hover:bg-amber-300'
                    }`}
                  >
                    {isSerbian ? 'Strana A' : 'Side A'}
                  </button>
                  <button
                    onClick={() => setBoatSide('B')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      boatSide === 'B' ? 'bg-amber-600 text-white shadow' : 'text-amber-950 hover:bg-amber-300'
                    }`}
                  >
                    {isSerbian ? 'Strana B' : 'Side B'}
                  </button>
                </div>
              </div>

              {boatSide === 'A' ? (
                <div>
                  <h4 className="font-medieval font-bold text-amber-950 text-base mb-1">
                    {isSerbian ? tile.boatSides.sideA.nameSr : tile.boatSides.sideA.name}
                  </h4>
                  <p className="text-sm text-stone-800 leading-relaxed">
                    {isSerbian ? tile.boatSides.sideA.descriptionSr : tile.boatSides.sideA.description}
                  </p>
                </div>
              ) : (
                <div>
                  <h4 className="font-medieval font-bold text-amber-950 text-base mb-1">
                    {isSerbian ? tile.boatSides.sideB.nameSr : tile.boatSides.sideB.name}
                  </h4>
                  <p className="text-sm text-stone-800 leading-relaxed">
                    {isSerbian ? tile.boatSides.sideB.descriptionSr : tile.boatSides.sideB.description}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Standard Tile Description */}
          <div className="bg-stone-100 rounded-2xl p-4 border border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
              {isSerbian ? 'Opis i dejstvo' : 'Description & Action'}
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-stone-800 font-medium">
              {isSerbian ? tile.descriptionSr : tile.description}
            </p>
          </div>

          {/* Scoring Rules / End game */}
          {(tile.scoringRule || tile.scoringRuleSr) && (
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-1.5 text-blue-900 font-bold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4 text-blue-700" />
                <span>{isSerbian ? 'Pravilo bodovanja na kraju igre' : 'Game-End Scoring Rule'}</span>
              </div>
              <p className="text-sm text-blue-950 font-semibold leading-relaxed">
                {isSerbian ? tile.scoringRuleSr : tile.scoringRule}
              </p>
            </div>
          )}

          {/* Upgrade Section */}
          {tile.upgrade && (
            <div className="bg-amber-50/70 rounded-2xl p-4 border-2 border-amber-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <RotateCw className="w-4 h-4 text-amber-700" />
                  <span>{isSerbian ? 'Nadogradnja pločice' : 'Tile Upgrade'}</span>
                </div>
                <button
                  onClick={() => setShowUpgraded(!showUpgraded)}
                  className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs transition-colors"
                >
                  {showUpgraded 
                    ? (isSerbian ? 'Prikaži osnovnu stranu' : 'Show base side')
                    : (isSerbian ? 'Prikaži nadograđenu stranu' : 'Show upgraded side')}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className={`p-3 rounded-xl border transition-all ${
                  !showUpgraded ? 'bg-amber-100/90 border-amber-400 font-bold shadow-xs' : 'bg-white/80 border-stone-200 text-stone-600'
                }`}>
                  <div className="flex items-center justify-between text-stone-900 font-bold mb-1">
                    <span>{isSerbian ? 'Prednja strana (Osnovno)' : 'Front Side (Base)'}</span>
                    <span>⭐ {tile.upgrade.pointsFront} VP</span>
                  </div>
                  <p>{isSerbian ? tile.upgrade.effectFrontSr : tile.upgrade.effectFront}</p>
                </div>

                <div className={`p-3 rounded-xl border transition-all ${
                  showUpgraded ? 'bg-amber-200 border-amber-500 font-bold shadow-xs' : 'bg-white/80 border-stone-200 text-stone-600'
                }`}>
                  <div className="flex items-center justify-between text-amber-950 font-bold mb-1">
                    <span>{isSerbian ? 'Zadnja strana (Nadograđeno)' : 'Back Side (Upgraded)'}</span>
                    <span>⭐ {tile.upgrade.pointsBack} VP</span>
                  </div>
                  <p>{isSerbian ? tile.upgrade.effectBackSr : tile.upgrade.effectBack}</p>
                </div>
              </div>

              <div className="mt-3 text-xs text-amber-950 bg-amber-200/80 p-2.5 rounded-xl flex items-center justify-between font-semibold">
                <span>{isSerbian ? 'Cena nadogradnje:' : 'Upgrade Cost:'}</span>
                <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                  {isSerbian ? tile.upgrade.costSr : tile.upgrade.cost}
                </span>
              </div>
            </div>
          )}

          {/* Road Nuances */}
          <div className="bg-stone-100/70 p-3 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-start gap-2">
            <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-stone-700">
                {isSerbian ? 'Pravilo puteva: ' : 'Road Rule: '}
              </span>
              {tile.roads === 0
                ? (isSerbian ? 'Ovaj tajl nema puteve i ne zahteva povezivanje ivica.' : 'This tile has no roads and requires no edge matching.')
                : (isSerbian ? `Povezuje se na selo preko ${tile.roads} ${tile.roads === 1 ? 'puta' : 'puteva'}. Putevi sa susednih tajlova moraju se poklapati (put na put).` : `Connects to village via ${tile.roads} roads. Roads on adjacent tiles must match perfectly.`)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-stone-800 hover:bg-stone-900 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
          >
            {isSerbian ? 'Zatvori' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
