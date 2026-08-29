export type MatchStatus = 'Strong' | 'Partial' | 'Weak' | 'Missing';
export type RequirementType = 'Required' | 'Preferred';
export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface EvidenceToAction {
  what: string;
  why: string;
  evidence: string;
  gap: string;
  what_next: string;
}

export interface SkillMatchItem {
  skill: string;
  category: string;
  requirement: RequirementType;
  importance: string;
  candidate_evidence: string;
  evidence_strength: MatchStatus;
  match_status: MatchStatus;
  confidence: number;
  evidence_snippet: string;
  resume_section: string;
  reason: string;
  recommended_action: string;
  relevance_explanation: string;
  evidence_to_action?: EvidenceToAction;
}

export interface PriorityGap {
  skill: string;
  priority: PriorityLevel;
  requirement: RequirementType;
  reason: string;
  recommended_action: string;
}

export interface SkillGapsPayload {
  summary: {
    strong_count: number;
    partial_count: number;
    weak_count: number;
    missing_count: number;
    total_skills: number;
  };
  strong_skills: SkillMatchItem[];
  partial_skills: SkillMatchItem[];
  missing_skills: SkillMatchItem[];
  priority_gaps: PriorityGap[];
}

export interface ExplainabilitySection {
  question: string;
  summary: string;
  details: string;
}

export interface ExplainabilityPayload {
  what: ExplainabilitySection;
  why: ExplainabilitySection;
  evidence: ExplainabilitySection;
  what_next: ExplainabilitySection;
}

export interface PipelineStep {
  step: number;
  title: string;
  desc: string;
}

export interface QAOAConvergencePoint {
  iteration: number;
  gamma: number;
  beta: number;
  expected_objective: number;
  classical_baseline: number;
}

export interface OptimizationPayload {
  classical: {
    classical_score: number;
    objective_value: number;
    total_possible_weight: number;
    execution_time_ms: number;
    matched_count: number;
    total_requirements: number;
    algorithm: string;
  };
  qaoa: {
    quantum_score: number;
    objective_value: number;
    max_qubo_energy: number;
    approximation_ratio: number;
    optimal_bitstring: string;
    gamma_params: number[];
    beta_params: number[];
    qubit_count: number;
    circuit_depth: number;
    gate_count: number;
    shots: number;
    backend: string;
    disclaimer: string;
    execution_time_ms: number;
    pipeline_steps: PipelineStep[];
    convergence_curve?: QAOAConvergencePoint[];
  };
  overall_match_score: number;
  alignment_status: string;
}

export interface CounterfactualTest {
  status: string;
  label: string;
  original_score: number;
  counterfactual_score: number;
  variance: number;
  details: string;
}

export interface ResponsibleAIAudit {
  pii_masking: {
    status: string;
    label: string;
    details: string;
    items_identified: Array<{ type: string; count: number }>;
  };
  irrelevant_feature_exclusion: {
    status: string;
    label: string;
    details: string;
    retained_features: string[];
    excluded_features: string[];
  };
  gender_counterfactual: CounterfactualTest;
  location_counterfactual: CounterfactualTest;
  proxy_attribute_test: {
    status: string;
    label: string;
    variance: number;
    details: string;
  };
  outcome_stability: {
    status: string;
    label: string;
    details: string;
  };
  human_decision_control: {
    status: string;
    label: string;
    notice: string;
  };
  overall_status: string;
  governance_notice: string;
}

export interface LearningTask {
  id: string;
  title: string;
  completed: boolean;
  duration: string;
  resource: string;
}

export interface LearningWeek {
  week_number: number;
  title: string;
  focus_skill: string;
  objective: string;
  estimated_hours: number;
  tasks: LearningTask[];
  milestone: string;
}

export interface LearningPlanPayload {
  target_role: string;
  total_weeks: number;
  total_estimated_hours: number;
  primary_gap_skills: string[];
  weeks: LearningWeek[];
}

export interface InterviewQuestion {
  id: string;
  skill: string;
  category: 'Technical' | 'Project' | 'Skill Gap' | 'Scenario';
  question: string;
  context: string;
  key_points: string[];
}

export interface InterviewEvaluation {
  overall_score: number;
  grade: string;
  strengths: string[];
  missing_concepts: string[];
  technical_accuracy: string;
  suggested_improvement: string;
}

export interface EvidenceGraphChain {
  skill: string;
  category: string;
  requirement: RequirementType;
  match_status: MatchStatus;
  confidence: number;
  flow: Array<{ step: string; value: string }>;
  details: {
    why_gap: string;
    evidence_found: string;
    evidence_missing: string;
    recommended_resource: string;
    related_interview_q: string;
  };
}

export interface SkillRadarItem {
  category: string;
  candidate_evidence: number;
  role_requirement: number;
  gap: number;
}

export interface SkillHeatmapRow {
  skill: string;
  category: string;
  requirement: RequirementType;
  candidate_evidence_score: number;
  role_requirement_score: number;
  gap_score: number;
  priority: PriorityLevel;
  match_status: MatchStatus;
}

export interface ReadinessMilestone {
  milestone: string;
  coverage: number;
  phase: string;
  focus: string;
}

export interface AdvancedAnalytics {
  evidence_graph: EvidenceGraphChain[];
  skill_radar: SkillRadarItem[];
  skill_heatmap: SkillHeatmapRow[];
  readiness_trajectory: ReadinessMilestone[];
}

export interface AnalysisRecordData {
  id: string;
  created_at: string;
  target_role: string;
  target_company?: string;
  resume_filename?: string;
  overall_match_score: number;
  classical_score: number;
  quantum_score: number;
  alignment_status: string;
  extracted_resume: {
    candidate_summary: string;
    skills: string[];
    projects: any[];
    experience: any[];
    education: any[];
    certifications: string[];
  };
  extracted_job: {
    role_title: string;
    required_skills: string[];
    preferred_skills: string[];
    responsibilities: string[];
    summary: string;
  };
  skill_matches: SkillMatchItem[];
  skill_gaps: SkillGapsPayload;
  explainability: ExplainabilityPayload;
  optimization_details: OptimizationPayload;
  responsible_ai_audit: ResponsibleAIAudit;
  learning_plan: LearningPlanPayload;
  interview_prep: InterviewQuestion[];
  advanced_analytics?: AdvancedAnalytics;
  is_demo: boolean;
}

export interface BenchmarkMetrics {
  dataset_info: {
    dataset_name: string;
    synthetic_resumes_count: number;
    job_descriptions_count: number;
    domain_distribution: Array<{ domain: string; count: number; share: string }>;
    data_nature: string;
  };
  extraction_metrics: {
    skill_precision: number;
    skill_recall: number;
    skill_f1: number;
    evidence_coverage_rate: number;
    category_classification_accuracy: number;
  };
  responsible_ai_metrics: {
    pii_redaction_recall: number;
    pii_false_positive_rate: number;
    demographic_perturbation_stability: number;
    bias_audit_pass_rate: string;
    audit_test_cases_evaluated: number;
  };
  optimization_benchmarks: {
    classical_baseline: {
      algorithm: string;
      mean_objective: number;
      mean_latency_ms: number;
      optimality_gap: string;
    };
    qaoa_quantum_simulation: {
      algorithm: string;
      mean_objective: number;
      mean_latency_ms: number;
      mean_approximation_ratio: number;
      qubit_range: string;
      gate_fidelity_simulated: string;
    };
    scientific_disclaimer: string;
  };
  learning_plan_relevance: {
    gap_alignment_score: number;
    milestone_completeness: number;
    interview_gap_coverage: number;
  };
}
