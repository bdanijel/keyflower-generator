import React, { useState, useEffect } from 'react';
import { GameState, KeyflowerTile } from './types/game';
import { generateGameSetup } from './data/rules';
import { Header } from './components/Header';
import { SetupView } from './components/SetupView';
import { SeasonGenerator } from './components/SeasonGenerator';
import { AllInOneView } from './components/AllInOneView';
import { TileCompendium } from './components/TileCompendium';
import { ScoreCalculator } from './components/ScoreCalculator';
import { RuleReference } from './components/RuleReference';
import { TileModal } from './components/TileModal';
import { SecretWinterModal } from './components/SecretWinterModal';
import { SyncModal } from './components/SyncModal';
import { 
  Sparkles, 
  Calendar, 
  Layers, 
  BookOpen, 
  Trophy, 
  HelpCircle,
  Eye,
  RotateCcw,
  Share2,
  Smartphone
} from 'lucide-react';

export default function App() {
  const [isSerbian, setIsSerbian] = useState<boolean>(() => {
    const saved = localStorage.getItem('keyflower_lang');
    return saved ? saved === 'sr' : true;
  });

  const [playerCount, setPlayerCount] = useState<number>(() => {
    const params = new URLSearchParams(window.location.search);
    const pParam = params.get('p');
    if (pParam) {
      const p = parseInt(pParam, 10);
      if (p >= 2 && p <= 6) return p;
    }
    const saved = localStorage.getItem('keyflower_players');
    return saved ? parseInt(saved, 10) || 4 : 4;
  });

  const [gameState, setGameState] = useState<GameState>(() => {
    const params = new URLSearchParams(window.location.search);
    const seedParam = params.get('seed');
    const pParam = params.get('p');
    const initialPlayers = pParam ? parseInt(pParam, 10) || 4 : 4;
    if (seedParam) {
      const seed = parseInt(seedParam, 10);
      if (!isNaN(seed)) {
        return generateGameSetup(initialPlayers, seed);
      }
    }
    return generateGameSetup(initialPlayers);
  });

  const [activeTab, setActiveTab] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const sParam = params.get('s');
    if (sParam && ['setup', 'seasons', 'all_in_one', 'compendium', 'score', 'rules'].includes(sParam)) {
      return sParam;
    }
    return 'setup';
  });

  const [selectedModalTile, setSelectedModalTile] = useState<KeyflowerTile | null>(null);
  const [showSecretWinterModal, setShowSecretWinterModal] = useState<boolean>(false);
  const [showSyncModal, setShowSyncModal] = useState<boolean>(false);

  // Sync language to localStorage
  useEffect(() => {
    localStorage.setItem('keyflower_lang', isSerbian ? 'sr' : 'en');
  }, [isSerbian]);

  // Sync player count to localStorage
  useEffect(() => {
    localStorage.setItem('keyflower_players', playerCount.toString());
  }, [playerCount]);

  // Keep URL updated with current seed and player count so refreshing keeps state
  useEffect(() => {
    if (gameState.seed) {
      const url = new URL(window.location.href);
      url.searchParams.set('seed', gameState.seed.toString());
      url.searchParams.set('p', gameState.playerCount.toString());
      url.searchParams.set('s', activeTab);
      window.history.replaceState({}, '', url.toString());
    }
  }, [gameState.seed, gameState.playerCount, activeTab]);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    const newGame = generateGameSetup(count);
    setGameState(newGame);
  };

  const handleRegenerate = () => {
    const newGame = generateGameSetup(playerCount);
    setGameState(newGame);
  };

  const handleLoadGameByCode = (seed: number, count: number) => {
    setPlayerCount(count);
    const loadedGame = generateGameSetup(count, seed);
    setGameState(loadedGame);
  };

  const toggleLanguage = () => {
    setIsSerbian((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f1e8] text-stone-800 selection:bg-amber-500 selection:text-white pb-20 sm:pb-12">
      {/* Header */}
      <Header
        playerCount={playerCount}
        onPlayerCountChange={handlePlayerCountChange}
        onRegenerate={handleRegenerate}
        isSerbian={isSerbian}
        onToggleLanguage={toggleLanguage}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenSync={() => setShowSyncModal(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {activeTab === 'setup' && (
          <SetupView
            gameState={gameState}
            isSerbian={isSerbian}
            onOpenSecretWinter={() => setShowSecretWinterModal(true)}
            onStartSpring={() => setActiveTab('seasons')}
            onSelectTileModal={(tile) => setSelectedModalTile(tile)}
          />
        )}

        {activeTab === 'seasons' && (
          <SeasonGenerator
            gameState={gameState}
            isSerbian={isSerbian}
            onSelectTileModal={(tile) => setSelectedModalTile(tile)}
            onGoToScoreCalculator={() => setActiveTab('score')}
            onGoToSetup={() => setActiveTab('setup')}
          />
        )}

        {activeTab === 'all_in_one' && (
          <AllInOneView
            gameState={gameState}
            isSerbian={isSerbian}
            onSelectTileModal={(tile) => setSelectedModalTile(tile)}
          />
        )}

        {activeTab === 'compendium' && (
          <TileCompendium
            isSerbian={isSerbian}
            onSelectTileModal={(tile) => setSelectedModalTile(tile)}
          />
        )}

        {activeTab === 'score' && (
          <ScoreCalculator
            gameState={gameState}
            isSerbian={isSerbian}
          />
        )}

        {activeTab === 'rules' && (
          <RuleReference isSerbian={isSerbian} />
        )}
      </main>

      {/* Bottom Floating Mobile Bar for quick seasonal & secret tiles access */}
      <div className="fixed bottom-0 inset-x-0 z-30 bg-stone-900/95 backdrop-blur-md border-t border-stone-800 p-2 sm:hidden flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('setup')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold ${
            activeTab === 'setup' ? 'text-amber-400' : 'text-stone-400'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{isSerbian ? 'Priprema' : 'Setup'}</span>
        </button>

        <button
          onClick={() => setActiveTab('seasons')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold ${
            activeTab === 'seasons' ? 'text-amber-400' : 'text-stone-400'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{isSerbian ? 'Sezone' : 'Seasons'}</span>
        </button>

        <button
          onClick={() => setShowSecretWinterModal(true)}
          className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold bg-blue-700 text-white shadow-md active:scale-95"
        >
          <Eye className="w-4 h-4 text-sky-200" />
          <span>{isSerbian ? 'Zimski tajli' : 'Secret Winter'}</span>
        </button>

        <button
          onClick={() => setActiveTab('all_in_one')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold ${
            activeTab === 'all_in_one' ? 'text-amber-400' : 'text-stone-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{isSerbian ? 'Sve' : 'All'}</span>
        </button>

        <button
          onClick={() => setActiveTab('score')}
          className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold ${
            activeTab === 'score' ? 'text-amber-400' : 'text-stone-400'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>{isSerbian ? 'Bodovi' : 'Score'}</span>
        </button>

        <button
          onClick={() => setShowSyncModal(true)}
          className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[10px] font-bold text-amber-400 hover:text-amber-300"
        >
          <Share2 className="w-4 h-4" />
          <span>{isSerbian ? 'QR Sinhro' : 'Sync'}</span>
        </button>
      </div>

      {/* Sync / Pairing Modal */}
      {showSyncModal && (
        <SyncModal
          gameState={gameState}
          activeSeason={activeTab}
          isSerbian={isSerbian}
          onClose={() => setShowSyncModal(false)}
          onLoadGameByCode={handleLoadGameByCode}
        />
      )}

      {/* Zoomed Tile Modal */}
      {selectedModalTile && (
        <TileModal
          tile={selectedModalTile}
          isSerbian={isSerbian}
          onClose={() => setSelectedModalTile(null)}
        />
      )}

      {/* Secret Winter Pass-and-Play Modal */}
      {showSecretWinterModal && (
        <SecretWinterModal
          players={gameState.players}
          isSerbian={isSerbian}
          onClose={() => setShowSecretWinterModal(false)}
          onSelectTileModal={(tile) => setSelectedModalTile(tile)}
        />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-stone-300/80 py-6 text-center text-xs text-stone-600">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-medieval font-bold text-stone-800">Keyflower Generator</span>
            <span>•</span>
            <span>{isSerbian ? 'Dizajnirano za igranje na mobilnim telefonima i računarima' : 'Optimized for mobile table play & desktop'}</span>
          </div>
          <div className="text-stone-500">
            {isSerbian 
              ? 'Spremno za GitHub Pages (Projektni sajt)' 
              : 'GitHub Pages Project Site Ready'}
          </div>
        </div>
      </footer>
    </div>
  );
}
