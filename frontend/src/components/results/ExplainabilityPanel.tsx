import React, { useState } from 'react';
import { ExplainabilityPayload } from '../../types';

interface ExplainabilityPanelProps {
  explainability: ExplainabilityPayload;
}

export const ExplainabilityPanel: React.FC<ExplainabilityPanelProps> = ({ explainability }) => {
  const [activeTab, setActiveTab] = useState<'what' | 'why' | 'evidence' | 'what_next'>('what');

  const tabs = [
    { key: 'what', label: 'WHAT?', title: explainability.what.question },
    { key: 'why', label: 'WHY?', title: explainability.why.question },
    { key: 'evidence', label: 'EVIDENCE?', title: explainability.evidence.question },
    { key: 'what_next', label: 'WHAT NEXT?', title: explainability.what_next.question },
  ];

  const current = explainability[activeTab];

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="pb-2.5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Explain This Result</h3>
          <p className="text-[11px] text-slate-500">Transparent rationale behind the score and recommendations.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 mt-2.5">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key as any)}
            className={`pb-1.5 px-2.5 text-xs font-medium border-b-2 transition-colors ${
              activeTab === t.key
                ? 'border-slate-900 text-slate-900 font-semibold'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-3">
        <h4 className="text-[11px] font-mono font-bold text-slate-400 uppercase">
          {current.question}
        </h4>
        <p className="text-xs font-semibold text-slate-900 my-1">
          {current.summary}
        </p>
        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
          {current.details}
        </p>
      </div>
    </div>
  );
};
