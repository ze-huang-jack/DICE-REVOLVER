
import React, { useState, useEffect } from 'react';
import { Difficulty } from '../types';
import { Skull, Award, Zap, BookOpen, Terminal, Infinity, HelpCircle, X, Shield, Heart } from 'lucide-react';
import { SwordIcon, ShieldIcon, CoinIcon } from './Icons';

interface StartScreenProps {
  onStart: (diff: Difficulty) => void;
  highScore: number;
  onOpenEncyclopedia?: () => void;
}

// Simulated Background Component
const SimulatedBattle = () => {
    // Visual only - creates a feeling of a tactical map
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
            {/* Moving Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_95%,rgba(6,182,212,0.1)_95%)] bg-[size:100%_80px] animate-scan-down"></div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,rgba(6,182,212,0.1)_95%)] bg-[size:80px_100%]"></div>

            {/* Random Nodes */}
            {[...Array(6)].map((_, i) => (
                <div key={i} 
                     className="absolute w-12 h-12 border border-cyan-900/50 flex items-center justify-center animate-pulse"
                     style={{ 
                         left: `${10 + Math.random() * 80}%`, 
                         top: `${10 + Math.random() * 80}%`,
                         animationDuration: `${2 + Math.random() * 3}s`
                     }}>
                    <div className="w-1 h-1 bg-cyan-500"></div>
                    <div className="absolute -top-4 -left-2 text-[8px] text-cyan-800 font-mono">NODE_{i}</div>
                </div>
            ))}

            {/* Radar Scan */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-900/30 rounded-full">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-spin-slow origin-center mask-radar"></div>
            </div>
        </div>
    )
}

const GameManual = ({ onClose }: { onClose: () => void }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur p-4 animate-in fade-in">
        <div className="w-full max-w-2xl bg-slate-900 border-2 border-cyan-600 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            <div className="bg-slate-950 p-4 border-b border-cyan-900 flex justify-between items-center">
                <h2 className="text-xl font-black text-cyan-400 italic">SYSTEM_MANUAL // 核心说明</h2>
                <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar text-slate-300 space-y-6">
                
                <section>
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        <SwordIcon className="w-5 h-5 text-red-500" /> 
                        核心机制：伤害公式
                    </h3>
                    <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-sm">
                        <div className="flex flex-wrap items-center justify-center gap-2 text-center">
                            <div className="bg-blue-900/30 px-2 py-1 rounded text-blue-300 border border-blue-500/50">
                                基础筹码 (Chips)
                                <br/><span className="text-[10px] text-slate-500">武器固有 + 升级</span>
                            </div>
                            <span className="text-xl">+</span>
                            <div className="bg-white/10 px-2 py-1 rounded text-white border border-white/20">
                                点数总和
                                <br/><span className="text-[10px] text-slate-500">触发武器的色子点数</span>
                            </div>
                            <span className="text-xl">×</span>
                            <div className="bg-red-900/30 px-2 py-1 rounded text-red-300 border border-red-500/50">
                                倍率 (Mult)
                                <br/><span className="text-[10px] text-slate-500">扑克牌型奖励</span>
                            </div>
                            <span className="text-xl">=</span>
                            <div className="font-bold text-yellow-400 text-lg">最终伤害</div>
                        </div>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">
                        当你按下<span className="text-pink-400 font-bold">开火</span>时，所有满足触发条件（如一对、顺子）的武器都会激活。你可以多次重随色子来凑出更好的牌型。
                    </p>
                </section>

                <section>
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        <ShieldIcon className="w-5 h-5 text-blue-500" /> 
                        生存法则
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li><strong className="text-cyan-400">护盾 (Shield):</strong> 优先抵挡伤害，每回合结束保留。</li>
                        <li><strong className="text-green-400">生命 (HP):</strong> 归零即失败。</li>
                        <li>敌人意图显示在血条上方，利用重随或特定武器效果（如干扰）来应对即将到来的重击。</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        <CoinIcon className="w-5 h-5 text-yellow-500" /> 
                        成长与进化
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                        <li>每5级会遭遇BOSS，击败BOSS后可选择<strong className="text-purple-400">武器进化</strong>。</li>
                        <li>每10级获得额外的<strong className="text-yellow-400">色子槽位</strong>（上限10个）。</li>
                        <li>在商店中购买<strong className="text-fuchsia-400">义体芯片</strong>来获得被动加成。</li>
                    </ul>
                </section>
            </div>
            <div className="bg-slate-950 p-3 border-t border-slate-800 text-center text-[10px] text-slate-600 font-mono">
                PRESS START TO INITIALIZE
            </div>
        </div>
    </div>
)

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, highScore, onOpenEncyclopedia }) => {
  const [mounted, setMounted] = useState(false);
  const [showManual, setShowManual] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden flex flex-col items-center justify-center bg-[#02040a]">
        
        {showManual && <GameManual onClose={() => setShowManual(false)} />}

        {/* --- Background Elements --- */}
        <SimulatedBattle />
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)] pointer-events-none"></div>

        {/* --- Main Content --- */}
        <div className={`relative z-20 w-full max-w-lg px-6 flex flex-col items-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* ANIMATED LOGO */}
            <div className="mb-12 relative group scale-110 sm:scale-125">
                {/* Back Glow */}
                <div className="absolute -inset-10 bg-cyan-500/10 blur-2xl rounded-full animate-pulse"></div>
                
                <div className="relative">
                    <div className="text-[10px] font-mono text-cyan-500/50 tracking-[1em] text-center mb-2 animate-pulse">NEON_PROTOCOL_INIT</div>
                    <h1 className="relative text-6xl md:text-8xl font-black italic tracking-tighter leading-none flex flex-col items-center">
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-slate-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] relative z-10">
                            DICE
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-pink-400 via-fuchsia-500 to-purple-600 drop-shadow-[0_0_20px_rgba(236,72,153,0.6)] -mt-2 sm:-mt-4 relative z-10 glitch-text text-7xl md:text-9xl" data-text="REVOLVER">
                            REVOLVER
                        </span>
                    </h1>
                </div>

                <div className="flex justify-between items-center mt-6 px-8">
                    <div className="h-[1px] w-12 bg-cyan-800"></div>
                    <div className="mx-4 text-[9px] font-mono tracking-[0.3em] text-cyan-600 uppercase border border-cyan-900/50 px-2 py-1 rounded bg-black/40 backdrop-blur-sm">
                        Roguelike_Deckbuilder_v1.3
                    </div>
                    <div className="h-[1px] w-12 bg-cyan-800"></div>
                </div>
            </div>

            {/* High Score Badge */}
            <div className={`
                mb-8 flex items-center gap-3 px-6 py-2.5 rounded-sm border border-l-4 
                ${highScore > 0 ? 'border-yellow-500/30 border-l-yellow-500 bg-yellow-500/5 text-yellow-400' : 'border-slate-800 border-l-slate-600 bg-slate-900/50 text-slate-500'}
                backdrop-blur-sm shadow-lg
            `}>
                <Award className={`w-5 h-5 ${highScore > 0 ? 'text-yellow-400' : 'text-slate-600'}`} />
                <div className="flex flex-col">
                    <span className="text-[8px] font-mono uppercase tracking-widest opacity-70">Neural Record</span>
                    <span className="font-black tracking-widest text-sm">
                        MAX_LEVEL: <span className="text-lg">{highScore > 0 ? highScore : '---'}</span>
                    </span>
                </div>
            </div>

            {/* Menu Buttons */}
            <div className="w-full space-y-4">
                
                {/* MANUAL BUTTON */}
                <button 
                    onClick={() => setShowManual(true)}
                    className="w-full h-12 flex items-center justify-center gap-2 bg-slate-800/50 hover:bg-cyan-900/30 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-cyan-400 transition-all rounded group"
                >
                    <HelpCircle className="w-4 h-4" />
                    <span className="font-mono font-bold tracking-widest uppercase text-sm">操作说明 / Manual</span>
                </button>

                {/* ROOKIE BUTTON */}
                <button 
                    onClick={() => onStart('ROOKIE')}
                    className="w-full group relative"
                >
                    <div className="absolute inset-0 bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Cyber Bracket SVG */}
                    <svg className="absolute inset-0 w-full h-full text-cyan-800/50 group-hover:text-cyan-500 transition-colors duration-300" viewBox="0 0 400 80" preserveAspectRatio="none">
                        <path d="M0,0 L20,0 L30,10 L370,10 L380,0 L400,0 L400,80 L380,80 L370,70 L30,70 L20,80 L0,80 Z" fill="rgba(0,0,0,0.6)" stroke="currentColor" strokeWidth="1"/>
                        <path d="M10,20 L10,60" stroke="currentColor" strokeWidth="2" className="opacity-50 group-hover:opacity-100"/>
                        <path d="M390,20 L390,60" stroke="currentColor" strokeWidth="2" className="opacity-50 group-hover:opacity-100"/>
                    </svg>

                    <div className="relative h-20 flex items-center justify-between px-8">
                        <div className="flex flex-col items-start z-10">
                            <div className="text-3xl font-black italic text-white tracking-tighter group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                                ROOKIE <span className="text-xs not-italic font-mono text-cyan-700 font-normal bg-cyan-950/50 px-1 rounded border border-cyan-900">// 新手模式</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mt-1 group-hover:text-cyan-100">
                                <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 200 HP</span>
                                <span className="w-1 h-1 bg-cyan-600 rounded-full"></span>
                                <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> 60 LEVELS</span>
                            </div>
                        </div>
                        <Zap className="w-8 h-8 text-cyan-900 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                    </div>
                </button>

                {/* CYBERPSYCH BUTTON */}
                <button 
                    onClick={() => onStart('CYBERPSYCH')}
                    className="w-full group relative"
                >
                     <div className="absolute inset-0 bg-pink-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     
                     <svg className="absolute inset-0 w-full h-full text-pink-900/50 group-hover:text-pink-500 transition-colors duration-300" viewBox="0 0 400 80" preserveAspectRatio="none">
                        <path d="M0,10 L10,0 L390,0 L400,10 L400,70 L390,80 L10,80 L0,70 Z" fill="rgba(20,0,5,0.6)" stroke="currentColor" strokeWidth="1"/>
                        <rect x="0" y="35" width="3" height="10" fill="currentColor" className="opacity-0 group-hover:opacity-100 animate-pulse"/>
                        <rect x="397" y="35" width="3" height="10" fill="currentColor" className="opacity-0 group-hover:opacity-100 animate-pulse"/>
                    </svg>

                    <div className="relative h-20 flex items-center justify-between px-8">
                        <div className="flex flex-col items-start z-10">
                             <div className="text-3xl font-black italic text-pink-600 group-hover:text-pink-400 tracking-tighter transition-colors flex items-center gap-2">
                                CYBER-PSYCH <span className="text-xs not-italic font-mono text-pink-900 font-normal bg-pink-950/30 px-1 rounded border border-pink-900 group-hover:text-pink-300 group-hover:border-pink-500">// 赛博精神病</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-pink-900/70 font-mono mt-1 group-hover:text-pink-200">
                                <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> 50 HP</span>
                                <span className="w-1 h-1 bg-pink-600 rounded-full"></span>
                                <span className="flex items-center gap-1"><Skull className="w-3 h-3" /> HARDCORE</span>
                            </div>
                        </div>
                        <div className="text-pink-900 group-hover:text-pink-500 text-2xl font-black tracking-widest group-hover:animate-shake">
                            !!!
                        </div>
                    </div>
                </button>

                {/* ENDLESS BUTTON */}
                <button 
                    onClick={() => onStart('ENDLESS')}
                    className="w-full group relative"
                >
                     <div className="absolute inset-0 bg-purple-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     
                     <svg className="absolute inset-0 w-full h-full text-purple-900/50 group-hover:text-purple-500 transition-colors duration-300" viewBox="0 0 400 80" preserveAspectRatio="none">
                        <path d="M20,0 L380,0 L400,20 L400,60 L380,80 L20,80 L0,60 L0,20 Z" fill="rgba(10,0,20,0.6)" stroke="currentColor" strokeWidth="1"/>
                    </svg>

                    <div className="relative h-20 flex items-center justify-between px-8">
                        <div className="flex flex-col items-start z-10">
                             <div className="text-3xl font-black italic text-purple-600 group-hover:text-purple-400 tracking-tighter transition-colors flex items-center gap-2">
                                ENDLESS <span className="text-xs not-italic font-mono text-purple-900 font-normal bg-purple-950/30 px-1 rounded border border-purple-900 group-hover:text-purple-300 group-hover:border-purple-500">// 无尽模式</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-purple-900/70 font-mono mt-1 group-hover:text-purple-200">
                                <span className="flex items-center gap-1"><Infinity className="w-3 h-3" /> INFINITE</span>
                                <span className="w-1 h-1 bg-purple-600 rounded-full"></span>
                                <span className="flex items-center gap-1"><Skull className="w-3 h-3" /> HARDCORE</span>
                            </div>
                        </div>
                        <Infinity className="w-8 h-8 text-purple-900 group-hover:text-purple-500 transition-all duration-300 group-hover:scale-110 group-hover:rotate-180" />
                    </div>
                </button>

                {/* ENCYCLOPEDIA BUTTON */}
                <button 
                    onClick={onOpenEncyclopedia}
                    className="w-full group relative mt-2 opacity-80 hover:opacity-100"
                >
                     <div className="absolute inset-0 bg-slate-500/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                     
                     <svg className="absolute inset-0 w-full h-full text-slate-800/80 group-hover:text-slate-700 transition-colors duration-300" viewBox="0 0 400 60" preserveAspectRatio="none">
                        <path d="M0,0 L400,0 L400,60 L0,60 Z" fill="rgba(0,0,0,0.6)" stroke="currentColor" strokeWidth="1"/>
                    </svg>

                    <div className="relative h-14 flex items-center justify-center px-8 gap-3 text-slate-400 group-hover:text-cyan-400 transition-colors">
                        <BookOpen className="w-5 h-5" />
                        <span className="font-mono font-bold uppercase tracking-[0.2em] text-sm">Data Codex // 图鉴</span>
                    </div>
                </button>

            </div>

            {/* Footer */}
            <div className="mt-8 flex items-center gap-4 text-[10px] text-slate-700 font-mono uppercase tracking-widest">
                 <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> SYS_READY</span>
                 <span>•</span>
                 <span>NET_VER 1.3.0</span>
            </div>

        </div>
    </div>
  );
};
