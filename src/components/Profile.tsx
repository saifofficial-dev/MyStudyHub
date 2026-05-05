/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppDB } from '../types';
import { User, Mail, Calendar, Shield, MapPin, Hash, GraduationCap, Briefcase, Upload, Camera } from 'lucide-react';
import { motion } from 'motion/react';
import { useRef, ChangeEvent } from 'react';

interface ProfileProps {
  db: AppDB;
  setDb: (db: AppDB) => void;
}

export default function Profile({ db, setDb }: ProfileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profile = db.profile;

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setDb({
        ...db,
        profile: {
          ...profile,
          avatarUrl: dataUrl
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const details = [
    { label: "VU LMS ID", value: profile.studentId, icon: Hash },
    { label: "Father's Name", value: profile.fatherName, icon: Shield },
    { label: "Registration No", value: profile.regNo, icon: Hash },
    { label: "Form No", value: profile.formNo, icon: Shield },
    { label: "Campus Code", value: profile.campus, icon: MapPin },
    { label: "Admission Date", value: profile.admissionDate, icon: Calendar },
    { label: "Birth Date", value: profile.birthDate, icon: Calendar },
    { label: "Gender", value: profile.gender, icon: User },
    { label: "Study Program", value: profile.program, icon: GraduationCap },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            {profile.avatarUrl ? (
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 shadow-xl group-hover:opacity-75 transition-opacity"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-brand-primary border-4 border-slate-800 flex items-center justify-center text-3xl font-black shadow-xl group-hover:opacity-75 transition-opacity">
                 {profile.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
               <Camera size={24} className="text-white" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleUpload} 
              className="hidden" 
              accept="image/*"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Verified Student Account</span>
            </div>
            <h2 className="text-2xl font-bold mb-1 text-center md:text-left">{profile.name}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 justify-center md:justify-start">
               <span className="flex items-center gap-1.5 font-bold text-white"><Hash size={14} className="text-brand-primary" /> {profile.studentId}</span>
               <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-brand-primary" /> {profile.program}</span>
               <span className="flex items-center gap-1.5"><Mail size={14} className="text-brand-primary" /> {profile.email}</span>
            </div>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              <Upload size={12} /> Change Picture
            </button>
          </div>
        </div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12">
           <div className="flex items-center gap-8 border-b border-slate-100 mb-6">
              <div className="border-b-2 border-brand-primary pb-3 px-1">
                 <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                   Personal Information Record
                 </h2>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {details.map((detail, i) => (
                <motion.div 
                  key={detail.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <detail.icon size={14} className="text-slate-400 group-hover:text-brand-primary transition-colors" />
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{detail.label}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{detail.value || 'N/A'}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <User size={14} className="text-brand-primary" /> Internship Supervisor
           </h3>
           <div className="space-y-6">
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Lead Supervisor</p>
                 <p className="text-sm font-bold text-slate-900">{profile.supervisor}</p>
                 <p className="text-xs text-slate-500 mt-1">{profile.supervisorEmail}</p>
              </div>
              <div className="flex items-center gap-12">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Extension</p>
                    <p className="text-sm font-bold text-slate-900">{profile.supervisorExt}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">Project ID</p>
                    <p className="text-sm font-bold text-slate-900">{profile.internshipGroupId}</p>
                 </div>
              </div>
           </div>
        </div>
        
        <div className="bg-brand-primary p-8 rounded-3xl text-white relative overflow-hidden flex flex-col justify-between">
           <div className="relative z-10">
              <h3 className="text-xs font-black text-blue-200 uppercase tracking-widest mb-4">Course CSI619</h3>
              <h4 className="text-xl font-black mb-2">Field Experience / Internship</h4>
              <p className="text-xs text-blue-100 leading-relaxed max-w-[240px]">
                Your internship involves periodic submissions including approval forms, reports, and a final presentation.
              </p>
           </div>
           <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
              <div className="bg-white/10 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Ongoing</div>
              <span className="text-[10px] font-bold text-blue-100 italic">Phase: Organization Approval</span>
           </div>
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Academic Status</h4>
          <p className="text-xs text-slate-500">Currently enrolled in Semester {profile.semester} at Virtual University of Pakistan.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-brand-primary shadow-sm">
          Active Student
        </div>
      </div>
    </div>
  );
}
