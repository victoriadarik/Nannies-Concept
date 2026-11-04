import React from 'react';
import { SouthAfricanCity, CareType } from '../types';
import { Search, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

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
}) => {
  return (
    <section className="relative bg-gradient-to-b from-amber-50/60 via-stone-50 to-stone-100/40 border-b border-stone-200 pt-6 pb-10 sm:pt-10 sm:pb-14 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Value proposition */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            {/* Quiet context kicker */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold tracking-wide text-amber-800 uppercase">
              <span>South Africa</span>
              <span aria-hidden="true">·</span>
              <span>Johannesburg</span>
              <span aria-hidden="true">·</span>
              <span>Durban</span>
              <span aria-hidden="true">·</span>
              <span>Cape Town</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.15]" style={{ textWrap: 'balance' }}>
              The vetted meeting portal for South African nannies and families.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Connect directly with trusted, background-checked domestic caregivers, au pairs, and newborn night nurses. Both parents and nannies subscribe for verified safety, direct WhatsApp chat, and fair BCEA wage compliance—no hidden agency cuts.
            </p>

            {/* Quick Action buttons - Mobile Touch Friendly */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-5 py-3 min-h-[46px] text-xs sm:text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-xl sm:rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Browse Verified Nannies</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
              <button
                onClick={onOpenJobPostModal}
                className="w-full sm:w-auto px-5 py-3 min-h-[46px] text-xs sm:text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-300 rounded-xl sm:rounded-lg transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                Post a Family Job (Free)
              </button>
              <button
                onClick={onOpenSubscription}
                className="w-full sm:w-auto px-4 py-2.5 min-h-[42px] text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer text-center underline underline-offset-4"
              >
                View Subscription Plans
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Search & City Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/90 shadow-sm p-4 sm:p-6 space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="text-sm font-bold text-stone-900">Find Vetted Childcare</div>
              <div className="text-xs text-stone-500">Updated Daily in SA</div>
            </div>

            {/* City Segmented Buttons - Large touch targets */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Select Metro Region
              </label>
              <div className="grid grid-cols-4 gap-1 p-1 bg-stone-100 rounded-xl text-xs font-medium text-stone-600">
                <button
                  type="button"
                  onClick={() => setSelectedCity('All')}
                  className={`py-2.5 min-h-[40px] rounded-lg transition-all cursor-pointer truncate text-[11px] sm:text-xs ${
                    selectedCity === 'All' ? 'bg-white text-stone-950 font-bold shadow-xs' : 'hover:text-stone-900'
                  }`}
                >
                  All SA
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity('Johannesburg')}
                  className={`py-2.5 min-h-[40px] rounded-lg transition-all cursor-pointer truncate text-[11px] sm:text-xs ${
                    selectedCity === 'Johannesburg' ? 'bg-white text-stone-950 font-bold shadow-xs' : 'hover:text-stone-900'
                  }`}
                >
                  JHB
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity('Durban')}
                  className={`py-2.5 min-h-[40px] rounded-lg transition-all cursor-pointer truncate text-[11px] sm:text-xs ${
                    selectedCity === 'Durban' ? 'bg-white text-stone-950 font-bold shadow-xs' : 'hover:text-stone-900'
                  }`}
                >
                  Durban
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity('Cape Town')}
                  className={`py-2.5 min-h-[40px] rounded-lg transition-all cursor-pointer truncate text-[11px] sm:text-xs ${
                    selectedCity === 'Cape Town' ? 'bg-white text-stone-950 font-bold shadow-xs' : 'hover:text-stone-900'
                  }`}
                >
                  CPT
                </button>
              </div>
            </div>

            {/* Care Type Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Care Needed
              </label>
              <select
                value={selectedCareType}
                onChange={(e) => setSelectedCareType(e.target.value as CareType | 'All')}
                aria-label="Select Care Needed"
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl px-3 py-3 min-h-[44px] text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
              >
                <option value="All">All Care Types</option>
                <option value="Live-in Nanny">Full-time Live-in Nanny</option>
                <option value="Live-out Nanny">Full-time Live-out Nanny</option>
                <option value="Au Pair">Au Pair & Homework Tutor</option>
                <option value="Night Nurse & Newborn">Night Nurse & Infant Specialist</option>
                <option value="Weekend / Babysitter">Weekend & Casual Babysitter</option>
              </select>
            </div>

            {/* Keyword / Suburb Search Input */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                Search Suburb or Qualification
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. Sandton, Umhlanga, Camps Bay..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 min-h-[44px] text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Search CTA - Full-width Touch Button */}
            <button
              onClick={onExploreClick}
              className="w-full py-3 min-h-[48px] px-4 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 active:bg-stone-950 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Search Available Caregivers</span>
            </button>

            {/* Trust Markers */}
            <div className="pt-2 text-[11px] sm:text-xs text-stone-500 flex items-center justify-between border-t border-stone-100">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                SAPS criminal checked
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                Verified former families
              </span>
            </div>
          </div>
        </div>

        {/* 4-Column Proof & Rigor Strip - Responsive 2x2 grid on mobile */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-stone-700">
          <div className="bg-white/50 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-stone-200/50 sm:border-0">
            <div className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">1,280+</div>
            <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5">SAPS Vetted Caregivers</div>
            <div className="text-[11px] sm:text-xs text-stone-600 mt-0.5">Police cleared & ID checked</div>
          </div>
          <div className="bg-white/50 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-stone-200/50 sm:border-0">
            <div className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">R27.58+</div>
            <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5">BCEA Legal Compliance</div>
            <div className="text-[11px] sm:text-xs text-stone-600 mt-0.5">Fair wage & UIF calculator</div>
          </div>
          <div className="bg-white/50 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-stone-200/50 sm:border-0">
            <div className="text-xl sm:text-2xl font-bold text-stone-900">JHB · DBN · CPT</div>
            <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Three Core Metros</div>
            <div className="text-[11px] sm:text-xs text-stone-600 mt-0.5">Gauteng, KZN & Western Cape</div>
          </div>
          <div className="bg-white/50 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-stone-200/50 sm:border-0">
            <div className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">0% Cuts</div>
            <div className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Direct Subscription Model</div>
            <div className="text-[11px] sm:text-xs text-stone-600 mt-0.5">No agency commission fees</div>
          </div>
        </div>
      </div>
    </section>
  );
};
