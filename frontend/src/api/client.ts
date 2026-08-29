const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const apiClient = {
  async runAnalysis(formData: FormData): Promise<any> {
    const res = await fetch(BASE_URL + '/analyze', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Analysis failed' }));
      throw new Error(err.detail || 'Analysis request failed');
    }
    return res.json();
  },

  async analyze(formData: FormData): Promise<any> {
    return this.runAnalysis(formData);
  },

  async loadDemoAnalysis(): Promise<any> {
    const res = await fetch(BASE_URL + '/demo');
    if (!res.ok) {
      throw new Error('Failed to load demo analysis');
    }
    return res.json();
  },

  async getAnalysisResults(analysisId: string): Promise<any> {
    const res = await fetch(BASE_URL + '/results/' + analysisId);
    if (!res.ok) {
      throw new Error('Failed to fetch analysis results');
    }
    return res.json();
  },

  async getLearningPlan(analysisId: string): Promise<any> {
    const res = await fetch(BASE_URL + '/learning/' + analysisId);
    if (!res.ok) {
      throw new Error('Failed to fetch learning plan');
    }
    return res.json();
  },

  async toggleLearningTask(analysisId: string, taskId: string, completed: boolean): Promise<any> {
    return { status: 'success', taskId, completed };
  },

  async getInterviewQuestions(analysisId: string): Promise<any> {
    const res = await fetch(BASE_URL + '/interview/' + analysisId);
    if (!res.ok) {
      throw new Error('Failed to fetch interview questions');
    }
    return res.json();
  },

  async evaluateInterviewAnswer(data: {
    question_id: string;
    question_text: string;
    candidate_answer: string;
    target_skill: string;
  }): Promise<any> {
    const res = await fetch(BASE_URL + '/interview/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error('Failed to evaluate answer');
    }
    return res.json();
  },

  async getBenchmarks(): Promise<any> {
    const res = await fetch(BASE_URL + '/evaluation');
    if (!res.ok) {
      throw new Error('Failed to fetch evaluation metrics');
    }
    return res.json();
  },

  async getEvaluationMetrics(): Promise<any> {
    return this.getBenchmarks();
  },

  async getModelStatus(): Promise<any> {
    const res = await fetch(BASE_URL + '/training/status');
    if (!res.ok) throw new Error('Failed to get model status');
    return res.json();
  },

  async getDatasetInfo(): Promise<any> {
    const res = await fetch(BASE_URL + '/training/dataset');
    if (!res.ok) throw new Error('Failed to fetch dataset');
    return res.json();
  },

  async trainModel(params: { algorithm: string; max_features: number; test_size: number }): Promise<any> {
    const res = await fetch(BASE_URL + '/training/train', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ detail: 'Training failed' }));
      throw new Error(err.detail || 'Training failed');
    }
    return res.json();
  },

  async predictText(text: string): Promise<any> {
    const res = await fetch(BASE_URL + '/training/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error('Prediction failed');
    return res.json();
  }
};
