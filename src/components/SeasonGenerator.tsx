import React, { useState } from 'react';
import { GameState, KeyflowerTile, Season } from '../types/game';
import { HexTile, getSeasonTheme } from './HexTile';
import { BOAT_ARRIVAL_DATA } from '../data/rules';
import { 
  Sun, 
  CloudSun, 
  Leaf, 
  Snowflake, 
  Ship, 
  Sparkles, 
  Info, 
  ArrowRight, 
  Check, 
  RotateCw, 
  ShieldAlert,
  Users,
  Eye,
  Shuffle
} from 'lucide-react';

interface SeasonGeneratorProps {
  gameState: GameState;
  isSerbian: boolean;
  onSelectTileModal: (tile: KeyflowerTile) => void;
  onGoToScoreCalculator: () => void;
  onGoToSetup: () => void;
}

export const SeasonGenerator: React.FC<SeasonGeneratorProps> = ({
  gameState,
  isSerbian,
  onSelectTileModal,
  onGoToScoreCalculator,
  onGoToSetup,
}) => {
  const [activeSeason, setActiveSeason] = useState<Season>('spring');
  const [winterSelectedTiles, setWinterSelectedTiles] = useState<string[]>(
    gameState.winterTilesPool.map((t) => t.id) // by default reveal all in pool
  );
  const [activeSummerBoatsState, setActiveSummerBoatsState] = useState<Record<string, 'A' | 'B'>>(() => {
    const initial: Record<string, 'A' | 'B'> = {};
    gameState.summerTiles.forEach((t) => {
      if (t.isSummerBoat) {
        initial[t.id] = t.selectedBoatSide || 'A';
      }
    });
    return initial;
  });

  const getTilesForSeason = (season: Season): KeyflowerTile[] => {
    switch (season) {
      case 'spring':
        return gameState.springTiles;
      case 'summer':
        return gameState.summerTiles.map((tile) => {
          if (tile.isSummerBoat) {
            return {
              ...tile,
              selectedBoatSide: activeSummerBoatsState[tile.id] || 'A',
            };
          }
          return tile;
        });
      case 'autumn':
        return gameState.autumnTiles;
      case 'winter':
        return gameState.winterTilesPool.filter((t) => winterSelectedTiles.includes(t.id));
    }
  };

  const currentTiles = getTilesForSeason(activeSeason);
  const seasonTheme = getSeasonTheme(activeSeason);

  const toggleWinterTile = (tileId: string) => {
    setWinterSelectedTiles((prev) =>
      prev.includes(tileId) ? prev.filter((id) => id !== tileId) : [...prev, tileId]
    );
  };

  const selectAllWinterTiles = () => {
    setWinterSelectedTiles(gameState.winterTilesPool.map((t) => t.id));
  };

  const randomizeSummerBoatSides = () => {
    const updated: Record<string, 'A' | 'B'> = {};
    gameState.summerTiles.forEach((t) => {
      if (t.isSummerBoat) {
        updated[t.id] = Math.random() < 0.5 ? 'A' : 'B';
      }
    });
    setActiveSummerBoatsState(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Season Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {/* Spring */}
        <button
          onClick={() => setActiveSeason('spring')}
          className={`p-3 sm:p-4 rounded-2xl font-medieval font-bold text-sm sm:text-base border-2 transition-all flex items-center justify-between ${
            activeSeason === 'spring'
              ? 'bg-emerald-700 text-white border-emerald-600 shadow-lg scale-[1.02]'
              : 'bg-emerald-50/80 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <Leaf className={`w-5 h-5 ${activeSeason === 'spring' ? 'text-emerald-200' : 'text-emerald-600'}`} />
            <span>{isSerbian ? '1. Proleće' : '1. Spring'}</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeSeason === 'spring' ? 'bg-white/20' : 'bg-emerald-200 text-emerald-900'}`}>
            {gameState.springTiles.length}
          </span>
        </button>

        {/* Summer */}
        <button
          onClick={() => setActiveSeason('summer')}
          className={`p-3 sm:p-4 rounded-2xl font-medieval font-bold text-sm sm:text-base border-2 transition-all flex items-center justify-between ${
            activeSeason === 'summer'
              ? 'bg-amber-600 text-white border-amber-500 shadow-lg scale-[1.02]'
              : 'bg-amber-50/80 text-amber-900 border-amber-300 hover:bg-amber-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sun className={`w-5 h-5 ${activeSeason === 'summer' ? 'text-amber-200' : 'text-amber-600'}`} />
            <span>{isSerbian ? '2. Leto' : '2. Summer'}</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeSeason === 'summer' ? 'bg-white/20' : 'bg-amber-200 text-amber-900'}`}>
            {gameState.summerTiles.length}
          </span>
        </button>

        {/* Autumn */}
        <button
          onClick={() => setActiveSeason('autumn')}
          className={`p-3 sm:p-4 rounded-2xl font-medieval font-bold text-sm sm:text-base border-2 transition-all flex items-center justify-between ${
            activeSeason === 'autumn'
              ? 'bg-orange-700 text-white border-orange-600 shadow-lg scale-[1.02]'
              : 'bg-orange-50/80 text-orange-900 border-orange-300 hover:bg-orange-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <CloudSun className={`w-5 h-5 ${activeSeason === 'autumn' ? 'text-orange-200' : 'text-orange-600'}`} />
            <span>{isSerbian ? '3. Jesen' : '3. Autumn'}</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeSeason === 'autumn' ? 'bg-white/20' : 'bg-orange-200 text-orange-900'}`}>
            {gameState.autumnTiles.length}
          </span>
        </button>

        {/* Winter */}
        <button
          onClick={() => setActiveSeason('winter')}
          className={`p-3 sm:p-4 rounded-2xl font-medieval font-bold text-sm sm:text-base border-2 transition-all flex items-center justify-between ${
            activeSeason === 'winter'
              ? 'bg-blue-800 text-white border-blue-700 shadow-lg scale-[1.02]'
              : 'bg-sky-50/80 text-blue-900 border-sky-300 hover:bg-sky-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <Snowflake className={`w-5 h-5 ${activeSeason === 'winter' ? 'text-sky-200' : 'text-blue-600'}`} />
            <span>{isSerbian ? '4. Zima' : '4. Winter'}</span>
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeSeason === 'winter' ? 'bg-white/20' : 'bg-sky-200 text-blue-900'}`}>
            {winterSelectedTiles.length}
          </span>
        </button>
      </div>

      {/* Season Banner Card */}
      <div className={`rounded-3xl p-5 sm:p-6 shadow-xl border-2 ${seasonTheme.border} ${seasonTheme.headerBg} relative overflow-hidden text-white`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-1 opacity-90">
              <span>{isSerbian ? 'Godišnje doba' : 'Season Round'}</span>
              <span>•</span>
              <span>{currentTiles.length} {isSerbian ? 'izvučenih tajlova' : 'drawn tiles'}</span>
            </div>
            <h1 className="font-medieval text-2xl sm:text-3xl font-extrabold tracking-wide">
              {activeSeason === 'spring' && (isSerbian ? 'Proleće - Novi počeci' : 'Spring Season - New Beginnings')}
              {activeSeason === 'summer' && (isSerbian ? 'Leto - Dolazak novih brodova' : 'Summer Season - Arrival of Boats')}
              {activeSeason === 'autumn' && (isSerbian ? 'Jesen - Prikupljanje i skladišta' : 'Autumn Season - Harvest & Storage')}
              {activeSeason === 'winter' && (isSerbian ? 'Zima - Konačno bodovanje' : 'Winter Season - The Final Auction')}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-2xl leading-relaxed">
              {activeSeason === 'spring' && (isSerbian
                ? 'Izvučene su prolećne pločice. Postavite radnike i veštine na brodove. Prvi igrač sa najmanjim brojem doma započinje licitaciju!'
                : 'Spring tiles are drawn. Place meeples & skill tiles on boats. Starting player with lowest home number starts bidding!')}
              {activeSeason === 'summer' && (isSerbian
                ? 'Izvučene su letnje pločice i letnji brodovi. Okrenite brodove i dodajte nove radnike iz vrećice i zalihe.'
                : 'Summer tiles and summer boats are drawn. Turn over boats and add new workers from bag and stock.')}
              {activeSeason === 'autumn' && (isSerbian
                ? 'Izvučene su jesenje pločice sa skladištima za bodovanje resursa. Popunite brodove novim radnicima i veštinama.'
                : 'Autumn tiles with resource scoring barns/yards are drawn. Refill boats with new workers and skills.')}
              {activeSeason === 'winter' && (isSerbian
                ? 'Igrači tajno biraju 1 ili više zimskih tajlova koje poseduju. Izabrani tajlovi se mešaju i otkrivaju za javnu licitaciju! Na brodove u zimi NE stižu novi radnici.'
                : 'Players secretly choose 1 or more winter tiles they hold. Chosen tiles are shuffled and revealed. In winter, NO new workers arrive on boats.')}
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2 shrink-0">
            {activeSeason === 'summer' && (
              <button
                onClick={randomizeSummerBoatSides}
                className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition-all flex items-center gap-1.5 backdrop-blur-xs border border-white/30 active:scale-95"
              >
                <Shuffle className="w-4 h-4" />
                <span>{isSerbian ? 'Nasumično okreni letnje brodove' : 'Randomize Summer Boats'}</span>
              </button>
            )}

            {activeSeason === 'winter' ? (
              <button
                onClick={onGoToScoreCalculator}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-stone-900 font-medieval font-bold text-sm shadow-lg transition-all flex items-center gap-2"
              >
                <span>{isSerbian ? 'Računač poena' : 'Score Calculator'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (activeSeason === 'spring') setActiveSeason('summer');
                  else if (activeSeason === 'summer') setActiveSeason('autumn');
                  else if (activeSeason === 'autumn') setActiveSeason('winter');
                }}
                className="px-5 py-3 rounded-2xl bg-white text-stone-900 hover:bg-stone-100 active:scale-95 font-medieval font-bold text-sm shadow-lg transition-all flex items-center gap-2"
              >
                <span>{isSerbian ? 'Sledeće doba' : 'Next Season'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Boat Arrivals Info Panel (Crucial for game master at table!) */}
      <div className="bg-stone-50 rounded-3xl p-4 sm:p-5 border-2 border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Ship className="w-5 h-5 text-cyan-700" />
            <h3 className="font-medieval text-base sm:text-lg font-bold text-stone-900">
              {isSerbian 
                ? `Dolazak radnika na brodove za ${activeSeason === 'spring' ? 'Proleće' : activeSeason === 'summer' ? 'Leto' : activeSeason === 'autumn' ? 'Jesen' : 'Zimu'}`
                : `Worker & Skill Arrivals on Boats for ${activeSeason.toUpperCase()}`}
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {activeSeason === 'winter' ? (isSerbian ? 'Nema radnika u zimi' : 'No arrivals in winter') : (isSerbian ? 'Izvucite iz vrećice i zalihe' : 'Draw from bag & supply')}
          </span>
        </div>

        {activeSeason === 'winter' ? (
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 text-xs text-blue-900">
            <strong className="font-bold text-sm block mb-1">
              ❄️ {isSerbian ? 'U zimi nema novih radnika na brodovima!' : 'No new workers on boats in winter!'}
            </strong>
            <p>
              {isSerbian
                ? 'Igrači licitiraju za same brodove i pločice redosleda. Pobednici licitacije uzimaju izabrane brodove u svoja sela na kraju sezone radi konačnih poena.'
                : 'Players bid directly for the boat tiles and turn order tiles. Winning players take the boat tiles into their villages at the end of winter for scoring.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {gameState.boatTiles.map((boat) => {
              const arrival = BOAT_ARRIVAL_DATA[boat.id];
              if (!arrival) return null;
              const seasonArrival =
                activeSeason === 'spring'
                  ? arrival.spring
                  : activeSeason === 'summer'
                  ? arrival.summer
                  : arrival.autumn;

              return (
                <div
                  key={boat.id}
                  className="bg-white p-3 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <span className="font-medieval font-bold text-xs text-stone-900 block truncate">
                      {isSerbian ? boat.nameSr : boat.name}
                    </span>
                    <span className="text-[11px] text-cyan-800 font-semibold">
                      {isSerbian ? seasonArrival.noteSr : seasonArrival.noteEn}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 bg-cyan-50 px-2 py-1 rounded-xl border border-cyan-200">
                    <span className="text-xs font-bold text-cyan-900">
                      👥 {seasonArrival.meeples}
                    </span>
                    {seasonArrival.skills > 0 && (
                      <span className="text-xs font-bold text-amber-800">
                        🔨 {seasonArrival.skills}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Special Winter Tiles Selector / Pass-the-phone filter */}
      {activeSeason === 'winter' && (
        <div className="bg-sky-50 rounded-3xl p-4 sm:p-5 border-2 border-sky-300 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-medieval text-base sm:text-lg font-bold text-blue-950 flex items-center gap-2">
                <Snowflake className="w-5 h-5 text-blue-700" />
                <span>{isSerbian ? 'Zimske pločice ponuđene za licitaciju' : 'Winter Tiles Selected for Auction'}</span>
              </h3>
              <p className="text-xs text-blue-900/80">
                {isSerbian
                  ? 'Kliknite na tajl da ga označite ako ga je igrač tajno ponudio za licitaciju, ili kliknite "Prikaži sve".'
                  : 'Click on a tile to toggle if a player chose it for auction, or click "Select All".'}
              </p>
            </div>
            <button
              onClick={selectAllWinterTiles}
              className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all shrink-0"
            >
              {isSerbian ? 'Označi sve tajlove iz bazena' : 'Select All Pool Tiles'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {gameState.winterTilesPool.map((tile) => {
              const isSelected = winterSelectedTiles.includes(tile.id);
              return (
                <button
                  key={tile.id}
                  onClick={() => toggleWinterTile(tile.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1 text-xs ${
                    isSelected
                      ? 'bg-blue-700 text-white border-blue-800 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-300 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medieval font-bold truncate text-[11px]">
                      {isSerbian ? tile.nameSr.split('(')[0] : tile.name}
                    </span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-sky-200 shrink-0" />}
                  </div>
                  <span className="text-[10px] opacity-80 font-mono">
                    ⭐ {tile.scoringRule ? (isSerbian ? 'Bodovanje' : 'Scoring') : 'VP'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tiles Grid */}
      <div className="bg-stone-50 rounded-3xl p-4 sm:p-6 border-2 border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="font-medieval text-lg sm:text-xl font-bold text-stone-900">
              {isSerbian ? 'Izvučene pločice za aukciju' : 'Tiles Available in Auction'}
            </h2>
          </div>
          <span className="text-xs text-stone-500 font-medium">
            {currentTiles.length} {isSerbian ? 'pločica na stolu' : 'tiles on table'}
          </span>
        </div>

        {currentTiles.length === 0 ? (
          <div className="text-center py-12 text-stone-500">
            <p className="font-bold text-base">
              {isSerbian ? 'Nema odabranih pločica.' : 'No tiles selected.'}
            </p>
            <p className="text-xs mt-1">
              {isSerbian ? 'Kliknite na zimske pločice iznad da ih dodate u aukciju.' : 'Click on winter tiles above to include them in the auction.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {currentTiles.map((tile) => (
              <HexTile
                key={tile.id}
                tile={tile}
                isSerbian={isSerbian}
                onSelect={onSelectTileModal}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Season Quick Rules Helper */}
      <div className="bg-amber-100/60 rounded-2xl p-4 border border-amber-300 text-stone-800 text-xs sm:text-sm">
        <div className="flex items-center gap-2 font-bold text-amber-900 mb-1">
          <Info className="w-4 h-4 text-amber-700" />
          <span>{isSerbian ? 'Podsetnik za pravila licitacije i proizvodnje:' : 'Bidding & Production Rules Quick Reminder:'}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-stone-700 mt-2">
          <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
            <strong className="block text-amber-950 font-bold mb-0.5">
              1. {isSerbian ? 'Boja radnika:' : 'Meeple Colour:'}
            </strong>
            {isSerbian
              ? 'Svi radnici na istom tajlu (i za licitaciju i za proizvodnju) MORAJU biti iste boje!'
              : 'All workers on the same tile (both for bidding and production) MUST match in colour!'}
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
            <strong className="block text-amber-950 font-bold mb-0.5">
              2. {isSerbian ? 'Prelicitiranje:' : 'Outbidding:'}
            </strong>
            {isSerbian
              ? 'Mora biti veći broj radnika. Poraženi radnici se mogu pomeriti na drugi tajl (zajedno) ili dopuniti.'
              : 'Must place strictly more workers. Outbid workers can be moved together elsewhere or reinforced.'}
          </div>
          <div className="bg-white/80 p-2.5 rounded-xl border border-amber-200">
            <strong className="block text-amber-950 font-bold mb-0.5">
              3. {isSerbian ? 'Proizvodnja (1-2-3):' : 'Production (1-2-3):'}
            </strong>
            {isSerbian
              ? '1. postavljanje = 1 radnik, 2. = 2 radnika, 3. = 3 radnika. Maksimalno 6 radnika po tajlu u sezoni!'
              : '1st use = 1 worker, 2nd use = 2 workers, 3rd use = 3 workers. Max 6 workers per tile in a season!'}
          </div>
        </div>
      </div>
    </div>
  );
};
