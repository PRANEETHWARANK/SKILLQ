import React from 'react';
import { QAOAConvergencePoint } from '../../types';

interface QAOAConvergenceChartProps {
  convergencePoints?: QAOAConvergencePoint[];
  classicalObjective: number;
}

export const QAOAConvergenceChart: React.FC<QAOAConvergenceChartProps> = ({
  convergencePoints = [],
  classicalObjective,
}) => {
  if (!convergencePoints || convergencePoints.length === 0) return null;

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="pb-3 border-b border-slate-100">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
          QAOA Parameter Optimization & Energy Convergence
        </h3>
        <p className="text-[11px] text-slate-500">
          Variational statevector optimization tracking expected objective across grid parameters (γ, β).
        </p>
      </div>

      <div className="overflow-x-auto mt-3">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-mono uppercase text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-2 px-3">Iteration</th>
              <th className="py-2 px-3">Gamma (γ)</th>
              <th className="py-2 px-3">Beta (β)</th>
              <th className="py-2 px-3 font-mono">QAOA Expected Energy</th>
              <th className="py-2 px-3 font-mono">Classical Mean</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {convergencePoints.map((pt) => (
              <tr key={pt.iteration} className="hover:bg-slate-50">
                <td className="py-2 px-3 font-mono font-bold text-slate-700">0{pt.iteration}</td>
                <td className="py-2 px-3 font-mono text-slate-600">{pt.gamma}</td>
                <td className="py-2 px-3 font-mono text-slate-600">{pt.beta}</td>
                <td className="py-2 px-3 font-mono font-bold text-indigo-950 tabular-nums">
                  {pt.expected_objective.toFixed(3)}
                </td>
                <td className="py-2 px-3 font-mono text-slate-500 tabular-nums">
                  {pt.classical_baseline.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
