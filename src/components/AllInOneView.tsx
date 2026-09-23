import React, { useState } from 'react';
import { GameState, KeyflowerTile } from '../types/game';
import { HexTile } from './HexTile';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Printer, 
  ChevronDown, 
  ChevronUp, 
  Leaf, 
  Sun, 
  CloudSun, 
  Snowflake, 
  Ship, 
  Castle, 
  Flag 
} from 'lucide-react';

interface AllInOneViewProps {
  gameState: GameState;
  isSerbian: boolean;
  onSelectTileModal: (tile: KeyflowerTile) => void;
}

export const AllInOneView: React.FC<AllInOneViewProps> = ({
  gameState,
  isSerbian,
  onSelectTileModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const copySummaryToClipboard = () => {
    const text = `
=== KEYFLOWER SETUP (${gameState.playerCount} ${isSerbian ? 'Igrača' : 'Players'}) ===
Generisano / Generated: ${gameState.generatedAt}

[1. DOMOVI / HOMES]
${gameState.homeTiles.map((h, i) => `Igrač ${i + 1}: ${h.name} (${h.nameSr})`).join('\n')}

[2. PROLEĆE / SPRING (${gameState.springTiles.length})]
${gameState.springTiles.map((t) => `- ${t.name} (${t.nameSr}) [${t.roads} roads]`).join('\n')}

[3. LETO / SUMMER (${gameState.summerTiles.length})]
${gameState.summerTiles.map((t) => `- ${t.name} (${t.nameSr}) ${t.isSummerBoat ? `[Strana ${t.selectedBoatSide || 'A'}]` : ''}`).join('\n')}

[4. JESEN / AUTUMN (${gameState.autumnTiles.length})]
${gameState.autumnTiles.map((t) => `- ${t.name} (${t.nameSr})`).join('\n')}

[5. ZIMA BAZEN / WINTER POOL (${gameState.winterTilesPool.length})]
${gameState.winterTilesPool.map((t) => `- ${t.name} (${t.nameSr})`).join('\n')}

[6. BRODOVI / BOATS (${gameState.boatTiles.length})]
${gameState.boatTiles.map((b) => `- ${b.name}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner with Action Buttons */}
      <div className="bg-stone-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>{isSerbian ? 'Kompletan pregled partije' : 'Full Game Overview'}</span>
          </div>
          <h1 className="font-medieval text-2xl sm:text-3xl font-extrabold">
            {isSerbian ? 'Svi izvučeni tajlovi na jednom mestu' : 'All Drawn Tiles in One View'}
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            {isSerbian
              ? `Generisano za ${gameState.playerCount} igrača u ${gameState.generatedAt}`
              : `Generated for ${gameState.playerCount} players at ${gameState.generatedAt}`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copySummaryToClipboard}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-md"
          >
            {copied ? <Check className="w-4 h-4 text-stone-950" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (isSerbian ? 'Kopirano!' : 'Copied!') : (isSerbian ? 'Kopiraj tekst' : 'Copy Text')}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 active:scale-95 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border border-stone-700"
          >
            <Printer className="w-4 h-4" />
            <span>{isSerbian ? 'Štampaj' : 'Print'}</span>
          </button>
        </div>
      </div>

      {/* Spring Section */}
      <div className="bg-emerald-50/60 rounded-3xl p-4 sm:p-6 border-2 border-emerald-300 shadow-xs">
        <button
          onClick={() => toggleSection('spring')}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-700 text-white rounded-xl shadow-xs">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medieval text-lg sm:text-xl font-bold text-emerald-950">
                {isSerbian ? '1. Prolećni tajlovi' : '1. Spring Tiles'}
              </h3>
              <p className="text-xs text-emerald-800 font-medium">
                {gameState.springTiles.length} {isSerbian ? 'pločica' : 'tiles'}
              </p>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white/80 border border-emerald-200 text-emerald-800 group-hover:bg-emerald-100 transition-colors">
            {collapsedSections['spring'] ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </div>
        </button>

        {!collapsedSections['spring'] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 pt-4 border-t border-emerald-200">
            {gameState.springTiles.map((tile) => (
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

      {/* Summer Section */}
      <div className="bg-amber-50/60 rounded-3xl p-4 sm:p-6 border-2 border-amber-300 shadow-xs">
        <button
          onClick={() => toggleSection('summer')}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-600 text-white rounded-xl shadow-xs">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medieval text-lg sm:text-xl font-bold text-amber-950">
                {isSerbian ? '2. Letnji tajlovi (Uključujući letnje brodove)' : '2. Summer Tiles (Including Summer Boats)'}
              </h3>
              <p className="text-xs text-amber-800 font-medium">
                {gameState.summerTiles.length} {isSerbian ? 'pločica' : 'tiles'}
              </p>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white/80 border border-amber-200 text-amber-800 group-hover:bg-amber-100 transition-colors">
            {collapsedSections['summer'] ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </div>
        </button>

        {!collapsedSections['summer'] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 pt-4 border-t border-amber-200">
            {gameState.summerTiles.map((tile) => (
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

      {/* Autumn Section */}
      <div className="bg-orange-50/60 rounded-3xl p-4 sm:p-6 border-2 border-orange-300 shadow-xs">
        <button
          onClick={() => toggleSection('autumn')}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-orange-700 text-white rounded-xl shadow-xs">
              <CloudSun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medieval text-lg sm:text-xl font-bold text-orange-950">
                {isSerbian ? '3. Jesenji tajlovi' : '3. Autumn Tiles'}
              </h3>
              <p className="text-xs text-orange-800 font-medium">
                {gameState.autumnTiles.length} {isSerbian ? 'pločica' : 'tiles'}
              </p>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white/80 border border-orange-200 text-orange-800 group-hover:bg-orange-100 transition-colors">
            {collapsedSections['autumn'] ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </div>
        </button>

        {!collapsedSections['autumn'] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 pt-4 border-t border-orange-200">
            {gameState.autumnTiles.map((tile) => (
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

      {/* Winter Pool Section */}
      <div className="bg-sky-50/60 rounded-3xl p-4 sm:p-6 border-2 border-blue-300 shadow-xs">
        <button
          onClick={() => toggleSection('winter')}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-800 text-white rounded-xl shadow-xs">
              <Snowflake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medieval text-lg sm:text-xl font-bold text-blue-950">
                {isSerbian ? '4. Bazen zimskih tajlova (Podeljeni igračima)' : '4. Winter Tiles Pool (Dealt to Players)'}
              </h3>
              <p className="text-xs text-blue-800 font-medium">
                {gameState.winterTilesPool.length} {isSerbian ? 'tajlova ukupno podeljeno igračima' : 'tiles dealt to players'}
              </p>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white/80 border border-blue-200 text-blue-800 group-hover:bg-sky-100 transition-colors">
            {collapsedSections['winter'] ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </div>
        </button>

        {!collapsedSections['winter'] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 pt-4 border-t border-blue-200">
            {gameState.winterTilesPool.map((tile) => (
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
    </div>
  );
};
