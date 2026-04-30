/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AppDB } from '../types';
import { COURSES } from '../constants';
import { Check, Trash2, Clock, CheckCircle2, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface TasksProps {
  db: AppDB;
  setDb: (db: AppDB | ((prev: AppDB) => AppDB)) => void;
}

export default function Tasks({ db, setDb }: TasksProps) {
  const [tc, setTc] = useState(COURSES[0].code);
  const [tt, setTt] = useState('Assignment');
  const [tn, setTn] = useState('1');
  const [td, setTd] = useState(new Date().toISOString().split('T')[0]);

  // Filtering state
  const [filterCourse, setFilterCourse] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All'); // 'All', 'Pending', 'Submitted'

  const addTask = () => {
    if (!tc) return;
    const task = { id: Math.random().toString(36).substr(2, 9), course: tc, type: tt, num: tn, due: td, done: false };
    setDb(prev => ({ ...prev, tasks: [...prev.tasks, task] }));
  };

  const toggleTask = (id: string) => {
    setDb(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
    }));
  };

  const delTask = (id: string) => {
    setDb(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
  };

  const today = new Date().toISOString().split('T')[0];

  const filteredTasks = db.tasks.filter(t => {
    const courseMatch = filterCourse === 'All' || t.course === filterCourse;
    const statusMatch = filterStatus === 'All' || 
                       (filterStatus === 'Pending' && !t.done) || 
                       (filterStatus === 'Submitted' && t.done);
    return courseMatch && statusMatch;
  });

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none">Management</span>
            </div>
            <h3 className="text-xl font-bold mb-6">Course Milestone</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity</label>
                <select 
                  value={tc} 
                  onChange={e => setTc(e.target.value)} 
                  className="bg-slate-800 border border-slate-700/50 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all"
                >
                  {COURSES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                <select 
                  value={tt} 
                  onChange={e => setTt(e.target.value)} 
                  className="bg-slate-800 border border-slate-700/50 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all"
                >
                  <option>Assignment</option><option>Quiz</option><option>GDB</option><option>Lab</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Sequence</label>
                <input 
                  type="number" 
                  value={tn} 
                  onChange={e => setTn(e.target.value)} 
                  min="1" 
                  className="bg-slate-800 border border-slate-700/50 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all" 
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Deadline</label>
                <input 
                  type="date" 
                  value={td} 
                  onChange={e => setTd(e.target.value)} 
                  className="bg-slate-800 border border-slate-700/50 rounded-xl p-3 text-xs focus:ring-2 focus:ring-brand-primary focus:outline-none transition-all" 
                />
              </div>
              <div className="flex flex-col justify-end">
                <button 
                  onClick={addTask} 
                  className="w-full bg-brand-primary hover:bg-brand-secondary transition-all text-white text-xs font-black h-[42px] rounded-xl uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Save
                </button>
              </div>
            </div>
         </div>
         <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 mb-6 pb-4">
              <div className="flex items-center gap-4">
                 <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                   Mission logs
                 </h2>
                 <div className="bg-slate-100 text-slate-500 rounded-lg px-2 py-0.5 text-[9px] font-bold">
                   {filteredTasks.length} items
                 </div>
              </div>

              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Course</span>
                    <select 
                      value={filterCourse} 
                      onChange={e => setFilterCourse(e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    >
                      <option value="All">All</option>
                      {COURSES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                    </select>
                 </div>
                 <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</span>
                    <select 
                      value={filterStatus} 
                      onChange={e => setFilterStatus(e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-bold focus:outline-none focus:ring-1 focus:ring-brand-primary"
                    >
                      <option value="All">All</option>
                      <option value="Pending">Pending</option>
                      <option value="Submitted">Submitted</option>
                    </select>
                 </div>
              </div>
           </div>
           
           {filteredTasks.length === 0 ? (
             <div className="py-24 text-center bg-white border border-slate-100 rounded-3xl">
                <Clock size={32} className="mx-auto text-slate-200 mb-4" />
                <p className="text-sm text-slate-400 font-medium italic">No matching records found.</p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTasks.map((t, i) => {
                  const ov = t.due && t.due < today && !t.done;
                  return (
                    <motion.div 
                      key={t.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`group bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all relative overflow-hidden ${t.done ? 'opacity-50 grayscale' : ''}`}
                    >
                      {ov && <div className="absolute top-0 left-0 w-full h-[3px] bg-rose-500"></div>}
                      
                      <div className="flex items-center justify-between mb-4">
                         <div className="flex items-center gap-2">
                           <span className="text-[9px] font-black text-brand-primary bg-blue-50 px-2 py-0.5 rounded-lg uppercase tracking-tight">{t.course}</span>
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t.type}</span>
                         </div>
                         <button 
                           onClick={() => toggleTask(t.id)} 
                           className={`w-7 h-7 rounded-lg border-2 transition-all flex items-center justify-center ${t.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-100 group-hover:border-brand-primary/30 text-transparent hover:text-brand-primary hover:bg-blue-50'}`}
                         >
                           <Check size={16} strokeWidth={3} />
                         </button>
                      </div>

                      <h4 className={`text-sm font-bold mb-4 line-clamp-2 ${t.done ? 'text-slate-400 line-through' : 'text-slate-900 group-hover:text-brand-primary transition-colors'}`}>
                        {t.type} {t.num} ({t.course})
                      </h4>

                      <div className="flex items-start justify-between mt-auto pt-4 border-t border-slate-50">
                         <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Due Date</span>
                            <span className={`text-[11px] font-black ${ov ? 'text-rose-500' : 'text-slate-600'}`}>
                               {t.due ? t.due : 'No date'}
                            </span>
                         </div>
                         <button onClick={() => delTask(t.id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-500 transition-all">
                            <Trash2 size={14} />
                         </button>
                      </div>
                    </motion.div>
                  );
                })}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
