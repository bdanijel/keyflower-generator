import React, { useState } from 'react';
import { PlayerSetup } from '../types/game';
import { HexTile } from './HexTile';
import { KeyflowerTile } from '../types/game';
import { Eye, EyeOff, ShieldCheck, X, ChevronLeft, ChevronRight, User } from 'lucide-react';

interface SecretWinterModalProps {
  players: PlayerSetup[];
  isSerbian: boolean;
  onClose: () => void;
  onSelectTileModal: (tile: KeyflowerTile) => void;
}

export const SecretWinterModal: React.FC<SecretWinterModalProps> = ({
  players,
  isSerbian,
  onClose,
  onSelectTileModal,
}) => {
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const currentPlayer = players[activePlayerIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-stone-50 rounded-3xl shadow-2xl border-4 border-blue-900/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-800/80 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-sky-300" />
            </div>
            <div>
              <h3 className="font-medieval text-base sm:text-lg font-bold">
                {isSerbian ? 'Tajni zimski tajlovi' : 'Secret Winter Tiles'}
              </h3>
              <p className="text-xs text-sky-200">
                {isSerbian ? 'Predajte telefon igraču da tajno pogleda svoje tajlove' : 'Pass device to the player to view secretly'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Switcher Tabs */}
        <div className="bg-stone-200/80 p-2 flex items-center gap-1.5 overflow-x-auto border-b border-stone-300">
          {players.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePlayerIndex(idx);
                setIsRevealed(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activePlayerIndex === idx
                  ? 'bg-blue-800 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-300/80'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{isSerbian ? `Igrač ${p.id}` : `Player ${p.id}`}</span>
              {p.isStartingPlayer && <span className="text-amber-300 text-xs">👑</span>}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center">
          <div className="w-full text-center mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {isSerbian ? 'Trenutni pregled za:' : 'Currently viewing for:'}
            </span>
            <h2 className="font-medieval text-xl sm:text-2xl font-black text-stone-900 mt-0.5">
              {isSerbian ? `Igrač ${currentPlayer.id}` : `Player ${currentPlayer.id}`}
              {currentPlayer.homeTile && (
                <span className="text-sm font-normal text-purple-700 ml-2">
                  ({isSerbian ? currentPlayer.homeTile.nameSr : currentPlayer.homeTile.name})
                </span>
              )}
            </h2>
          </div>

          {!isRevealed ? (
            <div className="w-full max-w-md bg-stone-100 rounded-2xl p-6 text-center border-2 border-dashed border-stone-300 flex flex-col items-center gap-4 my-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shadow-inner">
                <EyeOff className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-stone-800 text-base mb-1">
                  {isSerbian ? 'Tajlovi su sakriveni' : 'Tiles are hidden'}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed max-w-xs mx-auto">
                  {isSerbian
                    ? 'Uverite se da drugi igrači ne gledaju u ekran pre nego što otkrijete svoje zimske tajlove.'
                    : 'Ensure other players are not looking at the screen before revealing your secret winter tiles.'}
                </p>
              </div>
              <button
                onClick={() => setIsRevealed(true)}
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <Eye className="w-4 h-4" />
                <span>{isSerbian ? 'Prikaži moje tajlove' : 'Reveal My Secret Tiles'}</span>
              </button>
            </div>
          ) : (
            <div className="w-full space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between bg-sky-50 border border-sky-200 p-2.5 rounded-xl">
                <span className="text-xs text-blue-900 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  {isSerbian ? `Dodeljeno tajlova: ${currentPlayer.secretWinterTiles.length}` : `Assigned tiles: ${currentPlayer.secretWinterTiles.length}`}
                </span>
                <button
                  onClick={() => setIsRevealed(false)}
                  className="px-2.5 py-1 bg-stone-700 hover:bg-stone-800 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>{isSerbian ? 'Sakrij tajlove' : 'Hide Tiles'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentPlayer.secretWinterTiles.map((tile) => (
                  <HexTile
                    key={tile.id}
                    tile={tile}
                    isSerbian={isSerbian}
                    onSelect={onSelectTileModal}
                  />
                ))}
              </div>

              <p className="text-[11px] text-center text-stone-500 italic">
                {isSerbian
                  ? 'U zimi ćete odabrati 1 ili više ovih tajlova za javnu licitaciju.'
                  : 'In winter, you will choose 1 or more of these tiles to offer for auction.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer Next/Prev Player */}
        <div className="p-3 sm:p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <button
            disabled={activePlayerIndex === 0}
            onClick={() => {
              setActivePlayerIndex((prev) => Math.max(0, prev - 1));
              setIsRevealed(false);
            }}
            className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white hover:bg-stone-200 disabled:opacity-40 disabled:pointer-events-none border border-stone-300 flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{isSerbian ? 'Prethodni igrač' : 'Previous Player'}</span>
          </button>

          <button
            disabled={activePlayerIndex === players.length - 1}
            onClick={() => {
              setActivePlayerIndex((prev) => Math.min(players.length - 1, prev + 1));
              setIsRevealed(false);
            }}
            className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-800 text-white disabled:opacity-40 disabled:pointer-events-none shadow-sm flex items-center gap-1"
          >
            <span>{isSerbian ? 'Sledeći igrač' : 'Next Player'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
