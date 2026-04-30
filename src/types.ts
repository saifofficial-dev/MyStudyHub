/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Course = {
  code: string;
  name: string;
  total: number;
};

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type LectureProgress = {
  w: boolean; // watched
  a: boolean; // assignment
  q: boolean; // quiz
  notes: string;
};

export type CourseLecMap = {
  [courseCode: string]: {
    [lectureNumber: number]: LectureProgress;
  };
};

export type ScheduleItem = {
  id: string;
  day: DayOfWeek;
  course: string;
  cnt: number;
};

export type Task = {
  id: string;
  course: string;
  type: string;
  num: string;
  due: string;
  done: boolean;
};

export type View = 'dashboard' | 'lectures' | 'schedule' | 'tasks';

export type AppDB = {
  lec: CourseLecMap;
  sched: ScheduleItem[];
  tasks: Task[];
};

export type StudentProfile = {
  name: string;
  studentId: string;
  program: string;
  semester: number;
  email: string;
  regNo: string;
};
