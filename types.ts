
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
    | 'SIX_KIND'        // New: Event Horizon
    | 'SMALL_STR' 
    | 'BIG_STR' 
    | 'SUPER_STR'       // New: Prism Beam (1-6)
    | 'FULL_HOUSE'
    | 'DOUBLE_TRIPLE'   // New: Inferno (3 of a kind x 2)
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

  // --- TIER 2 (EVOLUTIONS - 3 Branches Each) ---
  
  // PEACEMAKER (Scatter)
  | 'CROSSBOW'       // Auto-fire
  | 'BOUNTY_HUNTER'  // Gold on hit
  | 'DESPERADO'      // Dmg up when rerolls empty

  // BUCKSHOT (Pair)
  | 'MIDAS_HAND'     // Gold scaling
  | 'TITAN_GRIP'     // Huge mult on 6s
  | 'BUCKSHOT_NOVA'  // HP scaling

  // VECTOR (Two Pair)
  | 'TWIN_FANG'      // Triggers twice
  | 'AKIMBO'         // Reroll scaling
  | 'RICOCHET'       // 4-of-a-kind counts as 2 pair + Bonus

  // TRINITY (3 Kind)
  | 'TACTICAL_EXEC'  // Mission
  | 'VAMPIRE_FANG'   // Lifesteal
  | 'TRI_FORCE'      // Odd number bonus

  // QUADRA (4 Kind)
  | 'OMNI_BURST'     // 4/5/6 Kind trigger
  | 'PLASMA_CANNON'  // Flat Chip bonus
  | 'RAILGUN'        // Ignore Shield/Defense (High Mult)

  // SINGULARITY (5 Kind)
  | 'EVENT_HORIZON'  // 6 Kind
  | 'BLACK_HOLE'     // Shield Generation
  | 'SUPERNOVA'      // Instant Kill / Massive Dmg on 6s

  // STRIKER (Small Str)
  | 'CHRONOS'        // Re-trigger round
  | 'ASSASSIN'       // 100% Crit
  | 'FLASH_STEP'     // Bonus if Turn 1

  // FLUX_BEAM (Big Str)
  | 'PRISM_BEAM'     // 1-6 Trigger
  | 'ORBITAL_CANNON' // Turn scaling
  | 'HYPER_BEAM'     // HP Cost for massive Dmg

  // FLAMETHROWER (Full House)
  | 'INFERNO'        // Double Triple
  | 'MELTDOWN'       // Shield to Dmg
  | 'NAPALM'         // High Mult

  // --- TIER 3 (ULTIMATES - Level 50) ---
  | 'EXCALIBUR' 
  | 'AEGIS_SYSTEM'
  | 'RAGNAROK'

  // --- FLAVOR (Legacy/Shop only if re-enabled) ---
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
  bossPhase: number; // 1 = Normal, 2 = Resurrected (Lv 60)
  
  // Player
  playerHp: number;
  maxPlayerHp: number;
  playerShield: number; 
  lifesteal: number;
  rerolls: number;
  maxRerolls: number;
  
  // System
  dice: DieData[];
  maxDice: number;
  turn: number;
  tacticalMission?: TacticalMission;
}

export interface WeaponDef {
  id: WeaponType;
  parentId?: WeaponType; // The weapon this evolved from
  name: string;
  triggerType: WeaponTriggerType; // Logic mapping
  evolution?: WeaponType[]; // REMOVED SINGLE, NOW ARRAY OF OPTIONS (Logically handled in App)
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
