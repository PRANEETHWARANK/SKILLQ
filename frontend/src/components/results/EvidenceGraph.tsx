import React, { useState } from 'react';
import { EvidenceGraphChain } from '../../types';
import { MatchBadge, RequirementBadge } from '../common/StatusBadge';
import { ArrowRight, HelpCircle, BookOpen, MessageSquareCode, CheckCircle2, AlertCircle } from 'lucide-react';

interface EvidenceGraphProps {
  chains: EvidenceGraphChain[];
  targetRole: string;
}

export const EvidenceGraph: React.FC<EvidenceGraphProps> = ({ chains, targetRole }) => {
  const [selectedSkill, setSelectedSkill] = useState<string>(chains[0]?.skill || '');

  const activeChain = chains.find(c => c.skill === selectedSkill) || chains[0];

  if (!activeChain) return null;

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-900 text-white">
              SIGNATURE FEATURE
            </span>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Interactive Evidence Graph
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Complete lineage: Target Role → Requirement → Evidence → Skill Gap → Action → Interview Practice.
          </p>
        </div>

        {/* Skill Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-slate-500">Inspect Skill:</span>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 font-medium text-slate-800 focus:outline-hidden"
          >
            {chains.map(c => (
              <option key={c.skill} value={c.skill}>
                {c.skill} ({c.match_status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Flow Pipeline */}
      <div className="my-4 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-[760px]">
          {activeChain.flow.map((node, i) => {
            const isLast = i === activeChain.flow.length - 1;
            const isMissing = node.value === 'Missing' || node.value.includes('Missing');
            const isStrong = node.value === 'Strong';

            return (
              <React.Fragment key={node.step}>
                <div className="flex-1 p-2.5 rounded border bg-slate-50 border-slate-200 min-w-[100px] flex flex-col justify-between">
                  <span className="text-[9px] font-mono uppercase font-bold text-slate-400">
                    {node.step}
                  </span>
                  <p className={`text-xs font-semibold mt-1 truncate ${
                    isMissing ? 'text-rose-700' : isStrong ? 'text-emerald-700' : 'text-slate-800'
                  }`}>
                    {node.value}
                  </p>
                </div>
                {!isLast && <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Dynamic Graph Reasoning Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-xs">
        <div className="space-y-2">
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
              Evidence Evaluation & Context:
            </span>
            <p className="text-slate-700 text-[11px] leading-relaxed">
              {activeChain.details.why_gap}
            </p>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <span className="font-mono text-[10px] uppercase font-bold text-slate-500 block mb-0.5">
              Extracted Resume Snippet:
            </span>
            <p className="text-slate-700 font-mono text-[11px] whitespace-pre-wrap">
              {activeChain.details.evidence_found}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="p-2.5 rounded bg-blue-50/50 border border-blue-100">
            <div className="flex items-center gap-1 text-blue-900 font-semibold mb-0.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-700" />
              <span className="font-mono text-[10px] uppercase">Recommended Action:</span>
            </div>
            <p className="text-blue-950 text-[11px]">
              {activeChain.details.recommended_resource}
            </p>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-1 text-slate-900 font-semibold mb-0.5">
              <MessageSquareCode className="w-3.5 h-3.5 text-slate-700" />
              <span className="font-mono text-[10px] uppercase">Targeted Interview Question:</span>
            </div>
            <p className="text-slate-700 text-[11px] italic">
              "{activeChain.details.related_interview_q}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
