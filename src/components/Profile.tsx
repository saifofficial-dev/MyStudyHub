/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { STUDENT_INFO } from '../constants';
import { User, Mail, Calendar, Shield, MapPin, Hash, GraduationCap, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const details = [
    { label: "VU LMS ID", value: STUDENT_INFO.studentId, icon: Hash },
    { label: "Father's Name", value: STUDENT_INFO.fatherName, icon: Shield },
    { label: "Registration No", value: STUDENT_INFO.regNo, icon: Hash },
    { label: "Form No", value: STUDENT_INFO.formNo, icon: Shield },
    { label: "Campus Code", value: STUDENT_INFO.campus, icon: MapPin },
    { label: "Admission Date", value: STUDENT_INFO.admissionDate, icon: Calendar },
    { label: "Birth Date", value: STUDENT_INFO.birthDate, icon: Calendar },
    { label: "Gender", value: STUDENT_INFO.gender, icon: User },
    { label: "Study Program", value: STUDENT_INFO.program, icon: GraduationCap },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-brand-primary border-4 border-slate-800 flex items-center justify-center text-3xl font-black shadow-xl">
             {STUDENT_INFO.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Verified Student Account</span>
            </div>
            <h2 className="text-2xl font-bold mb-1 text-center md:text-left">{STUDENT_INFO.name}</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 justify-center md:justify-start">
               <span className="flex items-center gap-1.5 font-bold text-white"><Hash size={14} className="text-brand-primary" /> {STUDENT_INFO.studentId}</span>
               <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-brand-primary" /> {STUDENT_INFO.program}</span>
               <span className="flex items-center gap-1.5"><Mail size={14} className="text-brand-primary" /> {STUDENT_INFO.email}</span>
            </div>
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

      <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">Academic Status</h4>
          <p className="text-xs text-slate-500">Currently enrolled in Semester {STUDENT_INFO.semester} at Virtual University of Pakistan.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-brand-primary shadow-sm">
          Active Student
        </div>
      </div>
    </div>
  );
}
