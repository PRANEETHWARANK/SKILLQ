import React from 'react';
import { Briefcase, Building2, Sparkles } from 'lucide-react';

interface JobDescriptionInputProps {
  role: string;
  onRoleChange: (val: string) => void;
  company: string;
  onCompanyChange: (val: string) => void;
  jdText: string;
  onJdTextChange: (val: string) => void;
  onLoadPreset: (roleName: string) => void;
}

const PRESET_ROLES = [
  'AI Engineer',
  'Backend Software Engineer',
  'Full-Stack Developer',
  'Data & ML Engineer',
];

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  role,
  onRoleChange,
  company,
  onCompanyChange,
  jdText,
  onJdTextChange,
  onLoadPreset,
}) => {
  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">2. Target Role & Job Description</h2>
          <p className="text-xs text-slate-500">Specify the role requirements and competencies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Target Role Title *
          </label>
          <div className="relative">
            <Briefcase className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={role}
              onChange={(e) => onRoleChange(e.target.value)}
              placeholder="e.g. AI Engineer, Backend Engineer"
              className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Company (Optional)
          </label>
          <div className="relative">
            <Building2 className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={company}
              onChange={(e) => onCompanyChange(e.target.value)}
              placeholder="e.g. Tech Systems Inc."
              className="w-full pl-8 pr-3 py-1.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>
      </div>

      {/* Preset Quick-Fill Buttons */}
      <div className="flex items-center gap-1.5 flex-wrap mb-2">
        <span className="text-[10px] uppercase font-mono font-medium text-slate-400">Presets:</span>
        {PRESET_ROLES.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onLoadPreset(preset)}
            className="text-[11px] px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
          >
            {preset}
          </button>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-1">
          Job Description & Requirements *
        </label>
        <textarea
          value={jdText}
          onChange={(e) => onJdTextChange(e.target.value)}
          placeholder="Paste job description with responsibilities, required skills, and qualifications..."
          className="w-full flex-1 min-h-[160px] p-3 text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900 resize-none"
        />
      </div>
    </div>
  );
};
