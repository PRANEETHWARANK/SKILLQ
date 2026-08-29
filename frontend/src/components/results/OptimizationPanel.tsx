import React from 'react';
import { OptimizationPayload } from '../../types';
import { Cpu, AlertCircle } from 'lucide-react';

interface OptimizationPanelProps {
  optimization: OptimizationPayload;
}

export const OptimizationPanel: React.FC<OptimizationPanelProps> = ({ optimization }) => {
  const { classical, qaoa } = optimization;

  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-slate-700" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Optimization Analysis (QUBO & QAOA)
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Formulation and simulation of Quadratic Unconstrained Binary Optimization (QUBO) on candidate skill synergies.
        </p>
      </div>

      {/* 5-Step Process */}
      <div className="my-3 grid grid-cols-1 sm:grid-cols-5 gap-2">
        {qaoa.pipeline_steps.map((step) => (
          <div key={step.step} className="p-2.5 rounded bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-slate-400">0{step.step}</span>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">{step.title}</p>
            </div>
            <p className="text-[10px] text-slate-500 mt-1.5 leading-snug">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3">
        <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Qubits</span>
          <p className="text-base font-bold font-mono text-slate-900">{qaoa.qubit_count}</p>
        </div>
        <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Circuit Depth</span>
          <p className="text-base font-bold font-mono text-slate-900">p = {qaoa.circuit_depth}</p>
        </div>
        <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Approx. Ratio</span>
          <p className="text-base font-bold font-mono text-slate-900">{qaoa.approximation_ratio}</p>
        </div>
        <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-mono text-slate-500 uppercase">Optimal Bitstring</span>
          <p className="text-xs font-mono font-bold text-slate-800 truncate mt-1">|{qaoa.optimal_bitstring}&gt;</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="p-2.5 rounded bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
        <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-amber-800">
          {qaoa.disclaimer}
        </p>
      </div>
    </div>
  );
};
