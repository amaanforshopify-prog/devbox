import { ShieldCheck, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StrengthResult } from '../types';

interface PasswordStrengthProps {
  strength: StrengthResult;
  className?: string;
}

export function PasswordStrength({ strength, className }: PasswordStrengthProps) {
  const { score, level, entropy, feedback, color } = strength;

  return (
    <div className={cn('space-y-4 rounded-lg border border-border bg-card p-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {score >= 50 ? (
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          ) : (
            <ShieldAlert className="h-5 w-5 text-amber-500" />
          )}
          <span className="text-sm font-semibold">Security Assessment</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">{entropy} bits entropy</span>
          <span
            className={cn(
              'px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-white',
              color.split(' ')[0]
            )}
          >
            {level}
          </span>
        </div>
      </div>

      {/* Strength Progress Bar */}
      <div className="space-y-1.5">
        <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
          <div
            className={cn('h-full transition-all duration-300 rounded-full', color.split(' ')[0])}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Security Feedback List */}
      <div className="space-y-2 pt-1">
        <span className="text-xs font-medium text-muted-foreground">Recommendations &amp; Insights:</span>
        <ul className="space-y-1.5 text-xs">
          {feedback.map((item, idx) => {
            const isPositive = level === 'Very Strong' || (level === 'Strong' && idx === 0);
            return (
              <li key={idx} className="flex items-center gap-2">
                {isPositive ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                ) : (
                  <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                )}
                <span className="text-muted-foreground">{item}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
