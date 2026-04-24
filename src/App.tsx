/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Map as MapIcon, CloudSun, CreditCard, ChevronLeft, ChevronRight, Menu, Sun, CloudRain, Cloud } from 'lucide-react';
import { ItineraryTab } from './components/ItineraryTab';
import { MapTab } from './components/MapTab';
import { WeatherTab } from './components/WeatherTab';
import { SplitTab } from './components/SplitTab';
import { TRIP_DATA } from './data/tripData';

type Tab = 'itinerary' | 'split';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('itinerary');
  const [activeDay, setActiveDay] = useState(1);

  const days = TRIP_DATA;

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
      <div className="relative w-full max-w-[375px] h-[720px] bg-brand-paper rounded-[48px] shadow-2xl overflow-hidden border-[10px] border-brand-black flex flex-col">
        {/* Status Bar Decor */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-black/10 rounded-full" />

        {/* Header */}
        <header className="px-6 pt-10 pb-4 bg-brand-paper">
          <div className="flex justify-between items-end mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">6/5 — 6/10</p>
              <h1 className="text-2xl font-bold tracking-tight">北九州自由行 <span className="text-sm font-normal">🇯🇵</span></h1>
            </div>
            <div className="bg-brand-coral w-10 h-10 rounded-full flex items-center justify-center border-2 border-brand-black rotate-3 shadow-sm">
              <span className="text-xl">✈️</span>
            </div>
          </div>

          {/* Hourly Weather Forecast - Inserted here */}
          <div className="mb-6 px-1">
            <div className="flex justify-between overflow-x-auto gap-4 no-scrollbar">
              {days.find(d => d.day === activeDay)?.weather.hourly?.map((wh, idx) => (
                <div key={idx} className="flex flex-col items-center shrink-0">
                  <span className="text-[9px] opacity-40 font-bold mb-1">{wh.hour}</span>
                  {wh.condition === '晴' && <Sun size={14} strokeWidth={2} className="text-brand-black" />}
                  {wh.condition === '雨' && <CloudRain size={14} strokeWidth={2} className="text-brand-black" />}
                  {wh.condition === '陰' && <Cloud size={14} strokeWidth={2} className="text-brand-black" />}
                  <span className="text-[10px] font-bold mt-0.5">{wh.temp}°</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day Selector */}
          <div className="flex gap-2 mb-2 overflow-x-auto no-scrollbar pb-2">
            {days.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`shrink-0 px-3.5 py-1.5 rounded-2xl text-[11px] font-black transition-all border-2 ${
                  activeDay === day.day
                    ? 'bg-brand-black text-white border-brand-black shadow-md'
                    : 'bg-brand-beige text-brand-black/60 border-transparent hover:bg-brand-beige/80'
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 px-6 overflow-y-auto no-scrollbar pb-24">
          <AnimatePresence mode="wait">
            {activeTab === 'itinerary' && (
              <motion.div 
                key={`itinerary-${activeDay}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <ItineraryTab activeDay={activeDay} />
              </motion.div>
            )}
            {activeTab === 'split' && (
              <motion.div 
                key="split"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <SplitTab />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Floating Bottom Nav */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[180px] h-14 bg-white/90 backdrop-blur-md border-2 border-brand-black rounded-full shadow-lg flex items-center justify-around px-4 z-50">
          <NavItem active={activeTab === 'itinerary'} onClick={() => setActiveTab('itinerary')} emoji="🎒" label="行程" />
          <NavItem active={activeTab === 'split'} onClick={() => setActiveTab('split')} emoji="🪙" label="記帳" />
        </div>
      </div>
    </div>
  );
}

function NavItem({ active, onClick, emoji, label }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center transition-all duration-300 ${
        active ? 'opacity-100 scale-110' : 'opacity-40 grayscale'
      }`}
    >
      <span className="text-xl leading-none">{emoji}</span>
      <span className="text-[8px] font-bold mt-0.5">{label}</span>
    </button>
  );
}
