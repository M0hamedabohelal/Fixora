import React, { useState } from 'react';
import { Search, Phone, ChevronLeft, Send, Paperclip, CheckCheck, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProfessionalBottomNav from '../../../components/professional/ProfessionalBottomNav';

export default function ProfessionalChat() {
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const chats = [
    {
      id: 1,
      name: 'Faisal A. (Villa 12, Olaya)',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
      lastMessage: 'Perfect. See you then!',
      time: '10:36 AM',
      unread: 1,
      online: true
    },
    {
      id: 2,
      name: 'Mohammed S. (Apartment 4B)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      lastMessage: 'Can you bring extra pipes?',
      time: 'Yesterday',
      unread: 0,
      online: false
    }
  ];

  const messages = [
    { id: 1, sender: 'me', text: 'Hello! I saw your request for the AC repair.', time: '10:30 AM' },
    { id: 2, sender: 'them', text: 'Hi Ahmed! Yes, it stopped cooling yesterday.', time: '10:31 AM' },
    { id: 3, sender: 'me', text: 'I can come over today at 2 PM if that works for you.', time: '10:35 AM' },
    { id: 4, sender: 'them', text: 'Perfect. See you then!', time: '10:36 AM' },
  ];

  if (activeChat) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex flex-col font-sans">
        <div className="bg-[#1f3b6c] text-white px-4 py-4 flex items-center justify-between shadow-md relative z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveChat(null)} className="p-2 -ml-2 hover:bg-white/10 rounded-xl transition">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="relative">
              <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
              {activeChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1f3b6c]"></div>}
            </div>
            <div>
              <h2 className="font-bold text-[15px]">{activeChat.name}</h2>
              <p className="text-blue-200 text-xs">{activeChat.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-white/10 rounded-xl transition"><Phone className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-white/10 rounded-xl transition"><Settings className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 hide-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                msg.sender === 'me' 
                ? 'bg-[#1f3b6c] text-white rounded-br-sm shadow-sm' 
                : 'bg-white text-slate-800 rounded-bl-sm shadow-sm border border-slate-100'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <div className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === 'me' ? 'text-blue-200' : 'text-slate-400'}`}>
                  <span className="text-[10px]">{msg.time}</span>
                  {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-[#c9a765]" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border-t border-slate-100 p-4 fixed bottom-0 w-full z-20">
          <div className="max-w-md mx-auto flex items-end gap-2">
            <button className="p-3 text-slate-400 hover:bg-slate-50 rounded-full transition shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl flex items-center pr-2 transition-all focus-within:border-[#1f3b6c] focus-within:ring-2 focus-within:ring-[#1f3b6c]/10">
              <textarea 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message customer..."
                className="w-full bg-transparent px-4 py-3 outline-none text-sm resize-none max-h-32 text-slate-800 placeholder-slate-400"
                rows="1"
              ></textarea>
            </div>
            <button className={`p-3 rounded-full shrink-0 transition-colors shadow-sm ${
              newMessage.trim() ? 'bg-[#1f3b6c] text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-sans pb-32">
      <div className="bg-[#1f3b6c] pt-8 pb-6 px-6 relative overflow-hidden rounded-b-3xl shadow-md border-b-4 border-[#c9a765]">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#c9a765]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex items-center justify-between">
          <Link to="/pro-dashboard" className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-white font-bold text-xl tracking-wide">Client Messages</h1>
          <div className="w-10"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 mt-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200" />
            <input 
              type="text" 
              placeholder="Search clients..."
              className="w-full bg-white/10 text-white placeholder-blue-200 border border-white rounded-2xl pl-12 pr-4 py-3.5 outline-none focus:bg-white/20 transition"
            />
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100">
          {chats.map((chat, idx) => (
            <React.Fragment key={chat.id}>
              <div 
                onClick={() => setActiveChat(chat)}
                className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors cursor-pointer rounded-2xl group"
              >
                <div className="relative shrink-0">
                  <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-full object-cover border border-slate-200 group-hover:border-[#c9a765] transition-colors" />
                  {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-slate-800 truncate pr-2 text-[15px]">{chat.name}</h3>
                    <span className={`text-[11px] font-bold shrink-0 ${chat.unread ? 'text-[#c9a765]' : 'text-slate-400'}`}>
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm truncate pr-4 ${chat.unread ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-[#c9a765] rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {idx < chats.length - 1 && <div className="h-px bg-slate-100 mx-4"></div>}
            </React.Fragment>
          ))}
        </div>
      </main>

      <ProfessionalBottomNav />
    </div>
  );
}
