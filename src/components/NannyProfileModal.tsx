import React from 'react';
import { NannyProfile, SubscriptionState } from '../types';
import { 
  X, 
  ShieldCheck, 
  Phone, 
  MessageSquare, 
  Calendar, 
  Car, 
  GraduationCap, 
  Heart, 
  MapPin, 
  Lock, 
  CheckCircle2, 
  Share2,
  Clock
} from 'lucide-react';

interface NannyProfileModalProps {
  nanny: NannyProfile | null;
  onClose: () => void;
  subscription: SubscriptionState;
  onOpenSubscription: () => void;
  onOpenInterviewScheduler: (nanny: NannyProfile) => void;
  onStartChat: (nanny: NannyProfile) => void;
}

export const NannyProfileModal: React.FC<NannyProfileModalProps> = ({
  nanny,
  onClose,
  subscription,
  onOpenSubscription,
  onOpenInterviewScheduler,
  onStartChat,
}) => {
  if (!nanny) return null;

  const isParentSubscribed = subscription.parentPlan !== 'none';
  const cleanPhone = nanny.phone.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-stone-200 max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nanny-profile-title"
      >
        {/* Sticky Header with Close button */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-stone-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <span>{nanny.city}</span>
            <span aria-hidden="true">·</span>
            <span>{nanny.suburb}</span>
            <span aria-hidden="true">·</span>
            <span>{nanny.badge}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Top Profile Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-900 border border-amber-200 flex items-center justify-center font-bold text-xl shrink-0">
                {nanny.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h2 id="nanny-profile-title" className="text-xl sm:text-2xl font-bold text-stone-900">
                  {nanny.name}
                </h2>
                <div className="text-xs text-stone-500 mt-0.5">
                  <span>{nanny.age} years old</span>
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span>{nanny.experienceYears} years professional childcare</span>
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span className="text-stone-800 font-semibold">{nanny.availability}</span>
                </div>
              </div>
            </div>

            {/* Rate & Rating info */}
            <div className="sm:text-right bg-stone-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
              <div className="text-lg font-bold text-stone-900 tabular-nums">
                R{nanny.monthlyRateZAR.toLocaleString()} <span className="text-xs font-normal text-stone-500">/ month</span>
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                Expected R{nanny.hourlyRateZAR}/hr · {nanny.careTypes.join(', ')}
              </div>
              <div className="text-xs font-semibold text-stone-800 mt-1">
                ★ {nanny.rating.toFixed(2)} rating ({nanny.reviewCount} parent reviews)
              </div>
            </div>
          </div>

          {/* Quick Contact Box (Locked vs Unlocked based on Subscription) */}
          <div className={`p-4 rounded-xl border ${
            isParentSubscribed 
              ? 'bg-emerald-50/70 border-emerald-200' 
              : 'bg-stone-50 border-stone-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-stone-700" />
                  <span>Direct WhatsApp & Phone Access</span>
                  {isParentSubscribed && (
                    <span className="text-emerald-700 font-medium text-[11px]">(Parent Pass Active)</span>
                  )}
                </div>
                <div className="text-xs text-stone-600 mt-1">
                  {isParentSubscribed ? (
                    <span className="font-semibold text-stone-900 text-sm tabular-nums">
                      {nanny.phone} &nbsp;·&nbsp; {nanny.email}
                    </span>
                  ) : (
                    <span>
                      Number hidden to protect against spam: <span className="font-mono text-stone-800">+27 82 ••• ••••</span>
                    </span>
                  )}
                </div>
              </div>

              <div>
                {isParentSubscribed ? (
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(nanny.name)},%20I%20found%20your%20profile%20on%20NannyMatch%20SA%20and%20would%20love%20to%20discuss%20childcare.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>WhatsApp Direct</span>
                    </a>
                    <a
                      href={`tel:${nanny.phone}`}
                      className="px-3 py-2 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-50 border border-stone-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Call
                    </a>
                  </div>
                ) : (
                  <button
                    onClick={onOpenSubscription}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock Number (R249/mo)</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* South African Vetting & Verification Badges */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Official South African Verification Checks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">SAPS Police Criminal Record Clearance</div>
                  <div className="text-stone-500 mt-0.5">
                    {nanny.hasPoliceClearance 
                      ? nanny.policeClearanceDate 
                      : 'Pending renewal at local police station'}
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-start gap-2.5">
                <Heart className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Paediatric First Aid & CPR</div>
                  <div className="text-stone-500 mt-0.5">
                    {nanny.hasFirstAid 
                      ? (nanny.firstAidCertName || 'Level 1 Certified') 
                      : 'Not certified'}
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-start gap-2.5">
                <Car className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Driver’s License & Mobility</div>
                  <div className="text-stone-500 mt-0.5">
                    {nanny.hasDriversLicense 
                      ? (nanny.hasOwnCar ? 'Code 8 License + Own Reliable Car' : 'Code 8 License (Family vehicle needed)') 
                      : 'Uses public transport / Gautrain / Metro rail'}
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 flex items-start gap-2.5">
                <GraduationCap className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-stone-900">Education & Matric</div>
                  <div className="text-stone-500 mt-0.5">
                    {nanny.matricComplete ? 'National Senior Certificate (Matric Verified)' : 'Grade 11 + Childcare Certificates'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Care Philosophy */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              About Me & Childcare Approach
            </h3>
            <p className="text-sm text-stone-700 leading-relaxed bg-stone-50/70 p-4 rounded-xl border border-stone-100">
              {nanny.bio}
            </p>
          </div>

          {/* Skills & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <h3 className="font-semibold text-stone-800 mb-2">Languages Spoken</h3>
              <div className="flex flex-wrap gap-1.5 text-stone-700">
                {nanny.languages.map((lang, idx) => (
                  <span key={lang}>
                    {lang}{idx < nanny.languages.length - 1 && <span className="text-stone-400 ml-1.5">·</span>}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 mb-2">Key Skills & Experience</h3>
              <div className="space-y-1 text-stone-600">
                {nanny.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verified References */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Verified Former Family References ({nanny.references.length})
            </h3>
            <div className="space-y-3">
              {nanny.references.map((ref, idx) => (
                <div key={idx} className="bg-stone-50 border border-stone-200/90 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">
                      {ref.familyInitials} · {ref.suburb}, {ref.city}
                    </span>
                    <span className="text-stone-400">{ref.verifiedDate}</span>
                  </div>
                  <div className="text-stone-500">
                    Cared for: {ref.childrenAges} · {ref.durationMonths} months service
                  </div>
                  <p className="text-stone-700 italic border-l-2 border-amber-300 pl-3">
                    “{ref.quote}”
                  </p>
                  <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                    <span>Reference contacted and authenticated by NannyMatch SA team</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Fixed Action Bar */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-stone-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Expected: <span className="font-semibold text-stone-900">R{nanny.monthlyRateZAR.toLocaleString()}/mo</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onStartChat(nanny);
              }}
              className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Chat</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInterviewScheduler(nanny);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
