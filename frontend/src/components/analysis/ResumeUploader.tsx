import React, { useRef, useState } from 'react';
import { Upload, FileText, CheckCircle2, Trash2, Shield } from 'lucide-react';

interface ResumeUploaderProps {
  file: File | null;
  onFileSelect: (file: File | null) => void;
  rawText: string;
  onTextChange: (text: string) => void;
  mode: 'file' | 'text';
  onModeChange: (mode: 'file' | 'text') => void;
  piiMaskingEnabled: boolean;
  onTogglePiiMasking: (enabled: boolean) => void;
}

export const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  file,
  onFileSelect,
  rawText,
  onTextChange,
  mode,
  onModeChange,
  piiMaskingEnabled,
  onTogglePiiMasking,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const dropped = e.dataTransfer.files[0];
      const ext = dropped.name.split('.').pop()?.toLowerCase();
      if (['pdf', 'docx', 'doc', 'txt'].includes(ext || '')) {
        onFileSelect(dropped);
        onModeChange('file');
      }
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">1. Candidate Resume</h2>
          <p className="text-xs text-slate-500">Supports PDF, DOCX, or direct text input.</p>
        </div>
        <div className="flex bg-slate-100 p-0.5 rounded-md border border-slate-200/60 text-xs font-medium">
          <button
            type="button"
            onClick={() => onModeChange('file')}
            className={`px-2.5 py-1 rounded transition-colors ${mode === 'file' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600'}`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => onModeChange('text')}
            className={`px-2.5 py-1 rounded transition-colors ${mode === 'text' ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-600'}`}
          >
            Paste Text
          </button>
        </div>
      </div>

      {mode === 'file' ? (
        <div className="flex-1 flex flex-col justify-center">
          {!file ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                dragOver ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 hover:border-slate-400 bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    onFileSelect(e.target.files[0]);
                  }
                }}
              />
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-3 border border-slate-200">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-slate-800">
                Click to browse or drag & drop your resume
              </p>
              <p className="text-[11px] text-slate-500 mt-1 font-mono">
                PDF, DOCX, TXT (Max 10MB)
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-mono">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 truncate max-w-xs">{file.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{(file.size / 1024).toFixed(1)} KB • Ready for analysis</p>
                </div>
              </div>
              <button
                onClick={() => onFileSelect(null)}
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-200/50 rounded transition-colors"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <textarea
            value={rawText}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Paste your raw resume text here (Summary, Technical Skills, Projects, Experience, Education)..."
            className="w-full flex-1 min-h-[220px] p-3 text-xs font-mono text-slate-800 bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-slate-900 resize-none"
          />
        </div>
      )}

      {/* Responsible AI Sanitization Toggle */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-slate-500" />
          <span>Responsible AI: Automatic PII Masking</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={piiMaskingEnabled}
            onChange={(e) => onTogglePiiMasking(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-8 h-4.5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-slate-900"></div>
        </label>
      </div>
    </div>
  );
};
