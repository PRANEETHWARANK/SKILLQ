import React, { useState } from 'react';
import { ShieldCheck, Cpu, Layers, BookOpen, MessageSquareCode, BarChart3, Menu, X, FileCode, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  activeAnalysisId?: string | null;
  onRunDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, activeAnalysisId, onRunDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Analyze', path: '/analyze', icon: Layers },
    { label: 'My Analysis', path: activeAnalysisId ? `/results/${activeAnalysisId}` : '/results', icon: Cpu, disabled: !activeAnalysisId },
    { label: 'Learning Plan', path: activeAnalysisId ? `/learning/${activeAnalysisId}` : '/learning', icon: BookOpen, disabled: !activeAnalysisId },
    { label: 'Interview Coach', path: activeAnalysisId ? `/interview/${activeAnalysisId}` : '/interview', icon: MessageSquareCode, disabled: !activeAnalysisId },
    { label: 'Model Lab', path: '/model-lab', icon: Sparkles },
    { label: 'Responsible AI', path: '/responsible-ai', icon: ShieldCheck },
    { label: 'Evaluation', path: '/evaluation', icon: BarChart3 },
    { label: 'Methodology', path: '/methodology', icon: FileCode },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Brand */}
          <div 
            onClick={() => handleNavClick('/')} 
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-7 h-7 rounded bg-slate-900 flex items-center justify-center text-white">
              <span className="font-mono font-bold text-sm leading-none">Q</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-slate-900 tracking-tight text-base">SkillQ</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath.startsWith(item.path);
              return (
                <button
                  key={item.label}
                  onClick={() => !item.disabled && handleNavClick(item.path)}
                  disabled={item.disabled}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-slate-900 font-semibold'
                      : item.disabled
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={onRunDemo}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 rounded border border-slate-300 transition-colors"
            >
              Demo Analysis
            </button>
            <button
              onClick={() => handleNavClick('/analyze')}
              className="inline-flex items-center justify-center px-3 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
            >
              Analyze Resume
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath.startsWith(item.path);
            return (
              <button
                key={item.label}
                onClick={() => !item.disabled && handleNavClick(item.path)}
                disabled={item.disabled}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-medium text-left ${
                  isActive
                    ? 'bg-slate-100 text-slate-900 font-semibold'
                    : item.disabled
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
