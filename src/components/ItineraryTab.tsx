import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRIP_DATA } from '../data/tripData';
import { MapPin, Clock, Info, Navigation, Camera, Car, Fuel, Coffee, ShoppingBag, Utensils, Star, Shirt, ParkingCircle, ChevronDown, ChevronUp, Gift } from 'lucide-react';
import { Spot, SpotCategory } from '../types';

const categoryIcons: Record<SpotCategory, any> = {
  food: Utensils,
  activity: Star,
  shopping: ShoppingBag,
  scenery: Camera,
  hotel: Coffee,
  transport: Car,
};

const categoryColors: Record<SpotCategory, string> = {
  food: 'bg-orange-100 text-orange-600',
  activity: 'bg-pink-100 text-pink-600',
  shopping: 'bg-purple-100 text-purple-600',
  scenery: 'bg-blue-100 text-blue-600',
  hotel: 'bg-amber-100 text-amber-600',
  transport: 'bg-teal-100 text-teal-600',
};

export const ItineraryTab = ({ activeDay }: { activeDay: number }) => {
  const [showSouvenirs, setShowSouvenirs] = useState(false);
  const day = TRIP_DATA.find((d) => d.day === activeDay);

  if (!day) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 pb-4"
    >
      {/* Day Summary Card (Stamp Style) */}
      <div className="relative bg-white border-2 border-brand-black rounded-[32px] p-6 hard-shadow-rose mt-4 mx-1">
        {/* City/Location Label - Centered directly on top */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-sage text-white text-[11px] font-black px-6 py-1.5 rounded-full border-2 border-brand-black shadow-lg whitespace-nowrap z-30">
          {day.city}
        </div>

        <div className="flex items-center gap-4 mb-6 pt-2">
          <div className="w-14 h-14 bg-white border-2 border-brand-black/10 rounded-2xl flex flex-col items-center justify-center stamp-skew-left shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] shrink-0">
            <span className="text-[11px] font-black opacity-30 leading-none mb-1">{day.date.split('(')[0]}</span>
            <span className="text-sm font-black leading-none">{day.date.match(/\((.*?)\)/)?.[1] || 'DAY'}</span>
          </div>
          <div className="flex-1">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 w-fit bg-brand-yellow/10 px-2 py-0.5 rounded-lg border border-brand-yellow/20">
                <span className="text-xs">
                  {day.weather.condition === '晴' ? '☀️' : day.weather.condition === '雨' ? '🌧️' : '☁️'}
                </span>
                <span className="text-[10px] font-black text-brand-black/70">
                  {day.weather.temp.max}°
                </span>
              </div>
              <h2 className="text-xl font-black leading-tight text-brand-black tracking-tight whitespace-nowrap">行程摘要</h2>
            </div>
            <div className="flex gap-4 mt-2 underline decoration-brand-yellow decoration-2 underline-offset-4">
              <span className="text-[10px] font-bold opacity-60 flex items-center gap-1">
                <Navigation size={10} strokeWidth={3} /> {day.summary.travelTime}
              </span>
              <span className="text-[10px] font-bold opacity-60 flex items-center gap-1">
                <MapPin size={10} strokeWidth={3} /> {day.summary.spotCount} 景點
              </span>
            </div>
          </div>
        </div>

        {/* Spot Cards (Polaroid Style) */}
        <div className="space-y-12">
          {day.spots.map((spot, idx) => {
            const Icon = categoryIcons[spot.category];
            const rotation = idx % 2 === 0 ? 'stamp-skew-left' : 'stamp-skew-right';
            
            return (
              <div key={spot.id} className="relative group">
                <div className="flex items-start gap-4">
                  {/* Polaroid Frame */}
                  <div className={`w-24 h-24 bg-white p-1 border border-brand-black/10 rounded-sm shadow-md ${rotation} flex-shrink-0 relative overflow-hidden`}>
                    <div className={`w-full h-16 rounded-sm mb-1 flex items-center justify-center text-lg ${categoryColors[spot.category]}`}>
                      <Icon size={32} strokeWidth={1} />
                    </div>
                    <p className="text-[7px] text-center font-bold tracking-tighter truncate px-0.5">{spot.name}</p>
                    
                    {/* Decorative "Tape" */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-3 bg-brand-yellow/40 rotate-[-5deg] border border-brand-black/5" />
                  </div>

                  <div className="flex-1 pt-0 min-w-0">
                    <div className="mb-2">
                      <span className="bg-brand-black text-white text-[9px] px-2.5 py-1 rounded-full font-black inline-block mb-1 shadow-sm">
                        {spot.time || '--:--'}
                      </span>
                      <h3 className="text-sm font-black leading-tight text-brand-black block break-words">
                        {spot.name}
                      </h3>
                    </div>
                    <p className="text-[11px] text-brand-black/80 font-medium leading-[1.4] mb-3">
                      {spot.description}
                    </p>
                    
                    {spot.tips && spot.tips.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                         {spot.tips.map(tip => (
                           <span key={tip} className="text-[9px] font-bold text-brand-sage bg-brand-sage/5 px-2 py-0.5 rounded border border-brand-sage/10 italic">
                             #{tip}
                           </span>
                         ))}
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex gap-2 items-center">
                      {spot.googleMapsUrl && (
                        <a 
                          href={spot.googleMapsUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 bg-brand-mint text-brand-black text-[10px] font-black px-3 py-1.5 rounded-xl border-2 border-brand-black/5 shadow-sm active:translate-y-0.5 transition-all whitespace-nowrap shrink-0"
                        >
                          <Navigation size={12} strokeWidth={3} /> 導航
                        </a>
                      )}
                      {spot.parkingUrl && (
                        <a 
                          href={spot.parkingUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 bg-brand-peach text-brand-black text-[10px] font-black px-3 py-1.5 rounded-xl border-2 border-brand-black/5 shadow-sm active:translate-y-0.5 transition-all whitespace-nowrap shrink-0"
                        >
                          <ParkingCircle size={12} strokeWidth={3} /> 停車
                        </a>
                      )}
                    </div>

                    {/* Integrated Souvenirs */}
                    {day.souvenirs && day.souvenirs.filter(s => {
                      const spotLower = spot.name.toLowerCase();
                      const locLower = s.location?.toLowerCase() || '';
                      // Matching logic: if spot name or location name overlaps
                      return locLower.includes(spotLower) || spotLower.includes(locLower) || 
                             (spotLower.includes('駅') && locLower.includes('駅')) ||
                             (spotLower.includes('天神') && locLower.includes('天神')) ||
                             (spotLower.includes('太宰府') && locLower.includes('太宰府')) ||
                             (spotLower.includes('由布院') && locLower.includes('由布院'));
                    }).length > 0 && (
                      <div className="mt-4 space-y-2 border-t-2 border-dashed border-brand-black/5 pt-3">
                        <p className="text-[10px] font-black text-brand-black/40 uppercase tracking-widest flex items-center gap-1">
                          <Gift size={10} /> 推薦入手
                        </p>
                        {day.souvenirs.filter(s => {
                          const spotLower = spot.name.toLowerCase();
                          const locLower = s.location?.toLowerCase() || '';
                          return locLower.includes(spotLower) || spotLower.includes(locLower) || 
                               (spotLower.includes('駅') && locLower.includes('駅')) ||
                               (spotLower.includes('天神') && locLower.includes('天神')) ||
                               (spotLower.includes('太宰府') && locLower.includes('太宰府')) ||
                               (spotLower.includes('由布院') && locLower.includes('由布院'));
                        }).map((item, sIdx) => (
                          <div key={sIdx} className="bg-white/60 p-2 rounded-2xl flex gap-3 items-center border border-brand-black/10 shadow-sm">
                             <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden border-2 border-brand-black/5 bg-brand-bg">
                               <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`;
                                  }}
                                />
                             </div>
                             <div className="flex-1 min-w-0">
                                <h5 className="text-[11px] font-black leading-tight mb-1">{item.name}</h5>
                                {item.googleMapsUrl && (
                                  <a href={item.googleMapsUrl} target="_blank" rel="noreferrer" className="text-[9px] font-bold text-brand-black/40 hover:text-brand-black flex items-center gap-1 transition-colors">
                                    <MapPin size={8} /> 前往購買地點
                                  </a>
                                )}
                             </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Separator Line (Dotted) */}
                {idx < day.spots.length - 1 && (
                  <div className="my-10 border-b-2 border-dotted border-brand-black/10 w-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Remaining Souvenirs that didn't match a specific spot (General Shopping) */}
      {day.souvenirs && (
        <div className="bg-white border-2 border-brand-black rounded-[32px] overflow-hidden shadow-sm mt-8 p-6 relative">
          <div className="absolute -top-1 -left-1 w-8 h-8 bg-brand-yellow/20 -z-10 rotate-12 sketch-border" />
          <div className="flex items-center gap-3 mb-4">
             <Gift size={24} className="text-brand-sage" />
             <h4 className="font-black text-sm uppercase tracking-tight">今日購物清單</h4>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
             {day.souvenirs.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-center bg-brand-bg/20 p-3 rounded-2xl border-2 border-brand-black/5 hover:border-brand-black/10 transition-colors">
                   <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}`;
                        }}
                      />
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-black leading-tight mb-1">{item.name}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-bold opacity-40 flex items-center gap-1">
                           <MapPin size={8} /> {item.location}
                        </span>
                        {item.googleMapsUrl && (
                          <a href={item.googleMapsUrl} target="_blank" rel="noreferrer" className="text-[9px] font-black text-brand-sage underline decoration-brand-sage/30">
                            查看地圖
                          </a>
                        )}
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      )}

      {/* Outfit Advice (Paper Scrap) */}
      <div className="bg-brand-peach border-2 border-brand-black rounded-[24px] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rotate-45 translate-x-8 -translate-y-8" />
        <div className="flex items-center gap-2 mb-3">
          <Shirt size={18} className="text-brand-black" />
          <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-black/60">穿搭小指南</h4>
        </div>
        <p className="text-[11px] text-brand-black font-black leading-relaxed">
          {day.outfitAdvice}
        </p>
      </div>
    </motion.div>
  );
};
