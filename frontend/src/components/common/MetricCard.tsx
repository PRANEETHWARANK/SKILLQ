import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  tag?: string;
  tagColor?: 'emerald' | 'blue' | 'amber' | 'slate';
  mono?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtitle,
  tag,
  tagColor = 'slate',
  mono = true,
}) => {
  const tagStyles = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  }[tagColor];

  return (
    <div className="bg-white p-3.5 rounded border border-slate-200 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">{label}</span>
        {tag && (
          <span className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded border ${tagStyles}`}>
            {tag}
          </span>
        )}
      </div>
      <div>
        <span className={`text-xl font-bold text-slate-900 tabular-nums ${mono ? 'font-mono' : ''}`}>
          {value}
        </span>
      </div>
      {subtitle && <p className="text-[11px] text-slate-500 mt-1">{subtitle}</p>}
    </div>
  );
};
