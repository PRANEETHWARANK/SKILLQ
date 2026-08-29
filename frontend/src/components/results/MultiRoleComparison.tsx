import React from 'react';
import { Layers } from 'lucide-react';

interface RoleComparisonItem {
  role_name: string;
  match_score: number;
  common_skills: string[];
  missing_skills: string[];
}

export const MultiRoleComparison: React.FC<{ rolesData?: RoleComparisonItem[] }> = ({ rolesData = [] }) => {
  if (!rolesData || rolesData.length === 0) return null;

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-slate-700" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Multi-Role Alignment Explorer
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Compares your demonstrated technical skills across adjacent entry-level engineering specializations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 my-3">
        {rolesData.map((r) => (
          <div key={r.role_name} className="p-3 rounded bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900 truncate">{r.role_name}</span>
                <span className="font-mono text-[11px] font-bold text-slate-800">{r.match_score}%</span>
              </div>
              <div className="mt-2 text-[10px] text-slate-600 space-y-1">
                <div>
                  <span className="text-slate-400 font-mono uppercase block">Common Skills:</span>
                  <span className="text-emerald-700 font-medium">{r.common_skills.slice(0, 3).join(', ')}</span>
                </div>
                <div className="mt-1">
                  <span className="text-slate-400 font-mono uppercase block">Divergent Gaps:</span>
                  <span className="text-rose-700 font-medium">{r.missing_skills.slice(0, 2).join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-slate-400 italic">
        *Based strictly on requirement overlap with your verified skills. This is not an automated hiring prediction.
      </p>
    </div>
  );
};
