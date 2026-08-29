import React from 'react';
import { BookOpen, ShieldCheck, Cpu, Target, FileText, CheckCircle2 } from 'lucide-react';

export const MethodologyPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      <div>
        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
          Technical Architecture & Research
        </span>
        <h1 className="text-3xl font-bold text-slate-900 mt-1">
          SkillQ Methodology & Algorithm Design
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          Comprehensive explanation of the evidence-matching pipeline, QUBO Hamiltonian formulation, QAOA quantum simulation, and Responsible AI governance.
        </p>
      </div>

      {/* 1. Evidence-First Matching */}
      <div className="bg-white p-5 rounded border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-blue-700" />
          <h2 className="text-sm font-bold text-slate-900">1. Evidence-First Matching Model</h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Unlike generic keyword scanners, SkillQ parses resumes into structured entities (projects, professional experience, coursework, credentials) and links each role requirement to verifiable contextual snippets.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
          <div className="p-2 rounded bg-emerald-50 border border-emerald-200">
            <strong>Strong (≥0.85):</strong> Direct project/work code
          </div>
          <div className="p-2 rounded bg-amber-50 border border-amber-200">
            <strong>Partial (0.50–0.84):</strong> Basic competency list
          </div>
          <div className="p-2 rounded bg-orange-50 border border-orange-200">
            <strong>Weak (0.20–0.49):</strong> Related foundation only
          </div>
          <div className="p-2 rounded bg-rose-50 border border-rose-200">
            <strong>Missing (&lt;0.20):</strong> No evidence found
          </div>
        </div>
      </div>

      {/* 2. QUBO & QAOA Optimization */}
      <div className="bg-white p-5 rounded border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-indigo-700" />
          <h2 className="text-sm font-bold text-slate-900">2. QUBO Formulation & QAOA Simulation</h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The skill-to-role matching problem is modeled as Quadratic Unconstrained Binary Optimization (QUBO) maximizing linear requirement utility and quadratic pairwise skill synergies:
        </p>
        <div className="p-3 bg-slate-50 rounded border border-slate-200 font-mono text-xs text-slate-800">
          Maximize: H(x) = ∑ cᵢ xᵢ + ∑ Jᵢⱼ xᵢ xⱼ - P(budget)
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Solved using parameterized variational quantum circuits simulated via Qiskit Aer statevector evolution, measuring approximation ratios against greedy classical heuristics.
        </p>
      </div>

      {/* 3. Responsible AI & Non-Hiring Governance */}
      <div className="bg-white p-5 rounded border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <h2 className="text-sm font-bold text-slate-900">3. Non-Hiring Governance & Decision Support</h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          SkillQ operates strictly as personal career intelligence. It enforces zero demographic feature usage and verifies 0.0% variance across counterfactual perturbation test suites.
        </p>
      </div>

      <div className="pt-2">
        <button
          onClick={() => onNavigate('/analyze')}
          className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800"
        >
          Launch Analysis Workspace
        </button>
      </div>
    </div>
  );
};
