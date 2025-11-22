
import React, { useState } from 'react';
import { WeaponDef, CyberwareDef, RewardRarity } from '../types';
import { getWeaponIcon } from './WeaponCard';
import { CyberwareCard } from './CyberwareCard';
import { BatteryCharging, Activity, RefreshCw, AlertTriangle } from 'lucide-react';
import { BookIcon, CrosshairIcon, HeartIcon, ShieldIcon, CoinIcon, CpuIcon, BiohazardIcon, SkullIcon } from './Icons';

interface EncyclopediaProps {
  isOpen: boolean;
  onClose: () => void;
  weapons: WeaponDef[];
  cyberware: CyberwareDef[];
  chips: CyberwareDef[];
  rewards: { id: string; title: string; desc: string; rarity: RewardRarity; iconType: string }[];
}

type Tab = 'WEAPONS' | 'REWARDS' | 'MODULES';

export const Encyclopedia: React.FC<EncyclopediaProps> = ({ isOpen, onClose, weapons, cyberware, chips, rewards }) => {
  const [activeTab, setActiveTab] = useState<Tab>('WEAPONS');

  if (!isOpen) return null;

  // --- RENDERERS ---

  const renderWeapons = () => {
      // Group by Base Weapon (Tier 1)
      const tier1 = weapons.filter(w => !w.parentId && w.triggerType !== 'FLAVOR');
      const ultimates = weapons.filter(w => w.req === 'ULTIMATE');

      return (
          <div className="space-y-8 pb-8">
              <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">基础武装与进化分支</div>
              
              <div className="grid grid-cols-1 gap-6">
                  {tier1.map(base => {
                      const evolutions = weapons.filter(w => w.parentId === base.id);
                      
                      return (
                          <div key={base.id} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                              {/* Base Weapon Header */}
                              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-800/50">
                                  <div className="w-12 h-12 text-cyan-400 p-2 bg-slate-950 rounded border border-slate-700">
                                      {getWeaponIcon(base.id)}
                                  </div>
                                  <div>
                                      <h3 className="text-lg font-bold text-white">{base.name}</h3>
                                      <div className="text-xs font-mono text-slate-400">触发: {base.req}</div>
                                  </div>
                                  <div className="ml-auto flex flex-col items-end text-xs font-mono text-slate-500">
                                      <div>基础筹码: {base.baseChips}</div>
                                      <div>基础倍率: x{base.baseMult}</div>
                                  </div>
                              </div>

                              {/* Evolutions Grid */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  {evolutions.map(evo => (
                                      <div key={evo.id} className="bg-slate-950 p-3 rounded border border-slate-800 hover:border-cyan-500/30 transition-colors group">
                                          <div className="flex justify-between items-start mb-2">
                                              <span className="text-sm font-bold text-cyan-200 group-hover:text-cyan-400">{evo.name}</span>
                                              <div className="w-5 h-5 text-slate-600 group-hover:text-cyan-500">{getWeaponIcon(evo.id)}</div>
                                          </div>
                                          <p className="text-xs text-slate-400 leading-relaxed min-h-[40px]">{evo.description}</p>
                                          <div className="mt-2 pt-2 border-t border-slate-900 text-[10px] font-mono text-slate-600 flex justify-between">
                                               <span>筹码: {evo.baseChips > 0 ? `+${evo.baseChips}` : '-'}</span>
                                               <span>倍率: {evo.baseMult >= 100 ? 'MAX' : `x${evo.baseMult}`}</span>
                                          </div>
                                      </div>
                                  ))}
                              </div>
                          </div>
                      )
                  })}
              </div>

              {/* Ultimates */}
              <div className="text-xs font-mono text-yellow-500 uppercase tracking-widest mb-4 mt-8 border-b border-yellow-900/30 pb-2">究极武器 (LV 50)</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {ultimates.map(ult => (
                      <div key={ult.id} className="bg-yellow-950/10 border border-yellow-900/50 p-4 rounded relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 blur-xl rounded-full -mr-8 -mt-8"></div>
                          <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 text-yellow-500">{getWeaponIcon(ult.id)}</div>
                              <h3 className="font-bold text-yellow-100">{ult.name}</h3>
                          </div>
                          <p className="text-xs text-yellow-200/70">{ult.description}</p>
                          <div className="mt-2 text-[10px] font-mono text-yellow-600">
                              BASE: {ult.baseChips} | MULT: x{ult.baseMult}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      );
  };

  const renderRewards = () => {
      // Helper to map string icon types to components
      const getIcon = (type: string) => {
          const props = { className: "w-6 h-6" };
          switch(type) {
              case 'HEART': return <HeartIcon {...props} />;
              case 'SHIELD': return <ShieldIcon {...props} />;
              case 'DB': return <CoinIcon {...props} />;
              case 'BATTERY': return <BatteryCharging {...props} />;
              case 'ACTIVITY': return <Activity {...props} />;
              case 'REFRESH': return <RefreshCw {...props} />;
              case 'BIO': return <BiohazardIcon {...props} />;
              case 'SKULL': return <SkullIcon {...props} />;
              case 'ALERT': return <AlertTriangle {...props} />;
              default: return <CoinIcon {...props} />;
          }
      };

      const getRarityColor = (rarity: string) => {
          switch(rarity) {
              case 'COMMON': return 'border-slate-700 text-slate-300';
              case 'RARE': return 'border-blue-500/50 text-blue-300 bg-blue-950/20';
              case 'CORRUPTED': return 'border-red-500/50 text-red-300 bg-red-950/20';
              default: return 'border-slate-700';
          }
      };

      return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-8">
              {rewards.map((reward, idx) => (
                  <div key={idx} className={`p-4 rounded border flex flex-col gap-2 ${getRarityColor(reward.rarity)}`}>
                      <div className="flex justify-between items-start">
                          <span className="font-bold text-sm">{reward.title}</span>
                          <div className="opacity-70">{getIcon(reward.iconType)}</div>
                      </div>
                      <div className="h-px w-full bg-current opacity-20 my-1"></div>
                      <p className="text-xs opacity-80 leading-relaxed">{reward.desc}</p>
                      <div className="mt-auto pt-2 text-[9px] font-mono uppercase tracking-wider opacity-50 text-right">
                          {reward.rarity}
                      </div>
                  </div>
              ))}
          </div>
      );
  };

  const renderModules = () => {
      return (
          <div className="space-y-8 pb-8">
              <div>
                  <div className="text-xs font-mono text-cyan-500 uppercase tracking-widest mb-4 border-b border-cyan-900/30 pb-2">系统核心 (基础芯片)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {chips.map(chip => (
                          <div key={chip.id} className="bg-slate-900/50 p-2 rounded border border-slate-800">
                              <CyberwareCard item={chip} />
                          </div>
                      ))}
                  </div>
              </div>

              <div>
                  <div className="text-xs font-mono text-fuchsia-500 uppercase tracking-widest mb-4 border-b border-fuchsia-900/30 pb-2">扩展模组 (商店义体)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cyberware.map(cw => (
                          <div key={cw.id} className="bg-slate-900/50 p-2 rounded border border-slate-800">
                              <CyberwareCard item={cw} />
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200 p-4 sm:p-8">
      <div className="w-full max-w-6xl h-[90vh] bg-slate-950 border border-slate-800 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex-none h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
                <BookIcon className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-black italic text-white tracking-tighter">DATA_CODEX // <span className="text-slate-500 not-italic font-mono text-sm">数据库</span></h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                X
            </button>
        </div>

        {/* Tabs */}
        <div className="flex-none h-12 flex border-b border-slate-800 bg-slate-950">
            {(['WEAPONS', 'REWARDS', 'MODULES'] as Tab[]).map(tab => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
                        flex-1 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase transition-all hover:bg-slate-900
                        ${activeTab === tab 
                            ? 'bg-slate-900 text-cyan-400 border-b-2 border-cyan-400' 
                            : 'text-slate-500 border-b-2 border-transparent'}
                    `}
                >
                    {tab === 'WEAPONS' && '武器库'}
                    {tab === 'REWARDS' && '补给协议'}
                    {tab === 'MODULES' && '芯片模组'}
                </button>
            ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {activeTab === 'WEAPONS' && renderWeapons()}
            {activeTab === 'REWARDS' && renderRewards()}
            {activeTab === 'MODULES' && renderModules()}
        </div>

        {/* Footer */}
        <div className="flex-none h-8 bg-slate-950 border-t border-slate-800 flex items-center px-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
            SYSTEM_READY // ACCESS_LEVEL_5 // 
        </div>

      </div>
    </div>
  );
};
