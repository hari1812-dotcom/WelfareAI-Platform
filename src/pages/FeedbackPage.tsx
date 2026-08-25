import { useState } from 'react';
import { Star, MessageSquare, ThumbsUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [category, setCategory] = useState('general');
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    { id: 'general', label: 'General Feedback' },
    { id: 'scheme', label: 'Scheme Information' },
    { id: 'application', label: 'Application Process' },
    { id: 'assistant', label: 'AI Assistant' },
    { id: 'bug', label: 'Report a Bug' },
    { id: 'suggestion', label: 'Suggestion' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout title="Feedback" subtitle="Help us improve WelfareAI">
      {submitted ? (
        <Card className="p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success-600">
            <ThumbsUp className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-navy-900">Thank you for your feedback!</h2>
          <p className="mt-2 text-sm text-gray-500">Your input helps us improve the platform for everyone.</p>
          <Button onClick={() => { setSubmitted(false); setRating(0); }} variant="outline" size="md" className="mt-4">Submit another</Button>
        </Card>
      ) : (
        <div className="mx-auto max-w-2xl">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="label-base">How would you rate your experience?</label>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const val = i + 1;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setRating(val)}
                        onMouseEnter={() => setHover(val)}
                        onMouseLeave={() => setHover(0)}
                        aria-label={`Rate ${val} out of 5`}
                        className="p-1"
                      >
                        <Star className={`h-7 w-7 transition-colors ${(hover || rating) >= val ? 'fill-accent-400 text-accent-400' : 'text-gray-300'}`} />
                      </button>
                    );
                  })}
                  {rating > 0 && <span className="ml-2 text-sm font-semibold text-navy-700">{rating}/5</span>}
                </div>
              </div>

              <div>
                <label className="label-base">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${category === cat.id ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-navy-600 hover:border-primary-300'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="label-base">
                  <MessageSquare className="mr-1 inline h-4 w-4" /> Your Feedback
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us what you think..."
                  className="input-base resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="info">Demo — feedback is not stored yet</Badge>
                <Button type="submit" size="md">Submit Feedback</Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}
