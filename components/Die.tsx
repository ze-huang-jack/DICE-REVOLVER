
import React from 'react';
import { DieData } from '../types';
import { Lock, RefreshCw, ShieldAlert } from 'lucide-react';

interface DieProps {
  data: DieData;
  toggleLock: (id: number) => void;
  disabled?: boolean;
}

const Pip = ({ style }: { style?: React.CSSProperties }) => (
  <div 
    className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] place-self-center"
    style={style}
  ></div>
);

const FaceContent = ({ value }: { value: number }) => {
    if (value === 0) return null;

    const getPips = () => {
        switch(value) {
            case 1: 
                return <Pip style={{ gridArea: '2 / 2' }} />;
            case 2: 
                return (
                    <>
                        <Pip style={{ gridArea: '1 / 3' }} />
                        <Pip style={{ gridArea: '3 / 1' }} />
                    </>
                );
            case 3:
                return (
                    <>
                        <Pip style={{ gridArea: '1 / 3' }} />
                        <Pip style={{ gridArea: '2 / 2' }} />
                        <Pip style={{ gridArea: '3 / 1' }} />
                    </>
                );
            case 4:
                return (
                    <>
                        <Pip style={{ gridArea: '1 / 1' }} />
                        <Pip style={{ gridArea: '1 / 3' }} />
                        <Pip style={{ gridArea: '3 / 1' }} />
                        <Pip style={{ gridArea: '3 / 3' }} />
                    </>
                );
            case 5:
                return (
                    <>
                        <Pip style={{ gridArea: '1 / 1' }} />
                        <Pip style={{ gridArea: '1 / 3' }} />
                        <Pip style={{ gridArea: '2 / 2' }} />
                        <Pip style={{ gridArea: '3 / 1' }} />
                        <Pip style={{ gridArea: '3 / 3' }} />
                    </>
                );
            case 6:
                 return (
                    <>
                        <Pip style={{ gridArea: '1 / 1' }} />
                        <Pip style={{ gridArea: '1 / 3' }} />
                        <Pip style={{ gridArea: '2 / 1' }} />
                        <Pip style={{ gridArea: '2 / 3' }} />
                        <Pip style={{ gridArea: '3 / 1' }} />
                        <Pip style={{ gridArea: '3 / 3' }} />
                    </>
                );
            default: return null;
        }
    }

    return (
        <div className="absolute inset-0 w-full h-full bg-black/90 border-2 border-slate-700 rounded-lg grid grid-cols-3 grid-rows-3 p-1.5 sm:p-2">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none rounded-lg"></div>
            {getPips()}
        </div>
    )
};

export const Die: React.FC<DieProps> = ({ data, toggleLock, disabled }) => {
  const { id, value, isLocked, isRolling, sealedTurns } = data;
  const isSealed = sealedTurns > 0;

  const getRotation = (val: number) => {
      if (val === 0) return 'rotateX(0deg) rotateY(0deg)';
      switch(val) {
          case 1: return 'rotateX(0deg) rotateY(0deg)';
          case 6: return 'rotateX(180deg) rotateY(0deg)';
          case 2: return 'rotateX(0deg) rotateY(-90deg)';
          case 5: return 'rotateX(0deg) rotateY(90deg)';
          case 3: return 'rotateX(-90deg) rotateY(0deg)';
          case 4: return 'rotateX(90deg) rotateY(0deg)';
          default: return 'rotateX(0deg) rotateY(0deg)';
      }
  };

  return (
    <div 
        className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 perspective-[800px] group ${disabled || isSealed ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`} 
        onClick={() => !disabled && !isSealed && value !== 0 && toggleLock(id)}
    >
      
      {/* Lock Indicator */}
      <div className={`absolute -top-4 left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ${isLocked ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-pink-600 text-white p-0.5 rounded shadow-[0_0_8px_#be185d]">
              <Lock className="w-3 h-3" />
          </div>
      </div>

      {/* Sealed Indicator */}
      {isSealed && (
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30 animate-bounce">
               <div className="bg-red-600 text-white px-1.5 py-0.5 rounded shadow-[0_0_8px_#dc2626] flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" />
                  <span className="text-[8px] font-bold">{sealedTurns}</span>
               </div>
          </div>
      )}

      {/* The Cube */}
      <div 
        className="w-full h-full relative transition-transform duration-700 ease-out"
        style={{ 
            transformStyle: 'preserve-3d',
            transform: isRolling 
                ? `rotateX(${Math.random() * 1080}deg) rotateY(${Math.random() * 1080}deg)` 
                : getRotation(value) 
        }}
      >
          {value === 0 ? (
              // Empty State (Wireframe Hologram)
              <div className={`absolute inset-0 border-2 border-dashed ${isSealed ? 'border-red-600 bg-red-900/20' : 'border-slate-800 bg-slate-900/20'} rounded-lg flex items-center justify-center backdrop-blur-sm`}>
                  {isSealed ? (
                      <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
                  ) : (
                      <RefreshCw className="w-6 h-6 text-slate-700 animate-spin-slow" />
                  )}
              </div>
          ) : (
              <>
                <div className="die-face die-front"><FaceContent value={1} /></div>
                <div className="die-face die-back"><FaceContent value={6} /></div>
                <div className="die-face die-right"><FaceContent value={2} /></div>
                <div className="die-face die-left"><FaceContent value={5} /></div>
                <div className="die-face die-top"><FaceContent value={3} /></div>
                <div className="die-face die-bottom"><FaceContent value={4} /></div>
              </>
          )}

          {/* Sealed Overlay for value face */}
          {isSealed && value !== 0 && (
              <div className="absolute inset-0 z-40 bg-red-950/60 border-2 border-red-500 rounded-lg flex items-center justify-center" style={{ transform: 'translateZ(2.6rem)' }}>
                   <ShieldAlert className="w-8 h-8 text-red-500 animate-pulse" />
              </div>
          )}
      </div>
        
      {isLocked && !isSealed && (
          <div className="absolute inset-0 rounded-lg border-2 border-pink-500/50 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.3)] animate-pulse z-10 pointer-events-none"
               style={{ transform: 'scale(1.1)' }}>
          </div>
      )}
      
      {isSealed && (
          <div className="absolute inset-0 rounded-lg border-2 border-red-600 bg-red-900/20 shadow-[0_0_15px_rgba(220,38,38,0.5)] z-10 pointer-events-none"
             style={{ transform: 'scale(1.1)' }}>
          </div>
      )}
    </div>
  );
};