import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/client';
import { AnalysisRecordData, InterviewQuestion, InterviewEvaluation } from '../types';
import { InterviewQuestionCard } from '../components/interview/InterviewQuestionCard';
import { EvaluationFeedback } from '../components/interview/EvaluationFeedback';
import { Loader2, ArrowLeft, Send, Sparkles, HelpCircle } from 'lucide-react';

interface InterviewPageProps {
  analysisId: string;
  onNavigate: (path: string) => void;
}

export const InterviewPage: React.FC<InterviewPageProps> = ({ analysisId, onNavigate }) => {
  const [data, setData] = useState<AnalysisRecordData | null>(null);
  const [questions, setQuestions] = useState<InterviewQuestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [candidateAnswer, setCandidateAnswer] = useState<string>('');
  const [evaluation, setEvaluation] = useState<InterviewEvaluation | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchQuestions = async () => {
      setLoading(true);
      try {
        const res = await apiClient.getAnalysisResults(analysisId);
        if (isMounted) {
          setData(res);
          setQuestions(res.interview_prep || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchQuestions();
    return () => { isMounted = false; };
  }, [analysisId]);

  const currentQ = questions[selectedIndex];

  const handleSelectQuestion = (idx: number) => {
    setSelectedIndex(idx);
    setCandidateAnswer('');
    setEvaluation(null);
  };

  const handleEvaluate = async () => {
    if (!currentQ || candidateAnswer.trim().length < 5) return;
    setIsEvaluating(true);
    try {
      const res = await apiClient.evaluateInterviewAnswer({
        question_id: currentQ.id,
        question_text: currentQ.question,
        candidate_answer: candidateAnswer,
        target_skill: currentQ.skill
      });
      setEvaluation(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-slate-800" />
        <p className="text-xs font-mono text-slate-500">Preparing customized interview prep studio...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <button
          onClick={() => onNavigate(`/results/${analysisId}`)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Analysis Results
        </button>
        <span className="text-xs font-mono text-slate-500">
          Target Role: {data?.target_role || 'Engineering Candidate'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: Question list */}
        <div className="lg:col-span-5 space-y-3">
          <div className="mb-2">
            <h3 className="text-sm font-semibold text-slate-900">Targeted Interview Questions</h3>
            <p className="text-xs text-slate-500">Generated directly from your verified skill gaps & role requirements.</p>
          </div>

          <div className="space-y-2.5">
            {questions.map((q, idx) => (
              <InterviewQuestionCard
                key={q.id}
                question={q}
                index={idx}
                isSelected={selectedIndex === idx}
                onSelect={() => handleSelectQuestion(idx)}
              />
            ))}
          </div>
        </div>

        {/* Right column: Interactive Answer Editor & Evaluation */}
        <div className="lg:col-span-7 space-y-5">
          {currentQ && (
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-xs flex flex-col space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span className="font-mono font-semibold uppercase">{currentQ.category} • {currentQ.skill}</span>
                  <span>Question {selectedIndex + 1} of {questions.length}</span>
                </div>
                <h2 className="text-base font-bold text-slate-900 leading-snug">
                  {currentQ.question}
                </h2>
                <p className="text-xs text-slate-500 mt-1.5 bg-slate-50 p-2.5 rounded border border-slate-100">
                  <strong className="text-slate-700">Why this question:</strong> {currentQ.context}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Your Response:
                  </label>
                  <span className="text-[10px] font-mono text-slate-400">
                    {candidateAnswer.length} characters
                  </span>
                </div>
                <textarea
                  value={candidateAnswer}
                  onChange={(e) => setCandidateAnswer(e.target.value)}
                  placeholder="Structure your answer: 1) Core mechanism, 2) Step-by-step implementation, 3) Trade-offs and edge case handling..."
                  className="w-full min-h-[160px] p-3.5 text-xs font-sans text-slate-900 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900 resize-none leading-relaxed"
                />
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (currentQ.id === 'q-docker-1') {
                      setCandidateAnswer('A multi-stage Docker build defines multiple FROM instructions in a single Dockerfile. The early builder stage compiles source code, downloads heavy build tools and headers, and runs unit tests. The final lean runtime stage copies only the compiled binary or dist output into a minimal base image (like Alpine or distroless). This reduces the final container image size by up to 90%, removes build dependencies, speeds up container deployment, and substantially shrinks the CVE security attack surface in production.');
                    } else {
                      setCandidateAnswer('I would design the endpoint using standard HTTP status codes, structured JSON payloads, and strict schema validation. For performance and reliability, I would implement database indexes and idempotency keys to prevent duplicate operations.');
                    }
                  }}
                  className="text-[11px] text-blue-700 hover:text-blue-900 font-medium"
                >
                  Insert Sample Response
                </button>

                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || candidateAnswer.trim().length < 10}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-semibold text-xs rounded-md shadow-xs transition-colors flex items-center gap-1.5"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Evaluating Answer...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit for AI Rubric Review
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* AI Feedback */}
          {evaluation && <EvaluationFeedback evaluation={evaluation} />}
        </div>
      </div>
    </div>
  );
};
