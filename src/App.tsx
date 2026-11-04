/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  NannyProfile, 
  JobPosting, 
  SouthAfricanCity, 
  CareType, 
  SubscriptionState, 
  UserRole,
  InterviewBooking
} from './types';
import { INITIAL_NANNIES, INITIAL_JOBS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NannyDirectory } from './components/NannyDirectory';
import { NannyProfileModal } from './components/NannyProfileModal';
import { JobBoard } from './components/JobBoard';
import { SubscriptionModal } from './components/SubscriptionModal';
import { PayrollCalculatorModal } from './components/PayrollCalculatorModal';
import { InterviewSchedulerModal } from './components/InterviewSchedulerModal';
import { MessagesModal } from './components/MessagesModal';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';
import { CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<'nannies' | 'jobs' | 'subscriptions' | 'payroll' | 'how-it-works'>('nannies');
  const [userRole, setUserRole] = useState<UserRole>('parent');

  // Search & Filters State
  const [selectedCity, setSelectedCity] = useState<SouthAfricanCity | 'All'>('All');
  const [selectedCareType, setSelectedCareType] = useState<CareType | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Persistent Subscription State
  const [subscription, setSubscription] = useState<SubscriptionState>(() => {
    try {
      const saved = localStorage.getItem('nm_sa_subscription');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return {
      parentPlan: 'none',
      nannyPlan: 'none',
    };
  });

  // Persistent Jobs & Nannies State
  const [nannies, setNannies] = useState<NannyProfile[]>(() => {
    try {
      const saved = localStorage.getItem('nm_sa_nannies');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_NANNIES;
  });

  const [jobs, setJobs] = useState<JobPosting[]>(() => {
    try {
      const saved = localStorage.getItem('nm_sa_jobs');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_JOBS;
  });

  // Modal States
  const [selectedNannyModal, setSelectedNannyModal] = useState<NannyProfile | null>(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [isMessagesModalOpen, setIsMessagesModalOpen] = useState<boolean>(false);
  const [chatTargetNanny, setChatTargetNanny] = useState<NannyProfile | null>(null);
  const [interviewTargetNanny, setInterviewTargetNanny] = useState<NannyProfile | null>(null);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync subscription to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nm_sa_subscription', JSON.stringify(subscription));
    } catch {
      // Ignore
    }
  }, [subscription]);

  // Sync jobs to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nm_sa_jobs', JSON.stringify(jobs));
    } catch {
      // Ignore
    }
  }, [jobs]);

  // Handlers
  const handleUpdateSubscription = (newSub: Partial<SubscriptionState>) => {
    setSubscription((prev) => {
      const updated = { ...prev, ...newSub };
      return updated;
    });
    showToast('Subscription updated successfully! All features are now unlocked.');
  };

  const handlePostJob = (
    newJobData: Omit<JobPosting, 'id' | 'postedAt' | 'applicationsCount' | 'status'>
  ) => {
    const newJob: JobPosting = {
      ...newJobData,
      id: `job-${Date.now()}`,
      postedAt: 'Just now',
      applicationsCount: 0,
      status: 'Open',
    };
    setJobs((prev) => [newJob, ...prev]);
    showToast(`Vacancy "${newJob.title}" posted successfully in ${newJob.suburb}!`);
    setActiveTab('jobs');
  };

  const handleApplyJob = (jobId: string, coverNote: string, applicantName: string) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applicationsCount: j.applicationsCount + 1 } : j))
    );
    showToast(`Application sent on behalf of ${applicantName}! The family has been notified.`);
  };

  const handleConfirmInterview = (booking: InterviewBooking) => {
    showToast(
      `Interview scheduled with ${booking.nannyName} for ${booking.date} at ${booking.time} (${booking.interviewType})`
    );
  };

  const handleStartChat = (nanny: NannyProfile) => {
    setChatTargetNanny(nanny);
    setIsMessagesModalOpen(true);
  };

  const handleOpenInterviewScheduler = (nanny: NannyProfile) => {
    setInterviewTargetNanny(nanny);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* Top Banner indicating City Focus */}
      <div className="bg-stone-950 text-stone-300 text-[11px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-medium truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate">JHB · Durban · Cape Town · SAPS Vetted Childcare</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-stone-400 text-[11px] shrink-0">
            <span>Sectoral Determination 7 Compliant</span>
            <span aria-hidden="true">·</span>
            <span>Direct WhatsApp & Call Access</span>
          </div>
        </div>
      </div>

      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        subscription={subscription}
        onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
        onOpenMessages={() => {
          setChatTargetNanny(nannies[0]);
          setIsMessagesModalOpen(true);
        }}
        unreadCount={2}
      />

      {/* Main View Router - with bottom padding for mobile tab bar */}
      <main className="flex-1 pb-20 lg:pb-0">
        {/* Hero is prominently displayed on the primary 'nannies' tab */}
        {activeTab === 'nannies' && (
          <>
            <Hero
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedCareType={selectedCareType}
              setSelectedCareType={setSelectedCareType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onExploreClick={() => {
                const el = document.getElementById('nannies-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
              onOpenJobPostModal={() => setActiveTab('jobs')}
            />

            <NannyDirectory
              nannies={nannies}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedCareType={selectedCareType}
              setSelectedCareType={setSelectedCareType}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              subscription={subscription}
              onSelectNanny={(nan) => setSelectedNannyModal(nan)}
              onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
              onOpenInterviewScheduler={handleOpenInterviewScheduler}
              onStartChat={handleStartChat}
            />
          </>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <JobBoard
            jobs={jobs}
            userRole={userRole}
            subscription={subscription}
            onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
            onPostJob={handlePostJob}
            onApplyJob={handleApplyJob}
          />
        )}

        {/* Subscriptions Tab */}
        {activeTab === 'subscriptions' && (
          <div className="py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center max-w-xl mx-auto mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                  Transparent Meeting Portal Subscriptions
                </div>
                <h2 className="text-3xl font-bold text-stone-900 mt-1">
                  Why Both Parties Subscribe
                </h2>
                <p className="text-sm text-stone-600 mt-2">
                  No R10,000 agency recruitment cuts. Both parents and nannies pay a modest subscription to guarantee genuine identities, authenticated SAPS criminal checks, and spam-free direct communication.
                </p>
              </div>
            </div>

            <SubscriptionModal
              isOpen={true}
              onClose={() => setActiveTab('nannies')}
              userRole={userRole}
              subscription={subscription}
              onUpdateSubscription={handleUpdateSubscription}
            />
          </div>
        )}

        {/* SA Payroll & Labour Law Tab */}
        {activeTab === 'payroll' && <PayrollCalculatorModal />}

        {/* How It Works Tab */}
        {activeTab === 'how-it-works' && (
          <HowItWorks
            onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
            onExploreNannies={() => setActiveTab('nannies')}
          />
        )}
      </main>

      {/* Floating Modals */}
      {/* Full Nanny Profile View */}
      {selectedNannyModal && (
        <NannyProfileModal
          nanny={selectedNannyModal}
          onClose={() => setSelectedNannyModal(null)}
          subscription={subscription}
          onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
          onOpenInterviewScheduler={handleOpenInterviewScheduler}
          onStartChat={handleStartChat}
        />
      )}

      {/* Subscription Checkout Modal (triggered from anywhere) */}
      {isSubscriptionModalOpen && activeTab !== 'subscriptions' && (
        <SubscriptionModal
          isOpen={isSubscriptionModalOpen}
          onClose={() => setIsSubscriptionModalOpen(false)}
          userRole={userRole}
          subscription={subscription}
          onUpdateSubscription={handleUpdateSubscription}
        />
      )}

      {/* Direct Messaging Modal */}
      {isMessagesModalOpen && (
        <MessagesModal
          isOpen={isMessagesModalOpen}
          onClose={() => setIsMessagesModalOpen(false)}
          nannies={nannies}
          selectedNanny={chatTargetNanny}
          subscription={subscription}
          userRole={userRole}
          onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
          onOpenInterviewScheduler={handleOpenInterviewScheduler}
        />
      )}

      {/* Interview Booking Scheduler Modal */}
      {interviewTargetNanny && (
        <InterviewSchedulerModal
          nanny={interviewTargetNanny}
          onClose={() => setInterviewTargetNanny(null)}
          onConfirmBooking={handleConfirmInterview}
        />
      )}

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSubscription={() => setIsSubscriptionModalOpen(true)}
      />
    </div>
  );
}
