'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from '@/components/Link';
import { BrandMark } from '@/components/BrandMark';
import {
  DAYS,
  PERIODS,
  PERIOD_TIMES,
  SUBJECT_COLORS,
  getSubjectTheme,
  createInitialWorkspaceState,
  detectConflicts,
  exportTimetableCsv,
  exportAllTimetablesCsv,
  exportWorkspaceJson,
  validateWorkspaceJson,
  generateTimetable,
  processAgentPrompt,
  rankCoverCandidates,
  parseTeachersFromText,
  parseClassesFromText,
  parseRoomsFromText,
  parseScheduleSlotsFromText,
  getSampleTeacherCsv,
  getSampleClassCsv,
  getSampleRoomCsv,
  getSampleScheduleCsv,
  type CalendarEvent,
  type DayName,
  type LeaveRequest,
  type StudentCourse,
  type TimetableSlot,
  type WorkspaceState,
} from '@/lib/workspaceData';

type ModuleTab =
  | 'timetable'
  | 'substitutes'
  | 'leave'
  | 'calendar'
  | 'students'
  | 'ai-agent'
  | 'setup';

const STORAGE_KEY = 'timetablemaster_workspace_v1';
const USER_KEY = 'tm_user';

const DAY_INDONESIAN: Record<DayName, string> = {
  MON: 'Senin',
  TUE: 'Selasa',
  WED: 'Rabu',
  THU: 'Kamis',
  FRI: 'Jumat',
};

const NAV_ITEMS: Array<{ id: ModuleTab; label: string; short: string }> = [
  { id: 'timetable', label: 'Jadwal Pelajaran', short: 'Jadwal' },
  { id: 'substitutes', label: 'Guru Piket & Pengganti', short: 'Pengganti' },
  { id: 'leave', label: 'Izin & Cuti Guru', short: 'Izin/Cuti' },
  { id: 'calendar', label: 'Kalender Sekolah', short: 'Kalender' },
  { id: 'students', label: 'Mapel Pilihan Siswa', short: 'Peminatan' },
  { id: 'ai-agent', label: 'Asisten AI Jadwal', short: 'Asisten AI' },
  { id: 'setup', label: 'Data Guru & Sekolah', short: 'Pengaturan' },
];

export default function WorkspacePage() {
  const [state, setState] = useState<WorkspaceState>(() => createInitialWorkspaceState());
  const [hydrated, setHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState<ModuleTab>('timetable');
  const [userEmail, setUserEmail] = useState<string>('admin@oakridge.edu');
  const [toast, setToast] = useState<string | null>(null);

  // School name editing
  const [editingSchoolName, setEditingSchoolName] = useState(false);
  const [tempSchoolName, setTempSchoolName] = useState('');

  // Timetable controls
  const [viewMode, setViewMode] = useState<'class' | 'teacher' | 'room'>('class');
  const [selectedClass, setSelectedClass] = useState<string>('Class 10-A');
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>('t1');
  const [selectedRoom, setSelectedRoom] = useState<string>('Lab A');
  const [swapSourceId, setSwapSourceId] = useState<string | null>(null);
  const [editingSlotId, setEditingSlotId] = useState<string | null>(null);

  // Substitutes controls
  const [coverDay, setCoverDay] = useState<DayName>('MON');

  // Leave form
  const [lvTeacherId, setLvTeacherId] = useState('t2');
  const [lvDay, setLvDay] = useState<DayName>('TUE');
  const [lvType, setLvType] = useState<LeaveRequest['type']>('Sick leave');
  const [lvDuration, setLvDuration] = useState<LeaveRequest['duration']>('Full day');
  const [lvReason, setLvReason] = useState('');

  // Calendar form
  const [evTitle, setEvTitle] = useState('');
  const [evDay, setEvDay] = useState<DayName>('THU');
  const [evCategory, setEvCategory] = useState<CalendarEvent['category']>('Event');
  const [evRoom, setEvRoom] = useState('Gym');
  const [evNotes, setEvNotes] = useState('');
  const [evFilter, setEvFilter] = useState<'All' | CalendarEvent['category']>('All');

  // Student choice controls
  const [selectedStudentId, setSelectedStudentId] = useState<string>('s1');
  const [newStudentName, setNewStudentName] = useState('');
  const [newCourseCode, setNewCourseCode] = useState('');
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseLevel, setNewCourseLevel] = useState<'HL' | 'SL' | 'Elective'>('HL');
  const [newCourseBlock, setNewCourseBlock] = useState<'Block A' | 'Block B' | 'Block C'>('Block A');
  const [newCourseTeacherId, setNewCourseTeacherId] = useState('t1');
  const [newCourseRoom, setNewCourseRoom] = useState('Rm 101');

  // AI Agent input
  const [agentInput, setAgentInput] = useState('');

  // Setup forms
  const [newTeacherName, setNewTeacherName] = useState('');
  const [newTeacherSubject, setNewTeacherSubject] = useState('Maths');
  const [newClassName, setNewClassName] = useState('');
  const [newRoomName, setNewRoomName] = useState('');

  // Start from Scratch modal
  const [scratchModalOpen, setScratchModalOpen] = useState(false);
  const [scratchSchoolName, setScratchSchoolName] = useState('My School');
  const [scratchClassNames, setScratchClassNames] = useState('Class 10-A, Class 10-B');

  // Video Tutorial Modal
  const [tutorialModalOpen, setTutorialModalOpen] = useState(false);

  // Dropdown menus
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [backupMenuOpen, setBackupMenuOpen] = useState(false);

  // Bulk CSV & Excel Importer State
  const [bulkImportModalOpen, setBulkImportModalOpen] = useState(false);
  const [importTargetTab, setImportTargetTab] = useState<'teachers' | 'classes' | 'rooms' | 'slots'>('teachers');
  const [importText, setImportText] = useState('');
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const importFileRef = useRef<HTMLInputElement>(null);

  // File input ref for JSON restore
  const restoreFileRef = useRef<HTMLInputElement>(null);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as WorkspaceState;
        if (
          parsed &&
          Array.isArray(parsed.slots) &&
          Array.isArray(parsed.teachers) &&
          Array.isArray(parsed.classes)
        ) {
          setState(parsed);
          if (parsed.classes[0]) setSelectedClass(parsed.classes[0]);
        }
      }
      const savedUser = localStorage.getItem(USER_KEY);
      if (savedUser) {
        const u = JSON.parse(savedUser) as { email?: string; name?: string };
        if (u?.email) setUserEmail(u.email);
      }
    } catch {
      // Ignore storage errors
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore quota errors
    }
  }, [state, hydrated]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const conflicts = useMemo(
    () => detectConflicts(state.slots, state.teachers, state.constraints),
    [state.slots, state.teachers, state.constraints]
  );

  const absentTeacherIds = useMemo(
    () => new Set(state.teachers.filter((t) => t.absentToday).map((t) => t.id)),
    [state.teachers]
  );

  const uncoveredSlotsToday = useMemo(
    () =>
      state.slots.filter(
        (s) => s.day === coverDay && absentTeacherIds.has(s.teacherId) && !s.coverTeacherId
      ),
    [state.slots, coverDay, absentTeacherIds]
  );

  const pendingLeaveCount = useMemo(
    () => state.leaveRequests.filter((l) => l.status === 'Pending').length,
    [state.leaveRequests]
  );

  const getTeacherName = (id: string) =>
    state.teachers.find((t) => t.id === id)?.name || 'Unassigned';

  // --- ACTIONS ---
  const handleRegenerate = () => {
    const { slots, conflicts: nextConflicts, durationMs } = generateTimetable(
      state.classes,
      state.teachers,
      state.slots,
      state.constraints,
      state.rooms
    );
    setState((prev) => ({
      ...prev,
      slots,
      lastGeneratedMs: durationMs,
    }));
    setSwapSourceId(null);
    setEditingSlotId(null);
    showToast(
      `Timetable regenerated in ${durationMs}ms (${slots.length} lessons, ${nextConflicts.length} conflicts).`
    );
  };

  const handleToggleLock = (slotId: string) => {
    setState((prev) => ({
      ...prev,
      slots: prev.slots.map((s) => (s.id === slotId ? { ...s, locked: !s.locked } : s)),
    }));
  };

  const handleCreateSlot = (classId: string, day: DayName, period: number) => {
    const defaultSubject = 'Maths';
    const defaultTeacher =
      state.teachers.find((t) => t.subjects.includes(defaultSubject)) || state.teachers[0];
    const defaultRoom = state.rooms[0] || 'Rm 101';
    const newSlot: TimetableSlot = {
      id: `${classId}-${day}-${period}`,
      classId,
      day,
      period,
      subject: defaultSubject,
      teacherId: defaultTeacher?.id || 't1',
      room: defaultRoom,
      locked: true,
    };
    setState((prev) => ({
      ...prev,
      slots: [
        ...prev.slots.filter(
          (s) => !(s.classId === classId && s.day === day && s.period === period)
        ),
        newSlot,
      ],
    }));
    setEditingSlotId(newSlot.id);
    showToast(`Added ${defaultSubject} slot to ${classId} on ${day} Period ${period}.`);
  };

  const handleDeleteSlot = (slotId: string) => {
    setState((prev) => ({
      ...prev,
      slots: prev.slots.filter((s) => s.id !== slotId),
    }));
    if (editingSlotId === slotId) setEditingSlotId(null);
    if (swapSourceId === slotId) setSwapSourceId(null);
    showToast('Cleared period (now Free).');
  };

  const handleSlotClick = (slot: TimetableSlot) => {
    if (viewMode !== 'class') {
      setEditingSlotId(slot.id);
      return;
    }
    if (!swapSourceId) {
      setEditingSlotId(slot.id);
      return;
    }
    if (swapSourceId === slot.id) {
      setSwapSourceId(null);
      return;
    }
    const source = state.slots.find((s) => s.id === swapSourceId);
    if (!source || source.classId !== slot.classId) {
      setSwapSourceId(null);
      return;
    }
    setState((prev) => ({
      ...prev,
      slots: prev.slots.map((s) => {
        if (s.id === source.id) {
          return {
            ...s,
            subject: slot.subject,
            teacherId: slot.teacherId,
            room: slot.room,
            coverTeacherId: slot.coverTeacherId,
            locked: true,
          };
        }
        if (s.id === slot.id) {
          return {
            ...s,
            subject: source.subject,
            teacherId: source.teacherId,
            room: source.room,
            coverTeacherId: source.coverTeacherId,
            locked: true,
          };
        }
        return s;
      }),
    }));
    setSwapSourceId(null);
    setEditingSlotId(slot.id);
    showToast(`Swapped ${source.subject} ↔ ${slot.subject} and locked both slots.`);
  };

  const handleUpdateSlot = (
    slotId: string,
    patch: Partial<Pick<TimetableSlot, 'subject' | 'teacherId' | 'room' | 'locked'>>
  ) => {
    setState((prev) => ({
      ...prev,
      slots: prev.slots.map((s) => (s.id === slotId ? { ...s, ...patch, locked: true } : s)),
    }));
  };

  const handleExportCsv = () => {
    const targetClass = viewMode === 'class' ? selectedClass : state.classes[0];
    const csv = exportTimetableCsv(targetClass, state.slots, state.teachers);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${targetClass.toLowerCase().replace(/\s+/g, '-')}-timetable.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Jadwal kelas ${targetClass} berhasil diekspor ke CSV (format Excel ;)`);
  };

  const handleExportAllCsv = () => {
    const csv = exportAllTimetablesCsv(state.classes, state.slots, state.teachers);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `semua-kelas-timetable-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Seluruh jadwal ${state.classes.length} kelas berhasil diekspor ke CSV (format Excel ;)`);
  };

  const handleBackupJson = () => {
    const json = exportWorkspaceJson(state);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timetablemaster-${state.schoolName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')}-backup.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Workspace backup JSON downloaded.');
  };

  const handleRestoreJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const restored = validateWorkspaceJson(text);
      if (restored) {
        setState(restored);
        if (restored.classes[0]) setSelectedClass(restored.classes[0]);
        showToast('Workspace restored successfully from backup.');
      } else {
        showToast('Invalid backup file format.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleAssignCover = (slotId: string, coverTeacherId: string) => {
    const slot = state.slots.find((s) => s.id === slotId);
    if (!slot) return;
    setState((prev) => ({
      ...prev,
      slots: prev.slots.map((s) => (s.id === slotId ? { ...s, coverTeacherId } : s)),
      teachers: prev.teachers.map((t) =>
        t.id === coverTeacherId ? { ...t, coverThisWeek: t.coverThisWeek + 1 } : t
      ),
      coverLogs: [
        {
          id: `cov-${Date.now()}`,
          day: slot.day,
          period: slot.period,
          classId: slot.classId,
          subject: slot.subject,
          absentTeacherId: slot.teacherId,
          coverTeacherId,
          assignedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev.coverLogs,
      ],
    }));
    showToast(`Assigned ${getTeacherName(coverTeacherId)} to cover ${slot.classId} P${slot.period}.`);
  };

  const handleRemoveCover = (slotId: string) => {
    const slot = state.slots.find((s) => s.id === slotId);
    if (!slot || !slot.coverTeacherId) return;
    const coverTeacherId = slot.coverTeacherId;
    setState((prev) => ({
      ...prev,
      slots: prev.slots.map((s) => (s.id === slotId ? { ...s, coverTeacherId: undefined } : s)),
      teachers: prev.teachers.map((t) =>
        t.id === coverTeacherId ? { ...t, coverThisWeek: Math.max(0, t.coverThisWeek - 1) } : t
      ),
      coverLogs: prev.coverLogs.filter(
        (l) => !(l.classId === slot.classId && l.day === slot.day && l.period === slot.period)
      ),
    }));
    showToast(`Cancelled cover for ${slot.classId} ${slot.day} P${slot.period}.`);
  };

  const handleToggleAbsent = (teacherId: string) => {
    setState((prev) => ({
      ...prev,
      teachers: prev.teachers.map((t) =>
        t.id === teacherId ? { ...t, absentToday: !t.absentToday } : t
      ),
    }));
  };

  const handleLeaveDecision = (leaveId: string, decision: 'Approved' | 'Rejected') => {
    const req = state.leaveRequests.find((l) => l.id === leaveId);
    if (!req) return;
    setState((prev) => ({
      ...prev,
      leaveRequests: prev.leaveRequests.map((l) =>
        l.id === leaveId ? { ...l, status: decision } : l
      ),
      teachers:
        decision === 'Approved'
          ? prev.teachers.map((t) => {
              if (t.id !== req.teacherId) return t;
              const deduction = req.duration === 'Full day' ? 1 : 0.5;
              const balanceKey =
                req.type === 'Sick leave'
                  ? 'sick'
                  : req.type === 'Personal leave'
                    ? 'personal'
                    : 'annual';
              return {
                ...t,
                absentToday: true,
                leaveBalance: {
                  ...t.leaveBalance,
                  [balanceKey]: Math.max(0, t.leaveBalance[balanceKey] - deduction),
                },
              };
            })
          : prev.teachers,
    }));
    if (decision === 'Approved') {
      setCoverDay(req.day);
      showToast(
        `Leave approved for ${getTeacherName(req.teacherId)}. Periods opened in Substitutes (${req.day}).`
      );
    } else {
      showToast(`Leave request rejected.`);
    }
  };

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    const dayDateMap: Record<DayName, string> = {
      MON: 'Mon, 17 Nov',
      TUE: 'Tue, 18 Nov',
      WED: 'Wed, 19 Nov',
      THU: 'Thu, 20 Nov',
      FRI: 'Fri, 21 Nov',
    };
    const newReq: LeaveRequest = {
      id: `lv-${Date.now()}`,
      teacherId: lvTeacherId,
      date: dayDateMap[lvDay],
      day: lvDay,
      type: lvType,
      duration: lvDuration,
      reason: lvReason.trim() || 'Submitted via staff portal',
      status: 'Pending',
    };
    setState((prev) => ({
      ...prev,
      leaveRequests: [newReq, ...prev.leaveRequests],
    }));
    setLvReason('');
    showToast(`Leave request submitted for ${getTeacherName(lvTeacherId)}.`);
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evTitle.trim()) return;
    const dayDateMap: Record<DayName, string> = {
      MON: 'Mon, 24 Nov',
      TUE: 'Tue, 25 Nov',
      WED: 'Wed, 26 Nov',
      THU: 'Thu, 27 Nov',
      FRI: 'Fri, 28 Nov',
    };
    const nextEvent: CalendarEvent = {
      id: `ev-${Date.now()}`,
      title: evTitle.trim(),
      date: dayDateMap[evDay],
      day: evDay,
      category: evCategory,
      room: evRoom,
      affectedClasses:
        evCategory === 'Holiday' || evCategory === 'Assembly' ? state.classes : [selectedClass],
      notes: evNotes.trim() || 'Added to campus calendar.',
    };
    setState((prev) => ({
      ...prev,
      calendarEvents: [nextEvent, ...prev.calendarEvents],
    }));
    setEvTitle('');
    setEvNotes('');
    showToast(`Added "${nextEvent.title}" to school calendar.`);
  };

  const handleDeleteEvent = (id: string) => {
    setState((prev) => ({
      ...prev,
      calendarEvents: prev.calendarEvents.filter((e) => e.id !== id),
    }));
    showToast('Event removed from calendar.');
  };

  const handleToggleStudentCourse = (studentId: string, courseId: string) => {
    const course = state.courses.find((c) => c.id === courseId);
    if (!course) return;
    const enrolled = course.enrolledStudentIds.includes(studentId);
    setState((prev) => ({
      ...prev,
      courses: prev.courses.map((c) => {
        if (c.id !== courseId) return c;
        return {
          ...c,
          enrolledStudentIds: enrolled
            ? c.enrolledStudentIds.filter((id) => id !== studentId)
            : [...c.enrolledStudentIds, studentId],
        };
      }),
      students: prev.students.map((st) => {
        if (st.id !== studentId) return st;
        return {
          ...st,
          choices: enrolled
            ? st.choices.filter((id) => id !== courseId)
            : [...st.choices, courseId],
        };
      }),
    }));
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const newId = `s-${Date.now()}`;
    const defaultChoices = ['c1', 'c6', 'c5'];
    setState((prev) => ({
      ...prev,
      students: [
        ...prev.students,
        { id: newId, name: newStudentName.trim(), grade: 'IB Year 1', choices: defaultChoices },
      ],
      courses: prev.courses.map((c) =>
        defaultChoices.includes(c.id)
          ? { ...c, enrolledStudentIds: [...c.enrolledStudentIds, newId] }
          : c
      ),
    }));
    setSelectedStudentId(newId);
    setNewStudentName('');
    showToast(`Enrolled ${newStudentName.trim()} and built individual schedule.`);
  };

  const handleDeleteStudent = (studentId: string) => {
    if (state.students.length <= 1) {
      showToast('Cannot delete the only remaining student.');
      return;
    }
    const nextStudents = state.students.filter((st) => st.id !== studentId);
    setState((prev) => ({
      ...prev,
      students: nextStudents,
      courses: prev.courses.map((c) => ({
        ...c,
        enrolledStudentIds: c.enrolledStudentIds.filter((id) => id !== studentId),
      })),
    }));
    if (selectedStudentId === studentId) setSelectedStudentId(nextStudents[0].id);
    showToast('Student removed.');
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseCode.trim() || !newCourseName.trim()) return;
    const newCourse: StudentCourse = {
      id: `c-${Date.now()}`,
      code: newCourseCode.trim().toUpperCase(),
      name: newCourseName.trim(),
      level: newCourseLevel,
      teacherId: newCourseTeacherId || state.teachers[0]?.id || 't1',
      room: newCourseRoom || state.rooms[0] || 'Rm 101',
      block: newCourseBlock,
      maxSeats: 16,
      enrolledStudentIds: [],
    };
    setState((prev) => ({
      ...prev,
      courses: [...prev.courses, newCourse],
    }));
    setNewCourseCode('');
    setNewCourseName('');
    showToast(`Created course ${newCourse.code} (${newCourse.name}).`);
  };

  const handleDeleteCourse = (courseId: string) => {
    setState((prev) => ({
      ...prev,
      courses: prev.courses.filter((c) => c.id !== courseId),
      students: prev.students.map((st) => ({
        ...st,
        choices: st.choices.filter((id) => id !== courseId),
      })),
    }));
    showToast('Course removed.');
  };

  const handleSendAgent = (textOverride?: string) => {
    const text = (textOverride ?? agentInput).trim();
    if (!text) return;
    const reply = processAgentPrompt(text, state);
    setState((prev) => ({
      ...prev,
      agentMessages: [
        ...prev.agentMessages,
        { id: `u-${Date.now()}`, role: 'user', text },
        { id: `a-${Date.now() + 1}`, ...reply },
      ],
    }));
    if (!textOverride) setAgentInput('');
  };

  const handleAgentAction = (
    actionType: 'regenerate' | 'auto_cover' | 'resolve_conflicts' | 'approve_all_leave'
  ) => {
    if (actionType === 'regenerate' || actionType === 'resolve_conflicts') {
      handleRegenerate();
    } else if (actionType === 'approve_all_leave') {
      const pending = state.leaveRequests.filter((l) => l.status === 'Pending');
      if (pending.length === 0) {
        showToast('No pending leave requests.');
        return;
      }
      setState((prev) => ({
        ...prev,
        leaveRequests: prev.leaveRequests.map((l) => ({ ...l, status: 'Approved' })),
        teachers: prev.teachers.map((t) => {
          const hasLeave = pending.some((p) => p.teacherId === t.id);
          if (!hasLeave) return t;
          return { ...t, absentToday: true };
        }),
      }));
      showToast(`Approved ${pending.length} leave requests and updated absences.`);
    } else if (actionType === 'auto_cover') {
      const openSlots = state.slots.filter(
        (s) => s.day === 'MON' && absentTeacherIds.has(s.teacherId) && !s.coverTeacherId
      );
      if (openSlots.length === 0) {
        showToast('All periods are already covered.');
        return;
      }
      let nextSlots = [...state.slots];
      let nextTeachers = [...state.teachers];
      const newLogs = [...state.coverLogs];
      for (const slot of openSlots) {
        const top = rankCoverCandidates(slot, nextTeachers, nextSlots)[0];
        if (!top) continue;
        nextSlots = nextSlots.map((s) =>
          s.id === slot.id ? { ...s, coverTeacherId: top.teacher.id } : s
        );
        nextTeachers = nextTeachers.map((t) =>
          t.id === top.teacher.id ? { ...t, coverThisWeek: t.coverThisWeek + 1 } : t
        );
        newLogs.unshift({
          id: `cov-${Date.now()}-${slot.period}`,
          day: slot.day,
          period: slot.period,
          classId: slot.classId,
          subject: slot.subject,
          absentTeacherId: slot.teacherId,
          coverTeacherId: top.teacher.id,
          assignedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }
      setState((prev) => ({
        ...prev,
        slots: nextSlots,
        teachers: nextTeachers,
        coverLogs: newLogs,
      }));
      showToast(`AI Agent assigned ${openSlots.length} top-ranked cover teacher(s).`);
    }
  };

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacherName.trim()) return;
    const id = `t-${Date.now()}`;
    const rawSubjs = newTeacherSubject
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const subjects = rawSubjs.length > 0 ? rawSubjs : ['General'];
    setState((prev) => ({
      ...prev,
      teachers: [
        ...prev.teachers,
        {
          id,
          name: newTeacherName.trim(),
          subjects,
          maxWeeklyPeriods: 18,
          coverThisWeek: 0,
          leaveBalance: { sick: 10, personal: 5, annual: 15 },
        },
      ],
    }));
    setNewTeacherName('');
    showToast(`Added teacher ${newTeacherName.trim()} (${subjects.join(', ')}).`);
  };

  const handleDeleteTeacher = (teacherId: string) => {
    if (state.teachers.length <= 1) {
      showToast('Cannot delete the only remaining teacher.');
      return;
    }
    const tName = getTeacherName(teacherId);
    const fallback = state.teachers.find((t) => t.id !== teacherId)!;
    setState((prev) => ({
      ...prev,
      teachers: prev.teachers.filter((t) => t.id !== teacherId),
      slots: prev.slots.map((s) =>
        s.teacherId === teacherId ? { ...s, teacherId: fallback.id } : s
      ),
      courses: prev.courses.map((c) =>
        c.teacherId === teacherId ? { ...c, teacherId: fallback.id } : c
      ),
    }));
    showToast(`Deleted teacher ${tName} (reassigned lessons to ${fallback.name}).`);
  };

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = newClassName
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    if (raw.length === 0) return;
    const uniqueNew = raw.filter((c) => !state.classes.includes(c));
    if (uniqueNew.length === 0) {
      showToast('Semua kelas sudah ada dalam daftar.');
      return;
    }
    const nextClasses = [...state.classes, ...uniqueNew];
    const newRooms = uniqueNew.map((c) => `Rm ${c.replace(/^(Class|Kelas)\s*/i, '')}`);
    const nextRooms = Array.from(new Set([...state.rooms, ...newRooms]));

    const { slots, durationMs } = generateTimetable(
      nextClasses,
      state.teachers,
      state.slots,
      state.constraints,
      nextRooms
    );
    setState((prev) => ({
      ...prev,
      classes: nextClasses,
      rooms: nextRooms,
      slots,
      lastGeneratedMs: durationMs,
    }));
    setSelectedClass(uniqueNew[0]);
    setNewClassName('');
    showToast(`Added ${uniqueNew.length} class(es): ${uniqueNew.join(', ')}.`);
  };

  const handleDeleteClass = (className: string) => {
    if (state.classes.length <= 1) {
      showToast('Cannot delete the only remaining class.');
      return;
    }
    const nextClasses = state.classes.filter((c) => c !== className);
    setState((prev) => ({
      ...prev,
      classes: nextClasses,
      slots: prev.slots.filter((s) => s.classId !== className),
    }));
    if (selectedClass === className) setSelectedClass(nextClasses[0]);
    showToast(`Removed ${className} and cleaned up its lessons.`);
  };

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = newRoomName.trim();
    if (!cleaned || state.rooms.includes(cleaned)) return;
    setState((prev) => ({
      ...prev,
      rooms: [...prev.rooms, cleaned],
    }));
    setNewRoomName('');
    showToast(`Added new room "${cleaned}".`);
  };

  const handleDeleteRoom = (roomName: string) => {
    if (state.rooms.length <= 1) {
      showToast('Cannot delete the only remaining room.');
      return;
    }
    setState((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((r) => r !== roomName),
    }));
    showToast(`Removed room ${roomName}.`);
  };

  const handleSaveSchoolName = () => {
    const cleaned = tempSchoolName.trim();
    if (cleaned) {
      setState((prev) => ({ ...prev, schoolName: cleaned }));
      showToast(`Updated school name to "${cleaned}".`);
    }
    setEditingSchoolName(false);
  };

  const handleResetDemo = () => {
    const fresh = createInitialWorkspaceState();
    setState(fresh);
    setSelectedClass('Class 10-A');
    setSwapSourceId(null);
    setEditingSlotId(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    showToast('Workspace reset to default school dataset.');
  };

  const handleClearAllSlots = () => {
    setState((prev) => ({
      ...prev,
      slots: [],
    }));
    setEditingSlotId(null);
    setSwapSourceId(null);
    setScratchModalOpen(false);
    showToast('Semua slot jadwal dikosongkan. Anda dapat mulai menjadwalkan secara manual.');
  };

  const handleStartFreshSchool = () => {
    const rawClasses = scratchClassNames
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);
    const classes = rawClasses.length > 0 ? rawClasses : ['Class 10-A'];
    const schoolName = scratchSchoolName.trim() || 'My School';
    const autoRooms = classes.map((c) => `Rm ${c.replace(/^(Class|Kelas)\s*/i, '')}`);
    const nextRooms = Array.from(
      new Set([...autoRooms, 'Lab A', 'Lab B', 'Gym', 'Lapangan', 'Art Room', 'CS Lab'])
    );
    setState((prev) => ({
      ...prev,
      schoolName,
      classes,
      rooms: nextRooms,
      slots: [],
      leaveRequests: [],
      coverLogs: [],
      calendarEvents: [],
      courses: [],
      students: [],
    }));
    setSelectedClass(classes[0]);
    setEditingSlotId(null);
    setSwapSourceId(null);
    setScratchModalOpen(false);
    showToast(`Sekolah "${schoolName}" siap dengan ${classes.length} kelas dan ${nextRooms.length} ruangan.`);
  };

  // Bulk Import Handlers
  const handleOpenBulkImport = (target: 'teachers' | 'classes' | 'rooms' | 'slots') => {
    setImportTargetTab(target);
    setImportText('');
    setImportMode('append');
    setBulkImportModalOpen(true);
  };

  const handleDownloadTemplate = (type: 'teachers' | 'classes' | 'rooms' | 'slots') => {
    let content = '';
    let filename = '';
    if (type === 'teachers') {
      content = getSampleTeacherCsv();
      filename = 'template-guru-timetablemaster.csv';
    } else if (type === 'classes') {
      content = getSampleClassCsv();
      filename = 'template-kelas-timetablemaster.csv';
    } else if (type === 'rooms') {
      content = getSampleRoomCsv();
      filename = 'template-ruangan-timetablemaster.csv';
    } else {
      content = getSampleScheduleCsv();
      filename = 'template-jadwal-timetablemaster.csv';
    }

    // Prepend UTF-8 BOM (\uFEFF) so Excel Indonesia opens columns into separate cells automatically using semicolon (;)
    const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Template CSV ${type} (format Excel Indonesia ;) berhasil diunduh.`);
  };

  const handleImportFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setImportText(text);
        showToast(`File ${file.name} berhasil dibaca.`);
      }
    };
    reader.readAsText(file);
    if (importFileRef.current) importFileRef.current.value = '';
  };

  const previewTeachers = useMemo(() => {
    if (importTargetTab !== 'teachers' || !importText.trim()) return [];
    return parseTeachersFromText(importText);
  }, [importTargetTab, importText]);

  const previewClasses = useMemo(() => {
    if (importTargetTab !== 'classes' || !importText.trim()) return [];
    return parseClassesFromText(importText);
  }, [importTargetTab, importText]);

  const previewRooms = useMemo(() => {
    if (importTargetTab !== 'rooms' || !importText.trim()) return [];
    return parseRoomsFromText(importText);
  }, [importTargetTab, importText]);

  const previewSlots = useMemo(() => {
    if (importTargetTab !== 'slots' || !importText.trim()) return [];
    return parseScheduleSlotsFromText(importText);
  }, [importTargetTab, importText]);

  const handleExecuteImport = () => {
    if (!importText.trim()) {
      showToast('Tempelkan teks tabel atau pilih file CSV terlebih dahulu!');
      return;
    }

    if (importTargetTab === 'teachers') {
      const parsed = parseTeachersFromText(importText);
      if (parsed.length === 0) {
        showToast('Tidak ada data guru valid yang terdeteksi. Periksa format kolom!');
        return;
      }
      const newTeachers = parsed.map((p, idx) => ({
        id: `t-${Date.now()}-${idx}`,
        name: p.name,
        subjects: p.subjects,
        maxWeeklyPeriods: p.maxWeeklyPeriods,
        coverThisWeek: 0,
        leaveBalance: { sick: 10, personal: 5, annual: 12 },
      }));

      setState((prev) => ({
        ...prev,
        teachers: importMode === 'replace' ? newTeachers : [...prev.teachers, ...newTeachers],
      }));
      setBulkImportModalOpen(false);
      showToast(`Sukses mengimpor ${newTeachers.length} data guru ke sistem!`);
    } else if (importTargetTab === 'classes') {
      const parsed = parseClassesFromText(importText);
      if (parsed.length === 0) {
        showToast('Tidak ada rombel kelas valid yang terdeteksi!');
        return;
      }
      setState((prev) => {
        const nextClasses = importMode === 'replace' ? parsed : Array.from(new Set([...prev.classes, ...parsed]));
        return {
          ...prev,
          classes: nextClasses,
        };
      });
      setSelectedClass(parsed[0]);
      setBulkImportModalOpen(false);
      showToast(`Sukses mengimpor ${parsed.length} rombel kelas ke sistem!`);
    } else if (importTargetTab === 'rooms') {
      const parsed = parseRoomsFromText(importText);
      if (parsed.length === 0) {
        showToast('Tidak ada data ruangan valid yang terdeteksi!');
        return;
      }
      setState((prev) => {
        const nextRooms = importMode === 'replace' ? parsed : Array.from(new Set([...prev.rooms, ...parsed]));
        return {
          ...prev,
          rooms: nextRooms,
        };
      });
      setBulkImportModalOpen(false);
      showToast(`Sukses mengimpor ${parsed.length} ruangan ke sistem!`);
    } else if (importTargetTab === 'slots') {
      const parsed = parseScheduleSlotsFromText(importText);
      if (parsed.length === 0) {
        showToast('Tidak ada jadwal pelajaran valid yang terdeteksi!');
        return;
      }
      const newSlots: TimetableSlot[] = parsed.map((p, idx) => {
        const foundTeacher = state.teachers.find(
          (t) => t.name.toLowerCase() === p.teacherName.toLowerCase()
        );
        const teacherId = foundTeacher ? foundTeacher.id : (state.teachers[0]?.id || 't1');
        return {
          id: `slot-${Date.now()}-${idx}`,
          classId: p.classId,
          day: p.day,
          period: p.period,
          subject: p.subject,
          teacherId,
          room: p.room,
          locked: false,
        };
      });

      setState((prev) => ({
        ...prev,
        slots: importMode === 'replace' ? newSlots : [...prev.slots, ...newSlots],
      }));
      setBulkImportModalOpen(false);
      showToast(`Sukses mengimpor ${newSlots.length} slot jadwal pelajaran!`);
    }
  };

  const editingSlot = editingSlotId ? state.slots.find((s) => s.id === editingSlotId) : null;
  const editingSlotJointPartner = editingSlot
    ? state.slots.find(
        (other) =>
          other.id !== editingSlot.id &&
          other.day === editingSlot.day &&
          other.period === editingSlot.period &&
          (other.coverTeacherId || other.teacherId) ===
            (editingSlot.coverTeacherId || editingSlot.teacherId) &&
          other.subject === editingSlot.subject &&
          other.room === editingSlot.room
      )
    : null;
  const selectedStudent =
    state.students.find((s) => s.id === selectedStudentId) || state.students[0];

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F6F8]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#4F46E5] border-t-transparent" />
          <p className="text-xs font-semibold text-[#565A62]">Memuat Ruang Kerja Jadwal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] text-[#111214]">
      {/* Top Workspace Header */}
      <header className="sticky top-0 z-40 border-b border-[#E4E6EA] bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="TimetableMaster Home" className="flex items-center">
              <BrandMark variant="light" size="sm" />
            </Link>
            <span className="hidden h-5 w-px bg-[#E4E6EA] sm:inline-block" />
            <div className="hidden sm:block">
              {editingSchoolName ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={tempSchoolName}
                    onChange={(e) => setTempSchoolName(e.target.value)}
                    className="rounded border border-[#4F46E5] px-2 py-0.5 text-xs font-bold text-[#111214] focus:outline-none"
                    placeholder="Enter school name"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSaveSchoolName}
                    className="rounded bg-[#4F46E5] px-2 py-0.5 text-[11px] font-semibold text-white"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingSchoolName(false)}
                    className="text-[11px] text-[#8A8F98]"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <div className="text-sm font-bold tracking-tight text-[#111214]">
                    {state.schoolName}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTempSchoolName(state.schoolName);
                      setEditingSchoolName(true);
                    }}
                    title="Ubah Nama Sekolah"
                    className="text-[10px] text-[#8A8F98] hover:text-[#4F46E5]"
                  >
                    ✎
                  </button>
                </div>
              )}
              <div suppressHydrationWarning className="text-[11px] text-[#8A8F98]">
                Tahun Ajaran 2026/2027 · {state.classes.length} Rombel · {state.teachers.length} Guru ·{' '}
                {state.rooms.length} Ruangan
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <span
              suppressHydrationWarning
              className="hidden items-center gap-2 rounded-lg border border-[#E4E6EA] bg-[#F9FAFB] px-3 py-1.5 text-xs font-medium text-[#565A62] lg:inline-flex"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  conflicts.length === 0 ? 'bg-[#10B981]' : 'bg-[#EF4444]'
                }`}
              />
              <span>{conflicts.length === 0 ? '0 Bentrok' : `${conflicts.length} Bentrok`}</span>
            </span>

            <button
              type="button"
              onClick={() => setTutorialModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-medium text-[#111214] transition-colors hover:border-[#111214] hover:bg-gray-50"
              title="Tonton video tutorial panduan lengkap penggunaan"
            >
              <span>🎬</span>
              <span>Video Tutorial</span>
            </button>

            <button
              type="button"
              onClick={() => setScratchModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-medium text-[#111214] transition-colors hover:border-[#111214] hover:bg-gray-50"
              title="Mulai buat jadwal dari nol atau reset data"
            >
              <span>✨</span>
              <span>Mulai Baru</span>
            </button>

            <div className="hidden items-center gap-2 rounded-lg border border-[#E4E6EA] bg-[#F9FAFB] py-1 pl-2.5 pr-2.5 text-xs font-medium text-[#3A3D44] md:flex">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4F46E5] text-[10px] font-bold text-white">
                {userEmail.charAt(0).toUpperCase()}
              </span>
              <span suppressHydrationWarning className="max-w-[120px] truncate">{userEmail}</span>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem(USER_KEY);
                  } catch {
                    // Ignore
                  }
                  window.location.href = '/login/';
                }}
                title="Keluar akun dan ganti user"
                className="ml-1 text-[11px] font-semibold text-[#8A8F98] hover:text-[#DC2626]"
              >
                Keluar
              </button>
            </div>

            <Link
              href="/"
              className="rounded-lg bg-[#111214] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#2A2C31]"
            >
              Ke Beranda
            </Link>
          </div>
        </div>

        {/* Module Navigation Strip */}
        <div className="border-t border-[#E4E6EA] bg-white">
          <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4 py-2 sm:px-6 scrollbar-hide">
            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.id;
              const badge =
                !hydrated
                  ? null
                  : item.id === 'substitutes' && uncoveredSlotsToday.length > 0
                    ? uncoveredSlotsToday.length
                    : item.id === 'leave' && pendingLeaveCount > 0
                      ? pendingLeaveCount
                      : null;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors sm:text-sm ${
                    active
                      ? 'bg-[#4F46E5] text-white shadow-xs'
                      : 'text-[#565A62] hover:bg-[#F5F6F8] hover:text-[#111214]'
                  }`}
                >
                  <span>{item.label}</span>
                  {badge !== null && (
                    <span
                      suppressHydrationWarning
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        active ? 'bg-white/20 text-white' : 'bg-[#EEF2FF] text-[#4F46E5]'
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm rounded-xl bg-[#111214] px-4 py-3 text-sm font-medium text-white shadow-xl">
          {toast}
        </div>
      )}

      {/* Main Content Area */}
      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
        {/* ================= MODULE 1: TIMETABLE ================= */}
        {activeTab === 'timetable' && (
          <div className="space-y-5">
            {/* Clean, Spacious Toolbar */}
            <div className="flex flex-col gap-3 rounded-2xl border border-[#E4E6EA] bg-white p-3.5 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
              {/* Left: View Filters & Main CTA */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex rounded-lg border border-[#E4E6EA] bg-[#F5F6F8] p-0.5">
                  {(['class', 'teacher', 'room'] as const).map((m) => {
                    const modeLabel = m === 'class' ? 'Per Kelas' : m === 'teacher' ? 'Per Guru' : 'Per Ruangan';
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => {
                          setViewMode(m);
                          setSwapSourceId(null);
                        }}
                        className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                          viewMode === m
                            ? 'bg-white text-[#111214] shadow-xs'
                            : 'text-[#565A62] hover:text-[#111214]'
                        }`}
                      >
                        {modeLabel}
                      </button>
                    );
                  })}
                </div>

                {viewMode === 'class' && (
                  <select
                    aria-label="Pilih kelas"
                    value={selectedClass}
                    onChange={(e) => {
                      setSelectedClass(e.target.value);
                      setSwapSourceId(null);
                    }}
                    className="rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-semibold text-[#111214] focus:border-[#4F46E5] focus:outline-none"
                  >
                    {state.classes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                )}

                {viewMode === 'teacher' && (
                  <select
                    aria-label="Pilih guru"
                    value={selectedTeacherId}
                    onChange={(e) => setSelectedTeacherId(e.target.value)}
                    className="rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-semibold text-[#111214] focus:border-[#4F46E5] focus:outline-none"
                  >
                    {state.teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                )}

                {viewMode === 'room' && (
                  <select
                    aria-label="Pilih ruangan"
                    value={selectedRoom}
                    onChange={(e) => setSelectedRoom(e.target.value)}
                    className="rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-semibold text-[#111214] focus:border-[#4F46E5] focus:outline-none"
                  >
                    {state.rooms.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  type="button"
                  onClick={handleRegenerate}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#4338CA]"
                  title="Generate susunan jadwal otomatis bebas bentrok"
                >
                  <span>⚡</span>
                  <span>Generate Jadwal AI</span>
                </button>
              </div>

              {/* Right: Actions (Cetak, Ekspor, Cadangan) */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-medium text-[#111214] transition-colors hover:bg-gray-50"
                  title="Cetak jadwal kelas ini ke printer atau simpan sebagai PDF"
                >
                  <span>🖨️</span>
                  <span>Cetak / PDF</span>
                </button>

                {/* Ekspor Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setExportMenuOpen(!exportMenuOpen);
                      setBackupMenuOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-medium text-[#111214] transition-colors hover:bg-gray-50"
                  >
                    <span>📊</span>
                    <span>Ekspor CSV</span>
                    <span className="text-[10px] text-[#8A8F98]">▾</span>
                  </button>
                  {exportMenuOpen && (
                    <div className="absolute right-0 top-full z-30 mt-1 w-52 rounded-xl border border-[#E4E6EA] bg-white p-1 shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          setExportMenuOpen(false);
                          handleExportCsv();
                        }}
                        className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-[#111214] hover:bg-[#F5F6F8]"
                      >
                        Ekspor CSV Kelas ({selectedClass})
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setExportMenuOpen(false);
                          handleExportAllCsv();
                        }}
                        className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-[#111214] hover:bg-[#F5F6F8]"
                      >
                        Ekspor Master Semua Kelas ({state.classes.length} Rombel)
                      </button>
                      <div className="my-1 border-t border-[#E4E6EA]" />
                      <button
                        type="button"
                        onClick={() => {
                          setExportMenuOpen(false);
                          handleOpenBulkImport('slots');
                        }}
                        className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-[#4F46E5] hover:bg-[#EEF2FF]"
                      >
                        📥 Impor Data Jadwal CSV...
                      </button>
                    </div>
                  )}
                </div>

                {/* Cadangan Dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setBackupMenuOpen(!backupMenuOpen);
                      setExportMenuOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-medium text-[#111214] transition-colors hover:bg-gray-50"
                  >
                    <span>💾</span>
                    <span>Cadangan</span>
                    <span className="text-[10px] text-[#8A8F98]">▾</span>
                  </button>
                  {backupMenuOpen && (
                    <div className="absolute right-0 top-full z-30 mt-1 w-56 rounded-xl border border-[#E4E6EA] bg-white p-1 shadow-lg">
                      <button
                        type="button"
                        onClick={() => {
                          setBackupMenuOpen(false);
                          handleBackupJson();
                        }}
                        className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-[#111214] hover:bg-[#F5F6F8]"
                      >
                        Simpan Cadangan (File JSON)
                      </button>
                      <label className="block w-full cursor-pointer rounded-lg px-3 py-2 text-left text-xs font-medium text-[#111214] hover:bg-[#F5F6F8]">
                        Pulihkan Data (File JSON)
                        <input
                          ref={restoreFileRef}
                          type="file"
                          accept=".json"
                          onChange={(e) => {
                            setBackupMenuOpen(false);
                            handleRestoreJson(e);
                          }}
                          className="hidden"
                        />
                      </label>
                      <div className="my-1 border-t border-[#E4E6EA]" />
                      <button
                        type="button"
                        onClick={() => {
                          setBackupMenuOpen(false);
                          handleOpenBulkImport('teachers');
                        }}
                        className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold text-[#4F46E5] hover:bg-[#EEF2FF]"
                      >
                        📥 Impor Massal (Excel / CSV)...
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Rules Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E4E6EA] bg-[#FBFBFC] px-4 py-2.5 text-xs">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A8F98]">
                  Aturan Aktif:
                </span>
                <label className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-[#475569] hover:text-[#111214]">
                  <input
                    type="checkbox"
                    checked={state.constraints.noPeLastPeriod}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        constraints: { ...prev.constraints, noPeLastPeriod: e.target.checked },
                      }))
                    }
                    className="h-3.5 w-3.5 rounded border-gray-300 accent-[#4F46E5]"
                  />
                  Olahraga (PJOK) bukan di jam terakhir
                </label>
                <label className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-[#475569] hover:text-[#111214]">
                  <input
                    type="checkbox"
                    checked={state.constraints.scienceInLabA}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        constraints: { ...prev.constraints, scienceInLabA: e.target.checked },
                      }))
                    }
                    className="h-3.5 w-3.5 rounded border-gray-300 accent-[#4F46E5]"
                  />
                  Praktikum IPA di Ruang Lab
                </label>
                <label className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-[#475569] hover:text-[#111214]">
                  <input
                    type="checkbox"
                    checked={state.constraints.noSubjectTwiceDaily}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        constraints: { ...prev.constraints, noSubjectTwiceDaily: e.target.checked },
                      }))
                    }
                    className="h-3.5 w-3.5 rounded border-gray-300 accent-[#4F46E5]"
                  />
                  Maksimal 1 kali mapel per hari
                </label>
                <label className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-[#475569] hover:text-[#111214]">
                  <input
                    type="checkbox"
                    checked={state.constraints.allowJointClasses ?? true}
                    onChange={(e) =>
                      setState((prev) => ({
                        ...prev,
                        constraints: { ...prev.constraints, allowJointClasses: e.target.checked },
                      }))
                    }
                    className="h-3.5 w-3.5 rounded border-gray-300 accent-[#4F46E5]"
                  />
                  Kelas Gabungan (1 Guru 2 Kelas)
                </label>
              </div>
              <div className="text-[11px] font-medium text-[#8A8F98]">
                Selesai dalam {state.lastGeneratedMs} md · {state.slots.filter((s) => s.locked).length} jam dikunci
              </div>
            </div>

            {conflicts.length > 0 && (
              <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4 text-xs text-[#991B1B]">
                <div className="flex items-center justify-between gap-2">
                  <strong className="font-bold">
                    Terdeteksi {conflicts.length} bentrok jadwal:
                  </strong>
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="rounded-lg bg-[#DC2626] px-3 py-1 text-xs font-semibold text-white hover:bg-[#B91C1C]"
                  >
                    Perbaiki Otomatis Sekarang
                  </button>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  {conflicts.slice(0, 5).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Compact, Clean Empty Notification */}
            {state.slots.length === 0 && (
              <div className="flex flex-col gap-3 rounded-xl border border-[#E4E6EA] bg-[#F9FAFB] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#4F46E5]">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#111214]">
                      Workspace Bersih — Jadwal Saat Ini Masih Kosong
                    </h3>
                    <p className="text-[11px] text-[#565A62]">
                      Klik kotak di tabel bawah untuk mengisi pelajaran secara manual, atau klik tombol di samping untuk menyusun otomatis secara instan.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-[#4338CA]"
                  >
                    <span>⚡</span>
                    <span>Generate Otomatis AI</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleResetDemo}
                    className="rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-semibold text-[#565A62] transition hover:bg-gray-50 hover:text-[#111214]"
                  >
                    Muat Data Contoh
                  </button>
                </div>
              </div>
            )}

            {/* Main Grid + Inspector */}
            <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
              <div className="overflow-x-auto rounded-2xl border border-[#E4E6EA] bg-white p-4">
                {swapSourceId && (
                  <div className="mb-3 flex items-center justify-between rounded-lg bg-[#EEF2FF] px-3 py-2 text-xs font-semibold text-[#3730A3]">
                    <span>Mode tukar posisi aktif — klik jam pelajaran lain di {selectedClass} untuk menukar posisi.</span>
                    <button
                      type="button"
                      onClick={() => setSwapSourceId(null)}
                      className="underline"
                    >
                      Batal
                    </button>
                  </div>
                )}

                <table className="w-full min-w-[680px] border-separate border-spacing-2 text-left">
                  <thead>
                    <tr>
                      <th className="w-28 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]">
                        Jam ke-
                      </th>
                      {DAYS.map((day) => {
                        const dayEvents = state.calendarEvents.filter((e) => e.day === day);
                        return (
                          <th
                            key={day}
                            className="px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]"
                          >
                            <div className="flex items-center gap-1.5">
                              <span>{DAY_INDONESIAN[day]}</span>
                              {dayEvents.length > 0 && (
                                <span
                                  title={dayEvents.map((e) => e.title).join(', ')}
                                  className="rounded bg-[#F1F5F9] px-1.5 py-0.5 text-[9px] font-medium text-[#475569] capitalize"
                                >
                                  {dayEvents[0].category === 'Exam' ? 'Ujian' : dayEvents[0].category === 'Holiday' ? 'Libur' : dayEvents[0].category === 'Assembly' ? 'Upacara' : 'Acara'}
                                </span>
                              )}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {PERIODS.map((period) => (
                      <tr key={period}>
                        <td className="align-top px-2 py-2">
                          <div className="text-xs font-bold text-[#111214]">Jam ke-{period}</div>
                          <div className="text-[11px] text-[#8A8F98]">{PERIOD_TIMES[period]}</div>
                        </td>
                        {DAYS.map((day) => {
                          const slot =
                            viewMode === 'class'
                              ? state.slots.find(
                                  (s) =>
                                    s.classId === selectedClass &&
                                    s.day === day &&
                                    s.period === period
                                )
                              : viewMode === 'teacher'
                                ? state.slots.find(
                                    (s) =>
                                      (s.coverTeacherId || s.teacherId) === selectedTeacherId &&
                                      s.day === day &&
                                      s.period === period
                                  )
                                : state.slots.find(
                                    (s) =>
                                      s.room === selectedRoom &&
                                      s.day === day &&
                                      s.period === period
                                  );

                          if (!slot) {
                            return (
                              <td key={day} className="align-top">
                                <button
                                  type="button"
                                  onClick={() => handleCreateSlot(selectedClass, day, period)}
                                  className="group flex h-[76px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#E4E6EA] bg-[#FAFAFB] p-2 text-center transition-colors hover:border-[#4F46E5] hover:bg-[#EEF2FF]/30"
                                >
                                  <span className="text-[11px] font-medium text-[#A1A5AD] group-hover:hidden">
                                    Kosong
                                  </span>
                                  <span className="hidden text-xs font-semibold text-[#4F46E5] group-hover:inline-block">
                                    + Isi Jam
                                  </span>
                                </button>
                              </td>
                            );
                          }

                          const theme = getSubjectTheme(slot.subject);
                          const isSelected = editingSlotId === slot.id || swapSourceId === slot.id;
                          const isAbsentUncovered =
                            slot.day === coverDay &&
                            absentTeacherIds.has(slot.teacherId) &&
                            !slot.coverTeacherId;
                          const jointPartner = state.slots.find(
                            (other) =>
                              other.id !== slot.id &&
                              other.day === slot.day &&
                              other.period === slot.period &&
                              (other.coverTeacherId || other.teacherId) ===
                                (slot.coverTeacherId || slot.teacherId) &&
                              other.subject === slot.subject &&
                              other.room === slot.room
                          );

                          return (
                            <td key={day} className="align-top">
                              <button
                                type="button"
                                onClick={() => handleSlotClick(slot)}
                                className={`flex h-[76px] w-full flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${theme.bg} ${theme.border} ${
                                  isSelected ? 'ring-2 ring-[#4F46E5]' : 'hover:border-[#CBD5E1] hover:shadow-xs'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-1">
                                  <span className="text-xs font-bold leading-tight text-[#111214]">
                                    {slot.subject}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    {jointPartner && (
                                      <span
                                        title={`Kelas gabungan bersama ${jointPartner.classId}`}
                                        className="rounded bg-[#EEF2FF] px-1 text-[9px] font-bold text-[#4F46E5]"
                                      >
                                        GABUNGAN
                                      </span>
                                    )}
                                    {slot.locked && (
                                      <span
                                        title="Jam dikunci (tidak diubah AI)"
                                        className="rounded bg-[#F1F5F9] px-1 text-[9px] font-bold text-[#475569]"
                                      >
                                        KUNCI
                                      </span>
                                    )}
                                    {slot.coverTeacherId && (
                                      <span className="rounded bg-[#EEF2FF] px-1 text-[9px] font-bold text-[#4F46E5]">
                                        PIKET
                                      </span>
                                    )}
                                    {isAbsentUncovered && (
                                      <span className="rounded bg-[#FEF2F2] px-1 text-[9px] font-bold text-[#DC2626]">
                                        ABSEN
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="space-y-0.5 text-[11px] text-[#565A62]">
                                  <div className="truncate font-medium">
                                    {viewMode === 'class'
                                      ? getTeacherName(slot.coverTeacherId || slot.teacherId)
                                      : slot.classId}
                                  </div>
                                  <div className="text-[10px] text-[#8A8F98]">{slot.room}</div>
                                </div>
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Right Slot Inspector Panel */}
              <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
                <h2 className="font-display text-sm font-bold text-[#111214]">
                  Pemeriksa &amp; Editor Jam Pelajaran
                </h2>
                {editingSlot ? (
                  <div className="mt-4 space-y-4">
                    <div className="rounded-xl bg-[#F5F6F8] p-3 text-xs">
                      <div className="font-bold text-[#111214]">
                        {editingSlot.classId} · {DAY_INDONESIAN[editingSlot.day]} Jam ke-{editingSlot.period}
                      </div>
                      <div className="mt-0.5 text-[#565A62]">
                        {PERIOD_TIMES[editingSlot.period]}
                      </div>
                      {editingSlot.coverTeacherId && (
                        <div className="mt-1 flex items-center justify-between text-[11px] text-[#4F46E5]">
                          <span>Guru Piket: {getTeacherName(editingSlot.coverTeacherId)}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCover(editingSlot.id)}
                            className="font-bold underline"
                          >
                            Hapus Piket
                          </button>
                        </div>
                      )}
                    </div>

                    {editingSlotJointPartner && (
                      <div className="rounded-xl border border-[#C7D2FE] bg-[#EEF2FF] p-3 text-xs text-[#3730A3]">
                        <div className="flex items-center gap-1.5 font-bold">
                          <span>🔗</span>
                          <span>Kelas Gabungan</span>
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed text-[#4338CA]">
                          Diajar bersamaan dengan <strong>{editingSlotJointPartner.classId}</strong> ({editingSlot.subject}) di ruangan yang sama ({editingSlot.room}).
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                        Mata Pelajaran
                      </label>
                      <select
                        value={editingSlot.subject}
                        onChange={(e) =>
                          handleUpdateSlot(editingSlot.id, { subject: e.target.value })
                        }
                        className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm text-[#111214]"
                      >
                        {Object.keys(SUBJECT_COLORS).map((subj) => (
                          <option key={subj} value={subj}>
                            {subj}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                        Guru Pengajar
                      </label>
                      <select
                        value={editingSlot.teacherId}
                        onChange={(e) =>
                          handleUpdateSlot(editingSlot.id, { teacherId: e.target.value })
                        }
                        className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm text-[#111214]"
                      >
                        {state.teachers.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} ({t.subjects.join(', ')})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                        Ruang Kelas / Lab
                      </label>
                      <select
                        value={editingSlot.room}
                        onChange={(e) => handleUpdateSlot(editingSlot.id, { room: e.target.value })}
                        className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm text-[#111214]"
                      >
                        {state.rooms.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-2 pt-2">
                      {viewMode === 'class' && (
                        <button
                          type="button"
                          onClick={() => setSwapSourceId(editingSlot.id)}
                          className="w-full rounded-full bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4338CA]"
                        >
                          Tukar posisi jam pelajaran
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleToggleLock(editingSlot.id)}
                        className="w-full rounded-full border border-[#D5D9DF] px-4 py-2 text-xs font-semibold text-[#111214] hover:border-[#111214]"
                      >
                        {editingSlot.locked ? 'Buka Kunci Jam' : 'Kunci Jam (Jangan Diubah AI)'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteSlot(editingSlot.id)}
                        className="w-full rounded-full border border-[#FECACA] bg-[#FEF2F2] px-4 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#FEE2E2]"
                      >
                        Kosongkan Jam Pelajaran
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-xs leading-relaxed text-[#565A62]">
                    Klik kotak jam pelajaran pada jadwal di sebelah kiri untuk mengubah mapel, guru, atau ruangan, menguncinya, menukarnya, atau mengosongkannya. Anda juga dapat mengklik kotak Kosong untuk mengisi pelajaran baru.
                  </p>
                )}

                <div className="mt-6 border-t border-[#E4E6EA] pt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]">
                    Laporan Kualitas Jadwal
                  </div>
                  <dl className="mt-2.5 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-[#565A62]">Total jam terisi</dt>
                      <dd className="font-bold text-[#111214]">
                        {state.slots.length} / {state.classes.length * 25}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#565A62]">Bentrok Jadwal</dt>
                      <dd
                        className={`font-bold ${
                          conflicts.length === 0 ? 'text-[#059669]' : 'text-[#DC2626]'
                        }`}
                      >
                        {conflicts.length}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-[#565A62]">Guru piket aktif hari ini</dt>
                      <dd className="font-bold text-[#4F46E5]">{state.coverLogs.length}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= MODULE 2: SUBSTITUTES ================= */}
        {activeTab === 'substitutes' && (
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            {/* Staff Attendance Toggle */}
            <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-[#111214]">
                  Daftar Kehadiran Guru
                </h2>
                <select
                  aria-label="Hari piket"
                  value={coverDay}
                  onChange={(e) => setCoverDay(e.target.value as DayName)}
                  className="rounded-lg border border-[#D5D9DF] px-2.5 py-1 text-xs font-semibold text-[#111214]"
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {DAY_INDONESIAN[d]}
                    </option>
                  ))}
                </select>
              </div>
              <p className="mt-1 text-xs text-[#565A62]">
                Tandai guru yang izin/absen untuk mencari rekomendasi guru piket pengganti otomatis.
              </p>

              <div className="mt-4 divide-y divide-[#E4E6EA]">
                {state.teachers.map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-2.5">
                    <div className="min-w-0 pr-2">
                      <div className="truncate text-sm font-semibold text-[#111214]">{t.name}</div>
                      <div className="text-[11px] text-[#8A8F98]">
                        {t.subjects.join(', ')} · {t.coverThisWeek} kali piket/mgg
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleToggleAbsent(t.id)}
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                        t.absentToday
                          ? 'bg-[#FEF2F2] text-[#DC2626] ring-1 ring-[#FECACA]'
                          : 'bg-[#ECFDF5] text-[#059669] hover:bg-[#D1FAE5]'
                      }`}
                    >
                      {t.absentToday ? 'Izin / Absen' : 'Hadir'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cover Queue & Ranked Shortlists */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-base font-bold text-[#111214]">
                      Jam Kosong Butuh Guru Piket ({DAY_INDONESIAN[coverDay]})
                    </h2>
                    <p className="mt-0.5 text-xs text-[#565A62]">
                      Kandidat guru piket diurutkan berdasarkan kesesuaian mapel, ketersediaan jam kosong, dan beban piket terendah.
                    </p>
                  </div>
                  <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-bold text-[#4F46E5]">
                    {uncoveredSlotsToday.length} perlu piket
                  </span>
                </div>

                {uncoveredSlotsToday.length === 0 ? (
                  <div className="mt-5 rounded-xl border border-[#A7F3D0] bg-[#ECFDF5] p-5 text-center text-sm font-medium text-[#065F46]">
                    Semua jam pelajaran pada hari {DAY_INDONESIAN[coverDay]} sudah terisi guru. Tidak ada kelas yang terlantar!
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    {uncoveredSlotsToday.map((slot) => {
                      const candidates = rankCoverCandidates(slot, state.teachers, state.slots).slice(
                        0,
                        3
                      );
                      return (
                        <div
                          key={slot.id}
                          className="rounded-xl border border-[#E4E6EA] bg-[#F9FAFB] p-4"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E6EA] pb-3">
                            <div>
                              <span className="text-xs font-bold text-[#DC2626]">
                                {getTeacherName(slot.teacherId)} sedang izin/absen
                              </span>
                              <div className="font-display text-sm font-bold text-[#111214]">
                                Jam ke-{slot.period} ({PERIOD_TIMES[slot.period]}) · {slot.classId} ·{' '}
                                {slot.subject} ({slot.room})
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 space-y-2">
                            {candidates.map((cand) => (
                              <div
                                key={cand.teacher.id}
                                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#E4E6EA] bg-white px-3.5 py-2.5"
                              >
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-[#111214]">
                                      {cand.teacher.name}
                                    </span>
                                    <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[11px] font-bold text-[#4F46E5]">
                                      Kecocokan {cand.score}%
                                    </span>
                                  </div>
                                  <div className="text-xs text-[#565A62]">{cand.reason}</div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAssignCover(slot.id, cand.teacher.id)}
                                  className="rounded-full bg-[#4F46E5] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#4338CA]"
                                >
                                  Tugaskan Piket
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Cover Log History */}
              <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
                <h3 className="font-display text-sm font-bold text-[#111214]">
                  Riwayat Penugasan Guru Piket ({state.coverLogs.length})
                </h3>
                {state.coverLogs.length === 0 ? (
                  <p className="mt-2 text-xs text-[#8A8F98]">
                    Belum ada penugasan guru piket sesi ini. Tugaskan guru piket di atas untuk mencatatnya di sini.
                  </p>
                ) : (
                  <div className="mt-3 divide-y divide-[#E4E6EA] text-xs">
                    {state.coverLogs.map((log) => {
                      const matchedSlot = state.slots.find(
                        (s) =>
                          s.day === log.day &&
                          s.period === log.period &&
                          s.classId === log.classId
                      );
                      return (
                        <div key={log.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                          <div>
                            <span className="font-bold text-[#111214]">
                              {DAY_INDONESIAN[log.day]} Jam ke-{log.period} · {log.classId} ({log.subject})
                            </span>
                            <span className="ml-2 text-[#565A62]">
                              {getTeacherName(log.absentTeacherId)} →{' '}
                              <strong className="text-[#4F46E5]">
                                {getTeacherName(log.coverTeacherId)}
                              </strong>
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[#8A8F98]">{log.assignedAt}</span>
                            {matchedSlot && (
                              <button
                                type="button"
                                onClick={() => handleRemoveCover(matchedSlot.id)}
                                className="font-semibold text-[#DC2626] hover:underline"
                              >
                                Batalkan Penugasan
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= MODULE 3: LEAVE TRACKING ================= */}
        {activeTab === 'leave' && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
                <h2 className="font-display text-base font-bold text-[#111214]">
                  Antrean Persetujuan Izin &amp; Cuti Guru
                </h2>
                <p className="mt-1 text-xs text-[#565A62]">
                  Menyetujui izin akan memotong saldo cuti dan otomatis memasukkan jadwal guru ke antrean guru piket pengganti.
                </p>

                <div className="mt-4 space-y-3">
                  {state.leaveRequests.map((req) => (
                    <div
                      key={req.id}
                      className="flex flex-col justify-between gap-3 rounded-xl border border-[#E4E6EA] p-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#111214]">
                            {getTeacherName(req.teacherId)}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                              req.status === 'Approved'
                                ? 'bg-[#ECFDF5] text-[#059669]'
                                : req.status === 'Rejected'
                                  ? 'bg-[#FEF2F2] text-[#DC2626]'
                                  : 'bg-[#FFFBEB] text-[#B45309]'
                            }`}
                          >
                            {req.status === 'Approved' ? 'Disetujui' : req.status === 'Rejected' ? 'Ditolak' : 'Menunggu Persetujuan'}
                          </span>
                        </div>
                        <div className="mt-1 text-xs text-[#565A62]">
                          {req.type} · {req.date} ({req.duration})
                        </div>
                        <div className="mt-0.5 text-xs text-[#8A8F98]">{req.reason}</div>
                      </div>

                      {req.status === 'Pending' && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleLeaveDecision(req.id, 'Approved')}
                            className="rounded-full bg-[#4F46E5] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#4338CA]"
                          >
                            Setujui
                          </button>
                          <button
                            type="button"
                            onClick={() => handleLeaveDecision(req.id, 'Rejected')}
                            className="rounded-full border border-[#D5D9DF] px-4 py-1.5 text-xs font-semibold text-[#565A62] hover:border-[#111214] hover:text-[#111214]"
                          >
                            Tolak
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Leave Balances */}
              <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
                <h3 className="font-display text-sm font-bold text-[#111214]">
                  Saldo Sisa Cuti Guru (Hari)
                </h3>
                <div className="mt-3 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E4E6EA] text-[#8A8F98]">
                        <th className="py-2">Guru Pengajar</th>
                        <th className="py-2 text-center">Sakit</th>
                        <th className="py-2 text-center">Pribadi</th>
                        <th className="py-2 text-center">Tahunan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E6EA]">
                      {state.teachers.map((t) => (
                        <tr key={t.id}>
                          <td className="py-2.5 font-semibold text-[#111214]">{t.name}</td>
                          <td className="py-2.5 text-center text-[#565A62]">{t.leaveBalance.sick} hari</td>
                          <td className="py-2.5 text-center text-[#565A62]">
                            {t.leaveBalance.personal} hari
                          </td>
                          <td className="py-2.5 text-center text-[#565A62]">
                            {t.leaveBalance.annual} hari
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Submit New Leave Form */}
            <form
              onSubmit={handleSubmitLeave}
              className="h-fit rounded-2xl border border-[#E4E6EA] bg-white p-5 space-y-4"
            >
              <h2 className="font-display text-base font-bold text-[#111214]">
                Ajukan Izin / Cuti Guru
              </h2>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                  Nama Guru
                </label>
                <select
                  value={lvTeacherId}
                  onChange={(e) => setLvTeacherId(e.target.value)}
                  className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                >
                  {state.teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                    Hari Izin
                  </label>
                  <select
                    value={lvDay}
                    onChange={(e) => setLvDay(e.target.value as DayName)}
                    className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {DAY_INDONESIAN[d]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                    Durasi
                  </label>
                  <select
                    value={lvDuration}
                    onChange={(e) => setLvDuration(e.target.value as LeaveRequest['duration'])}
                    className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                  >
                    <option value="Full day">Seharian Penuh</option>
                    <option value="Half day (AM)">Setengah Hari (Pagi)</option>
                    <option value="Half day (PM)">Setengah Hari (Siang)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                  Jenis Izin
                </label>
                <select
                  value={lvType}
                  onChange={(e) => setLvType(e.target.value as LeaveRequest['type'])}
                  className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                >
                  <option value="Sick leave">Izin Sakit</option>
                  <option value="Personal leave">Keperluan Pribadi</option>
                  <option value="Professional dev">Tugas Luar / Diklat</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                  Alasan / Keterangan
                </label>
                <input
                  type="text"
                  value={lvReason}
                  onChange={(e) => setLvReason(e.target.value)}
                  placeholder="Catatan tambahan untuk pimpinan"
                  className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4338CA]"
              >
                Kirim Pengajuan Izin
              </button>
            </form>
          </div>
        )}

        {/* ================= MODULE 4: SCHOOL CALENDAR ================= */}
        {activeTab === 'calendar' && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-base font-bold text-[#111214]">
                  Kalender &amp; Agenda Sekolah
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {(['All', 'Exam', 'Holiday', 'Event', 'Assembly'] as const).map((cat) => {
                    const catLabel = cat === 'All' ? 'Semua' : cat === 'Exam' ? 'Ujian' : cat === 'Holiday' ? 'Libur' : cat === 'Assembly' ? 'Upacara' : 'Acara';
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setEvFilter(cat)}
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          evFilter === cat
                            ? 'bg-[#111214] text-white'
                            : 'bg-[#F5F6F8] text-[#565A62] hover:text-[#111214]'
                        }`}
                      >
                        {catLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {state.calendarEvents
                  .filter((ev) => evFilter === 'All' || ev.category === evFilter)
                  .map((ev) => {
                    const impactedSlots = state.slots.filter(
                      (s) =>
                        s.day === ev.day &&
                        (ev.room === 'All Campus' || s.room === ev.room)
                    ).length;
                    const catLabel = ev.category === 'Exam' ? 'Ujian' : ev.category === 'Holiday' ? 'Libur' : ev.category === 'Assembly' ? 'Upacara' : 'Acara';
                    return (
                      <div
                        key={ev.id}
                        className="flex flex-col justify-between gap-3 rounded-xl border border-[#E4E6EA] p-4 sm:flex-row sm:items-start"
                      >
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[#EEF2FF] px-2.5 py-0.5 text-[11px] font-bold text-[#4F46E5]">
                              {catLabel}
                            </span>
                            <span className="text-xs font-semibold text-[#565A62]">{ev.date}</span>
                            <span className="text-xs text-[#8A8F98]">· {ev.room === 'All Campus' ? 'Seluruh Sekolah' : ev.room}</span>
                          </div>
                          <h3 className="mt-1.5 text-sm font-bold text-[#111214]">{ev.title}</h3>
                          <p className="mt-1 text-xs text-[#565A62]">{ev.notes}</p>
                          <div className="mt-2 text-[11px] font-medium text-[#8A8F98]">
                            Dampak jadwal: {impactedSlots} jam pelajaran terpengaruh pada hari {DAY_INDONESIAN[ev.day]}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(ev.id)}
                          className="self-start text-xs font-semibold text-[#8A8F98] hover:text-[#DC2626]"
                        >
                          Hapus Agenda
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>

            <form
              onSubmit={handleAddEvent}
              className="h-fit rounded-2xl border border-[#E4E6EA] bg-white p-5 space-y-4"
            >
              <h2 className="font-display text-base font-bold text-[#111214]">
                Tambah Agenda / Kegiatan Sekolah
              </h2>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                  Nama Agenda / Kegiatan
                </label>
                <input
                  type="text"
                  required
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  placeholder="Contoh: Penilaian Tengah Semester, Upacara HUT RI"
                  className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                    Hari
                  </label>
                  <select
                    value={evDay}
                    onChange={(e) => setEvDay(e.target.value as DayName)}
                    className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                  >
                    {DAYS.map((d) => (
                      <option key={d} value={d}>
                        {DAY_INDONESIAN[d]}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                    Kategori
                  </label>
                  <select
                    value={evCategory}
                    onChange={(e) => setEvCategory(e.target.value as CalendarEvent['category'])}
                    className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                  >
                    <option value="Event">Acara Sekolah</option>
                    <option value="Exam">Ujian / Evaluasi</option>
                    <option value="Assembly">Upacara / Pertemuan</option>
                    <option value="Holiday">Hari Libur</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                  Lokasi / Ruangan
                </label>
                <select
                  value={evRoom}
                  onChange={(e) => setEvRoom(e.target.value)}
                  className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                >
                  <option value="All Campus">Seluruh Sekolah</option>
                  {state.rooms.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-[#8A8F98]">
                  Catatan / Keterangan
                </label>
                <textarea
                  rows={3}
                  value={evNotes}
                  onChange={(e) => setEvNotes(e.target.value)}
                  placeholder="Keterangan penyesuaian jadwal atau ruangan"
                  className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4338CA]"
              >
                Simpan ke Kalender
              </button>
            </form>
          </div>
        )}

        {/* ================= MODULE 5: STUDENT CHOICE ================= */}
        {activeTab === 'students' && (
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Students List + Add Student */}
            <div className="space-y-5">
              <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
                <h2 className="font-display text-base font-bold text-[#111214]">
                  Siswa &amp; Mapel Pilihan (Peminatan) ({state.students.length})
                </h2>
                <p className="mt-1 text-xs text-[#565A62]">
                  Pilih siswa untuk menentukan mapel pilihan dan melihat jadwal blok mingguan per siswa.
                </p>

                <div className="mt-4 divide-y divide-[#E4E6EA]">
                  {state.students.map((st) => (
                    <div
                      key={st.id}
                      className={`flex w-full items-center justify-between px-3 py-3 transition-colors ${
                        selectedStudent?.id === st.id
                          ? 'rounded-xl bg-[#EEF2FF] text-[#3730A3]'
                          : 'hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedStudentId(st.id)}
                        className="flex-1 text-left"
                      >
                        <div className="text-sm font-bold">{st.name}</div>
                        <div className="text-[11px] text-[#565A62]">{st.grade}</div>
                      </button>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-[#4F46E5] ring-1 ring-[#E4E6EA]">
                          {st.choices.length} mapel pilihan
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteStudent(st.id)}
                          className="text-xs text-[#8A8F98] hover:text-[#DC2626]"
                          title="Hapus siswa"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={handleAddStudent}
                  className="mt-4 flex gap-2 border-t border-[#E4E6EA] pt-4"
                >
                  <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Ketik nama siswa baru..."
                    className="flex-1 rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4338CA]"
                  >
                    + Daftarkan Siswa
                  </button>
                </form>
              </div>

              {/* Add New Course / Elective */}
              <form
                onSubmit={handleAddCourse}
                className="rounded-2xl border border-[#E4E6EA] bg-white p-5 space-y-3"
              >
                <h3 className="font-display text-sm font-bold text-[#111214]">
                  Tambah Kelas Mapel Pilihan Baru
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={newCourseCode}
                    onChange={(e) => setNewCourseCode(e.target.value)}
                    placeholder="Kode (misal: FIS-11)"
                    className="rounded-lg border border-[#D5D9DF] px-2.5 py-1.5 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    placeholder="Nama Mapel Pilihan"
                    className="rounded-lg border border-[#D5D9DF] px-2.5 py-1.5 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newCourseLevel}
                    onChange={(e) =>
                      setNewCourseLevel(e.target.value as 'HL' | 'SL' | 'Elective')
                    }
                    className="rounded-lg border border-[#D5D9DF] px-2.5 py-1.5 text-xs"
                  >
                    <option value="HL">Tingkat Mahir (HL)</option>
                    <option value="SL">Tingkat Dasar (SL)</option>
                    <option value="Elective">Pilihan Bebas (Elective)</option>
                  </select>
                  <select
                    value={newCourseBlock}
                    onChange={(e) =>
                      setNewCourseBlock(e.target.value as 'Block A' | 'Block B' | 'Block C')
                    }
                    className="rounded-lg border border-[#D5D9DF] px-2.5 py-1.5 text-xs"
                  >
                    <option value="Block A">Blok A</option>
                    <option value="Block B">Blok B</option>
                    <option value="Block C">Blok C</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newCourseTeacherId}
                    onChange={(e) => setNewCourseTeacherId(e.target.value)}
                    className="rounded-lg border border-[#D5D9DF] px-2.5 py-1.5 text-xs"
                  >
                    {state.teachers.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={newCourseRoom}
                    onChange={(e) => setNewCourseRoom(e.target.value)}
                    className="rounded-lg border border-[#D5D9DF] px-2.5 py-1.5 text-xs"
                  >
                    {state.rooms.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#111214] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2A2C31]"
                >
                  + Buat Kelas Pilihan
                </button>
              </form>
            </div>

            {/* Individual Schedule & Section Enrollment */}
            <div className="space-y-5">
              {selectedStudent && (
                <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="font-display text-base font-bold text-[#111214]">
                        {selectedStudent.name} — Mapel Pilihan &amp; Jadwal Siswa
                      </h2>
                      <p className="mt-0.5 text-xs text-[#565A62]">
                        Klik tombol untuk menambah atau membatalkan pilihan mapel siswa.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {state.courses.map((course) => {
                      const enrolled = course.enrolledStudentIds.includes(selectedStudent.id);
                      return (
                        <div
                          key={course.id}
                          className={`relative rounded-xl border p-3.5 text-left transition-all ${
                            enrolled
                              ? 'border-[#4F46E5] bg-[#EEF2FF]/60'
                              : 'border-[#E4E6EA] bg-white hover:border-[#111214]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#4F46E5]">
                              {course.code} · {course.block}
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#565A62] ring-1 ring-[#E4E6EA]">
                                {course.level}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeleteCourse(course.id)}
                                className="text-[10px] text-[#8A8F98] hover:text-[#DC2626]"
                                title="Hapus mapel pilihan"
                              >
                                ✕
                              </button>
                            </div>
                          </div>
                          <div className="mt-1 text-sm font-bold text-[#111214]">{course.name}</div>
                          <div className="mt-1 flex items-center justify-between text-[11px] text-[#565A62]">
                            <span>
                              {getTeacherName(course.teacherId)} · {course.room}
                            </span>
                            <span className="font-semibold">
                              {course.enrolledStudentIds.length}/{course.maxSeats} kuota
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleToggleStudentCourse(selectedStudent.id, course.id)}
                            className={`mt-2.5 w-full rounded-md py-1 text-xs font-semibold ${
                              enrolled
                                ? 'bg-[#4F46E5] text-white'
                                : 'border border-[#D5D9DF] bg-white text-[#111214] hover:bg-gray-50'
                            }`}
                          >
                            {enrolled ? 'Terdaftar ✓' : '+ Pilih Mapel Ini'}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Personal Block Summary */}
                  <div className="mt-5 border-t border-[#E4E6EA] pt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]">
                      Ringkasan Jadwal Blok untuk {selectedStudent.name}
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {(['Block A', 'Block B', 'Block C'] as const).map((blk) => {
                        const chosen = state.courses.filter(
                          (c) =>
                            c.block === blk && c.enrolledStudentIds.includes(selectedStudent.id)
                        );
                        return (
                          <div
                            key={blk}
                            className={`rounded-xl border p-3 ${
                              chosen.length > 1
                                ? 'border-[#FECACA] bg-[#FEF2F2]'
                                : 'border-[#E4E6EA] bg-[#F9FAFB]'
                            }`}
                          >
                            <div className="text-xs font-bold text-[#111214]">{blk}</div>
                            {chosen.length === 0 ? (
                              <div className="mt-1 text-xs text-[#8A8F98]">Jam Belajar Mandiri (Kosong)</div>
                            ) : (
                              chosen.map((c) => (
                                <div key={c.id} className="mt-1.5 text-xs">
                                  <div className="font-semibold text-[#4F46E5]">{c.name}</div>
                                  <div className="text-[11px] text-[#565A62]">
                                    {c.room} · {getTeacherName(c.teacherId)}
                                  </div>
                                </div>
                              ))
                            )}
                            {chosen.length > 1 && (
                              <div className="mt-1.5 text-[10px] font-bold text-[#DC2626]">
                                Bentrok blok — batalkan 1 mapel di {blk}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= MODULE 6: AI SCHEDULING AGENT ================= */}
        {activeTab === 'ai-agent' && (
          <div className="mx-auto max-w-3xl rounded-2xl border border-[#E4E6EA] bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-[#E4E6EA] pb-4">
              <div>
                <h2 className="font-display text-base font-bold text-[#111214]">
                  Asisten AI Jadwal Sekolah
                </h2>
                <p className="mt-0.5 text-xs text-[#565A62]">
                  Terhubung langsung dengan jadwal, antrean guru piket, dan beban mengajar guru.
                </p>
              </div>
              <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-bold text-[#4F46E5]">
                Status Data Aktif &amp; Terhubung
              </span>
            </div>

            {/* Quick Prompts */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'Cek bentrok jadwal',
                'Siapa guru yang absen hari ini?',
                'Beban mengajar guru',
                'Ada pengajuan cuti?',
                'Generate jadwal baru',
              ].map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => handleSendAgent(q)}
                  className="rounded-full border border-[#DDE0E5] bg-[#F9FAFB] px-3.5 py-1.5 text-xs font-semibold text-[#3A3D44] transition-colors hover:border-[#4F46E5] hover:text-[#4F46E5]"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Conversation */}
            <div className="mt-4 max-h-[420px] space-y-3 overflow-y-auto pr-1">
              {state.agentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-[#4F46E5] text-white'
                        : 'border border-[#E4E6EA] bg-[#F9FAFB] text-[#111214]'
                    }`}
                  >
                    <div>{msg.text}</div>
                    {msg.actionLabel && msg.actionType && (
                      <button
                        type="button"
                        onClick={() => handleAgentAction(msg.actionType!)}
                        className="mt-3 inline-flex items-center rounded-full bg-[#111214] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#2A2C31]"
                      >
                        {msg.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendAgent();
              }}
              className="mt-4 flex gap-2 border-t border-[#E4E6EA] pt-4"
            >
              <input
                type="text"
                value={agentInput}
                onChange={(e) => setAgentInput(e.target.value)}
                placeholder="Tanyakan ke asisten AI (misal: cek bentrok, siapa yang izin, dll)..."
                className="flex-1 rounded-full border border-[#D5D9DF] px-4 py-2.5 text-sm focus:border-[#4F46E5] focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#4338CA]"
              >
                Kirim
              </button>
            </form>
          </div>
        )}

        {/* ================= MODULE 7: STAFF & SETUP ================= */}
        {activeTab === 'setup' && (
          <div className="grid gap-6 md:grid-cols-2">
            {/* School Profile Bar */}
            <div className="md:col-span-2 rounded-2xl border border-[#E4E6EA] bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#8A8F98]">
                  Identitas Sekolah Anda
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-xl font-extrabold text-[#111214]">{state.schoolName}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setTempSchoolName(state.schoolName);
                      setEditingSchoolName(true);
                    }}
                    className="rounded-md border border-[#D5D9DF] bg-white px-2 py-0.5 text-xs font-semibold text-[#4F46E5] hover:bg-gray-50"
                  >
                    ✎ Ubah Nama
                  </button>
                </div>
                <p className="mt-1 text-xs text-[#565A62]">
                  {state.classes.length} Rombel/Kelas · {state.teachers.length} Guru Pengajar · {state.rooms.length} Ruangan Terdaftar
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenBulkImport('teachers')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5D9DF] bg-white px-3.5 py-2 text-xs font-semibold text-[#111214] shadow-xs hover:border-[#111214] hover:bg-gray-50"
                >
                  <span>📥</span>
                  <span>Impor Massal (CSV / Excel)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setScratchModalOpen(true)}
                  className="rounded-lg border border-[#C7D2FE] bg-[#EEF2FF] px-4 py-2 text-xs font-bold text-[#4F46E5] transition-colors hover:bg-[#E0E7FF]"
                >
                  ✨ Setup Cepat dari Nol
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-base font-bold text-[#111214]">
                  Daftar Guru Pengajar ({state.teachers.length})
                </h2>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenBulkImport('teachers')}
                    className="inline-flex items-center gap-1 rounded-md border border-[#D5D9DF] bg-white px-2.5 py-1 text-xs font-semibold text-[#4F46E5] hover:bg-[#EEF2FF]"
                  >
                    <span>📥</span>
                    <span>Impor Guru CSV</span>
                  </button>
                </div>
              </div>
              <form onSubmit={handleAddTeacher} className="mt-4 flex flex-wrap gap-2">
                <input
                  type="text"
                  required
                  value={newTeacherName}
                  onChange={(e) => setNewTeacherName(e.target.value)}
                  placeholder="Nama Lengkap Guru"
                  className="flex-1 min-w-[140px] rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm text-[#111214] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none"
                />
                <div className="relative flex-1 min-w-[150px]">
                  <input
                    type="text"
                    required
                    list="subject-presets"
                    value={newTeacherSubject}
                    onChange={(e) => setNewTeacherSubject(e.target.value)}
                    placeholder="Mata Pelajaran (misal: PJOK)"
                    className="w-full rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm text-[#111214] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none"
                  />
                  <datalist id="subject-presets">
                    {Object.keys(SUBJECT_COLORS).map((s) => (
                      <option key={s} value={s} />
                    ))}
                  </datalist>
                </div>
                <button
                  type="submit"
                  className="rounded-full bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4338CA]"
                >
                  + Tambah Guru
                </button>
              </form>
              <p className="mt-1.5 text-[11px] text-[#8A8F98]">
                Bisa ketik mapel apa saja (Matematika, IPA, PJOK, Fisika, dll). Pisahkan koma jika mengajar lebih dari 1 mapel.
              </p>

              <div className="mt-4 divide-y divide-[#E4E6EA] text-sm max-h-[420px] overflow-y-auto pr-1">
                {state.teachers.map((t) => {
                  const load = state.slots.filter(
                    (s) => (s.coverTeacherId || s.teacherId) === t.id
                  ).length;
                  return (
                    <div key={t.id} className="flex items-center justify-between py-2.5">
                      <div>
                        <div className="font-semibold text-[#111214]">{t.name}</div>
                        <div className="text-xs text-[#8A8F98]">{t.subjects.join(', ')}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#F5F6F8] px-2.5 py-0.5 text-xs font-semibold text-[#3A3D44]">
                          {load}/{t.maxWeeklyPeriods} jam/mgg
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteTeacher(t.id)}
                          className="text-xs text-[#8A8F98] hover:text-[#DC2626]"
                          title="Hapus guru"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              {/* Classes */}
              <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-base font-bold text-[#111214]">
                    Daftar Kelas / Rombel ({state.classes.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleOpenBulkImport('classes')}
                    className="inline-flex items-center gap-1 rounded-md border border-[#D5D9DF] bg-white px-2.5 py-1 text-xs font-semibold text-[#4F46E5] hover:bg-[#EEF2FF]"
                  >
                    <span>📥</span>
                    <span>Impor Kelas CSV</span>
                  </button>
                </div>
                <form onSubmit={handleAddClass} className="mt-4 flex gap-2">
                  <input
                    type="text"
                    required
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    placeholder="Contoh: Kelas 10-A, Kelas 10-B, Kelas 11-A..."
                    className="flex-1 rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm text-[#111214] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4338CA]"
                  >
                    + Tambah Kelas
                  </button>
                </form>
                <p className="mt-1.5 text-[11px] text-[#8A8F98]">
                  Tip: Anda bisa ketik 1 kelas atau langsung mem-paste banyak kelas sekaligus dipisahkan koma.
                </p>

                <div className="mt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]">
                    Kelas yang Terdaftar
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {state.classes.map((c) => (
                      <div
                        key={c}
                        className="inline-flex items-center rounded-full border border-[#DDE0E5] bg-[#F9FAFB] pl-3 pr-2 py-1 text-xs font-semibold text-[#111214]"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedClass(c);
                            setViewMode('class');
                            setActiveTab('timetable');
                          }}
                          className="hover:text-[#4F46E5]"
                        >
                          {c} →
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClass(c)}
                          className="ml-1.5 text-[#8A8F98] hover:text-[#DC2626]"
                          title="Hapus kelas"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Campus Rooms */}
              <div className="rounded-2xl border border-[#E4E6EA] bg-white p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-base font-bold text-[#111214]">
                    Daftar Ruang Kelas &amp; Lab ({state.rooms.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleOpenBulkImport('rooms')}
                    className="inline-flex items-center gap-1 rounded-md border border-[#D5D9DF] bg-white px-2.5 py-1 text-xs font-semibold text-[#4F46E5] hover:bg-[#EEF2FF]"
                  >
                    <span>📥</span>
                    <span>Impor Ruang CSV</span>
                  </button>
                </div>
                <form onSubmit={handleAddRoom} className="mt-4 flex gap-2">
                  <input
                    type="text"
                    required
                    value={newRoomName}
                    onChange={(e) => setNewRoomName(e.target.value)}
                    placeholder="Ruangan baru (contoh: Lab C, Ruang Tari, Lab IPA)"
                    className="flex-1 rounded-lg border border-[#D5D9DF] px-3 py-2 text-sm"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4338CA]"
                  >
                    + Tambah Ruang
                  </button>
                </form>

                <div className="mt-4">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8A8F98]">
                    Ruangan yang Tersedia
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {state.rooms.map((r) => (
                      <div
                        key={r}
                        className="inline-flex items-center rounded-lg border border-[#E4E6EA] bg-white pl-3 pr-2 py-1 text-xs font-medium text-[#565A62]"
                      >
                        <span>{r}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteRoom(r)}
                          className="ml-1.5 text-[#8A8F98] hover:text-[#DC2626]"
                          title="Hapus ruangan"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Start From Scratch Modal */}
      {scratchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#111214]">Mulai Buat Jadwal dari Nol</h3>
              <button
                type="button"
                onClick={() => setScratchModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-xs text-[#565A62]">
              Pilih cara Anda ingin memulai jadwal sekolah:
            </p>

            <div className="mt-4 space-y-3">
              {/* Option 1: Kosongkan Jadwal saja */}
              <div className="rounded-xl border border-[#E4E6EA] p-4 transition-colors hover:border-[#4F46E5] hover:bg-[#F9FAFB]">
                <h4 className="text-sm font-bold text-[#111214]">1. Kosongkan Slot Jadwal Saja</h4>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Pertahankan nama sekolah, daftar guru, dan kelas yang sudah ada, namun kosongkan semua 75 slot jadwal agar Anda bisa menyusun manual dari kotak kosong (Free).
                </p>
                <button
                  type="button"
                  onClick={handleClearAllSlots}
                  className="mt-3 rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-semibold text-[#111214] hover:bg-gray-50"
                >
                  Kosongkan Semua Slot Jadwal
                </button>
              </div>

              {/* Option 2: Setup Sekolah Baru */}
              <div className="rounded-xl border border-[#C7D2FE] bg-[#EEF2FF]/40 p-4">
                <h4 className="text-sm font-bold text-[#4338CA]">2. Setup Sekolah Baru dari Awal</h4>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Ganti nama sekolah Anda dan tentukan nama kelas awal Anda.
                </p>
                <div className="mt-3 space-y-2.5">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                      Nama Sekolah
                    </label>
                    <input
                      type="text"
                      value={scratchSchoolName}
                      onChange={(e) => setScratchSchoolName(e.target.value)}
                      placeholder="Contoh: SMA Negeri 1 Jakarta"
                      className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-[#111214] focus:border-[#4F46E5] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                      Daftar Kelas (pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      value={scratchClassNames}
                      onChange={(e) => setScratchClassNames(e.target.value)}
                      placeholder="Contoh: Kelas 10-A, Kelas 10-B, Kelas 11-A"
                      className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs text-[#111214] focus:border-[#4F46E5] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={handleStartFreshSchool}
                    className="rounded-lg bg-[#4F46E5] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#4338CA]"
                  >
                    Mulai Sekolah Baru Sekarang
                  </button>
                  <button
                    type="button"
                    onClick={() => setScratchModalOpen(false)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Batal
                  </button>
                </div>
              </div>

              {/* Option 3: Muat Ulang Contoh Data Demo */}
              <div className="rounded-xl border border-[#E4E6EA] p-4 transition-colors hover:border-[#4F46E5] hover:bg-[#F9FAFB]">
                <h4 className="text-sm font-bold text-[#111214]">3. Muat Ulang Data Contoh Demo</h4>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Kembalikan data sekolah, daftar 8 guru, dan jadwal 3 rombel awal untuk latihan atau demonstrasi.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleResetDemo();
                    setScratchModalOpen(false);
                  }}
                  className="mt-3 rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-semibold text-[#111214] hover:bg-gray-50"
                >
                  Muat Ulang Contoh Data Demo
                </button>
              </div>

              {/* Option 4: Impor Massal dari File Excel / CSV */}
              <div className="rounded-xl border border-[#C7D2FE] bg-[#EEF2FF]/40 p-4 transition-colors hover:border-[#4F46E5]">
                <h4 className="text-sm font-bold text-[#4338CA]">4. Impor Data dari File Excel / CSV</h4>
                <p className="mt-1 text-xs text-[#6B7280]">
                  Punya daftar guru, rombel kelas, atau jadwal sekolah di Microsoft Excel? Salin-tempel atau unggah file CSV untuk impor otomatis dalam hitungan detik.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setScratchModalOpen(false);
                    handleOpenBulkImport('teachers');
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#4338CA]"
                >
                  <span>📥</span>
                  <span>Buka Importer Massal (Excel / CSV)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Video Tutorial Modal */}
      {tutorialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E4E6EA] px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF3C7] text-lg">
                  🎬
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#111214]">
                    Video Tutorial & Panduan Penggunaan TimetableMaster
                  </h3>
                  <p className="text-xs text-[#565A62]">
                    Pelajari cara input data guru, jadwal otomatis AI, guru piket, dan ekspor data dalam 1 menit.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTutorialModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Native Video Player */}
              <div className="overflow-hidden rounded-xl border border-[#E4E6EA] bg-black shadow-inner">
                <video
                  controls
                  autoPlay
                  preload="metadata"
                  className="aspect-video w-full"
                  src="/tutorial_video.mp4"
                  poster="/images/showcases/hero-animation-poster.jpg"
                >
                  Browser Anda tidak mendukung pemutar video HTML5.
                </video>
              </div>

              {/* Action Toolbar */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#E4E6EA] bg-[#F9FAFB] p-3">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href="/video_tutorial.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#4F46E5] px-3.5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#4338CA]"
                  >
                    <span>🎙️ Buka Pemutar Interaktif (Narasi Suara & Subtitle)</span>
                  </a>
                  <a
                    href="/tutorial_video.mp4"
                    download="Tutorial_TimetableMaster_HD.mp4"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#D5D9DF] bg-white px-3.5 py-2 text-xs font-bold text-[#111214] shadow-sm transition hover:bg-gray-50"
                  >
                    <span>⬇️ Unduh Video MP4 (1080p)</span>
                  </a>
                </div>
                <span className="text-[11px] font-medium text-[#8A8F98]">
                  Resolusi Full HD 1920x1080 · Bahasa Indonesia
                </span>
              </div>

              {/* Step-by-Step Chapters List */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A8F98]">
                  Ringkasan 8 Langkah Panduan Praktis:
                </h4>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#E4E6EA] bg-white p-3 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111214]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4F46E5]">1</span>
                      <span>Input Data Guru, Mapel & Rombel</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#565A62]">
                      Buka tab <strong>Data Guru & Sekolah</strong>. Tambahkan guru pengajar, mata pelajaran yang diampu, kelas, serta ruangan laboratorium.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E6EA] bg-white p-3 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111214]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4F46E5]">2</span>
                      <span>Generate Jadwal Otomatis AI</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#565A62]">
                      Klik tombol <strong>⚡ Generate Jadwal AI</strong>. Algoritma lokal otomatis menyusun jadwal mingguan tanpa bentrok ruangan atau guru ganda.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E6EA] bg-white p-3 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111214]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4F46E5]">3</span>
                      <span>Edit, Tukar & Kunci Jam Pelajaran</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#565A62]">
                      Klik sembarang slot di tabel untuk membuka <strong>Slot Inspector</strong>. Anda bisa mengunci slot agar tidak berubah saat digenerate ulang.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E6EA] bg-white p-3 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111214]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4F46E5]">4</span>
                      <span>Manajemen Guru Piket & Pengganti</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#565A62]">
                      Buka tab <strong>Guru Piket & Pengganti</strong>. Jika guru berhalangan, sistem otomatis merekomendasikan guru pengganti yang sedang kosong.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E6EA] bg-white p-3 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111214]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4F46E5]">5</span>
                      <span>Pengajuan & Persetujuan Cuti Guru</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#565A62]">
                      Kelola izin sakit atau cuti dinas di tab <strong>Izin & Cuti Guru</strong>. Begitu disetujui, kuota cuti berkurang dan jam kelas otomatis butuh guru pengganti.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E6EA] bg-white p-3 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111214]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4F46E5]">6</span>
                      <span>Kalender Sekolah & Asisten AI</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#565A62]">
                      Catat ujian semester atau rapat dinas di <strong>Kalender Sekolah</strong>. Tanya apa saja atau minta rekomendasi di <strong>Asisten AI Jadwal</strong>.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E6EA] bg-white p-3 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111214]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4F46E5]">7</span>
                      <span>Ekspor CSV & Cetak PDF Jadwal</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#565A62]">
                      Unduh CSV per kelas, CSV master semua kelas, atau klik <strong>🖨️ Cetak PDF</strong> untuk mencetak jadwal bersih siap pasang di dinding kelas.
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#E4E6EA] bg-white p-3 shadow-xs">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#111214]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4F46E5]">8</span>
                      <span>Simpan Cadangan & Pulihkan (Backup)</span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#565A62]">
                      Gunakan tombol <strong>Simpan Cadangan JSON</strong> untuk mengamankan file jadwal sekolah ke laptop Anda dan buka kembali kapan saja.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end border-t border-[#E4E6EA] bg-[#F9FAFB] px-6 py-3">
              <button
                type="button"
                onClick={() => setTutorialModalOpen(false)}
                className="rounded-lg bg-[#111214] px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2A2C31]"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk CSV & Excel Import Modal */}
      {bulkImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E4E6EA] px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EEF2FF] text-lg text-[#4F46E5]">
                  📥
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#111214]">
                    Impor Data Massal (Excel / CSV / Google Sheets)
                  </h3>
                  <p className="text-xs text-[#565A62]">
                    Unggah file CSV atau salin-tempel (copy-paste) tabel langsung dari Microsoft Excel.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setBulkImportModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-[#E4E6EA] bg-[#F9FAFB] px-6">
              {[
                { id: 'teachers', label: '👨‍🏫 Guru & Mapel', count: previewTeachers.length },
                { id: 'classes', label: '🏫 Rombel Kelas', count: previewClasses.length },
                { id: 'rooms', label: '🏢 Ruangan / Lab', count: previewRooms.length },
                { id: 'slots', label: '📅 Jadwal Pelajaran', count: previewSlots.length },
              ].map((tab) => {
                const active = importTargetTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setImportTargetTab(tab.id as any);
                    }}
                    className={`relative py-3 px-4 text-xs font-semibold transition-colors ${
                      active
                        ? 'border-b-2 border-[#4F46E5] text-[#4F46E5] bg-white'
                        : 'text-[#565A62] hover:text-[#111214]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {importText.trim().length > 0 && tab.count > 0 && (
                      <span className="ml-1.5 rounded-full bg-[#EEF2FF] px-1.5 py-0.5 text-[10px] font-bold text-[#4F46E5]">
                        {tab.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Instructions & Template Download Bar */}
              <div className="flex flex-col gap-2 rounded-xl border border-[#E4E6EA] bg-[#FBFBFC] p-3.5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs font-bold text-[#111214]">
                    {importTargetTab === 'teachers' && 'Format Kolom: Nama Guru; Mata Pelajaran; Beban Jam'}
                    {importTargetTab === 'classes' && 'Format Kolom: Nama Kelas; Tingkat; Wali Kelas (atau 1 per baris)'}
                    {importTargetTab === 'rooms' && 'Format Kolom: Nama Ruangan; Tipe Ruangan; Kapasitas'}
                    {importTargetTab === 'slots' && 'Format Kolom: Kelas; Hari; Jam Ke (1-5); Mapel; Guru; Ruangan'}
                  </div>
                  <div className="text-[11px] text-[#565A62]">
                    Menggunakan titik koma (;) standar Excel Indonesia agar langsung terpisah per cell (juga mendukung koma & tab).
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadTemplate(importTargetTab)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-semibold text-[#111214] shadow-xs hover:bg-gray-50"
                  >
                    <span>⬇️</span>
                    <span>Unduh Template Excel (;)</span>
                  </button>
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#D5D9DF] bg-white px-3 py-1.5 text-xs font-semibold text-[#111214] shadow-xs hover:bg-gray-50">
                    <span>📂</span>
                    <span>Pilih File CSV</span>
                    <input
                      ref={importFileRef}
                      type="file"
                      accept=".csv,.txt,.tsv"
                      onChange={handleImportFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Textarea for Direct Paste */}
              <div>
                <label className="block text-xs font-bold text-[#111214] mb-1">
                  Tempelkan (Paste) Teks dari Excel / CSV:
                </label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  rows={6}
                  placeholder={
                    importTargetTab === 'teachers'
                      ? 'Contoh:\nBudi Santoso; Matematika, Fisika; 24\nSiti Aminah; Bahasa Indonesia; 20\nAhmad Fauzi; Bahasa Inggris; 22\nDewi Lestari; Kimia, IPA; 18'
                      : importTargetTab === 'classes'
                        ? 'Contoh:\nKelas 10-A; 10; Budi Santoso\nKelas 10-B; 10; Siti Aminah\nKelas 10-C; 10; Ahmad Fauzi\nKelas 11-IPA-1; 11; Dewi Lestari'
                        : importTargetTab === 'rooms'
                          ? 'Contoh:\nLab Komputer A; Lab Komputer; 40\nLab IPA Terpadu; Lab Sains; 36\nRuang Teori 101; Kelas; 36\nLapangan Olahraga; Luar; 80'
                          : 'Contoh:\nKelas 10-A; SENIN; 1; Matematika; Budi Santoso; Ruang Teori 101\nKelas 10-A; SENIN; 2; Matematika; Budi Santoso; Ruang Teori 101'
                  }
                  className="w-full rounded-xl border border-[#D5D9DF] bg-white p-3 font-mono text-xs text-[#111214] placeholder:text-[#9CA3AF] focus:border-[#4F46E5] focus:outline-none"
                />
              </div>

              {/* Live Preview of Parsed Rows */}
              {importText.trim().length > 0 && (
                <div className="rounded-xl border border-[#E4E6EA] bg-[#F9FAFB] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#111214]">
                      {importTargetTab === 'teachers' && (
                        previewTeachers.length > 0
                          ? `✅ Terdeteksi ${previewTeachers.length} Guru Valid`
                          : '⚠️ Tidak ada guru valid yang terdeteksi. Periksa format!'
                      )}
                      {importTargetTab === 'classes' && (
                        previewClasses.length > 0
                          ? `✅ Terdeteksi ${previewClasses.length} Rombel Kelas Valid`
                          : '⚠️ Tidak ada rombel valid yang terdeteksi.'
                      )}
                      {importTargetTab === 'rooms' && (
                        previewRooms.length > 0
                          ? `✅ Terdeteksi ${previewRooms.length} Ruangan Valid`
                          : '⚠️ Tidak ada ruangan valid yang terdeteksi.'
                      )}
                      {importTargetTab === 'slots' && (
                        previewSlots.length > 0
                          ? `✅ Terdeteksi ${previewSlots.length} Jam Pelajaran Valid`
                          : '⚠️ Tidak ada jam jadwal valid yang terdeteksi.'
                      )}
                    </span>
                    <span className="text-[11px] text-[#8A8F98]">
                      Pratinjau 4 Baris Pertama
                    </span>
                  </div>

                  {/* Preview Table */}
                  <div className="mt-2.5 overflow-x-auto rounded-lg border border-[#E4E6EA] bg-white">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F5F6F8] text-[#565A62] font-semibold border-b border-[#E4E6EA]">
                        {importTargetTab === 'teachers' && (
                          <tr>
                            <th className="px-3 py-2">Nama Guru</th>
                            <th className="px-3 py-2">Mata Pelajaran</th>
                            <th className="px-3 py-2 text-right">Beban/Mgg</th>
                          </tr>
                        )}
                        {importTargetTab === 'classes' && (
                          <tr>
                            <th className="px-3 py-2">Nama Rombel / Kelas</th>
                          </tr>
                        )}
                        {importTargetTab === 'rooms' && (
                          <tr>
                            <th className="px-3 py-2">Nama Ruangan / Lab</th>
                          </tr>
                        )}
                        {importTargetTab === 'slots' && (
                          <tr>
                            <th className="px-3 py-2">Kelas</th>
                            <th className="px-3 py-2">Hari</th>
                            <th className="px-3 py-2">Jam</th>
                            <th className="px-3 py-2">Mata Pelajaran</th>
                            <th className="px-3 py-2">Guru</th>
                            <th className="px-3 py-2">Ruang</th>
                          </tr>
                        )}
                      </thead>
                      <tbody className="divide-y divide-[#E4E6EA]">
                        {importTargetTab === 'teachers' &&
                          previewTeachers.slice(0, 4).map((t, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-3 py-2 font-medium text-[#111214]">{t.name}</td>
                              <td className="px-3 py-2 text-[#565A62]">{t.subjects.join(', ')}</td>
                              <td className="px-3 py-2 text-right text-[#565A62]">{t.maxWeeklyPeriods} jam</td>
                            </tr>
                          ))}
                        {importTargetTab === 'classes' &&
                          previewClasses.slice(0, 4).map((c, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-3 py-2 font-medium text-[#111214]">{c}</td>
                            </tr>
                          ))}
                        {importTargetTab === 'rooms' &&
                          previewRooms.slice(0, 4).map((r, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-3 py-2 font-medium text-[#111214]">{r}</td>
                            </tr>
                          ))}
                        {importTargetTab === 'slots' &&
                          previewSlots.slice(0, 4).map((s, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-3 py-2 font-medium text-[#111214]">{s.classId}</td>
                              <td className="px-3 py-2 text-[#565A62]">{s.day}</td>
                              <td className="px-3 py-2 text-[#565A62]">Jam ke-{s.period}</td>
                              <td className="px-3 py-2 font-semibold text-[#4F46E5]">{s.subject}</td>
                              <td className="px-3 py-2 text-[#565A62]">{s.teacherName}</td>
                              <td className="px-3 py-2 text-[#8A8F98]">{s.room}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Import Mode Options */}
              <div className="flex flex-wrap items-center gap-6 rounded-xl border border-[#E4E6EA] p-3 text-xs">
                <span className="font-bold text-[#111214]">Metode Impor:</span>
                <label className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-[#3A3D44]">
                  <input
                    type="radio"
                    name="importMode"
                    value="append"
                    checked={importMode === 'append'}
                    onChange={() => setImportMode('append')}
                    className="accent-[#4F46E5]"
                  />
                  <span>Tambahkan ke data saat ini (Append)</span>
                </label>
                <label className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-[#3A3D44]">
                  <input
                    type="radio"
                    name="importMode"
                    value="replace"
                    checked={importMode === 'replace'}
                    onChange={() => setImportMode('replace')}
                    className="accent-[#4F46E5]"
                  />
                  <span>Gantikan seluruh data ini (Replace)</span>
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-[#E4E6EA] bg-[#F9FAFB] px-6 py-3">
              <button
                type="button"
                onClick={() => setBulkImportModalOpen(false)}
                className="rounded-lg border border-[#D5D9DF] bg-white px-4 py-2 text-xs font-semibold text-[#565A62] hover:bg-gray-50"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleExecuteImport}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#4338CA]"
              >
                <span>📥</span>
                <span>
                  Impor Sekarang (
                  {importTargetTab === 'teachers'
                    ? `${previewTeachers.length} Guru`
                    : importTargetTab === 'classes'
                      ? `${previewClasses.length} Rombel`
                      : importTargetTab === 'rooms'
                        ? `${previewRooms.length} Ruangan`
                        : `${previewSlots.length} Jam`}
                  )
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
