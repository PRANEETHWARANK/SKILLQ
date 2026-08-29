import React from 'react';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

interface ProcessingTimelineProps {
  currentStage: number; // 1 to 6
}

const STAGES = [
  'Reading resume & document parsing',
  'Extracting skills & verifying taxonomy',
  'Analyzing job requirements & criteria',
  'Building evidence matching matrix',
  'Formulating QUBO & running QAOA optimization',
  'Synthesizing insights & 30-day roadmap',
];

export const ProcessingTimeline: React.FC<ProcessingTimelineProps> = ({ currentStage }) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm max-w-lg w-full mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-base font-semibold text-slate-900">Analyzing Experience & Skill Evidence</h3>
        <p className="text-xs text-slate-500 mt-1">
          Running deterministic skill extraction, responsible AI redaction, and QAOA statevector simulation.
        </p>
      </div>

      <div className="space-y-4">
        {STAGES.map((stage, idx) => {
          const stageNum = idx + 1;
          const isDone = currentStage > stageNum;
          const isCurrent = currentStage === stageNum;
          const isPending = currentStage < stageNum;

          return (
            <div key={stage} className="flex items-center gap-3">
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <span
                className={`text-xs font-medium ${
                  isDone
                    ? 'text-slate-800 line-through decoration-slate-300'
                    : isCurrent
                    ? 'text-blue-900 font-semibold'
                    : 'text-slate-400'
                }`}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
