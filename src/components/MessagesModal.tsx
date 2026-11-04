import React, { useState } from 'react';
import { ChatMessage, NannyProfile, SubscriptionState, UserRole } from '../types';
import { 
  X, 
  Send, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Lock,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  nannies: NannyProfile[];
  selectedNanny: NannyProfile | null;
  subscription: SubscriptionState;
  userRole: UserRole;
  onOpenSubscription: () => void;
  onOpenInterviewScheduler: (nanny: NannyProfile) => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({
  isOpen,
  onClose,
  nannies,
  selectedNanny: initialNanny,
  subscription,
  userRole,
  onOpenSubscription,
  onOpenInterviewScheduler,
}) => {
  const [activeNannyId, setActiveNannyId] = useState<string>(
    initialNanny?.id || nannies[0]?.id || 'nan-1'
  );
  // On mobile: toggle between 'list' and 'chat'
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('chat');

  const [inputText, setInputText] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      threadId: 'nan-1',
      senderRole: 'nanny',
      senderName: 'Nandi Khumalo',
      recipientName: 'Family',
      content: 'Good day! Thank you for viewing my profile. I am available for full-time live-in or live-out work in Sandton and surrounding suburbs.',
      timestamp: 'Yesterday, 14:15',
    },
    {
      id: 'msg-2',
      threadId: 'nan-1',
      senderRole: 'parent',
      senderName: 'Family',
      recipientName: 'Nandi Khumalo',
      content: 'Hi Nandi! We have an 18-month-old toddler and live in Sandton. Are you comfortable with preparing healthy solid meals and nap schedules?',
      timestamp: 'Yesterday, 15:30',
    },
    {
      id: 'msg-3',
      threadId: 'nan-1',
      senderRole: 'nanny',
      senderName: 'Nandi Khumalo',
      recipientName: 'Family',
      content: 'Yes absolutely! I have 8 years experience with toddler meals and gentle nap routines. My SAPS clearance is up to date and I have my St John Level 1 CPR certificate ready to show you.',
      timestamp: 'Yesterday, 15:42',
    },
    {
      id: 'msg-4',
      threadId: 'nan-2',
      senderRole: 'nanny',
      senderName: 'Thandiwe Mthembu',
      recipientName: 'Family',
      content: 'Hello! I received your inquiry regarding night nurse assistance in Umhlanga. I specialize in newborn sleep conditioning and colic relief.',
      timestamp: '2 days ago',
    },
    {
      id: 'msg-5',
      threadId: 'nan-3',
      senderRole: 'nanny',
      senderName: 'Chloe Du Plessis',
      recipientName: 'Family',
      content: 'Hi! I saw your post for an Au Pair in Cape Town. I have my own reliable vehicle and can assist with school pick-ups and homework.',
      timestamp: '3 days ago',
    },
  ]);

  if (!isOpen) return null;

  const currentNanny = nannies.find((n) => n.id === activeNannyId) || nannies[0];
  const threadMessages = messages.filter((m) => m.threadId === activeNannyId);
  const isParentSubscribed = subscription.parentPlan !== 'none';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      threadId: activeNannyId,
      senderRole: userRole === 'nanny' ? 'nanny' : 'parent',
      senderName: userRole === 'nanny' ? currentNanny.name : 'You (Family)',
      recipientName: userRole === 'nanny' ? 'Family' : currentNanny.name,
      content: inputText.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Simulated reply after 1.5s if sent as parent
    if (userRole !== 'nanny') {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now() + 1}`,
            threadId: activeNannyId,
            senderRole: 'nanny',
            senderName: currentNanny.name,
            recipientName: 'You (Family)',
            content: `Thank you for the message! I would love to schedule a video call or meet in person in ${currentNanny.suburb}. Let me know what date suits you best.`,
            timestamp: 'Just now',
          },
        ]);
      }, 1400);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200/80 max-w-4xl w-full h-[90vh] sm:h-[85vh] max-h-[750px] shadow-2xl flex flex-col overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="messages-modal-title"
      >
        {/* Top Header */}
        <div className="px-4 sm:px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-pink-600" />
            <h2 id="messages-modal-title" className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              Direct Childcare Messages & Meeting Channel
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-slate-700 cursor-pointer p-2 min-h-[44px] min-w-[44px] flex items-center justify-center -mr-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Split: Responsive mobile list view vs chat view */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Threads list (Full width on mobile when mobileView === 'list') */}
          <div className={`w-full sm:w-72 md:w-80 border-r border-slate-200 bg-slate-50/50 flex flex-col shrink-0 ${
            mobileView === 'chat' ? 'hidden sm:flex' : 'flex'
          }`}>
            <div className="p-3 border-b border-slate-200/80 text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center justify-between">
              <span>Conversations</span>
              <span className="text-[11px] text-slate-400 sm:hidden">Select to open</span>
            </div>
            <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
              {nannies.slice(0, 5).map((nan) => {
                const isActive = nan.id === activeNannyId;
                const lastMsg = messages
                  .filter((m) => m.threadId === nan.id)
                  .slice(-1)[0];

                return (
                  <button
                    key={nan.id}
                    onClick={() => {
                      setActiveNannyId(nan.id);
                      setMobileView('chat');
                    }}
                    className={`w-full p-3.5 text-left transition-colors cursor-pointer flex items-start gap-3 min-h-[58px] ${
                      isActive ? 'bg-pink-50/50 border-l-4 border-pink-600 shadow-xs' : 'hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-pink-100/70 text-pink-800 flex items-center justify-center font-bold text-xs shrink-0 border border-pink-200">
                      {nan.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {nan.name}
                        </span>
                        <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                          {nan.city === 'Johannesburg' ? 'JHB' : nan.city === 'Cape Town' ? 'CPT' : 'DBN'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {lastMsg?.content || 'Click to start conversation'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Active conversation (Full width on mobile when mobileView === 'chat') */}
          <div className={`flex-1 flex flex-col bg-white overflow-hidden ${
            mobileView === 'list' ? 'hidden sm:flex' : 'flex'
          }`}>
            {/* Active thread header */}
            <div className="px-3 sm:px-5 py-2.5 sm:py-3 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {/* Mobile Back Button to conversation list */}
                <button
                  type="button"
                  onClick={() => setMobileView('list')}
                  className="sm:hidden p-2 -ml-1 text-slate-600 hover:text-slate-900 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-pink-100/70 text-pink-800 flex items-center justify-center font-bold text-xs shrink-0 border border-pink-200">
                  {currentNanny.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {currentNanny.name}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                    {currentNanny.suburb}, {currentNanny.city} · SAPS Verified
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenInterviewScheduler(currentNanny)}
                  className="px-2.5 sm:px-3 py-1.5 min-h-[38px] text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5 text-pink-600" />
                  <span className="hidden md:inline">Schedule Interview</span>
                  <span className="md:hidden">Meet</span>
                </button>
              </div>
            </div>

            {/* Locked notice if unsubscribed */}
            {!isParentSubscribed && userRole !== 'nanny' ? (
              <div className="bg-pink-50/90 border-b border-pink-200 px-3 sm:px-4 py-2 flex items-center justify-between text-xs text-pink-950">
                <div className="flex items-center gap-2 truncate pr-2">
                  <Lock className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                  <span className="truncate text-[11px] sm:text-xs">
                    Get <strong>Starter Pass (R549 once-off)</strong> or <strong>3-Month Unlimited (R1,499)</strong> for direct WhatsApp & contacts.
                  </span>
                </div>
                <button
                  onClick={onOpenSubscription}
                  className="px-3 py-1.5 text-[11px] font-bold bg-pink-600 text-white rounded-lg hover:bg-pink-700 cursor-pointer shrink-0 min-h-[34px]"
                >
                  Get Pass
                </button>
              </div>
            ) : subscription.parentPlan === 'once_off_5cv' && (
              <div className="bg-slate-900 text-slate-300 border-b border-slate-800 px-3 sm:px-4 py-1.5 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Starter Pass Active: Direct messaging enabled for up to 5 nannies</span>
                </div>
                <button
                  onClick={onOpenSubscription}
                  className="text-pink-400 hover:text-pink-300 font-bold underline cursor-pointer"
                >
                  Upgrade to Unlimited (R1,499)
                </button>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-slate-50/40">
              {threadMessages.map((msg) => {
                const isMe = msg.senderRole === (userRole === 'nanny' ? 'nanny' : 'parent');

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-slate-400 mb-0.5 px-1">
                      {msg.senderName} · {msg.timestamp}
                    </div>
                    <div
                      className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-slate-950 text-white rounded-br-xs'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar with min 44px touch targets */}
            <form onSubmit={handleSendMessage} className="p-2 sm:p-3 border-t border-slate-200 bg-white shrink-0 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Message ${currentNanny.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 min-h-[44px] text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 min-h-[44px] bg-pink-600 hover:bg-pink-700 active:bg-pink-800 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
