import React from 'react';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold">
              Q
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">
                SkillQ — Quantum-Powered Skill Intelligence & Career Coach
              </p>
              <p className="text-[11px] text-slate-500">
                "One AI Ranks. One AI Checks. You Decide."
              </p>
            </div>
          </div>

          {/* Ethical Disclaimer Callout */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 max-w-md">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              SkillQ provides evidence-backed career guidance. The final decision remains with the human.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <button onClick={() => onNavigate('/evaluation')} className="hover:text-slate-900 transition-colors">
              Benchmarks
            </button>
            <button onClick={() => onNavigate('/responsible-ai')} className="hover:text-slate-900 transition-colors">
              Responsible AI
            </button>
            <button onClick={() => onNavigate('/analyze')} className="hover:text-slate-900 transition-colors">
              Workspace
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
