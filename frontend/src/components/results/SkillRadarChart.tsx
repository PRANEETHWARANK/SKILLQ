import React from 'react';
import { SkillRadarItem } from '../../types';

interface SkillRadarProps {
  radarData: SkillRadarItem[];
}

export const SkillRadarChart: React.FC<SkillRadarProps> = ({ radarData }) => {
  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Candidate Evidence vs. Role Requirement by Domain
          </h3>
          <p className="text-[11px] text-slate-500">
            Deterministic domain-level comparison calculated from extracted skill matrix evidence.
          </p>
        </div>
      </div>

      {/* Visual Category Comparison Bars */}
      <div className="space-y-3 mt-4">
        {radarData.map((item) => (
          <div key={item.category} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-medium text-slate-800">{item.category}</span>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-slate-500">Evidence: <strong className="text-slate-900">{item.candidate_evidence}%</strong></span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-500">Required: <strong className="text-slate-900">{item.role_requirement}%</strong></span>
              </div>
            </div>

            {/* Dual comparative bar */}
            <div className="w-full h-3 bg-slate-100 rounded overflow-hidden flex relative border border-slate-200/60">
              {/* Required marker */}
              <div
                className="absolute top-0 bottom-0 bg-slate-300/60 z-0"
                style={{ width: `${item.role_requirement}%` }}
              />
              {/* Candidate achieved */}
              <div
                className={`h-full z-10 transition-all ${
                  item.candidate_evidence >= 80 ? 'bg-emerald-600' :
                  item.candidate_evidence >= 55 ? 'bg-blue-600' : 'bg-amber-500'
                }`}
                style={{ width: `${item.candidate_evidence}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-2 bg-blue-600 rounded-xs inline-block" />
          <span>Candidate Evidence</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-2 bg-slate-300 rounded-xs inline-block" />
          <span>Role Requirement Threshold</span>
        </div>
      </div>
    </div>
  );
};
