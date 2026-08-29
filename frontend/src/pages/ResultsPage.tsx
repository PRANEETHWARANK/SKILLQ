import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { AnalysisRecordData, SkillMatchItem } from '../types';
import { ScoreComparison } from '../components/results/ScoreComparison';
import { Top3ActionsPanel } from '../components/results/Top3ActionsPanel';
import { SkillMatrix } from '../components/results/SkillMatrix';
import { SkillGapList } from '../components/results/SkillGapList';
import { EvidenceGraph } from '../components/results/EvidenceGraph';
import { SkillRadarChart } from '../components/results/SkillRadarChart';
import { SkillGapHeatmap } from '../components/results/SkillGapHeatmap';
import { ReadinessTrajectory } from '../components/results/ReadinessTrajectory';
import { SkillDependencyGraph } from '../components/results/SkillDependencyGraph';
import { SkillBridgePanel } from '../components/results/SkillBridgePanel';
import { ResumeQualityAudit } from '../components/results/ResumeQualityAudit';
import { MultiRoleComparison } from '../components/results/MultiRoleComparison';
import { ProjectRecommendations } from '../components/results/ProjectRecommendations';
import { OptimizationPanel } from '../components/results/OptimizationPanel';
import { QAOAConvergenceChart } from '../components/results/QAOAConvergenceChart';
import { ResponsibleAIAuditPanel } from '../components/results/ResponsibleAIAudit';
import { CounterfactualFairness } from '../components/results/CounterfactualFairness';
import { ExplainabilityPanel } from '../components/results/ExplainabilityPanel';
import { EvidenceDetailModal } from '../components/results/EvidenceDetailModal';
import { PresentationMode } from '../components/results/PresentationMode';
import { ShareableReportModal } from '../components/results/ShareableReportModal';
import { Loader2, BookOpen, MessageSquareCode, Presentation, FileDown } from 'lucide-react';

interface ResultsPageProps {
  analysisId: string;
  onNavigate: (path: string) => void;
}

export const ResultsPage: React.FC<ResultsPageProps> = ({ analysisId, onNavigate }) => {
  const [data, setData] = useState<AnalysisRecordData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<SkillMatchItem | null>(null);
  const [presentationOpen, setPresentationOpen] = useState<boolean>(false);
  const [reportOpen, setReportOpen] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await apiClient.getAnalysisResults(analysisId);
        if (isMounted) setData(res);
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Failed to load analysis results');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchResults();
    return () => { isMounted = false; };
  }, [analysisId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-slate-800" />
        <p className="text-xs font-mono text-slate-500">Loading analysis results...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded border border-slate-200 text-center">
        <p className="text-sm font-semibold text-rose-700">{error || 'No analysis data found'}</p>
        <button
          onClick={() => onNavigate('/analyze')}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium"
        >
          Return to Workspace
        </button>
      </div>
    );
  }

  const adv = data.advanced_analytics as any;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{data.target_role}</h1>
            {data.is_demo && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                DEMO ANALYSIS
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {data.target_company ? `${data.target_company} • ` : ''}
            Analyzed {new Date(data.created_at).toLocaleDateString()} • Resume: {data.resume_filename || 'Sanitized Resume'}
          </p>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setPresentationOpen(true)}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded border border-slate-300 transition-colors flex items-center gap-1.5"
            title="Judge Walkthrough Mode"
          >
            <Presentation className="w-3.5 h-3.5 text-slate-700" />
            Presentation Mode
          </button>
          <button
            onClick={() => setReportOpen(true)}
            className="px-2.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded border border-slate-300 transition-colors flex items-center gap-1.5"
            title="Export Career Report"
          >
            <FileDown className="w-3.5 h-3.5 text-slate-700" />
            Export Report
          </button>
          <button
            onClick={() => onNavigate(`/learning/${data.id}`)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded shadow-xs transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            30-Day Learning Plan
          </button>
          <button
            onClick={() => onNavigate(`/interview/${data.id}`)}
            className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded border border-slate-300 transition-colors flex items-center gap-1.5"
          >
            <MessageSquareCode className="w-3.5 h-3.5" />
            Interview Coach
          </button>
        </div>
      </div>

      {/* 1. Score Overview with Hybrid Match Breakdown & ML Specialization */}
      <ScoreComparison
        optimization={data.optimization_details}
        overallScore={data.overall_match_score}
        alignmentStatus={data.alignment_status}
        hybridBreakdown={adv?.hybrid_score_breakdown}
        mlPrediction={adv?.ml_specialization_prediction}
      />

      {/* 2. Top 3 Next Actions */}
      <Top3ActionsPanel actions={adv?.top_3_actions} />

      {/* 3. Signature Feature #1: Interactive Evidence Graph */}
      {adv?.evidence_graph && (
        <EvidenceGraph chains={adv.evidence_graph} targetRole={data.target_role} />
      )}

      {/* 4. Skill Radar & Domain Breakdown */}
      {adv?.skill_radar && (
        <SkillRadarChart radarData={adv.skill_radar} />
      )}

      {/* 5. Skill Matching Matrix (Clickable rows with Provenance Modal) */}
      <SkillMatrix
        skills={data.skill_matches}
        onSelectSkill={(skill) => setSelectedSkill(skill)}
      />

      {/* 6. Skill Dependency Graph & Skill Bridge Panel */}
      {adv?.dependency_graph && (
        <SkillDependencyGraph chains={adv.dependency_graph} />
      )}

      {adv?.skill_bridges && (
        <SkillBridgePanel bridges={adv.skill_bridges} />
      )}

      {/* 7. Skill Gap Intensity Heatmap & Priority List */}
      {adv?.skill_heatmap && (
        <SkillGapHeatmap heatmapData={adv.skill_heatmap} />
      )}

      <SkillGapList
        skillGaps={data.skill_gaps}
        onNavigateToLearning={() => onNavigate(`/learning/${data.id}`)}
      />

      {/* 8. Targeted Portfolio Projects & "Do Not Learn Yet" */}
      <ProjectRecommendations
        projects={adv?.project_recommendations}
        doNotLearn={adv?.do_not_learn_yet}
      />

      {/* 9. Signature Feature #3: Readiness Trajectory */}
      {adv?.readiness_trajectory && (
        <ReadinessTrajectory milestones={adv.readiness_trajectory} />
      )}

      {/* 10. Multi-Role Adjacent Specialization Explorer */}
      {adv?.multi_role_comparison && (
        <MultiRoleComparison rolesData={adv.multi_role_comparison} />
      )}

      {/* 11. Resume Quality & Specificity Audit */}
      {adv?.resume_quality_audit && (
        <ResumeQualityAudit auditData={adv.resume_quality_audit} />
      )}

      {/* 12. Explainability Panel (WHAT, WHY, EVIDENCE, WHAT NEXT) */}
      <ExplainabilityPanel explainability={data.explainability} />

      {/* 13. Quantum Optimization & QAOA Convergence */}
      <OptimizationPanel optimization={data.optimization_details} />
      <QAOAConvergenceChart
        convergencePoints={data.optimization_details.qaoa.convergence_curve}
        classicalObjective={data.optimization_details.classical.objective_value}
      />

      {/* 14. Responsible AI Audit & Counterfactual Suite */}
      <ResponsibleAIAuditPanel audit={data.responsible_ai_audit} />
      <CounterfactualFairness audit={data.responsible_ai_audit} />

      {/* Modals */}
      <EvidenceDetailModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />

      <PresentationMode
        isOpen={presentationOpen}
        onClose={() => setPresentationOpen(false)}
        data={data}
      />

      <ShareableReportModal
        isOpen={reportOpen}
        onClose={() => setReportOpen(false)}
        data={data}
      />
    </div>
  );
};
