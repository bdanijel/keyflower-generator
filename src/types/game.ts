export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type TileCategory = 
  | 'home'
  | 'boat'
  | 'turn_order'
  | 'spring'
  | 'summer'
  | 'autumn'
  | 'winter';

export type TileType = 
  | 'production'
  | 'transport'
  | 'scoring'
  | 'special'
  | 'boat'
  | 'home'
  | 'turn_order';

export type ResourceType = 'wood' | 'stone' | 'iron' | 'gold' | 'skill' | 'meeple' | 'vp' | 'transport' | 'green_meeple';

export interface TileUpgradeInfo {
  cost: string;
  costSr: string;
  pointsFront: number;
  pointsBack: number;
  effectFront: string;
  effectFrontSr: string;
  effectBack: string;
  effectBackSr: string;
}

export interface SummerBoatSides {
  sideA: {
    name: string;
    nameSr: string;
    description: string;
    descriptionSr: string;
    icon: string;
  };
  sideB: {
    name: string;
    nameSr: string;
    description: string;
    descriptionSr: string;
    icon: string;
  };
}

export interface KeyflowerTile {
  id: string;
  number?: number;
  name: string;
  nameSr: string;
  category: TileCategory;
  type: TileType;
  roads: number; // Page 8: Home (5), Spring (4), Summer (3), Autumn (2), Winter (1), Summer boats (0)
  minPlayers?: number; // e.g. for boats: Keyflower 1+, Sea Bastion 2+, Sea Breese 3+, Flipper 4+, Ianvincible 5+, White Wind 6+
  icon: string;
  primaryColor: string;
  resourcesProduced?: ResourceType[];
  description: string;
  descriptionSr: string;
  scoringRule?: string;
  scoringRuleSr?: string;
  upgrade?: TileUpgradeInfo;
  isSummerBoat?: boolean;
  boatSides?: SummerBoatSides;
  selectedBoatSide?: 'A' | 'B';
  basePoints?: number;
}

export interface PlayerSetup {
  id: number;
  name: string;
  homeTile: KeyflowerTile | null;
  secretWinterTiles: KeyflowerTile[];
  isStartingPlayer: boolean;
}

export interface BoatWorkerAllocation {
  boatId: string;
  boatName: string;
  springWorkers: number;
  springSkills: number;
  summerWorkers: number;
  summerSkills: number;
  autumnWorkers: number;
  autumnSkills: number;
  winterWorkers: number;
  winterSkills: number;
}

export interface GameState {
  playerCount: number;
  currentSeason: Season | 'setup' | 'scoring';
  homeTiles: KeyflowerTile[];
  boatTiles: KeyflowerTile[];
  turnOrderTiles: KeyflowerTile[];
  springTiles: KeyflowerTile[];
  summerTiles: KeyflowerTile[];
  autumnTiles: KeyflowerTile[];
  winterTilesPool: KeyflowerTile[];
  winterIntroducedTiles: KeyflowerTile[];
  players: PlayerSetup[];
  seed: number;
  generatedAt: string;
}

export interface PlayerScore {
  playerId: number;
  playerName: string;
  printedVp: number;
  upgradedVp: number;
  barnWood: number;
  barnStone: number;
  barnIron: number;
  barnGold: number;
  winterTilesVp: number;
  boatVp: number;
  turnOrderVp: number;
  unusedGold: number;
  totalVp: number;
  details: string[];
}
