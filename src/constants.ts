/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, StudentProfile, DayOfWeek } from './types';

export const STUDENT_INFO: StudentProfile = {
  name: "SAIF UR REHMAN AKHTAR",
  studentId: "BC260218601",
  program: "Information Technology",
  semester: 1,
  email: "bc260218601sur@vu.edu.pk",
  regNo: "026-VU-017562",
  fatherName: "AKHTAR HUSSAIN",
  campus: "PLHR60",
  cnic: "31105-7000634-5",
  admissionDate: "Mar 11, 2026",
  birthDate: "Sep 10, 2002",
  gender: "Male",
  formNo: "BW738027",
  supervisor: "Dr. Saima Munawar",
  supervisorEmail: "saima.munawar@vu.edu.pk",
  supervisorExt: "4727",
  internshipGroupId: "S26INTERNSHIP4B2BA",
  avatarUrl: "/profile_pic.jpg"
};

export const COURSES: Course[] = [
  { code: 'CS306', name: 'Introduction to Python', total: 112 },
  { code: 'CS402', name: 'Theory of Automata', total: 48 },
  { code: 'CS409', name: 'Introduction to Database Administration', total: 250 },
  { code: 'CS502', name: 'Fundamentals of Algorithms', total: 48 },
  { code: 'CS604', name: 'Operating Systems', total: 47 },
  { code: 'CS610', name: 'Computer Networks', total: 46 },
  { code: 'CSI619', name: 'Field Experience / Internship', total: 0 }
];

export const DAYS: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];
