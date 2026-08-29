import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  color?: 'blue' | 'emerald' | 'amber';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercent = true,
  color = 'blue'
}) => {
  const percent = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colorMap = {
    blue: 'bg-blue-600',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-500'
  }[color];

  return (
    <div className="w-full">
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1 text-xs">
          {label && <span className="font-medium text-slate-700">{label}</span>}
          {showPercent && <span className="font-mono text-slate-500">{percent.toFixed(0)}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div 
          className={`h-full rounded-full transition-all duration-300 ${colorMap}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};
