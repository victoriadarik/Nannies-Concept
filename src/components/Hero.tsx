import React from 'react';
import { SouthAfricanCity, CareType } from '../types';
import { Search, ShieldCheck, CheckCircle2, ArrowRight, MapPin, HeartHandshake, Sparkles } from 'lucide-react';

interface HeroProps {
  selectedCity: SouthAfricanCity | 'All';
  setSelectedCity: (city: SouthAfricanCity | 'All') => void;
  selectedCareType: CareType | 'All';
  setSelectedCareType: (type: CareType | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExploreClick: () => void;
  onOpenSubscription: () => void;
  onOpenJobPostModal: () => void;
  onOpenCvMaker?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  selectedCity,
  setSelectedCity,
  selectedCareType,
  setSelectedCareType,
  searchQuery,
  setSearchQuery,
  onExploreClick,
  onOpenSubscription,
  onOpenJobPostModal,
  onOpenCvMaker,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-slate-100/70 via-slate-50 to-white border-b border-slate-200/80 pt-6 pb-12 sm:pt-10 sm:pb-16 px-3.5 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle modern ambient background glow in Brand Rose-Pink and Deep Blue */}
      <div className="absolute top-0 right-1/4 -z-10 w-96 h-96 bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 -z-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Brand Statement & Proposition */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Context Badge in Dark Blue & Pink with Official Logo */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-200/80 text-pink-700 text-xs font-bold tracking-tight">
                <span className="w-2 h-2 rounded-full bg-pink-600 animate-pulse" />
                <span>South Africa’s Vetted Childcare Meeting Portal</span>
              </div>
              {onOpenCvMaker && (
                <button
                  onClick={onOpenCvMaker}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs"
                >
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span>Nanny ATS CV Maker (+R50 Redesign)</span>
                </button>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.12]" style={{ textWrap: 'balance' }}>
              Where loving families hire <span className="text-pink-600 underline decoration-pink-300 decoration-wavy decoration-2 underline-offset-6">vetted nannies</span> directly.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              Skip traditional R10,000 agency recruitment fees. Both parents and caregivers connect with verified SAPS police clearance, direct WhatsApp numbers, and legal BCEA wage contracts in <strong className="text-slate-900 font-semibold">Johannesburg</strong>, <strong className="text-slate-900 font-semibold">Durban</strong>, and <strong className="text-slate-900 font-semibold">Cape Town</strong>. Parent passes from <strong className="text-slate-950">R549 once-off (5 CVs & WhatsApp)</strong> or <strong className="text-slate-950">R1,499 (3-Month Unlimited)</strong>.
            </p>

            {/* Quick Action CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 min-h-[48px] text-xs sm:text-sm font-bold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl transition-all shadow-md shadow-pink-600/25 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 group"
              >
                <span>Browse Verified Nannies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={onOpenJobPostModal}
                className="px-5 py-3.5 min-h-[48px] text-xs sm:text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 rounded-xl transition-all whitespace-nowrap cursor-pointer text-center shadow-xs"
              >
                Post a Family Vacancy (Free)
              </button>
              {onOpenCvMaker && (
                <button
                  onClick={onOpenCvMaker}
                  className="px-4 py-3 min-h-[44px] text-xs sm:text-sm font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-xl transition-colors whitespace-nowrap cursor-pointer text-center flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Build ATS CV</span>
                </button>
              )}
            </div>

            {/* Trust Markers Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-pink-600 shrink-0" />
                SAPS Criminal Record Verified
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Authenticated Former Families
              </span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <HeartHandshake className="w-4 h-4 text-blue-700 shrink-0" />
                Zero Salary Cuts
              </span>
            </div>
          </div>

          {/* Right Column: Modern Quick Match Search Card in Deep Blue */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-2xl shadow-slate-950/20 border border-slate-800 space-y-5 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="text-base font-bold text-white tracking-tight">Quick Nanny Finder</div>
                <div className="text-xs text-slate-400 mt-0.5">Live database in Gauteng, KZN & Western Cape</div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50" />
            </div>

            {/* City Segmented Control with Brand Pink Accent */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                1. Select South African Metro
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded-xl text-xs font-semibold text-slate-400 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedCity('All')}
                  className={`py-2.5 min-h-[40px] rounded-lg transition-all cursor-pointer truncate text-center ${
                    selectedCity === 'All'
                      ? 'bg-pink-600 text-white font-bold shadow-md shadow-pink-600/30'
                      : 'hover:text-white hover:bg-slate-900'
                  }`}
                >
                  All SA
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity('Johannesburg')}
                  className={`py-2.5 min-h-[40px] rounded-lg transition-all cursor-pointer truncate text-center ${
                    selectedCity === 'Johannesburg'
                      ? 'bg-pink-600 text-white font-bold shadow-md shadow-pink-600/30'
                      : 'hover:text-white hover:bg-slate-900'
                  }`}
                >
                  JHB
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity('Durban')}
                  className={`py-2.5 min-h-[40px] rounded-lg transition-all cursor-pointer truncate text-center ${
                    selectedCity === 'Durban'
                      ? 'bg-pink-600 text-white font-bold shadow-md shadow-pink-600/30'
                      : 'hover:text-white hover:bg-slate-900'
                  }`}
                >
                  Durban
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity('Cape Town')}
                  className={`py-2.5 min-h-[40px] rounded-lg transition-all cursor-pointer truncate text-center ${
                    selectedCity === 'Cape Town'
                      ? 'bg-pink-600 text-white font-bold shadow-md shadow-pink-600/30'
                      : 'hover:text-white hover:bg-slate-900'
                  }`}
                >
                  CPT
                </button>
              </div>
            </div>

            {/* Care Category Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                2. Type of Care Needed
              </label>
              <select
                value={selectedCareType}
                onChange={(e) => setSelectedCareType(e.target.value as CareType | 'All')}
                aria-label="Select Type of Care Needed"
                className="w-full text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-3 min-h-[44px] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
              >
                <option value="All" className="bg-slate-900 text-white">All Childcare Roles</option>
                <option value="Live-in Nanny" className="bg-slate-900 text-white">Full-time Live-in Nanny</option>
                <option value="Live-out Nanny" className="bg-slate-900 text-white">Full-time Live-out Nanny</option>
                <option value="Au Pair" className="bg-slate-900 text-white">Au Pair & Homework Tutor</option>
                <option value="Night Nurse & Newborn" className="bg-slate-900 text-white">Night Nurse & Infant Specialist</option>
                <option value="Weekend / Babysitter" className="bg-slate-900 text-white">Weekend & Babysitter</option>
              </select>
            </div>

            {/* Suburb Search Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                3. Suburb or Skill Keyword
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Sandton, Umhlanga, Camps Bay, CPR..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3 min-h-[44px] text-xs sm:text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Search Submit CTA */}
            <button
              onClick={onExploreClick}
              className="w-full py-3.5 min-h-[48px] px-4 text-sm font-bold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-pink-600/30"
            >
              <span>Explore Available Nannies</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Bottom Guarantee Kicker */}
            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                POPIA privacy compliant
              </span>
              <span className="text-slate-300 font-medium">
                Direct phone unlock on subscription
              </span>
            </div>
          </div>
        </div>

        {/* Metro Spotlight Cards: Johannesburg, Durban, Cape Town */}
        <div className="mt-12 pt-8 border-t border-slate-200/80">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
            Browse By Core Metropolitan Hubs
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* JHB Card */}
            <button
              onClick={() => {
                setSelectedCity('Johannesburg');
                onExploreClick();
              }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedCity === 'Johannesburg'
                  ? 'border-pink-500 bg-pink-50/50 ring-2 ring-pink-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">Johannesburg & Gauteng</span>
                <span className="text-xs font-bold text-pink-600">Sandton · Rosebank</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Live-in garden cottages, Gautrain routes & preschool routines.
              </p>
              <div className="text-[11px] font-semibold text-slate-700 mt-2">
                Typical: R7,200 – R8,500/mo (R50–R65/hr)
              </div>
            </button>

            {/* Durban Card */}
            <button
              onClick={() => {
                setSelectedCity('Durban');
                onExploreClick();
              }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedCity === 'Durban'
                  ? 'border-pink-500 bg-pink-50/50 ring-2 ring-pink-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">Durban & North Coast</span>
                <span className="text-xs font-bold text-pink-600">Umhlanga · Ballito</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Newborn night nurses, sleep conditioning & live-out care.
              </p>
              <div className="text-[11px] font-semibold text-slate-700 mt-2">
                Typical: R6,800 – R9,500/mo (R48–R75/hr)
              </div>
            </button>

            {/* Cape Town Card */}
            <button
              onClick={() => {
                setSelectedCity('Cape Town');
                onExploreClick();
              }}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                selectedCity === 'Cape Town'
                  ? 'border-pink-500 bg-pink-50/50 ring-2 ring-pink-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-900">Cape Town & Peninsula</span>
                <span className="text-xs font-bold text-pink-600">Atlantic Seaboard</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Au Pairs with vehicles, school drop-offs & homework tutoring.
              </p>
              <div className="text-[11px] font-semibold text-slate-700 mt-2">
                Typical: R8,200 – R11,000/mo (R60–R90/hr)
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
