import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Receipt, User, PieChart, Wallet, ArrowRight, X, Trash2, Users } from 'lucide-react';
import { Friend, Expense } from '../types';

export const SplitTab = () => {
  const [friends, setFriends] = useState<Friend[]>([
    { id: '1', name: 'Penny' },
    { id: '2', name: 'Ray' },
  ]);

  const [exchangeRate, setExchangeRate] = useState(0.21); // JPY to TWD approx
  const [currency, setCurrency] = useState<'JPY' | 'TWD'>('JPY');

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', category: '住宿', amount: 24960, note: '福岡包棟民宿', payerId: '1', splitWithIds: ['1', '2'], day: 2 },
    { id: '2', category: '餐飲', amount: 3500, note: '蒸籠鰻魚飯', payerId: '1', splitWithIds: ['1', '2'], day: 3 },
    { id: '3', category: '交通', amount: 12000, note: '租車+油錢', payerId: '2', splitWithIds: ['1', '2'], day: 1 },
  ]);

  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  
  const [newExpense, setNewExpense] = useState({
    note: '',
    amount: '',
    currency: 'JPY',
    category: '餐飲',
    payerId: '1',
    day: 1,
    splitWithIds: ['1', '2']
  });

  const total = useMemo(() => expenses.reduce((acc, curr) => acc + curr.amount, 0), [expenses]);
  const totalTWD = useMemo(() => total * exchangeRate, [total, exchangeRate]);

  const balances = useMemo(() => {
    const bal: Record<string, number> = {};
    friends.forEach(f => bal[f.id] = 0);
    
    expenses.forEach(exp => {
      const share = exp.amount / exp.splitWithIds.length;
      bal[exp.payerId] += exp.amount;
      exp.splitWithIds.forEach(id => {
        bal[id] -= share;
      });
    });
    return bal;
  }, [friends, expenses]);

  const settlements = useMemo(() => {
    const debtors: { id: string; amount: number }[] = [];
    const creditors: { id: string; amount: number }[] = [];
    
    Object.entries(balances).forEach(([id, val]) => {
      const amt = val as number;
      if (amt < -0.01) debtors.push({ id, amount: Math.abs(amt) });
      else if (amt > 0.01) creditors.push({ id, amount: amt });
    });

    const results: { from: string; to: string; amount: number }[] = [];
    
    let dIdx = 0;
    let cIdx = 0;
    
    while (dIdx < debtors.length && cIdx < creditors.length) {
      const d = debtors[dIdx];
      const c = creditors[cIdx];
      const settleAmount = Math.min(d.amount, c.amount);
      
      results.push({
        from: d.id,
        to: c.id,
        amount: settleAmount
      });
      
      d.amount -= settleAmount;
      c.amount -= settleAmount;
      
      if (d.amount < 0.01) dIdx++;
      if (c.amount < 0.01) cIdx++;
    }
    
    return results;
  }, [balances]);

  const handleAddFriend = () => {
    if (!newFriendName.trim()) return;
    const newId = Date.now().toString();
    setFriends([...friends, { id: newId, name: newFriendName }]);
    setNewFriendName('');
    setIsAddingFriend(false);
  };

  const handleAddExpense = () => {
    let amount = parseFloat(newExpense.amount);
    if (!newExpense.note || isNaN(amount) || newExpense.splitWithIds.length === 0) return;
    
    // If entered in TWD, convert to JPY for base storage
    if (newExpense.currency === 'TWD') {
      amount = amount / exchangeRate;
    }

    setExpenses([{
      ...newExpense,
      id: Date.now().toString(),
      amount
    } as Expense, ...expenses]);
    
    setIsAddingExpense(false);
    setNewExpense({
      note: '',
      amount: '',
      currency: 'JPY',
      category: '餐飲',
      payerId: friends[0]?.id || '',
      day: 1,
      splitWithIds: friends.map(f => f.id)
    });
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const deleteFriend = (id: string) => {
    if (friends.length <= 1) return;
    setFriends(friends.filter(f => f.id !== id));
    setExpenses(expenses.filter(e => e.payerId !== id && !e.splitWithIds.includes(id)));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-20"
    >
      {/* Overview Card */}
      <div className="bg-brand-black text-white rounded-3xl p-6 hard-shadow-rose relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -mr-16 -mt-16 rounded-full" />
        <div className="relative z-10">
           <div className="flex justify-between items-start">
             <div>
               <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">總累計支出</p>
               <h2 className="text-4xl font-black tracking-tight">
                 {currency === 'JPY' ? '¥' : '$'} {Math.round(currency === 'JPY' ? total : totalTWD).toLocaleString()}
               </h2>
             </div>
             <div className="bg-white/10 rounded-xl p-1 flex border border-white/5">
                <button 
                  onClick={() => setCurrency('JPY')}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${currency === 'JPY' ? 'bg-white text-brand-black' : 'text-white/40'}`}
                >JPY</button>
                <button 
                  onClick={() => setCurrency('TWD')}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${currency === 'TWD' ? 'bg-white text-brand-black' : 'text-white/40'}`}
                >TWD</button>
             </div>
           </div>

           <div className="mt-4 flex items-center gap-2">
              <span className="text-[10px] font-bold text-white/30 uppercase">匯率設定:</span>
              <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-lg border border-white/5">
                <span className="text-[10px] font-black">1 JPY = </span>
                <input 
                  type="number" 
                  step="0.001"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 0)}
                  className="w-12 bg-transparent text-[10px] font-black focus:outline-none border-b border-white/20 text-center"
                />
                <span className="text-[10px] font-black">TWD</span>
              </div>
           </div>

           <div className="flex gap-4 mt-6">
              <div className="flex-1 bg-white/10 p-3 rounded-2xl border border-white/5">
                 <p className="text-[10px] text-white/30 font-bold mb-1 uppercase tracking-tight">參與人數</p>
                 <p className="text-lg font-bold tracking-tighter">{friends.length} 人</p>
              </div>
              <div className="flex-1 bg-white/10 p-3 rounded-2xl border border-white/5">
                 <p className="text-[10px] text-white/30 font-bold mb-1 uppercase tracking-tight">平均應付</p>
                 <p className="text-lg font-bold tracking-tighter">
                   {currency === 'JPY' ? '¥' : '$'} {Math.round((currency === 'JPY' ? total : totalTWD) / (friends.length || 1)).toLocaleString()}
                 </p>
                 {currency === 'JPY' && (
                   <p className="text-[10px] font-bold text-white/40 mt-1">
                     台幣約 $ {Math.round(totalTWD / (friends.length || 1)).toLocaleString()}
                   </p>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Friends Management */}
      <div className="bg-white rounded-3xl p-5 border-2 border-brand-black hard-shadow-black">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold flex items-center gap-2 text-xs uppercase tracking-wider">
            <Users size={16} /> 行程夥伴
          </h4>
          <button 
            onClick={() => setIsAddingFriend(true)}
            className="w-8 h-8 rounded-full border-2 border-brand-black flex items-center justify-center bg-brand-yellow active:translate-y-0.5 transition-all"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {friends.map(f => (
            <div key={f.id} className="bg-brand-bg px-3 py-1.5 rounded-xl border-2 border-brand-black/5 flex items-center gap-2 text-xs font-bold relative group">
              <div className="w-5 h-5 rounded-full bg-brand-sage flex items-center justify-center text-[10px] text-white">
                {f.name[0]}
              </div>
              {f.name}
              <button 
                onClick={() => deleteFriend(f.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-1 text-red-500"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settlement Section */}
      {settlements.length > 0 && (
        <div className="bg-brand-coral/30 rounded-3xl p-5 sketch-border relative stamp-skew-right">
           <div className="absolute top-1/2 -left-2 w-4 h-4 bg-brand-paper border-2 border-brand-black rounded-full -translate-y-1/2" />
           <h4 className="font-bold flex items-center gap-2 mb-3 text-xs uppercase tracking-wider">
              <Wallet size={16} />
              結算狀態
           </h4>
           <div className="space-y-2">
             {settlements.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-2xl border-2 border-brand-black hard-shadow-black">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-coral border border-brand-black flex items-center justify-center font-bold text-xs">
                      {friends.find(f => f.id === s.from)?.name[0]}
                    </div>
                    <span className="font-bold text-xs">{friends.find(f => f.id === s.from)?.name}</span>
                 </div>
                 <div className="flex flex-col items-center px-2">
                    <ArrowRight size={16} className="text-brand-black/30" />
                 </div>
                 <div className="flex items-center gap-2 text-right">
                    <div>
                       <p className="text-xs font-black text-brand-black">
                         {currency === 'JPY' ? '¥' : '$'} {Math.round(currency === 'JPY' ? s.amount : s.amount * exchangeRate).toLocaleString()}
                       </p>
                       <p className="text-[8px] opacity-40 font-bold uppercase truncate w-16">To {friends.find(f => f.id === s.to)?.name}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-brand-sage border border-brand-black flex items-center justify-center font-bold text-xs text-white">
                      {friends.find(f => f.id === s.to)?.name[0]}
                    </div>
                 </div>
              </div>
             ))}
           </div>
        </div>
      )}

      {/* Expense List */}
      <div className="space-y-4">
         <div className="flex justify-between items-end px-1">
            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-40">支出明細</h4>
            <button 
              onClick={() => setIsAddingExpense(true)}
              className="flex items-center gap-1 text-[10px] font-black uppercase bg-white px-4 py-1.5 rounded-full sketch-border hard-shadow-black active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
               <Plus size={14} /> 新增
            </button>
         </div>
         {expenses.map(exp => (
           <div key={exp.id} className="bg-white rounded-2xl p-4 sketch-border flex items-center justify-between group hover:hard-shadow-rose transition-all relative">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-brand-bg rounded-xl flex items-center justify-center border border-brand-black/5 stamp-skew-left">
                    <Receipt size={18} className="opacity-30" />
                 </div>
                 <div>
                    <h5 className="font-bold text-sm leading-tight">{exp.note}</h5>
                    <div className="flex gap-2 mt-1">
                       <span className="text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md bg-brand-sage/20 text-brand-black/70 border border-brand-sage/30">{exp.category}</span>
                       <span className="text-[8px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md bg-brand-bg border border-brand-black/5">Day {exp.day}</span>
                    </div>
                 </div>
              </div>
              <div className="text-right flex items-center gap-3">
                 <div>
                    <p className="font-black text-sm tracking-tight text-brand-black">
                      {currency === 'JPY' ? '¥' : '$'} {Math.round(currency === 'JPY' ? exp.amount : exp.amount * exchangeRate).toLocaleString()}
                    </p>
                    <p className="text-[8px] opacity-40 font-bold uppercase">{friends.find(f => f.id === exp.payerId)?.name || '未知'}</p>
                 </div>
                 <button 
                   onClick={() => deleteExpense(exp.id)}
                   className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-600 transition-all"
                 >
                   <Trash2 size={14} />
                 </button>
              </div>
           </div>
         ))}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isAddingFriend && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm" onClick={() => setIsAddingFriend(false)} 
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-brand-paper w-full max-w-sm rounded-[32px] border-2 border-brand-black p-6 relative z-10 hard-shadow-black"
            >
              <h3 className="text-xl font-black mb-4">新增行程夥伴</h3>
              <input 
                type="text" value={newFriendName} onChange={(e) => setNewFriendName(e.target.value)}
                placeholder="輸入朋友暱稱"
                className="w-full bg-white border-2 border-brand-black rounded-2xl p-4 font-bold text-sm focus:outline-none mb-4"
                autoFocus
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsAddingFriend(false)}
                  className="flex-1 py-3 font-black text-sm rounded-2xl border-2 border-brand-black active:translate-y-0.5 transition-all"
                >取消</button>
                <button 
                  onClick={handleAddFriend}
                  className="flex-1 py-3 font-black text-sm rounded-2xl bg-brand-yellow border-2 border-brand-black active:translate-y-0.5 transition-all"
                >確認新增</button>
              </div>
            </motion.div>
          </div>
        )}

        {isAddingExpense && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="absolute inset-0 bg-brand-black/60 backdrop-blur-sm" onClick={() => setIsAddingExpense(false)} 
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-brand-paper w-full max-w-sm rounded-[32px] border-2 border-brand-black p-6 relative z-10 hard-shadow-black max-h-[85vh] overflow-y-auto no-scrollbar"
            >
              <h3 className="text-xl font-black mb-6">新增支出明細</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase opacity-40 ml-1">項目名稱</label>
                  <input 
                    type="text" value={newExpense.note} onChange={(e) => setNewExpense({...newExpense, note: e.target.value})}
                    placeholder="例如：午餐、車資"
                    className="w-full bg-white border-2 border-brand-black rounded-xl p-3 font-bold text-sm focus:outline-none mt-1"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-40 ml-1">金額</label>
                    <div className="relative mt-1">
                      <input 
                        type="number" value={newExpense.amount} onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                        placeholder="0"
                        className="w-full bg-white border-2 border-brand-black rounded-xl p-3 pr-12 font-bold text-sm focus:outline-none"
                      />
                      <select 
                        value={newExpense.currency} 
                        onChange={(e) => setNewExpense({...newExpense, currency: e.target.value})}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-bg border-none font-bold text-[10px] focus:outline-none"
                      >
                        <option value="JPY">JPY</option>
                        <option value="TWD">TWD</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase opacity-40 ml-1">行程第幾天</label>
                    <select 
                      value={newExpense.day} onChange={(e) => setNewExpense({...newExpense, day: parseInt(e.target.value)})}
                      className="w-full bg-white border-2 border-brand-black rounded-xl p-3 font-bold text-sm focus:outline-none mt-1"
                    >
                      {[1,2,3,4,5,6].map(d => <option key={d} value={d}>Day {d}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase opacity-40 ml-1">付款人</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {friends.map(f => (
                      <button 
                        key={f.id}
                        onClick={() => setNewExpense({...newExpense, payerId: f.id})}
                        className={`px-3 py-1.5 rounded-full border-2 font-bold text-xs transition-all ${newExpense.payerId === f.id ? 'bg-brand-sage text-white border-brand-black' : 'bg-white border-brand-black/10'}`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase opacity-40 ml-1">分帳成員</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {friends.map(f => (
                      <button 
                        key={f.id}
                        onClick={() => {
                          const current = newExpense.splitWithIds;
                          const next = current.includes(f.id) 
                            ? current.filter(id => id !== f.id)
                            : [...current, f.id];
                          setNewExpense({...newExpense, splitWithIds: next});
                        }}
                        className={`px-3 py-1.5 rounded-full border-2 font-bold text-xs transition-all ${newExpense.splitWithIds.includes(f.id) ? 'bg-brand-coral text-white border-brand-black' : 'bg-white border-brand-black/10'}`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setIsAddingExpense(false)}
                  className="flex-1 py-3 font-black text-sm rounded-2xl border-2 border-brand-black active:translate-y-0.5 transition-all"
                >取消</button>
                <button 
                  onClick={handleAddExpense}
                  className="flex-1 py-3 font-black text-sm rounded-2xl bg-brand-yellow border-2 border-brand-black active:translate-y-0.5 transition-all"
                >記錄這筆</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
