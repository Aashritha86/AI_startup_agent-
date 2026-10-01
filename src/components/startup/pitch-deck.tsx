'use client';

import React, { useState } from 'react';
import { PitchDeck } from '@/types/startup';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Presentation, ChevronLeft, ChevronRight, Eye, MessageSquare, DollarSign } from 'lucide-react';

interface Props {
  data?: PitchDeck;
}

export const PitchDeckView: React.FC<Props> = ({ data }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!data || !data.slides || data.slides.length === 0) return null;

  const activeSlide = data.slides[currentSlideIndex];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
            <span>Investor Pitch Deck (Slide-by-Slide)</span>
            <Badge variant="emerald">Deliverable #8</Badge>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">
            Target Raise: <strong className="text-[#059669] dark:text-[#34D399] font-bold">{data.targetFundingAmount}</strong> • Tagline: "{data.elevationTagline}"
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={currentSlideIndex === 0}
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            className="text-xs border-emerald-600/30 text-[#059669] dark:text-[#34D399]"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
          <span className="text-xs font-mono text-[#0F172A] dark:text-slate-200 font-bold px-2">
            Slide {currentSlideIndex + 1} of {data.slides.length}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={currentSlideIndex === data.slides.length - 1}
            onClick={() => setCurrentSlideIndex((prev) => Math.min(data.slides.length - 1, prev + 1))}
            className="text-xs border-emerald-600/30 text-[#059669] dark:text-[#34D399]"
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Presentation Slide Display Canvas */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[#10B981]/30 bg-white dark:bg-emerald-950/40 shadow-xl relative min-h-[380px] flex flex-col justify-between overflow-hidden">
        <div className="absolute top-0 right-0 p-6 text-xs text-[#10B981]/70 font-mono font-extrabold uppercase tracking-widest pointer-events-none">
          SLIDE 0{activeSlide.slideNumber}
        </div>

        <div className="space-y-6 relative z-10">
          <div className="space-y-2">
            <Badge variant="emerald" className="uppercase tracking-widest text-[10px]">
              {activeSlide.title}
            </Badge>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] dark:text-white leading-tight">
              {activeSlide.headline}
            </h3>
          </div>

          <ul className="space-y-3 max-w-3xl">
            {activeSlide.content?.map((point, idx) => (
              <li key={idx} className="text-sm sm:text-base text-[#0F172A] dark:text-slate-200 flex items-start gap-3 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] mt-1.5 flex-shrink-0"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual & Speaker Notes footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-emerald-950/60 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
            <Eye className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0F172A] dark:text-slate-200 block mb-0.5 font-bold">Visual Design Layout Recommendation:</strong>
              <span className="text-slate-600 dark:text-slate-300 font-medium">{activeSlide.visualRecommendation}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5">
            <MessageSquare className="w-4 h-4 text-[#0D9488] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#0F172A] dark:text-slate-200 block mb-0.5 font-bold">Founder Speaker Script Notes:</strong>
              <span className="text-slate-600 dark:text-slate-300 font-medium">{activeSlide.speakerNotes}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Selector Thumbnails Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
        {data.slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`p-3 rounded-xl text-left border transition-all text-xs ${
              idx === currentSlideIndex
                ? 'bg-[#10B981] text-white border-[#10B981] shadow-md font-bold'
                : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-[#0F172A] hover:bg-[#E6F7F2]'
            }`}
          >
            <div className={`font-mono text-[10px] mb-1 ${idx === currentSlideIndex ? 'text-white/80' : 'text-[#059669] dark:text-[#34D399]'}`}>Slide #{slide.slideNumber}</div>
            <div className="font-semibold truncate">{slide.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
