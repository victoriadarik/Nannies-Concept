import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'nannies' | 'jobs' | 'subscriptions' | 'payroll' | 'how-it-works') => void;
  onOpenSubscription: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSubscription }) => {
  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 text-xs mt-12 sm:mt-16 mb-16 lg:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="text-white font-bold text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                NM
              </span>
              <span>NannyMatch SA</span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              South Africa’s premier verified meeting portal connecting loving families and dedicated nannies across Johannesburg, Durban, and Cape Town.
            </p>
            <div className="text-[11px] text-stone-500">
              Registration No. 2024/091823/07 (South Africa)
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <div className="text-stone-200 font-semibold uppercase tracking-wider text-[11px]">
              Platform Directory
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('nannies')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Find Vetted Nannies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Family Job Vacancies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('subscriptions')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Parent & Nanny Subscriptions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('payroll')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SA Domestic Wage & UIF Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How Vetting Works
                </button>
              </li>
            </ul>
          </div>

          {/* Key Metro Regions */}
          <div className="space-y-2.5">
            <div className="text-stone-200 font-semibold uppercase tracking-wider text-[11px]">
              Metros Served
            </div>
            <ul className="space-y-1.5 text-stone-400">
              <li>Johannesburg (Sandton, Rosebank, Midrand, Soweto)</li>
              <li>Durban (Umhlanga, Ballito, Morningside, Westville)</li>
              <li>Cape Town (Camps Bay, Constantia, Sea Point, Rondebosch)</li>
              <li>Pretoria & Centurion (Gauteng)</li>
            </ul>
          </div>

          {/* South African Legal & Support */}
          <div className="space-y-2.5">
            <div className="text-stone-200 font-semibold uppercase tracking-wider text-[11px]">
              Legal & Support
            </div>
            <p className="text-stone-400 leading-relaxed text-[11px]">
              In full compliance with Sectoral Determination 7, Basic Conditions of Employment Act (BCEA) and POPIA data privacy.
            </p>
            <div className="text-[11px] text-stone-400">
              Need assistance? Email: <span className="text-stone-300">support@nannymatch.co.za</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} NannyMatch SA (Pty) Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>POPIA Compliant</span>
            <span aria-hidden="true">·</span>
            <span>SAPS Vetting Standards</span>
            <span aria-hidden="true">·</span>
            <span>Secured via Ozow & PayFast</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
