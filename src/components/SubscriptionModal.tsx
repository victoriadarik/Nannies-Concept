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
  const [selectedPlan, setSelectedPlan] = useState<'parent_monthly' | 'parent_quarterly' | 'nanny_monthly' | 'nanny_quarterly'>('parent_monthly');
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

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);

      const now = new Date();
      const expiryDate = new Date();
      expiryDate.setMonth(now.getMonth() + 1);
      const formattedDate = expiryDate.toLocaleDateString('en-ZA', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      if (activeAudience === 'parent') {
        onUpdateSubscription({
          parentPlan: selectedPlan === 'parent_monthly' ? 'monthly' : 'quarterly',
          parentExpiresAt: formattedDate,
        });
      } else {
        onUpdateSubscription({
          nannyPlan: selectedPlan === 'nanny_monthly' ? 'pro' : 'pro',
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-stone-200 max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscription-modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-stone-100 flex items-center justify-between z-10">
          <div>
            <h2 id="subscription-modal-title" className="text-lg font-bold text-stone-900">
              South African Meeting Portal Subscriptions
            </h2>
            <div className="text-xs text-stone-500">
              Fair, direct access for both families and professional nannies across JHB, Durban & Cape Town
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-stone-400 hover:text-stone-700 cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Active Status Banners if already subscribed */}
          {activeAudience === 'parent' && isParentActive && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-900">Parent Pass Active:</span>
                  <span className="text-emerald-800 ml-1">
                    Direct phone & WhatsApp contact unlocked until {subscription.parentExpiresAt || 'Next Month'}.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancelParentSubscription}
                className="text-stone-500 hover:text-red-700 underline font-medium cursor-pointer"
              >
                Cancel Pass
              </button>
            </div>
          )}

          {activeAudience === 'nanny' && isNannyActive && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <span className="font-bold text-emerald-900">Nanny Pro Active:</span>
                  <span className="text-emerald-800 ml-1">
                    Priority placement and SAPS badge active until {subscription.nannyExpiresAt || 'Next Month'}.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancelNannySubscription}
                className="text-stone-500 hover:text-red-700 underline font-medium cursor-pointer"
              >
                Cancel Pro
              </button>
            </div>
          )}

          {/* Audience Segmented Selector - Large Touch Targets */}
          <div className="flex justify-center">
            <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl text-xs font-semibold text-stone-600 w-full max-w-md">
              <button
                type="button"
                onClick={() => {
                  setActiveAudience('parent');
                  setSelectedPlan('parent_monthly');
                }}
                className={`py-3 min-h-[44px] rounded-lg transition-all cursor-pointer text-center flex items-center justify-center ${
                  activeAudience === 'parent'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'hover:text-stone-950'
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
                className={`py-3 min-h-[44px] rounded-lg transition-all cursor-pointer text-center flex items-center justify-center ${
                  activeAudience === 'nanny'
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'hover:text-stone-950'
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
                <h3 className="text-base font-bold text-stone-900">
                  Parent Pass — Hire Direct With Zero Commission
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Agencies charge R5,000 to R15,000 placement fees. NannyMatch SA empowers you to meet and hire directly for a small transparent monthly fee.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Parent Monthly */}
                <div
                  onClick={() => setSelectedPlan('parent_monthly')}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    selectedPlan === 'parent_monthly'
                      ? 'border-amber-600 bg-amber-50/20'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-stone-600">Monthly Pass</span>
                      <span className="text-xs text-stone-500">Cancel anytime</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-stone-900 tabular-nums">R249</span>
                      <span className="text-xs text-stone-500">/ month</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-2">
                      Ideal for families actively interviewing candidates in JHB, Durban, or Cape Town this month.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Unlock direct WhatsApp & phone numbers</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Unlimited candidate direct messaging</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Download SAPS clearance authentication</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>SA Domestic Contract & Payslip Generator</span>
                    </div>
                  </div>
                </div>

                {/* Parent Quarterly */}
                <div
                  onClick={() => setSelectedPlan('parent_quarterly')}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    selectedPlan === 'parent_quarterly'
                      ? 'border-amber-600 bg-amber-50/20'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="absolute -top-3 right-4 bg-amber-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Save 33% (Popular)
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-stone-600">3-Month Pass</span>
                      <span className="text-xs text-stone-500">R166/month</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-stone-900 tabular-nums">R499</span>
                      <span className="text-xs text-stone-500">/ 3 months</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-2">
                      Comprehensive search, trial period, backup babysitters, and ongoing employment contract tools.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Everything in Monthly Pass</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Post up to 5 family vacancies</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Backup nanny emergency support list</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Priority support via WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center max-w-lg mx-auto">
                <h3 className="text-base font-bold text-stone-900">
                  Nanny Pro — Verified Status & Priority Matching
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Keep 100% of your earnings. No agency takes a cut of your monthly salary. A tiny monthly subscription covers your official verification badge.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nanny Monthly */}
                <div
                  onClick={() => setSelectedPlan('nanny_monthly')}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    selectedPlan === 'nanny_monthly'
                      ? 'border-amber-600 bg-amber-50/20'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-stone-600">Nanny Pro Monthly</span>
                      <span className="text-xs text-stone-500">Cancel anytime</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-stone-900 tabular-nums">R39</span>
                      <span className="text-xs text-stone-500">/ month</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-2">
                      Get discovered first by families in Sandton, Umhlanga, Camps Bay and across SA.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Verified SAPS clearance badge on profile</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Apply to unlimited family jobs</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Priority rank in search results</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>WhatsApp alert when parents book interview</span>
                    </div>
                  </div>
                </div>

                {/* Nanny Quarterly */}
                <div
                  onClick={() => setSelectedPlan('nanny_quarterly')}
                  className={`p-5 rounded-xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                    selectedPlan === 'nanny_quarterly'
                      ? 'border-amber-600 bg-amber-50/20'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="absolute -top-3 right-4 bg-amber-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Best Value
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-stone-600">3-Month Pro</span>
                      <span className="text-xs text-stone-500">Save 25%</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-stone-900 tabular-nums">R89</span>
                      <span className="text-xs text-stone-500">/ 3 months</span>
                    </div>
                    <p className="text-xs text-stone-600 mt-2">
                      Covers your full placement season until you secure your ideal long-term placement.
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-700">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>All Nanny Pro perks for 3 months</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Featured caregiver banner badge</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Free CV & reference letter review</span>
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
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'ozow'
                    ? 'border-amber-600 bg-amber-50/30'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">Ozow Instant EFT</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Capitec, FNB, Absa</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'border-amber-600 bg-amber-50/30'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">Debit / Credit Card</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Visa, Mastercard</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('snapscan')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'snapscan'
                    ? 'border-amber-600 bg-amber-50/30'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">SnapScan</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Scan with phone</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('payfast')}
                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                  paymentMethod === 'payfast'
                    ? 'border-amber-600 bg-amber-50/30'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="text-xs font-bold text-stone-900">PayFast Wallet</div>
                <div className="text-[10px] text-stone-500 mt-0.5">SA Gateways</div>
              </button>
            </div>

            {/* Dynamic payment fields */}
            <form onSubmit={handleCheckout} className="space-y-4 text-xs">
              {paymentMethod === 'ozow' && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-3">
                  <div className="font-semibold text-stone-800">Select Bank for Instant EFT:</div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {['Capitec', 'FNB', 'Standard Bank', 'Nedbank', 'Absa', 'TymeBank'].map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBank(b)}
                        className={`p-2 text-center rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                          selectedBank === b
                            ? 'bg-amber-700 text-white border-amber-700 shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-stone-500">
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
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-center space-y-2">
                  <div className="w-24 h-24 bg-white border border-stone-300 rounded-xl mx-auto flex items-center justify-center font-mono text-[11px] text-stone-600">
                    [SnapScan QR]
                  </div>
                  <div className="font-semibold text-stone-800">Scan to pay from the SnapScan app</div>
                  <div className="text-[11px] text-stone-500">Instant clearance across all SA networks</div>
                </div>
              )}

              {paymentMethod === 'payfast' && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-stone-700 space-y-1">
                  <div className="font-semibold text-stone-900">PayFast Secure Checkout</div>
                  <p className="text-[11px] text-stone-500">
                    Pay securely using debit card, credit card, Masterpass, or SCode at any Shoprite/Checkers.
                  </p>
                </div>
              )}

              {paymentSuccess ? (
                <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-xl text-center space-y-1">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto" />
                  <div className="font-bold text-sm">Payment Successful!</div>
                  <div className="text-xs">
                    Your {activeAudience === 'parent' ? 'Parent Pass' : 'Nanny Pro'} is now active across JHB, Durban & Cape Town.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-stone-500">
                    Total: <span className="font-bold text-stone-900 text-sm">
                      {activeAudience === 'parent'
                        ? selectedPlan === 'parent_monthly' ? 'R249 ZAR' : 'R499 ZAR'
                        : selectedPlan === 'nanny_monthly' ? 'R39 ZAR' : 'R89 ZAR'}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full sm:w-auto px-6 py-3 min-h-[44px] text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 active:bg-amber-900 disabled:bg-stone-400 rounded-xl cursor-pointer transition-colors shadow-xs flex items-center justify-center"
                  >
                    {isProcessing ? 'Authorising Payment...' : 'Confirm & Activate Subscription'}
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
