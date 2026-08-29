import React from 'react';
import { ShieldCheck, EyeOff, UserX, Scale, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const ResponsibleAiPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      <div>
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
          Ethics & Governance
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">
          Responsible AI Architecture in SkillQ
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          SkillQ is engineered strictly as career intelligence and personal development decision support for students and engineers.
        </p>
      </div>

      {/* Core Principle Callout */}
      <div className="p-5 rounded-lg bg-slate-900 text-white shadow-sm space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
          Core Governance Philosophy
        </span>
        <h2 className="text-lg font-bold">
          "One AI Ranks. One AI Checks. You Decide."
        </h2>
        <p className="text-xs text-slate-300 leading-relaxed">
          SkillQ provides evidence-backed career guidance. The final decision remains with the human. The system must never present itself as a hiring or candidate-rejection system.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Governance Pillars</h3>

        <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-emerald-600" />
            <h4 className="text-sm font-semibold text-slate-900">1. Strict PII Redaction & Sanitization</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Prior to evaluating skills or constructing mathematical matrices, personal identifiers (candidate names, emails, phone numbers, home addresses, and personal profile URLs) are redacted.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <UserX className="w-4 h-4 text-blue-600" />
            <h4 className="text-sm font-semibold text-slate-900">2. Irrelevant Feature Exclusion</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Non-competency attributes such as demographic indicators, graduation years (age proxies), gender, and geographic addresses are completely excluded from scoring functions.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-600" />
            <h4 className="text-sm font-semibold text-slate-900">3. Demographic Perturbation Audits</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            SkillQ executes automated perturbation testing across identical resumes with perturbed demographic attributes to guarantee score invariance (0.0% variance).
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-semibold text-slate-900">4. Transparent Non-Hiring Decision Support</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            SkillQ empowers candidates with actionable roadmaps rather than automated gating. Algorithmic outputs are fully explainable via our "What? Why? Evidence? What Next?" matrix.
          </p>
        </div>
      </div>

      <div className="pt-4 flex justify-between items-center">
        <button
          onClick={() => onNavigate('/analyze')}
          className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800"
        >
          Try Resume Analysis Workspace
        </button>
      </div>
    </div>
  );
};
