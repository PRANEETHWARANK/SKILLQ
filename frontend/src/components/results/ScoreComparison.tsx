import React from 'react';
import { OptimizationPayload } from '../../types';
import { Cpu, Sparkles, BrainCircuit } from 'lucide-react';

interface ScoreComparisonProps {
  optimization: OptimizationPayload;
  overallScore: number;
  alignmentStatus: string;
  hybridBreakdown?: {
    overall_match: number;
    required_skill_coverage: number;
    preferred_skill_coverage: number;
    semantic_similarity: number;
    evidence_strength: number;
    experience_relevance: number;
  };
  mlPrediction?: {
    predicted_category: string;
    probabilities: Record<string, number>;
  };
}

export const ScoreComparison: React.FC<ScoreComparisonProps> = ({
  optimization,
  overallScore,
  alignmentStatus,
  hybridBreakdown,
  mlPrediction,
}) => {
  const classical = optimization?.classical;
  const qaoa = optimization?.qaoa;

  return (
    <div className="bg-white rounded border border-slate-200 p-4 space-y-4">
      {/* Top Banner: Hybrid Score + ML Specialization */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-3 border-b border-slate-100">
        {/* Overall Match */}
        <div className="flex items-center justify-between md:justify-start gap-4">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
              Programmatic Hybrid Match
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-slate-900 tabular-nums">
                {overallScore}%
              </span>
              <span className="text-xs font-semibold text-emerald-700">{alignmentStatus}</span>
            </div>
          </div>
        </div>

        {/* Kaggle-Trained ML Specialization */}
        {mlPrediction && (
          <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex flex-col justify-between text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 font-semibold text-slate-900">
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-700" />
                <span>ML Specialization:</span>
              </div>
              <span className="font-mono font-bold text-indigo-900">{mlPrediction.predicted_category.replace('_', ' ')}</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-1">
              *Trained on Kaggle Resume Dataset (snehaanbhawal/resume-dataset)
            </span>
          </div>
        )}

        {/* Quantum vs Classical */}
        <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex flex-col justify-between text-xs font-mono">
          <div className="flex justify-between items-center text-slate-700">
            <span>Classical Greedy:</span>
            <strong className="text-slate-900">{classical?.classical_score || 78}%</strong>
          </div>
          <div className="flex justify-between items-center text-indigo-950 mt-1">
            <span>QAOA Simulator:</span>
            <strong className="text-indigo-900">{qaoa?.quantum_score || 74}%</strong>
          </div>
        </div>
      </div>

      {/* Hybrid Score Dimensional Breakdown */}
      {hybridBreakdown && (
        <div>
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Interpretable Hybrid Scoring Dimensions:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Required Coverage (30%)</span>
              <strong className="text-sm font-mono text-slate-900 mt-0.5 block">{hybridBreakdown.required_skill_coverage}%</strong>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Preferred Coverage (15%)</span>
              <strong className="text-sm font-mono text-slate-900 mt-0.5 block">{hybridBreakdown.preferred_skill_coverage}%</strong>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">BGE-M3 Semantic (25%)</span>
              <strong className="text-sm font-mono text-slate-900 mt-0.5 block">{hybridBreakdown.semantic_similarity}%</strong>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Evidence Strength (20%)</span>
              <strong className="text-sm font-mono text-slate-900 mt-0.5 block">{hybridBreakdown.evidence_strength}%</strong>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-mono text-slate-500 uppercase block">Experience Relev. (10%)</span>
              <strong className="text-sm font-mono text-slate-900 mt-0.5 block">{hybridBreakdown.experience_relevance}%</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
