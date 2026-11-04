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
  Clock,
  Star
} from 'lucide-react';

interface NannyProfileModalProps {
  nanny: NannyProfile | null;
  onClose: () => void;
  subscription: SubscriptionState;
  onOpenSubscription: () => void;
  onOpenInterviewScheduler: (nanny: NannyProfile) => void;
  onStartChat: (nanny: NannyProfile) => void;
  onUnlockNanny?: (nannyId: string) => void;
}

export const NannyProfileModal: React.FC<NannyProfileModalProps> = ({
  nanny,
  onClose,
  subscription,
  onOpenSubscription,
  onOpenInterviewScheduler,
  onStartChat,
  onUnlockNanny,
}) => {
  if (!nanny) return null;

  const isUnlimited = subscription.parentPlan === 'quarterly_unlimited';
  const isAlreadyUnlocked = subscription.unlockedNannyIds?.includes(nanny.id);
  const isUnlocked = isUnlimited || isAlreadyUnlocked;
  const isStarterPass = subscription.parentPlan === 'once_off_5cv';
  const usedCredits = subscription.unlockedNannyIds?.length || 0;
  const remainingCredits = Math.max(0, 5 - usedCredits);
  const cleanPhone = nanny.phone.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nanny-profile-title"
      >
        {/* Sticky Header with Close button */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-5 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-600">
            <span>{nanny.city}</span>
            <span aria-hidden="true">·</span>
            <span>{nanny.suburb}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-900 font-extrabold">{nanny.badge}</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">
          {/* Top Profile Summary */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-pink-50 text-pink-700 border border-pink-200/90 flex items-center justify-center font-extrabold text-2xl shrink-0 shadow-xs">
                {nanny.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <h2 id="nanny-profile-title" className="text-xl sm:text-2xl font-extrabold text-slate-950">
                  {nanny.name}
                </h2>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  <span>{nanny.age} years old</span>
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span>{nanny.experienceYears} years verified childcare</span>
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span className="text-slate-900 font-bold">{nanny.availability}</span>
                </div>
              </div>
            </div>

            {/* Rate & Rating info in Dark Blue */}
            <div className="sm:text-right bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-slate-100 sm:border-0">
              <div className="text-lg sm:text-xl font-extrabold text-slate-950 tabular-nums">
                R{nanny.monthlyRateZAR.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ month</span>
              </div>
              <div className="text-xs text-slate-500 mt-0.5 font-medium">
                Expected R{nanny.hourlyRateZAR}/hr · {nanny.careTypes.join(', ')}
              </div>
              <div className="text-xs font-bold text-slate-900 mt-1 flex items-center sm:justify-end gap-1">
                <Star className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                <span>★ {nanny.rating.toFixed(2)} rating ({nanny.reviewCount} reviews)</span>
              </div>
            </div>
          </div>

          {/* Quick Contact Box (Locked vs Unlocked based on Subscription) */}
          <div className={`p-4 rounded-2xl border ${
            isUnlocked 
              ? 'bg-emerald-50/70 border-emerald-200' 
              : 'bg-slate-950 text-white border-slate-800 shadow-md'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold flex items-center gap-1.5">
                  <Phone className={`w-4 h-4 ${isUnlocked ? 'text-emerald-700' : 'text-pink-400'}`} />
                  <span className={isUnlocked ? 'text-slate-900' : 'text-white'}>
                    Direct WhatsApp & Phone Contact
                  </span>
                  {isUnlocked && (
                    <span className="text-emerald-700 font-bold text-[11px]">
                      {isUnlimited ? '(3-Month Unlimited Pass)' : `(CV Unlocked · ${usedCredits}/5 Used)`}
                    </span>
                  )}
                </div>
                <div className="text-xs mt-1">
                  {isUnlocked ? (
                    <span className="font-extrabold text-slate-950 text-sm tabular-nums">
                      {nanny.phone} &nbsp;·&nbsp; {nanny.email}
                    </span>
                  ) : (
                    <span className="text-slate-300">
                      Direct number protected: <span className="font-mono text-pink-400 font-bold">+27 82 ••• ••••</span>
                    </span>
                  )}
                </div>
              </div>

              <div>
                {isUnlocked ? (
                  <div className="flex items-center gap-2">
                    <a
                      href={`https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(nanny.name)},%20I%20found%20your%20profile%20on%20NannyMatch%20SA%20and%20would%20love%20to%20discuss%20childcare.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 min-h-[44px] text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 rounded-xl transition-all cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-sm shadow-pink-600/30"
                    >
                      <span>WhatsApp Direct</span>
                    </a>
                    <a
                      href={`tel:${nanny.phone}`}
                      className="px-3.5 py-2.5 min-h-[44px] text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors cursor-pointer inline-flex items-center justify-center"
                    >
                      Call
                    </a>
                  </div>
                ) : isStarterPass && remainingCredits > 0 ? (
                  <button
                    onClick={() => onUnlockNanny?.(nanny.id)}
                    className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-pink-600/30"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock CV & WhatsApp ({remainingCredits} of 5 credits left)</span>
                  </button>
                ) : isStarterPass && remainingCredits === 0 ? (
                  <button
                    onClick={onOpenSubscription}
                    className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>5/5 Used &bull; Upgrade to Unlimited (R1,499)</span>
                  </button>
                ) : (
                  <button
                    onClick={onOpenSubscription}
                    className="w-full sm:w-auto px-4 py-2.5 min-h-[44px] text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-pink-600/30"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock CVs & WhatsApp (From R549)</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* South African Vetting & Verification Badges */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Official South African Verification Checks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">SAPS Police Criminal Record Clearance</div>
                  <div className="text-slate-500 mt-0.5">
                    {nanny.hasPoliceClearance 
                      ? nanny.policeClearanceDate 
                      : 'Pending renewal at local police station'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 flex items-start gap-2.5">
                <Heart className="w-5 h-5 text-pink-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Paediatric First Aid & CPR</div>
                  <div className="text-slate-500 mt-0.5">
                    {nanny.hasFirstAid 
                      ? (nanny.firstAidCertName || 'Level 1 Certified') 
                      : 'Not certified'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 flex items-start gap-2.5">
                <Car className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Driver’s License & Mobility</div>
                  <div className="text-slate-500 mt-0.5">
                    {nanny.hasDriversLicense 
                      ? (nanny.hasOwnCar ? 'Code 8 License + Own Reliable Car' : 'Code 8 License (Family vehicle needed)') 
                      : 'Uses public transport / Gautrain / Metro rail'}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-3.5 flex items-start gap-2.5">
                <GraduationCap className="w-5 h-5 text-slate-800 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">Education & Matric</div>
                  <div className="text-slate-500 mt-0.5">
                    {nanny.matricComplete ? 'National Senior Certificate (Matric Verified)' : 'Grade 11 + Childcare Certificates'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Care Philosophy */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              About Me & Childcare Approach
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {nanny.bio}
            </p>
          </div>

          {/* Skills & Languages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Languages Spoken</h3>
              <div className="flex flex-wrap gap-1.5 text-slate-700 font-medium">
                {nanny.languages.map((lang, idx) => (
                  <span key={lang}>
                    {lang}{idx < nanny.languages.length - 1 && <span className="text-slate-300 ml-1.5">·</span>}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 mb-2">Key Skills & Experience</h3>
              <div className="space-y-1.5 text-slate-700 font-medium">
                {nanny.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verified References */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Verified Former Family References ({nanny.references.length})
            </h3>
            <div className="space-y-3">
              {nanny.references.map((ref, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      {ref.familyInitials} · {ref.suburb}, {ref.city}
                    </span>
                    <span className="text-slate-400 font-medium">{ref.verifiedDate}</span>
                  </div>
                  <div className="text-slate-500">
                    Cared for: {ref.childrenAges} · {ref.durationMonths} months service
                  </div>
                  <p className="text-slate-700 italic border-l-2 border-pink-500 pl-3">
                    “{ref.quote}”
                  </p>
                  <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Reference contacted and authenticated by NannyMatch SA team</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Fixed Action Bar */}
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Expected: <span className="font-extrabold text-slate-950">R{nanny.monthlyRateZAR.toLocaleString()}/mo</span>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onStartChat(nanny);
              }}
              className="px-4 py-2.5 min-h-[44px] text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-700" />
              <span>Direct Chat</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenInterviewScheduler(nanny);
              }}
              className="px-4 py-2.5 min-h-[44px] text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-pink-400" />
              <span>Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
