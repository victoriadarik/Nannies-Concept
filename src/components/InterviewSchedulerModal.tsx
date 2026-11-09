import React, { useState } from 'react';
import { NannyProfile, InterviewBooking } from '../types';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Video, 
  Coffee, 
  Home, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

interface InterviewSchedulerModalProps {
  nanny: NannyProfile | null;
  onClose: () => void;
  onConfirmBooking: (booking: InterviewBooking) => void;
}

export const InterviewSchedulerModal: React.FC<InterviewSchedulerModalProps> = ({
  nanny,
  onClose,
  onConfirmBooking,
}) => {
  const [selectedType, setSelectedType] = useState<
    'Video Call (Google Meet)' | 'In-Person at Coffee Shop' | 'In-Person at Home'
  >('Video Call (Google Meet)');
  const [parentName, setParentName] = useState<string>('Van der Merwe Family');
  const [date, setDate] = useState<string>('2026-10-27');
  const [time, setTime] = useState<string>('14:30');
  const [locationOrLink, setLocationOrLink] = useState<string>(
    'https://meet.google.com/nny-jhb-care'
  );
  const [notes, setNotes] = useState<string>(
    'We would like to introduce our 2-year-old son and discuss your experience with sleep routines and healthy meal preparation.'
  );
  const [isBooked, setIsBooked] = useState<boolean>(false);

  if (!nanny) return null;

  const handleTypeChange = (type: 'Video Call (Google Meet)' | 'In-Person at Coffee Shop' | 'In-Person at Home') => {
    setSelectedType(type);
    if (type === 'Video Call (Google Meet)') {
      setLocationOrLink(`https://meet.google.com/nm-${nanny.city.toLowerCase().slice(0, 3)}-${Date.now().toString().slice(-4)}`);
    } else if (type === 'In-Person at Coffee Shop') {
      setLocationOrLink(`Vida e Caffè / Seattle Coffee Co, ${nanny.suburb}`);
    } else {
      setLocationOrLink(`Family residence, ${nanny.suburb}, ${nanny.city}`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: InterviewBooking = {
      id: `book-${Date.now()}`,
      nannyId: nanny.id,
      nannyName: nanny.name,
      parentName,
      date,
      time,
      interviewType: selectedType,
      locationOrLink,
      notes,
      status: 'Scheduled',
    };

    onConfirmBooking(newBooking);
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200/80 max-w-xl w-full p-6 shadow-2xl space-y-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="interview-scheduler-title"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 id="interview-scheduler-title" className="text-lg font-bold text-slate-900">
              Schedule Childcare Interview
            </h3>
            <div className="text-xs text-slate-500">
              Meeting with {nanny.name} ({nanny.suburb}, {nanny.city})
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-slate-700 cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBooked ? (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-6 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <div className="font-bold text-base">Interview Confirmed!</div>
            <div className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
              {nanny.name} has been notified via WhatsApp and SMS for {date} at {time}. Meeting details sent to both parties.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Format choice */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1.5">
                Interview Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleTypeChange('Video Call (Google Meet)')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                    selectedType === 'Video Call (Google Meet)'
                      ? 'border-pink-600 bg-pink-50/60 ring-1 ring-pink-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Video className="w-4 h-4 text-pink-600 mb-1" />
                  <div className="font-bold text-slate-900 text-[11px]">Video Call</div>
                  <div className="text-[10px] text-slate-500">Google Meet link</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange('In-Person at Coffee Shop')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                    selectedType === 'In-Person at Coffee Shop'
                      ? 'border-pink-600 bg-pink-50/60 ring-1 ring-pink-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Coffee className="w-4 h-4 text-pink-600 mb-1" />
                  <div className="font-bold text-slate-900 text-[11px]">Coffee Shop</div>
                  <div className="text-[10px] text-slate-500">Neutral public spot</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleTypeChange('In-Person at Home')}
                  className={`p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                    selectedType === 'In-Person at Home'
                      ? 'border-pink-600 bg-pink-50/60 ring-1 ring-pink-500/30'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Home className="w-4 h-4 text-pink-600 mb-1" />
                  <div className="font-bold text-slate-900 text-[11px]">Home Visit</div>
                  <div className="text-[10px] text-slate-500">Meet with kids</div>
                </button>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Proposed Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-sans focus:bg-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  Time Slot
                </label>
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-sans focus:bg-white focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Meeting link / address */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Meeting Link or Location Address
              </label>
              <input
                type="text"
                required
                value={locationOrLink}
                onChange={(e) => setLocationOrLink(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block font-semibold text-slate-800 mb-1">
                Notes for {nanny.name}
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>

            {/* South African Safety Guidance */}
            <div className="bg-pink-50/70 border border-pink-200/70 rounded-2xl p-3.5 text-slate-700 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <strong className="text-slate-900">Safety First:</strong> For initial meetings, public coffee shops (Seattle, Vida, Woolies Cafe) or video calls are recommended. Have original South African ID documents and reference contacts ready for verification.
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 min-h-[44px] text-slate-600 hover:text-slate-900 active:bg-slate-100 rounded-xl cursor-pointer font-medium text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 min-h-[44px] font-semibold text-white bg-pink-600 hover:bg-pink-700 active:bg-pink-800 rounded-xl cursor-pointer shadow-xs flex items-center justify-center text-center"
              >
                Send Interview Invitation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
