/* Filename: src/hooks/useScrollspy.ts */
'use client';

import { useState, useEffect } from 'react';

export const useScrollspy = (ids: string[], options?: IntersectionObserverInit) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: `0% 0% -80% 0%`, // Triggers when the section is 20% from the top
        ...options,
      }
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [ids, options]);

  return activeId;
};