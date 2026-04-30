/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppDB } from '../types';
import { COURSES } from '../constants';
import { CheckCircle2, BookOpen, Target, Clock, Calendar } from 'lucide-react';
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

  const todayStr = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());
  const todaysSchedule = db.sched.filter(s => s.day === todayStr);

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
            <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2 px-1">
              <BookOpen size={16} className="text-brand-primary" /> Learning Momentum
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
          <div className="bg-slate-900 rounded-3xl p-6 text-white h-full relative overflow-hidden shadow-2xl shadow-slate-900/10">
             <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest text-slate-400">
                     <Calendar size={14} /> Daily Routine
                   </h3>
                   <span className="text-[10px] font-black text-brand-primary bg-blue-500/10 px-2 py-0.5 rounded-lg">{todayStr}</span>
                </div>
                
                <div className="flex-1 space-y-3">
                   {todaysSchedule.length === 0 ? (
                      <div className="py-8 text-center bg-slate-800/50 rounded-2xl border border-slate-700/50">
                         <p className="text-xs font-bold text-slate-500 italic">Rest day — No targets set</p>
                      </div>
                   ) : (
                      todaysSchedule.map((s, idx) => {
                         const course = COURSES.find(c => c.code === s.course);
                         return (
                            <motion.div 
                               key={idx}
                               initial={{ opacity: 0, x: 20 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: 0.6 + (idx * 0.1) }}
                               className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50 flex items-center justify-between group hover:bg-slate-800 transition-colors"
                            >
                               <div className="flex flex-col min-w-0">
                                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-tighter mb-0.5">{s.course}</span>
                                  <span className="text-xs font-bold truncate pr-2">{course?.name}</span>
                               </div>
                               <div className="flex flex-col items-end">
                                  <span className="text-[10px] font-black text-slate-500 leading-none mb-1">{s.cnt}</span>
                                  <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest leading-none">Lecs</span>
                               </div>
                            </motion.div>
                         )
                      })
                   )}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-brand-primary">
                      <Target size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Goal Focus</span>
                      <span className="text-xs font-medium text-slate-300">Complete daily targets early</span>
                    </div>
                  </div>
                </div>
             </div>
             <div className="absolute -bottom-20 -right-20 w-52 h-52 bg-brand-primary/5 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
