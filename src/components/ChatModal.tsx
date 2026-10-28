import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, ShieldCheck, MapPin, CheckCircle2, Bike, AlertCircle } from 'lucide-react';

export const ChatModal: React.FC = () => {
  const { 
    activeConversation, 
    setActiveConversation, 
    sendMessageToActiveConv,
    confirmHandover,
    currentUser 
  } = useApp();

  const [inputText, setInputText] = useState('');

  if (!activeConversation) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessageToActiveConv(inputText);
    setInputText('');
  };

  const sendQuickReply = (text: string) => {
    sendMessageToActiveConv(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="relative bg-white rounded-2xl max-w-xl w-full h-[600px] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        
        {/* Chat Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <img
              src={activeConversation.otherUser.avatar}
              alt={activeConversation.otherUser.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-stone-700"
            />
            <div>
              <div className="text-sm font-semibold flex items-center gap-1.5">
                <span>{activeConversation.otherUser.name}</span>
                <span className="text-xs text-stone-400 capitalize">({activeConversation.otherUser.role})</span>
              </div>
              <div className="text-xs text-emerald-400 truncate max-w-[280px]">
                Item: {activeConversation.itemTitle}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveConversation(null)}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collection Arrangement Status Bar */}
        <div className="bg-emerald-50/90 border-b border-emerald-100 p-3 text-xs text-emerald-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
            <div>
              <span className="font-semibold">Arrangement:</span> {activeConversation.pickupDetails.collectionMethod}
              <span className="text-stone-500 ml-1">· At {activeConversation.pickupDetails.landmark}</span>
            </div>
          </div>

          {!activeConversation.pickupDetails.confirmed ? (
            <button
              onClick={() => confirmHandover(activeConversation.itemId)}
              className="px-2.5 py-1 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded transition-colors whitespace-nowrap shrink-0"
            >
              Confirm Handover
            </button>
          ) : (
            <span className="text-emerald-800 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Collected
            </span>
          )}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-stone-50">
          {activeConversation.messages.map(msg => {
            if (msg.isSystemNote) {
              return (
                <div key={msg.id} className="p-2.5 bg-stone-100 rounded-lg text-xs text-stone-600 border border-stone-200/60 text-center">
                  {msg.text}
                </div>
              );
            }

            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[10px] text-stone-400 mb-0.5 px-1">
                  {msg.senderName} · {msg.timestamp}
                </div>
                <div
                  className={`max-w-[80%] rounded-xl px-3.5 py-2 text-xs leading-relaxed ${
                    isMe
                      ? 'bg-emerald-800 text-white rounded-br-xs'
                      : 'bg-white text-stone-800 border border-stone-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Replies */}
        <div className="px-3 py-1.5 bg-white border-t border-stone-100 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0">
          <span className="text-stone-400 whitespace-nowrap shrink-0">Quick reply:</span>
          <button
            onClick={() => sendQuickReply("I am ready for daylight pickup tomorrow at 2 PM.")}
            className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded whitespace-nowrap"
          >
            Available 2 PM tomorrow
          </button>
          <button
            onClick={() => sendQuickReply("Dispatch bike booked! Rider phone is +234 803 000 1234.")}
            className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded whitespace-nowrap"
          >
            Rider on the way
          </button>
          <button
            onClick={() => sendQuickReply("I have received the item in great condition. Thank you so much!")}
            className="px-2 py-0.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded whitespace-nowrap"
          >
            Received safely!
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Agree on collection landmark or time..."
            className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:bg-white focus:outline-emerald-800"
          />
          <button
            type="submit"
            className="p-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
