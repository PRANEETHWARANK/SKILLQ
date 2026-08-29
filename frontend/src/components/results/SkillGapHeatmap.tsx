import React, { useState } from 'react';
import { SkillHeatmapRow } from '../../types';
import { PriorityBadge } from '../common/StatusBadge';

interface SkillGapHeatmapProps {
  heatmapData: SkillHeatmapRow[];
}

export const SkillGapHeatmap: React.FC<SkillGapHeatmapProps> = ({ heatmapData }) => {
  const [selectedSkill, setSelectedSkill] = useState<SkillHeatmapRow | null>(null);

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="pb-3 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          Skill Gap Intensity Heatmap
        </h3>
        <p className="text-[11px] text-slate-500">
          Evaluates requirement weight, evidence depth, and deficiency delta for each technical competency.
        </p>
      </div>

      <div className="overflow-x-auto mt-3">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-2 px-3">Skill</th>
              <th className="py-2 px-3">Requirement</th>
              <th className="py-2 px-3">Candidate Evidence</th>
              <th className="py-2 px-3">Required Depth</th>
              <th className="py-2 px-3">Gap Delta</th>
              <th className="py-2 px-3 text-right">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {heatmapData.map((row) => {
              const gapColor =
                row.gap_score >= 50 ? 'bg-rose-50 text-rose-800' :
                row.gap_score >= 25 ? 'bg-amber-50 text-amber-800' :
                'bg-emerald-50 text-emerald-800';

              return (
                <tr key={row.skill} className="hover:bg-slate-50">
                  <td className="py-2 px-3 font-semibold text-slate-900">{row.skill}</td>
                  <td className="py-2 px-3 font-mono text-slate-600">{row.requirement}</td>
                  <td className="py-2 px-3 font-mono tabular-nums text-slate-700">{row.candidate_evidence_score}%</td>
                  <td className="py-2 px-3 font-mono tabular-nums text-slate-700">{row.role_requirement_score}%</td>
                  <td className="py-2 px-3">
                    <span className={`px-1.5 py-0.5 rounded font-mono text-[11px] font-bold ${gapColor}`}>
                      {row.gap_score > 0 ? `-${row.gap_score}%` : '0%'}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-right">
                    <PriorityBadge priority={row.priority} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
