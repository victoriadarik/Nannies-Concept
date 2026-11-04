import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'nannies' | 'jobs' | 'subscriptions' | 'payroll' | 'how-it-works') => void;
  onOpenSubscription: () => void;
  onOpenCvMaker?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenSubscription, onOpenCvMaker }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs mt-12 sm:mt-16 mb-16 lg:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-8 sm:space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand with Official Logo */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <img 
                src="./assets/aistudio/NannyMatch_SA_logo_update_cleaned_8326fb61.png" 
                alt="NannyMatch SA" 
                className="h-12 w-auto object-contain rounded-xl" 
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              South Africa’s premier verified meeting portal connecting loving families and dedicated nannies across Johannesburg, Durban, and Cape Town.
            </p>
            <div className="text-[11px] text-slate-500">
              Registration No. 2024/091823/07 (South Africa)
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Platform Directory
            </div>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('nannies')}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Find Vetted Nannies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Family Job Vacancies
                </button>
              </li>
              {onOpenCvMaker && (
                <li>
                  <button
                    onClick={onOpenCvMaker}
                    className="text-pink-400 hover:text-pink-300 font-semibold transition-colors cursor-pointer"
                  >
                    Nanny ATS CV Maker (+R50)
                  </button>
                </li>
              )}
              <li>
                <button
                  onClick={() => onNavigate('subscriptions')}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  Parent & Nanny Subscriptions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('payroll')}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  SA Domestic Wage & UIF Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-pink-400 transition-colors cursor-pointer"
                >
                  How Vetting Works
                </button>
              </li>
            </ul>
          </div>

          {/* Key Metro Regions */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Metros Served
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>Johannesburg (Sandton, Rosebank, Midrand, Soweto)</li>
              <li>Durban (Umhlanga, Ballito, Morningside, Westville)</li>
              <li>Cape Town (Camps Bay, Constantia, Sea Point, Rondebosch)</li>
              <li>Pretoria & Centurion (Gauteng)</li>
            </ul>
          </div>

          {/* South African Legal & Support */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Legal & Support
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              In full compliance with Sectoral Determination 7, Basic Conditions of Employment Act (BCEA) and POPIA data privacy.
            </p>
            <div className="text-[11px] text-slate-400">
              Need assistance? Email: <span className="text-pink-400">support@nannymatch.co.za</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
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
