import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Info } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/Card';
import type { ChatMessage } from '@/types';

const suggestedPrompts = [
  'Which schemes may I qualify for?',
  'What documents do I need?',
  'Why was my application rejected?',
  'Help me compare these schemes.',
  'How can I improve my eligibility?',
];

const demoResponses: Record<string, string> = {
  default: 'I understand you have a question about welfare schemes. This is a demo response — once connected to the AI engine, I will be able to provide personalized answers based on your profile and the scheme database.',
  schemes: 'Based on your profile (Maharashtra, age 21, Student, income ₹1-2.5 lakh), I found 4 potentially matching schemes: Post-Matric Scholarship (92% match), Ayushman Bharat (88% match), PM-KISAN (85% match), and MGNREGA (81% match). Would you like details on any of these?',
  documents: 'For most scholarship applications, you will need: Aadhaar Card, Income Certificate, Caste Certificate (if applicable), Mark sheets, and Bank passbook copy. You can upload these in the Document Vault. OCR-based auto-verification will be available in a future update.',
  rejected: 'Applications are commonly rejected due to: (1) Incomplete documentation, (2) Income exceeding the eligibility threshold, (3) Missing deadline, or (4) Duplicate applications. I recommend checking your application status on the My Applications page and ensuring all documents are verified.',
  compare: 'You can compare up to 3 schemes side by side on the Compare Schemes page. The comparison will show differences in match score, benefits, eligibility, documents required, processing time, and deadlines. An AI trade-off summary will also be provided.',
  improve: 'To improve your eligibility: (1) Upload and verify all required documents, (2) Ensure your income certificate is current, (3) Complete your profile with education details, (4) Check for schemes in additional categories. Visit the What-If Simulator to see how changes affect your matches.',
};

function getDemoResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('qualify') || lower.includes('eligible') || lower.includes('scheme')) return demoResponses.schemes;
  if (lower.includes('document')) return demoResponses.documents;
  if (lower.includes('reject')) return demoResponses.rejected;
  if (lower.includes('compare')) return demoResponses.compare;
  if (lower.includes('improve')) return demoResponses.improve;
  return demoResponses.default;
}

export function AIAssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: 'Hello! I am your WelfareAI Assistant. I can help you discover schemes, understand eligibility, manage documents, and track applications. How can I help you today?', timestamp: new Date().toISOString(), isDemo: true },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: getDemoResponse(text), timestamp: new Date().toISOString(), isDemo: true };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <DashboardLayout title="WelfareAI Assistant" subtitle="Ask me about schemes, eligibility, documents or applications.">
      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card className="flex h-[600px] flex-col">
            <div className="flex items-center gap-3 border-b border-gray-100 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-navy-900">WelfareAI Assistant</h2>
                <p className="text-xs text-gray-500">Demo mode — AI responses are simulated</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-navy-700'}`}>
                    {msg.role === 'assistant' && msg.isDemo && (
                      <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        <Info className="h-3 w-3" /> Demo Response
                      </p>
                    )}
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 p-4">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question..."
                  className="input-base flex-1"
                  aria-label="Type your question"
                />
                <button type="submit" className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white transition-colors hover:bg-primary-700" aria-label="Send message">
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <h3 className="mb-3 text-sm font-bold text-navy-900">Suggested Prompts</h3>
          <div className="space-y-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendMessage(prompt)}
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-left text-sm text-navy-600 transition-all hover:border-primary-300 hover:bg-primary-50"
              >
                {prompt}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl bg-navy-50 p-4">
            <p className="text-xs text-navy-600">
              <span className="font-semibold">Note:</span> This is a demo assistant. In the next stage, it will be connected to an AI engine to provide real-time, personalized responses.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
