import React from 'react';
import { ArrowRight, GitFork } from 'lucide-react';

interface DependencyChain {
  prerequisite: string;
  prerequisite_status: string;
  dependent_skill: string;
  dependent_status: string;
  recommendation: string;
}

export const SkillDependencyGraph: React.FC<{ chains?: DependencyChain[] }> = ({ chains = [] }) => {
  if (!chains || chains.length === 0) return null;

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <GitFork className="w-3.5 h-3.5 text-slate-700" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Skill Prerequisite & Dependency Graph
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Logical prerequisite sequences ensuring foundations are solidified before advanced tooling.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
        {chains.map((c, i) => (
          <div key={i} className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-900">{c.prerequisite}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-900">{c.dependent_skill}</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5 leading-snug">
              {c.recommendation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
