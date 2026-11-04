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
  X,
  Star
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
    <div id="nannies-section" className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-pink-600">
            Verified South African Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 mt-1">
            Browse Childcare Professionals
          </h2>
          <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Displaying {filteredNannies.length} authenticated profiles across Johannesburg, Durban, and Cape Town
          </div>
        </div>

        {/* Subscription perk banner reminder - Dark Navy with Pink CTA */}
        <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-3.5 sm:px-4 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
              <span>
                {subscription.parentPlan === 'quarterly_unlimited'
                  ? '3-Month Unlimited Pass Active'
                  : subscription.parentPlan === 'once_off_5cv'
                  ? `Starter Pass (${subscription.unlockedNannyIds?.length || 0}/5 CVs Unlocked)`
                  : 'Direct Meeting Portal'}
              </span>
            </div>
            <div className="text-slate-400 text-[11px] mt-0.5">
              {isParentSubscribed
                ? 'WhatsApp & phone numbers unlocked for your selected caregivers'
                : 'Unlock 5 CVs & WhatsApp numbers for R549 once-off, or get 3-Month Unlimited Access for R1,499'}
            </div>
          </div>
          {!isParentSubscribed && (
            <button
              onClick={onOpenSubscription}
              className="px-4 py-2 min-h-[38px] text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl whitespace-nowrap cursor-pointer transition-colors shadow-sm shadow-pink-600/30 self-start sm:self-auto"
            >
              Get Pass (From R549)
            </button>
          )}
        </div>
      </div>

      {/* Interactive Filters Bar - Modern Segmented Template */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Row 1: City & Suburb Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          {/* City filter tabs */}
          <div className="grid grid-cols-4 w-full sm:w-auto p-1 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
            <button
              onClick={() => { setSelectedCity('All'); setSelectedSuburb('All'); }}
              className={`py-2 px-3 min-h-[38px] rounded-lg transition-all cursor-pointer text-center truncate ${
                selectedCity === 'All' ? 'bg-pink-600 text-white font-bold shadow-xs' : 'hover:text-slate-950'
              }`}
            >
              All SA
            </button>
            <button
              onClick={() => { setSelectedCity('Johannesburg'); setSelectedSuburb('All'); }}
              className={`py-2 px-3 min-h-[38px] rounded-lg transition-all cursor-pointer text-center truncate ${
                selectedCity === 'Johannesburg' ? 'bg-pink-600 text-white font-bold shadow-xs' : 'hover:text-slate-950'
              }`}
            >
              JHB
            </button>
            <button
              onClick={() => { setSelectedCity('Durban'); setSelectedSuburb('All'); }}
              className={`py-2 px-3 min-h-[38px] rounded-lg transition-all cursor-pointer text-center truncate ${
                selectedCity === 'Durban' ? 'bg-pink-600 text-white font-bold shadow-xs' : 'hover:text-slate-950'
              }`}
            >
              Durban
            </button>
            <button
              onClick={() => { setSelectedCity('Cape Town'); setSelectedSuburb('All'); }}
              className={`py-2 px-3 min-h-[38px] rounded-lg transition-all cursor-pointer text-center truncate ${
                selectedCity === 'Cape Town' ? 'bg-pink-600 text-white font-bold shadow-xs' : 'hover:text-slate-950'
              }`}
            >
              Cape Town
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Suburb dropdown */}
            <div className="flex items-center gap-2 text-xs flex-1 sm:flex-none">
              <span className="text-slate-500 font-semibold whitespace-nowrap">Suburb:</span>
              <select
                value={selectedSuburb}
                onChange={(e) => setSelectedSuburb(e.target.value)}
                className="w-full sm:w-auto bg-slate-50 border border-slate-200 text-slate-800 rounded-xl px-3 py-2 min-h-[40px] focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer font-medium"
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
              <span className="text-slate-500 font-semibold whitespace-nowrap">Max:</span>
              <span className="font-bold text-slate-900 tabular-nums whitespace-nowrap">
                R{maxMonthlyRate.toLocaleString()}
              </span>
              <input
                type="range"
                min="5000"
                max="15000"
                step="500"
                value={maxMonthlyRate}
                onChange={(e) => setMaxMonthlyRate(Number(e.target.value))}
                className="accent-pink-600 cursor-pointer w-20 sm:w-28"
              />
            </div>
          </div>
        </div>

        {/* Row 2: Checkbox filters for SA credentials */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-slate-700 cursor-pointer select-none min-h-[36px]">
              <input
                type="checkbox"
                checked={requirePoliceClearance}
                onChange={(e) => setRequirePoliceClearance(e.target.checked)}
                className="rounded border-slate-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="font-semibold text-slate-800">SAPS Police Clearance</span>
            </label>

            <label className="flex items-center gap-2 text-slate-700 cursor-pointer select-none min-h-[36px]">
              <input
                type="checkbox"
                checked={requireFirstAid}
                onChange={(e) => setRequireFirstAid(e.target.checked)}
                className="rounded border-slate-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="font-semibold text-slate-800">First Aid / CPR Certified</span>
            </label>

            <label className="flex items-center gap-2 text-slate-700 cursor-pointer select-none min-h-[36px]">
              <input
                type="checkbox"
                checked={requireDriversLicense}
                onChange={(e) => setRequireDriversLicense(e.target.checked)}
                className="rounded border-slate-300 text-pink-600 focus:ring-pink-500"
              />
              <span className="font-semibold text-slate-800">Code 8 Driver’s License</span>
            </label>
          </div>

          {(selectedCity !== 'All' || selectedSuburb !== 'All' || selectedCareType !== 'All' || requirePoliceClearance || requireFirstAid || requireDriversLicense || searchQuery) && (
            <button
              onClick={clearAllFilters}
              className="text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors cursor-pointer font-medium"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Directory Cards Grid */}
      {filteredNannies.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3 shadow-xs">
          <div className="text-base font-bold text-slate-900">
            No childcare providers match your current filters.
          </div>
          <div className="text-xs text-slate-500 max-w-md mx-auto">
            Try expanding your suburb range or adjusting rate requirements. We add new vetted South African caregivers every week.
          </div>
          <button
            onClick={clearAllFilters}
            className="px-5 py-2.5 min-h-[44px] text-xs font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredNannies.map((nanny) => {
            const initials = nanny.name
              .split(' ')
              .map((n) => n[0])
              .join('');

            return (
              <div
                key={nanny.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:border-pink-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                {/* Card Top: Avatar, Name, Rating & Unboxed Location */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar with Pink Accent Monogram */}
                      <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-700 flex items-center justify-center font-extrabold text-base border border-pink-200/80 shrink-0 group-hover:bg-pink-100 transition-colors">
                        {initials}
                      </div>

                      <div>
                        <h3 
                          className="font-bold text-slate-950 text-base leading-tight hover:text-pink-600 transition-colors cursor-pointer"
                          onClick={() => onSelectNanny(nanny)}
                        >
                          {nanny.name}
                        </h3>
                        {/* Zero-Pill Unboxed Metadata with · separator */}
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 font-medium">
                          <span>{nanny.suburb}, {nanny.city === 'Johannesburg' ? 'JHB' : nanny.city === 'Cape Town' ? 'CPT' : 'DBN'}</span>
                          <span aria-hidden="true">·</span>
                          <span>{nanny.age} yrs</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-bold text-slate-900">{nanny.experienceYears}y exp</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating in Dark Blue */}
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-slate-900 tabular-nums flex items-center gap-1 justify-end">
                        <Star className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                        <span>{nanny.rating.toFixed(2)}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">{nanny.reviewCount} reviews</div>
                    </div>
                  </div>

                  {/* Summary / Kicker */}
                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {nanny.introSummary}
                  </p>

                  {/* Unboxed Attributes & Badges */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Care:</span>
                      <span className="font-semibold text-slate-900">{nanny.careTypes.join(', ')}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Rate:</span>
                      <span className="font-extrabold text-slate-950 tabular-nums">
                        R{nanny.monthlyRateZAR.toLocaleString()}/mo <span className="font-normal text-slate-500">(~R{nanny.hourlyRateZAR}/hr)</span>
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Languages:</span>
                      <span className="text-slate-700">{nanny.languages.join(', ')}</span>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-800 font-medium">
                      {nanny.hasPoliceClearance && (
                        <span className="flex items-center gap-1 text-emerald-800">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          SAPS Cleared
                        </span>
                      )}
                      {nanny.hasFirstAid && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="text-pink-700 font-semibold">First Aid / CPR</span>
                        </>
                      )}
                      {nanny.hasDriversLicense && (
                        <>
                          <span aria-hidden="true" className="text-slate-300">·</span>
                          <span className="flex items-center gap-0.5 text-slate-700">
                            <Car className="w-3 h-3 text-slate-600" /> Driver
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Bottom: Phone unlock status & Actions */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  {/* Phone preview */}
                  {(() => {
                    const isNannyUnlocked = subscription.parentPlan === 'quarterly_unlimited' || 
                      (subscription.parentPlan === 'once_off_5cv' && subscription.unlockedNannyIds?.includes(nanny.id));

                    return (
                      <div className="flex items-center justify-between text-xs bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                        <span className="text-slate-500 flex items-center gap-1 font-medium">
                          <Phone className="w-3 h-3 text-slate-400" />
                          Contact:
                        </span>
                        {isNannyUnlocked ? (
                          <span className="font-bold text-slate-950 tabular-nums flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            {nanny.phone}
                          </span>
                        ) : (
                          <button
                            onClick={() => onSelectNanny(nanny)}
                            className="text-pink-700 hover:text-pink-800 font-semibold flex items-center gap-1 cursor-pointer"
                            title="Unlock CV and WhatsApp"
                          >
                            <Lock className="w-3 h-3 text-pink-600" />
                            <span>+27 82 ••• •••• (Unlock)</span>
                          </button>
                        )}
                      </div>
                    );
                  })()}

                  {/* Primary & secondary action buttons with min 44px touch target */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <button
                      onClick={() => onSelectNanny(nanny)}
                      className="py-2.5 px-3 min-h-[44px] text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center"
                    >
                      Full Profile
                    </button>
                    <button
                      onClick={() => onStartChat(nanny)}
                      className="py-2.5 px-3 min-h-[44px] text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm shadow-pink-600/20"
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
