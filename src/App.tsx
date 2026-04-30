/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STUDENT_INFO, COURSES } from './constants';
import { AppDB, View } from './types';

// Components
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LectureTracker from './components/LectureTracker';
import Schedule from './components/Schedule';
import Tasks from './components/Tasks';
import Profile from './components/Profile';

const INITIAL_DB: AppDB = {
  lec: COURSES.reduce((acc, c) => ({ ...acc, [c.code]: {} }), {}),
  sched: [],
  tasks: []
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [db, setDb] = useLocalStorage<AppDB>('vu-study-planner-db', INITIAL_DB);

  const pendingTasksCount = useMemo(() => {
    return db.tasks.filter(t => !t.done).length;
  }, [db.tasks]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard db={db} />;
      case 'lectures':
        return <LectureTracker db={db} setDb={setDb} />;
      case 'schedule':
        return <Schedule db={db} setDb={setDb} />;
      case 'tasks':
        return <Tasks db={db} setDb={setDb} />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard db={db} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        pendingCount={pendingTasksCount} 
      />
      
      <main className="main-content">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {currentView === 'dashboard' && 'Academic Overview'}
              {currentView === 'lectures' && 'Lecture Tracker'}
              {currentView === 'schedule' && 'Weekly Planner'}
              {currentView === 'tasks' && 'Tasks & Graded'}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Welcome back, {STUDENT_INFO.name.split(' ')[0]}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="bg-white px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest shadow-sm">
                Semester {STUDENT_INFO.semester}
             </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
