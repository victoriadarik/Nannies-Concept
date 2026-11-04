import React from 'react';
import { UserRole, SubscriptionState } from '../types';
import { 
  Users, 
  Briefcase, 
  MessageSquare, 
  Calculator, 
  ShieldCheck, 
  Info 
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'nannies' | 'jobs' | 'subscriptions' | 'payroll' | 'how-it-works';
  setActiveTab: (tab: 'nannies' | 'jobs' | 'subscriptions' | 'payroll' | 'how-it-works') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  subscription: SubscriptionState;
  onOpenSubscription: () => void;
  onOpenMessages: () => void;
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
  unreadCount = 2,
}) => {
  const isParentSubscribed = subscription.parentPlan !== 'none';
  const isNannySubscribed = subscription.nannyPlan !== 'none';
  const isSubscribed = (userRole === 'parent' && isParentSubscribed) || (userRole === 'nanny' && isNannySubscribed);

  return (
    <>
      {/* Top Header Bar - Strictly Single Row, No Overflow Menu */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-6 h-14 sm:h-16">
          {/* Brand Wordmark */}
          <button
            onClick={() => setActiveTab('nannies')}
            className="text-left flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg shrink-0 min-h-[44px]"
            aria-label="NannyMatch SA Home"
          >
            <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm tracking-tighter shrink-0 shadow-xs">
              NM
            </span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap">
              NannyMatch <span className="text-amber-700">SA</span>
            </span>
          </button>

          {/* Desktop Nav Links (Hidden on mobile; mobile uses fixed bottom tab bar) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-600">
            <button
              onClick={() => setActiveTab('nannies')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                activeTab === 'nannies'
                  ? 'text-stone-900 border-b-2 border-amber-600 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Find Nannies
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                activeTab === 'jobs'
                  ? 'text-stone-900 border-b-2 border-amber-600 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Browse Jobs
            </button>
            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                activeTab === 'subscriptions'
                  ? 'text-stone-900 border-b-2 border-amber-600 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              Subscriptions
            </button>
            <button
              onClick={() => setActiveTab('payroll')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                activeTab === 'payroll'
                  ? 'text-stone-900 border-b-2 border-amber-600 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              SA Payroll & Laws
            </button>
            <button
              onClick={() => setActiveTab('how-it-works')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                activeTab === 'how-it-works'
                  ? 'text-stone-900 border-b-2 border-amber-600 font-semibold'
                  : 'hover:text-stone-900'
              }`}
            >
              How It Works
            </button>
          </nav>

          {/* Actions Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Role Switcher Pill - Touch Friendly */}
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg text-xs font-medium text-stone-700 border border-stone-200">
              <button
                onClick={() => setUserRole('parent')}
                className={`px-2 sm:px-2.5 py-1.5 min-h-[36px] sm:min-h-[38px] rounded-md transition-colors whitespace-nowrap cursor-pointer text-[11px] sm:text-xs ${
                  userRole === 'parent' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'hover:text-stone-950'
                }`}
                title="Switch to Parent View"
              >
                Parent
              </button>
              <button
                onClick={() => setUserRole('nanny')}
                className={`px-2 sm:px-2.5 py-1.5 min-h-[36px] sm:min-h-[38px] rounded-md transition-colors whitespace-nowrap cursor-pointer text-[11px] sm:text-xs ${
                  userRole === 'nanny' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'hover:text-stone-950'
                }`}
                title="Switch to Nanny View"
              >
                Nanny
              </button>
            </div>

            {/* Desktop Messages button (Mobile has dedicated bottom tab) */}
            <button
              onClick={onOpenMessages}
              className="hidden sm:flex relative px-3 py-1.5 min-h-[38px] text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer items-center gap-1.5"
              title="Open Conversations"
            >
              <MessageSquare className="w-3.5 h-3.5 text-stone-600" />
              <span>Messages</span>
              {unreadCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-600" aria-label={`${unreadCount} new messages`} />
              )}
            </button>

            {/* Primary Subscription Action Button */}
            <button
              onClick={onOpenSubscription}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 min-h-[38px] sm:min-h-[42px] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs flex items-center gap-1.5 ${
                isSubscribed
                  ? 'bg-emerald-800 text-white hover:bg-emerald-700'
                  : 'bg-stone-900 text-white hover:bg-stone-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {isSubscribed
                  ? (userRole === 'parent' ? 'Pass Active' : 'Pro Active')
                  : 'Pass'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* FIXED MOBILE BOTTOM NAVIGATION BAR (No Overflow Menu, Instant 1-Handed Thumb Reach) */}
      <nav
        aria-label="Mobile Navigation"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg pb-safe"
      >
        <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-stretch">
          {/* Tab 1: Find Nannies */}
          <button
            onClick={() => setActiveTab('nannies')}
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors relative ${
              activeTab === 'nannies' ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className={`w-5 h-5 ${activeTab === 'nannies' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'nannies' ? 'font-bold' : 'font-medium'}`}>
              Nannies
            </span>
            {activeTab === 'nannies' && (
              <span className="absolute top-1 w-1 h-1 rounded-full bg-amber-700" />
            )}
          </button>

          {/* Tab 2: Jobs */}
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors relative ${
              activeTab === 'jobs' ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Briefcase className={`w-5 h-5 ${activeTab === 'jobs' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'jobs' ? 'font-bold' : 'font-medium'}`}>
              Jobs
            </span>
            {activeTab === 'jobs' && (
              <span className="absolute top-1 w-1 h-1 rounded-full bg-amber-700" />
            )}
          </button>

          {/* Tab 3: Messages */}
          <button
            onClick={onOpenMessages}
            className="flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors relative text-stone-500 hover:text-stone-800"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5 stroke-[1.75]" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-600 ring-2 ring-white" />
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
              activeTab === 'payroll' ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Calculator className={`w-5 h-5 ${activeTab === 'payroll' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'payroll' ? 'font-bold' : 'font-medium'}`}>
              Wage/UIF
            </span>
            {activeTab === 'payroll' && (
              <span className="absolute top-1 w-1 h-1 rounded-full bg-amber-700" />
            )}
          </button>

          {/* Tab 5: Subscriptions & Pass */}
          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 cursor-pointer transition-colors relative ${
              activeTab === 'subscriptions' ? 'text-amber-700' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldCheck className={`w-5 h-5 ${activeTab === 'subscriptions' ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
            <span className={`text-[10px] tracking-tight mt-1 ${activeTab === 'subscriptions' ? 'font-bold' : 'font-medium'}`}>
              Pass
            </span>
            {activeTab === 'subscriptions' && (
              <span className="absolute top-1 w-1 h-1 rounded-full bg-amber-700" />
            )}
          </button>
        </div>
      </nav>
    </>
  );
};
