/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppDB } from '../types';
import { COURSES } from '../constants';
import { CheckCircle2, BookOpen, Target, Clock, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  db: AppDB;
}

export default function Dashboard({ db }: DashboardProps) {
  const getWatchedCount = (code: string) => {
    const l = db.lec[code] || {};
    return Object.values(l).filter(d => d.w).length;
  };

  let totalWatched = 0;
  let totalLectures = 0;
  COURSES.forEach(c => {
    totalWatched += getWatchedCount(c.code);
    totalLectures += c.total;
  });

  const overallPct = totalLectures > 0 ? Math.round((totalWatched / totalLectures) * 100) : 0;
  const pendingTasks = db.tasks.filter(t => !t.done).length;

  const kpis = [
    { label: 'Completed', val: totalWatched, sub: 'Lectures', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Curriculum', val: totalLectures, sub: 'Total', icon: BookOpen, color: 'text-brand-primary', bg: 'bg-blue-50' },
    { label: 'Efficiency', val: `${overallPct}%`, sub: 'Progress', icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Pending', val: pendingTasks, sub: 'Items', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={kpi.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="kpi-card-refined group transition-all hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{kpi.label}</p>
                  <h3 className="text-2xl font-black text-slate-900 leading-none">{kpi.val}</h3>
               </div>
               <div className={`p-2 rounded-lg ${kpi.bg}`}>
                  <kpi.icon size={18} className={kpi.color} />
               </div>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">{kpi.sub} in semester</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <BookOpen size={16} /> Course Momentum
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COURSES.map((c, i) => {
              const wc = getWatchedCount(c.code);
              const pct = Math.round((wc / c.total) * 100);
              const courseTasks = db.tasks.filter(t => t.course === c.code);
              const td = courseTasks.filter(t => t.done).length;
              
              return (
                <motion.div 
                  key={c.code} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + (i * 0.05) }}
                  className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black text-brand-primary bg-blue-50 px-2 py-0.5 rounded-full">{c.code}</span>
                    <span className="text-xs font-bold text-slate-900">{pct}%</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1 mb-4 group-hover:text-brand-primary transition-colors">{c.name}</h4>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      className="h-full bg-brand-primary rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {wc}/{c.total} Lec</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> {td}/{courseTasks.length} Task</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-slate-900 rounded-2xl p-6 text-white h-full relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Student Insights</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  Based on your current pace, you're on track to finish the curriculum 12 days ahead of finals.
                </p>
                <div className="space-y-4">
                   <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                      <MessageSquare size={16} className="text-brand-primary" />
                      <div className="flex flex-col">
                         <span className="text-[10px] font-bold text-slate-500 uppercase">Pro Tip</span>
                         <span className="text-[11px] font-medium">Focus on Algorithms this week.</span>
                      </div>
                   </div>
                </div>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
