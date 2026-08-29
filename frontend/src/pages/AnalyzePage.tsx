import React, { useState } from 'react';
import { ResumeUploader } from '../components/analysis/ResumeUploader';
import { JobDescriptionInput } from '../components/analysis/JobDescriptionInput';
import { ProcessingTimeline } from '../components/analysis/ProcessingTimeline';
import { apiClient } from '../api/client';
import { ArrowRight, AlertCircle } from 'lucide-react';

interface AnalyzePageProps {
  onAnalysisComplete: (analysisId: string) => void;
}

const PRESET_JDS: Record<string, string> = {
  'AI Engineer': `Innovative AI Systems Lab — San Francisco, CA
Seeking an AI Engineer to build scalable intelligence pipelines and APIs.

Responsibilities:
• Design and build robust backend REST APIs and microservices in Python.
• Integrate machine learning models, vector databases, and Large Language Models (LLMs).
• Containerize services using Docker and manage deployment on AWS.
• Optimize relational database schemas in PostgreSQL.

Required Qualifications:
• Proficiency in Python and web frameworks (Django or FastAPI).
• Strong fundamentals in Data Structures & Algorithms, REST APIs, and PostgreSQL.
• Hands-on project experience with PyTorch or Machine Learning.
• Experience with Docker containerization.

Preferred:
• AWS cloud deployment (ECS, Lambda, S3).
• RAG architectures and LLM application development.`,

  'Backend Software Engineer': `ScaleCore Technologies
Looking for a Backend Software Engineer to design high-throughput microservices.

Responsibilities:
• Implement distributed REST and gRPC services in Python or Go.
• Manage relational and in-memory databases (PostgreSQL, Redis).
• Write unit tests and maintain CI/CD pipelines with GitHub Actions.

Required:
• Python, FastAPI/Django, SQL, PostgreSQL, REST APIs, Git.
• Data Structures & Algorithms.

Preferred:
• Docker, Kubernetes, Redis caching, Microservices architecture.`,

  'Full-Stack Developer': `CloudApp Studios
Seeking a Full-Stack Developer to build user interfaces and API endpoints.

Responsibilities:
• Develop frontend applications using React and TypeScript.
• Build backend APIs in Python (FastAPI/Django) or Node.js.
• Write clean automated tests and manage databases.

Required:
• React, TypeScript, JavaScript, Python, REST APIs, SQL.

Preferred:
• Tailwind CSS, Docker, PostgreSQL, Next.js.`,

  'Data & ML Engineer': `Nexus Analytics
Seeking a Data & ML Engineer to build production machine learning pipelines.

Responsibilities:
• Build ETL data pipelines and feature engineering workflows in Python.
• Train and evaluate models using Scikit-Learn and PyTorch.
• Deploy model inference endpoints.

Required:
• Python, Pandas, NumPy, Scikit-Learn, PyTorch, SQL.

Preferred:
• Docker, Vector Databases, AWS, LLMs.`
};

export const AnalyzePage: React.FC<AnalyzePageProps> = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [rawResumeText, setRawResumeText] = useState<string>('');
  const [resumeMode, setResumeMode] = useState<'file' | 'text'>('file');
  const [piiMasking, setPiiMasking] = useState<boolean>(true);

  const [role, setRole] = useState<string>('AI Engineer');
  const [company, setCompany] = useState<string>('Innovative AI Systems Lab');
  const [jdText, setJdText] = useState<string>(PRESET_JDS['AI Engineer']);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoadPreset = (presetRole: string) => {
    setRole(presetRole);
    setCompany(presetRole === 'AI Engineer' ? 'Innovative AI Systems Lab' : 'ScaleCore Tech');
    if (PRESET_JDS[presetRole]) {
      setJdText(PRESET_JDS[presetRole]);
    }
  };

  const handleRunAnalysis = async () => {
    setErrorMessage(null);
    if (resumeMode === 'file' && !file) {
      setErrorMessage('Please select a resume file (PDF, DOCX, TXT) or switch to Paste Text mode.');
      return;
    }
    if (resumeMode === 'text' && !rawResumeText.trim()) {
      setErrorMessage('Please paste your resume text before running the analysis.');
      return;
    }
    if (!jdText.trim()) {
      setErrorMessage('Please provide a target Job Description.');
      return;
    }

    setIsProcessing(true);
    setCurrentStage(1);

    // Stage progression tracker simulating real backend steps
    const stageInterval = setInterval(() => {
      setCurrentStage((prev) => (prev < 5 ? prev + 1 : prev));
    }, 600);

    try {
      const formData = new FormData();
      if (resumeMode === 'file' && file) {
        formData.append('resume_file', file);
      } else {
        formData.append('resume_text', rawResumeText);
      }
      formData.append('job_description', jdText);
      formData.append('target_role', role || 'Software & AI Engineer');
      formData.append('target_company', company || '');

      const result = await apiClient.runAnalysis(formData);
      clearInterval(stageInterval);
      setCurrentStage(6);

      setTimeout(() => {
        setIsProcessing(false);
        onAnalysisComplete(result.analysis_id);
      }, 500);
    } catch (err: any) {
      clearInterval(stageInterval);
      setIsProcessing(false);
      setErrorMessage(err.message || 'Analysis failed. Please verify your inputs.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Resume Analysis Workspace</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Compare your technical experience against a target role using verifiable skill evidence and QAOA optimization.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {isProcessing ? (
        <div className="py-12">
          <ProcessingTimeline currentStage={currentStage} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Dual Pane Input */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[420px]">
            <ResumeUploader
              file={file}
              onFileSelect={setFile}
              rawText={rawResumeText}
              onTextChange={setRawResumeText}
              mode={resumeMode}
              onModeChange={setResumeMode}
              piiMaskingEnabled={piiMasking}
              onTogglePiiMasking={setPiiMasking}
            />

            <JobDescriptionInput
              role={role}
              onRoleChange={setRole}
              company={company}
              onCompanyChange={setCompany}
              jdText={jdText}
              onJdTextChange={setJdText}
              onLoadPreset={handleLoadPreset}
            />
          </div>

          {/* Action Bar */}
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-500">
              Responsible AI pipeline will sanitize PII and evaluate classical + quantum matching.
            </div>
            <button
              onClick={handleRunAnalysis}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md shadow-sm transition-colors flex items-center justify-center gap-2"
            >
              Analyze Resume & Generate Roadmap
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
