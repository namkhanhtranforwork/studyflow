export interface DailyStudy {
  date: string;
  label: string;
  minutes: number;
}

export interface StudyLog {
  id: string;
  date: string;
  minutes: number;
  note: string;
}

export interface DashboardTask {
  id: string;
  title: string;
  dueDate: string | null;
  goalId: string;
  completed: boolean;
}

export interface DashboardGoal {
  id: string;
  title: string;
  completedTasks: number;
  totalTasks: number;
  status: "active" | "completed" | "archived";
}

export interface DashboardData {
  today: string;
  weeklyStudy: DailyStudy[];
  studyLogs: StudyLog[];
  tasks: DashboardTask[];
  goals: DashboardGoal[];
}

export function getTodayDateKey(
  now = new Date(),
  timeZone = "Asia/Ho_Chi_Minh",
): string {
  const dateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = dateFormatter.formatToParts(now);
  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  if (!year || !month || !day) {
    throw new Error("Không thể xác định ngày hiện tại.");
  }

  return `${year}-${month}-${day}`;
}

export function shiftDateKey(dateKey: string, offset: number): string {
  const [year, month, day] = dateKey.split("-").map(Number);

  if (!year || !month || !day || !Number.isInteger(offset)) {
    throw new Error("Ngày hoặc khoảng dịch chuyển không hợp lệ.");
  }

  const shifted = new Date(Date.UTC(year, month - 1, day + offset, 12));
  return [
    shifted.getUTCFullYear(),
    String(shifted.getUTCMonth() + 1).padStart(2, "0"),
    String(shifted.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function getWeekdayLabel(dateKey: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function createSampleDashboardData(today: string): DashboardData {
  const studyByDay = new Map<number, number>([
    [0, 45],
    [1, 35],
    [2, 55],
    [4, 50],
    [6, 60],
  ]);

  const weeklyStudy = Array.from({ length: 7 }, (_, index) => {
    const offset = index - 6;
    const date = shiftDateKey(today, offset);

    return {
      date,
      label: getWeekdayLabel(date),
      minutes: studyByDay.get(Math.abs(offset)) ?? 0,
    };
  });

  const goals: DashboardGoal[] = [
    {
      id: "goal-react",
      title: "Hoàn thành khóa React nâng cao",
      completedTasks: 6,
      totalTasks: 10,
      status: "active",
    },
    {
      id: "goal-english",
      title: "Luyện tiếng Anh mỗi ngày",
      completedTasks: 2,
      totalTasks: 5,
      status: "active",
    },
  ];

  const tasks: DashboardTask[] = [
    {
      id: "task-overdue",
      title: "Ôn lại component và props",
      dueDate: shiftDateKey(today, -2),
      goalId: "goal-react",
      completed: false,
    },
    {
      id: "task-today",
      title: "Hoàn thành bài tập về hooks",
      dueDate: today,
      goalId: "goal-react",
      completed: false,
    },
    {
      id: "task-english",
      title: "Học 15 từ vựng mới",
      dueDate: today,
      goalId: "goal-english",
      completed: true,
    },
    {
      id: "task-tomorrow",
      title: "Đọc tài liệu về useEffect",
      dueDate: shiftDateKey(today, 1),
      goalId: "goal-react",
      completed: false,
    },
    {
      id: "task-later",
      title: "Luyện nghe tiếng Anh 20 phút",
      dueDate: shiftDateKey(today, 2),
      goalId: "goal-english",
      completed: false,
    },
  ];

  const studyLogs: StudyLog[] = [
    {
      id: "log-today",
      date: today,
      minutes: 45,
      note: "Ôn lại kiến thức React",
    },
    {
      id: "log-yesterday",
      date: shiftDateKey(today, -1),
      minutes: 35,
      note: "Đọc tài liệu về hooks",
    },
    {
      id: "log-two-days-ago",
      date: shiftDateKey(today, -2),
      minutes: 55,
      note: "Luyện nghe tiếng Anh",
    },
    {
      id: "log-four-days-ago",
      date: shiftDateKey(today, -4),
      minutes: 50,
      note: "Làm bài tập lập trình",
    },
    {
      id: "log-six-days-ago",
      date: shiftDateKey(today, -6),
      minutes: 60,
      note: "Học JavaScript nâng cao",
    },
  ];

  return { today, weeklyStudy, studyLogs, tasks, goals };
}
