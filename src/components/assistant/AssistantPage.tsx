'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Send, Mic, MicOff, Plus, ChevronLeft, Volume2, VolumeX,
  Trash2, Clock, Laptop, Wrench, CreditCard, MapPin, Star, Package,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const STORE_CONTEXT = `You are an AI assistant for Gokul Computers, a laptop store in Trichy, Tamil Nadu.

About Gokul Computers:
- Address: No B-7, Vignesh Plaza, Near Domino's Pizza, 1st Cross, Thillai Nagar, Trichy - 620018
- Phone: 07947130911
- Working Hours: 9:30 AM - 8:00 PM (All days open)
- Experience: 31+ years in business since 1993
- Lenovo Authorized Dealer for Trichy region
- Serves 5000+ customers, sold 10000+ products

Brands available:
- Lenovo (Authorized Dealer - priority brand)
- HP, Dell, Acer, ASUS, Apple, MSI

Services:
1. Laptop Sales - new and refurbished from all brands
2. Laptop Repair - all brands, all issues
3. Motherboard Repair - chip-level repair
4. RAM Upgrade - all DDR types
5. SSD Upgrade - M.2 NVMe and SATA
6. Printer Repair - all brands
7. Data Recovery
8. AMC (Annual Maintenance Contract) services
9. Desktop Assembly

Payment & EMI:
- Cash, UPI, Card payments accepted
- EMI available on purchases above ₹10,000
- 0% EMI for 3 and 6 months on select products
- 12-24 month EMI also available

Warranty:
- All products come with manufacturer warranty
- Lenovo products: 1-3 years onsite warranty
- Repair work: 30-90 day warranty

Respond in English by default, but also support Tamil and Tanglish if the user writes in those languages.
Be helpful, friendly, and professional. Always mention the store address, phone number, or WhatsApp if the user wants to visit or contact.`;

const quickReplies = [
  { icon: Laptop, label: 'Laptop Purchase', query: 'I want to buy a laptop. Can you help me?' },
  { icon: Wrench, label: 'Laptop Service', query: 'I need my laptop repaired.' },
  { icon: Package, label: 'Accessories', query: 'What accessories do you have?' },
  { icon: CreditCard, label: 'EMI Options', query: 'Tell me about EMI options.' },
  { icon: Star, label: 'Best Deals', query: 'What are the best laptop deals right now?' },
  { icon: MapPin, label: 'Store Location', query: 'Where is your store located?' },
];

const suggestedQuestions = [
  'Best laptop under ₹50,000?',
  'Do you have gaming laptops?',
  'How long does screen repair take?',
  'Is Apple MacBook available?',
  'Do you offer home service?',
  'What is your Lenovo warranty?',
];

export default function AssistantPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const currentChat = chats.find((c) => c.id === currentChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setSidebarOpen(false);
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || loading) return;

    let chatId = currentChatId;
    if (!chatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: messageText.slice(0, 30),
        messages: [],
        createdAt: new Date(),
      };
      setChats((prev) => [newChat, ...prev]);
      chatId = newChat.id;
      setCurrentChatId(chatId);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              title: c.messages.length === 0 ? messageText.slice(0, 30) : c.title,
              messages: [...c.messages, userMessage],
            }
          : c
      )
    );
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: currentChat?.messages.slice(-10) || [],
          context: STORE_CONTEXT,
        }),
      });

      if (!res.ok) throw new Error('API error');
      const data = await res.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I'm sorry, I couldn't process that request. Please try again or call us at 07947130911.",
        timestamp: new Date(),
      };

      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? { ...c, messages: [...c.messages, assistantMessage] }
            : c
        )
      );
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please call us at **07947130911** or visit our store at **Thillai Nagar, Trichy** for immediate assistance!",
        timestamp: new Date(),
      };
      setChats((prev) =>
        prev.map((c) =>
          c.id === chatId
            ? { ...c, messages: [...c.messages, errorMessage] }
            : c
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const deleteChat = (id: string) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (currentChatId === id) setCurrentChatId(null);
  };

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(date);

  const renderMessage = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="h-screen flex bg-[#F8FAFC] dark:bg-[#020617] overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed md:relative inset-y-0 left-0 z-50 w-72 bg-gray-900 text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0A84FF] to-blue-700 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-white">AI Assistant</div>
              <div className="text-xs text-gray-400">Gokul Computers</div>
            </div>
          </div>
          <button
            onClick={createNewChat}
            className="w-full flex items-center gap-2 py-2.5 px-4 bg-[#0A84FF] hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-2 mb-2">
            Recent Chats
          </div>
          {chats.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              <Bot className="w-8 h-8 mx-auto mb-2 opacity-30" />
              No chats yet
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => { setCurrentChatId(chat.id); setSidebarOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer group transition-colors ${currentChatId === chat.id ? 'bg-gray-700' : 'hover:bg-gray-800'}`}
              >
                <Clock className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                <span className="text-sm text-gray-300 truncate flex-1">{chat.title}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); }}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Back to Website
          </Link>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="bg-white dark:bg-[#111827] border-b border-gray-200 dark:border-[#1E293B] px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <Bot className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0A84FF] to-blue-700 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-[#F8FAFC] text-sm">Gokul AI Assistant</div>
              <div className="text-xs text-green-500">Online • Ready to help</div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!currentChat || currentChat.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-lg w-full"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#0A84FF] to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <Bot className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-[#F8FAFC] mb-2">
                  Hello! I&apos;m your Gokul AI Assistant
                </h2>
                <p className="text-gray-500 mb-8">
                  I can help you find the perfect laptop, answer questions about our services, pricing, EMI options, and more!
                </p>

                {/* Quick Replies */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {quickReplies.map((qr) => (
                    <button
                      key={qr.label}
                      onClick={() => sendMessage(qr.query)}
                      className="flex items-center gap-2 p-3 bg-white dark:bg-[#1E293B] rounded-xl border border-gray-200 dark:border-[#1E293B] hover:border-[#0A84FF] hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all text-left group"
                    >
                      <qr.icon className="w-4 h-4 text-[#0A84FF] flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700 dark:text-[#CBD5E1]">{qr.label}</span>
                    </button>
                  ))}
                </div>

                {/* Suggested Questions */}
                <div className="text-left">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
                    Suggested Questions
                  </div>
                  <div className="space-y-2">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="block w-full text-left text-sm text-[#0A84FF] hover:text-blue-700 py-1.5 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                      >
                        💬 {q}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ) : (
            <>
              {currentChat.messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-[#0A84FF] to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#0A84FF] text-white rounded-br-md'
                          : 'bg-white dark:bg-[#1E293B] text-gray-900 dark:text-[#F8FAFC] border border-gray-200 dark:border-[#1E293B] rounded-bl-md'
                      }`}
                      dangerouslySetInnerHTML={{ __html: renderMessage(msg.content) }}
                    />
                    <div className={`text-xs text-gray-400 mt-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#0A84FF] to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mr-2">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-[#1E293B] rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 bg-[#0A84FF] rounded-full"
                          animate={{ y: [0, -6, 0] }}
                          transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <div className="bg-white dark:bg-[#111827] border-t border-gray-200 dark:border-[#1E293B] p-4">
          {/* Quick suggestions when chat has messages */}
          {currentChat && currentChat.messages.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto scrollbar-hidden">
              {suggestedQuestions.slice(0, 4).map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="flex-shrink-0 text-xs text-[#0A84FF] bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about laptops, services, pricing..."
                rows={1}
                className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 dark:border-[#1E293B] bg-gray-50 dark:bg-[#1E293B] text-gray-900 dark:text-[#F8FAFC] text-sm focus:outline-none focus:ring-2 focus:ring-[#0A84FF]/30 focus:border-[#0A84FF] resize-none transition-all max-h-32"
                style={{ minHeight: '48px' }}
              />
            </div>
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-12 h-12 bg-[#0A84FF] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl flex items-center justify-center transition-all hover:scale-105 active:scale-95 flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            AI responses are informational. For purchase, call{' '}
            <a href="tel:07947130911" className="text-[#0A84FF] font-medium">07947130911</a>
          </p>
        </div>
      </div>
    </div>
  );
}
