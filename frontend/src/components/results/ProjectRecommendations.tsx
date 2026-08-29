import React from 'react';
import { FolderGit2, AlertTriangle, Sparkles } from 'lucide-react';

interface ProjectRec {
  project_title: string;
  target_gap_skill: string;
  difficulty: string;
  skills_demonstrated: string[];
  description: string;
  deliverable: string;
}

interface DoNotLearn {
  skill: string;
  reason: string;
  action: string;
}

export const ProjectRecommendations: React.FC<{
  projects?: ProjectRec[];
  doNotLearn?: DoNotLearn[];
}> = ({ projects = [], doNotLearn = [] }) => {
  return (
    <div className="space-y-4">
      {/* Recommended Projects */}
      {projects.length > 0 && (
        <div className="bg-white rounded border border-slate-200 p-4">
          <div className="pb-3 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5 text-blue-700" />
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Targeted Portfolio Project Recommendations
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Practical portfolio builds designed to generate verifiable proof-of-work for priority gaps.
            </p>
          </div>

          <div className="space-y-3 mt-3">
            {projects.map((p, i) => (
              <div key={i} className="p-3 rounded bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{p.project_title}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
                    Gap: {p.target_gap_skill}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600">{p.description}</p>
                <div className="pt-1 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>Stack: {p.skills_demonstrated.join(' • ')}</span>
                  <span className="text-slate-700 font-semibold">{p.deliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* "Do Not Learn This Yet" Feature (Section 94) */}
      {doNotLearn.length > 0 && (
        <div className="bg-white rounded border border-slate-200 p-4">
          <div className="pb-2 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              "Do Not Prioritize Yet" (Out-of-Scope Gaps)
            </h3>
            <p className="text-[11px] text-slate-500">
              Prevents student engineers from wasting preparation time on senior/out-of-scope technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
            {doNotLearn.map((d, i) => (
              <div key={i} className="p-2.5 rounded bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-slate-800 block">{d.skill}</span>
                <p className="text-[11px] text-slate-600 mt-1">{d.reason}</p>
                <span className="text-[10px] font-mono text-slate-400 block mt-1.5">Guidance: {d.action}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
