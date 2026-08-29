import React from 'react';
import { LearningPlanPayload, LearningWeek } from '../../types';
import { Calendar, CheckCircle2, Clock, BookOpen, Sparkles, ExternalLink } from 'lucide-react';
import { ProgressBar } from '../common/ProgressBar';

interface LearningTimelineProps {
  plan: LearningPlanPayload;
  onToggleTask: (taskId: string, completed: boolean) => void;
}

export const LearningTimeline: React.FC<LearningTimelineProps> = ({ plan, onToggleTask }) => {
  const allTasks = plan.weeks.flatMap(w => w.tasks);
  const completedCount = allTasks.filter(t => t.completed).length;
  const progressPercent = allTasks.length > 0 ? (completedCount / allTasks.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Plan Header & Progress */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono font-semibold text-blue-700 uppercase tracking-wider">
              30-Day Engineering Roadmap
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-0.5">
              {plan.target_role} — Skill Acceleration Plan
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Targeting priority skill gaps: {plan.primary_gap_skills.join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500">Effort:</span> <strong className="text-slate-800 font-mono">{plan.total_estimated_hours} hrs</strong>
            </div>
            <div className="h-4 w-px bg-slate-200" />
            <div>
              <span className="text-slate-500">Completed:</span> <strong className="text-slate-800 font-mono">{completedCount}/{allTasks.length}</strong>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar value={progressPercent} label="Overall Roadmap Progress" color="emerald" />
        </div>
      </div>

      {/* 4 Weeks */}
      <div className="space-y-4">
        {plan.weeks.map((week) => (
          <div key={week.week_number} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs">
            {/* Week Header */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-white">
                    WEEK 0{week.week_number}
                  </span>
                  <span className="text-xs font-semibold text-slate-900">{week.focus_skill}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">{week.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{week.objective}</p>
              </div>
              <div className="text-[11px] font-mono text-slate-500 shrink-0">
                ~{week.estimated_hours} Hours Required
              </div>
            </div>

            {/* Task Checklist */}
            <div className="p-4 space-y-3">
              <span className="text-[10px] font-mono uppercase font-semibold text-slate-400">Actionable Tasks & Practice:</span>
              {week.tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-md border transition-colors flex items-start justify-between gap-3 ${
                    task.completed ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <label className="flex items-start gap-3 cursor-pointer select-none flex-1">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={(e) => onToggleTask(task.id, e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    <div>
                      <p className={`text-xs font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
                        <span className="font-mono">{task.duration}</span>
                        <span>•</span>
                        <span className="text-blue-700 font-medium">{task.resource}</span>
                      </div>
                    </div>
                  </label>
                </div>
              ))}

              {/* Milestone Box */}
              <div className="mt-3 p-3 rounded-md bg-blue-50/40 border border-blue-100 flex items-start gap-2 text-xs text-blue-950">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="font-mono text-[10px] uppercase font-bold text-blue-800">Week 0{week.week_number} Milestone:</strong>
                  <p className="mt-0.5 text-[11px] text-blue-900">{week.milestone}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
