import React from 'react';
import { InterviewQuestion } from '../../types';
import { MessageSquareCode, HelpCircle, ArrowRight } from 'lucide-react';

interface InterviewQuestionCardProps {
  question: InterviewQuestion;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export const InterviewQuestionCard: React.FC<InterviewQuestionCardProps> = ({
  question,
  index,
  isSelected,
  onSelect,
}) => {
  const categoryStyles = {
    Technical: 'bg-blue-50 text-blue-700 border-blue-200',
    Project: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Skill Gap': 'bg-rose-50 text-rose-700 border-rose-200',
    Scenario: 'bg-amber-50 text-amber-700 border-amber-200',
  }[question.category] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-lg border cursor-pointer transition-all ${
        isSelected
          ? 'bg-white border-slate-900 ring-1 ring-slate-900 shadow-sm'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono font-bold text-slate-400">Q0{index + 1}</span>
          <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded border ${categoryStyles}`}>
            {question.category}
          </span>
        </div>
        <span className="text-xs font-semibold text-slate-700">{question.skill}</span>
      </div>

      <h4 className="text-xs font-medium text-slate-900 leading-snug">
        {question.question}
      </h4>

      <p className="text-[11px] text-slate-500 mt-2 line-clamp-1">
        {question.context}
      </p>
    </div>
  );
};
