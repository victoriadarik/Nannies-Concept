import React from 'react';
import { UserRole, SubscriptionState } from '../types';
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  Calculator, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'nannies' | 'jobs' | 'subscriptions' | 'payroll' | 'how-it-works';
  setActiveTab: (tab: 'nannies' | 'jobs' | 'subscriptions' | 'payroll' | 'how-it-works') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  subscription: SubscriptionState;
  onOpenSubscription: () => void;
  onOpenMessages: () => void;
  onOpenCvMaker: () => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  subscription,
  onOpenSubscription,
  onOpenMessages,
  onOpenCvMaker,
  unreadCount = 2,
}) => {
  const isParentSubscribed = subscription.parentPlan !== 'none';
  const isNannySubscribed = subscription.nannyPlan !== 'none';
  const isSubscribed = (userRole === 'parent' && isParentSubscribed) || (userRole === 'nanny' && isNannySubscribed);

  return (
    <>
      {/* Top Header Bar - Clean Modern Brand Architecture */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-6 h-14 sm:h-16">
          {/* Official Brand Logo */}
          <button
            onClick={() => setActiveTab('nannies')}
            className="text-left flex items-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 rounded-lg shrink-0 min-h-[44px]"
            aria-label="NannyMatch SA Home"
          >
            <img 
              src="./assets/aistudio/NannyMatch_SA_logo_update_cleaned_8326fb61.png" 
              alt="NannyMatch SA - Connecting Nannies & Families" 
              className="h-10 sm:h-12 w-auto object-contain shrink-0" 
            />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('nannies')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1.5 ${
                activeTab === 'nannies'
                  ? 'text-slate-950 border-b-2 border-pink-600 font-bold'
                  : 'hover:text-slate-950'
              }`}
            >
              Find Nannies
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1.5 ${
                activeTab === 'jobs'
                  ? 'text-slate-950 border-b-2 border-pink-600 font-bold'
                  : 'hover:text-slate-950'
              }`}
            >
              Family Vacancies
            </button>
            <button
              onClick={onOpenCvMaker}
              className="whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1.5 text-pink-600 hover:text-pink-700 font-bold flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nanny CV Maker (ATS)</span>
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1.5 ${
                activeTab === 'subscriptions'
                  ? 'text-slate-950 border-b-2 border-pink-600 font-bold'
                  : 'hover:text-slate-950'
              }`}
            >
              Plans & Pricing
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1.5 ${
                activeTab === 'payroll'
                  ? 'text-slate-950 border-b-2 border-pink-600 font-bold'
                  : 'hover:text-slate-950'
              }`}
            >
              SA Wage & Contract Law
            </button>
            <button
              onClick={() => setActiveTab('how-it-works')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1.5 ${
                activeTab === 'how-it-works'
                  ? 'text-slate-950 border-b-2 border-pink-600 font-bold'
                  : 'hover:text-slate-950'
              }`}
            >
              Vetting Guarantee
            </button>
          </nav>

          {/* Actions Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Role Switcher Pill - Modern Segmented */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200/80">
              <button
                onClick={() => setUserRole('parent')}
                className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-[38px] rounded-lg transition-all whitespace-nowrap cursor-pointer text-[11px] sm:text-xs ${
                  userRole === 'parent' ? 'bg-slate-900 text-white shadow-xs font-bold' : 'hover:text-slate-950'
                }`}
                title="Switch to Parent View"
              >
                For Parents
              </button>
              <button
                onClick={() => setUserRole('nanny')}
                className={`px-2.5 sm:px-3 py-1.5 min-h-[36px] sm:min-h-[38px] rounded-lg transition-all whitespace-nowrap cursor-pointer text-[11px] sm:text-xs ${
                  userRole === 'nanny' ? 'bg-slate-900 text-white shadow-xs font-bold' : 'hover:text-slate-950'
                }`}
                title="Switch to Nanny View"
              >
                For Nannies
              </button>
            </div>

            {/* Quick CV Maker button if nanny */}
            {userRole === 'nanny' && (
              <button
                onClick={onOpenCvMaker}
                className="hidden md:flex px-3 py-1.5 min-h-[38px] text-xs font-bold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-xl transition-colors cursor-pointer items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Make ATS CV</span>
              </button>
            )}

            {/* Desktop Messages button */}
            <button
              onClick={onOpenMessages}
              className="hidden sm:flex relative px-3 py-1.5 min-h-[38px] text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer items-center gap-1.5 border border-slate-200/60"
              title="Open Conversations"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-700" />
              <span>Messages</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-pink-600" aria-label={`${unreadCount} new messages`} />
              )}
            </button>

            {/* Primary Subscription Action Button - Dark Blue & Pink Accent */}
            <button
              onClick={onOpenSubscription}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 min-h-[38px] sm:min-h-[42px] text-xs font-bold rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-xs flex items-center gap-1.5 ${
                isSubscribed
                  ? 'bg-slate-900 text-pink-400 hover:bg-slate-800 border border-slate-700'
                  : 'bg-pink-600 hover:bg-pink-700 text-white shadow-sm shadow-pink-600/30'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${isSubscribed ? 'text-pink-400' : 'text-white'}`} />
              <span>
                {isSubscribed
                  ? (userRole === 'parent' ? 'Pass Active' : 'Pro Active')
                  : 'Get Pass'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* FIXED MOBILE BOTTOM NAVIGATION BAR (Dark Blue & Pink Accents, No Overflow Menu) */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl pb-safe"
      >
        <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-stretch">
          {/* Tab 1: Find Nannies */}
          <button
            onClick={() => setActiveTab('nannies')}
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors relative ${
              activeTab === 'nannies' ? 'text-pink-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className={`w-5 h-5 ${activeTab === 'nannies' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'nannies' ? 'font-bold' : 'font-medium'}`}>
              Nannies
            </span>
            {activeTab === 'nannies' && (
              <span className="absolute top-1 w-1.5 h-1.5 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50" />
            )}
          </button>

          {/* Tab 2: Jobs */}
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors relative ${
              activeTab === 'jobs' ? 'text-pink-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className={`w-5 h-5 ${activeTab === 'jobs' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'jobs' ? 'font-bold' : 'font-medium'}`}>
              Jobs
            </span>
            {activeTab === 'jobs' && (
              <span className="absolute top-1 w-1.5 h-1.5 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50" />
            )}
          </button>

          {/* Tab 3: Messages */}
          <button
            onClick={onOpenMessages}
            className="flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors relative text-slate-400 hover:text-slate-200"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 stroke-[1.75]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pink-500 ring-2 ring-slate-950" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 font-medium">
              Messages
            </span>
          </button>

          {/* Tab 4: SA Payroll & Law */}
          <button
            onClick={() => setActiveTab('payroll')}
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors relative ${
              activeTab === 'payroll' ? 'text-pink-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calculator className={`w-5 h-5 ${activeTab === 'payroll' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'payroll' ? 'font-bold' : 'font-medium'}`}>
              Wage/UIF
            </span>
            {activeTab === 'payroll' && (
              <span className="absolute top-1 w-1.5 h-1.5 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50" />
            )}
          </button>

          {/* Tab 5: Subscriptions & Pass */}
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors relative ${
              activeTab === 'subscriptions' ? 'text-pink-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className={`w-5 h-5 ${activeTab === 'subscriptions' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'subscriptions' ? 'font-bold' : 'font-medium'}`}>
              Pass
            </span>
            {activeTab === 'subscriptions' && (
              <span className="absolute top-1 w-1.5 h-1.5 rounded-full bg-pink-500 shadow-sm shadow-pink-500/50" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
