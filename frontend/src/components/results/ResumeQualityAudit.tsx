import React from 'react';
import { ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ResumeQualityData {
  skill_visibility_score: number;
  evidence_specificity_score: number;
  role_relevance_score: number;
  action_verb_strength: string;
  quantifiable_outcomes: string;
  disclaimer: string;
}

export const ResumeQualityAudit: React.FC<{ auditData?: ResumeQualityData }> = ({ auditData }) => {
  if (!auditData) return null;

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="pb-3 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          Resume Evidence Quality Audit
        </h3>
        <p className="text-[11px] text-slate-500">
          Evaluates evidence clarity and specificity to help candidates document verifiable accomplishments.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2.5 my-3 text-center">
        <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Skill Visibility</span>
          <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">{auditData.skill_visibility_score}%</p>
        </div>
        <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Evidence Specificity</span>
          <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">{auditData.evidence_specificity_score}%</p>
        </div>
        <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Role Relevance</span>
          <p className="text-xl font-bold font-mono text-slate-900 mt-0.5">{auditData.role_relevance_score}%</p>
        </div>
      </div>

      <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs space-y-1">
        <div className="flex items-center gap-1.5 text-slate-700">
          <span className="font-semibold text-slate-900">Project Action Verbs:</span> {auditData.action_verb_strength}
        </div>
        <div className="flex items-center gap-1.5 text-slate-700">
          <span className="font-semibold text-slate-900">Metrics Detection:</span> {auditData.quantifiable_outcomes}
        </div>
      </div>

      <p className="text-[10px] text-slate-400 italic mt-2">
        *{auditData.disclaimer}
      </p>
    </div>
  );
};
