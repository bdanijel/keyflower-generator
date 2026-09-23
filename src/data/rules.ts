import { ALL_TILES } from './tiles';
import { GameState, KeyflowerTile, PlayerSetup, Season } from '../types/game';

export interface PlayerCountConfig {
  players: number;
  homeTiles: number;
  boats: number;
  turnOrderTiles: number;
  springTiles: number;
  summerTiles: number;
  autumnTiles: number;
  winterTilesPerPlayer: number;
  winterMinMaxIntroduced: string;
}

export const PLAYER_COUNT_CONFIGS: Record<number, PlayerCountConfig> = {
  2: {
    players: 2,
    homeTiles: 2,
    boats: 2,
    turnOrderTiles: 1,
    springTiles: 6,
    summerTiles: 6,
    autumnTiles: 6,
    winterTilesPerPlayer: 3,
    winterMinMaxIntroduced: '2 - 6',
  },
  3: {
    players: 3,
    homeTiles: 3,
    boats: 3,
    turnOrderTiles: 2,
    springTiles: 7,
    summerTiles: 7,
    autumnTiles: 7,
    winterTilesPerPlayer: 3,
    winterMinMaxIntroduced: '3 - 9',
  },
  4: {
    players: 4,
    homeTiles: 4,
    boats: 4,
    turnOrderTiles: 3,
    springTiles: 8,
    summerTiles: 8,
    autumnTiles: 8,
    winterTilesPerPlayer: 3,
    winterMinMaxIntroduced: '4 - 12',
  },
  5: {
    players: 5,
    homeTiles: 5,
    boats: 5,
    turnOrderTiles: 4,
    springTiles: 9,
    summerTiles: 9,
    autumnTiles: 9,
    winterTilesPerPlayer: 2,
    winterMinMaxIntroduced: '5 - 10',
  },
  6: {
    players: 6,
    homeTiles: 6,
    boats: 6,
    turnOrderTiles: 4,
    springTiles: 10,
    summerTiles: 10,
    autumnTiles: 10,
    winterTilesPerPlayer: 2,
    winterMinMaxIntroduced: '6 - 12',
  },
};

// Boat meeple & skill capacities based on the rulebook
export interface BoatArrivalGuide {
  boatName: string;
  boatNameSr: string;
  minPlayers: number;
  spring: { meeples: number; skills: number; noteSr?: string; noteEn?: string };
  summer: { meeples: number; skills: number; noteSr?: string; noteEn?: string };
  autumn: { meeples: number; skills: number; noteSr?: string; noteEn?: string };
  winter: { meeples: number; skills: number; noteSr: string; noteEn: string };
}

export const BOAT_ARRIVAL_DATA: Record<string, BoatArrivalGuide> = {
  boat_keyflower: {
    boatName: 'Keyflower (1+)',
    boatNameSr: 'Keyflower (1+ igrača)',
    minPlayers: 1,
    spring: { meeples: 3, skills: 1, noteSr: '3 radnika + 1 žeton veštine', noteEn: '3 meeples + 1 skill tile' },
    summer: { meeples: 3, skills: 1, noteSr: '3 radnika + 1 žeton veštine', noteEn: '3 meeples + 1 skill tile' },
    autumn: { meeples: 3, skills: 1, noteSr: '3 radnika + 1 žeton veštine', noteEn: '3 meeples + 1 skill tile' },
    winter: { meeples: 0, skills: 0, noteSr: 'U zimi nema radnika - brod se uzima u selo!', noteEn: 'No workers in winter - boat is taken into village!' },
  },
  boat_sea_bastion: {
    boatName: 'Sea Bastion (2+)',
    boatNameSr: 'Sea Bastion (2+ igrača)',
    minPlayers: 2,
    spring: { meeples: 2, skills: 1, noteSr: '2 radnika + 1 žeton veštine', noteEn: '2 meeples + 1 skill tile' },
    summer: { meeples: 2, skills: 1, noteSr: '2 radnika + 1 žeton veštine', noteEn: '2 meeples + 1 skill tile' },
    autumn: { meeples: 2, skills: 1, noteSr: '2 radnika + 1 žeton veštine', noteEn: '2 meeples + 1 skill tile' },
    winter: { meeples: 0, skills: 0, noteSr: 'U zimi nema radnika - brod se uzima u selo!', noteEn: 'No workers in winter - boat is taken into village!' },
  },
  boat_sea_breese: {
    boatName: 'Sea Breese (3+)',
    boatNameSr: 'Sea Breese (3+ igrača)',
    minPlayers: 3,
    spring: { meeples: 2, skills: 1, noteSr: '2 radnika + 1 žeton veštine', noteEn: '2 meeples + 1 skill tile' },
    summer: { meeples: 2, skills: 1, noteSr: '2 radnika + 1 žeton veštine', noteEn: '2 meeples + 1 skill tile' },
    autumn: { meeples: 2, skills: 1, noteSr: '2 radnika + 1 žeton veštine', noteEn: '2 meeples + 1 skill tile' },
    winter: { meeples: 0, skills: 0, noteSr: 'U zimi nema radnika - brod se uzima u selo!', noteEn: 'No workers in winter - boat is taken into village!' },
  },
  boat_flipper: {
    boatName: 'Flipper (4+)',
    boatNameSr: 'Flipper (4+ igrača)',
    minPlayers: 4,
    spring: { meeples: 2, skills: 0, noteSr: '2 radnika (bez veštine)', noteEn: '2 meeples (no skill)' },
    summer: { meeples: 2, skills: 0, noteSr: '2 radnika (bez veštine)', noteEn: '2 meeples (no skill)' },
    autumn: { meeples: 2, skills: 0, noteSr: '2 radnika (bez veštine)', noteEn: '2 meeples (no skill)' },
    winter: { meeples: 0, skills: 0, noteSr: 'U zimi nema radnika - brod se uzima u selo!', noteEn: 'No workers in winter - boat is taken into village!' },
  },
  boat_ianvincible: {
    boatName: 'Ianvincible (5+)',
    boatNameSr: 'Ianvincible (5+ igrača)',
    minPlayers: 5,
    spring: { meeples: 2, skills: 0, noteSr: '2 radnika (bez veštine)', noteEn: '2 meeples (no skill)' },
    summer: { meeples: 2, skills: 0, noteSr: '2 radnika (bez veštine)', noteEn: '2 meeples (no skill)' },
    autumn: { meeples: 2, skills: 0, noteSr: '2 radnika (bez veštine)', noteEn: '2 meeples (no skill)' },
    winter: { meeples: 0, skills: 0, noteSr: 'U zimi nema radnika - brod se uzima u selo!', noteEn: 'No workers in winter - boat is taken into village!' },
  },
  boat_white_wind: {
    boatName: 'White Wind (6+)',
    boatNameSr: 'White Wind (6+ igrača)',
    minPlayers: 6,
    spring: { meeples: 1, skills: 1, noteSr: '1 radnik + 1 žeton veštine', noteEn: '1 meeple + 1 skill tile' },
    summer: { meeples: 1, skills: 1, noteSr: '1 radnik + 1 žeton veštine', noteEn: '1 meeple + 1 skill tile' },
    autumn: { meeples: 1, skills: 1, noteSr: '1 radnik + 1 žeton veštine', noteEn: '1 meeple + 1 skill tile' },
    winter: { meeples: 0, skills: 0, noteSr: 'U zimi nema radnika - brod se uzima u selo!', noteEn: 'No workers in winter - boat is taken into village!' },
  },
};

// Fisher-Yates shuffle
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generateGameSetup(playerCount: number): GameState {
  const config = PLAYER_COUNT_CONFIGS[playerCount] || PLAYER_COUNT_CONFIGS[4];

  // 1. Home Tiles
  const allHomeTiles = ALL_TILES.filter((t) => t.category === 'home');
  const shuffledHomeTiles = shuffleArray(allHomeTiles).slice(0, config.homeTiles);
  // Find minimum number to determine starting player
  let lowestHomeNumber = 999;
  let startingPlayerIndex = 0;
  shuffledHomeTiles.forEach((tile, index) => {
    if (tile.number && tile.number < lowestHomeNumber) {
      lowestHomeNumber = tile.number;
      startingPlayerIndex = index;
    }
  });

  // 2. Boat Tiles (Keyflower 1+, Sea Bastion 2+, Sea Breese 3+, Flipper 4+, Ianvincible 5+, White Wind 6+)
  const allBoats = ALL_TILES.filter((t) => t.category === 'boat');
  const usedBoats = allBoats.filter((b) => (b.minPlayers || 1) <= config.players);

  // 3. Turn Order Tiles
  const allTurnOrders = ALL_TILES.filter((t) => t.category === 'turn_order');
  const usedTurnOrders = allTurnOrders.slice(0, config.turnOrderTiles);

  // 4. Spring Tiles (Randomly select config.springTiles from 12)
  const allSpringTiles = ALL_TILES.filter((t) => t.category === 'spring');
  const springTiles = shuffleArray(allSpringTiles).slice(0, config.springTiles);

  // 5. Summer Tiles (Randomly select config.summerTiles from 12: 8 regular + 4 summer boats)
  // For summer boats, randomly select side A or side B!
  const allSummerTiles = ALL_TILES.filter((t) => t.category === 'summer');
  const rawSummerTiles = shuffleArray(allSummerTiles).slice(0, config.summerTiles);
  const summerTiles: KeyflowerTile[] = rawSummerTiles.map((tile) => {
    if (tile.isSummerBoat) {
      const selectedSide: 'A' | 'B' = Math.random() < 0.5 ? 'A' : 'B';
      return {
        ...tile,
        selectedBoatSide: selectedSide,
      };
    }
    return tile;
  });

  // 6. Autumn Tiles (Randomly select config.autumnTiles from 12)
  const allAutumnTiles = ALL_TILES.filter((t) => t.category === 'autumn');
  const autumnTiles = shuffleArray(allAutumnTiles).slice(0, config.autumnTiles);

  // 7. Winter Tiles (Total 12)
  // Deal config.winterTilesPerPlayer to each player secretly
  const allWinterTiles = ALL_TILES.filter((t) => t.category === 'winter');
  const shuffledWinterTiles = shuffleArray(allWinterTiles);

  const players: PlayerSetup[] = [];
  let winterIndex = 0;

  for (let i = 0; i < config.players; i++) {
    const playerWinterTiles = shuffledWinterTiles.slice(
      winterIndex,
      winterIndex + config.winterTilesPerPlayer
    );
    winterIndex += config.winterTilesPerPlayer;

    players.push({
      id: i + 1,
      name: `Igrač ${i + 1} / Player ${i + 1}`,
      homeTile: shuffledHomeTiles[i],
      secretWinterTiles: playerWinterTiles,
      isStartingPlayer: i === startingPlayerIndex,
    });
  }

  // Winter pool of dealt tiles (all tiles that were given to players)
  const winterTilesPool = shuffledWinterTiles.slice(0, config.players * config.winterTilesPerPlayer);

  return {
    playerCount: config.players,
    currentSeason: 'setup',
    homeTiles: shuffledHomeTiles,
    boatTiles: usedBoats,
    turnOrderTiles: usedTurnOrders,
    springTiles,
    summerTiles,
    autumnTiles,
    winterTilesPool,
    winterIntroducedTiles: [], // populated when players choose in winter or simulated
    players,
    seed: Date.now(),
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}
