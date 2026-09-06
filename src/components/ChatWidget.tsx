import { useEffect, useRef, useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const STRINGS = {
  en: {
    title: 'Ask me anything',
    placeholder: 'Type a message...',
    greeting: "Hi! I'm an AI assistant trained on this portfolio. Ask me about the projects, skills, or experience shown here.",
    error: 'Something went wrong. Please try again.',
  },
  ar: {
    title: 'اسألني أي شي',
    placeholder: 'اكتب رسالتك...',
    greeting: 'أهلًا! أنا مساعد ذكاء اصطناعي بعرف تفاصيل هاد البورتفوليو. اسألني عن المشاريع أو المهارات أو الخبرة.',
    error: 'صار خطأ، جرب مرة ثانية.',
  },
} as const;

export default function ChatWidget(): JSX.Element {
  const { language } = useLanguage();
  const t = STRINGS[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isOpen, isLoading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) throw new Error('Request failed');

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: t.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 end-6 z-50">
      {isOpen && (
        <div className="mb-4 flex h-[28rem] w-80 max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 bg-white/95 dark:bg-ink-800/95 backdrop-blur-sm shadow-card">
          <div className="flex items-center justify-between bg-lilac px-4 py-3">
            <span className="font-display text-sm font-semibold dark:text-white text-ink-950/70">{t.title}</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="dark:text-white text-ink-950/70 transition-colors hover:text-ink-950"
            >
              <X size={18} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            <div className="max-w-[85%] rounded-xl bg-lilac/25 px-3 py-2 text-sm text-ink-900 dark:text-mist-200">
              {t.greeting}
            </div>

            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  m.role === 'user'
                    ? 'ms-auto bg-ink-900 text-white dark:bg-lilac '
                    : 'bg-lilac/25 text-ink-900 dark:text-mist-200'
                }`}
              >
                {m.content}
              </div>
            ))}

            {isLoading && (
              <div className="max-w-[60%] rounded-xl bg-lilac/25 px-3 py-2 text-sm text-ink-900 dark:text-mist-200">
                <span className="inline-flex gap-1">
                  <span className="h-1.5 w-1.5 animate-pulseSlow rounded-full bg-ink-900/60 dark:bg-mist-200/60" />
                  <span className="h-1.5 w-1.5 animate-pulseSlow rounded-full bg-ink-900/60 dark:bg-mist-200/60 [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-pulseSlow rounded-full bg-ink-900/60 dark:bg-mist-200/60 [animation-delay:300ms]" />
                </span>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2 border-t border-black/5 dark:border-white/10 px-3 py-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              maxLength={500}
              className="flex-1 rounded-full border border-black/10 bg-transparent px-3 py-2 text-sm text-ink-900 outline-none transition-colors focus:border-lilac dark:border-white/10 dark:text-white"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lilac text-ink-950 dark:text-white transition-opacity disabled:opacity-40"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle chat"
        className="flex h-14 w-14 items-center justify-center rounded-full dark:bg-lilac bg-black text-white  shadow-glow-lilac transition-transform hover:scale-105"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}