import React, { useState } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { ResultsPage } from './pages/ResultsPage';
import { LearningPage } from './pages/LearningPage';
import { InterviewPage } from './pages/InterviewPage';
import { EvaluationPage } from './pages/EvaluationPage';
import { ResponsibleAiPage } from './pages/ResponsibleAiPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { TrainingStudioPage } from './pages/TrainingStudioPage';
import { apiClient } from './api/client';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [activeAnalysisId, setActiveAnalysisId] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunDemo = async () => {
    try {
      const demoRes = await apiClient.loadDemoAnalysis();
      setActiveAnalysisId(demoRes.analysis_id);
      setCurrentPath(`/results/${demoRes.analysis_id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      console.error('Demo error:', e);
      setCurrentPath('/analyze');
    }
  };

  const handleAnalysisComplete = (analysisId: string) => {
    setActiveAnalysisId(analysisId);
    setCurrentPath(`/results/${analysisId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (currentPath === '/') {
      return <LandingPage onNavigate={handleNavigate} onRunDemo={handleRunDemo} />;
    }
    if (currentPath === '/analyze') {
      return <AnalyzePage onAnalysisComplete={handleAnalysisComplete} />;
    }
    if (currentPath.startsWith('/results')) {
      const id = currentPath.split('/')[2] || activeAnalysisId;
      if (id) {
        return <ResultsPage analysisId={id} onNavigate={handleNavigate} />;
      }
      return <AnalyzePage onAnalysisComplete={handleAnalysisComplete} />;
    }
    if (currentPath.startsWith('/learning')) {
      const id = currentPath.split('/')[2] || activeAnalysisId;
      if (id) {
        return <LearningPage analysisId={id} onNavigate={handleNavigate} />;
      }
      return <AnalyzePage onAnalysisComplete={handleAnalysisComplete} />;
    }
    if (currentPath.startsWith('/interview')) {
      const id = currentPath.split('/')[2] || activeAnalysisId;
      if (id) {
        return <InterviewPage analysisId={id} onNavigate={handleNavigate} />;
      }
      return <AnalyzePage onAnalysisComplete={handleAnalysisComplete} />;
    }
    if (currentPath === '/model-lab') {
      return <TrainingStudioPage />;
    }
    if (currentPath === '/evaluation') {
      return <EvaluationPage />;
    }
    if (currentPath === '/responsible-ai') {
      return <ResponsibleAiPage onNavigate={handleNavigate} />;
    }
    if (currentPath === '/methodology') {
      return <MethodologyPage onNavigate={handleNavigate} />;
    }
    return <LandingPage onNavigate={handleNavigate} onRunDemo={handleRunDemo} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        activeAnalysisId={activeAnalysisId}
        onRunDemo={handleRunDemo}
      />
      <main className="flex-1 flex flex-col">
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
