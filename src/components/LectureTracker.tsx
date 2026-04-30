/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppDB, LectureProgress } from '../types';
import { COURSES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

interface LectureTrackerProps {
  db: AppDB;
  setDb: (db: AppDB | ((prev: AppDB) => AppDB)) => void;
}

export default function LectureTracker({ db, setDb }: LectureTrackerProps) {
  const [selectedLec, setSelectedLec] = useState<{ code: string; num: number } | null>(null);

  const getWatchedCount = (code: string) => Object.values(db.lec[code] || {}).filter(d => d.w).length;

  const handleSaveLec = (progress: LectureProgress) => {
    if (!selectedLec) return;
    const { code, num } = selectedLec;
    setDb(prev => ({
      ...prev,
      lec: { ...prev.lec, [code]: { ...prev.lec[code], [num]: progress } }
    }));
    setSelectedLec(null);
  };

  const handleResetLec = () => {
    if (!selectedLec) return;
    const { code, num } = selectedLec;
    setDb(prev => {
      const newLecAtCode = { ...prev.lec[code] };
      delete newLecAtCode[num];
      return { ...prev, lec: { ...prev.lec, [code]: newLecAtCode } };
    });
    setSelectedLec(null);
  };

  return (
    <div id="page-lectures" className="page active">
      <div className="page-hd">
        <div>
          <div className="page-title">Lecture tracker</div>
          <div className="page-sub">Click any lecture to mark progress</div>
        </div>
      </div>
    <div className="space-y-6">
      <div className="legend flex flex-wrap gap-4 px-1">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           <div className="w-3 h-3 rounded bg-emerald-50 border border-emerald-200 shadow-sm shadow-emerald-100"></div>
           Watched
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           <div className="w-3 h-3 rounded bg-amber-50 border border-amber-200 shadow-sm shadow-amber-100"></div>
           Partial (A/Q)
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
           <div className="w-3 h-3 rounded bg-white border border-slate-100 italic"></div>
           Yet to start
        </div>
      </div>

      <div className="space-y-6">
        {COURSES.map((c, i) => {
          const l = db.lec[c.code] || {};
          const wc = getWatchedCount(c.code);
          const pct = Math.round((wc / c.total) * 100);
          return (
            <motion.div 
              key={c.code} 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between p-4 bg-slate-50/50 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="bg-brand-primary text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm shadow-brand-primary/20">{c.code}</span>
                  <span className="text-sm font-bold text-slate-800">{c.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Coverage</span>
                    <span className="text-xs font-black text-slate-900">{wc} / {c.total}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-[10px] font-black ${pct > 60 ? 'bg-emerald-100 text-emerald-700' : pct > 30 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                    {pct}%
                  </div>
                </div>
              </div>
              <div className="p-5 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-10 xl:grid-cols-12 gap-2">
                {Array.from({ length: c.total }, (_, idx) => {
                  const n = idx + 1;
                  const d = (l[n] || {}) as Partial<LectureProgress>;
                  const isDone = !!d.w;
                  const isPartial = !!(d.a || d.q);
                  const sub = (d.a ? 'A' : '') + (d.q ? 'Q' : '');
                  return (
                    <button 
                      key={n} 
                      onClick={() => setSelectedLec({ code: c.code, num: n })} 
                      className={`lb-refined ${isDone ? 'done' : isPartial ? 'partial' : 'bg-white border-slate-100 text-slate-400'}`}
                    >
                      <span className="mb-0.5">{n}</span>
                      {sub && <span className="text-[7px] font-black opacity-60 leading-none">{sub}</span>}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {selectedLec && <LecModal code={selectedLec.code} num={selectedLec.num} progress={db.lec[selectedLec.code]?.[selectedLec.num] || { w: false, a: false, q: false, notes: '' }} onSave={handleSaveLec} onReset={handleResetLec} onClose={() => setSelectedLec(null)} />}
      </AnimatePresence>
    </div>
    </div>
  );
}

function LecModal({ code, num, progress, onSave, onReset, onClose }: { code: string; num: number; progress: LectureProgress; onSave: (p: LectureProgress) => void; onReset: () => void; onClose: () => void; }) {
  const [data, setData] = useState<LectureProgress>(progress);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between"><h3 className="font-bold text-sm">{code} — Lecture {num}</h3><button onClick={onClose} className="text-gray-400 hover:text-gray-600">&#x2715;</button></div>
        <div className="p-5 space-y-4">
          {[{ k: 'w', t: 'Lecture watched', s: 'Mark on LMS' }, { k: 'a', t: 'Assignment submitted' }, { k: 'q', t: 'Quiz attempted' }].map(({ k, t, s }) => (
            <label key={k} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" checked={(data as any)[k]} onChange={e => setData({ ...data, [k]: e.target.checked })} className="w-4 h-4 accent-blue-600" />
              <div className="flex flex-col"><span className="text-xs font-semibold">{t}</span>{s && <span className="text-[10px] text-gray-500">{s}</span>}</div>
            </label>
          ))}
          <div><label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Notes</label><textarea value={data.notes} onChange={e => setData({ ...data, notes: e.target.value })} className="w-full border border-gray-200 rounded-lg p-3 text-xs min-h-[80px] focus:outline-none focus:border-blue-500" placeholder="Important notes..." /></div>
        </div>
        <div className="p-4 bg-gray-50 flex gap-2">
          <button onClick={() => onSave(data)} className="flex-1 py-2 bg-blue-100 text-blue-800 text-xs font-bold rounded-lg border border-blue-200">Save</button>
          <button onClick={onReset} className="flex-1 py-2 bg-red-50 text-red-800 text-xs font-bold rounded-lg border border-red-100">Reset</button>
          <button onClick={onClose} className="px-4 py-2 text-gray-500 text-xs font-bold">Cancel</button>
        </div>
      </motion.div>
    </div>
  );
}
