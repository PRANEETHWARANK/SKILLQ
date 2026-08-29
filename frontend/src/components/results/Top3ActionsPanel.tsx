import React from 'react';
import { Target, CheckCircle2, ArrowRight } from 'lucide-react';

interface ActionItem {
  step: number;
  skill: string;
  action: string;
  priority: string;
}

export const Top3ActionsPanel: React.FC<{ actions?: ActionItem[] }> = ({ actions = [] }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <Target className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Your Top 3 Recommended Actions
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">
          PRIORITIZED REMEDIATION
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
        {actions.map((act) => (
          <div key={act.step} className="p-3 rounded bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center">
                  0{act.step}
                </span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                  act.priority === 'HIGH' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {act.priority} PRIORITY
                </span>
              </div>
              <p className="font-bold text-slate-900">{act.skill}</p>
              <p className="text-[11px] text-slate-600 mt-1 leading-snug">{act.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
