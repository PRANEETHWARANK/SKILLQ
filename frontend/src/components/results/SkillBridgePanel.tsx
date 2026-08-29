import React from 'react';
import { ArrowRight, Shuffle } from 'lucide-react';

interface SkillBridge {
  current_skill: string;
  intermediate_concept: string;
  target_skill: string;
  transferable_percentage: number;
  explanation: string;
}

export const SkillBridgePanel: React.FC<{ bridges?: SkillBridge[] }> = ({ bridges = [] }) => {
  if (!bridges || bridges.length === 0) return null;

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <Shuffle className="w-3.5 h-3.5 text-blue-700" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Skill Bridges (Transferable Foundations)
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Leverages your existing technical knowledge to accelerate mastery of missing target skills.
        </p>
      </div>

      <div className="space-y-2.5 mt-3">
        {bridges.map((b, i) => (
          <div key={i} className="p-3 rounded bg-slate-50 border border-slate-200 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
              <div className="flex items-center gap-2 font-semibold text-slate-900">
                <span className="text-emerald-700">{b.current_skill}</span>
                <span className="text-slate-300">→</span>
                <span className="text-slate-600 font-normal font-mono text-[11px]">{b.intermediate_concept}</span>
                <span className="text-slate-300">→</span>
                <span className="text-blue-700">{b.target_skill}</span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                ~{b.transferable_percentage}% Concept Overlap
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-1">
              {b.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
