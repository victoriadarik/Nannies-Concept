import React, { useState, useMemo } from 'react';
import { NannyProfile, SouthAfricanCity, CareType, SubscriptionState } from '../types';
import { SUBURBS_BY_CITY } from '../data/mockData';
import { 
  ShieldCheck, 
  Car, 
  Heart, 
  MapPin, 
  Phone, 
  Calendar, 
  MessageSquare, 
  Check, 
  Lock,
  Filter,
  X
} from 'lucide-react';

interface NannyDirectoryProps {
  nannies: NannyProfile[];
  selectedCity: SouthAfricanCity | 'All';
  setSelectedCity: (city: SouthAfricanCity | 'All') => void;
  selectedCareType: CareType | 'All';
  setSelectedCareType: (type: CareType | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  subscription: SubscriptionState;
  onSelectNanny: (nanny: NannyProfile) => void;
  onOpenSubscription: () => void;
  onOpenInterviewScheduler: (nanny: NannyProfile) => void;
  onStartChat: (nanny: NannyProfile) => void;
}

export const NannyDirectory: React.FC<NannyDirectoryProps> = ({
  nannies,
  selectedCity,
  setSelectedCity,
  selectedCareType,
  setSelectedCareType,
  searchQuery,
  setSearchQuery,
  subscription,
  onSelectNanny,
  onOpenSubscription,
  onOpenInterviewScheduler,
  onStartChat,
}) => {
  const [selectedSuburb, setSelectedSuburb] = useState<string>('All');
  const [requirePoliceClearance, setRequirePoliceClearance] = useState<boolean>(false);
  const [requireFirstAid, setRequireFirstAid] = useState<boolean>(false);
  const [requireDriversLicense, setRequireDriversLicense] = useState<boolean>(false);
  const [maxMonthlyRate, setMaxMonthlyRate] = useState<number>(15000);

  const isParentSubscribed = subscription.parentPlan !== 'none';

  // Suburbs options based on selected city
  const availableSuburbs = useMemo(() => {
    if (selectedCity === 'All') {
      return Array.from(new Set(Object.values(SUBURBS_BY_CITY).flat()));
    }
    return SUBURBS_BY_CITY[selectedCity] || [];
  }, [selectedCity]);

  // Filtered list
  const filteredNannies = useMemo(() => {
    return nannies.filter((nanny) => {
      // City
      if (selectedCity !== 'All' && nanny.city !== selectedCity) return false;
      // Suburb
      if (selectedSuburb !== 'All' && nanny.suburb !== selectedSuburb) return false;
      // Care Type
      if (selectedCareType !== 'All' && !nanny.careTypes.includes(selectedCareType)) return false;
      // Rate
      if (nanny.monthlyRateZAR > maxMonthlyRate) return false;
      // Police Clearance
      if (requirePoliceClearance && !nanny.hasPoliceClearance) return false;
      // First Aid
      if (requireFirstAid && !nanny.hasFirstAid) return false;
      // Driver
      if (requireDriversLicense && !nanny.hasDriversLicense) return false;
      // Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = nanny.name.toLowerCase().includes(q);
        const matchesSuburb = nanny.suburb.toLowerCase().includes(q);
        const matchesCity = nanny.city.toLowerCase().includes(q);
        const matchesSkills = nanny.skills.some((s) => s.toLowerCase().includes(q));
        const matchesLanguages = nanny.languages.some((l) => l.toLowerCase().includes(q));
        const matchesBio = nanny.bio.toLowerCase().includes(q);
        if (!matchesName && !matchesSuburb && !matchesCity && !matchesSkills && !matchesLanguages && !matchesBio) {
          return false;
        }
      }
      return true;
    });
  }, [
    nannies,
    selectedCity,
    selectedSuburb,
    selectedCareType,
    maxMonthlyRate,
    requirePoliceClearance,
    requireFirstAid,
    requireDriversLicense,
    searchQuery,
  ]);

  const clearAllFilters = () => {
    setSelectedCity('All');
    setSelectedSuburb('All');
    setSelectedCareType('All');
    setSearchQuery('');
    setRequirePoliceClearance(false);
    setRequireFirstAid(false);
    setRequireDriversLicense(false);
    setMaxMonthlyRate(15000);
  };

  return (
    <div id="nannies-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            Verified South African Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mt-1">
            Browse Childcare Professionals
          </h2>
          <div className="text-xs sm:text-sm text-stone-500 mt-1">
            Displaying {filteredNannies.length} vetted profiles across Johannesburg, Durban, and Cape Town
          </div>
        </div>

        {/* Subscription perk banner reminder */}
        <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 flex items-center justify-between gap-4 text-xs">
          <div>
            <div className="font-semibold text-stone-800">
              {isParentSubscribed ? 'Parent Pass Unlocked' : 'Subscription Portal'}
            </div>
            <div className="text-stone-500">
              {isParentSubscribed
                ? 'Direct WhatsApp & phone numbers visible'
                : 'Direct contact numbers unlocked with Parent Pass'}
            </div>
          </div>
          {!isParentSubscribed && (
            <button
              onClick={onOpenSubscription}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md whitespace-nowrap cursor-pointer transition-colors"
            >
              Get Pass
            </button>
          )}
        </div>
      </div>

      {/* Interactive Filters Bar */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Row 1: City & Care Type Segmented Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* City filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium text-stone-600">
            <button
              onClick={() => { setSelectedCity('All'); setSelectedSuburb('All'); }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                selectedCity === 'All' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              All SA
            </button>
            <button
              onClick={() => { setSelectedCity('Johannesburg'); setSelectedSuburb('All'); }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                selectedCity === 'Johannesburg' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              Johannesburg
            </button>
            <button
              onClick={() => { setSelectedCity('Durban'); setSelectedSuburb('All'); }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                selectedCity === 'Durban' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              Durban
            </button>
            <button
              onClick={() => { setSelectedCity('Cape Town'); setSelectedSuburb('All'); }}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                selectedCity === 'Cape Town' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              Cape Town
            </button>
          </div>

          {/* Suburb dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">Suburb:</span>
            <select
              value={selectedSuburb}
              onChange={(e) => setSelectedSuburb(e.target.value)}
              className="bg-stone-50 border border-stone-200 text-stone-800 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="All">All Suburbs</option>
              {availableSuburbs.map((suburb) => (
                <option key={suburb} value={suburb}>
                  {suburb}
                </option>
              ))}
            </select>
          </div>

          {/* Rate ceiling */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-stone-500 font-medium">Max Monthly Rate:</span>
            <span className="font-semibold text-stone-800 tabular-nums">
              R{maxMonthlyRate.toLocaleString()}
            </span>
            <input
              type="range"
              min="5000"
              max="15000"
              step="500"
              value={maxMonthlyRate}
              onChange={(e) => setMaxMonthlyRate(Number(e.target.value))}
              className="accent-amber-600 cursor-pointer w-24 sm:w-32"
            />
          </div>
        </div>

        {/* Row 2: Checkbox filters for SA credentials */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={requirePoliceClearance}
                onChange={(e) => setRequirePoliceClearance(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="font-medium">SAPS Police Cleared</span>
            </label>

            <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={requireFirstAid}
                onChange={(e) => setRequireFirstAid(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="font-medium">First Aid / CPR Certified</span>
            </label>

            <label className="flex items-center gap-1.5 text-stone-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={requireDriversLicense}
                onChange={(e) => setRequireDriversLicense(e.target.checked)}
                className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="font-medium">Driver’s License (Code 8)</span>
            </label>
          </div>

          {(selectedCity !== 'All' || selectedSuburb !== 'All' || selectedCareType !== 'All' || requirePoliceClearance || requireFirstAid || requireDriversLicense || searchQuery) && (
            <button
              onClick={clearAllFilters}
              className="text-stone-500 hover:text-stone-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Directory Cards Grid */}
      {filteredNannies.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-xl p-12 text-center space-y-3">
          <div className="text-base font-semibold text-stone-800">
            No childcare providers match your current filters.
          </div>
          <div className="text-xs text-stone-500 max-w-md mx-auto">
            Try expanding your suburb range or adjusting rate requirements. We add new vetted South African caregivers every week.
          </div>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNannies.map((nanny) => {
            // Colors for clean visual identity
            const initials = nanny.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <div
                key={nanny.id}
                className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between space-y-4"
              >
                {/* Card Top: Avatar, Name, Rating & Unboxed Location */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar with clean stylized initials container */}
                      <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-base border border-amber-200 shrink-0">
                        {initials}
                      </div>

                      <div>
                        <h3 className="font-bold text-stone-900 text-base leading-tight hover:text-amber-700 transition-colors cursor-pointer" onClick={() => onSelectNanny(nanny)}>
                          {nanny.name}
                        </h3>
                        {/* Zero-Pill Unboxed Metadata with · separator */}
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                          <span>{nanny.suburb}, {nanny.city === 'Johannesburg' ? 'JHB' : nanny.city === 'Cape Town' ? 'CPT' : 'DBN'}</span>
                          <span aria-hidden="true">·</span>
                          <span>{nanny.age} yrs</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-semibold text-stone-800">{nanny.experienceYears}y exp</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating unboxed */}
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-stone-900 tabular-nums">★ {nanny.rating.toFixed(2)}</div>
                      <div className="text-[11px] text-stone-400">{nanny.reviewCount} reviews</div>
                    </div>
                  </div>

                  {/* Summary / Kicker */}
                  <p className="text-xs text-stone-600 mt-3 line-clamp-2 leading-relaxed">
                    {nanny.introSummary}
                  </p>

                  {/* Unboxed Attributes & Badges */}
                  <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Care:</span>
                      <span className="font-medium text-stone-800">{nanny.careTypes.join(', ')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Rate:</span>
                      <span className="font-bold text-stone-900 tabular-nums">
                        R{nanny.monthlyRateZAR.toLocaleString()}/mo <span className="font-normal text-stone-500">(~R{nanny.hourlyRateZAR}/hr)</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Languages:</span>
                      <span className="text-stone-700">{nanny.languages.join(', ')}</span>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-800 font-medium">
                      {nanny.hasPoliceClearance && (
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                          SAPS Cleared
                        </span>
                      )}
                      {nanny.hasFirstAid && (
                        <>
                          <span aria-hidden="true" className="text-stone-300">·</span>
                          <span>First Aid / CPR</span>
                        </>
                      )}
                      {nanny.hasDriversLicense && (
                        <>
                          <span aria-hidden="true" className="text-stone-300">·</span>
                          <span className="flex items-center gap-0.5">
                            <Car className="w-3 h-3" /> Driver
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Phone unlock status & Actions */}
                <div className="pt-3 border-t border-stone-100 space-y-2">
                  {/* Phone preview */}
                  <div className="flex items-center justify-between text-xs bg-stone-50 rounded-lg px-2.5 py-1.5">
                    <span className="text-stone-500 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-stone-400" />
                      Contact:
                    </span>
                    {isParentSubscribed ? (
                      <span className="font-semibold text-stone-900 tabular-nums">
                        {nanny.phone}
                      </span>
                    ) : (
                      <button
                        onClick={onOpenSubscription}
                        className="text-stone-500 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                        title="Subscribe to reveal full contact number"
                      >
                        <Lock className="w-3 h-3 text-amber-700" />
                        <span>+27 82 ••• •••• (Unlock)</span>
                      </button>
                    )}
                  </div>

                  {/* Primary & secondary action buttons */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                    <button
                      onClick={() => onSelectNanny(nanny)}
                      className="py-2 px-3 text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg text-center transition-colors cursor-pointer"
                    >
                      Full Profile
                    </button>
                    <button
                      onClick={() => onStartChat(nanny)}
                      className="py-2 px-3 text-white bg-stone-900 hover:bg-stone-800 rounded-lg text-center transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
