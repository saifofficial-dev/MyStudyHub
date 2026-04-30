/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course, StudentProfile, DayOfWeek } from './types';

export const STUDENT_INFO: StudentProfile = {
  name: "Saif Ur Rehman Akhtar",
  studentId: "BC260218601",
  program: "BS Information Technology",
  semester: 1, // Snippet said 5 but user initial request said 1, I'll stick to 1 or maybe 5 as per snippet? The snippet says "Semester 5". 
  email: "bc260218601sur@vu.edu.pk",
  regNo: "026-VU-017562"
};

export const COURSES: Course[] = [
  { code: 'CS306', name: 'Introduction to Python', total: 45 },
  { code: 'CS402', name: 'Theory of Automata', total: 45 },
  { code: 'CS409', name: 'Database Administration', total: 45 },
  { code: 'CS502', name: 'Fundamentals of Algorithms', total: 45 },
  { code: 'CS604', name: 'Operating Systems', total: 45 },
  { code: 'CS610', name: 'Computer Networks', total: 45 }
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
