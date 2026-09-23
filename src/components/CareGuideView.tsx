import React, { useState } from 'react';
import { 
  Search, Droplets, Sun, Sparkles, Stethoscope, ChevronDown, ChevronUp, 
  Leaf, AlertCircle, CheckCircle2, ShieldCheck, Heart, BookOpen 
} from 'lucide-react';
import { CARE_GUIDES_DATA, PLANT_PROBLEMS } from '../data/careGuides';
import { CareGuide } from '../types';

export const CareGuideView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'watering' | 'sunlight' | 'repotting' | 'troubleshooting'>('all');
  const [expandedGuideId, setExpandedGuideId] = useState<string>('art-of-watering');
  const [activeProblemId, setActiveProblemId] = useState<string | null>('yellow-leaves');

  const filteredGuides = CARE_GUIDES_DATA.filter((guide) => {
    if (selectedCategory !== 'all' && guide.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = guide.title.toLowerCase().includes(q);
      const matchExcerpt = guide.excerpt.toLowerCase().includes(q);
      const matchSteps = guide.steps?.some(s => s.title.toLowerCase().includes(q) || s.detail.toLowerCase().includes(q));
      const matchSymptoms = guide.symptoms?.some(s => s.symptom.toLowerCase().includes(q) || s.cause.toLowerCase().includes(q) || s.cure.toLowerCase().includes(q));
      return matchTitle || matchExcerpt || matchSteps || matchSymptoms;
    }
    return true;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplets': return <Droplets className="w-5 h-5 text-[#3b6b7d]" />;
      case 'Sun': return <Sun className="w-5 h-5 text-[#b07d3e]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#4d6350]" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-[#a85864]" />;
      default: return <Leaf className="w-5 h-5 text-[#4d6350]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs uppercase tracking-widest font-bold text-[#869989]">
          Greenhouse Wisdom &amp; Knowledge
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#2c3830] font-normal mt-1">
          The Plant Parent Care Guide
        </h1>
        <p className="text-sm sm:text-base text-[#617164] mt-2">
          Mindful botanical guidance crafted by our horticulturists so every leaf under your roof flourishes.
        </p>
      </div>

      {/* Search Bar & Quick Categories */}
      <div className="max-w-2xl mx-auto mb-10 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8a998c] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search symptoms (e.g., 'yellow leaves', 'repotting', 'gnats')..."
            className="w-full bg-[#ffffff] pl-11 pr-4 py-3 rounded-2xl text-xs sm:text-sm text-[#2c3830] placeholder-[#8a998c] border border-[#ece5da] focus:outline-none focus:border-[#4d6350] shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: 'all', label: 'All Guides' },
            { id: 'watering', label: 'Watering' },
            { id: 'sunlight', label: 'Sunlight' },
            { id: 'repotting', label: 'Repotting' },
            { id: 'troubleshooting', label: 'Plant Doctor' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#4d6350] text-[#faf8f5] shadow-xs'
                  : 'bg-white text-[#556358] border border-[#ece5da] hover:border-[#cbd6c9]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Plant Doctor Emergency Symptom Bar */}
      <div className="bg-[#fcfaf7] border border-[#ece5da] rounded-3xl p-6 sm:p-8 mb-12 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#8c4953] uppercase tracking-wider mb-2">
          <Stethoscope className="w-4 h-4" />
          <span>Quick Plant Doctor Triage</span>
        </div>
        <h3 className="font-serif-display text-2xl text-[#2c3830] font-normal mb-2">
          Notice a Strange Leaf or Symptom?
        </h3>
        <p className="text-xs sm:text-sm text-[#667669] mb-6">
          Click the symptom you are seeing for immediate diagnosis and a gentle cure.
        </p>

        {/* Problem Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {PLANT_PROBLEMS.map((prob) => {
            const isSelected = activeProblemId === prob.id;
            return (
              <button
                key={prob.id}
                onClick={() => setActiveProblemId(prob.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#ffffff] border-[#4d6350] shadow-xs'
                    : 'bg-[#faf8f5] border-[#ece5da] hover:border-[#cbd6c9]'
                }`}
              >
                <div className="text-2xl mb-1">{prob.icon}</div>
                <div className="text-xs font-semibold text-[#2c3830]">{prob.title}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Problem Remedy Card */}
        {activeProblemId && (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#ffffff] border border-[#cbd6c9] flex items-start gap-3.5 shadow-2xs">
            <CheckCircle2 className="w-5 h-5 text-[#4d6350] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#4d6350] mb-0.5">
                Recommended Greenhouse Remedy:
              </div>
              <p className="text-xs sm:text-sm text-[#404e43] leading-relaxed">
                {PLANT_PROBLEMS.find((p) => p.id === activeProblemId)?.quickFix}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Guides Accordion List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {filteredGuides.map((guide) => {
          const isExpanded = expandedGuideId === guide.id;
          return (
            <div
              key={guide.id}
              className="bg-white rounded-3xl border border-[#ece5da] overflow-hidden shadow-2xs transition-all hover:border-[#cbd6c9]"
            >
              {/* Card Header / Clickable Toggle */}
              <button
                onClick={() => setExpandedGuideId(isExpanded ? '' : guide.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#f4f0ea] flex items-center justify-center shrink-0">
                    {getIcon(guide.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#869989] bg-[#eef3ee] px-2 py-0.5 rounded-full">
                        {guide.category}
                      </span>
                      <span className="text-xs text-[#9d9388] font-medium">
                        {guide.readTime}
                      </span>
                    </div>
                    <h3 className="font-serif-display text-lg sm:text-xl text-[#2c3830] font-medium">
                      {guide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#667669] mt-1 line-clamp-1">
                      {guide.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-full bg-[#f8f6f2] text-[#556358] shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Expanded Card Body */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-[#f4f0ea] space-y-6">
                  <p className="text-xs sm:text-sm text-[#4b594e] leading-relaxed italic bg-[#faf8f5] p-3.5 rounded-xl border border-[#ece5da]">
                    “{guide.fullContent}”
                  </p>

                  {/* Steps (if guide has steps) */}
                  {guide.steps && guide.steps.length > 0 && (
                    <div className="space-y-3.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#4d6350]">
                        Actionable Steps:
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        {guide.steps.map((st) => (
                          <div
                            key={st.step}
                            className="p-4 rounded-2xl bg-[#fcfaf7] border border-[#ece5da] flex items-start gap-3.5"
                          >
                            <span className="w-7 h-7 rounded-full bg-[#4d6350] text-white text-xs font-bold flex items-center justify-center shrink-0">
                              {st.step}
                            </span>
                            <div>
                              <div className="text-sm font-semibold text-[#2c3830]">
                                {st.title}
                              </div>
                              <p className="text-xs text-[#59685c] mt-1 leading-relaxed">
                                {st.detail}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Symptoms & Cures (if plant doctor guide) */}
                  {guide.symptoms && guide.symptoms.length > 0 && (
                    <div className="space-y-3.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#8c4953]">
                        Detailed Symptom Breakdown:
                      </h4>
                      <div className="space-y-3">
                        {guide.symptoms.map((symp, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-2xl bg-[#fffafb] border border-[#f5d9dd] space-y-2"
                          >
                            <div className="flex items-center gap-2 text-xs font-bold text-[#8c4953]">
                              <AlertCircle className="w-4 h-4 shrink-0" />
                              <span>Symptom: {symp.symptom}</span>
                            </div>
                            <div className="text-xs text-[#526155]">
                              <strong>Probable Cause:</strong> {symp.cause}
                            </div>
                            <div className="text-xs text-[#315236] bg-[#eef5ee] p-2.5 rounded-xl border border-[#cbd6c9]">
                              <strong>Doctor Cure:</strong> {symp.cure}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
