import React, { useState } from 'react';
import { 
  Calculator, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  AlertCircle, 
  ShieldCheck, 
  Building,
  Printer
} from 'lucide-react';

export const PayrollCalculatorModal: React.FC = () => {
  // Inputs
  const [hourlyRate, setHourlyRate] = useState<number>(45); // Common market rate (min is 27.58)
  const [weeklyHours, setWeeklyHours] = useState<number>(45); // Max regular hours without overtime
  const [hasAccommodation, setHasAccommodation] = useState<boolean>(false);
  const [employeeName, setEmployeeName] = useState<string>('Nandi Khumalo');
  const [employerName, setEmployerName] = useState<string>('The Bester Family');
  const [employerSuburb, setEmployerSuburb] = useState<string>('Sandton, Johannesburg');
  const [copiedContract, setCopiedContract] = useState<boolean>(false);
  const [copiedPayslip, setCopiedPayslip] = useState<boolean>(false);

  // Constants
  const LEGAL_MIN_HOURLY = 27.58; // Current SA Sectoral Determination 7 / NMW rate

  // Math
  const effectiveHourly = Math.max(hourlyRate, LEGAL_MIN_HOURLY);
  const weeklyGross = effectiveHourly * weeklyHours;
  // South African standard monthly multiplier: (weekly gross * 52) / 12 or weekly * 4.333
  const monthlyGross = (weeklyGross * 52) / 12;

  // UIF (1% employee, 1% employer, max earnings ceiling is R17,712/month)
  const uifCeiling = 17712;
  const uifBasis = Math.min(monthlyGross, uifCeiling);
  const employeeUif = uifBasis * 0.01;
  const employerUif = uifBasis * 0.01;
  const totalUif = employeeUif + employerUif;

  // Accommodation deduction permitted by BCEA is max 10% of wage if private and complies with sanitary standards
  const accommodationDeduction = hasAccommodation ? monthlyGross * 0.10 : 0;

  // Net Pay
  const netMonthlyPay = monthlyGross - employeeUif - accommodationDeduction;

  const handleCopyContract = () => {
    const contractText = `SOUTH AFRICAN DOMESTIC WORKER EMPLOYMENT CONTRACT
(Compliant with Section 29 of the Basic Conditions of Employment Act, No. 75 of 1997)

1. PARTIES:
- Employer: ${employerName}
- Residential Address: ${employerSuburb}, South Africa
- Employee: ${employeeName}

2. COMMENCEMENT & PROBATION:
- Employment commences on: 1st of the month
- Probation period: 3 months with regular monthly reviews.

3. PLACE OF WORK & ACCOMMODATION:
- Place of work: ${employerSuburb}
- Accommodation: ${hasAccommodation ? 'Private room with bathroom provided on premises' : 'Live-out'}.

4. JOB TITLE & DUTIES:
- Childcare, child meals preparation, laundry of children's clothing, play supervision, school transport assistance.

5. HOURS OF WORK:
- Ordinary Hours: ${weeklyHours} hours per week.
- Overtime: Worked only by mutual agreement and paid at 1.5 times normal hourly rate (or 2.0 times on Sundays).

6. REMUNERATION & DEDUCTIONS:
- Basic Hourly Rate: R${effectiveHourly.toFixed(2)} (Exceeds legal minimum of R${LEGAL_MIN_HOURLY})
- Gross Monthly Remuneration: R${monthlyGross.toFixed(2)}
- Statutory Deductions:
  * Unemployment Insurance Fund (UIF - 1% Employee): R${employeeUif.toFixed(2)}
  ${hasAccommodation ? `* Accommodation deduction (Permitted 10%): R${accommodationDeduction.toFixed(2)}` : ''}
- Net Monthly Remuneration Payable: R${netMonthlyPay.toFixed(2)}
- Employer UIF Contribution (1%): R${employerUif.toFixed(2)} (Paid to SARS/Department of Employment & Labour)

7. LEAVE ENTITLEMENT:
- Annual Leave: 21 consecutive days paid leave per 12-month cycle.
- Sick Leave: 30 days paid sick leave in a 3-year cycle.
- Family Responsibility Leave: 3 to 5 days paid leave per year.

8. TERMINATION OF EMPLOYMENT:
- 1 week notice during the first 6 months.
- 4 weeks notice after 6 months of continuous employment.

Signed at _____________________ on this _____ day of ____________ 2026.

Employer: _________________________    Employee: _________________________`;

    navigator.clipboard.writeText(contractText);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2500);
  };

  const handleCopyPayslip = () => {
    const slip = `=====================================================
SOUTH AFRICAN DOMESTIC WORKER MONTHLY PAYSLIP
Employer: ${employerName} (${employerSuburb})
Employee: ${employeeName}
Pay Period: Current Month (BCEA Section 33 Compliant)
=====================================================
Ordinary Hours Worked: ${weeklyHours * 4.333} hours
Hourly Rate: R${effectiveHourly.toFixed(2)}

EARNINGS:
- Basic Wage: R${monthlyGross.toFixed(2)}
TOTAL GROSS: R${monthlyGross.toFixed(2)}

DEDUCTIONS:
- UIF Employee Contribution (1%): -R${employeeUif.toFixed(2)}
${hasAccommodation ? `- Accommodation (BCEA max 10%): -R${accommodationDeduction.toFixed(2)}` : ''}
TOTAL DEDUCTIONS: -R${(employeeUif + accommodationDeduction).toFixed(2)}

-----------------------------------------------------
NET PAYABLE (EFT / Cash): R${netMonthlyPay.toFixed(2)}
-----------------------------------------------------
EMPLOYER STATUTORY OBLIGATIONS:
- Employer UIF Contribution (1%): R${employerUif.toFixed(2)}
- Total UIF Remittance to uFiling (2%): R${totalUif.toFixed(2)}
=====================================================`;

    navigator.clipboard.writeText(slip);
    setCopiedPayslip(true);
    setTimeout(() => setCopiedPayslip(false), 2500);
  };

  return (
    <div id="payroll-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-stone-200">
        <div className="text-xs font-semibold uppercase tracking-wider text-amber-800">
          South African Legal Compliance & Payroll
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mt-1">
          Domestic Worker Wage, UIF & Contract Toolkit
        </h2>
        <div className="text-xs sm:text-sm text-stone-500 mt-1">
          Compliant with the Basic Conditions of Employment Act (BCEA) & Sectoral Determination 7 for Johannesburg, Durban, and Cape Town
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Calculator (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-stone-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-amber-700" />
              <span>Wage & UIF Calculator</span>
            </h3>
            <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              2026 Legal Rates
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Hourly Rate */}
            <div>
              <div className="flex justify-between font-semibold text-stone-800 mb-1">
                <span>Agreed Hourly Rate (ZAR)</span>
                <span className="tabular-nums font-bold text-stone-900">R{hourlyRate}/hour</span>
              </div>
              <input
                type="range"
                min="27.58"
                max="120"
                step="1"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>Legal Min: R{LEGAL_MIN_HOURLY}/hr</span>
                <span>Market Average: R45–R65/hr</span>
              </div>
            </div>

            {/* Weekly Hours */}
            <div>
              <div className="flex justify-between font-semibold text-stone-800 mb-1">
                <span>Weekly Hours</span>
                <span className="tabular-nums font-bold text-stone-900">{weeklyHours} hrs/week</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="1"
                value={weeklyHours}
                onChange={(e) => setWeeklyHours(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-500 mt-1">
                <span>Part-time: 20 hrs</span>
                <span>BCEA Max Normal: 45 hrs</span>
              </div>
            </div>

            {/* Accommodation checkbox */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasAccommodation}
                  onChange={(e) => setHasAccommodation(e.target.checked)}
                  className="rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                />
                <span className="font-medium text-stone-800">
                  Deduct accommodation (BCEA permits max 10% if private cottage provided)
                </span>
              </label>
            </div>

            {/* Calculated Breakdown Card */}
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 space-y-2.5">
              <div className="flex justify-between text-stone-600">
                <span>Gross Weekly Wage:</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  R{weeklyGross.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-stone-600">
                <span>Gross Monthly Remuneration:</span>
                <span className="font-bold text-stone-900 tabular-nums">
                  R{monthlyGross.toFixed(2)}
                </span>
              </div>

              <div className="pt-2 border-t border-stone-200/80 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-stone-600">
                  <span>Employee UIF Deduction (1%):</span>
                  <span className="text-red-700 font-medium tabular-nums">-R{employeeUif.toFixed(2)}</span>
                </div>
                {hasAccommodation && (
                  <div className="flex justify-between text-stone-600">
                    <span>Accommodation Deduction (10%):</span>
                    <span className="text-red-700 font-medium tabular-nums">-R{accommodationDeduction.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-600">
                  <span>Employer UIF Contribution (1%):</span>
                  <span className="text-stone-700 tabular-nums">+R{employerUif.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Total UIF payable to SARS/uFiling:</span>
                  <span className="font-semibold text-stone-900 tabular-nums">R{totalUif.toFixed(2)}/mo</span>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline">
                <span className="font-bold text-stone-900 text-xs uppercase">Net Monthly Take-Home:</span>
                <span className="text-xl font-extrabold text-amber-800 tabular-nums">
                  R{netMonthlyPay.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Quick Actions - Mobile friendly buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={handleCopyPayslip}
                className="flex-1 py-2.5 px-3 min-h-[44px] text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 active:bg-stone-300 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                {copiedPayslip ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPayslip ? 'Payslip Copied!' : 'Copy Monthly Payslip'}</span>
              </button>
              <button
                onClick={handleCopyContract}
                className="flex-1 py-2.5 px-3 min-h-[44px] text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 active:bg-stone-950 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                {copiedContract ? <Check className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4" />}
                <span>{copiedContract ? 'Contract Copied!' : 'Copy SA Contract'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Legal Requirements & Contract Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 3 Core Legal Pillars for SA Employers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-1.5 shadow-xs">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>UIF Registration</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Mandatory by law if employee works &gt;24 hours/month. Register free via <strong className="text-stone-800">uFiling.gov.za</strong>.
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-1.5 shadow-xs">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-700" />
                <span>Written Contract</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Section 29 of the BCEA requires a signed contract detailing wages, hours, and notice periods from Day 1.
              </p>
            </div>

            <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-1.5 shadow-xs">
              <div className="font-bold text-stone-900 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-blue-700" />
                <span>COIDA Workplace Cover</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Following the Constitutional Court ruling, domestic workers are covered for workplace injuries under COIDA.
              </p>
            </div>
          </div>

          {/* South African Employment Contract Preview Box */}
          <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Standard SA Domestic Employment Contract Preview
                </h3>
                <div className="text-xs text-stone-500">
                  Customised with your calculated R{monthlyGross.toFixed(0)}/mo rate and {weeklyHours} hours
                </div>
              </div>
              <button
                onClick={handleCopyContract}
                className="px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-md transition-colors cursor-pointer flex items-center gap-1"
              >
                {copiedContract ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedContract ? 'Copied' : 'Copy Template'}</span>
              </button>
            </div>

            {/* Editable Contract Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-stone-500 font-medium mb-1">Employer Family</label>
                <input
                  type="text"
                  value={employerName}
                  onChange={(e) => setEmployerName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 text-stone-800"
                />
              </div>
              <div>
                <label className="block text-stone-500 font-medium mb-1">Employee Nanny</label>
                <input
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 text-stone-800"
                />
              </div>
              <div>
                <label className="block text-stone-500 font-medium mb-1">Suburb / City</label>
                <input
                  type="text"
                  value={employerSuburb}
                  onChange={(e) => setEmployerSuburb(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 text-stone-800"
                />
              </div>
            </div>

            {/* Contract Summary Excerpt */}
            <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 font-mono text-[11px] text-stone-700 leading-relaxed max-h-56 overflow-y-auto space-y-2">
              <div className="font-bold text-stone-900 border-b border-stone-200 pb-1">
                CONTRACT OF EMPLOYMENT — DOMESTIC WORKER (BCEA COMPLIANT)
              </div>
              <div>
                Between <strong>{employerName}</strong> ({employerSuburb}) and <strong>{employeeName}</strong>.
              </div>
              <div>
                <strong>Ordinary Working Hours:</strong> {weeklyHours} hours per week. Overtime rate: 1.5x.
              </div>
              <div>
                <strong>Gross Monthly Wage:</strong> R{monthlyGross.toFixed(2)} | <strong>UIF Deduction:</strong> R{employeeUif.toFixed(2)} | <strong>Net Take-Home:</strong> R{netMonthlyPay.toFixed(2)}.
              </div>
              <div>
                <strong>Leave:</strong> 21 consecutive days paid annual leave. 30 days paid sick leave per 3-year cycle.
              </div>
              <div>
                <strong>Notice Period:</strong> 1 week during first 6 months, 4 weeks thereafter in writing.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
