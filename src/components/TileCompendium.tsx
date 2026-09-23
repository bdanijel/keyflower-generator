import React, { useState, useMemo } from 'react';
import { ALL_TILES } from '../data/tiles';
import { KeyflowerTile, TileCategory } from '../types/game';
import { HexTile } from './HexTile';
import { Search, Filter, BookOpen, Layers } from 'lucide-react';

interface TileCompendiumProps {
  isSerbian: boolean;
  onSelectTileModal: (tile: KeyflowerTile) => void;
}

export const TileCompendium: React.FC<TileCompendiumProps> = ({ isSerbian, onSelectTileModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', nameEn: 'All Tiles (64)', nameSr: 'Svi tajlovi (64)' },
    { id: 'spring', nameEn: 'Spring (12)', nameSr: 'Proleće (12)' },
    { id: 'summer', nameEn: 'Summer (12)', nameSr: 'Leto (12)' },
    { id: 'autumn', nameEn: 'Autumn (12)', nameSr: 'Jesen (12)' },
    { id: 'winter', nameEn: 'Winter (12)', nameSr: 'Zima (12)' },
    { id: 'home', nameEn: 'Homes (6)', nameSr: 'Domovi (6)' },
    { id: 'boat', nameEn: 'Boats (6)', nameSr: 'Brodovi (6)' },
    { id: 'turn_order', nameEn: 'Turn Order (4)', nameSr: 'Redosled (4)' },
  ];

  const filteredTiles = useMemo(() => {
    return ALL_TILES.filter((tile) => {
      const matchesCategory =
        selectedCategory === 'all' || tile.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesName =
        tile.name.toLowerCase().includes(query) ||
        tile.nameSr.toLowerCase().includes(query);
      const matchesDesc =
        tile.description.toLowerCase().includes(query) ||
        tile.descriptionSr.toLowerCase().includes(query);
      const matchesUpgrade =
        tile.upgrade?.effectBack.toLowerCase().includes(query) ||
        tile.upgrade?.effectBackSr.toLowerCase().includes(query);

      return matchesCategory && (matchesName || matchesDesc || matchesUpgrade);
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Search and filter controls */}
      <div className="bg-stone-900 text-white rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>{isSerbian ? 'Katalog svih pločica u igri' : 'Complete Tile Directory'}</span>
        </div>
        <h1 className="font-medieval text-2xl sm:text-3xl font-extrabold">
          {isSerbian ? 'Enciklopedija Keyflower tajlova' : 'Keyflower Tile Compendium'}
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isSerbian ? 'Pretraži tajl po nazivu, dejstvu ili nadogradnji...' : 'Search tile by name, effect or upgrade...'}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-800 text-white placeholder-stone-400 border border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {isSerbian ? cat.nameSr : cat.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Tiles */}
      <div className="bg-stone-50 rounded-3xl p-4 sm:p-6 border-2 border-stone-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase text-stone-500">
            {isSerbian ? `Prikazano: ${filteredTiles.length} tajlova` : `Showing: ${filteredTiles.length} tiles`}
          </span>
          <span className="text-xs text-stone-500">
            {isSerbian ? 'Kliknite na pločicu za uvećani prikaz i detalje' : 'Click any tile for zoomed modal details'}
          </span>
        </div>

        {filteredTiles.length === 0 ? (
          <div className="text-center py-16 text-stone-500">
            <p className="font-bold text-base">
              {isSerbian ? 'Nema pronađenih tajlova.' : 'No tiles found.'}
            </p>
            <p className="text-xs mt-1">
              {isSerbian ? 'Pokušajte sa drugačijim pojmom za pretragu.' : 'Try a different search term.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTiles.map((tile) => (
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
