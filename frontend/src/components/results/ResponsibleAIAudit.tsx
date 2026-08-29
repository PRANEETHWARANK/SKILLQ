import React from 'react';
import { ResponsibleAIAudit } from '../../types';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ResponsibleAIAuditProps {
  audit: ResponsibleAIAudit;
}

export const ResponsibleAIAuditPanel: React.FC<ResponsibleAIAuditProps> = ({ audit }) => {
  return (
    <div className="bg-white rounded border border-slate-200 p-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Responsible AI & Governance Audit
          </h3>
        </div>
        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
          AUDIT {audit.overall_status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
        <div className="p-2.5 rounded border border-slate-200 bg-slate-50 text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-800">
            <span>PII Masking & Redaction</span>
            <span className="font-mono text-[10px] text-emerald-700">{audit.pii_masking.status}</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">{audit.pii_masking.details}</p>
        </div>

        <div className="p-2.5 rounded border border-slate-200 bg-slate-50 text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-800">
            <span>Irrelevant Feature Exclusion</span>
            <span className="font-mono text-[10px] text-emerald-700">{audit.irrelevant_feature_exclusion.status}</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">{audit.irrelevant_feature_exclusion.details}</p>
        </div>

        <div className="p-2.5 rounded border border-slate-200 bg-slate-50 text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-800">
            <span>Demographic Counterfactual Audit</span>
            <span className="font-mono text-[10px] text-emerald-700">{audit.gender_counterfactual.status}</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">{audit.gender_counterfactual.details}</p>
        </div>

        <div className="p-2.5 rounded border border-slate-200 bg-slate-50 text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-800">
            <span>Proxy Attribute Invariance</span>
            <span className="font-mono text-[10px] text-emerald-700">{audit.proxy_attribute_test.status}</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1">{audit.proxy_attribute_test.details}</p>
        </div>
      </div>
    </div>
  );
};
