import { useState } from 'react';
import { LayoutDashboard, CheckSquare, Activity, Timer, FileText, Check } from 'lucide-react';
import './DashboardMockup.css';

const INITIAL_HEATMAP_CELLS = [
  { day: 1, level: 1, hours: '3.5h', tasks: 4 },
  { day: 2, level: 2, hours: '5.0h', tasks: 6 },
  { day: 3, level: 3, hours: '7.5h', tasks: 9 },
  { day: 4, level: 2, hours: '4.5h', tasks: 5 },
  { day: 5, level: 0, hours: '0.5h', tasks: 1 },
  { day: 6, level: 1, hours: '2.0h', tasks: 3 },
  { day: 7, level: 2, hours: '4.0h', tasks: 5 },
  { day: 8, level: 3, hours: '8.0h', tasks: 10 },
  { day: 9, level: 3, hours: '6.5h', tasks: 8 },
  { day: 10, level: 2, hours: '5.5h', tasks: 7 },
  { day: 11, level: 1, hours: '3.0h', tasks: 4 },
  { day: 12, level: 2, hours: '4.5h', tasks: 6 },
  { day: 13, level: 3, hours: '7.0h', tasks: 8 },
  { day: 14, level: 3, hours: '8.5h', tasks: 11 },
  { day: 15, level: 2, hours: '5.0h', tasks: 6 },
  { day: 16, level: 0, hours: '0h', tasks: 0 },
  { day: 17, level: 1, hours: '2.5h', tasks: 3 },
  { day: 18, level: 2, hours: '4.0h', tasks: 5 },
  { day: 19, level: 3, hours: '7.0h', tasks: 9 },
  { day: 20, level: 2, hours: '5.5h', tasks: 7 },
  { day: 21, level: 3, hours: '8.0h', tasks: 10 },
  { day: 22, level: 1, hours: '3.0h', tasks: 4 },
  { day: 23, level: 2, hours: '4.5h', tasks: 6 },
  { day: 24, level: 3, hours: '7.5h', tasks: 9 },
  { day: 25, level: 3, hours: '9.0h', tasks: 12 },
  { day: 26, level: 2, hours: '5.0h', tasks: 6 },
  { day: 27, level: 1, hours: '3.0h', tasks: 4 },
  { day: 28, level: 2, hours: '4.5h', tasks: 5 },
  { day: 29, level: 3, hours: '8.0h', tasks: 10 },
  { day: 30, level: 3, hours: '6.5h', tasks: 8 },
];

const INITIAL_TASKS = [
  { id: '1', title: 'Deploy staging environment', badge: 'OVR', days: 'Overdue', ovr: true, done: false },
  { id: '2', title: 'Code review: auth module', badge: 'HIGH', days: '1d left', ovr: false, done: false },
  { id: '3', title: 'Update dependencies & audit', badge: 'MED', days: '3d left', ovr: false, done: false },
];

const INITIAL_HABITS = [
  { id: '1', name: 'Morning standup & plan', done: true },
  { id: '2', name: 'Exercise 30min', done: true },
  { id: '3', name: 'Read tech articles', done: false },
];

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Tasks', icon: CheckSquare },
  { label: 'Habits', icon: Activity },
  { label: 'Pomodoro', icon: Timer },
  { label: 'Notes', icon: FileText },
];

export function DashboardMockup() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [heatmapCells, setHeatmapCells] = useState(INITIAL_HEATMAP_CELLS);
  const [hoveredCell, setHoveredCell] = useState(null);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, done: !h.done } : h))
    );
  };

  const cycleCellLevel = (index) => {
    setHeatmapCells((prev) =>
      prev.map((c, i) => (i === index ? { ...c, level: (c.level + 1) % 4 } : c))
    );
  };

  // Dynamic score based on completed tasks and habits
  const completedHabits = habits.filter((h) => h.done).length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const score = 80 + completedHabits * 3 + completedTasks * 4;

  return (
    <div className="dash-mockup">
      {/* Sidebar */}
      <div className="dash-sidebar">
        <div className="dash-logo font-serif">
          Flow<span className="dash-logo-accent">State.</span>
        </div>
        <div className="dash-nav-list" role="tablist">
          {NAV_ITEMS.map(({ label, icon: Icon }) => (
            <button
              key={label}
              role="tab"
              aria-selected={activeNav === label}
              className={`dash-nav-item ${activeNav === label ? 'dash-nav-item--active' : ''}`}
              onClick={() => setActiveNav(label)}
            >
              <div className="dash-nav-dot" />
              <Icon size={13} className="dash-nav-icon" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="dash-main">
        {/* Header */}
        <div className="dash-header">
          <div>
            <p className="dash-greeting font-mono">Monday, Sep 9</p>
            <h2 className="dash-title font-serif">Good morning.</h2>
          </div>
          <div className="dash-score">
            <span className="dash-score__label font-mono">SCORE</span>
            <span className="dash-score__value font-mono">{score}</span>
          </div>
        </div>

        {/* 30-Day Productivity Heatmap */}
        <div className="dash-widget dash-widget--heatmap">
          <div className="dash-widget__header">
            <p className="dash-widget__label font-mono">30-DAY PRODUCTIVITY</p>
            <span className="dash-heatmap__status font-mono">
              {hoveredCell
                ? `Day ${hoveredCell.day}: ${hoveredCell.hours} focused • ${hoveredCell.tasks} tasks`
                : 'Click cell to toggle level'}
            </span>
          </div>
          <div className="dash-heatmap">
            {heatmapCells.map((cell, idx) => (
              <div
                key={idx}
                className={`dash-heatmap__cell level-${cell.level}`}
                onMouseEnter={() => setHoveredCell(cell)}
                onMouseLeave={() => setHoveredCell(null)}
                onClick={() => cycleCellLevel(idx)}
                title={`Day ${cell.day}: ${cell.hours} (${cell.tasks} tasks)`}
              />
            ))}
          </div>
        </div>

        {/* Urgent Tasks */}
        <div className="dash-widget dash-widget--tasks">
          <div className="dash-widget__header">
            <p className="dash-widget__label font-mono">URGENT TASKS</p>
            <span className="dash-widget__meta font-mono">
              {tasks.filter((t) => !t.done).length} pending
            </span>
          </div>
          <div className="dash-tasks">
            {tasks.map(({ id, title, badge, days, ovr, done }) => (
              <div
                key={id}
                className={`dash-task-row ${done ? 'dash-task-row--done' : ''}`}
                onClick={() => toggleTask(id)}
              >
                <div className={`dash-task-check ${done ? 'dash-task-check--done' : ''}`}>
                  {done && <Check size={10} strokeWidth={3} />}
                </div>
                <span className={`dash-task-title ${done ? 'dash-task-title--done' : ''}`}>
                  {title}
                </span>
                <span
                  className={`dash-task-badge ${
                    done ? 'dash-task-badge--done' : ovr ? 'dash-task-badge--ovr' : ''
                  }`}
                >
                  {done ? 'Done' : ovr ? 'OVR' : days}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Habits Launchpad */}
        <div className="dash-widget dash-widget--habits">
          <div className="dash-widget__header">
            <p className="dash-widget__label font-mono">TODAY'S HABITS</p>
            <span className="dash-widget__meta font-mono">
              {completedHabits}/{habits.length} completed
            </span>
          </div>
          <div className="dash-habits">
            {habits.map(({ id, name, done }) => (
              <div
                key={id}
                className={`dash-habit-row ${done ? 'dash-habit-row--done' : ''}`}
                onClick={() => toggleHabit(id)}
              >
                <div className={`dash-habit-check ${done ? 'dash-habit-check--done' : ''}`}>
                  {done && <Check size={10} strokeWidth={3} />}
                </div>
                <span className={`dash-habit-name ${done ? 'dash-habit-name--done' : ''}`}>
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
