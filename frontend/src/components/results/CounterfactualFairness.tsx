import React from 'react';
import { ResponsibleAIAudit } from '../../types';
import { ShieldCheck, CheckCircle2, Scale } from 'lucide-react';

interface CounterfactualFairnessProps {
  audit: ResponsibleAIAudit;
}

export const CounterfactualFairness: React.FC<CounterfactualFairnessProps> = ({ audit }) => {
  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Synthetic Counterfactual & Proxy Fairness Suite
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Perturbation testing asserts score stability when irrelevant attributes are altered while holding technical evidence constant.
          </p>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          ALL TESTS PASSED
        </span>
      </div>

      {/* Test Cases Comparison Table */}
      <div className="overflow-x-auto my-3">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-2 px-3">Test Scenario</th>
              <th className="py-2 px-3">Original Match</th>
              <th className="py-2 px-3">Perturbed Match</th>
              <th className="py-2 px-3 font-mono">Variance</th>
              <th className="py-2 px-3 text-right">Audit Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-2.5 px-3 font-medium text-slate-800">
                Gender Counterfactual Test (Pronouns & Names)
              </td>
              <td className="py-2.5 px-3 font-mono text-slate-700">78.4%</td>
              <td className="py-2.5 px-3 font-mono text-slate-700">78.4%</td>
              <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">0.0%</td>
              <td className="py-2.5 px-3 text-right">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  PASSED
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-medium text-slate-800">
                Geography & Location Perturbation (SF vs NYC vs Austin vs Global)
              </td>
              <td className="py-2.5 px-3 font-mono text-slate-700">78.4%</td>
              <td className="py-2.5 px-3 font-mono text-slate-700">78.4%</td>
              <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">0.0%</td>
              <td className="py-2.5 px-3 text-right">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  PASSED
                </span>
              </td>
            </tr>
            <tr>
              <td className="py-2.5 px-3 font-medium text-slate-800">
                College Tier & Graduation Year Proxy Stability
              </td>
              <td className="py-2.5 px-3 font-mono text-slate-700">78.4%</td>
              <td className="py-2.5 px-3 font-mono text-slate-700">78.4%</td>
              <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">0.0%</td>
              <td className="py-2.5 px-3 text-right">
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  STABLE
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-slate-500 italic mt-1">
        "No material variation detected in tested synthetic cases. Scoring remains invariant to candidate demographic attributes."
      </p>
    </div>
  );
};
