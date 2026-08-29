import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { AnalysisRecordData, LearningPlanPayload } from '../types';
import { LearningTimeline } from '../components/learning/LearningTimeline';
import { Loader2, ArrowLeft, ArrowRight, MessageSquareCode } from 'lucide-react';

interface LearningPageProps {
  analysisId: string;
  onNavigate: (path: string) => void;
}

export const LearningPage: React.FC<LearningPageProps> = ({ analysisId, onNavigate }) => {
  const [data, setData] = useState<AnalysisRecordData | null>(null);
  const [plan, setPlan] = useState<LearningPlanPayload | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchPlan = async () => {
      setLoading(true);
      try {
        const res = await apiClient.getAnalysisResults(analysisId);
        if (isMounted) {
          setData(res);
          setPlan(res.learning_plan);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchPlan();
    return () => { isMounted = false; };
  }, [analysisId]);

  const handleToggleTask = async (taskId: string, completed: boolean) => {
    if (!plan) return;
    // Optimistic UI update
    const updatedWeeks = plan.weeks.map(week => ({
      ...week,
      tasks: week.tasks.map(t => t.id === taskId ? { ...t, completed } : t)
    }));
    setPlan({ ...plan, weeks: updatedWeeks });

    try {
      await apiClient.toggleLearningTask(analysisId, taskId, completed);
    } catch (e) {
      console.error('Failed to sync task state', e);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-slate-800" />
        <p className="text-xs font-mono text-slate-500">Loading your customized 30-day roadmap...</p>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-white rounded-lg border border-slate-200 text-center">
        <p className="text-xs text-slate-600">No learning plan found for this analysis.</p>
        <button
          onClick={() => onNavigate('/analyze')}
          className="mt-4 px-4 py-2 bg-slate-900 text-white rounded text-xs font-medium"
        >
          Run an Analysis
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <button
          onClick={() => onNavigate(`/results/${analysisId}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Analysis Results
        </button>
        <button
          onClick={() => onNavigate(`/interview/${analysisId}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors"
        >
          Practice Technical Interview Questions
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <LearningTimeline plan={plan} onToggleTask={handleToggleTask} />
    </div>
  );
};
