export type DayName = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';
export const DAYS: DayName[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
export const PERIODS = [1, 2, 3, 4, 5] as const;

export const PERIOD_TIMES: Record<number, string> = {
  1: '08:00 – 08:50',
  2: '09:00 – 09:50',
  3: '10:10 – 11:00',
  4: '11:10 – 12:00',
  5: '13:00 – 13:50',
};

export interface Teacher {
  id: string;
  name: string;
  subjects: string[];
  maxWeeklyPeriods: number;
  coverThisWeek: number;
  leaveBalance: { sick: number; personal: number; annual: number };
  absentToday?: boolean;
}

export interface TimetableSlot {
  id: string;
  classId: string;
  day: DayName;
  period: number;
  subject: string;
  teacherId: string;
  room: string;
  locked: boolean;
  coverTeacherId?: string;
}

export interface ConstraintSettings {
  noPeLastPeriod: boolean;
  scienceInLabA: boolean;
  noSubjectTwiceDaily: boolean;
  allowJointClasses?: boolean;
}

export interface LeaveRequest {
  id: string;
  teacherId: string;
  date: string;
  day: DayName;
  type: 'Sick leave' | 'Personal leave' | 'Professional dev';
  duration: 'Full day' | 'Half day (AM)' | 'Half day (PM)';
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface CoverLog {
  id: string;
  day: DayName;
  period: number;
  classId: string;
  subject: string;
  absentTeacherId: string;
  coverTeacherId: string;
  assignedAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  day: DayName;
  category: 'Exam' | 'Holiday' | 'Event' | 'Assembly';
  room: string;
  affectedClasses: string[];
  notes: string;
}

export interface StudentCourse {
  id: string;
  code: string;
  name: string;
  level: 'HL' | 'SL' | 'Elective';
  teacherId: string;
  room: string;
  block: 'Block A' | 'Block B' | 'Block C';
  maxSeats: number;
  enrolledStudentIds: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  grade: string;
  choices: string[];
}

export interface AgentMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  actionLabel?: string;
  actionType?: 'regenerate' | 'auto_cover' | 'resolve_conflicts' | 'approve_all_leave';
}

export interface WorkspaceState {
  schoolName: string;
  teachers: Teacher[];
  classes: string[];
  rooms: string[];
  slots: TimetableSlot[];
  constraints: ConstraintSettings;
  leaveRequests: LeaveRequest[];
  coverLogs: CoverLog[];
  calendarEvents: CalendarEvent[];
  courses: StudentCourse[];
  students: StudentProfile[];
  agentMessages: AgentMessage[];
  lastGeneratedMs: number;
}

export const SUBJECT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Maths: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4F46E5]', text: 'text-[#111214]' },
  Matematika: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4F46E5]', text: 'text-[#111214]' },
  Science: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4338CA]', text: 'text-[#111214]' },
  IPA: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4338CA]', text: 'text-[#111214]' },
  Fisika: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4338CA]', text: 'text-[#111214]' },
  Biologi: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4338CA]', text: 'text-[#111214]' },
  Kimia: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4338CA]', text: 'text-[#111214]' },
  English: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#6366F1]', text: 'text-[#111214]' },
  'Bahasa Inggris': { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#6366F1]', text: 'text-[#111214]' },
  'Bahasa Indonesia': { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#6366F1]', text: 'text-[#111214]' },
  History: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#475569]', text: 'text-[#111214]' },
  Sejarah: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#475569]', text: 'text-[#111214]' },
  IPS: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#475569]', text: 'text-[#111214]' },
  Geografi: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#475569]', text: 'text-[#111214]' },
  Ekonomi: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#475569]', text: 'text-[#111214]' },
  Sosiologi: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#475569]', text: 'text-[#111214]' },
  PE: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#312E81]', text: 'text-[#111214]' },
  PJOK: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#312E81]', text: 'text-[#111214]' },
  Olahraga: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#312E81]', text: 'text-[#111214]' },
  Art: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4F46E5]', text: 'text-[#111214]' },
  'Seni Budaya': { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4F46E5]', text: 'text-[#111214]' },
  'Comp Sci': { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4338CA]', text: 'text-[#111214]' },
  Informatika: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4338CA]', text: 'text-[#111214]' },
  TIK: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#4338CA]', text: 'text-[#111214]' },
  Agama: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#475569]', text: 'text-[#111214]' },
  PAI: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#475569]', text: 'text-[#111214]' },
  PKn: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#64748B]', text: 'text-[#111214]' },
  PPKn: { bg: 'bg-white', border: 'border-[#E4E6EA] border-l-4 border-l-[#64748B]', text: 'text-[#111214]' },
};

export function getSubjectTheme(subject: string): { bg: string; border: string; text: string } {
  if (SUBJECT_COLORS[subject]) return SUBJECT_COLORS[subject];
  return {
    bg: 'bg-white',
    border: 'border-[#E4E6EA] border-l-4 border-l-[#4F46E5]',
    text: 'text-[#111214]',
  };
}

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't1',
    name: 'Sarah Mitchell',
    subjects: ['Maths', 'Comp Sci'],
    maxWeeklyPeriods: 18,
    coverThisWeek: 1,
    leaveBalance: { sick: 9, personal: 4, annual: 14 },
    absentToday: true,
  },
  {
    id: 't2',
    name: 'Dr. Robert Chen',
    subjects: ['Science', 'Maths'],
    maxWeeklyPeriods: 18,
    coverThisWeek: 0,
    leaveBalance: { sick: 10, personal: 5, annual: 15 },
  },
  {
    id: 't3',
    name: 'Elena Morales',
    subjects: ['English', 'History'],
    maxWeeklyPeriods: 18,
    coverThisWeek: 2,
    leaveBalance: { sick: 8, personal: 3, annual: 12 },
  },
  {
    id: 't4',
    name: 'David Park',
    subjects: ['History', 'English'],
    maxWeeklyPeriods: 18,
    coverThisWeek: 1,
    leaveBalance: { sick: 10, personal: 5, annual: 14 },
  },
  {
    id: 't5',
    name: 'Priya Nair',
    subjects: ['PE', 'Science'],
    maxWeeklyPeriods: 16,
    coverThisWeek: 0,
    leaveBalance: { sick: 10, personal: 4, annual: 15 },
  },
  {
    id: 't6',
    name: 'Marcus Vance',
    subjects: ['Art', 'English'],
    maxWeeklyPeriods: 16,
    coverThisWeek: 1,
    leaveBalance: { sick: 9, personal: 5, annual: 13 },
  },
  {
    id: 't7',
    name: 'Hannah Brooks',
    subjects: ['Maths', 'Science'],
    maxWeeklyPeriods: 18,
    coverThisWeek: 0,
    leaveBalance: { sick: 10, personal: 5, annual: 15 },
  },
  {
    id: 't8',
    name: 'John Anderson',
    subjects: ['Comp Sci', 'Maths'],
    maxWeeklyPeriods: 16,
    coverThisWeek: 2,
    leaveBalance: { sick: 7, personal: 3, annual: 11 },
  },
];

export const CLASS_LIST = ['Class 10-A', 'Class 10-B', 'Class 11-A'];
export const ROOM_LIST = [
  'Rm 101',
  'Rm 102',
  'Rm 205',
  'Rm 303',
  'Lab A',
  'Lab B',
  'Gym',
  'Rm 118',
  'CS Lab',
];

export const SUBJECT_ROOM_DEFAULTS: Record<string, string[]> = {
  Maths: ['Rm 101', 'Rm 102', 'Rm 205'],
  Science: ['Lab A', 'Lab B'],
  English: ['Rm 205', 'Rm 102', 'Rm 101'],
  History: ['Rm 303', 'Rm 102'],
  PE: ['Gym'],
  Art: ['Rm 118'],
  'Comp Sci': ['CS Lab', 'Rm 303'],
};

export const WEEKLY_CURRICULUM: Array<{ subject: string; count: number }> = [
  { subject: 'Maths', count: 5 },
  { subject: 'Science', count: 5 },
  { subject: 'English', count: 5 },
  { subject: 'History', count: 4 },
  { subject: 'PE', count: 3 },
  { subject: 'Art', count: 2 },
  { subject: 'Comp Sci', count: 1 },
];

export function createPrng(seed = 12345): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function generateSinglePass(
  classes: string[],
  teachers: Teacher[],
  existingSlots: TimetableSlot[],
  constraints: ConstraintSettings,
  rng: () => number = Math.random,
  roomsPool: string[] = ROOM_LIST
): { slots: TimetableSlot[]; conflicts: string[] } {
  const lockedSlots = existingSlots.filter((s) => s.locked);
  const result: TimetableSlot[] = [...lockedSlots];

  const teacherBusy = new Set<string>();
  const roomBusy = new Set<string>();
  const classDaySubjects = new Map<string, Set<string>>();
  const teacherLoad = new Map<string, number>();
  teachers.forEach((t) => teacherLoad.set(t.id, 0));

  const markUsed = (slot: TimetableSlot) => {
    teacherBusy.add(`${slot.day}-${slot.period}-${slot.teacherId}`);
    roomBusy.add(`${slot.day}-${slot.period}-${slot.room}`);
    const key = `${slot.classId}-${slot.day}`;
    if (!classDaySubjects.has(key)) classDaySubjects.set(key, new Set());
    classDaySubjects.get(key)!.add(slot.subject);
    teacherLoad.set(slot.teacherId, (teacherLoad.get(slot.teacherId) || 0) + 1);
  };

  lockedSlots.forEach(markUsed);
  const activeRooms = roomsPool && roomsPool.length > 0 ? roomsPool : ROOM_LIST;

  for (const classId of classes) {
    const lockedCount: Record<string, number> = {};
    lockedSlots
      .filter((s) => s.classId === classId)
      .forEach((s) => {
        lockedCount[s.subject] = (lockedCount[s.subject] || 0) + 1;
      });

    const toPlace: string[] = [];
    for (const item of WEEKLY_CURRICULUM) {
      const remaining = Math.max(0, item.count - (lockedCount[item.subject] || 0));
      for (let i = 0; i < remaining; i++) toPlace.push(item.subject);
    }

    toPlace.sort((a, b) => {
      const prio = (s: string) => (s === 'PE' ? 0 : s === 'Science' ? 1 : 2);
      return prio(a) - prio(b);
    });

    const openCoords: Array<{ day: DayName; period: number }> = [];
    for (const day of DAYS) {
      for (const period of PERIODS) {
        const occupied = lockedSlots.some(
          (s) => s.classId === classId && s.day === day && s.period === period
        );
        if (!occupied) openCoords.push({ day, period });
      }
    }

    for (let i = openCoords.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [openCoords[i], openCoords[j]] = [openCoords[j], openCoords[i]];
    }

    for (const subject of toPlace) {
      let placed = false;

      const candidates = openCoords
        .map((coord, idx) => {
          const dayKey = `${classId}-${coord.day}`;
          const alreadyHasSubject = classDaySubjects.get(dayKey)?.has(subject) ?? false;
          const violatesPe = constraints.noPeLastPeriod && subject === 'PE' && coord.period === 5;

          const eligibleTeachers = teachers
            .filter(
              (t) =>
                t.subjects.includes(subject) &&
                !teacherBusy.has(`${coord.day}-${coord.period}-${t.id}`)
            )
            .sort((a, b) => (teacherLoad.get(a.id) || 0) - (teacherLoad.get(b.id) || 0));

          const fallbackTeachers = teachers
            .filter((t) => !teacherBusy.has(`${coord.day}-${coord.period}-${t.id}`))
            .sort((a, b) => (teacherLoad.get(a.id) || 0) - (teacherLoad.get(b.id) || 0));

          const teacher = eligibleTeachers[0] || fallbackTeachers[0] || teachers[0];

          const preferredRooms =
            constraints.scienceInLabA && subject === 'Science'
              ? activeRooms.filter((r) => r.toLowerCase().includes('lab'))
              : subject === 'PE'
                ? activeRooms.filter((r) => r.toLowerCase().includes('gym') || r.toLowerCase().includes('lap'))
                : SUBJECT_ROOM_DEFAULTS[subject]?.filter((r) => activeRooms.includes(r)) || activeRooms;

          const room =
            preferredRooms.find((r) => !roomBusy.has(`${coord.day}-${coord.period}-${r}`)) ||
            activeRooms.find((r) => !roomBusy.has(`${coord.day}-${coord.period}-${r}`)) ||
            activeRooms[0];

          let penalty = 0;
          if (violatesPe) penalty += 5000;
          if (constraints.noSubjectTwiceDaily && alreadyHasSubject) penalty += 5000;
          if (!eligibleTeachers.length) penalty += 1000;
          if (teacherBusy.has(`${coord.day}-${coord.period}-${teacher?.id}`)) penalty += 5000;
          if (roomBusy.has(`${coord.day}-${coord.period}-${room}`)) penalty += 5000;
          if (constraints.scienceInLabA && subject === 'Science' && room !== 'Lab A') penalty += 25;

          return { coord, idx, teacher, room, penalty };
        })
        .sort((a, b) => a.penalty - b.penalty);

      const best = candidates[0];
      if (best && best.teacher) {
        const slot: TimetableSlot = {
          id: `${classId}-${best.coord.day}-${best.coord.period}`,
          classId,
          day: best.coord.day,
          period: best.coord.period,
          subject,
          teacherId: best.teacher.id,
          room: best.room,
          locked: false,
        };
        result.push(slot);
        markUsed(slot);
        openCoords.splice(best.idx, 1);
        placed = true;
      }
      if (!placed) break;
    }
  }

  const conflicts = detectConflicts(result, teachers, constraints);
  return { slots: result, conflicts };
}

export function generateTimetable(
  classes: string[],
  teachers: Teacher[],
  existingSlots: TimetableSlot[],
  constraints: ConstraintSettings,
  roomsPool?: string[]
): { slots: TimetableSlot[]; conflicts: string[]; durationMs: number } {
  const start = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const pool = roomsPool && roomsPool.length > 0 ? roomsPool : ROOM_LIST;
  let bestPass = generateSinglePass(classes, teachers, existingSlots, constraints, Math.random, pool);

  for (let attempt = 0; attempt < 25; attempt++) {
    if (bestPass.conflicts.length === 0) break;
    const pass = generateSinglePass(classes, teachers, existingSlots, constraints, Math.random, pool);
    if (pass.conflicts.length < bestPass.conflicts.length) {
      bestPass = pass;
    }
  }

  const end = typeof performance !== 'undefined' ? performance.now() : Date.now();
  return {
    slots: bestPass.slots,
    conflicts: bestPass.conflicts,
    durationMs: Math.max(12, Math.round(end - start)),
  };
}

export function detectConflicts(
  slots: TimetableSlot[],
  teachers: Teacher[],
  constraints: ConstraintSettings
): string[] {
  const conflicts: string[] = [];
  const teacherMap = new Map<string, TimetableSlot>();
  const roomMap = new Map<string, TimetableSlot>();
  const classDayMap = new Map<string, TimetableSlot[]>();

  for (const s of slots) {
    const activeTeacherId = s.coverTeacherId || s.teacherId;
    const tKey = `${s.day}-${s.period}-${activeTeacherId}`;
    if (teacherMap.has(tKey)) {
      const other = teacherMap.get(tKey)!;
      const isJointClass =
        constraints.allowJointClasses &&
        s.classId !== other.classId &&
        s.subject === other.subject &&
        s.room === other.room;

      if (!isJointClass) {
        const tName = teachers.find((t) => t.id === activeTeacherId)?.name || activeTeacherId;
        conflicts.push(
          `Teacher overlap: ${tName} is assigned to ${other.classId} and ${s.classId} on ${s.day} P${s.period}`
        );
      }
    } else {
      teacherMap.set(tKey, s);
    }

    const rKey = `${s.day}-${s.period}-${s.room}`;
    if (roomMap.has(rKey)) {
      const other = roomMap.get(rKey)!;
      const isJointClass =
        constraints.allowJointClasses &&
        s.classId !== other.classId &&
        s.subject === other.subject &&
        (s.coverTeacherId || s.teacherId) === (other.coverTeacherId || other.teacherId);

      if (!isJointClass) {
        conflicts.push(
          `Room clash: ${s.room} double-booked by ${other.classId} and ${s.classId} on ${s.day} P${s.period}`
        );
      }
    } else {
      roomMap.set(rKey, s);
    }

    if (constraints.noPeLastPeriod && s.subject === 'PE' && s.period === 5) {
      conflicts.push(`Rule: PE scheduled in last period for ${s.classId} on ${s.day}`);
    }

    if (
      constraints.scienceInLabA &&
      s.subject === 'Science' &&
      s.room !== 'Lab A' &&
      s.room !== 'Lab B'
    ) {
      conflicts.push(
        `Rule: Science for ${s.classId} on ${s.day} P${s.period} is in ${s.room} (expected Science Lab)`
      );
    }

    const cdKey = `${s.classId}-${s.day}-${s.subject}`;
    if (constraints.noSubjectTwiceDaily) {
      const arr = classDayMap.get(cdKey) || [];
      arr.push(s);
      classDayMap.set(cdKey, arr);
    }
  }

  if (constraints.noSubjectTwiceDaily) {
    classDayMap.forEach((arr) => {
      if (arr.length > 1) {
        conflicts.push(
          `Rule: ${arr[0].subject} occurs ${arr.length}x on ${arr[0].day} for ${arr[0].classId}`
        );
      }
    });
  }

  return conflicts;
}

export interface CoverCandidate {
  teacher: Teacher;
  score: number;
  subjectMatch: boolean;
  isFree: boolean;
  reason: string;
}

export function rankCoverCandidates(
  slot: TimetableSlot,
  teachers: Teacher[],
  slots: TimetableSlot[]
): CoverCandidate[] {
  return teachers
    .filter((t) => t.id !== slot.teacherId && !t.absentToday)
    .map((teacher) => {
      const isBusy = slots.some(
        (s) =>
          s.day === slot.day &&
          s.period === slot.period &&
          (s.coverTeacherId || s.teacherId) === teacher.id
      );
      const subjectMatch = teacher.subjects.includes(slot.subject);
      let score = 0;
      if (!isBusy) score += 45;
      if (subjectMatch) score += 35;
      score += Math.max(0, 20 - teacher.coverThisWeek * 7);

      const reasons: string[] = [];
      if (subjectMatch) reasons.push(`Teaches ${slot.subject}`);
      if (!isBusy) reasons.push('Free this period');
      else reasons.push('Currently teaching');
      reasons.push(`${teacher.coverThisWeek} cover${teacher.coverThisWeek === 1 ? '' : 's'} this week`);

      return {
        teacher,
        score: Math.min(99, score),
        subjectMatch,
        isFree: !isBusy,
        reason: reasons.join(' · '),
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function createInitialWorkspaceState(): WorkspaceState {
  const constraints: ConstraintSettings = {
    noPeLastPeriod: true,
    scienceInLabA: true,
    noSubjectTwiceDaily: true,
    allowJointClasses: true,
  };
  // Seed 1 gives a 100% deterministic, conflict-free (0 conflicts) initial master schedule
  const { slots } = generateSinglePass(
    CLASS_LIST,
    INITIAL_TEACHERS,
    [],
    constraints,
    createPrng(1)
  );

  return {
    schoolName: 'Oakridge International Academy',
    teachers: INITIAL_TEACHERS,
    classes: CLASS_LIST,
    rooms: ROOM_LIST,
    slots,
    constraints,
    leaveRequests: [
      {
        id: 'lv-1',
        teacherId: 't1',
        date: 'Mon, 17 Nov',
        day: 'MON',
        type: 'Sick leave',
        duration: 'Full day',
        reason: 'Medical appointment and recovery',
        status: 'Approved',
      },
      {
        id: 'lv-2',
        teacherId: 't8',
        date: 'Wed, 19 Nov',
        day: 'WED',
        type: 'Personal leave',
        duration: 'Half day (PM)',
        reason: 'Family commitment',
        status: 'Pending',
      },
      {
        id: 'lv-3',
        teacherId: 't3',
        date: 'Fri, 21 Nov',
        day: 'FRI',
        type: 'Professional dev',
        duration: 'Full day',
        reason: 'IB English curriculum workshop',
        status: 'Pending',
      },
    ],
    coverLogs: [],
    calendarEvents: [
      {
        id: 'ev-1',
        title: 'Year 10 Science Practical Assessment',
        date: 'Tue, 18 Nov',
        day: 'TUE',
        category: 'Exam',
        room: 'Lab A',
        affectedClasses: ['Class 10-A', 'Class 10-B'],
        notes: 'Lab A reserved periods 1–3; practical examiner on campus.',
      },
      {
        id: 'ev-2',
        title: 'Whole-School Morning Assembly',
        date: 'Wed, 19 Nov',
        day: 'WED',
        category: 'Assembly',
        room: 'Gym',
        affectedClasses: ['Class 10-A', 'Class 10-B', 'Class 11-A'],
        notes: 'Period 1 shortened by 15 minutes for assembly.',
      },
      {
        id: 'ev-3',
        title: 'Term Mid-Break Day',
        date: 'Fri, 28 Nov',
        day: 'FRI',
        category: 'Holiday',
        room: 'All Campus',
        affectedClasses: ['Class 10-A', 'Class 10-B', 'Class 11-A'],
        notes: 'No classes scheduled. Staff campus closed.',
      },
    ],
    courses: [
      {
        id: 'c1',
        code: 'MATH-HL',
        name: 'Mathematics AA',
        level: 'HL',
        teacherId: 't1',
        room: 'Rm 101',
        block: 'Block A',
        maxSeats: 16,
        enrolledStudentIds: ['s1', 's2', 's4'],
      },
      {
        id: 'c2',
        code: 'PHYS-HL',
        name: 'Physics',
        level: 'HL',
        teacherId: 't2',
        room: 'Lab A',
        block: 'Block B',
        maxSeats: 14,
        enrolledStudentIds: ['s1', 's3', 's4'],
      },
      {
        id: 'c3',
        code: 'ECON-SL',
        name: 'Economics',
        level: 'SL',
        teacherId: 't4',
        room: 'Rm 303',
        block: 'Block A',
        maxSeats: 18,
        enrolledStudentIds: ['s3', 's5'],
      },
      {
        id: 'c4',
        code: 'ART-EL',
        name: 'Visual Arts',
        level: 'Elective',
        teacherId: 't6',
        room: 'Rm 118',
        block: 'Block C',
        maxSeats: 15,
        enrolledStudentIds: ['s2', 's5'],
      },
      {
        id: 'c5',
        code: 'CS-HL',
        name: 'Computer Science',
        level: 'HL',
        teacherId: 't8',
        room: 'CS Lab',
        block: 'Block C',
        maxSeats: 16,
        enrolledStudentIds: ['s1', 's3', 's4'],
      },
      {
        id: 'c6',
        code: 'ENG-SL',
        name: 'English Literature',
        level: 'SL',
        teacherId: 't3',
        room: 'Rm 205',
        block: 'Block B',
        maxSeats: 20,
        enrolledStudentIds: ['s2', 's5'],
      },
    ],
    students: [
      { id: 's1', name: 'Aanya Sharma', grade: 'IB Year 1', choices: ['c1', 'c2', 'c5'] },
      { id: 's2', name: 'Daniel Tan', grade: 'IB Year 1', choices: ['c1', 'c6', 'c4'] },
      { id: 's3', name: 'Maya Putri', grade: 'IB Year 1', choices: ['c3', 'c2', 'c5'] },
      { id: 's4', name: 'Lucas Weber', grade: 'IB Year 1', choices: ['c1', 'c2', 'c5'] },
      { id: 's5', name: 'Sofia Rossi', grade: 'IB Year 1', choices: ['c3', 'c6', 'c4'] },
    ],
    agentMessages: [
      {
        id: 'm1',
        role: 'assistant',
        text: 'Hi! I am your AI Scheduling Assistant connected to your timetable, substitute cover queue, leave records, and rooms. You can ask in English or Bahasa Indonesia — e.g. "Check conflicts", "Siapa guru yang absen hari ini?", "Show teacher workload", or "Regenerate timetable".',
      },
    ],
    lastGeneratedMs: 14,
  };
}

export function processAgentPrompt(
  prompt: string,
  state: WorkspaceState
): Omit<AgentMessage, 'id'> {
  const q = prompt.toLowerCase();
  const conflicts = detectConflicts(state.slots, state.teachers, state.constraints);

  // Greetings
  if (
    q.startsWith('halo') ||
    q.startsWith('hai') ||
    q.startsWith('hi') ||
    q.startsWith('hello') ||
    q.includes('selamat pagi') ||
    q.includes('selamat siang')
  ) {
    return {
      role: 'assistant',
      text: `Halo! Saya AI Scheduling Assistant untuk ${state.schoolName}. 
Saat ini ada:
• ${state.slots.length} jam pelajaran terpasang di ${state.classes.length} kelas (${conflicts.length} konflik).
• ${state.teachers.filter((t) => t.absentToday).length} guru tercatat tidak hadir.
• ${state.leaveRequests.filter((l) => l.status === 'Pending').length} pengajuan cuti menunggu persetujuan.

Ada yang bisa saya bantu hari ini? Anda bisa meminta saya mengecek bentrok, mengatur guru pengganti, atau menyusun ulang jadwal.`,
    };
  }

  // Help / Panduan
  if (
    q.includes('cara') ||
    q.includes('bantuan') ||
    q.includes('help') ||
    q.includes('panduan') ||
    q.includes('tutorial') ||
    q.includes('fitur')
  ) {
    return {
      role: 'assistant',
      text: `Panduan Penggunaan TimetableMaster Workspace:
1. **Timetable**: Lihat jadwal per kelas/guru/ruang, klik slot untuk edit/tukar/kunci, atau klik tombol "AI Generate Timetable" untuk menyusun otomatis.
2. **Substitutes**: Tandai guru absen, lihat daftar jam kosong, dan beri tugas guru pengganti dengan 1 klik.
3. **Leave Tracking**: Setujui atau tolak izin cuti guru; sistem otomatis membuka jadwal pengganti.
4. **School Calendar**: Tambahkan acara kampus/ujian/libur dan pantau dampaknya pada jadwal kelas.
5. **Student Choice**: Atur pilihan mata pelajaran elektif/IB siswa dan pantau bentrok blok waktu.
6. **Staff & Setup**: Tambah guru baru, kelas baru, atau ruangan kampus sesuai kebutuhan.`,
    };
  }

  // Conflict checking
  if (q.includes('conflict') || q.includes('bentrok') || q.includes('cek') || q.includes('check')) {
    if (conflicts.length === 0) {
      return {
        role: 'assistant',
        text: `Semua jadwal bersih! Saya telah memeriksa ${state.slots.length} sesi belajar pada ${state.classes.length} kelas dan ${state.teachers.length} guru — 0 guru rangkap jam, 0 ruang bentrok, dan seluruh aturan batasan terpenuhi dengan sempurna.`,
      };
    }
    return {
      role: 'assistant',
      text: `Ditemukan ${conflicts.length} catatan/bentrok pada jadwal:\n• ${conflicts.slice(0, 4).join('\n• ')}\n\nKlik tombol di bawah untuk menyusun ulang otomatis tanpa mengubah slot yang sudah Anda kunci.`,
      actionLabel: 'Selesaikan Bentrok Otomatis',
      actionType: 'resolve_conflicts',
    };
  }

  // Absence & Cover
  if (
    q.includes('cover') ||
    q.includes('pengganti') ||
    q.includes('absen') ||
    q.includes('tidak hadir') ||
    q.includes('sarah') ||
    q.includes('substit')
  ) {
    const absentTeachers = state.teachers.filter((t) => t.absentToday);
    if (absentTeachers.length === 0) {
      return {
        role: 'assistant',
        text: 'Tidak ada guru yang absen hari ini. Semua staf tercatat hadir (Present). Anda dapat menandai guru izin pada tab Substitutes atau menyetujui permohonan cuti.',
      };
    }
    const targetTeacher = absentTeachers[0];
    const openSlots = state.slots.filter(
      (s) => s.day === 'MON' && s.teacherId === targetTeacher.id && !s.coverTeacherId
    );
    if (openSlots.length === 0) {
      return {
        role: 'assistant',
        text: `Semua jam mengajar untuk ${targetTeacher.name} hari ini sudah mendapatkan guru pengganti!`,
      };
    }
    const recommendations = openSlots.slice(0, 3).map((slot) => {
      const top = rankCoverCandidates(slot, state.teachers, state.slots)[0];
      return `P${slot.period} ${slot.classId} (${slot.subject}) → ${top?.teacher.name ?? 'N/A'} (${top?.score ?? 0}% cocok)`;
    });
    return {
      role: 'assistant',
      text: `${targetTeacher.name} memiliki ${openSlots.length} jam mengajar tanpa pengganti hari ini:\n• ${recommendations.join('\n• ')}\n\nKlik tombol di bawah untuk langsung menugaskan kandidat terbaik.`,
      actionLabel: `Tugaskan Guru Pengganti (${openSlots.length})`,
      actionType: 'auto_cover',
    };
  }

  // Leave approval
  if (
    q.includes('cuti') ||
    q.includes('leave') ||
    q.includes('izin') ||
    q.includes('permohonan')
  ) {
    const pending = state.leaveRequests.filter((l) => l.status === 'Pending');
    if (pending.length === 0) {
      return {
        role: 'assistant',
        text: 'Tidak ada permohonan cuti yang berstatus Menunggu (Pending). Semua pengajuan sudah diproses.',
      };
    }
    const list = pending.map((p) => {
      const tName = state.teachers.find((t) => t.id === p.teacherId)?.name || p.teacherId;
      return `${tName}: ${p.type} (${p.date}, ${p.duration}) - "${p.reason}"`;
    });
    return {
      role: 'assistant',
      text: `Terdapat ${pending.length} pengajuan cuti menunggu persetujuan:\n• ${list.join('\n• ')}\n\nAnda dapat menyetujuinya sekaligus di sini:`,
      actionLabel: `Setujui Semua Cuti (${pending.length})`,
      actionType: 'approve_all_leave',
    };
  }

  // Teacher Workload
  if (
    q.includes('workload') ||
    q.includes('beban') ||
    q.includes('guru') ||
    q.includes('teacher') ||
    q.includes('staf')
  ) {
    const counts = state.teachers.map((t) => {
      const assigned = state.slots.filter((s) => (s.coverTeacherId || s.teacherId) === t.id).length;
      return `${t.name}: ${assigned}/${t.maxWeeklyPeriods} jam/minggu (${t.coverThisWeek} cover)`;
    });
    return {
      role: 'assistant',
      text: `Beban mengajar staf pengajar per minggu:\n• ${counts.join('\n• ')}`,
    };
  }

  // Calendar & Events
  if (
    q.includes('kalender') ||
    q.includes('acara') ||
    q.includes('ujian') ||
    q.includes('libur') ||
    q.includes('calendar') ||
    q.includes('event')
  ) {
    const evs = state.calendarEvents.map((e) => `[${e.category}] ${e.title} (${e.date}, ${e.room})`);
    return {
      role: 'assistant',
      text: `Agenda kegiatan kampus terdaftar (${state.calendarEvents.length}):\n• ${evs.join('\n• ')}`,
    };
  }

  // Rooms
  if (q.includes('ruang') || q.includes('room') || q.includes('lab') || q.includes('gym')) {
    return {
      role: 'assistant',
      text: `Kampus ${state.schoolName} memiliki ${state.rooms.length} ruangan aktif: ${state.rooms.join(', ')}. Semua ruangan dialokasikan bebas tumpang tindih.`,
    };
  }

  // Students & Electives
  if (q.includes('siswa') || q.includes('murid') || q.includes('student') || q.includes('ib') || q.includes('elektif')) {
    return {
      role: 'assistant',
      text: `Modul Student Choice mengelola ${state.students.length} siswa IB dengan ${state.courses.length} pilihan kursus. Setiap siswa memiliki jadwal personal berbasis Block A, B, dan C.`,
    };
  }

  // Timetable Generation
  if (
    q.includes('generat') ||
    q.includes('buat jadwal') ||
    q.includes('acak') ||
    q.includes('susun') ||
    q.includes('bikin')
  ) {
    const lockedCount = state.slots.filter((s) => s.locked).length;
    return {
      role: 'assistant',
      text: `Siap menyusun ulang jadwal untuk ${state.classes.length} kelas. ${lockedCount} slot yang Anda kunci akan tetap dipertahankan, dan aturan batasan akan diterapkan.`,
      actionLabel: 'Mulai Generate Jadwal Sekarang',
      actionType: 'regenerate',
    };
  }

  // Fallback summary
  return {
    role: 'assistant',
    text: `Ringkasan data langsung untuk ${state.schoolName}:
• ${state.slots.length} jam pelajaran terpasang di ${state.classes.length} kelas (${conflicts.length} konflik).
• ${state.leaveRequests.filter((l) => l.status === 'Pending').length} permohonan cuti menunggu persetujuan.
• ${state.calendarEvents.length} agenda kegiatan kampus terdaftar.
• ${state.students.length} siswa IB terdaftar pada ${state.courses.length} mata pelajaran pilihan.

Coba tanyakan: "Cek bentrok", "Siapa guru yang absen?", "Beban mengajar guru", atau "Generate jadwal".`,
  };
}

export function exportTimetableCsv(
  classId: string,
  slots: TimetableSlot[],
  teachers: Teacher[]
): string {
  const dayLabels = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT'];
  const header = ['Jam Ke', 'Waktu', ...dayLabels].join(';');
  const rows = PERIODS.map((period) => {
    const cells = DAYS.map((day) => {
      const slot = slots.find((s) => s.classId === classId && s.day === day && s.period === period);
      if (!slot) return '""';
      const activeTeacher =
        teachers.find((t) => t.id === (slot.coverTeacherId || slot.teacherId))?.name || '';
      const coverTag = slot.coverTeacherId ? ' [PIKET]' : '';
      return `"${slot.subject} - ${activeTeacher}${coverTag} (${slot.room})"`;
    });
    return [`Jam ke-${period}`, `"${PERIOD_TIMES[period]}"`, ...cells].join(';');
  });
  return [header, ...rows].join('\r\n');
}

export function exportAllTimetablesCsv(
  classes: string[],
  slots: TimetableSlot[],
  teachers: Teacher[]
): string {
  const blocks: string[] = [];
  for (const c of classes) {
    blocks.push(`KELAS: ${c}`);
    blocks.push(exportTimetableCsv(c, slots, teachers));
    blocks.push('');
  }
  return blocks.join('\r\n');
}

export function exportWorkspaceJson(state: WorkspaceState): string {
  return JSON.stringify(state, null, 2);
}

export function validateWorkspaceJson(raw: string): WorkspaceState | null {
  try {
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === 'object' &&
      Array.isArray(parsed.slots) &&
      Array.isArray(parsed.teachers) &&
      Array.isArray(parsed.classes) &&
      Array.isArray(parsed.rooms)
    ) {
      return parsed as WorkspaceState;
    }
  } catch {
    // invalid JSON
  }
  return null;
}

// ==========================================
// BULK CSV & EXCEL IMPORT HELPERS
// ==========================================

export interface ParsedTeacherRow {
  name: string;
  subjects: string[];
  maxWeeklyPeriods: number;
}

export interface ParsedSlotRow {
  classId: string;
  day: DayName;
  period: number;
  subject: string;
  teacherName: string;
  room: string;
}

export function parseDelimitedText(raw: string): string[][] {
  const lines = raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  // Strip Excel 'sep=;' or 'sep=,' header if present
  if (lines[0].toLowerCase().startsWith('sep=')) {
    lines.shift();
  }
  if (lines.length === 0) return [];

  const sample = lines[0];
  let delimiter = ';'; // Standard for Excel Indonesia
  if (sample.includes('\t')) {
    delimiter = '\t';
  } else if ((sample.match(/;/g) || []).length >= (sample.match(/,/g) || []).length && sample.includes(';')) {
    delimiter = ';';
  } else if (sample.includes(',')) {
    delimiter = ',';
  }

  return lines.map((line) => {
    const cells: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"' || char === "'") {
        inQuotes = !inQuotes;
      } else if (char === delimiter && !inQuotes) {
        cells.push(cur.trim().replace(/^["']|["']$/g, ''));
        cur = '';
      } else {
        cur += char;
      }
    }
    cells.push(cur.trim().replace(/^["']|["']$/g, ''));
    return cells;
  });
}

export function parseTeachersFromText(raw: string): ParsedTeacherRow[] {
  const rows = parseDelimitedText(raw);
  if (rows.length === 0) return [];

  const results: ParsedTeacherRow[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;
    const col0 = row[0] || '';
    if (
      i === 0 &&
      (col0.toLowerCase().includes('nama') ||
        col0.toLowerCase().includes('name') ||
        col0.toLowerCase().includes('guru') ||
        col0.toLowerCase().includes('teacher'))
    ) {
      continue;
    }
    if (!col0) continue;

    // Support both 3-column (Nama;Mapel;Jam) and 4-column (Nama;Inisial;Mapel;Jam)
    let subjectsRaw = 'Umum';
    let maxPeriods = 24;

    if (row.length >= 4 && row[1].length <= 5 && isNaN(parseInt(row[1], 10))) {
      // row[1] is initials (e.g. BS)
      subjectsRaw = row[2] || 'Umum';
      maxPeriods = parseInt(row[3] || '24', 10);
    } else {
      subjectsRaw = row[1] || 'Umum';
      maxPeriods = parseInt(row[2] || '24', 10);
    }

    // Split multiple subjects inside the cell by comma, slash, or pipe
    const subjects = subjectsRaw
      .split(/[,/|]/)
      .map((s) => s.trim())
      .filter(Boolean);

    results.push({
      name: col0,
      subjects: subjects.length > 0 ? subjects : [subjectsRaw],
      maxWeeklyPeriods: isNaN(maxPeriods) || maxPeriods <= 0 ? 24 : maxPeriods,
    });
  }
  return results;
}

export function parseClassesFromText(raw: string): string[] {
  const rows = parseDelimitedText(raw);
  const classes: string[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;
    const col0 = row[0]?.trim();
    if (
      i === 0 &&
      (col0?.toLowerCase().includes('nama') ||
        col0?.toLowerCase().includes('kelas') ||
        col0?.toLowerCase().includes('class') ||
        col0?.toLowerCase().includes('rombel'))
    ) {
      continue;
    }
    if (col0 && !classes.includes(col0)) {
      classes.push(col0);
    }
  }
  return classes;
}

export function parseRoomsFromText(raw: string): string[] {
  const rows = parseDelimitedText(raw);
  const rooms: string[] = [];
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length === 0) continue;
    const col0 = row[0]?.trim();
    if (
      i === 0 &&
      (col0?.toLowerCase().includes('nama') ||
        col0?.toLowerCase().includes('ruang') ||
        col0?.toLowerCase().includes('room') ||
        col0?.toLowerCase().includes('lab'))
    ) {
      continue;
    }
    if (col0 && !rooms.includes(col0)) {
      rooms.push(col0);
    }
  }
  return rooms;
}

export function parseScheduleSlotsFromText(raw: string): ParsedSlotRow[] {
  const rows = parseDelimitedText(raw);
  const slots: ParsedSlotRow[] = [];
  const validDays: Record<string, DayName> = {
    SENIN: 'MON',
    MON: 'MON',
    MONDAY: 'MON',
    SELASA: 'TUE',
    TUE: 'TUE',
    TUESDAY: 'TUE',
    RABU: 'WED',
    WED: 'WED',
    WEDNESDAY: 'WED',
    KAMIS: 'THU',
    THU: 'THU',
    THURSDAY: 'THU',
    JUMAT: 'FRI',
    FRI: 'FRI',
    FRIDAY: 'FRI',
  };

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 4) continue;
    if (
      i === 0 &&
      (row[0].toLowerCase().includes('kelas') || row[0].toLowerCase().includes('class'))
    ) {
      continue;
    }
    const classId = row[0]?.trim();
    const dayStr = row[1]?.trim().toUpperCase();
    const day = validDays[dayStr] || 'MON';
    const period = parseInt(row[2]?.replace(/[^0-9]/g, '') || '1', 10);
    const subject = row[3]?.trim();
    const teacherName = row[4]?.trim() || '';
    const room = row[5]?.trim() || 'Ruang Kelas';

    if (classId && subject && period >= 1 && period <= 5) {
      slots.push({
        classId,
        day,
        period,
        subject,
        teacherName,
        room,
      });
    }
  }
  return slots;
}

export function getSampleTeacherCsv(): string {
  return [
    'Nama Guru;Mata Pelajaran;Beban Jam Mingguan',
    'Budi Santoso;Matematika, Fisika;24',
    'Siti Aminah;Bahasa Indonesia;20',
    'Ahmad Fauzi;Bahasa Inggris;22',
    'Dewi Lestari;Kimia, IPA;18',
    'Bambang Pamungkas;PJOK, Olahraga;20',
    'Rina Kartika;Biologi, IPA;18',
    'Hendra Gunawan;Informatika, TIK;22',
    'Nurul Hidayah;Sejarah, IPS;18',
  ].join('\r\n');
}

export function getSampleClassCsv(): string {
  return [
    'Nama Kelas;Tingkat;Wali Kelas',
    'Kelas 10-A;10;Budi Santoso',
    'Kelas 10-B;10;Siti Aminah',
    'Kelas 10-C;10;Ahmad Fauzi',
    'Kelas 11-IPA-1;11;Dewi Lestari',
    'Kelas 11-IPA-2;11;Bambang Pamungkas',
    'Kelas 11-IPS-1;11;Rina Kartika',
    'Kelas 12-IPA-1;12;Hendra Gunawan',
    'Kelas 12-IPS-1;12;Nurul Hidayah',
  ].join('\r\n');
}

export function getSampleRoomCsv(): string {
  return [
    'Nama Ruangan;Tipe Ruangan;Kapasitas Siswa',
    'Ruang Teori 101;Kelas;36',
    'Ruang Teori 102;Kelas;36',
    'Ruang Teori 103;Kelas;36',
    'Lab Komputer A;Lab Komputer;40',
    'Lab Komputer B;Lab Komputer;40',
    'Lab IPA Terpadu;Lab Sains;36',
    'Lapangan Olahraga;Fasilitas Luar;80',
    'Aula Serbaguna;Aula;200',
  ].join('\r\n');
}

export function getSampleScheduleCsv(): string {
  return [
    'Kelas;Hari;Jam Ke;Mata Pelajaran;Nama Guru;Ruangan',
    'Kelas 10-A;SENIN;1;Matematika;Budi Santoso;Ruang Teori 101',
    'Kelas 10-A;SENIN;2;Matematika;Budi Santoso;Ruang Teori 101',
    'Kelas 10-A;SENIN;3;Bahasa Indonesia;Siti Aminah;Ruang Teori 101',
    'Kelas 10-A;SENIN;4;Bahasa Inggris;Ahmad Fauzi;Ruang Teori 101',
    'Kelas 10-A;SENIN;5;Informatika;Hendra Gunawan;Lab Komputer A',
    'Kelas 10-A;SELASA;1;IPA;Dewi Lestari;Lab IPA Terpadu',
    'Kelas 10-A;SELASA;2;IPA;Dewi Lestari;Lab IPA Terpadu',
    'Kelas 10-A;SELASA;3;PJOK;Bambang Pamungkas;Lapangan Olahraga',
    'Kelas 10-A;SELASA;4;PJOK;Bambang Pamungkas;Lapangan Olahraga',
    'Kelas 10-A;SELASA;5;Sejarah;Nurul Hidayah;Ruang Teori 101',
  ].join('\r\n');
}
