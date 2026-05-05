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
  tasks: [
    { id: 'csi-1', course: 'CSI619', type: 'Assignment', num: '1', due: '2026-05-15', done: false, title: 'Internship-Organization Approval Form' },
    { id: 'csi-2', course: 'CSI619', type: 'Assignment', num: '2', due: '2026-05-25', done: false, title: 'Internship Report' },
    { id: 'csi-3', course: 'CSI619', type: 'Assignment', num: '3', due: '2026-06-04', done: false, title: 'Internship Completion Certificate' },
    { id: 'csi-4', course: 'CSI619', type: 'Assignment', num: '4', due: '2026-07-14', done: false, title: 'Final Presentation' },
  ],
  profile: STUDENT_INFO
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [db, setDb] = useLocalStorage<AppDB>('vu-study-planner-db', INITIAL_DB);

  // Normalize db to ensure all fields exist (for users with older data in localStorage)
  const normalizedDb = useMemo(() => {
    return {
      ...INITIAL_DB,
      ...db,
      profile: db.profile || INITIAL_DB.profile,
      lec: db.lec || INITIAL_DB.lec,
      tasks: db.tasks || INITIAL_DB.tasks,
      sched: db.sched || INITIAL_DB.sched,
    };
  }, [db]);

  const profile = normalizedDb.profile;

  const pendingTasksCount = useMemo(() => {
    return normalizedDb.tasks.filter(t => !t.done).length;
  }, [normalizedDb.tasks]);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard db={normalizedDb} />;
      case 'lectures':
        return <LectureTracker db={normalizedDb} setDb={setDb} />;
      case 'schedule':
        return <Schedule db={normalizedDb} setDb={setDb} />;
      case 'tasks':
        return <Tasks db={normalizedDb} setDb={setDb} />;
      case 'profile':
        return <Profile db={normalizedDb} setDb={setDb} />;
      default:
        return <Dashboard db={normalizedDb} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        pendingCount={pendingTasksCount} 
        profile={profile}
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
              Welcome back, {(profile.name || 'Student').split(' ')[0]}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="bg-white px-3 py-1.5 rounded-full border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-widest shadow-sm">
                Semester {profile.semester || 1}
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
