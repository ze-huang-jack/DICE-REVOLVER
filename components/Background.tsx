import React from 'react';

interface BackgroundProps {
  isBoss?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({ isBoss = false }) => {
  return (
    <div className="fixed inset-0 z-0 bg-[#020203] pointer-events-none overflow-hidden transition-colors duration-1000">
      
      {/* --- 1. DYNAMIC GRADIENT SKY --- */}
      <div className={`absolute top-0 left-0 w-full h-3/4 transition-colors duration-1000 ${isBoss ? 'bg-gradient-to-b from-[#1a0505] via-[#2b0a0a] to-[#020203]' : 'bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#020203]'}`}></div>

      {/* --- 2. RETRO GRID FLOOR --- */}
      <div className="absolute bottom-0 w-full h-[60%] perspective-container">
        <div className={`grid-floor ${isBoss ? 'grid-floor-boss' : ''}`}></div>
      </div>

      {/* --- 3. HORIZON --- */}
      <div className={`absolute top-[40%] left-0 w-full h-px z-10 shadow-[0_0_50px_currentColor] transition-colors duration-1000 ${isBoss ? 'bg-red-500/50 text-red-500' : 'bg-cyan-500/50 text-cyan-500'}`}></div>
      <div className={`absolute top-[35%] left-0 w-full h-32 blur-2xl z-0 transition-colors duration-1000 ${isBoss ? 'bg-gradient-to-t from-red-900/20 to-transparent' : 'bg-gradient-to-t from-cyan-900/20 to-transparent'}`}></div>

      {/* --- 4. SUN / CORE --- */}
      <div className={`
        absolute top-[25%] left-1/2 -translate-x-1/2 rounded-full blur-[60px] transition-all duration-1000
        ${isBoss ? 'w-96 h-96 bg-red-600/10' : 'w-96 h-64 bg-indigo-500/10'}
      `}></div>

      {/* --- 5. BOSS MODE EFFECTS --- */}
      {isBoss && (
          <>
            <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#ff000010_3px)] opacity-20 pointer-events-none animate-pulse"></div>
            <div className="absolute top-10 left-0 w-full text-center text-[200px] font-black text-red-900/5 pointer-events-none select-none overflow-hidden leading-none animate-pulse">
                WARNING
            </div>
          </>
      )}

      {/* --- 6. GLOBAL OVERLAYS --- */}
      {/* Dust */}
      <div className="absolute inset-0 opacity-[0.1] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse"></div>
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#000_100%)] z-20"></div>
      {/* Scanlines */}
      <div className="absolute inset-0 bg-scanlines opacity-[0.05] z-20 pointer-events-none mix-blend-overlay"></div>
    </div>
  );
};