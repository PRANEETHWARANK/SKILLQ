import React, { useState } from 'react';
import { SkillMatchItem } from '../../types';
import { MatchBadge, RequirementBadge } from '../common/StatusBadge';
import { ChevronRight, Search } from 'lucide-react';

interface SkillMatrixProps {
  skills: SkillMatchItem[];
  onSelectSkill: (skill: SkillMatchItem) => void;
}

export const SkillMatrix: React.FC<SkillMatrixProps> = ({ skills, onSelectSkill }) => {
  const [filterReq, setFilterReq] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filtered = skills.filter((item) => {
    if (filterReq !== 'ALL' && item.requirement !== filterReq) return false;
    if (filterStatus !== 'ALL' && item.match_status !== filterStatus) return false;
    if (searchQuery && !item.skill.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="bg-white rounded border border-slate-200 overflow-hidden">
      <div className="p-3.5 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Skill Evidence Matching Matrix</h3>
          <p className="text-[11px] text-slate-500">
            Verifiable alignment between resume statements and role requirements.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 flex-wrap w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 absolute left-2 top-2 text-slate-400" />
            <input
              type="text"
              placeholder="Search skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 pr-2.5 py-1 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900 w-full sm:w-36"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700"
          >
            <option value="ALL">All Matches</option>
            <option value="Strong">Strong</option>
            <option value="Partial">Partial</option>
            <option value="Weak">Weak</option>
            <option value="Missing">Missing</option>
          </select>

          <select
            value={filterReq}
            onChange={(e) => setFilterReq(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700"
          >
            <option value="ALL">All Tiers</option>
            <option value="Required">Required</option>
            <option value="Preferred">Preferred</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-mono font-medium border-b border-slate-200 uppercase text-[10px]">
            <tr>
              <th className="py-2 px-3.5">Skill</th>
              <th className="py-2 px-3.5">Tier</th>
              <th className="py-2 px-3.5">Resume Evidence</th>
              <th className="py-2 px-3.5">Match</th>
              <th className="py-2 px-3.5 font-mono text-right">Confidence</th>
              <th className="py-2 px-2.5 text-center">Inspect</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr
                key={item.skill}
                onClick={() => onSelectSkill(item)}
                className="hover:bg-slate-50/80 cursor-pointer transition-colors"
              >
                <td className="py-2.5 px-3.5 font-semibold text-slate-900 whitespace-nowrap">
                  {item.skill}
                  <span className="block text-[10px] font-normal text-slate-400 font-sans">{item.category}</span>
                </td>
                <td className="py-2.5 px-3.5 whitespace-nowrap">
                  <RequirementBadge req={item.requirement} />
                </td>
                <td className="py-2.5 px-3.5 max-w-xs sm:max-w-md truncate text-slate-600 text-[11px]">
                  {item.evidence_snippet}
                </td>
                <td className="py-2.5 px-3.5 whitespace-nowrap">
                  <MatchBadge status={item.match_status} />
                </td>
                <td className="py-2.5 px-3.5 font-mono text-right font-medium text-slate-800 tabular-nums">
                  {item.confidence.toFixed(2)}
                </td>
                <td className="py-2.5 px-2.5 text-center text-slate-400">
                  <ChevronRight className="w-3.5 h-3.5 mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
