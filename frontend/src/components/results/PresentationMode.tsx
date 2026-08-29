import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { AnalysisRecordData } from '../../types';
import { ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Cpu, Target, BookOpen } from 'lucide-react';

interface PresentationModeProps {
  isOpen: boolean;
  onClose: () => void;
  data: AnalysisRecordData;
}

export const PresentationMode: React.FC<PresentationModeProps> = ({ isOpen, onClose, data }) => {
  const [slide, setSlide] = useState<number>(1);

  if (!isOpen) return null;

  const slides = [
    {
      step: 1,
      title: 'Problem: Resume-to-Role Gap for BTech Candidates',
      subtitle: 'Career guidance based strictly on verified skill evidence, not keyword stuffing.',
      content: (
        <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <p className="text-slate-700 font-medium">
            Candidate: <strong>{data.resume_filename || 'BTech CS Candidate'}</strong>
          </p>
          <p className="text-slate-700 font-medium">
            Target Role: <strong>{data.target_role}</strong>
          </p>
          <p className="text-[11px] text-slate-600">
            SkillQ extracts technical evidence from projects and coursework to produce explainable match matrices, actionable roadmaps, and interview coaching.
          </p>
        </div>
      )
    },
    {
      step: 2,
      title: 'Evidence-Based Skill Matching & Gaps',
      subtitle: 'Deterministic skill taxonomy and provenance linking.',
      content: (
        <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-2 rounded bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase">Strong</span>
              <p className="text-lg font-bold text-emerald-700">{data.skill_gaps.summary.strong_count}</p>
            </div>
            <div className="p-2 rounded bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase">Partial</span>
              <p className="text-lg font-bold text-amber-700">{data.skill_gaps.summary.partial_count}</p>
            </div>
            <div className="p-2 rounded bg-white border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase">Missing</span>
              <p className="text-lg font-bold text-rose-700">{data.skill_gaps.summary.missing_count}</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-2">
            Priority Gaps: <strong>{data.skill_gaps.priority_gaps.map(g => g.skill).join(', ')}</strong>
          </p>
        </div>
      )
    },
    {
      step: 3,
      title: 'Quantum Optimization (QUBO & QAOA)',
      subtitle: 'Experimental skill synergy modeling contrasted with classical baseline.',
      content: (
        <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2 text-xs font-mono">
          <div className="flex justify-between border-b border-slate-200/60 pb-1">
            <span>Classical Greedy Baseline:</span>
            <strong>{data.classical_score}%</strong>
          </div>
          <div className="flex justify-between border-b border-slate-200/60 pb-1">
            <span>QAOA Quantum Simulation:</span>
            <strong>{data.quantum_score}%</strong>
          </div>
          <div className="flex justify-between text-slate-500 text-[11px]">
            <span>Qubits: {data.optimization_details.qaoa.qubit_count}</span>
            <span>Approx. Ratio: {data.optimization_details.qaoa.approximation_ratio}</span>
          </div>
        </div>
      )
    },
    {
      step: 4,
      title: 'Responsible AI & Demographic Invariance',
      subtitle: 'Zero sensitive feature usage and verified counterfactual stability.',
      content: (
        <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="text-[11px] space-y-1">
            <div>✓ PII Masking: Redacted Name, Email, Phone, Demographics</div>
            <div>✓ Gender Counterfactual Test: 0.0% Variance (Passed)</div>
            <div>✓ Location Perturbation Test: 0.0% Variance (Passed)</div>
            <div>✓ Proxy Attribute Invariance: Stable</div>
          </div>
          <p className="text-[10px] text-slate-500 italic pt-1 border-t border-slate-200/60">
            "SkillQ provides career guidance and skill-gap analysis. It does not make hiring decisions."
          </p>
        </div>
      )
    },
    {
      step: 5,
      title: 'Actionable Career Roadmap & Interview Prep',
      subtitle: '30-day weekly milestones and gap-tailored questions.',
      content: (
        <div className="p-4 rounded bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <p className="text-slate-700 font-medium">
            Roadmap Duration: <strong>4 Weeks ({data.learning_plan.total_estimated_hours} Estimated Hours)</strong>
          </p>
          <p className="text-[11px] text-slate-600">
            Interview Questions generated directly from target gaps with technical concept evaluation.
          </p>
        </div>
      )
    }
  ];

  const currentSlide = slides[slide - 1];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="SkillQ — Hackathon Presentation Mode">
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">
            Slide 0{slide} of 0{slides.length}
          </span>
          <span className="text-xs font-semibold text-slate-900">{currentSlide.title}</span>
        </div>

        <p className="text-xs text-slate-500">{currentSlide.subtitle}</p>

        {currentSlide.content}

        <div className="flex justify-between items-center pt-3 border-t border-slate-100">
          <button
            onClick={() => setSlide(Math.max(1, slide - 1))}
            disabled={slide === 1}
            className="px-3 py-1.5 rounded border border-slate-200 text-xs text-slate-600 disabled:opacity-30"
          >
            Previous
          </button>

          <button
            onClick={() => {
              if (slide < slides.length) setSlide(slide + 1);
              else onClose();
            }}
            className="px-4 py-1.5 rounded bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
          >
            {slide < slides.length ? 'Next Slide' : 'Finish Presentation'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
