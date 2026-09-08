import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Send, 
  RotateCcw, 
  ArrowRight, 
  Bot, 
  User, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Robot3DCanvas } from './Robot3DCanvas';
import { 
  queryWebsiteKnowledge, 
  ChatbotResponse, 
  buildWhatsAppUrl,
  KnowledgeEngineContext 
} from './knowledgeEngine';
import { PageRoute } from '../../types';

interface MessageItem {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  bulletPoints?: string[];
  actions?: ChatbotResponse['actions'];
  isFallback?: boolean;
  suggestedPrompts?: string[];
}

interface WebsiteChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  knowledgeData: KnowledgeEngineContext;
  onNavigate?: (route: PageRoute, slug?: string) => void;
}

const INITIAL_SUGGESTED_QUESTIONS = [
  'What services do you offer?',
  'Show me your projects',
  'Tell me about your POS system',
  'Do you build mobile apps?',
  'Do you build Shopify stores?',
  'How can I contact you?',
];

export const WebsiteChatbot: React.FC<WebsiteChatbotProps> = ({
  isOpen,
  onClose,
  knowledgeData,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<MessageItem[]>(() => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hi, how can I help you? I'm your interactive website assistant, ready to answer anything about our services, projects, cloud POS systems, mobile apps, or contact details.`,
      timestamp: 'Just now',
      suggestedPrompts: INITIAL_SUGGESTED_QUESTIONS,
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of message stream
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Focus input when opened
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMessageId = `user-${Date.now()}`;
    const userMsg: MessageItem = {
      id: userMessageId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Fast simulated response delay (300-450ms) for natural conversational feel
    setTimeout(() => {
      const response: ChatbotResponse = queryWebsiteKnowledge(text, knowledgeData);

      const botMsg: MessageItem = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        bulletPoints: response.bulletPoints,
        actions: response.actions,
        isFallback: response.isFallback,
        suggestedPrompts: response.suggestedPrompts,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Hi, how can I help you? Ask me anything about our services, projects, or connect with our engineering team on WhatsApp.`,
        timestamp: 'Just now',
        suggestedPrompts: INITIAL_SUGGESTED_QUESTIONS,
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="website-chatbot-container"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed z-50 bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] max-h-[88vh] bg-[#0A0E1A]/95 backdrop-blur-xl border border-[#1E2945] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(62,123,250,0.15)] flex flex-col overflow-hidden font-sans"
        >
          {/* Top Header Bar */}
          <div className="px-4 py-3.5 bg-[#101626] border-b border-[#1E2945] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {/* Mini 3D Robot Mascot Icon */}
              <div className="relative w-10 h-10 rounded-full bg-[#0A0E1A] border border-[#3E7BFA]/40 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(62,123,250,0.3)]">
                <Robot3DCanvas size={40} isHovered={true} isOpen={true} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-[#101626]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-[#F3F5FA] tracking-wide">
                    Aether Assistant
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-[#3E7BFA]/20 text-[#3E7BFA] border border-[#3E7BFA]/30">
                    Website Data
                  </span>
                </div>
                <p className="text-[11px] text-[#9AA3C2] flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  Online • Powered by Central Knowledge Base
                </p>
              </div>
            </div>

            {/* Actions: Reset & Close */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleReset}
                title="Restart Conversation"
                className="p-1.5 rounded-lg text-[#9AA3C2] hover:text-[#F3F5FA] hover:bg-[#1E2945]/70 transition-colors cursor-pointer"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                title="Close Assistant"
                className="p-1.5 rounded-lg text-[#9AA3C2] hover:text-[#F3F5FA] hover:bg-[#1E2945]/70 transition-colors cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-[#1E2945] scrollbar-track-transparent">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-white rounded-tr-none shadow-[0_4px_15px_rgba(62,123,250,0.3)]'
                        : 'bg-[#101626] text-[#E2E8F0] border border-[#1E2945] rounded-tl-none shadow-[0_4px_15px_rgba(0,0,0,0.3)]'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>

                    {/* Bullet Points if provided */}
                    {msg.bulletPoints && msg.bulletPoints.length > 0 && (
                      <ul className="mt-2.5 pt-2 border-t border-[#1E2945]/60 space-y-1.5 text-[11px] text-[#CBD5E1]">
                        {msg.bulletPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#17B4E0] font-bold shrink-0 mt-0.5">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Action buttons (WhatsApp direct or in-app navigation) */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-[#1E2945]/70 flex flex-wrap gap-2">
                        {msg.actions.map((act, actIdx) => {
                          if (act.type === 'whatsapp') {
                            return (
                              <a
                                key={actIdx}
                                href={act.url || buildWhatsAppUrl('Hi! I am reaching out from your website assistant.')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 rounded-full bg-[#161F36] hover:bg-[#25D366]/20 border border-[#25D366]/50 hover:border-[#25D366] text-[#25D366] hover:text-white text-[11px] font-semibold tracking-wide flex items-center gap-1.5 transition-all shadow-[0_2px_10px_rgba(37,211,102,0.15)] cursor-pointer"
                              >
                                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true" className="shrink-0">
                                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                                </svg>
                                <span>{act.label}</span>
                              </a>
                            );
                          }

                          return (
                            <button
                              key={actIdx}
                              type="button"
                              onClick={() => {
                                if (onNavigate && act.route) {
                                  onNavigate(act.route as PageRoute, act.slug);
                                }
                              }}
                              className="px-3 py-1.5 rounded-full bg-[#1E2945] hover:bg-[#3E7BFA] text-[#F3F5FA] text-[11px] font-semibold tracking-wide flex items-center gap-1.5 transition-all cursor-pointer border border-[#3E7BFA]/30"
                            >
                              <span>{act.label}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <span className="text-[9px] text-[#64748B] mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Suggested follow-up prompt chips */}
                  {!isUser && msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.suggestedPrompts.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleSend(prompt)}
                          className="text-[10px] px-2.5 py-1 rounded-full bg-[#101626] hover:bg-[#1E2945] border border-[#1E2945] hover:border-[#3E7BFA]/50 text-[#9AA3C2] hover:text-[#F3F5FA] transition-all cursor-pointer text-left"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#9AA3C2] bg-[#101626] border border-[#1E2945] rounded-2xl rounded-tl-none p-3 w-fit">
                <Bot className="w-3.5 h-3.5 text-[#17B4E0] animate-pulse" />
                <span className="text-[11px]">Searching website knowledge...</span>
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B4E0] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B4E0] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#17B4E0] animate-bounce" />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Sticky Bar (if only initial greeting) */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-[#1E2945]/50 bg-[#101626]/60">
              <p className="text-[10px] text-[#9AA3C2] uppercase tracking-wider font-semibold mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#17B4E0]" /> Suggested Questions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {INITIAL_SUGGESTED_QUESTIONS.slice(0, 4).map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(q)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#161F36] hover:bg-[#1E2945] text-[#9AA3C2] hover:text-white border border-[#1E2945] hover:border-[#3E7BFA]/40 transition-colors cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-[#101626] border-t border-[#1E2945] shrink-0">
            <div className="flex items-center gap-2 bg-[#0A0E1A] border border-[#1E2945] focus-within:border-[#3E7BFA] rounded-full px-3 py-1.5 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about services, POS, mobile apps, contact..."
                className="flex-1 bg-transparent text-xs text-[#F3F5FA] placeholder-[#64748B] outline-none px-1"
                aria-label="Ask chatbot"
              />

              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!inputValue.trim() || isTyping}
                className={`p-2 rounded-full transition-all flex items-center justify-center shrink-0 ${
                  inputValue.trim() && !isTyping
                    ? 'bg-gradient-to-r from-[#3E7BFA] to-[#1230C4] text-white shadow-[0_2px_10px_rgba(62,123,250,0.4)] cursor-pointer hover:scale-105'
                    : 'bg-[#1E2945]/50 text-[#64748B] cursor-not-allowed'
                }`}
                title="Send Message"
                aria-label="Send Message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Footer Note */}
            <div className="mt-2 flex items-center justify-between px-2 text-[10px] text-[#64748B]">
              <span>Uses official studio knowledge</span>
              <a
                href={buildWhatsAppUrl('Hi! Reaching out via the website assistant.')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline flex items-center gap-1"
              >
                WhatsApp: 03101072246
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
