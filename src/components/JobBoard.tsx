import React, { useState } from 'react';
import { JobPosting, SouthAfricanCity, CareType, SubscriptionState, UserRole } from '../types';
import { SUBURBS_BY_CITY } from '../data/mockData';
import { 
  Briefcase, 
  MapPin, 
  Plus, 
  Send, 
  Clock, 
  Home, 
  CheckCircle2, 
  AlertCircle,
  X
} from 'lucide-react';

interface JobBoardProps {
  jobs: JobPosting[];
  userRole: UserRole;
  subscription: SubscriptionState;
  onOpenSubscription: () => void;
  onPostJob: (newJob: Omit<JobPosting, 'id' | 'postedAt' | 'applicationsCount' | 'status'>) => void;
  onApplyJob: (jobId: string, coverNote: string, applicantName: string) => void;
}

export const JobBoard: React.FC<JobBoardProps> = ({
  jobs,
  userRole,
  subscription,
  onOpenSubscription,
  onPostJob,
  onApplyJob,
}) => {
  const [selectedCity, setSelectedCity] = useState<SouthAfricanCity | 'All'>('All');
  const [selectedCareType, setSelectedCareType] = useState<CareType | 'All'>('All');
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  const [activeApplyJob, setActiveApplyJob] = useState<JobPosting | null>(null);

  // Application form state
  const [applicantName, setApplicantName] = useState<string>('Nandi Khumalo');
  const [applicantNote, setApplicantNote] = useState<string>(
    'Good day, I am interested in this childcare position. I have 8 years experience with toddlers, valid SAPS clearance, and St John Level 1 CPR. I look forward to hearing from you.'
  );
  const [applySuccessMessage, setApplySuccessMessage] = useState<string>('');

  // Post Job form state
  const [jobTitle, setJobTitle] = useState('');
  const [familyDisplayName, setFamilyDisplayName] = useState('');
  const [jobCity, setJobCity] = useState<SouthAfricanCity>('Johannesburg');
  const [jobSuburb, setJobSuburb] = useState('Sandton');
  const [jobCareType, setJobCareType] = useState<CareType>('Live-in Nanny');
  const [jobChildrenDetails, setJobChildrenDetails] = useState('');
  const [jobSalaryZAR, setJobSalaryZAR] = useState(8000);
  const [jobHours, setJobHours] = useState('Monday - Friday, 07:30 - 16:30');
  const [jobLiveIn, setJobLiveIn] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [jobRequirements, setJobRequirements] = useState('SAPS Police Clearance, First Aid CPR, 3+ years experience');

  const isNannySubscribed = subscription.nannyPlan !== 'none';
  const isParentSubscribed = subscription.parentPlan !== 'none';

  const filteredJobs = jobs.filter((job) => {
    if (selectedCity !== 'All' && job.city !== selectedCity) return false;
    if (selectedCareType !== 'All' && job.careType !== selectedCareType) return false;
    return true;
  });

  const handlePostJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !familyDisplayName || !jobDescription) return;

    onPostJob({
      title: jobTitle,
      familyDisplayName: familyDisplayName.endsWith('Family') ? familyDisplayName : `${familyDisplayName} Family`,
      city: jobCity,
      suburb: jobSuburb,
      careType: jobCareType,
      childrenDetails: jobChildrenDetails || '1 Child',
      monthlySalaryZAR: Number(jobSalaryZAR),
      hoursDescription: jobHours,
      startDate: 'Flexible',
      liveInProvided: jobLiveIn,
      requirements: jobRequirements.split(',').map((r) => r.trim()).filter(Boolean),
      description: jobDescription,
    });

    setShowPostModal(false);
    // Reset form
    setJobTitle('');
    setFamilyDisplayName('');
    setJobDescription('');
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeApplyJob || !applicantName || !applicantNote) return;

    onApplyJob(activeApplyJob.id, applicantNote, applicantName);
    setApplySuccessMessage(`Application sent to ${activeApplyJob.familyDisplayName}! They will review your credentials and contact you.`);
    setTimeout(() => {
      setActiveApplyJob(null);
      setApplySuccessMessage('');
    }, 2000);
  };

  return (
    <div id="jobs-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
            South African Family Vacancies
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mt-1">
            Childcare Jobs & Family Postings
          </h2>
          <div className="text-xs sm:text-sm text-stone-500 mt-1">
            Browse verified household vacancies in Johannesburg, Durban, and Cape Town
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPostModal(true)}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Post a Family Job</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* City Filter */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg text-xs font-medium text-stone-600">
          <button
            onClick={() => setSelectedCity('All')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              selectedCity === 'All' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
            }`}
          >
            All SA
          </button>
          <button
            onClick={() => setSelectedCity('Johannesburg')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              selectedCity === 'Johannesburg' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
            }`}
          >
            Johannesburg
          </button>
          <button
            onClick={() => setSelectedCity('Durban')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              selectedCity === 'Durban' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
            }`}
          >
            Durban
          </button>
          <button
            onClick={() => setSelectedCity('Cape Town')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              selectedCity === 'Cape Town' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'hover:text-stone-900'
            }`}
          >
            Cape Town
          </button>
        </div>

        {/* Care Type Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-500 font-medium">Care Category:</span>
          <select
            value={selectedCareType}
            onChange={(e) => setSelectedCareType(e.target.value as CareType | 'All')}
            aria-label="Filter by Care Category"
            className="bg-stone-50 border border-stone-200 text-stone-800 rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="All">All Categories</option>
            <option value="Live-in Nanny">Live-in Nanny</option>
            <option value="Live-out Nanny">Live-out Nanny</option>
            <option value="Au Pair">Au Pair</option>
            <option value="Night Nurse & Newborn">Night Nurse & Newborn</option>
          </select>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white border border-stone-200 rounded-xl p-12 text-center space-y-3">
            <div className="text-base font-semibold text-stone-800">
              No family jobs currently posted for this filter.
            </div>
            <div className="text-xs text-stone-500">
              Are you a family seeking a nanny? Post your job now to receive applications from verified caregivers.
            </div>
            <button
              onClick={() => setShowPostModal(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-amber-700 rounded-lg cursor-pointer"
            >
              Post Family Job
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs hover:border-stone-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              {/* Left Details */}
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-stone-900">{job.familyDisplayName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{job.suburb}, {job.city}</span>
                  <span aria-hidden="true">·</span>
                  <span>{job.careType}</span>
                  <span aria-hidden="true">·</span>
                  <span>Posted {job.postedAt}</span>
                  {job.liveInProvided && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-amber-800 font-medium">Accommodation Provided</span>
                    </>
                  )}
                </div>

                <h3 className="text-lg font-bold text-stone-900 leading-snug">
                  {job.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                {/* Requirements unboxed */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-600 pt-1">
                  <span className="text-stone-400 font-medium">Requirements:</span>
                  {job.requirements.map((req, idx) => (
                    <span key={req}>
                      {req}{idx < job.requirements.length - 1 && <span className="text-stone-300 ml-1.5">/</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Salary & Action */}
              <div className="shrink-0 flex flex-col sm:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-stone-100">
                <div className="sm:text-right">
                  <div className="text-lg sm:text-xl font-bold text-stone-900 tabular-nums">
                    R{job.monthlySalaryZAR.toLocaleString()} <span className="text-xs font-normal text-stone-500">/ mo</span>
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {job.hoursDescription}
                  </div>
                  <div className="text-[11px] text-stone-400 mt-0.5">
                    {job.applicationsCount} nannies applied
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveApplyJob(job)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply for Job</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div 
            className="bg-white rounded-2xl border border-stone-200 max-w-xl w-full p-6 shadow-2xl space-y-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="post-job-title"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 id="post-job-title" className="text-lg font-bold text-stone-900">
                  Post a South African Family Job
                </h3>
                <div className="text-xs text-stone-500">
                  Connect with vetted caregivers across Johannesburg, Durban, or Cape Town
                </div>
              </div>
              <button
                onClick={() => setShowPostModal(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer p-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePostJobSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Job Headline / Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Full-time Live-in Nanny for 2-year old"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Family Display Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bester Family"
                    value={familyDisplayName}
                    onChange={(e) => setFamilyDisplayName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Care Category
                  </label>
                  <select
                    value={jobCareType}
                    onChange={(e) => setJobCareType(e.target.value as CareType)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Live-in Nanny">Live-in Nanny</option>
                    <option value="Live-out Nanny">Live-out Nanny</option>
                    <option value="Au Pair">Au Pair</option>
                    <option value="Night Nurse & Newborn">Night Nurse & Newborn</option>
                    <option value="Weekend / Babysitter">Weekend / Babysitter</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Metro City
                  </label>
                  <select
                    value={jobCity}
                    onChange={(e) => {
                      const newCity = e.target.value as SouthAfricanCity;
                      setJobCity(newCity);
                      setJobSuburb(SUBURBS_BY_CITY[newCity][0]);
                    }}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                  >
                    <option value="Johannesburg">Johannesburg</option>
                    <option value="Durban">Durban</option>
                    <option value="Cape Town">Cape Town</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Suburb / Area
                  </label>
                  <select
                    value={jobSuburb}
                    onChange={(e) => setJobSuburb(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                  >
                    {SUBURBS_BY_CITY[jobCity].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Monthly Salary (ZAR)
                  </label>
                  <input
                    type="number"
                    min="5000"
                    step="500"
                    required
                    value={jobSalaryZAR}
                    onChange={(e) => setJobSalaryZAR(Number(e.target.value))}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                  />
                  <span className="text-[11px] text-stone-500">Legal minimum is R5,378.10/mo</span>
                </div>
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    required
                    value={jobHours}
                    onChange={(e) => setJobHours(e.target.value)}
                    placeholder="e.g. Mon-Fri 07:30 - 16:30"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={jobLiveIn}
                    onChange={(e) => setJobLiveIn(e.target.checked)}
                    className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-semibold text-stone-800">
                    Private live-in room or garden cottage provided
                  </span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Children Details
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2 boys (ages 2 and 5)"
                  value={jobChildrenDetails}
                  onChange={(e) => setJobChildrenDetails(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Requirements (comma separated)
                </label>
                <input
                  type="text"
                  value={jobRequirements}
                  onChange={(e) => setJobRequirements(e.target.value)}
                  placeholder="e.g. SAPS Police Clearance, First Aid CPR, 3+ years experience"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-800 mb-1">
                  Job Description & Household Details
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your household, daily routine, meals, and what kind of warm personality suits your family..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-amber-700 hover:bg-amber-800 rounded-lg cursor-pointer"
                >
                  Publish Family Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      {activeApplyJob && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div 
            className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-6 shadow-2xl space-y-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-job-title"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 id="apply-job-title" className="text-base font-bold text-stone-900">
                  Apply to {activeApplyJob.familyDisplayName}
                </h3>
                <div className="text-xs text-stone-500">
                  {activeApplyJob.title} · {activeApplyJob.suburb}, {activeApplyJob.city}
                </div>
              </div>
              <button
                onClick={() => setActiveApplyJob(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer p-1"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySuccessMessage ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs space-y-2 text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto" />
                <div className="font-semibold text-sm">{applySuccessMessage}</div>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Your Full Name (Nanny / Au Pair)
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-800 mb-1">
                    Introduction & Cover Note
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-stone-900 focus:bg-white focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-600">
                  <div className="font-semibold text-stone-800">Application Perks</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    Your verified SAPS clearance badge and authenticated former family reference quotes will be sent automatically with this application.
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveApplyJob(null)}
                    className="px-4 py-2 text-stone-600 hover:text-stone-900 cursor-pointer font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Application</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
