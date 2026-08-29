import React from 'react';
import { ReadinessMilestone } from '../../types';
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReadinessTrajectoryProps {
  milestones: ReadinessMilestone[];
}

export const ReadinessTrajectory: React.FC<ReadinessTrajectoryProps> = ({ milestones }) => {
  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-white">
              PROJECTION
            </span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Skill Coverage Trajectory
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Projected skill coverage if recommended 30-day learning milestones are completed.
          </p>
        </div>
      </div>

      {/* Trajectory Step Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 my-4">
        {milestones.map((m, i) => {
          const isBaseline = i === 0;
          const isTarget = i === milestones.length - 1;

          return (
            <div
              key={m.milestone}
              className={`p-3 rounded border flex flex-col justify-between ${
                isBaseline ? 'bg-slate-50 border-slate-200' :
                isTarget ? 'bg-emerald-50/40 border-emerald-200' :
                'bg-slate-50/60 border-slate-200'
              }`}
            >
              <div>
                <span className="text-[9px] font-mono uppercase font-bold text-slate-400">
                  {m.phase}
                </span>
                <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{m.milestone}</p>
                <p className="text-[10px] text-slate-500 mt-1 leading-snug">{m.focus}</p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60">
                <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">
                  {m.coverage}%
                </span>
                <span className="text-[10px] text-slate-400 block">Coverage</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ethical Guidance Notice */}
      <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong className="text-slate-800">Career Guidance Notice:</strong> This trajectory reflects technical requirement coverage based on completed projects and evidence. It does not predict or guarantee employment decisions.
        </p>
      </div>
    </div>
  );
};
