import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, RefreshCw, ArrowRightLeft, TrendingUp, Info } from 'lucide-react';

export const SplitTab = () => {
  const [jpyAmount, setJpyAmount] = useState<string>('1000');
  const [twdAmount, setTwdAmount] = useState<string>('');
  const [rate, setRate] = useState<number>(0.2154); // Default rate
  const [activeInput, setActiveInput] = useState<'JPY' | 'TWD'>('JPY');

  // Calculation logic
  useEffect(() => {
    if (activeInput === 'JPY') {
      const val = parseFloat(jpyAmount);
      if (!isNaN(val)) {
        setTwdAmount((val * rate).toFixed(2));
      } else {
        setTwdAmount('');
      }
    }
  }, [jpyAmount, rate, activeInput]);

  useEffect(() => {
    if (activeInput === 'TWD') {
      const val = parseFloat(twdAmount);
      if (!isNaN(val)) {
        setJpyAmount((val / rate).toFixed(0));
      } else {
        setJpyAmount('');
      }
    }
  }, [twdAmount, rate, activeInput]);

  const quickAmounts = [1000, 5000, 10000, 50000];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20"
    >
      {/* Rate Display Card */}
      <div className="bg-brand-black text-white rounded-[32px] p-6 hard-shadow-rose relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <p className="text-white/40 text-[10px] font-black uppercase tracking-widest">當前匯率參考</p>
            <div className="flex items-center gap-1 bg-brand-yellow text-brand-black px-2 py-1 rounded-lg text-[9px] font-black animate-pulse">
              <TrendingUp size={10} />
              LIVE
            </div>
          </div>
          
          <div className="flex items-end gap-2 flex-nowrap">
            <h2 className="text-2xl font-black tracking-tight whitespace-nowrap">1 JPY =</h2>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-2xl border border-white/5 mb-0.5 shrink-0">
              <input 
                type="number" 
                step="0.0001"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                className="w-20 bg-transparent text-xl font-black focus:outline-none text-brand-yellow"
              />
              <span className="text-xs font-bold opacity-40">TWD</span>
            </div>
          </div>
          
          <p className="text-[10px] text-white/30 font-bold mt-4 flex items-center gap-1">
            <Info size={10} /> 匯率浮動僅供參考，請以換匯當下為準
          </p>
        </div>
      </div>

      {/* Converter Main Tool */}
      <div className="bg-white border-2 border-brand-black rounded-[32px] p-6 hard-shadow-black">
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border-2 transition-all ${activeInput === 'JPY' ? 'border-brand-black bg-brand-bg' : 'border-transparent bg-transparent'}`}>
            <label className="text-[10px] font-black uppercase opacity-40 ml-1">日幣 (JPY)</label>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-brand-black/20">¥</span>
              <input 
                type="number"
                value={jpyAmount}
                onFocus={() => setActiveInput('JPY')}
                onChange={(e) => {
                  setActiveInput('JPY');
                  setJpyAmount(e.target.value);
                }}
                placeholder="0"
                className="w-full bg-transparent text-3xl font-black focus:outline-none placeholder:text-brand-black/5"
              />
            </div>
          </div>

          <div className="flex justify-center -my-2 relative z-10">
            <div className="w-10 h-10 bg-brand-yellow border-2 border-brand-black rounded-full flex items-center justify-center shadow-md">
              <ArrowRightLeft size={18} strokeWidth={3} className="rotate-90" />
            </div>
          </div>

          <div className={`p-4 rounded-2xl border-2 transition-all ${activeInput === 'TWD' ? 'border-brand-black bg-brand-bg' : 'border-transparent bg-transparent'}`}>
            <label className="text-[10px] font-black uppercase opacity-40 ml-1">台幣 (TWD)</label>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-brand-black/20">$</span>
              <input 
                type="number"
                value={twdAmount}
                onFocus={() => setActiveInput('TWD')}
                onChange={(e) => {
                  setActiveInput('TWD');
                  setTwdAmount(e.target.value);
                }}
                placeholder="0"
                className="w-full bg-transparent text-3xl font-black focus:outline-none placeholder:text-brand-black/5"
              />
            </div>
          </div>
        </div>

        {/* Quick Select */}
        <div className="mt-8 pt-6 border-t-2 border-dashed border-brand-black/10">
          <p className="text-[10px] font-black uppercase opacity-30 mb-3 text-center tracking-widest">快速輸入日幣</p>
          <div className="grid grid-cols-2 gap-2">
            {quickAmounts.map(amt => (
              <button 
                key={amt}
                onClick={() => {
                  setActiveInput('JPY');
                  setJpyAmount(amt.toString());
                }}
                className="py-2.5 rounded-xl border-2 border-brand-black bg-brand-beige font-black text-[12px] hover:bg-brand-yellow transition-colors active:translate-y-0.5"
              >
                ¥{amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Useful Info */}
      <div className="bg-brand-coral/10 border-2 border-dashed border-brand-coral rounded-[32px] p-6 space-y-4">
        <h4 className="font-black text-sm flex items-center gap-2 text-brand-coral uppercase">
          <RefreshCw size={16} /> 換匯提醒
        </h4>
        <ul className="space-y-2">
          {[
            '大部分連鎖店可使用 PayPay (街口換匯直接算)',
            '由布院、黑川等山區店家偶爾只收現',
            '刷卡建議選擇「日幣結帳」通常匯率較優',
          ].map((tip, i) => (
            <li key={i} className="text-xs font-bold text-brand-black/60 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-coral mt-1.5 shrink-0" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
