
import React, { useState } from 'react';
import { WeaponDef, WeaponType } from '../types';
import { 
  AimIcon, 
  DoomsdayIcon, FlamethrowerIcon, RpgIcon, PlasmaIcon, VoidIcon, 
  ShivIcon, GrenadeIcon, UziIcon, ShotgunIcon, RevolverIcon, 
  OmniBlasterIcon, LinearRailIcon, TacticalIcon, BiohazardIcon, LockIcon, CrossbowIcon, TwinFangIcon, ExcaliburIcon
} from './Icons';

interface WeaponCardProps {
  weapon: WeaponDef;
  isActive?: boolean; 
  isFiring?: boolean;
  isDisabled?: boolean;
  level?: number;
  isTriggered?: boolean; 
  effectiveChips?: number;
  effectiveMult?: number;
}

export const getWeaponIcon = (id: WeaponType) => {
    switch(id) {
        // --- TIER 1 ---
        case 'SINGULARITY': return <OmniBlasterIcon className="w-full h-full" />;
        case 'QUADRA': return <GrenadeIcon className="w-full h-full" />;
        case 'TRINITY': return <RpgIcon className="w-full h-full" />;
        case 'FLUX_BEAM': return <LinearRailIcon className="w-full h-full" />;
        case 'STRIKER': return <UziIcon className="w-full h-full" />;
        case 'VECTOR': return <UziIcon className="w-full h-full" />;
        case 'BUCKSHOT': return <ShotgunIcon className="w-full h-full" />;
        case 'PEACEMAKER': return <RevolverIcon className="w-full h-full" />;
        case 'FLAMETHROWER': return <FlamethrowerIcon className="w-full h-full" />;

        // --- TIER 2 (EVOLUTIONS) ---
        // PEACEMAKER
        case 'CROSSBOW': 
        case 'BOUNTY_HUNTER':
        case 'DESPERADO': return <CrossbowIcon className="w-full h-full" />;
        
        // BUCKSHOT
        case 'MIDAS_HAND': 
        case 'TITAN_GRIP':
        case 'BUCKSHOT_NOVA': return <ShotgunIcon className="w-full h-full" />;
        
        // VECTOR
        case 'TWIN_FANG': 
        case 'AKIMBO':
        case 'RICOCHET': return <TwinFangIcon className="w-full h-full" />;
        
        // TRINITY
        case 'TACTICAL_EXEC': 
        case 'VAMPIRE_FANG':
        case 'TRI_FORCE': return <TacticalIcon className="w-full h-full" />;
        
        // QUADRA
        case 'OMNI_BURST': 
        case 'PLASMA_CANNON':
        case 'RAILGUN': return <GrenadeIcon className="w-full h-full" />;

        // SINGULARITY
        case 'EVENT_HORIZON': 
        case 'BLACK_HOLE':
        case 'SUPERNOVA': return <OmniBlasterIcon className="w-full h-full" />;

        // STRIKER
        case 'CHRONOS': 
        case 'ASSASSIN':
        case 'FLASH_STEP': return <UziIcon className="w-full h-full" />;

        // FLUX BEAM
        case 'PRISM_BEAM': 
        case 'ORBITAL_CANNON':
        case 'HYPER_BEAM': return <LinearRailIcon className="w-full h-full" />;

        // FLAMETHROWER
        case 'INFERNO': 
        case 'MELTDOWN':
        case 'NAPALM': return <FlamethrowerIcon className="w-full h-full" />;

        // ULTIMATES
        case 'EXCALIBUR': return <ExcaliburIcon className="w-full h-full" />;
        case 'AEGIS_SYSTEM': return <ShieldIcon className="w-full h-full" />;
        case 'RAGNAROK': return <DoomsdayIcon className="w-full h-full" />;
        
        // LEGACY
        case 'DOOMSDAY': return <DoomsdayIcon className="w-full h-full" />;
        case 'PLASMA': return <PlasmaIcon className="w-full h-full" />;
        case 'VOID': return <VoidIcon className="w-full h-full" />;
        case 'SHIV': return <ShivIcon className="w-full h-full" />;
        
        default: return <AimIcon className="w-full h-full" />;
    }
}

// Helper icon for Ultimate visual mapping
const ShieldIcon = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );

export const WeaponCard: React.FC<WeaponCardProps> = ({ weapon, isActive = false, isFiring = false, isDisabled = false, level = 1, isTriggered = false, effectiveChips, effectiveMult }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Use effective stats if provided, otherwise base
  const displayMultVal = effectiveMult !== undefined ? effectiveMult : weapon.baseMult;
  const displayChipsVal = effectiveChips !== undefined ? effectiveChips : weapon.baseChips;
  const isBuffedMult = effectiveMult !== undefined && effectiveMult > weapon.baseMult;
  const isBuffedChips = effectiveChips !== undefined && effectiveChips > weapon.baseChips;

  // Dynamic Multiplier Display
  const getMultDisplay = () => {
      if (weapon.id === 'SINGULARITY') return '50+';
      if (weapon.id === 'FLUX_BEAM') return '30+'; // Adjusted base
      if (displayMultVal >= 100) return 'MAX';
      return `x${displayMultVal}`;
  };

  const isTactical = weapon.id === 'TACTICAL_EXEC';
  const isUltimate = weapon.req === 'ULTIMATE' || ['EXCALIBUR', 'AEGIS_SYSTEM', 'RAGNAROK'].includes(weapon.id);

  // For Tactical Exec, we always want to show the specific mission description if hovered OR if it's just idle to inform player
  // But due to space, keep it in hover or click usually.
  // Exception: Highlight if triggered?
  
  return (
    <div 
        className={`
            relative flex flex-col flex-shrink-0 w-24 h-36 sm:w-28 sm:h-40
            transition-all duration-200 select-none
            ${isDisabled ? 'opacity-50 grayscale cursor-not-allowed' : isActive ? 'translate-y-[-8px] z-20' : 'translate-y-0 opacity-80 hover:opacity-100'}
            ${isFiring ? 'animate-recoil-fire z-30' : ''}
            ${isTriggered && !isFiring ? 'ring-2 ring-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)] translate-y-[-4px]' : ''}
        `}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
             if (isDisabled) return;
             e.stopPropagation();
             setIsHovered(!isHovered);
        }}
    >
      {/* Muzzle Flash Overlay */}
      {isFiring && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 bg-radial-gradient from-yellow-200 to-transparent opacity-50 z-50 pointer-events-none animate-pulse mix-blend-screen"></div>
      )}

      {/* Triggered Indicator (Glow Pulse) */}
      {isTriggered && !isFiring && (
          <div className="absolute inset-0 bg-yellow-400/10 rounded-lg animate-pulse z-0"></div>
      )}

      {/* --- CARTRIDGE CASING --- */}
      <div 
        className={`
            w-full h-full relative rounded-t-lg rounded-b-sm overflow-hidden
            border-2 border-b-4
            flex flex-col
            ${isFiring ? 'bg-slate-800 border-yellow-200 shadow-[0_0_30px_#facc15]' : isActive ? 'bg-slate-900' : 'bg-slate-950'}
            ${isTriggered ? 'border-yellow-500/50' : ''}
        `}
        style={{ 
            borderColor: isFiring ? '#fef08a' : (isActive && !isDisabled ? weapon.color : (isTriggered ? '#eab308' : '#334155')),
            boxShadow: isFiring ? `0 0 50px ${weapon.color}` : (isActive && !isDisabled ? `0 0 20px ${weapon.color}40` : 'none')
        }}
      >
          
          {/* 1. Top Grip */}
          <div className={`h-5 w-full border-b border-slate-800 flex items-center justify-center gap-0.5 ${isActive ? 'bg-slate-800' : 'bg-slate-900'}`}>
              {[...Array(6)].map((_,i) => (
                  <div key={i} className="w-0.5 h-2.5 bg-slate-600 rounded-full"></div>
              ))}
              {isTactical && !isDisabled && (
                  <div className={`absolute top-0 right-0 text-[8px] font-bold px-1 animate-pulse ${isTriggered ? 'bg-green-500 text-black' : 'bg-slate-700 text-green-400'}`}>任务</div>
              )}
              {isTriggered && (
                  <div className="absolute top-0 left-0 w-full h-full bg-yellow-400/20 animate-pulse"></div>
              )}
          </div>

          {/* 2. Main Body */}
          <div className="flex-1 relative flex flex-col p-1">
                {/* Background Icon Faded */}
                <div className={`absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none ${isActive ? 'text-white' : 'text-slate-500'}`}>
                    <div className="w-20 h-20">
                        {getWeaponIcon(weapon.id)}
                    </div>
                </div>

                {/* DISABLED OVERLAY */}
                {isDisabled && (
                    <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-[1px]">
                        <LockIcon className="w-8 h-8 text-red-500 mb-1" />
                        <span className="text-[10px] font-black text-red-500 bg-black px-2 border border-red-500 rotate-[-15deg]">JAMMED</span>
                    </div>
                )}

                {/* TACTICAL/DESC OVERLAY (Hover or Click) */}
                {(isTactical || weapon.description) && (isHovered || (isTactical && isTriggered)) && !isDisabled ? (
                    <div className="absolute inset-0 bg-slate-950/95 z-30 p-1.5 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="text-[8px] text-green-500 font-mono uppercase mb-1 border-b border-green-500/30 w-full pb-0.5">{isTactical ? '当前任务' : '效果'}</div>
                        <div className={`text-xs font-bold leading-tight my-auto ${isTactical ? 'text-green-300' : 'text-white'}`}>{weapon.description}</div>
                        {isTactical && isTriggered && <div className="text-[8px] text-yellow-400 mt-1 animate-pulse font-black">CONDITION MET</div>}
                    </div>
                ) : null}

                {/* Weapon Name & Level */}
                <div className="flex justify-between items-start z-10 mb-1">
                    <span className={`text-[10px] font-bold leading-tight truncate w-16 ${isUltimate ? 'text-yellow-200' : 'text-slate-300'}`}>{weapon.name}</span>
                    <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">v{level}</span>
                </div>

                {/* Center: THE MULTIPLIER */}
                <div className="flex-1 flex items-center justify-center z-10 relative">
                    <div 
                        className={`font-black italic tracking-tighter text-4xl drop-shadow-lg ${isFiring ? 'text-white scale-125' : (isTriggered ? 'scale-110' : '')} ${isUltimate ? 'text-yellow-400' : 'text-transparent bg-clip-text'}`}
                        style={{ 
                            backgroundImage: isFiring || isUltimate ? 'none' : isDisabled ? 'linear-gradient(180deg, #555, #333)' : `linear-gradient(180deg, #fff, ${weapon.color})`,
                            textShadow: isActive && !isDisabled ? `0 0 15px ${weapon.color}` : 'none',
                            color: isUltimate ? '#facc15' : isBuffedMult ? '#facc15' : undefined
                        }}
                    >
                        <span className="text-xl align-top opacity-80 mr-0.5">{getMultDisplay().startsWith('x') || getMultDisplay() === 'MAX' ? '' : 'x'}</span>
                        {getMultDisplay().replace('x', '')}
                    </div>
                </div>

                {/* Requirements Text */}
                <div className="text-center z-10 mb-1 relative">
                    <div className={`inline-block px-2 py-0.5 rounded border backdrop-blur-md shadow-sm ${isTriggered ? 'bg-yellow-500/20 border-yellow-500/50' : 'bg-black/60 border-white/10'}`}>
                        <span className={`text-[9px] font-mono font-bold tracking-tight ${isActive ? 'text-cyan-200' : 'text-slate-500'} ${isTriggered ? '!text-yellow-200' : ''}`}>
                            {weapon.req}
                        </span>
                    </div>
                </div>
          </div>

          {/* 3. Bottom Stats Row */}
          <div className={`h-7 border-t border-white/10 flex items-center justify-between px-2 py-1 ${isActive ? 'bg-slate-900' : 'bg-black'}`}>
              <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${isActive && !isDisabled ? 'animate-pulse bg-blue-400' : 'bg-slate-700'} ${isTriggered ? '!bg-yellow-400' : ''}`}></div>
                  <span className={`text-xs font-bold font-mono ${isTriggered ? 'text-yellow-400' : isBuffedChips ? 'text-green-400' : 'text-blue-400'}`}>
                      {displayChipsVal}
                  </span>
              </div>
              
              <div className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-600'} ${isUltimate ? 'text-yellow-500' : ''}`}>
                  {getWeaponIcon(weapon.id)}
              </div>
          </div>
      </div>

      {/* Active Light */}
      {isActive && !isDisabled && (
          <div 
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 blur-md rounded-full opacity-60"
            style={{ backgroundColor: weapon.color }}
          ></div>
      )}
    </div>
  );
};
