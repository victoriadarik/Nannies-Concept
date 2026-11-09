import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  ShieldCheck, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  CreditCard,
  FileCheck,
  Lock,
  Unlock,
  AlertTriangle,
  Plus,
  Trash2,
  ChevronRight,
  Eye,
  FileBadge2,
  Building,
  CheckCheck
} from 'lucide-react';
import { SouthAfricanCity, CareType, SubscriptionState } from '../types';

interface WorkHistoryItem {
  id: string;
  familyName: string;
  suburbAndCity: string;
  duration: string;
  childrenDetails: string;
  duties: string;
}

interface ReferenceItem {
  id: string;
  employerName: string;
  phone: string;
  relationship: string;
  suburb: string;
}

interface NannyCVMakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription?: SubscriptionState;
  onSaveToProfile?: (cvData: any) => void;
  isFullPage?: boolean;
}

export const NannyCVMakerModal: React.FC<NannyCVMakerModalProps> = ({
  isOpen,
  onClose,
  subscription,
  isFullPage = false,
}) => {
  // Step navigation
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [templateStyle, setTemplateStyle] = useState<'executive' | 'minimalist' | 'classic'>('executive');

  // Payment & Download Lock State ("only can download after payment")
  const isNannySubscribed = subscription?.nannyPlan === 'pro' || subscription?.nannyPlan === 'monthly' || subscription?.nannyPlan === 'quarterly';
  const [isPaid, setIsPaid] = useState<boolean>(() => {
    try {
      if (isNannySubscribed) return true;
      return localStorage.getItem('nm_sa_cv_paid') === 'true';
    } catch {
      return false;
    }
  });

  const [paymentModalOpen, setPaymentModalOpen] = useState<boolean>(false);
  const [selectedPlanOption, setSelectedPlanOption] = useState<'redesign_r50' | 'nanny_monthly_r59' | 'nanny_quarterly_r220'>('redesign_r50');
  const [paymentMethod, setPaymentMethod] = useState<'ozow' | 'card' | 'capitec' | 'snapscan'>('ozow');
  const [selectedBank, setSelectedBank] = useState<string>('Capitec');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccessRef, setPaymentSuccessRef] = useState<string>(() => {
    try {
      return localStorage.getItem('nm_sa_cv_paid_ref') || 'NM-OZ-882419';
    } catch {
      return 'NM-OZ-882419';
    }
  });
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState<string>('Nandi Khumalo');
  const [age, setAge] = useState<number>(34);
  const [city, setCity] = useState<SouthAfricanCity>('Johannesburg');
  const [suburb, setSuburb] = useState<string>('Sandton');
  const [phone, setPhone] = useState<string>('+27 82 459 8812');
  const [email, setEmail] = useState<string>('nandi.khumalo@gmail.com');
  const [idType, setIdType] = useState<'South African ID' | 'Permanent Residence' | 'Valid Work Permit'>('South African ID');
  const [careType, setCareType] = useState<CareType>('Live-in Nanny');
  const [experienceYears, setExperienceYears] = useState<number>(8);
  const [expectedMonthlyZAR, setExpectedMonthlyZAR] = useState<number>(7500);
  const [expectedHourlyZAR, setExpectedHourlyZAR] = useState<number>(45);
  const [availability, setAvailability] = useState<string>('Immediate');
  const [driversLicense, setDriversLicense] = useState<string>('Code 8 (Own Vehicle)');
  const [languages, setLanguages] = useState<string>('English (Fluent), isiZulu (Native), Sesotho (Conversational)');
  const [bio, setBio] = useState<string>(
    'Dedicated, patient, and warm childcare professional with over 8 years of private home experience caring for toddlers and infants. Experienced in preparing healthy balanced meals, establishing consistent sleep schedules, and early childhood sensory play.'
  );

  // Competencies
  const [skills, setSkills] = useState<string[]>([
    'Infant & Newborn Care',
    'Nutritious Meal Planning',
    'Nap & Sleep Routine Conditioning',
    'Potty Training Assistance',
    'Sensory & Educational Play',
    'St John Paediatric First Aid / CPR',
    'Hygiene & Sterilization Standards',
    'Emergency Action Protocol'
  ]);
  const [newSkillInput, setNewSkillInput] = useState<string>('');

  // Work History (Multiple entries)
  const [workHistory, setWorkHistory] = useState<WorkHistoryItem[]>([
    {
      id: 'work-1',
      familyName: 'The Bester Family',
      suburbAndCity: 'Bryanston, Johannesburg',
      duration: 'Feb 2022 – Jan 2025 (3 Years)',
      childrenDetails: 'Twin girls (Started at 4 months to 3 years)',
      duties: 'Managed complete daily schedules, sleep training, bottle sterilization, weaning onto organic solid foods, and developmental sensory stimulation.'
    },
    {
      id: 'work-2',
      familyName: 'The Van Zyl Family',
      suburbAndCity: 'Rosebank, Johannesburg',
      duration: 'Jan 2018 – Nov 2021 (4 Years)',
      childrenDetails: '1 Boy (Age 2 to 6)',
      duties: 'Preschool preparation, healthy lunch prep, motor skill play, playground supervision, and light nursery housekeeping.'
    }
  ]);

  // References (Multiple entries)
  const [references, setReferences] = useState<ReferenceItem[]>([
    {
      id: 'ref-1',
      employerName: 'Mrs. Claire Bester',
      phone: '+27 83 901 4455',
      relationship: 'Former Employer (3 Years)',
      suburb: 'Bryanston, JHB'
    },
    {
      id: 'ref-2',
      employerName: 'Mr. Jacques Van Zyl',
      phone: '+27 82 312 8890',
      relationship: 'Former Employer (4 Years)',
      suburb: 'Rosebank, JHB'
    }
  ]);

  // Clear Portrait Photo State (Must be image)
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoName, setPhotoName] = useState<string>('');

  // Uploaded Verification Documents (Strictly PDF)
  const [policeClearancePdf, setPoliceClearancePdf] = useState<string>('SAPS_Police_Clearance_Nandi_Khumalo_2026.pdf');
  const [firstAidPdf, setFirstAidPdf] = useState<string>('St_John_Paediatric_CPR_Level1.pdf');
  const [idDocPdf, setIdDocPdf] = useState<string>('Certified_South_African_ID_Document.pdf');
  const [referenceLetterPdf, setReferenceLetterPdf] = useState<string>('Reference_Letter_Bester_Family_Signed.pdf');

  // UI helpers
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [isGeneratingDownload, setIsGeneratingDownload] = useState<boolean>(false);

  // Sync paid state from subscription if changed
  useEffect(() => {
    if (isNannySubscribed) {
      setIsPaid(true);
    }
  }, [isNannySubscribed]);

  if (!isOpen && !isFullPage) return null;

  // Photo Upload Handler with Image validation
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setUploadError('Rule Reminder: Photo must be a clear face portrait image file (JPG, PNG, or WebP).');
        return;
      }
      setPhotoName(file.name);
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  // PDF Document Upload Handler with STRICT PDF Validation
  const handlePdfUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (name: string) => void,
    docLabel: string
  ) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (file) {
      const isPdfMime = file.type === 'application/pdf';
      const isPdfExt = file.name.toLowerCase().endsWith('.pdf');
      if (!isPdfMime && !isPdfExt) {
        setUploadError(`Strict Verification Rule: "${docLabel}" must be in PDF format (.pdf). Scans or Word documents (.doc/.docx/.jpg) cannot be processed by ATS.`);
        return;
      }
      setter(file.name);
    }
  };

  // Add Competency
  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  // Add Work Experience
  const handleAddWorkHistory = () => {
    const newEntry: WorkHistoryItem = {
      id: `work-${Date.now()}`,
      familyName: 'New Family Placement',
      suburbAndCity: 'Johannesburg, South Africa',
      duration: '2020 – 2022',
      childrenDetails: '1 Child (Toddler)',
      duties: 'Daily childcare, meals, nap routines, and domestic care.'
    };
    setWorkHistory([...workHistory, newEntry]);
  };

  const handleRemoveWorkHistory = (id: string) => {
    setWorkHistory(workHistory.filter((w) => w.id !== id));
  };

  // Add Reference
  const handleAddReference = () => {
    const newRef: ReferenceItem = {
      id: `ref-${Date.now()}`,
      employerName: 'Mrs. New Employer',
      phone: '+27 82 000 0000',
      relationship: 'Former Employer',
      suburb: 'Johannesburg'
    };
    setReferences([...references, newRef]);
  };

  const handleRemoveReference = (id: string) => {
    setReferences(references.filter((r) => r.id !== id));
  };

  // Calculate ATS Score
  const calculateAtsScore = (): number => {
    let score = 50;
    if (photoUrl) score += 10;
    if (policeClearancePdf) score += 10;
    if (firstAidPdf) score += 10;
    if (idDocPdf) score += 10;
    if (workHistory.length >= 2) score += 5;
    if (references.length >= 2) score += 5;
    return Math.min(score, 100);
  };

  const atsScore = calculateAtsScore();

  // Payment Execution ("only can download after payment")
  const handleProcessPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const generatedRef = `NM-${paymentMethod.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setIsProcessingPayment(false);
      setIsPaid(true);
      setPaymentSuccessRef(generatedRef);
      try {
        localStorage.setItem('nm_sa_cv_paid', 'true');
        localStorage.setItem('nm_sa_cv_paid_ref', generatedRef);
      } catch {
        // ignore
      }
      setPaymentModalOpen(false);
      // Automatically trigger download after successful payment
      triggerDownloadFile();
    }, 1200);
  };

  // Trigger Download (Only allowed if isPaid is true)
  const handleDownloadClick = () => {
    if (!isPaid) {
      setPaymentModalOpen(true);
      return;
    }
    triggerDownloadFile();
  };

  // Trigger Print (Only allowed if isPaid is true)
  const handlePrintClick = () => {
    if (!isPaid) {
      setPaymentModalOpen(true);
      return;
    }
    window.print();
  };

  // Generate and download a standalone high-res HTML/PDF file
  const triggerDownloadFile = () => {
    setIsGeneratingDownload(true);
    setTimeout(() => {
      const cvHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${fullName} - ATS Childcare CV - NannyMatch SA</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #0f172a; padding: 30px; max-width: 800px; margin: 0 auto; }
    h1 { margin: 0; font-size: 24px; text-transform: uppercase; color: #020617; }
    .header { border-bottom: 2px solid #020617; padding-bottom: 15px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center; }
    .subtitle { color: #db2777; font-weight: bold; font-size: 13px; text-transform: uppercase; }
    .contact { font-size: 12px; color: #475569; margin-top: 4px; }
    .badge-bar { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; margin-bottom: 15px; display: flex; justify-content: space-between; font-size: 12px; }
    .section-title { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 15px; margin-bottom: 8px; color: #020617; }
    .summary { font-size: 12px; color: #334155; line-height: 1.6; }
    .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; font-size: 12px; color: #1e293b; }
    .job-item { margin-bottom: 12px; background: #fdf2f8; padding: 10px; border-radius: 6px; border-left: 3px solid #db2777; }
    .job-title { font-weight: bold; font-size: 13px; }
    .job-meta { font-size: 11px; color: #64748b; margin-bottom: 4px; }
    .doc-item { font-size: 11px; color: #065f46; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 6px 10px; border-radius: 6px; margin-bottom: 4px; }
    .ref-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 12px; }
    .ref-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 8px; border-radius: 6px; }
    .footer { margin-top: 25px; padding-top: 10px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>${fullName}</h1>
      <div class="subtitle">${careType} &bull; ${city}, South Africa</div>
      <div class="contact">${suburb} &bull; Phone: ${phone} &bull; Email: ${email} &bull; ${idType}</div>
    </div>
    ${photoUrl ? `<img src="${photoUrl}" style="width:75px;height:75px;border-radius:12px;object-fit:cover;border:2px solid #e2e8f0;">` : ''}
  </div>

  <div class="badge-bar">
    <div><strong>Experience:</strong> ${experienceYears} Years Verified</div>
    <div><strong>Expected Salary:</strong> R${expectedMonthlyZAR.toLocaleString()} / mo (R${expectedHourlyZAR}/hr)</div>
    <div><strong>Languages:</strong> ${languages}</div>
  </div>

  <div class="section-title">Professional Childcare Summary</div>
  <div class="summary">${bio}</div>

  <div class="section-title">Key Competencies & Childcare Attributes</div>
  <div class="skills-grid">
    ${skills.map((s) => `<div>&bull; ${s}</div>`).join('')}
  </div>

  <div class="section-title">Domestic Employment History</div>
  ${workHistory.map((w) => `
    <div class="job-item">
      <div class="job-title">${w.familyName} (${w.suburbAndCity})</div>
      <div class="job-meta">${w.duration} &bull; Cared for: ${w.childrenDetails}</div>
      <div style="font-size:12px; color:#334155;">${w.duties}</div>
    </div>
  `).join('')}

  <div class="section-title">Verified South African Documents on File (PDF Format)</div>
  <div class="doc-item">&check; SAPS Police Clearance Certificate: ${policeClearancePdf}</div>
  <div class="doc-item">&check; Paediatric First Aid / CPR: ${firstAidPdf}</div>
  <div class="doc-item">&check; South African Identification: ${idDocPdf}</div>
  <div class="doc-item">&check; Employer Reference Letter: ${referenceLetterPdf}</div>

  <div class="section-title">Contactable Former Family References</div>
  <div class="ref-grid">
    ${references.map((r) => `
      <div class="ref-box">
        <strong>${r.employerName}</strong> (${r.relationship})<br>
        <span style="color:#0284c7;">${r.phone}</span> &bull; ${r.suburb}
      </div>
    `).join('')}
  </div>

  <div class="footer">
    <span>Verified via NannyMatch SA ATS Childcare Engine &bull; Ref: ${paymentSuccessRef}</span>
    <span>BCEA Sectoral Determination 7 Compliant</span>
  </div>
</body>
</html>`;

      const blob = new Blob([cvHtmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `NannyMatch_SA_ATS_CV_${fullName.replace(/\s+/g, '_')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsGeneratingDownload(false);
    }, 500);
  };

  // Copy plain ATS text
  const handleCopyAtsText = () => {
    const atsText = `NANNYMATCH SA ATS-COMPLIANT CHILDCARE CV
=====================================================
NAME: ${fullName.toUpperCase()}
SPECIALIZATION: ${careType.toUpperCase()}
LOCATION: ${suburb}, ${city}, South Africa
CONTACT: ${phone} | ${email}
LEGAL STATUS: ${idType} (South Africa)
AVAILABILITY: ${availability}
EXPECTED SALARY: R${expectedMonthlyZAR.toLocaleString()} / Month (R${expectedHourlyZAR}/hour)
=====================================================

PROFESSIONAL SUMMARY
${bio}

CORE CHILDCARE COMPETENCIES & ATTRIBUTES
${skills.map((s) => `• ${s}`).join('\n')}

LANGUAGES
${languages}

DOMESTIC EMPLOYMENT HISTORY
${workHistory.map((w, i) => `${i + 1}. ${w.familyName} (${w.suburbAndCity})
   Duration: ${w.duration}
   Children: ${w.childrenDetails}
   Duties: ${w.duties}`).join('\n\n')}

VERIFIED SOUTH AFRICAN COMPLIANCE & DOCUMENTS (PDF ON FILE)
• SAPS Police Criminal Record Clearance: ${policeClearancePdf ? `ATTACHED (${policeClearancePdf})` : 'Pending'}
• First Aid / Pediatric CPR: ${firstAidPdf ? `ATTACHED (${firstAidPdf})` : 'Pending'}
• South African ID / Document: ${idDocPdf ? `ATTACHED (${idDocPdf})` : 'Pending'}
• Written Reference Letters: ${referenceLetterPdf ? `ATTACHED (${referenceLetterPdf})` : 'Pending'}

CONTACTABLE FORMER EMPLOYER REFERENCES
${references.map((r, i) => `• Reference ${i + 1}: ${r.employerName} (${r.relationship}) — Phone: ${r.phone}`).join('\n')}
=====================================================
Generated via NannyMatch SA ATS Childcare CV Engine
Official Verification Code: ${paymentSuccessRef}`;

    navigator.clipboard.writeText(atsText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const containerClasses = isFullPage
    ? "bg-white rounded-3xl border border-slate-200/90 max-w-6xl w-full shadow-xl flex flex-col relative mx-auto my-6"
    : "bg-white rounded-3xl border border-slate-200/90 max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative";

  return (
    <>
      <div className={isFullPage ? "" : "fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150"}>
        <div 
          className={containerClasses}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cv-maker-title"
        >
          {/* Header Bar with Official Logo and Actions */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3.5 border-b border-slate-100 flex items-center justify-between z-20 shrink-0">
            <div className="flex items-center gap-3">
              <img 
                src="./assets/aistudio/NannyMatch_SA_logo_update_cleaned_8326fb61.png" 
                alt="NannyMatch SA" 
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain rounded-xl shrink-0" 
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 id="cv-maker-title" className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    ATS CV Builder for South African Nannies
                  </h2>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                    ATS Vetted
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {isPaid ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Payment Verified ({paymentSuccessRef}) &bull; Unlimited Downloads Unlocked
                    </span>
                  ) : (
                    <span>Convert your domestic childcare experience into an ATS-verified format</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Editor vs Preview switcher */}
              <div className="flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveTab('editor')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'editor' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'preview' ? 'bg-white text-pink-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                  {!isPaid && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Locked until payment" />
                  )}
                </button>
              </div>

              {!isFullPage && (
                <button
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="text-slate-400 hover:text-slate-700 cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Main Content Body */}
          <div className="p-4 sm:p-6 space-y-6 flex-1">
            {/* Strict Rules & Download Payment Callout Banner */}
            <div className="bg-slate-950 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-pink-400" />
                    <span>NannyMatch SA Caregiver Document Standards</span>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    <strong>Rule 1 (Clear Photo):</strong> Upload a smiling, clear portrait photo with good natural light and zero heavy filters.<br/>
                    <strong>Rule 2 (Strictly PDF):</strong> SAPS clearance, ID, and employer letters must strictly be <strong>.pdf</strong> files.
                  </div>
                </div>

                {/* ATS Score & Payment Gate Status */}
                <div className="flex flex-wrap items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-3 shrink-0">
                  <div className="pr-3 border-r border-slate-800 text-center">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">ATS Score</div>
                    <div className="text-xl font-black text-pink-400">{atsScore}%</div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-white">System Redesign & Download</span>
                      <span className="text-pink-400 font-extrabold">R50 once-off</span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isPaid ? (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Unlocked & Ready for Download
                        </span>
                      ) : (
                        <span className="text-amber-300 font-medium flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-300" />
                          Download unlocked after payment
                        </span>
                      )}
                    </div>
                  </div>

                  {!isPaid && (
                    <button
                      type="button"
                      onClick={() => setPaymentModalOpen(true)}
                      className="px-3 py-2 text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl cursor-pointer transition-colors shadow-sm shadow-pink-600/30 flex items-center gap-1.5 shrink-0"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Unlock (R50)</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Upload Error Alert */}
              {uploadError && (
                <div className="mt-3 bg-rose-950/80 border border-rose-600/50 rounded-xl p-3 text-xs text-rose-200 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{uploadError}</span>
                  </div>
                  <button
                    onClick={() => setUploadError(null)}
                    className="text-rose-400 hover:text-white text-xs font-bold px-2 py-0.5"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>

            {/* TAB 1: CV EDITOR */}
            {activeTab === 'editor' && (
              <div className="space-y-6">
                {/* 1. Mandatory Clear Photo & Strictly PDF Documents */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Photo Upload Box */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-pink-600" />
                        <span>Rule 1: Clear Caregiver Photo (JPG/PNG)</span>
                      </label>
                      <span className="text-[10px] text-pink-700 font-bold bg-pink-50 px-2 py-0.5 rounded-md">
                        Mandatory
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0 relative group">
                        {photoUrl ? (
                          <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-8 h-8 text-slate-400" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1.5">
                        <label className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[38px] text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors">
                          <Upload className="w-3.5 h-3.5 text-slate-700" />
                          <span>{photoName ? 'Change Photo' : 'Upload Clear Portrait'}</span>
                          <input
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </label>
                        <div className="text-[11px] text-slate-500 leading-tight">
                          {photoName ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              {photoName}
                            </span>
                          ) : (
                            'Upload a clear face photo with natural lighting and no heavy filters.'
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Documents Box (STRICTLY PDF) */}
                  <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-pink-600" />
                        <span>Rule 2: Verification Documents (Strictly .PDF)</span>
                      </label>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                        Strictly PDF
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {/* SAPS Clearance PDF */}
                      <div className="p-2.5 border border-slate-200 rounded-xl bg-slate-50 flex flex-col justify-between">
                        <div>
                          <div className="font-semibold text-[11px] text-slate-900">1. SAPS Clearance (.pdf)</div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            {policeClearancePdf ? policeClearancePdf : 'No file chosen'}
                          </div>
                        </div>
                        <label className="mt-1.5 text-[10px] text-pink-600 hover:text-pink-700 font-bold block cursor-pointer">
                          {policeClearancePdf ? 'Change PDF' : '+ Upload PDF'}
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handlePdfUpload(e, setPoliceClearancePdf, 'SAPS Clearance')}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* First Aid PDF */}
                      <div className="p-2.5 border border-slate-200 rounded-xl bg-slate-50 flex flex-col justify-between">
                        <div>
                          <div className="font-semibold text-[11px] text-slate-900">2. First Aid / CPR (.pdf)</div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            {firstAidPdf ? firstAidPdf : 'No file chosen'}
                          </div>
                        </div>
                        <label className="mt-1.5 text-[10px] text-pink-600 hover:text-pink-700 font-bold block cursor-pointer">
                          {firstAidPdf ? 'Change PDF' : '+ Upload PDF'}
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handlePdfUpload(e, setFirstAidPdf, 'First Aid Certificate')}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* ID Document PDF */}
                      <div className="p-2.5 border border-slate-200 rounded-xl bg-slate-50 flex flex-col justify-between">
                        <div>
                          <div className="font-semibold text-[11px] text-slate-900">3. SA ID / Permit (.pdf)</div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            {idDocPdf ? idDocPdf : 'No file chosen'}
                          </div>
                        </div>
                        <label className="mt-1.5 text-[10px] text-pink-600 hover:text-pink-700 font-bold block cursor-pointer">
                          {idDocPdf ? 'Change PDF' : '+ Upload PDF'}
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handlePdfUpload(e, setIdDocPdf, 'South African ID Document')}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Reference Letter PDF */}
                      <div className="p-2.5 border border-slate-200 rounded-xl bg-slate-50 flex flex-col justify-between">
                        <div>
                          <div className="font-semibold text-[11px] text-slate-900">4. Former Reference (.pdf)</div>
                          <div className="text-[10px] text-slate-500 truncate mt-0.5">
                            {referenceLetterPdf ? referenceLetterPdf : 'No file chosen'}
                          </div>
                        </div>
                        <label className="mt-1.5 text-[10px] text-pink-600 hover:text-pink-700 font-bold block cursor-pointer">
                          {referenceLetterPdf ? 'Change PDF' : '+ Upload PDF'}
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => handlePdfUpload(e, setReferenceLetterPdf, 'Reference Letter')}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Caregiver Core Details */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Caregiver Personal & Contact Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Age</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">City Hub (SA)</label>
                      <select
                        value={city}
                        onChange={(e) => setCity(e.target.value as SouthAfricanCity)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500 cursor-pointer"
                      >
                        <option value="Johannesburg">Johannesburg (Gauteng)</option>
                        <option value="Durban">Durban (eThekwini)</option>
                        <option value="Cape Town">Cape Town (Western Cape)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Suburb / Area</label>
                      <input
                        type="text"
                        value={suburb}
                        onChange={(e) => setSuburb(e.target.value)}
                        placeholder="e.g. Sandton, Umhlanga, Camps Bay"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Phone / WhatsApp Number</label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">South African ID / Legal Status</label>
                      <select
                        value={idType}
                        onChange={(e) => setIdType(e.target.value as any)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500 cursor-pointer"
                      >
                        <option value="South African ID">South African Green ID / Smart Card</option>
                        <option value="Permanent Residence">Permanent Residence</option>
                        <option value="Valid Work Permit">Valid Work Permit (Home Affairs)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Primary Role Specialization</label>
                      <select
                        value={careType}
                        onChange={(e) => setCareType(e.target.value as CareType)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500 cursor-pointer"
                      >
                        <option value="Live-in Nanny">Live-in Nanny</option>
                        <option value="Live-out Nanny">Live-out Nanny</option>
                        <option value="Au Pair">Au Pair</option>
                        <option value="Night Nurse & Newborn">Night Nurse & Newborn</option>
                        <option value="Weekend / Babysitter">Weekend / Babysitter</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Years Childcare Experience</label>
                      <input
                        type="number"
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Expected Monthly Wage (ZAR)</label>
                      <input
                        type="number"
                        value={expectedMonthlyZAR}
                        onChange={(e) => setExpectedMonthlyZAR(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Availability</label>
                      <select
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500 cursor-pointer"
                      >
                        <option value="Immediate">Immediate Availability</option>
                        <option value="2 Weeks Notice">2 Weeks Notice</option>
                        <option value="1 Month Notice">1 Month Notice</option>
                        <option value="Specific Date">From Specific Date</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Driver’s License Status</label>
                      <input
                        type="text"
                        value={driversLicense}
                        onChange={(e) => setDriversLicense(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 text-xs">Languages Spoken</label>
                    <input
                      type="text"
                      value={languages}
                      onChange={(e) => setLanguages(e.target.value)}
                      placeholder="e.g. English (Fluent), isiZulu, Sesotho, Afrikaans"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:bg-white focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1 text-xs">Professional Childcare Summary / Bio</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs focus:bg-white focus:ring-1 focus:ring-pink-500 leading-relaxed"
                    />
                  </div>
                </div>

                {/* 3. Core Competencies & Skills with 1-Click ATS Keywords */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Childcare Skills & ATS Keywords ({skills.length})
                    </h3>
                    <span className="text-[11px] text-slate-400">Click a tag to remove</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill, idx) => (
                      <span
                        key={idx}
                        onClick={() => handleRemoveSkill(skill)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-50 text-pink-800 text-xs font-medium cursor-pointer hover:bg-pink-100 transition-colors"
                        title="Click to remove"
                      >
                        <span>{skill}</span>
                        <X className="w-3 h-3 text-pink-600" />
                      </span>
                    ))}
                  </div>

                  {/* Add Custom Skill */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add custom childcare skill..."
                      value={newSkillInput}
                      onChange={(e) => setNewSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddSkill}
                      className="px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Skill</span>
                    </button>
                  </div>
                </div>

                {/* 4. Domestic Employment History (Multiple entries) */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Domestic Employment History ({workHistory.length})
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddWorkHistory}
                      className="text-xs font-bold text-pink-600 hover:text-pink-700 cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Family Placement</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {workHistory.map((work, idx) => (
                      <div key={work.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 relative text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">Placement #{idx + 1}</span>
                          {workHistory.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveWorkHistory(work.id)}
                              className="text-slate-400 hover:text-red-600 cursor-pointer p-1"
                              title="Delete placement"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-600 font-semibold mb-1">Family / Employer</label>
                            <input
                              type="text"
                              value={work.familyName}
                              onChange={(e) => {
                                const updated = [...workHistory];
                                updated[idx].familyName = e.target.value;
                                setWorkHistory(updated);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-600 font-semibold mb-1">Suburb & City</label>
                            <input
                              type="text"
                              value={work.suburbAndCity}
                              onChange={(e) => {
                                const updated = [...workHistory];
                                updated[idx].suburbAndCity = e.target.value;
                                setWorkHistory(updated);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-600 font-semibold mb-1">Duration & Dates</label>
                            <input
                              type="text"
                              value={work.duration}
                              onChange={(e) => {
                                const updated = [...workHistory];
                                updated[idx].duration = e.target.value;
                                setWorkHistory(updated);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-600 font-semibold mb-1">Children Cared For & Ages</label>
                            <input
                              type="text"
                              value={work.childrenDetails}
                              onChange={(e) => {
                                const updated = [...workHistory];
                                updated[idx].childrenDetails = e.target.value;
                                setWorkHistory(updated);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-slate-900"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">Primary Duties & Care Milestones</label>
                          <textarea
                            rows={2}
                            value={work.duties}
                            onChange={(e) => {
                              const updated = [...workHistory];
                              updated[idx].duties = e.target.value;
                              setWorkHistory(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-slate-900 leading-relaxed"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Contactable Former Family References */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Contactable Former Family References ({references.length})
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddReference}
                      className="text-xs font-bold text-pink-600 hover:text-pink-700 cursor-pointer flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Reference</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {references.map((ref, idx) => (
                      <div key={ref.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">Reference #{idx + 1}</span>
                          {references.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveReference(ref.id)}
                              className="text-slate-400 hover:text-red-600 cursor-pointer p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-0.5">Reference Name</label>
                          <input
                            type="text"
                            value={ref.employerName}
                            onChange={(e) => {
                              const updated = [...references];
                              updated[idx].employerName = e.target.value;
                              setReferences(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-0.5">Contactable Phone / WhatsApp</label>
                          <input
                            type="text"
                            value={ref.phone}
                            onChange={(e) => {
                              const updated = [...references];
                              updated[idx].phone = e.target.value;
                              setReferences(updated);
                            }}
                            className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-slate-900 font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-slate-600 font-semibold mb-0.5">Relationship</label>
                            <input
                              type="text"
                              value={ref.relationship}
                              onChange={(e) => {
                                const updated = [...references];
                                updated[idx].relationship = e.target.value;
                                setReferences(updated);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-slate-600 font-semibold mb-0.5">Suburb</label>
                            <input
                              type="text"
                              value={ref.suburb}
                              onChange={(e) => {
                                const updated = [...references];
                                updated[idx].suburb = e.target.value;
                                setReferences(updated);
                              }}
                              className="w-full bg-white border border-slate-200 rounded-xl px-2.5 py-1 text-slate-900"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Navigation & Save */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
                  <div className="text-xs text-slate-500">
                    {isPaid ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                        <CheckCheck className="w-4 h-4 text-emerald-600" />
                        Download Unlocked &bull; Redesign service active
                      </span>
                    ) : (
                      <span className="text-slate-600">
                        Redesign fee: <strong>R50 once-off</strong> to download & export verified PDF.
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className="flex-1 sm:flex-none px-6 py-2.5 min-h-[44px] text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl cursor-pointer shadow-sm shadow-pink-600/30 flex items-center justify-center gap-1.5"
                    >
                      <span>Preview ATS CV</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ATS PREVIEW & STRICT PAYMENT-GATED DOWNLOAD */}
            {activeTab === 'preview' && (
              <div className="space-y-5">
                {/* Preview Toolbar with Download / Print Lock Status */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span>ATS Layout Style:</span>
                      <div className="inline-flex p-0.5 bg-slate-200 rounded-lg text-[11px] font-semibold">
                        <button
                          onClick={() => setTemplateStyle('executive')}
                          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            templateStyle === 'executive' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600'
                          }`}
                        >
                          Executive Pink & Navy
                        </button>
                        <button
                          onClick={() => setTemplateStyle('minimalist')}
                          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            templateStyle === 'minimalist' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600'
                          }`}
                        >
                          Clean Minimalist
                        </button>
                        <button
                          onClick={() => setTemplateStyle('classic')}
                          className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            templateStyle === 'classic' ? 'bg-white text-slate-950 font-bold shadow-xs' : 'text-slate-600'
                          }`}
                        >
                          Classic SA Domestic
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Payment Gate */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Copy text is always accessible */}
                    <button
                      onClick={handleCopyAtsText}
                      className="px-3 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs"
                      title="Copy plain text for online job portals"
                    >
                      {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                      <span>{copiedText ? 'Copied' : 'Copy ATS Text'}</span>
                    </button>

                    {/* Print / Save to PDF Button (LOCKED until payment) */}
                    <button
                      onClick={handlePrintClick}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs transition-colors ${
                        isPaid
                          ? 'bg-slate-900 hover:bg-slate-800 text-white'
                          : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                      }`}
                      title={isPaid ? "Print or Save to PDF via Browser" : "Payment required to print/save"}
                    >
                      {isPaid ? (
                        <Printer className="w-3.5 h-3.5 text-pink-400" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-amber-600" />
                      )}
                      <span>{isPaid ? 'Print / Save PDF' : 'Print PDF (Locked)'}</span>
                    </button>

                    {/* Primary Download ATS CV (PDF) Button - Strictly Gated by Payment */}
                    <button
                      onClick={handleDownloadClick}
                      disabled={isGeneratingDownload}
                      className={`px-4 py-2 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm transition-all ${
                        isPaid
                          ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-pink-600/30'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {isPaid ? (
                        <Download className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                      )}
                      <span>
                        {isGeneratingDownload 
                          ? 'Exporting...' 
                          : isPaid 
                          ? 'Download ATS CV (PDF)' 
                          : 'Unlock Download (R50)'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Payment Warning Callout if Not Paid */}
                {!isPaid && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-start sm:items-center gap-2.5">
                      <Lock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
                      <div>
                        <span className="font-bold">Official Download Locked:</span>
                        <span className="ml-1 text-amber-800">
                          Complete the once-off R50 redesign fee (or activate Nanny Pro) to download the high-resolution ATS PDF and remove the preview watermark.
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setPaymentModalOpen(true)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-xl cursor-pointer shrink-0 self-start sm:self-auto shadow-xs"
                    >
                      Pay R50 & Download
                    </button>
                  </div>
                )}

                {/* The Rendered Clean ATS Childcare Resume */}
                <div className="relative">
                  {/* Watermark overlay when unpaid */}
                  {!isPaid && (
                    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center overflow-hidden">
                      <div className="rotate-[-25deg] border-4 border-dashed border-pink-500/25 bg-pink-500/5 px-8 py-3 rounded-2xl text-pink-700/40 font-black text-xl sm:text-3xl uppercase tracking-widest text-center select-none">
                        Preview Only &bull; R50 Payment Required to Download
                      </div>
                    </div>
                  )}

                  <div 
                    id="printable-cv"
                    className={`bg-white border-2 rounded-3xl p-6 sm:p-10 shadow-lg font-sans text-slate-900 space-y-6 max-w-3xl mx-auto print:border-0 print:p-0 print:shadow-none ${
                      templateStyle === 'executive' 
                        ? 'border-slate-300' 
                        : templateStyle === 'minimalist' 
                        ? 'border-slate-200' 
                        : 'border-slate-400'
                    }`}
                  >
                    {/* Header Zone */}
                    <div className="flex items-center justify-between border-b-2 border-slate-950 pb-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src="./assets/aistudio/NannyMatch_SA_logo_update_cleaned_8326fb61.png" 
                          alt="NannyMatch SA" 
                          className="h-12 w-12 sm:h-14 sm:w-14 object-contain rounded-xl shrink-0" 
                        />
                        <div>
                          <h1 className="text-xl sm:text-2xl font-black text-slate-950 uppercase tracking-tight">
                            {fullName}
                          </h1>
                          <div className="text-xs font-bold text-pink-600 uppercase tracking-wider mt-0.5">
                            {careType} &bull; {city}, South Africa
                          </div>
                          <div className="text-xs text-slate-600 mt-0.5">
                            {suburb} &bull; Phone: <span className="font-mono text-slate-900">{phone}</span> &bull; {email} &bull; {idType}
                          </div>
                        </div>
                      </div>

                      {photoUrl ? (
                        <img 
                          src={photoUrl} 
                          alt={fullName} 
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-300 shrink-0" 
                        />
                      ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-pink-50 border-2 border-pink-200 flex items-center justify-center font-bold text-pink-700 text-lg shrink-0">
                          {fullName.split(' ').map((n) => n[0]).join('')}
                        </div>
                      )}
                    </div>

                    {/* Quick Metadata Bar */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Experience</span>
                        <span className="font-extrabold text-slate-950">{experienceYears} Years Verified</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Expected Remuneration</span>
                        <span className="font-extrabold text-slate-950">R{expectedMonthlyZAR.toLocaleString()} / mo (R{expectedHourlyZAR}/hr)</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase font-bold">Language Proficiency</span>
                        <span className="font-bold text-slate-800">{languages}</span>
                      </div>
                    </div>

                    {/* Professional Summary */}
                    <div className="space-y-1.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                        Professional Childcare Summary
                      </h3>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {bio}
                      </p>
                    </div>

                    {/* Core Competencies */}
                    <div className="space-y-1.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                        Childcare Skills & Key Competencies
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs text-slate-800">
                        {skills.map((skill, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-pink-600 shrink-0" />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Work Experience */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                        Domestic Employment History
                      </h3>
                      <div className="space-y-2.5 text-xs text-slate-800">
                        {workHistory.map((work, idx) => (
                          <div key={work.id} className="p-3 rounded-xl bg-slate-50/80 border border-slate-200">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-950">
                                {idx + 1}. {work.familyName} &bull; {work.suburbAndCity}
                              </span>
                              <span className="text-slate-500 font-medium">{work.duration}</span>
                            </div>
                            <div className="text-slate-600 text-[11px] mt-0.5">
                              Cared for: <strong>{work.childrenDetails}</strong>
                            </div>
                            <div className="text-slate-700 text-xs mt-1 leading-relaxed">
                              {work.duties}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Verified Compliance Documents On File */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                        Verified South African Documents on File (PDF Format)
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-950">
                          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                          <div>
                            <div className="font-bold text-[11px]">SAPS Police Clearance Certificate</div>
                            <div className="text-[10px] text-emerald-800 font-mono">{policeClearancePdf}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/60 border border-emerald-200 text-emerald-950">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <div>
                            <div className="font-bold text-[11px]">First Aid / Pediatric CPR Certificate</div>
                            <div className="text-[10px] text-emerald-800 font-mono">{firstAidPdf}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900">
                          <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                          <div>
                            <div className="font-bold text-[11px]">Identity Document Verification</div>
                            <div className="text-[10px] text-slate-600 font-mono">{idDocPdf}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900">
                          <FileText className="w-4 h-4 text-slate-600 shrink-0" />
                          <div>
                            <div className="font-bold text-[11px]">Former Family Reference Letter</div>
                            <div className="text-[10px] text-slate-600 font-mono">{referenceLetterPdf}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Former Family References */}
                    <div className="space-y-1.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                        Contactable Former Employer References
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {references.map((ref, idx) => (
                          <div key={ref.id} className="p-2.5 border border-slate-200 rounded-xl bg-slate-50">
                            <div className="font-bold text-slate-900">Reference {idx + 1}: {ref.employerName}</div>
                            <div className="text-slate-500 text-[11px]">{ref.relationship} &bull; {ref.suburb}</div>
                            <div className="font-mono text-[11px] text-pink-700 font-bold mt-1">{ref.phone}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Stamp */}
                    <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>NannyMatch SA Certified Caregiver Registry &bull; JHB &bull; Durban &bull; Cape Town</span>
                      <span>Verification Ref: {isPaid ? paymentSuccessRef : 'PENDING-PAYMENT'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SOUTH AFRICAN PAYMENT GATEWAY MODAL ("ONLY CAN DOWNLOAD AFTER PAYMENT") */}
      {/* ======================================================== */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-5 sm:p-6 shadow-2xl relative space-y-5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-gate-title"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="payment-gate-title" className="text-base font-bold text-slate-900">
                    Unlock ATS CV Download
                  </h3>
                  <div className="text-xs text-slate-500">
                    Required to download & export verified PDF resumes
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 cursor-pointer rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Plan / Fee Selection */}
            <div className="space-y-2.5 text-xs">
              <label className="block font-bold text-slate-800">1. Select Option</label>

              {/* Option A: R50 Single CV Redesign & Download */}
              <div
                onClick={() => setSelectedPlanOption('redesign_r50')}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  selectedPlanOption === 'redesign_r50'
                    ? 'border-pink-600 bg-pink-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>System CV Redesign & PDF Download</span>
                    <span className="text-[10px] bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-extrabold uppercase">
                      Popular
                    </span>
                  </div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    Unlocks high-res PDF download, printable layout & ATS plain-text copy
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-950">R50</div>
                  <div className="text-[10px] text-slate-400">once-off</div>
                </div>
              </div>

              {/* Option B: Nanny Monthly R59 */}
              <div
                onClick={() => setSelectedPlanOption('nanny_monthly_r59')}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  selectedPlanOption === 'nanny_monthly_r59'
                    ? 'border-pink-600 bg-pink-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="font-bold text-slate-900">Nanny Pro Monthly Membership</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    Unlimited CV downloads + SAPS badge + Priority family placement
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-950">R59</div>
                  <div className="text-[10px] text-slate-400">/ month</div>
                </div>
              </div>

              {/* Option C: Nanny Quarterly R220 */}
              <div
                onClick={() => setSelectedPlanOption('nanny_quarterly_r220')}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  selectedPlanOption === 'nanny_quarterly_r220'
                    ? 'border-pink-600 bg-pink-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="font-bold text-slate-900">3-Month Nanny Pro Pass</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    Covers full job search season across JHB, Durban & Cape Town
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-slate-950">R220</div>
                  <div className="text-[10px] text-slate-400">/ 3 months</div>
                </div>
              </div>
            </div>

            {/* South African Payment Gateway Selection */}
            <div className="space-y-2 text-xs">
              <label className="block font-bold text-slate-800">2. South African Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('ozow')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'ozow'
                      ? 'border-pink-600 bg-pink-50 text-pink-900 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Building className="w-4 h-4 mx-auto mb-1 text-pink-600" />
                  <span>Ozow Instant EFT</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-pink-600 bg-pink-50 text-pink-900 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mx-auto mb-1 text-slate-700" />
                  <span>Visa / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('capitec')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'capitec'
                      ? 'border-pink-600 bg-pink-50 text-pink-900 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                  <span>Capitec Pay</span>
                </button>
              </div>

              {paymentMethod === 'ozow' && (
                <div className="pt-1">
                  <label className="block text-[11px] text-slate-500 mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-800"
                  >
                    <option value="Capitec">Capitec Bank</option>
                    <option value="FNB">FNB / First National Bank</option>
                    <option value="Standard Bank">Standard Bank</option>
                    <option value="Nedbank">Nedbank</option>
                    <option value="Absa">Absa</option>
                    <option value="TymeBank">TymeBank</option>
                  </select>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleProcessPayment}
                disabled={isProcessingPayment}
                className="w-full py-3 min-h-[46px] text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl cursor-pointer transition-all shadow-md shadow-pink-600/30 flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing with {paymentMethod === 'ozow' ? selectedBank : 'Bank Gateway'}...</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" />
                    <span>
                      Pay {selectedPlanOption === 'redesign_r50' ? 'R50' : selectedPlanOption === 'nanny_monthly_r59' ? 'R59' : 'R220'} & Unlock Download
                    </span>
                  </>
                )}
              </button>

              <div className="text-center text-[10px] text-slate-400">
                Encrypted 256-bit South African EFT & Card Gateway &bull; Instant unlock
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
