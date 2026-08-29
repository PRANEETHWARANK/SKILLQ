import React from 'react';
import { SkillGapsPayload } from '../../types';
import { PriorityBadge, RequirementBadge } from '../common/StatusBadge';
import { ArrowRight } from 'lucide-react';

interface SkillGapListProps {
  skillGaps: SkillGapsPayload;
  onNavigateToLearning: () => void;
}

export const SkillGapList: React.FC<SkillGapListProps> = ({ skillGaps, onNavigateToLearning }) => {
  const { summary, priority_gaps } = skillGaps;

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Skill Gap Prioritization</h3>
          <p className="text-[11px] text-slate-500">
            Targeted deficiencies identified against role requirements.
          </p>
        </div>

        <button
          onClick={onNavigateToLearning}
          className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-blue-700 transition-colors"
        >
          View 30-Day Plan
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Summary Counts Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        <div className="p-2 rounded bg-slate-50 border border-slate-200 text-xs">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Strong</span>
          <p className="text-base font-bold font-mono text-slate-800">{summary.strong_count}</p>
        </div>
        <div className="p-2 rounded bg-slate-50 border border-slate-200 text-xs">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Partial</span>
          <p className="text-base font-bold font-mono text-slate-800">{summary.partial_count}</p>
        </div>
        <div className="p-2 rounded bg-slate-50 border border-slate-200 text-xs">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Weak</span>
          <p className="text-base font-bold font-mono text-slate-800">{summary.weak_count}</p>
        </div>
        <div className="p-2 rounded bg-slate-50 border border-slate-200 text-xs">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Missing</span>
          <p className="text-base font-bold font-mono text-slate-800">{summary.missing_count}</p>
        </div>
      </div>

      {/* Priority Gaps List */}
      <div className="space-y-2.5 mt-3">
        {priority_gaps.map((gap) => (
          <div
            key={gap.skill}
            className="p-3 rounded border border-slate-200 bg-slate-50/50 flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-slate-900">{gap.skill}</span>
                <RequirementBadge req={gap.requirement} />
              </div>
              <PriorityBadge priority={gap.priority} />
            </div>

            <p className="text-xs text-slate-600">
              <strong className="text-slate-700">Reason:</strong> {gap.reason}
            </p>

            <p className="text-[11px] text-slate-700 font-mono">
              <span className="font-bold text-slate-900">ACTION:</span> {gap.recommended_action}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
