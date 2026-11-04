import React, { useState } from 'react';
import { SubscriptionState, UserRole } from '../types';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Smartphone, 
  Building2, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
  subscription: SubscriptionState;
  onUpdateSubscription: (newSub: Partial<SubscriptionState>) => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  userRole,
  subscription,
  onUpdateSubscription,
}) => {
  const [activeAudience, setActiveAudience] = useState<'parent' | 'nanny'>(
    userRole === 'nanny' ? 'nanny' : 'parent'
  );
  const [selectedPlan, setSelectedPlan] = useState<'parent_once_off' | 'parent_quarterly' | 'nanny_monthly' | 'nanny_quarterly'>('parent_once_off');
  const [paymentMethod, setPaymentMethod] = useState<'ozow' | 'card' | 'snapscan' | 'payfast'>('ozow');
  const [selectedBank, setSelectedBank] = useState<string>('Capitec');
  const [cardNumber, setCardNumber] = useState<string>('4000 1234 5678 9010');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvv, setCardCvv] = useState<string>('789');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const isParentActive = subscription.parentPlan !== 'none';
  const isNannyActive = subscription.nannyPlan !== 'none';

  const getPlanPrice = () => {
    if (activeAudience === 'parent') {
      return selectedPlan === 'parent_once_off' ? 549 : 1499;
    } else {
      return selectedPlan === 'nanny_monthly' ? 59 : 220;
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      const now = new Date();
      const expiryDate = new Date();
      if (selectedPlan === 'parent_quarterly' || selectedPlan === 'nanny_quarterly') {
        expiryDate.setMonth(now.getMonth() + 3);
      } else {
        expiryDate.setMonth(now.getMonth() + 1);
      }
      const formattedDate = expiryDate.toLocaleDateString('en-ZA', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      if (activeAudience === 'parent') {
        onUpdateSubscription({
          parentPlan: selectedPlan === 'parent_once_off' ? 'once_off_5cv' : 'quarterly_unlimited',
          parentExpiresAt: selectedPlan === 'parent_quarterly' ? formattedDate : undefined,
          unlockedNannyIds: subscription.unlockedNannyIds || [],
          directMessageNannyIds: subscription.directMessageNannyIds || [],
        });
      } else {
        onUpdateSubscription({
          nannyPlan: selectedPlan === 'nanny_monthly' ? 'monthly' : 'quarterly',
          nannyExpiresAt: formattedDate,
        });
      }

      setTimeout(() => {
        setPaymentSuccess(false);
        onClose();
      }, 1800);
    }, 1200);
  };

  const handleCancelParentSubscription = () => {
    onUpdateSubscription({
      parentPlan: 'none',
      parentExpiresAt: undefined,
    });
  };

  const handleCancelNannySubscription = () => {
    onUpdateSubscription({
      nannyPlan: 'none',
      nannyExpiresAt: undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl border border-slate-200/90 max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscription-modal-title"
      >
        {/* Header with Official Logo */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <img 
              src="./assets/aistudio/NannyMatch_SA_logo_update_cleaned_8326fb61.png" 
              alt="NannyMatch SA" 
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-xl shrink-0" 
            />
            <div>
              <h2 id="subscription-modal-title" className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Meeting Portal Access Passes
              </h2>
              <div className="text-xs text-slate-500">
                Direct phone & WhatsApp access with verified South African background checks
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-slate-700 cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Active Status Banners if already subscribed */}
          {activeAudience === 'parent' && isParentActive && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start sm:items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <span className="font-bold text-emerald-900">
                    {subscription.parentPlan === 'quarterly_unlimited'
                      ? '3-Month Unlimited Pass Active'
                      : 'Starter Pass Active (5 CVs & WhatsApp)'}:
                  </span>
                  <span className="text-emerald-800 ml-1">
                    {subscription.parentPlan === 'quarterly_unlimited'
                      ? `Unlimited CVs, WhatsApp & phone numbers active until ${subscription.parentExpiresAt || 'end of 3-month cycle'}.`
                      : `${subscription.unlockedNannyIds?.length || 0} of 5 CVs unlocked. Direct messaging enabled for chosen candidates.`}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancelParentSubscription}
                className="text-slate-500 hover:text-red-700 underline font-medium cursor-pointer self-end sm:self-auto"
              >
                Reset Pass
              </button>
            </div>
          )}

          {activeAudience === 'nanny' && isNannyActive && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start sm:items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5 sm:mt-0" />
                <div>
                  <span className="font-bold text-emerald-900">
                    {subscription.nannyPlan === 'quarterly' ? '3-Month Nanny Pro Active' : 'Nanny Pro Active'}:
                  </span>
                  <span className="text-emerald-800 ml-1">
                    Priority placement and SAPS verification badge active until {subscription.nannyExpiresAt || 'next renewal'}.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancelNannySubscription}
                className="text-slate-500 hover:text-red-700 underline font-medium cursor-pointer self-end sm:self-auto"
              >
                Reset Pass
              </button>
            </div>
          )}

          {/* Audience Segmented Selector */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 p-1.5 bg-slate-100 rounded-2xl text-xs font-semibold text-slate-600 w-full max-w-md border border-slate-200/60">
              <button
                type="button"
                onClick={() => {
                  setActiveAudience('parent');
                  setSelectedPlan('parent_once_off');
                }}
                className={`py-3 min-h-[44px] rounded-xl transition-all cursor-pointer text-center flex items-center justify-center ${
                  activeAudience === 'parent'
                    ? 'bg-white text-slate-950 shadow-xs font-bold'
                    : 'hover:text-slate-950'
                }`}
              >
                For Parents & Families
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveAudience('nanny');
                  setSelectedPlan('nanny_monthly');
                }}
                className={`py-3 min-h-[44px] rounded-xl transition-all cursor-pointer text-center flex items-center justify-center ${
                  activeAudience === 'nanny'
                    ? 'bg-white text-slate-950 shadow-xs font-bold'
                    : 'hover:text-slate-950'
                }`}
              >
                For Nannies & Au Pairs
              </button>
            </div>
          </div>

          {/* Pricing Plans Box */}
          {activeAudience === 'parent' ? (
            <div className="space-y-4">
              <div className="text-center max-w-lg mx-auto">
                <h3 className="text-base font-bold text-slate-950">
                  Parent Passes — Direct WhatsApp & Verified Contacts
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Traditional agencies charge R6,000 to R15,000. Choose between our once-off 5-candidate starter pass or the 3-month unlimited hiring pass.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Parent Option 1: R549 Once Off */}
                <div
                  onClick={() => setSelectedPlan('parent_once_off')}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    selectedPlan === 'parent_once_off'
                      ? 'border-pink-600 bg-pink-50/40 shadow-sm ring-1 ring-pink-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="absolute -top-3 left-4 bg-slate-900 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Once-Off · No Subscription
                  </div>

                  <div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold uppercase text-slate-700">Starter Pass</span>
                      <span className="text-xs font-semibold text-pink-600">5 CVs Unlocked</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-950 tabular-nums">R549</span>
                      <span className="text-xs font-semibold text-slate-500">once off</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Single one-time payment. Unlocks 5 complete nanny CVs, verified telephone numbers, and WhatsApp links.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span><strong>Unlock 5 full CVs</strong> with contact details</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span><strong>Direct WhatsApp & phone numbers</strong> for 5 nannies</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span><strong>Limited direct messaging</strong> to 5 people</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>SAPS criminal clearance badge check</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>BCEA Section 29 standard contract</span>
                    </div>
                  </div>
                </div>

                {/* Parent Option 2: R1499 3-Month Pass */}
                <div
                  onClick={() => setSelectedPlan('parent_quarterly')}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    selectedPlan === 'parent_quarterly'
                      ? 'border-pink-600 bg-pink-50/40 shadow-sm ring-1 ring-pink-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="absolute -top-3 right-4 bg-pink-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider shadow-sm shadow-pink-600/30">
                    Most Popular · Unlimited
                  </div>

                  <div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-bold uppercase text-slate-700">3-Month Pass</span>
                      <span className="text-xs font-semibold text-emerald-700">90 Days Full Access</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-950 tabular-nums">R1,499</span>
                      <span className="text-xs font-medium text-slate-500">/ 3 months</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Complete peace of mind. Unlimited access to all CVs and WhatsApp numbers across JHB, Durban & Cape Town.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span><strong>Unlimited CVs access</strong> across all cities</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span><strong>Unlimited WhatsApp numbers</strong> & phone calls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span><strong>Unlimited direct messaging</strong> to all candidates</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Post up to 5 family vacancies on Job Board</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Interview scheduler & UIF payroll calculator</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center max-w-lg mx-auto">
                <h3 className="text-base font-bold text-slate-950">
                  Nanny Pro — Verified Status & Direct Family Contact
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Keep 100% of your earnings. No agency commission taken from your salary. Affordable access to top families.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nanny Monthly: R59 */}
                <div
                  onClick={() => setSelectedPlan('nanny_monthly')}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    selectedPlan === 'nanny_monthly'
                      ? 'border-pink-600 bg-pink-50/40 shadow-sm ring-1 ring-pink-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-slate-700">Monthly Pass</span>
                      <span className="text-xs text-slate-500 font-medium">Cancel anytime</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-950 tabular-nums">R59</span>
                      <span className="text-xs font-medium text-slate-500">/ month</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Verified listing discovered by families actively hiring in Sandton, Umhlanga, Camps Bay, and suburbs.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Verified SAPS clearance badge on your CV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Apply to unlimited family jobs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Priority directory ranking</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>WhatsApp alert when parents book interview</span>
                    </div>
                  </div>
                </div>

                {/* Nanny 3-Months: R220 */}
                <div
                  onClick={() => setSelectedPlan('nanny_quarterly')}
                  className={`p-5 rounded-3xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    selectedPlan === 'nanny_quarterly'
                      ? 'border-pink-600 bg-pink-50/40 shadow-sm ring-1 ring-pink-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="absolute -top-3 right-4 bg-pink-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm shadow-pink-600/30">
                    Best Value
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-slate-700">3-Month Pass</span>
                      <span className="text-xs text-pink-600 font-bold">Full Placement Season</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-slate-950 tabular-nums">R220</span>
                      <span className="text-xs font-medium text-slate-500">/ 3 months</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Covers your full search period until you secure your ideal long-term placement.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>All Nanny Pro perks for 3 full months</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Featured caregiver badge & top of search</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Free CV & reference letter review</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-pink-600 shrink-0" />
                      <span>Save compared to monthly renewals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* South African Payment Gateway Form */}
          <div className="pt-4 border-t border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
              Select South African Payment Method
            </h4>

            {/* Gateway choices */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('ozow')}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'ozow'
                    ? 'border-pink-600 bg-pink-50/40 ring-1 ring-pink-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Ozow Instant EFT</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Capitec, FNB, Absa</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-pink-600 bg-pink-50/40 ring-1 ring-pink-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">Debit / Credit Card</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Visa, Mastercard</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('snapscan')}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'snapscan'
                    ? 'border-pink-600 bg-pink-50/40 ring-1 ring-pink-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">SnapScan</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Scan with phone</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('payfast')}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'payfast'
                    ? 'border-pink-600 bg-pink-50/40 ring-1 ring-pink-500/20 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">PayFast Wallet</div>
                <div className="text-[10px] text-slate-500 mt-0.5">SA Gateways</div>
              </button>
            </div>

            {/* Dynamic payment fields */}
            <form onSubmit={handleCheckout} className="space-y-4 text-xs">
              {paymentMethod === 'ozow' && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                  <div className="font-bold text-slate-900">Select Bank for Instant EFT:</div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {['Capitec', 'FNB', 'Standard Bank', 'Nedbank', 'Absa', 'TymeBank'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`p-2.5 text-center rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                          selectedBank === b
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Instant EFT via Ozow provides immediate account verification with zero transaction delays.
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
                  <div>
                    <label className="block font-semibold text-stone-800 mb-1">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-stone-900 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-stone-800 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-stone-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-stone-800 mb-1">CVV (3 digits)</label>
                      <input
                        type="text"
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        maxLength={3}
                        className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 text-stone-900 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'snapscan' && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-2">
                  <div className="w-24 h-24 bg-white border border-slate-300 rounded-2xl mx-auto flex flex-col items-center justify-center font-mono text-[11px] text-slate-700 shadow-xs">
                    <Smartphone className="w-6 h-6 text-pink-600 mb-1" />
                    <span>SnapScan</span>
                  </div>
                  <div className="font-semibold text-slate-900 text-xs">Scan to pay from the SnapScan app</div>
                  <div className="text-[11px] text-slate-500">Instant clearance across all SA banking apps</div>
                </div>
              )}

              {paymentMethod === 'payfast' && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-700 space-y-1">
                  <div className="font-semibold text-slate-900">PayFast Secure South African Checkout</div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Pay securely using debit card, credit card, Masterpass, Capitec Pay, or SCode at any Shoprite/Checkers.
                  </p>
                </div>
              )}

              {paymentSuccess ? (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto" />
                  <div className="font-bold text-sm">Payment Successful!</div>
                  <div className="text-xs">
                    Your {activeAudience === 'parent' ? 'Parent Pass' : 'Nanny Pro'} is now active across JHB, Durban & Cape Town.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-slate-500">
                    Total: <span className="font-extrabold text-slate-950 text-base">
                      R{getPlanPrice()} ZAR
                    </span>
                    <span className="text-[11px] text-slate-400 ml-1">
                      {activeAudience === 'parent'
                        ? selectedPlan === 'parent_once_off' ? '(Once-off)' : '(3 Months)'
                        : selectedPlan === 'nanny_monthly' ? '(Monthly)' : '(3 Months)'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-7 py-3 min-h-[46px] text-xs font-extrabold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 disabled:bg-slate-400 rounded-xl cursor-pointer transition-all shadow-md shadow-pink-600/30 flex items-center justify-center tracking-tight"
                  >
                    {isProcessing ? 'Authorising Payment...' : `Confirm & Pay R${getPlanPrice()}`}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
