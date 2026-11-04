import React, { useState } from 'react';
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
  FileCheck
} from 'lucide-react';
import { SouthAfricanCity, CareType } from '../types';

interface NannyCVMakerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveToProfile?: (cvData: any) => void;
}

export const NannyCVMakerModal: React.FC<NannyCVMakerModalProps> = ({
  isOpen,
  onClose,
  onSaveToProfile,
}) => {
  // Step navigation
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

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
  const [languages, setLanguages] = useState<string>('English (Fluent), isiZulu (Native), Sesotho (Conversational)');
  const [bio, setBio] = useState<string>(
    'Dedicated, patient, and warm childcare professional with over 8 years of private home experience caring for toddlers and infants. Experienced in preparing healthy balanced meals, establishing consistent sleep schedules, and early childhood sensory play.'
  );

  // Competencies
  const [skills, setSkills] = useState<string[]>([
    'Infant & Toddler Care',
    'Nutritious Meal Prep',
    'Nap & Sleep Routine Conditioning',
    'Potty Training Assistance',
    'Sensory & Educational Play',
    'St John First Aid / CPR',
  ]);

  // Work History
  const [previousFamily1, setPreviousFamily1] = useState<string>('The Bester Family (Bryanston, JHB) — 3 Years (Cared for twins from 4 months to 3 years)');
  const [previousFamily2, setPreviousFamily2] = useState<string>('The Van Zyl Family (Rosebank, JHB) — 4 Years (Toddler care, preschool readiness, light housekeeping)');

  // References
  const [referencePhone1, setReferencePhone1] = useState<string>('+27 83 901 4455 (Mrs. Bester - Contactable)');
  const [referencePhone2, setReferencePhone2] = useState<string>('+27 82 312 8890 (Mr. Van Zyl - Contactable)');

  // Clear Photo State
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoName, setPhotoName] = useState<string>('');

  // Uploaded PDF Documents
  const [policeClearancePdf, setPoliceClearancePdf] = useState<string>('SAPS_Clearance_Nandi_Khumalo_2026.pdf');
  const [firstAidPdf, setFirstAidPdf] = useState<string>('St_John_CPR_FirstAid_Level1.pdf');
  const [idDocPdf, setIdDocPdf] = useState<string>('SA_ID_Book_Certified.pdf');
  const [referenceLetterPdf, setReferenceLetterPdf] = useState<string>('Reference_Letter_Bester_Family.pdf');

  // Redesign option (+R50)
  const [includeSystemRedesign, setIncludeSystemRedesign] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [redesignPaid, setRedesignPaid] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a clear portrait image file (JPG or PNG).');
        return;
      }
      setPhotoName(file.name);
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  const handlePdfUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (name: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
        alert('Rule reminder: Documents must strictly be in PDF format (.pdf).');
        return;
      }
      setter(file.name);
    }
  };

  const handleCopyAtsText = () => {
    const atsText = `NANNYMATCH SA ATS-COMPLIANT CHILDCARE CV
=====================================================
NAME: ${fullName.toUpperCase()}
SPECIALIZATION: ${careType.toUpperCase()}
LOCATION: ${suburb}, ${city}, South Africa
CONTACT: ${phone} | ${email}
LEGAL STATUS: ${idType} (South African)
EXPECTED REMUNERATION: R${expectedMonthlyZAR.toLocaleString()} / Month (R${expectedHourlyZAR}/hour)
=====================================================

PROFESSIONAL SUMMARY
${bio}

CORE CHILDCARE COMPETENCIES & ATTRIBUTES
${skills.map((s) => `• ${s}`).join('\n')}

LANGUAGES
${languages}

EXPERIENCE & DOMESTIC EMPLOYMENT HISTORY
1. ${previousFamily1}
2. ${previousFamily2}

VERIFIED SOUTH AFRICAN COMPLIANCE & DOCUMENTS (PDF ON FILE)
• SAPS Police Criminal Record Clearance: ${policeClearancePdf ? `ATTACHED (${policeClearancePdf})` : 'Pending'}
• First Aid / Pediatric CPR: ${firstAidPdf ? `ATTACHED (${firstAidPdf})` : 'Pending'}
• South African ID / Document: ${idDocPdf ? `ATTACHED (${idDocPdf})` : 'Pending'}
• Written Reference Letters: ${referenceLetterPdf ? `ATTACHED (${referenceLetterPdf})` : 'Pending'}

CONTACTABLE FORMER EMPLOYER REFERENCES
• Reference 1: ${referencePhone1}
• Reference 2: ${referencePhone2}
=====================================================
Generated via NannyMatch SA ATS Childcare CV Engine`;

    navigator.clipboard.writeText(atsText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePayRedesign = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setRedesignPaid(true);
      setActiveTab('preview');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl border border-slate-200/90 max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-maker-title"
      >
        {/* Sticky Header with Official Logo */}
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
                  Nanny CV Maker & ATS Converter
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                  ATS Ready
                </span>
              </div>
              <div className="text-xs text-slate-500">
                Turn your experience into an employer-ready South African childcare CV
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher */}
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
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'preview' ? 'bg-white text-pink-700 shadow-xs' : 'text-slate-600'
                }`}
              >
                ATS Preview
              </button>
            </div>

            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="text-slate-400 hover:text-slate-700 cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 flex-1">
          {/* Rules Banner - Prominently Displaying Image & PDF Requirements */}
          <div className="bg-slate-950 text-white rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-pink-400" />
                  <span>Mandatory Upload Rules for Caregivers</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed max-w-xl">
                  <strong>1. Clear Portrait Photo:</strong> Professional, clear face photo with natural lighting and no heavy filters.<br/>
                  <strong>2. PDF Documents Only:</strong> SAPS clearance, ID, and former employer letters must strictly be in <strong>.pdf</strong> format to pass family verification.
                </div>
              </div>

              {/* Redesign system callout */}
              <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-3 shrink-0 text-xs sm:w-64">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">System CV Redesign</span>
                  <span className="text-pink-400 font-extrabold">+R50 once-off</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Our system converts rough notes into an executive ATS-formatted childcare CV.
                </p>
                <label className="flex items-center gap-2 mt-2 cursor-pointer text-[11px] font-semibold text-pink-300">
                  <input
                    type="checkbox"
                    checked={includeSystemRedesign}
                    onChange={(e) => setIncludeSystemRedesign(e.target.checked)}
                    className="rounded border-slate-700 text-pink-600 focus:ring-pink-500"
                  />
                  <span>Enable System Redesign (+R50)</span>
                </label>
              </div>
            </div>
          </div>

          {activeTab === 'editor' ? (
            <div className="space-y-6">
              {/* Photo & Document Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Clear Photo Upload */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-pink-600" />
                      <span>Caregiver Portrait Photo (Clear JPG / PNG)</span>
                    </label>
                    <span className="text-[10px] text-pink-600 font-bold bg-pink-50 px-2 py-0.5 rounded-md">
                      Required
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                      {photoUrl ? (
                        <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <label className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[38px] text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-slate-700" />
                        <span>{photoName ? 'Change Clear Photo' : 'Upload Clear Photo'}</span>
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
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {photoName}
                          </span>
                        ) : (
                          'Upload a smiling, clear face picture with a plain background.'
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Documents (Strictly PDF) */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-pink-600" />
                      <span>Verification Documents (PDF Format Only)</span>
                    </label>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      .PDF Only
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {/* SAPS PDF */}
                    <div className="p-2 border border-slate-200 rounded-xl bg-slate-50">
                      <div className="font-semibold text-[11px] text-slate-800 truncate">1. SAPS Clearance (.pdf)</div>
                      <label className="mt-1 text-[10px] text-pink-600 hover:text-pink-700 font-bold block cursor-pointer truncate">
                        {policeClearancePdf ? `✓ ${policeClearancePdf}` : '+ Upload PDF'}
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePdfUpload(e, setPoliceClearancePdf)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* First Aid PDF */}
                    <div className="p-2 border border-slate-200 rounded-xl bg-slate-50">
                      <div className="font-semibold text-[11px] text-slate-800 truncate">2. First Aid / CPR (.pdf)</div>
                      <label className="mt-1 text-[10px] text-pink-600 hover:text-pink-700 font-bold block cursor-pointer truncate">
                        {firstAidPdf ? `✓ ${firstAidPdf}` : '+ Upload PDF'}
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePdfUpload(e, setFirstAidPdf)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* ID Document PDF */}
                    <div className="p-2 border border-slate-200 rounded-xl bg-slate-50">
                      <div className="font-semibold text-[11px] text-slate-800 truncate">3. SA ID / Permit (.pdf)</div>
                      <label className="mt-1 text-[10px] text-pink-600 hover:text-pink-700 font-bold block cursor-pointer truncate">
                        {idDocPdf ? `✓ ${idDocPdf}` : '+ Upload PDF'}
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePdfUpload(e, setIdDocPdf)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {/* Reference Letter PDF */}
                    <div className="p-2 border border-slate-200 rounded-xl bg-slate-50">
                      <div className="font-semibold text-[11px] text-slate-800 truncate">4. Reference Letter (.pdf)</div>
                      <label className="mt-1 text-[10px] text-pink-600 hover:text-pink-700 font-bold block cursor-pointer truncate">
                        {referenceLetterPdf ? `✓ ${referenceLetterPdf}` : '+ Upload PDF'}
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => handlePdfUpload(e, setReferenceLetterPdf)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details Form */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Caregiver Profile Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
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
                    <label className="block text-slate-700 font-semibold mb-1">City Hub</label>
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
                    <label className="block text-slate-700 font-semibold mb-1">Suburb</label>
                    <input
                      type="text"
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      placeholder="e.g. Sandton, Umhlanga, Camps Bay"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">South African ID / Permit Status</label>
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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Primary Care Type</label>
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
                    <label className="block text-slate-700 font-semibold mb-1">Years Experience</label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Expected Wage (ZAR/mo)</label>
                    <input
                      type="number"
                      value={expectedMonthlyZAR}
                      onChange={(e) => setExpectedMonthlyZAR(Number(e.target.value))}
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:bg-white focus:ring-1 focus:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1 text-xs">Professional Summary / Bio</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs focus:bg-white focus:ring-1 focus:ring-pink-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Work History & Former References */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Employment History & Former Family References
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Past Family Placement 1</label>
                    <input
                      type="text"
                      value={previousFamily1}
                      onChange={(e) => setPreviousFamily1(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Contactable Reference Phone 1</label>
                    <input
                      type="text"
                      value={referencePhone1}
                      onChange={(e) => setReferencePhone1(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Past Family Placement 2</label>
                    <input
                      type="text"
                      value={previousFamily2}
                      onChange={(e) => setPreviousFamily2(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Contactable Reference Phone 2</label>
                    <input
                      type="text"
                      value={referencePhone2}
                      onChange={(e) => setReferencePhone2(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="text-xs text-slate-500">
                  {includeSystemRedesign ? (
                    <span className="font-semibold text-pink-600">
                      System ATS Professional Redesign selected (+R50)
                    </span>
                  ) : (
                    <span>Standard ATS Childcare Format included free</span>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className="flex-1 sm:flex-none px-5 py-2.5 min-h-[44px] text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl cursor-pointer shadow-sm shadow-pink-600/30 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Generate & View ATS CV</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ATS Preview Mode */
            <div className="space-y-5">
              {/* Top toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="text-xs text-slate-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    ATS Format Verified: Standard parsing headings, font hierarchy, and contact metadata.
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyAtsText}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:bg-slate-100 rounded-xl cursor-pointer flex items-center gap-1.5"
                  >
                    {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedText ? 'Copied' : 'Copy Plain Text'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-900 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>

                  {includeSystemRedesign && !redesignPaid && (
                    <button
                      onClick={handlePayRedesign}
                      disabled={isProcessingPayment}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-pink-600 hover:bg-pink-700 rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm shadow-pink-600/30"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isProcessingPayment ? 'Activating...' : 'Redesign Service (R50)'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* The Rendered Clean ATS Childcare Resume */}
              <div 
                id="printable-cv"
                className="bg-white border-2 border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-lg font-sans text-slate-900 space-y-6 max-w-3xl mx-auto print:border-0 print:p-0"
              >
                {/* Official NannyMatch SA Certification Header */}
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
                        {suburb} &bull; {phone} &bull; {email} &bull; {idType}
                      </div>
                    </div>
                  </div>

                  {photoUrl ? (
                    <img 
                      src={photoUrl} 
                      alt={fullName} 
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-slate-200 shrink-0" 
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-pink-50 border-2 border-pink-200 flex items-center justify-center font-bold text-pink-700 text-lg shrink-0">
                      {fullName.split(' ').map((n) => n[0]).join('')}
                    </div>
                  )}
                </div>

                {/* Rates & Availability Sub-bar */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Experience</span>
                    <span className="font-extrabold text-slate-950">{experienceYears} Years Verified</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Expected Remuneration</span>
                    <span className="font-extrabold text-slate-950">R{expectedMonthlyZAR.toLocaleString()} / mo (~R{expectedHourlyZAR}/hr)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Language Proficiency</span>
                    <span className="font-bold text-slate-800">{languages}</span>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                    Professional Summary
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
                  <div className="space-y-2 text-xs text-slate-800">
                    <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                      <div className="font-bold text-slate-950">1. {previousFamily1}</div>
                      <div className="text-slate-600 text-[11px] mt-0.5">Duties: Child safety, healthy balanced cooking, routines, daily outdoor activities.</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                      <div className="font-bold text-slate-950">2. {previousFamily2}</div>
                      <div className="text-slate-600 text-[11px] mt-0.5">Duties: Infant care, developmental milestones support, nursery hygiene.</div>
                    </div>
                  </div>
                </div>

                {/* Verified Compliance Documents On File */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-950 border-b border-slate-200 pb-1">
                    Verified South African Documents on File (PDF Format)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-emerald-950">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      <div>
                        <div className="font-bold text-[11px]">SAPS Police Clearance Certificate</div>
                        <div className="text-[10px] text-emerald-800 font-mono">{policeClearancePdf}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-emerald-950">
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
                    <div className="p-2 border border-slate-100 rounded-xl bg-slate-50">
                      <div className="font-bold text-slate-900">Reference 1:</div>
                      <div className="font-mono text-[11px] text-slate-800 mt-0.5">{referencePhone1}</div>
                    </div>
                    <div className="p-2 border border-slate-100 rounded-xl bg-slate-50">
                      <div className="font-bold text-slate-900">Reference 2:</div>
                      <div className="font-mono text-[11px] text-slate-800 mt-0.5">{referencePhone2}</div>
                    </div>
                  </div>
                </div>

                {/* Footer Stamp */}
                <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
                  <span>NannyMatch SA Verified Caregiver Network &bull; JHB &bull; Durban &bull; Cape Town</span>
                  <span>BCEA Sectoral Determination 7 Compliant</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
