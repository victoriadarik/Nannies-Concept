import React from 'react';
import { UserRole, SubscriptionState } from '../types';
import { ShieldCheck, UserCheck, HeartHandshake } from 'lucide-react';

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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand title, one line wordmark */}
        <button
          onClick={() => setActiveTab('nannies')}
          className="text-left group flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded"
        >
          <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm tracking-tighter">
            NM
          </span>
          <span className="text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 group-hover:text-amber-700 transition-colors">
            NannyMatch SA
          </span>
        </button>

        {/* Zone 2: 4-5 nav links, 1-2 word labels, single line */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
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

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick role switcher segmented control */}
          <div className="hidden sm:flex items-center bg-stone-100 p-0.5 rounded-lg text-xs font-medium text-stone-700 border border-stone-200">
            <button
              onClick={() => setUserRole('parent')}
              className={`px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                userRole === 'parent' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'hover:text-stone-950'
              }`}
            >
              Parent View
            </button>
            <button
              onClick={() => setUserRole('nanny')}
              className={`px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                userRole === 'nanny' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'hover:text-stone-950'
              }`}
            >
              Nanny View
            </button>
          </div>

          {/* Messages link */}
          <button
            onClick={onOpenMessages}
            className="relative px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
            title="Open Conversations"
          >
            <span>Messages</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-600" aria-label={`${unreadCount} new messages`} />
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenSubscription}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs ${
              (userRole === 'parent' && isParentSubscribed) || (userRole === 'nanny' && isNannySubscribed)
                ? 'bg-emerald-800 text-white hover:bg-emerald-700'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {(userRole === 'parent' && isParentSubscribed)
              ? 'Parent Pass Active'
              : (userRole === 'nanny' && isNannySubscribed)
              ? 'Nanny Pro Active'
              : 'Upgrade Pass'}
          </button>
        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="lg:hidden flex items-center overflow-x-auto gap-4 px-4 py-2 border-t border-stone-100 text-xs font-medium text-stone-600 no-scrollbar">
        <button
          onClick={() => setActiveTab('nannies')}
          className={`whitespace-nowrap shrink-0 ${activeTab === 'nannies' ? 'text-amber-700 font-bold' : ''}`}
        >
          Find Nannies
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`whitespace-nowrap shrink-0 ${activeTab === 'jobs' ? 'text-amber-700 font-bold' : ''}`}
        >
          Jobs
        </button>
        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`whitespace-nowrap shrink-0 ${activeTab === 'subscriptions' ? 'text-amber-700 font-bold' : ''}`}
        >
          Subscriptions
        </button>
        <button
          onClick={() => setActiveTab('payroll')}
          className={`whitespace-nowrap shrink-0 ${activeTab === 'payroll' ? 'text-amber-700 font-bold' : ''}`}
        >
          SA Payroll & Wage
        </button>
        <button
          onClick={() => setActiveTab('how-it-works')}
          className={`whitespace-nowrap shrink-0 ${activeTab === 'how-it-works' ? 'text-amber-700 font-bold' : ''}`}
        >
          How It Works
        </button>
      </div>
    </header>
  );
};
