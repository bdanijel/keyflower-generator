import React from 'react';
import { 
  Dices, 
  Users, 
  Languages, 
  RotateCcw, 
  Layers, 
  Calendar, 
  BookOpen, 
  Trophy, 
  HelpCircle,
  Sparkles,
  Compass
} from 'lucide-react';

interface HeaderProps {
  playerCount: number;
  onPlayerCountChange: (count: number) => void;
  onRegenerate: () => void;
  isSerbian: boolean;
  onToggleLanguage: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  playerCount,
  onPlayerCountChange,
  onRegenerate,
  isSerbian,
  onToggleLanguage,
  activeTab,
  onTabChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md border-b border-amber-900/40 shadow-xl text-stone-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        {/* Top Navbar Row */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Logo & Branding */}
          <div 
            onClick={() => onTabChange('setup')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-amber-900/40 border-2 border-amber-300 group-hover:scale-105 transition-all">
              <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-stone-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-medieval font-black text-lg sm:text-2xl tracking-wider text-amber-400 drop-shadow-sm">
                  KEYFLOWER
                </span>
                <span className="text-[10px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.2 rounded-md hidden xs:inline-block">
                  Generator
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-medium hidden sm:block">
                {isSerbian ? 'Generator nasumičnih tajlova i pravila' : 'Random Tile Generator & Rules Guide'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Player Count Selector */}
            <div className="flex items-center bg-stone-800/90 rounded-2xl p-1 border border-stone-700 shadow-inner">
              <div className="flex items-center gap-1 px-2 text-stone-400 text-xs font-bold hidden md:flex">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>{isSerbian ? 'Igrača:' : 'Players:'}</span>
              </div>
              {[2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => onPlayerCountChange(num)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center ${
                    playerCount === num
                      ? 'bg-amber-500 text-stone-950 shadow-md font-black scale-105'
                      : 'text-stone-300 hover:bg-stone-700 hover:text-white'
                  }`}
                  title={`${num} ${isSerbian ? 'igrača' : 'players'}`}
                >
                  {num}
                </button>
              ))}
            </div>

            {/* Regenerate Button */}
            <button
              onClick={onRegenerate}
              className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex items-center gap-1.5 border border-amber-300/60"
              title={isSerbian ? 'Izvuci ponovo nasumične tajlove' : 'Draw new random tiles'}
            >
              <Dices className="w-4 h-4" />
              <span className="hidden sm:inline">{isSerbian ? 'Nova igra' : 'New Game'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold"
              title="Promeni jezik / Switch Language"
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span>{isSerbian ? 'SR' : 'EN'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Row */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 border-t border-stone-800 scrollbar-none">
          <button
            onClick={() => onTabChange('setup')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'setup'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSerbian ? 'Priprema' : 'Setup'}</span>
          </button>

          <button
            onClick={() => onTabChange('seasons')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'seasons'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isSerbian ? 'Godišnja doba' : 'Seasons'}</span>
          </button>

          <button
            onClick={() => onTabChange('all_in_one')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'all_in_one'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isSerbian ? 'Sve pločice' : 'All Tiles'}</span>
          </button>

          <button
            onClick={() => onTabChange('compendium')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'compendium'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isSerbian ? 'Katalog tajlova' : 'Compendium'}</span>
          </button>

          <button
            onClick={() => onTabChange('score')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'score'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{isSerbian ? 'Računač poena' : 'Score Calculator'}</span>
          </button>

          <button
            onClick={() => onTabChange('rules')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'rules'
                ? 'bg-amber-500 text-stone-950 shadow-sm'
                : 'text-stone-300 hover:bg-stone-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isSerbian ? 'Pravila' : 'Rules'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
