import React from 'react';
import { GameState, KeyflowerTile } from '../types/game';
import { HexTile } from './HexTile';
import { 
  Users, 
  Crown, 
  Eye, 
  Ship, 
  Flag, 
  Sparkles, 
  Package, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { BOAT_ARRIVAL_DATA } from '../data/rules';

interface SetupViewProps {
  gameState: GameState;
  isSerbian: boolean;
  onOpenSecretWinter: () => void;
  onStartSpring: () => void;
  onSelectTileModal: (tile: KeyflowerTile) => void;
}

export const SetupView: React.FC<SetupViewProps> = ({
  gameState,
  isSerbian,
  onOpenSecretWinter,
  onStartSpring,
  onSelectTileModal,
}) => {
  const startingPlayer = gameState.players.find((p) => p.isStartingPlayer) || gameState.players[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Hero Card / Setup Overview */}
      <div className="bg-gradient-to-br from-amber-900 via-stone-900 to-amber-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>{isSerbian ? 'Priprema nove partije' : 'New Game Setup'}</span>
              <span className="bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                {gameState.playerCount} {isSerbian ? 'Igrača' : 'Players'}
              </span>
            </div>
            <h1 className="font-medieval text-2xl sm:text-3xl font-extrabold tracking-wide">
              {isSerbian ? 'Priprema i početni raspored' : 'Setup & Initial Layout'}
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
              {isSerbian
                ? 'Svakom igraču je dodeljen početni dom i tajni zimski tajlovi. Postavite brodove i redoslede na ivicu stola.'
                : 'Each player has been assigned a Home tile and secret Winter tiles. Place boats and turn order tiles at the edge of the board.'}
            </p>
          </div>

          <button
            onClick={onStartSpring}
            className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 active:scale-95 text-white font-medieval font-bold text-base rounded-2xl shadow-lg hover:shadow-emerald-900/40 transition-all flex items-center justify-center gap-2 shrink-0 border border-emerald-400/40"
          >
            <span>{isSerbian ? 'Započni Proleće' : 'Start Spring Season'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Quick starting player spotlight */}
        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 bg-purple-900/60 border border-purple-500/40 px-3.5 py-2 rounded-xl text-purple-200">
            <Crown className="w-4 h-4 text-amber-300 shrink-0" />
            <span>
              {isSerbian ? 'Početni igrač (ljubičasta figura): ' : 'Starting Player (Purple worker): '}
              <strong className="text-white font-bold">
                {isSerbian ? `Igrač ${startingPlayer.id}` : `Player ${startingPlayer.id}`}
                {startingPlayer.homeTile && ` (${startingPlayer.homeTile.nameSr})`}
              </strong>
            </span>
          </div>

          <button
            onClick={onOpenSecretWinter}
            className="flex items-center gap-2 bg-blue-600/80 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-xl transition-all border border-blue-400/30 shadow-md active:scale-95"
          >
            <Eye className="w-4 h-4 text-sky-200" />
            <span>{isSerbian ? 'Pregledaj tajne zimske tajlove' : 'View Secret Winter Tiles'}</span>
          </button>
        </div>
      </div>

      {/* Players Home & Winter Tiles Grid */}
      <div className="bg-stone-50 rounded-3xl p-4 sm:p-6 border-2 border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-700" />
            <h2 className="font-medieval text-lg sm:text-xl font-bold text-stone-900">
              {isSerbian ? 'Dodeljeni početni domovi igračima' : 'Assigned Player Home Tiles'}
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {isSerbian ? 'Najmanji broj = početni igrač' : 'Lowest number = start player'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameState.players.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl p-4 border-2 transition-all ${
                p.isStartingPlayer
                  ? 'bg-purple-50/90 border-purple-400 ring-2 ring-purple-300'
                  : 'bg-white border-stone-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                    p.isStartingPlayer ? 'bg-purple-700 text-white' : 'bg-stone-200 text-stone-800'
                  }`}>
                    {p.id}
                  </div>
                  <span className="font-medieval font-bold text-sm text-stone-900">
                    {isSerbian ? `Igrač ${p.id}` : `Player ${p.id}`}
                  </span>
                </div>

                {p.isStartingPlayer && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-purple-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                    <Crown className="w-3 h-3 text-amber-300" />
                    {isSerbian ? '1. Igrač' : 'Start Player'}
                  </span>
                )}
              </div>

              {p.homeTile && (
                <div 
                  onClick={() => onSelectTileModal(p.homeTile!)}
                  className="bg-purple-100/60 hover:bg-purple-100 p-2.5 rounded-xl border border-purple-200 cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-600" />
                    <span className="font-semibold text-xs text-purple-950">
                      {isSerbian ? p.homeTile.nameSr : p.homeTile.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-purple-700 bg-purple-200/80 px-2 py-0.5 rounded font-mono font-bold">
                    {isSerbian ? '5 puteva' : '5 roads'}
                  </span>
                </div>
              )}

              <div className="mt-3 pt-2.5 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-600">
                <span>{isSerbian ? 'Tajnih zimskih tajlova:' : 'Secret winter tiles:'}</span>
                <span className="font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {p.secretWinterTiles.length} {isSerbian ? 'tajla' : 'tiles'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Used Boats & Turn Order Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Boats in Play */}
        <div className="bg-stone-50 rounded-3xl p-4 sm:p-5 border-2 border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Ship className="w-5 h-5 text-cyan-700" />
              <h3 className="font-medieval text-base sm:text-lg font-bold text-stone-900">
                {isSerbian ? `Aktivni brodovi (${gameState.boatTiles.length})` : `Boats in Play (${gameState.boatTiles.length})`}
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {isSerbian ? '1 po igraču' : '1 per player'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gameState.boatTiles.map((boat) => {
              const arrival = BOAT_ARRIVAL_DATA[boat.id];
              return (
                <div
                  key={boat.id}
                  onClick={() => onSelectTileModal(boat)}
                  className="bg-white hover:bg-cyan-50/60 p-3 rounded-2xl border border-stone-200 hover:border-cyan-400 cursor-pointer transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-medieval font-bold text-xs text-cyan-950">
                      {isSerbian ? boat.nameSr : boat.name}
                    </span>
                    <span className="text-[10px] font-bold bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded">
                      {boat.minPlayers}+
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-2">
                    {isSerbian ? boat.descriptionSr : boat.description}
                  </p>
                  {arrival && (
                    <div className="mt-2 text-[10px] bg-cyan-50 p-1.5 rounded text-cyan-900 font-medium border border-cyan-100">
                      🌊 {isSerbian ? `Po sezoni: ${arrival.spring.noteSr}` : `Per season: ${arrival.spring.noteEn}`}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Turn Order Tiles */}
        <div className="bg-stone-50 rounded-3xl p-4 sm:p-5 border-2 border-stone-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-rose-700" />
              <h3 className="font-medieval text-base sm:text-lg font-bold text-stone-900">
                {isSerbian ? `Pločice redosleda (${gameState.turnOrderTiles.length})` : `Turn Order Tiles (${gameState.turnOrderTiles.length})`}
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              {isSerbian ? 'Licitacija za brodove' : 'Bidding for boats'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gameState.turnOrderTiles.map((turnTile) => (
              <div
                key={turnTile.id}
                onClick={() => onSelectTileModal(turnTile)}
                className="bg-white hover:bg-rose-50/60 p-3 rounded-2xl border border-stone-200 hover:border-rose-300 cursor-pointer transition-all shadow-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medieval font-bold text-xs text-rose-950">
                    {isSerbian ? turnTile.nameSr : turnTile.name}
                  </span>
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded">
                    {turnTile.number}
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 line-clamp-2">
                  {isSerbian ? turnTile.descriptionSr : turnTile.description}
                </p>
                <div className="mt-2 text-[10px] bg-rose-50 p-1.5 rounded text-rose-900 font-medium border border-rose-100">
                  {turnTile.number === 1
                    ? (isSerbian ? '👑 Donosi ljubičastu figuru 1. igrača' : '👑 Grants purple start player worker')
                    : (isSerbian ? `Izbor broda #${turnTile.number}` : `Boat pick #${turnTile.number}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checklist Reminder for the table */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-950 text-xs sm:text-sm">
        <h4 className="font-bold flex items-center gap-2 mb-2 text-amber-900">
          <CheckCircle2 className="w-4 h-4 text-amber-700" />
          {isSerbian ? 'Podsetnik za pripremu na stolu:' : 'Tabletop Setup Checklist:'}
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-amber-900/90 list-disc list-inside">
          <li>{isSerbian ? 'Svaki igrač vuče 8 nasumičnih radnika (plavi, crveni, žuti) iz vrećice iza paravana.' : 'Each player draws 8 random workers (blue, red, yellow) from cloth bag behind screen.'}</li>
          <li>{isSerbian ? 'Zeleni radnici, veštine i resursi ostaju sa strane kao opšta zaliha.' : 'Green workers, skill tiles, and resources form general supply.'}</li>
          <li>{isSerbian ? 'Preostali neiskorišćeni početni domovi, brodovi i zimski tajlovi se vraćaju u kutiju.' : 'Surplus home, boat, and winter tiles are placed back in the game box.'}</li>
          <li>{isSerbian ? 'Letnje (12) i jesenje (12) pločice složite u dve odvojene gomile sa strane.' : 'Place 12 summer and 12 autumn tiles in two separate face-down piles.'}</li>
        </ul>
      </div>
    </div>
  );
};
