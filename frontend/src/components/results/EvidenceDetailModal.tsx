import React from 'react';
import { Modal } from '../common/Modal';
import { SkillMatchItem } from '../../types';
import { MatchBadge, RequirementBadge } from '../common/StatusBadge';
import { FileCode2, Info, Lightbulb, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

interface EvidenceDetailModalProps {
  skill: SkillMatchItem | null;
  onClose: () => void;
}

export const EvidenceDetailModal: React.FC<EvidenceDetailModalProps> = ({ skill, onClose }) => {
  if (!skill) return null;

  const prov = (skill as any).evidence_provenance || {};
  const whyGap = (skill as any).why_gap_explainer;
  const improvementTip = (skill as any).improvement_tip;
  const qualityType = (skill as any).evidence_quality_type || 'Project / Work Evidence';
  const qualityScore = (skill as any).evidence_quality_score || skill.confidence;

  return (
    <Modal isOpen={!!skill} onClose={onClose} title={`Evidence Audit: ${skill.skill}`}>
      <div className="space-y-4 text-xs">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase">{skill.category}</span>
            <h4 className="text-base font-bold text-slate-900">{skill.skill}</h4>
          </div>
          <div className="flex items-center gap-2">
            <RequirementBadge req={skill.requirement} />
            <MatchBadge status={skill.match_status} />
          </div>
        </div>

        {/* 1. Evidence Quality & Confidence Distinction */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Evidence Confidence</span>
            <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
              {(skill.confidence * 100).toFixed(0)}%
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Certainty of extracted text</span>
          </div>

          <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-mono text-slate-500 uppercase block">Evidence Quality Type</span>
            <span className="text-xs font-semibold text-slate-800 block mt-0.5 truncate">
              {qualityType}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">Strength tier</span>
          </div>
        </div>

        {/* 2. Evidence Provenance */}
        <div>
          <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
            Auditable Evidence Provenance
          </span>
          <div className="p-3 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
            <div>
              <span className="text-slate-400">Section:</span> <strong className="text-slate-900">{prov.source_section || skill.resume_section || 'Projects'}</strong>
            </div>
            <div>
              <span className="text-slate-400">Source:</span> <strong className="text-slate-900">{prov.item_name || 'Resume Document'}</strong>
            </div>
            <div className="pt-1 text-slate-700 border-t border-slate-200/60 leading-relaxed">
              "{prov.exact_sentence || skill.evidence_snippet}"
            </div>
          </div>
        </div>

        {/* 3. "Why This Gap?" Explainer */}
        {whyGap && (
          <div className="p-3 rounded bg-slate-50 border border-slate-200 space-y-1.5">
            <span className="text-[11px] font-mono font-bold text-slate-700 uppercase block">
              Why is this classified as {skill.match_status}?
            </span>
            <div className="space-y-1 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-700">
                <span className="text-emerald-600 font-bold">✓</span> Appears in target job description as <strong>{whyGap.requirement_tier}</strong>
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                {whyGap.direct_evidence_found ? (
                  <><span className="text-emerald-600 font-bold">✓</span> Direct implementation evidence identified in resume</>
                ) : (
                  <><span className="text-rose-600 font-bold">✗</span> No direct implementation evidence found in resume</>
                )}
              </div>
              {whyGap.transferable_foundation !== 'None' && (
                <div className="flex items-center gap-1.5 text-blue-800">
                  <span className="text-blue-600 font-bold">→</span> Transferable foundation present: {whyGap.transferable_foundation}
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-200/60 italic">
              {whyGap.summary}
            </p>
          </div>
        )}

        {/* 4. Improve My Evidence Suggestion */}
        {improvementTip && (
          <div className="p-3 rounded bg-blue-50/50 border border-blue-100 text-blue-950 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-900 font-semibold">
              <Lightbulb className="w-3.5 h-3.5 text-blue-700" />
              <span>Improve My Evidence (Resume Writing Tip)</span>
            </div>
            <p className="text-[11px] text-blue-900 leading-relaxed">
              {improvementTip}
            </p>
          </div>
        )}

        <div className="pt-2 flex justify-between items-center text-[11px] text-slate-500 font-mono">
          <span>Non-Hiring Career Guidance</span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-sans font-medium hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};
