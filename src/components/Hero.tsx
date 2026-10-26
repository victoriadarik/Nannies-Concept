import React from 'react';
import { SouthAfricanCity, CareType } from '../types';
import { Search, ShieldCheck, MapPin, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

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
    <section className="relative bg-gradient-to-b from-amber-50/60 via-stone-50 to-stone-100/40 border-b border-stone-200 pt-10 pb-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Value proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet context kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-amber-800 uppercase">
              <span>South Africa</span>
              <span aria-hidden="true">·</span>
              <span>Johannesburg</span>
              <span aria-hidden="true">·</span>
              <span>Durban</span>
              <span aria-hidden="true">·</span>
              <span>Cape Town</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12]" style={{ textWrap: 'balance' }}>
              The vetted meeting portal for South African nannies and families.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Connect directly with trusted, background-checked domestic caregivers, au pairs, and newborn night nurses. Both parents and nannies subscribe for verified safety, direct WhatsApp chat, and fair BCEA wage compliance—no hidden agency cuts.
            </p>

            {/* Quick Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreClick}
                className="px-5 py-3 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer flex items-center gap-2"
              >
                <span>Browse Verified Nannies</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenJobPostModal}
                className="px-5 py-3 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Post a Family Job (Free)
              </button>
              <button
                onClick={onOpenSubscription}
                className="px-4 py-3 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors whitespace-nowrap cursor-pointer underline underline-offset-4"
              >
                View Subscription Plans
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Search & City Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="text-sm font-bold text-stone-900">Find Vetted Childcare</div>
              <div className="text-xs text-stone-500">Updated Daily in SA</div>
            </div>

            {/* City Segmented Buttons */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2">
                Select Metro Region
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-stone-100 rounded-lg text-xs font-medium text-stone-600">
                <button
                  type="button"
                  onClick={() => setSelectedCity('All')}
                  className={`py-2 rounded-md transition-all cursor-pointer truncate ${
                    selectedCity === 'All' ? 'bg-white text-stone-950 font-semibold shadow-xs' : 'hover:text-stone-900'
                  }`}
                >
                  All SA
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity('Johannesburg')}
                  className={`py-2 rounded-md transition-all cursor-pointer truncate ${
                    selectedCity === 'Johannesburg' ? 'bg-white text-stone-950 font-semibold shadow-xs' : 'hover:text-stone-900'
                  }`}
                >
                  JHB
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity('Durban')}
                  className={`py-2 rounded-md transition-all cursor-pointer truncate ${
                    selectedCity === 'Durban' ? 'bg-white text-stone-950 font-semibold shadow-xs' : 'hover:text-stone-900'
                  }`}
                >
                  Durban
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedCity('Cape Town')}
                  className={`py-2 rounded-md transition-all cursor-pointer truncate ${
                    selectedCity === 'Cape Town' ? 'bg-white text-stone-950 font-semibold shadow-xs' : 'hover:text-stone-900'
                  }`}
                >
                  Cape Town
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
                className="w-full text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                  placeholder="e.g. Sandton, Umhlanga, Camps Bay, First Aid..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Search CTA */}
            <button
              onClick={onExploreClick}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Search Available Caregivers</span>
            </button>

            {/* Trust Markers */}
            <div className="pt-2 text-xs text-stone-500 flex items-center justify-between border-t border-stone-100">
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

        {/* 4-Column Proof & Rigor Strip */}
        <div className="mt-12 pt-8 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-700">
          <div>
            <div className="text-2xl font-bold text-stone-900 tabular-nums">1,280+</div>
            <div className="text-xs text-stone-500 mt-0.5">SAPS Vetted Caregivers</div>
            <div className="text-xs text-stone-600 mt-1">Police cleared & ID checked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-stone-900 tabular-nums">R27.58+</div>
            <div className="text-xs text-stone-500 mt-0.5">BCEA Legal Compliance</div>
            <div className="text-xs text-stone-600 mt-1">Fair wage & UIF calculator</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-stone-900">JHB · DBN · CPT</div>
            <div className="text-xs text-stone-500 mt-0.5">Three Core Metros</div>
            <div className="text-xs text-stone-600 mt-1">Suburbs in Gauteng, KZN & WC</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-stone-900 tabular-nums">0% Cuts</div>
            <div className="text-xs text-stone-500 mt-0.5">Direct Subscription Model</div>
            <div className="text-xs text-stone-600 mt-1">No ongoing agency commissions</div>
          </div>
        </div>
      </div>
    </section>
  );
};
