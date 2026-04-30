/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppDB, DayOfWeek } from '../types';
import { DAYS, COURSES } from '../constants';

interface ScheduleProps {
  db: AppDB;
  setDb: (db: AppDB | ((prev: AppDB) => AppDB)) => void;
}

export default function Schedule({ db, setDb }: ScheduleProps) {
  const [fDay, setFDay] = useState<DayOfWeek>('Monday');
  const [fCourse, setFCourse] = useState(COURSES[0].code);
  const [fCnt, setFCnt] = useState(2);

  const addSched = () => {
    const item = { id: Math.random().toString(36).substr(2, 9), day: fDay, course: fCourse, cnt: fCnt };
    setDb(prev => ({ ...prev, sched: [...prev.sched, item] }));
  };

  const delSched = (id: string) => {
    setDb(prev => ({ ...prev, sched: prev.sched.filter(s => s.id !== id) }));
  };

  return (
    <div id="page-schedule" className="page active">
      <div className="page-hd">
        <div>
          <div className="page-title">Weekly schedule</div>
          <div className="page-sub">Plan your daily lecture targets</div>
        </div>
      </div>
      
    <div className="space-y-6">
      <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Plan</h3>
           <span className="text-[10px] font-bold text-slate-400">{db.sched.length} Slots</span>
        </div>
        <div className="divide-y divide-slate-50">
          {db.sched.length === 0 ? (
            <div className="py-12 text-center">
               <p className="text-sm text-slate-400 italic">No daily targets set. Add your routine below.</p>
            </div>
          ) : (
            db.sched.map((s) => (
              <div key={s.id} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex flex-col items-center justify-center border border-blue-100 shadow-sm shadow-blue-100/50">
                    <span className="text-[8px] font-black text-brand-primary uppercase leading-none">{s.day.substring(0, 3)}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{s.course}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{s.cnt} Lectures per day</p>
                  </div>
                </div>
                <button 
                  onClick={() => delSched(s.id)} 
                  className="px-3 py-1.5 text-[10px] font-black text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors uppercase tracking-widest border border-rose-100"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 shadow-xl shadow-slate-900/10">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Add Schedule Slot</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Day of week</label>
            <select 
              value={fDay} 
              onChange={e => setFDay(e.target.value as DayOfWeek)} 
              className="bg-slate-800 text-white border border-slate-700 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all"
            >
              {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course Code</label>
            <select 
              value={fCourse} 
              onChange={e => setFCourse(e.target.value)} 
              className="bg-slate-800 text-white border border-slate-700 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all"
            >
              {COURSES.map(c => <option key={c.code} value={c.code}>{c.code} — {c.name.split(' ').slice(0, 2).join(' ')}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Daily Target</label>
            <div className="flex items-center gap-3">
               <input 
                 type="number" 
                 value={fCnt} 
                 onChange={e => setFCnt(parseInt(e.target.value) || 1)} 
                 min="1" max="5" 
                 className="bg-slate-800 text-white border border-slate-700 rounded-xl p-3 text-xs w-full focus:ring-2 focus:ring-brand-primary focus:outline-none" 
               />
               <button 
                 onClick={addSched} 
                 className="px-6 py-3 bg-brand-primary text-white text-xs font-black rounded-xl hover:shadow-lg hover:shadow-brand-primary/40 transition-all whitespace-nowrap uppercase tracking-widest"
               >
                 Add Target
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
