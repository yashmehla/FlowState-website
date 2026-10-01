import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Activity,
  Timer,
  FileText,
  Check,
  Plus,
  Play,
  Pause,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
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
  { id: '1', name: 'Morning standup & plan', done: true, streak: 14, days: [true, true, true, true, true, true, true] },
  { id: '2', name: 'Exercise 30min', done: true, streak: 8, days: [true, true, false, true, true, false, true] },
  { id: '3', name: 'Read tech articles', done: false, streak: 5, days: [false, true, true, false, true, true, false] },
];

const INITIAL_KANBAN_CARDS = [
  { id: 'k1', col: 'todo', title: 'Setup CI/CD pipeline', badge: 'HIGH', badgeClass: 'badge--red', time: '2d left' },
  { id: 'k2', col: 'todo', title: 'Write unit tests for parser', badge: 'MED', badgeClass: 'badge--orange', time: '5d left' },
  { id: 'k3', col: 'inProgress', title: 'Refactor auth & encryption', badge: 'HIGH', badgeClass: 'badge--red', time: '1d left' },
  { id: 'k4', col: 'done', title: 'Design system dark tokens', badge: 'LOW', badgeClass: 'badge--green', time: 'Done' },
  { id: 'k5', col: 'done', title: 'IndexedDB schema migration', badge: 'MED', badgeClass: 'badge--orange', time: 'Done' },
];

const INITIAL_NOTES = [
  {
    id: '1',
    title: 'Architecture decisions',
    preview: 'Using IndexedDB persistence with Dexie.js...',
    content: `# Architecture Decisions\n\nUsing Dexie.js for IndexedDB persistence.\nKey local-first rules:\n- Zero server latency\n- Cryptographic local key\n- Offline-first mutation queue\n- Strict zero-telemetry policy`
  },
  {
    id: '2',
    title: 'Sprint retrospective',
    preview: 'What went well: CI pipeline & local tests...',
    content: `# Sprint Retrospective\n\nHighlights:\n- Instant search indexing under 2ms\n- Memory footprint under 45MB\n- Fast startup time and zero cloud reliance`
  },
  {
    id: '3',
    title: 'API & telemetry specs',
    preview: 'Strict anonymous download counters only...',
    content: `# Telemetry Specs\n\n- No personally identifiable information collected\n- Opt-in anonymous count\n- All notes and tasks stay on your local disk`
  }
];

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Tasks', icon: CheckSquare },
  { label: 'Habits', icon: Activity },
  { label: 'Pomodoro', icon: Timer },
  { label: 'Notes', icon: FileText },
];

const DAYS_OF_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function DashboardMockup() {
  const [activeNav, setActiveNav] = useState('Dashboard');

  // Dashboard state
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [habits, setHabits] = useState(INITIAL_HABITS);
  const [heatmapCells, setHeatmapCells] = useState(INITIAL_HEATMAP_CELLS);
  const [hoveredCell, setHoveredCell] = useState(null);

  // Tasks (Kanban) state
  const [kanbanCards, setKanbanCards] = useState(INITIAL_KANBAN_CARDS);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Pomodoro state
  const [pomoMode, setPomoMode] = useState('focus'); // 'focus' | 'short' | 'long'
  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const [pomoCompletedCount, setPomoCompletedCount] = useState(4);

  // Notes state
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [activeNoteId, setActiveNoteId] = useState('1');

  // Pomodoro timer effect
  useEffect(() => {
    let interval = null;
    if (isPomoRunning && pomoSeconds > 0) {
      interval = setInterval(() => {
        setPomoSeconds((prev) => {
          if (prev <= 1) {
            setIsPomoRunning(false);
            setPomoCompletedCount((c) => c + 1);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPomoRunning, pomoSeconds]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Dashboard toggle handlers
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

  const toggleHabitDay = (habitId, dayIndex) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;
        const newDays = [...h.days];
        newDays[dayIndex] = !newDays[dayIndex];
        return { ...h, days: newDays };
      })
    );
  };

  const cycleCellLevel = (index) => {
    setHeatmapCells((prev) =>
      prev.map((c, i) => (i === index ? { ...c, level: (c.level + 1) % 4 } : c))
    );
  };

  // Kanban advance card handler
  const advanceKanbanCard = (id) => {
    setKanbanCards((prev) =>
      prev.map((card) => {
        if (card.id !== id) return card;
        if (card.col === 'todo') {
          return { ...card, col: 'inProgress', badgeClass: 'badge--orange' };
        }
        if (card.col === 'inProgress') {
          return { ...card, col: 'done', badgeClass: 'badge--green', time: 'Done' };
        }
        return { ...card, col: 'todo', badgeClass: 'badge--red', time: '2d left' };
      })
    );
  };

  const handleAddKanbanCard = (e) => {
    e?.preventDefault();
    if (!newTaskInput.trim()) return;
    const newCard = {
      id: `k-${Date.now()}`,
      col: 'todo',
      title: newTaskInput.trim(),
      badge: 'HIGH',
      badgeClass: 'badge--red',
      time: 'Today'
    };
    setKanbanCards((prev) => [newCard, ...prev]);
    setNewTaskInput('');
    setIsAddingTask(false);
  };

  // Switch pomodoro mode
  const switchPomoMode = (mode, sec) => {
    setPomoMode(mode);
    setPomoSeconds(sec);
    setIsPomoRunning(false);
  };

  // Dynamic score based on completed tasks and habits
  const completedHabits = habits.filter((h) => h.done).length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const score = 80 + completedHabits * 3 + completedTasks * 4;

  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  return (
    <div className="dash-mockup">
      {/* Sidebar Navigation */}
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

      {/* Main Content Pane */}
      <div className="dash-main">
        {/* VIEW 1: DASHBOARD */}
        {activeNav === 'Dashboard' && (
          <div className="dash-pane">
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
        )}

        {/* VIEW 2: TASKS KANBAN */}
        {activeNav === 'Tasks' && (
          <div className="dash-pane dash-pane--tasks">
            <div className="dash-pane__top">
              <div>
                <p className="dash-greeting font-mono">TASK MANAGEMENT</p>
                <h2 className="dash-title font-serif">Sprint Board</h2>
              </div>
              <div className="dash-kanban-actions">
                <span className="dash-pane-hint font-mono">Click card to advance column</span>
                <button
                  className="dash-action-btn font-mono"
                  onClick={() => setIsAddingTask((v) => !v)}
                >
                  <Plus size={11} /> New Task
                </button>
              </div>
            </div>

            {isAddingTask && (
              <form onSubmit={handleAddKanbanCard} className="dash-quick-form">
                <input
                  type="text"
                  className="dash-quick-input font-mono"
                  placeholder="Task title (press Enter to add)..."
                  value={newTaskInput}
                  onChange={(e) => setNewTaskInput(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="dash-quick-submit font-mono">Add</button>
              </form>
            )}

            <div className="dash-kanban-grid">
              {[
                { colKey: 'todo', label: 'TO DO' },
                { colKey: 'inProgress', label: 'IN PROGRESS' },
                { colKey: 'done', label: 'DONE' }
              ].map(({ colKey, label }) => {
                const colCards = kanbanCards.filter((c) => c.col === colKey);
                return (
                  <div key={colKey} className="dash-kanban-column">
                    <div className="dash-kanban-column__head">
                      <span className={`dash-kanban-column__title font-mono col--${colKey}`}>
                        {label}
                      </span>
                      <span className="dash-kanban-column__count font-mono">{colCards.length}</span>
                    </div>
                    <div className="dash-kanban-column__list">
                      {colCards.map((card) => (
                        <div
                          key={card.id}
                          className="dash-kanban-card"
                          onClick={() => advanceKanbanCard(card.id)}
                          title="Click to move to next column"
                        >
                          <div className="dash-kanban-card__meta">
                            <span className={`dash-kanban-badge ${card.badgeClass}`}>
                              {card.badge}
                            </span>
                            <span className="dash-kanban-card__time font-mono">{card.time}</span>
                          </div>
                          <p className="dash-kanban-card__text">{card.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 3: HABITS MATRIX */}
        {activeNav === 'Habits' && (
          <div className="dash-pane dash-pane--habits">
            <div className="dash-pane__top">
              <div>
                <p className="dash-greeting font-mono">CONSISTENCY ENGINE</p>
                <h2 className="dash-title font-serif">Habits & Streaks</h2>
              </div>
              <span className="dash-pane-hint font-mono">Click checkboxes to log daily progress</span>
            </div>

            <div className="dash-habits-matrix">
              <div className="dash-matrix-header">
                <span className="dash-matrix-header__name font-mono">HABIT</span>
                <div className="dash-matrix-header__days font-mono">
                  {DAYS_OF_WEEK.map((d, i) => (
                    <span key={i} className="dash-day-col">{d}</span>
                  ))}
                </div>
                <span className="dash-matrix-header__streak font-mono">STREAK</span>
              </div>

              {habits.map((habit) => (
                <div key={habit.id} className="dash-matrix-row">
                  <div className="dash-matrix-row__name">
                    <span className="dash-matrix-habit-title">{habit.name}</span>
                  </div>
                  <div className="dash-matrix-row__days">
                    {habit.days.map((isDone, dayIdx) => (
                      <button
                        key={dayIdx}
                        className={`dash-matrix-check ${isDone ? 'is-done' : ''}`}
                        onClick={() => toggleHabitDay(habit.id, dayIdx)}
                        aria-label={`Toggle day ${dayIdx + 1}`}
                      >
                        {isDone && <Check size={10} strokeWidth={3} />}
                      </button>
                    ))}
                  </div>
                  <div className="dash-matrix-row__streak font-mono">
                    <span className="dash-streak-count">{habit.streak}d</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="dash-habits-summary">
              <div className="dash-summary-box">
                <span className="dash-summary-label font-mono">ACTIVE HABITS</span>
                <span className="dash-summary-val font-mono">{habits.length}</span>
              </div>
              <div className="dash-summary-box">
                <span className="dash-summary-label font-mono">TODAY'S COMPLETION</span>
                <span className="dash-summary-val font-mono">
                  {Math.round((completedHabits / Math.max(habits.length, 1)) * 100)}%
                </span>
              </div>
              <div className="dash-summary-box">
                <span className="dash-summary-label font-mono">TOP STREAK</span>
                <span className="dash-summary-val font-mono">14 Days</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: POMODORO TIMER */}
        {activeNav === 'Pomodoro' && (
          <div className="dash-pane dash-pane--pomo">
            <div className="dash-pomo-tabs">
              {[
                { mode: 'focus', label: 'Focus 25m', sec: 25 * 60 },
                { mode: 'short', label: 'Short Break 5m', sec: 5 * 60 },
                { mode: 'long', label: 'Long Break 15m', sec: 15 * 60 },
              ].map(({ mode, label, sec }) => (
                <button
                  key={mode}
                  className={`dash-pomo-tab font-mono ${pomoMode === mode ? 'is-active' : ''}`}
                  onClick={() => switchPomoMode(mode, sec)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="dash-pomo-display">
              <div className="dash-pomo-digits font-mono">
                {formatTimer(pomoSeconds)}
              </div>
              <div className="dash-pomo-sub font-mono">
                {isPomoRunning ? 'Session in progress' : 'Ready to start'}
              </div>
            </div>

            <div className="dash-pomo-controls">
              <button
                className={`dash-pomo-main-btn font-mono ${isPomoRunning ? 'is-active' : ''}`}
                onClick={() => setIsPomoRunning((r) => !r)}
              >
                {isPomoRunning ? <Pause size={13} /> : <Play size={13} />}
                <span>{isPomoRunning ? 'Pause Session' : 'Start Focus'}</span>
              </button>
              <button
                className="dash-pomo-reset-btn font-mono"
                onClick={() => {
                  setIsPomoRunning(false);
                  setPomoSeconds(pomoMode === 'focus' ? 25 * 60 : pomoMode === 'short' ? 5 * 60 : 15 * 60);
                }}
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            <div className="dash-pomo-metrics">
              <div className="dash-pomo-metric">
                <span className="dash-metric-num font-mono">{pomoCompletedCount}</span>
                <span className="dash-metric-lbl font-mono">TODAY</span>
              </div>
              <div className="dash-pomo-metric-divider" />
              <div className="dash-pomo-metric">
                <span className="dash-metric-num font-mono">1h 40m</span>
                <span className="dash-metric-lbl font-mono">FOCUSED</span>
              </div>
              <div className="dash-pomo-metric-divider" />
              <div className="dash-pomo-metric">
                <span className="dash-metric-num font-mono">2</span>
                <span className="dash-metric-lbl font-mono">STREAK</span>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: NOTES */}
        {activeNav === 'Notes' && (
          <div className="dash-pane dash-pane--notes">
            <div className="dash-notes-layout">
              {/* Notes List */}
              <div className="dash-notes-list">
                <div className="dash-notes-list__head font-mono">
                  <span>NOTES ({notes.length})</span>
                </div>
                <div className="dash-notes-items">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className={`dash-note-card ${activeNoteId === note.id ? 'is-active' : ''}`}
                      onClick={() => setActiveNoteId(note.id)}
                    >
                      <p className="dash-note-card__title">{note.title}</p>
                      <p className="dash-note-card__preview">{note.preview}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes Editor */}
              <div className="dash-notes-editor">
                <div className="dash-notes-editor__top font-mono">
                  <span>{activeNote.title}.md</span>
                  <span className="dash-save-status">Saved Locally (0ms)</span>
                </div>
                <textarea
                  className="dash-notes-textarea font-mono"
                  value={activeNote.content}
                  onChange={(e) => {
                    const updatedContent = e.target.value;
                    setNotes((prev) =>
                      prev.map((n) =>
                        n.id === activeNoteId ? { ...n, content: updatedContent } : n
                      )
                    );
                  }}
                  placeholder="Type your notes in markdown..."
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
