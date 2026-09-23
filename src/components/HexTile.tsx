import React, { useState } from 'react';
import { KeyflowerTile } from '../types/game';
import { 
  Trees, 
  Mountain, 
  Pickaxe, 
  Sparkles, 
  GraduationCap, 
  Users, 
  CircleDot, 
  Beer, 
  Hammer, 
  Anchor, 
  Wine, 
  BedDouble, 
  Wrench, 
  Award, 
  Warehouse, 
  Shield, 
  Boxes, 
  PartyPopper, 
  ShoppingBag, 
  Store, 
  Disc, 
  Landmark, 
  UserCheck, 
  BookOpen, 
  Scroll, 
  Building2, 
  Droplets, 
  Wind, 
  FlaskConical, 
  Briefcase, 
  Sparkle, 
  Key, 
  Compass, 
  Zap, 
  RefreshCw, 
  ShieldAlert, 
  Palette, 
  Ship, 
  Castle, 
  Flag,
  ArrowRight,
  Info,
  Layers,
  ChevronRight,
  RotateCw
} from 'lucide-react';

interface HexTileProps {
  tile: KeyflowerTile;
  isSerbian: boolean;
  onSelect?: (tile: KeyflowerTile) => void;
  showSeasonBadge?: boolean;
  compact?: boolean;
}

export const getTileIcon = (iconName: string, className: string = 'w-6 h-6') => {
  switch (iconName) {
    case 'axe':
    case 'trees': return <Trees className={className} />;
    case 'mountain': return <Mountain className={className} />;
    case 'pickaxe': return <Pickaxe className={className} />;
    case 'sparkles': return <Sparkles className={className} />;
    case 'graduation-cap': return <GraduationCap className={className} />;
    case 'users': return <Users className={className} />;
    case 'circle-dot': return <CircleDot className={className} />;
    case 'beer': return <Beer className={className} />;
    case 'hammer': return <Hammer className={className} />;
    case 'anchor': return <Anchor className={className} />;
    case 'wine': return <Wine className={className} />;
    case 'bed-double': return <BedDouble className={className} />;
    case 'wrench': return <Wrench className={className} />;
    case 'award': return <Award className={className} />;
    case 'warehouse': return <Warehouse className={className} />;
    case 'shield': return <Shield className={className} />;
    case 'boxes': return <Boxes className={className} />;
    case 'party-popper': return <PartyPopper className={className} />;
    case 'shopping-bag': return <ShoppingBag className={className} />;
    case 'store': return <Store className={className} />;
    case 'disc': return <Disc className={className} />;
    case 'landmark': return <Landmark className={className} />;
    case 'user-check': return <UserCheck className={className} />;
    case 'book-open': return <BookOpen className={className} />;
    case 'scroll': return <Scroll className={className} />;
    case 'building-2': return <Building2 className={className} />;
    case 'droplets': return <Droplets className={className} />;
    case 'wind': return <Wind className={className} />;
    case 'flask-conical': return <FlaskConical className={className} />;
    case 'briefcase': return <Briefcase className={className} />;
    case 'sparkle': return <Sparkle className={className} />;
    case 'key': return <Key className={className} />;
    case 'compass': return <Compass className={className} />;
    case 'zap': return <Zap className={className} />;
    case 'refresh-cw': return <RefreshCw className={className} />;
    case 'shield-alert': return <ShieldAlert className={className} />;
    case 'palette': return <Palette className={className} />;
    case 'ship': return <Ship className={className} />;
    case 'castle': return <Castle className={className} />;
    case 'flag': return <Flag className={className} />;
    case 'layers': return <Layers className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const getSeasonTheme = (category: string) => {
  switch (category) {
    case 'spring':
      return {
        bg: 'bg-emerald-50 hover:bg-emerald-100/80',
        border: 'border-emerald-500',
        headerBg: 'bg-emerald-700 text-emerald-50',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        accentText: 'text-emerald-800',
        labelSr: 'Proleće',
        labelEn: 'Spring',
        dotColor: 'bg-emerald-500',
      };
    case 'summer':
      return {
        bg: 'bg-amber-50 hover:bg-amber-100/80',
        border: 'border-amber-500',
        headerBg: 'bg-amber-600 text-amber-50',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
        accentText: 'text-amber-800',
        labelSr: 'Leto',
        labelEn: 'Summer',
        dotColor: 'bg-amber-500',
      };
    case 'autumn':
      return {
        bg: 'bg-orange-50 hover:bg-orange-100/80',
        border: 'border-orange-500',
        headerBg: 'bg-orange-700 text-orange-50',
        badgeBg: 'bg-orange-100 text-orange-800 border-orange-300',
        accentText: 'text-orange-800',
        labelSr: 'Jesen',
        labelEn: 'Autumn',
        dotColor: 'bg-orange-500',
      };
    case 'winter':
      return {
        bg: 'bg-sky-50 hover:bg-sky-100/80',
        border: 'border-blue-600',
        headerBg: 'bg-blue-800 text-sky-50',
        badgeBg: 'bg-sky-100 text-blue-900 border-sky-300',
        accentText: 'text-blue-900',
        labelSr: 'Zima',
        labelEn: 'Winter',
        dotColor: 'bg-blue-600',
      };
    case 'home':
      return {
        bg: 'bg-purple-50 hover:bg-purple-100/80',
        border: 'border-purple-500',
        headerBg: 'bg-purple-700 text-purple-50',
        badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
        accentText: 'text-purple-800',
        labelSr: 'Početni Dom',
        labelEn: 'Home Tile',
        dotColor: 'bg-purple-500',
      };
    case 'boat':
      return {
        bg: 'bg-cyan-50 hover:bg-cyan-100/80',
        border: 'border-cyan-600',
        headerBg: 'bg-cyan-800 text-cyan-50',
        badgeBg: 'bg-cyan-100 text-cyan-800 border-cyan-300',
        accentText: 'text-cyan-800',
        labelSr: 'Brod',
        labelEn: 'Boat',
        dotColor: 'bg-cyan-600',
      };
    case 'turn_order':
      return {
        bg: 'bg-rose-50 hover:bg-rose-100/80',
        border: 'border-rose-500',
        headerBg: 'bg-rose-700 text-rose-50',
        badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
        accentText: 'text-rose-800',
        labelSr: 'Redosled',
        labelEn: 'Turn Order',
        dotColor: 'bg-rose-500',
      };
    default:
      return {
        bg: 'bg-stone-50 hover:bg-stone-100',
        border: 'border-stone-400',
        headerBg: 'bg-stone-700 text-stone-50',
        badgeBg: 'bg-stone-100 text-stone-800 border-stone-300',
        accentText: 'text-stone-800',
        labelSr: 'Tajl',
        labelEn: 'Tile',
        dotColor: 'bg-stone-500',
      };
  }
};

export const HexTile: React.FC<HexTileProps> = ({
  tile,
  isSerbian,
  onSelect,
  showSeasonBadge = true,
  compact = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [activeSummerSide, setActiveSummerSide] = useState<'A' | 'B'>(
    tile.selectedBoatSide || 'A'
  );

  const theme = getSeasonTheme(tile.category);
  const displayName = isSerbian ? tile.nameSr : tile.name;

  // Handle summer boat special presentation
  if (tile.isSummerBoat && tile.boatSides) {
    const currentSideData =
      activeSummerSide === 'A' ? tile.boatSides.sideA : tile.boatSides.sideB;

    return (
      <div
        className={`relative flex flex-col rounded-2xl border-2 ${theme.border} ${theme.bg} shadow-md transition-all duration-200 hover:shadow-lg overflow-hidden group cursor-pointer`}
        onClick={() => onSelect && onSelect(tile)}
      >
        {/* Top bar with side toggle */}
        <div className={`px-3 py-2 flex items-center justify-between ${theme.headerBg}`}>
          <div className="flex items-center gap-1.5 min-w-0">
            {getTileIcon(tile.icon, 'w-4 h-4 shrink-0')}
            <span className="font-medieval font-bold text-xs sm:text-sm tracking-wide truncate">
              {isSerbian ? currentSideData.nameSr : currentSideData.name}
            </span>
          </div>
          <div
            className="flex items-center gap-1 shrink-0 bg-black/20 p-0.5 rounded-lg text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSummerSide('A')}
              className={`px-1.5 py-0.5 rounded font-bold text-[10px] transition-colors ${
                activeSummerSide === 'A'
                  ? 'bg-amber-400 text-stone-900 shadow-sm'
                  : 'text-amber-100 hover:text-white'
              }`}
            >
              Strana A
            </button>
            <button
              onClick={() => setActiveSummerSide('B')}
              className={`px-1.5 py-0.5 rounded font-bold text-[10px] transition-colors ${
                activeSummerSide === 'B'
                  ? 'bg-amber-400 text-stone-900 shadow-sm'
                  : 'text-amber-100 hover:text-white'
              }`}
            >
              Strana B
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3 flex-1 flex flex-col justify-between gap-2">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${theme.badgeBg}`}>
                {isSerbian ? 'Letnji brod (Bez puteva)' : 'Summer Boat (0 roads)'}
              </span>
              <span className="text-[10px] font-bold text-amber-900/70 uppercase">
                {isSerbian ? `Aktivno: Strana ${activeSummerSide}` : `Active: Side ${activeSummerSide}`}
              </span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              {isSerbian ? currentSideData.descriptionSr : currentSideData.description}
            </p>
          </div>

          <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-amber-900 font-medium">
            <span className="flex items-center gap-1">
              <Info className="w-3.5 h-3.5" />
              {isSerbian ? 'Klikni za detalje' : 'Tap for details'}
            </span>
            <ChevronRight className="w-4 h-4 text-amber-600 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col rounded-2xl border-2 ${theme.border} ${theme.bg} shadow-md transition-all duration-200 hover:shadow-lg overflow-hidden group cursor-pointer`}
      onClick={() => onSelect && onSelect(tile)}
    >
      {/* Header bar */}
      <div className={`px-3 py-2 flex items-center justify-between ${theme.headerBg}`}>
        <div className="flex items-center gap-1.5 min-w-0">
          {getTileIcon(tile.icon, 'w-4 h-4 shrink-0')}
          <span className="font-medieval font-bold text-xs sm:text-sm tracking-wide truncate">
            {displayName}
          </span>
        </div>
        {tile.upgrade && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(!isFlipped);
            }}
            title={isSerbian ? 'Okreni / Pogledaj nadogradnju' : 'Flip / View upgrade'}
            className="flex items-center gap-1 bg-white/20 hover:bg-white/30 active:scale-95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md transition-all shrink-0"
          >
            <RotateCw className="w-3 h-3" />
            <span>{isFlipped ? (isSerbian ? 'Osnovno' : 'Base') : (isSerbian ? 'Nadogradnja' : 'Upgraded')}</span>
          </button>
        )}
      </div>

      {/* Body */}
      <div className="p-3 flex-1 flex flex-col justify-between gap-2.5">
        <div>
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            {showSeasonBadge && (
              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${theme.badgeBg}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${theme.dotColor}`} />
                {isSerbian ? theme.labelSr : theme.labelEn}
              </span>
            )}
            <span className="text-[10px] font-semibold bg-stone-200/80 text-stone-700 px-1.5 py-0.5 rounded border border-stone-300">
              {tile.roads === 0
                ? isSerbian ? '0 puteva' : '0 roads'
                : isSerbian ? `${tile.roads} ${tile.roads === 1 ? 'put' : 'puta'}` : `${tile.roads} roads`}
            </span>
            {(tile.basePoints !== undefined && tile.basePoints > 0) && (
              <span className="text-[10px] font-bold bg-amber-200 text-amber-950 px-1.5 py-0.5 rounded border border-amber-300">
                ⭐ {tile.basePoints} VP
              </span>
            )}
            {tile.upgrade && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                isFlipped ? 'bg-amber-300 text-amber-950 border-amber-400' : 'bg-stone-100 text-stone-600 border-stone-200'
              }`}>
                {isFlipped ? `⭐ ${tile.upgrade.pointsBack} VP` : `⭐ ${tile.upgrade.pointsFront} VP`}
              </span>
            )}
          </div>

          {/* Description & Flip State */}
          {!tile.upgrade ? (
            <p className="text-xs text-stone-700 leading-relaxed line-clamp-3">
              {isSerbian ? (tile.scoringRuleSr || tile.descriptionSr) : (tile.scoringRule || tile.description)}
            </p>
          ) : isFlipped ? (
            <div className="bg-amber-100/80 rounded-lg p-2 border border-amber-300/80 text-xs">
              <div className="font-bold text-amber-900 flex items-center justify-between text-[11px] mb-1">
                <span>{isSerbian ? 'NADOGRAĐENA STRANA:' : 'UPGRADED SIDE:'}</span>
                <span className="text-amber-800 font-extrabold">{tile.upgrade.pointsBack} VP</span>
              </div>
              <p className="text-stone-800 font-medium">
                {isSerbian ? tile.upgrade.effectBackSr : tile.upgrade.effectBack}
              </p>
              <div className="mt-1 text-[10px] text-amber-800/80 font-mono">
                {isSerbian ? `Cena: ${tile.upgrade.costSr}` : `Cost: ${tile.upgrade.cost}`}
              </div>
            </div>
          ) : (
            <div className="text-xs">
              <p className="text-stone-700 leading-relaxed mb-1.5">
                {isSerbian ? tile.upgrade.effectFrontSr : tile.upgrade.effectFront}
              </p>
              <div className="text-[10px] text-stone-500 bg-stone-200/50 p-1.5 rounded flex items-center justify-between">
                <span>{isSerbian ? `Nadogradnja: ${tile.upgrade.costSr}` : `Upgrade: ${tile.upgrade.cost}`}</span>
                <ArrowRight className="w-3 h-3 text-stone-400" />
              </div>
            </div>
          )}
        </div>

        {/* Footer info tap */}
        <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-600 font-medium">
          <span className="flex items-center gap-1 group-hover:text-stone-900">
            <Info className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-700" />
            {isSerbian ? 'Prikaži detalje' : 'View details'}
          </span>
          <ChevronRight className="w-4 h-4 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-stone-700" />
        </div>
      </div>
    </div>
  );
};
