import React from 'react';
import { InterviewEvaluation } from '../../types';
import { CheckCircle2, AlertCircle, Sparkles, Award } from 'lucide-react';

interface EvaluationFeedbackProps {
  evaluation: InterviewEvaluation;
}

export const EvaluationFeedback: React.FC<EvaluationFeedbackProps> = ({ evaluation }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-600" />
          <h4 className="text-sm font-semibold text-slate-900">AI Interview Evaluation & Rubric</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-900">
            Score: {evaluation.overall_score}/100
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            {evaluation.grade}
          </span>
        </div>
      </div>

      {/* Strengths */}
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-emerald-700 flex items-center gap-1 mb-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> Strengths Identified:
        </span>
        <ul className="text-xs text-slate-700 space-y-1 bg-emerald-50/40 p-3 rounded border border-emerald-100">
          {evaluation.strengths.map((s, i) => (
            <li key={i}>• {s}</li>
          ))}
        </ul>
      </div>

      {/* Missing Concepts */}
      <div>
        <span className="text-[11px] font-mono uppercase font-bold text-amber-700 flex items-center gap-1 mb-1">
          <AlertCircle className="w-3.5 h-3.5" /> Key Concepts to Include:
        </span>
        <ul className="text-xs text-slate-700 space-y-1 bg-amber-50/40 p-3 rounded border border-amber-100">
          {evaluation.missing_concepts.map((m, i) => (
            <li key={i}>• {m}</li>
          ))}
        </ul>
      </div>

      {/* Technical Accuracy & Recommendation */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <span className="font-semibold text-slate-800 block mb-1">Technical Assessment:</span>
          <p className="text-slate-600 text-[11px]">{evaluation.technical_accuracy}</p>
        </div>
        <div>
          <span className="font-semibold text-slate-800 block mb-1">Actionable Coaching Tip:</span>
          <p className="text-slate-600 text-[11px]">{evaluation.suggested_improvement}</p>
        </div>
      </div>
    </div>
  );
};
