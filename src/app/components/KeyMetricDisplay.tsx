/* Filename: src/app/components/KeyMetricDisplay.tsx */
'use client';

import { KeyMetricPart } from '@/types';
import { cn } from '@/lib/utils';

interface KeyMetricDisplayProps {
  metric: KeyMetricPart[];
}

const KeyMetricDisplay = ({ metric }: KeyMetricDisplayProps) => {
  // --- MODIFIED: Refined styles for a more cohesive and professional aesthetic ---
  const getStyleForType = (type: KeyMetricPart['type']) => {
    switch (type) {
      case 'quantifier':
        // Consistent, bright accent color for the key number.
        return 'text-cyan-400 font-bold tracking-tight';
      case 'metric':
        // Clear, primary bold text for the impacted metric.
        return 'text-slate-200 font-semibold tracking-tight';
      case 'filler':
      default:
        // Softer, italicized grey text for connecting words.
        return 'text-slate-400 italic';
    }
  };

  return (
    // --- MODIFIED: Updated container style for better integration ---
    <p className="w-full text-left mt-4 flex flex-row flex-wrap items-baseline gap-x-2 bg-slate-800/50 p-4 rounded-lg border border-slate-700/80 shadow-inner">
      {metric.map((part, index) => (
        <span
          key={index}
          className={cn(
            getStyleForType(part.type),
            'text-lg @[20rem]:text-xl @[28rem]:text-2xl'
          )}
        >
          {part.text}
        </span>
      ))}
    </p>
  );
};

export default KeyMetricDisplay;