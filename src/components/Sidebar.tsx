/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LayoutDashboard, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';
import { View } from '../types';
import { STUDENT_INFO } from '../constants';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  pendingCount: number;
}

export default function Sidebar({ currentView, onViewChange, pendingCount }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'lectures' as View, label: 'Lectures', icon: BookOpen },
    { id: 'schedule' as View, label: 'Schedule', icon: Calendar },
    { id: 'tasks' as View, label: 'Tasks', icon: CheckCircle2, badge: pendingCount },
  ];

  return (
    <nav className="sidebar-portal">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
           <div className="w-9 h-9 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-lg">
            V
           </div>
           <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-tight">Academic</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Portal</span>
           </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-4 px-4">Menu</div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`nav-item-refined w-full ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-[10px] font-black ${isActive ? 'bg-white text-brand-primary' : 'bg-slate-800 text-slate-400'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="mt-auto p-8 border-t border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-black text-slate-300">
            {STUDENT_INFO.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold truncate text-slate-100">{STUDENT_INFO.name}</span>
            <span className="text-[10px] text-slate-500 font-medium truncate uppercase tracking-tighter">{STUDENT_INFO.studentId}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
