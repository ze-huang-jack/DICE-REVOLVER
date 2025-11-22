
import React from 'react';

export type DieValue = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Empty/Spent

export interface DieData {
  id: number;
  value: DieValue;
  isLocked: boolean;
  isRolling: boolean;
  sealedTurns: number; 
}

export type GameStatus = 'START' | 'PLAYING' | 'GAMEOVER' | 'VICTORY';
export type Difficulty = 'ROOKIE' | 'CYBERPSYCH' | 'ENDLESS';

export interface SessionStats {
  turnsTaken: number;
  maxDamageDealt: number;
  enemiesKilled: number;
}

export type WeaponTriggerType = 
    | 'SCATTER' 
    | 'PAIR' 
    | 'TWO_PAIR' 
    | 'THREE_KIND' 
    | 'FOUR_KIND' 
    | 'FIVE_KIND' 
    | 'SIX_KIND'        // Event Horizon
    | 'EIGHT_KIND'      // New: Excalibur
    | 'SMALL_STR' 
    | 'BIG_STR' 
    | 'TWO_SMALL_STR'   // New: Ragnarok
    | 'SUPER_STR'       // Prism Beam
    | 'FULL_HOUSE'
    | 'FIVE_PAIRS'      // New: Aegis
    | 'DOUBLE_TRIPLE'   // Inferno
    | 'FLAVOR';

export type WeaponType = 
  // --- TIER 1 (STARTERS) ---
  | 'PEACEMAKER'  // Scatter
  | 'BUCKSHOT'    // Pair
  | 'VECTOR'      // Two Pair
  | 'TRINITY'     // 3 of a Kind
  | 'QUADRA'      // 4 of a Kind
  | 'SINGULARITY' // 5 of a Kind
  | 'STRIKER'     // Small Straight
  | 'FLUX_BEAM'   // Big Straight
  | 'FLAMETHROWER'// Full House

  // --- TIER 2 (EVOLUTIONS) ---
  | 'CROSSBOW' | 'BOUNTY_HUNTER' | 'DESPERADO'
  | 'MIDAS_HAND' | 'TITAN_GRIP' | 'BUCKSHOT_NOVA'
  | 'TWIN_FANG' | 'AKIMBO' | 'RICOCHET'
  | 'TACTICAL_EXEC' | 'VAMPIRE_FANG' | 'TRI_FORCE'
  | 'OMNI_BURST' | 'PLASMA_CANNON' | 'RAILGUN'
  | 'EVENT_HORIZON' | 'BLACK_HOLE' | 'SUPERNOVA'
  | 'CHRONOS' | 'ASSASSIN' | 'FLASH_STEP'
  | 'PRISM_BEAM' | 'ORBITAL_CANNON' | 'HYPER_BEAM'
  | 'INFERNO' | 'MELTDOWN' | 'NAPALM'

  // --- TIER 3 (ULTIMATES) ---
  | 'EXCALIBUR' 
  | 'AEGIS_SYSTEM'
  | 'RAGNAROK'

  // --- FLAVOR ---
  | 'PLASMA' | 'VOID' | 'DOOMSDAY' | 'SHIV';

export interface CyberwareDef {
  id: string;
  name: string;
  desc: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'CORRUPTED';
  price: number;
  icon: React.ReactNode;
  onCalculate?: (context: ScoringContext) => Partial<ScoringContext>;
  onTurnStart?: (context: GameState) => Partial<GameState>;
  onPostFire?: (state: GameState, weaponId: WeaponType, damage: number) => Partial<GameState>;
}

export interface BossModifier {
  id: string;
  name: string;
  desc: string;
  effectId: 'NONE' | 'DAMPENER' | 'GLITCH' | 'FIREWALL';
}

export type EnemyActionType = 'ATTACK' | 'PIERCING' | 'AOE_GLITCH' | 'CHARGE' | 'SEAL_SLOT' | 'COMBO' | 'JAM_WEAPON';

export interface EnemyIntent {
  type: EnemyActionType;
  damage: number;
  desc: string; 
  hits?: number;
}

export interface TacticalMission {
  desc: string;
  type: 'SUM_GT' | 'SUM_LT' | 'HAS_PAIR' | 'ALL_ODD' | 'ALL_EVEN' | 'NO_ONES' | 'HAS_SEQ'; 
  targetVal?: number;
  rewardMult: number;
}

export interface GameState {
  status: GameStatus;
  difficulty: Difficulty;
  highScore: number;
  stats: SessionStats;

  // Economy & Inventory
  gold: number;
  unlockedWeapons: WeaponType[];
  disabledWeapons: WeaponType[];
  cyberware: CyberwareDef[];
  maxCyberwareSlots: number;

  // Enemy
  hp: number;
  maxHp: number;
  level: number;
  enemyType: string; 
  bossModifier: BossModifier;
  enemyIntent: EnemyIntent;
  bossPhase: number; 
  
  // Player
  playerHp: number;
  maxPlayerHp: number;
  playerShield: number; 
  lifesteal: number;
  rerolls: number;
  maxRerolls: number;
  rerollUpgrades: number; // New: Track how many times max rerolls have been upgraded
  
  // System
  dice: DieData[];
  maxDice: number;
  turn: number;
  tacticalMission?: TacticalMission;
}

export interface WeaponDef {
  id: WeaponType;
  parentId?: WeaponType; 
  name: string;
  triggerType: WeaponTriggerType; 
  evolution?: WeaponType[]; 
  req: string;
  baseChips: number;
  baseMult: number; 
  color: string;
  isArtifact?: boolean;
  description?: string;
}

export interface ScoringContext {
  chips: number;
  mult: number;
  diceSum: number;
  weaponId: WeaponType;
  diceValues: number[];
  level: number;
  turn: number;
}

export interface CombatResult {
  weapon: WeaponType;
  baseChips: number;
  baseMult: number;
  finalDamage: number;
  diceSum: number;
}

export interface DamagePopup {
  id: number;
  value: number;
  x: number;
  y: number;
  color: string;
  isCrit: boolean;
  label?: string;
}

export interface Particle {
  id: string;
  x: string; 
  y: string;
  tx: string; 
  ty: string;
  color: string;
}

export type ShopItemType = 'CONSUMABLE' | 'CYBERWARE' | 'WEAPON';

export interface ShopItem {
  id: string;
  type: ShopItemType;
  name: string;
  desc: string;
  cost: number;
  icon: React.ReactNode;
  data?: any;
}

export type RewardRarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'CORRUPTED' | 'BOSS_SPECIAL' | 'ULTIMATE';
export type RewardType = 'STAT_UP' | 'CYBERWARE' | 'WEAPON_UP' | 'MECHANIC' | 'ARTIFACT' | 'BOSS_ARTIFACT' | 'WEAPON_EVO';

export interface RewardOption {
  id: string;
  title: string;
  desc: string;
  rarity: RewardRarity;
  type: RewardType;
  icon: React.ReactNode;
  apply: (state: GameState) => GameState;
}

export interface RewardModalProps {
  headerTitle?: string;
  options: RewardOption[];
  onSelect: (option: RewardOption) => void;
}
