import React, { useState } from 'react';
import { ChatMessage, NannyProfile, SubscriptionState, UserRole } from '../types';
import { 
  X, 
  Send, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Lock,
  MessageSquare
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-stone-200 max-w-4xl w-full h-[85vh] max-h-[750px] shadow-2xl flex flex-col overflow-hidden relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="messages-modal-title"
      >
        {/* Top Header */}
        <div className="px-6 py-3.5 border-b border-stone-200 flex items-center justify-between bg-stone-50 shrink-0">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-700" />
            <h2 id="messages-modal-title" className="text-sm font-bold text-stone-900">
              Direct Childcare Messages & Meeting Channel
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-stone-400 hover:text-stone-700 cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Split: Left conversation list, Right chat view */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: Threads list */}
          <div className="w-72 sm:w-80 border-r border-stone-200 bg-stone-50/50 flex flex-col shrink-0">
            <div className="p-3 border-b border-stone-200/80 text-xs font-semibold text-stone-600 uppercase tracking-wider">
              Conversations
            </div>
            <div className="overflow-y-auto flex-1 divide-y divide-stone-100">
              {nannies.slice(0, 5).map((nan) => {
                const isActive = nan.id === activeNannyId;
                const lastMsg = messages
                  .filter((m) => m.threadId === nan.id)
                  .slice(-1)[0];

                return (
                  <button
                    key={nan.id}
                    onClick={() => setActiveNannyId(nan.id)}
                    className={`w-full p-3 text-left transition-colors cursor-pointer flex items-start gap-3 ${
                      isActive ? 'bg-white shadow-xs' : 'hover:bg-stone-100/70'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-200">
                      {nan.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-stone-900 truncate">
                          {nan.name}
                        </span>
                        <span className="text-[10px] text-stone-400">{nan.city === 'Johannesburg' ? 'JHB' : nan.city === 'Cape Town' ? 'CPT' : 'DBN'}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 truncate mt-0.5">
                        {lastMsg?.content || 'Click to start conversation'}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Active conversation */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden">
            {/* Active thread header */}
            <div className="px-5 py-3 border-b border-stone-200 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-200">
                  {currentNanny.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-stone-900">
                    {currentNanny.name}
                  </div>
                  <div className="text-[11px] text-stone-500">
                    {currentNanny.suburb}, {currentNanny.city} · {currentNanny.careTypes.join(', ')} · SAPS Verified
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenInterviewScheduler(currentNanny)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Schedule Interview</span>
                </button>
              </div>
            </div>

            {/* Locked notice if unsubscribed */}
            {!isParentSubscribed && userRole !== 'nanny' && (
              <div className="bg-amber-50/80 border-b border-amber-200/80 px-4 py-2 flex items-center justify-between text-xs text-amber-900">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>
                    Get the <strong>Parent Pass (R249/mo)</strong> to unlock direct WhatsApp & phone numbers.
                  </span>
                </div>
                <button
                  onClick={onOpenSubscription}
                  className="px-2.5 py-1 text-[11px] font-bold bg-amber-700 text-white rounded hover:bg-amber-800 cursor-pointer"
                >
                  Upgrade
                </button>
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50/30">
              {threadMessages.map((msg) => {
                const isMe = msg.senderRole === (userRole === 'nanny' ? 'nanny' : 'parent');

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="text-[10px] text-stone-400 mb-0.5 px-1">
                      {msg.senderName} · {msg.timestamp}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-amber-700 text-white rounded-br-xs'
                          : 'bg-white border border-stone-200 text-stone-800 rounded-bl-xs shadow-xs'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-stone-200 bg-white shrink-0 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Type a message to ${currentNanny.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
