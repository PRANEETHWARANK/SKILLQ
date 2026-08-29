import React from 'react';
import { ArrowRight, ShieldCheck, Cpu, Target, BookOpen, Layers } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
  onRunDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onRunDemo }) => {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700 mb-5">
          Quantum Skill Intelligence & Career Coach
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
          Understand where your skills stand. <br className="hidden sm:inline" />
          Know what to learn next.
        </h1>

        <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          SkillQ analyzes your resume against a target role using evidence-based skill matching, responsible AI checks, and experimental quantum optimization.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            onClick={() => onNavigate('/analyze')}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors flex items-center justify-center gap-1.5"
          >
            Analyze My Resume
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRunDemo}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded border border-slate-300 transition-colors"
          >
            See How It Works (Sample Demo)
          </button>
        </div>

        {/* Dashboard Visualization */}
        <div className="mt-12 bg-white rounded border border-slate-200 p-4 text-left shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs font-mono text-slate-500">
            <span>SkillQ Evaluation Snapshot</span>
            <span>Target: AI Engineer</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Overall Match</span>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-0.5">78.4%</p>
              <p className="text-[11px] text-emerald-700 mt-0.5">Strong Alignment</p>
            </div>
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Classical Baseline</span>
              <p className="text-2xl font-bold font-mono text-slate-800 mt-0.5">71.4%</p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">Linear Weighting</p>
            </div>
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 uppercase">QAOA Optimized</span>
              <p className="text-2xl font-bold font-mono text-slate-900 mt-0.5">76.2%</p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5">12-Qubit QUBO</p>
            </div>
          </div>
        </div>
      </section>

      {/* How SkillQ Works (4 Steps) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-slate-200">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Process</span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">How SkillQ Works</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded border border-slate-200 bg-white">
            <span className="text-[11px] font-mono font-bold text-slate-400">01</span>
            <h3 className="text-xs font-bold text-slate-900 mt-1">Upload Resume</h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Extract skills, experience, projects, education, and evidence from PDF/DOCX/TXT.
            </p>
          </div>

          <div className="p-4 rounded border border-slate-200 bg-white">
            <span className="text-[11px] font-mono font-bold text-slate-400">02</span>
            <h3 className="text-xs font-bold text-slate-900 mt-1">Add Target Role</h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Extract required and preferred skills from the job description.
            </p>
          </div>

          <div className="p-4 rounded border border-slate-200 bg-white">
            <span className="text-[11px] font-mono font-bold text-slate-400">03</span>
            <h3 className="text-xs font-bold text-slate-900 mt-1">Analyze Skill Evidence</h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Formulate the evidence matching matrix and solve with Classical + QAOA optimization.
            </p>
          </div>

          <div className="p-4 rounded border border-slate-200 bg-white">
            <span className="text-[11px] font-mono font-bold text-slate-400">04</span>
            <h3 className="text-xs font-bold text-slate-900 mt-1">Build Your Career Roadmap</h3>
            <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
              Turn priority gaps into an actionable 30-day plan and gap-focused interview prep.
            </p>
          </div>
        </div>
      </section>

      {/* Why SkillQ (4 Restrained Feature Blocks) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-slate-200">
        <div className="text-center mb-8">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Design</span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">Why SkillQ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded border border-slate-200 bg-white">
            <h3 className="text-xs font-bold text-slate-900">Evidence First</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Every matched skill is supported by verifiable resume evidence in projects or work history.
            </p>
          </div>

          <div className="p-4 rounded border border-slate-200 bg-white">
            <h3 className="text-xs font-bold text-slate-900">Responsible AI</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Personal information unrelated to skills is excluded from scoring to ensure unbiased analysis.
            </p>
          </div>

          <div className="p-4 rounded border border-slate-200 bg-white">
            <h3 className="text-xs font-bold text-slate-900">Quantum Optimization</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              QAOA is used experimentally to optimize skill-role matching and synergy allocation.
            </p>
          </div>

          <div className="p-4 rounded border border-slate-200 bg-white">
            <h3 className="text-xs font-bold text-slate-900">Career Growth</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Skill gaps become an actionable 30-day learning plan and realistic interview coaching.
            </p>
          </div>
        </div>
      </section>

      {/* From Resume to Roadmap Pipeline */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-slate-200 text-center">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Architecture</span>
        <h2 className="text-sm font-bold text-slate-900 mt-0.5 mb-4">From Resume to Roadmap</h2>
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">Resume</span>
          <span className="text-slate-400">→</span>
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">Skill Evidence</span>
          <span className="text-slate-400">→</span>
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">Role Match</span>
          <span className="text-slate-400">→</span>
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">Skill Gaps</span>
          <span className="text-slate-400">→</span>
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">Learning Plan</span>
          <span className="text-slate-400">→</span>
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200">Interview Prep</span>
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="p-6 rounded border border-slate-200 bg-white">
          <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-2" />
          <h2 className="text-sm font-bold text-slate-900">Designed for Career Decisions, Not Hiring Decisions</h2>
          <p className="text-xs text-slate-600 max-w-lg mx-auto mt-1 leading-relaxed">
            SkillQ provides evidence-backed career guidance. The final decision remains with the human.
          </p>
        </div>
      </section>
    </div>
  );
};
