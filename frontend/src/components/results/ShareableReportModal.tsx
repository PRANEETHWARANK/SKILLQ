import React from 'react';
import { Modal } from '../common/Modal';
import { AnalysisRecordData } from '../../types';
import { Printer, Download } from 'lucide-react';

export const ShareableReportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  data: AnalysisRecordData;
}> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="SkillQ Career Analysis — Student & Counselor Report">
      <div className="space-y-4 text-xs">
        <div className="p-4 rounded border border-slate-200 bg-slate-50 space-y-2">
          <div className="flex justify-between items-center border-b border-slate-200/60 pb-2">
            <div>
              <h4 className="text-base font-bold text-slate-900">Career Gap & Skill Alignment Summary</h4>
              <p className="text-[11px] text-slate-500">Target Role: {data.target_role}</p>
            </div>
            <span className="font-mono text-lg font-bold text-slate-900">
              {data.overall_match_score}%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
            <div>
              <strong>Verified Strong Competencies:</strong>
              <p className="text-slate-600 mt-0.5">
                {data.skill_gaps.strong_skills.map(s => s.skill).join(', ') || 'Foundational Software Engineering'}
              </p>
            </div>
            <div>
              <strong>Priority Growth Areas:</strong>
              <p className="text-slate-600 mt-0.5">
                {data.skill_gaps.priority_gaps.map(g => g.skill).join(', ')}
              </p>
            </div>
          </div>
        </div>

        <div>
          <span className="font-mono font-bold text-[10px] text-slate-400 uppercase block mb-1">
            Recommended 30-Day Plan Focus:
          </span>
          <div className="space-y-1.5">
            {data.learning_plan.weeks.map(w => (
              <div key={w.week_number} className="p-2 rounded bg-slate-50 border border-slate-200 flex justify-between">
                <span><strong>Week 0{w.week_number}:</strong> {w.title}</span>
                <span className="font-mono text-slate-500">~{w.estimated_hours} hrs</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-500">
          <strong>Responsible AI Notice:</strong> Evaluated strictly on technical skills and evidence without personal identifiers. Does not constitute an employment decision.
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded border border-slate-300 text-slate-700 text-xs flex items-center gap-1 hover:bg-slate-50"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save as PDF
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
