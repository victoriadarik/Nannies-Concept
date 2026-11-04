import React from 'react';
import { ShieldCheck, HeartHandshake, CheckCircle2, ArrowRight, DollarSign, Users, Award } from 'lucide-react';

interface HowItWorksProps {
  onOpenSubscription: () => void;
  onExploreNannies: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onOpenSubscription,
  onExploreNannies,
}) => {
  return (
    <div id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Editorial Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
          The South African Meeting Portal Model
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-1.5">
          Why both families and nannies pay a subscription.
        </h2>
        <p className="text-base text-stone-600 mt-3 leading-relaxed">
          Traditional South African placement agencies charge families between R6,000 and R15,000 upfront, or skim an ongoing monthly cut off a domestic worker’s hard-earned salary. NannyMatch SA eliminates middlemen entirely through mutual, transparent subscription.
        </p>
      </div>

      {/* 3 Step Process - Editorial Human Numbering */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="text-sm font-bold text-amber-700">01. Rigorous Vetting & SAPS Checks</div>
          <h3 className="text-lg font-bold text-stone-900">
            Background verified before meeting
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Caregivers submit South African Police Service (SAPS) clearance certificates, ID books/smart cards, and contactable former family references. Our local team authenticates each reference by phone.
          </p>
          <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Criminal checks refreshed every 12 months</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="text-sm font-bold text-amber-700">02. Mutual Commitment & Spam Elimination</div>
          <h3 className="text-lg font-bold text-stone-900">
            Real families, committed professionals
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            By charging a small fee for both parties (R249/mo for parents, R39/mo for nannies), we eradicate ghosting, fake ads, and unscrupulous recruiters. Every chat and interview request comes from a serious participant.
          </p>
          <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Over 94% interview attendance rate</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="text-sm font-bold text-amber-700">03. Zero Salary Deductions & Legal Contracts</div>
          <h3 className="text-lg font-bold text-stone-900">
            Fair wages that stay with the nanny
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            100% of the agreed wage goes directly from family to caregiver via EFT or cash. Families access our built-in Sectoral Determination 7 BCEA legal contract and UIF uFiling calculators at no extra cost.
          </p>
          <div className="pt-2 text-xs text-stone-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Compliant with SA Labour Law No. 75</span>
          </div>
        </div>
      </div>

      {/* Metro Focus: Johannesburg, Durban, Cape Town */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 space-y-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
            Regional Focus Across South Africa
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
            Tailored for Johannesburg, Durban, and Cape Town family dynamics.
          </h3>
          <p className="text-stone-300 text-sm mt-2 leading-relaxed">
            From Gautrain-adjacent commutes in Rosebank to beachside estates in Umhlanga and school runs across the Southern Suburbs of Cape Town, we understand local transport, languages, and domestic expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-800 text-xs text-stone-300">
          <div className="space-y-1.5">
            <div className="text-sm font-bold text-white">Johannesburg (Gauteng)</div>
            <p className="text-stone-400 leading-relaxed">
              Sandton, Rosebank, Bryanston, Fourways, Midrand, Randburg, and Soweto. High demand for live-in cottages, Gautrain accessibility, and bilingual English/isiZulu/Sesotho caregivers.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm font-bold text-white">Durban (eThekwini & North Coast)</div>
            <p className="text-stone-400 leading-relaxed">
              Umhlanga, Ballito, Morningside, Durban North, and Westville. High demand for maternal night nurses, live-out caregivers, and infant sleep conditioning.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="text-sm font-bold text-white">Cape Town (Western Cape)</div>
            <p className="text-stone-400 leading-relaxed">
              Camps Bay, Constantia, Sea Point, Rondebosch, Claremont, and Durbanville. High demand for energetic Au Pairs with Code 8 licenses and Foundation Phase tutoring.
            </p>
          </div>
        </div>
      </div>

      {/* Attributable Testimonials adjacent to claims */}
      <div className="space-y-4">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
          Real South African Parent & Nanny Stories
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-3">
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
              “Traditional agencies in Sandton quoted us R9,500 just to interview three candidates. With NannyMatch SA, we subscribed for R249, met Nandi within 48 hours, verified her SAPS clearance on the platform, and she has been caring for our twins ever since.”
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Dr. Lerato & Mark Bester</span>
              <span className="text-stone-500">Bryanston, Johannesburg</span>
            </div>
          </div>

          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-3">
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
              “As a professional night nurse in Umhlanga, I used to lose 15% of my salary every month to an agency. Paying R39 a month on NannyMatch SA lets me keep 100% of my pay and speak directly with respectful parents.”
            </p>
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="font-bold text-stone-900">Thandiwe Mthembu</span>
              <span className="text-stone-500">Neonatal Night Specialist, Durban</span>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-stone-900">
            Ready to find or post trusted childcare?
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Join hundreds of families and verified nannies across Johannesburg, Durban, and Cape Town today.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={onExploreNannies}
            className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] text-xs font-semibold text-stone-800 bg-white hover:bg-stone-50 active:bg-stone-100 border border-stone-300 rounded-xl cursor-pointer text-center"
          >
            Explore Directory
          </button>
          <button
            onClick={onOpenSubscription}
            className="w-full sm:w-auto px-5 py-2.5 min-h-[44px] text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 active:bg-amber-900 rounded-xl cursor-pointer shadow-xs text-center"
          >
            Get Subscription Pass
          </button>
        </div>
      </div>
    </div>
  );
};
