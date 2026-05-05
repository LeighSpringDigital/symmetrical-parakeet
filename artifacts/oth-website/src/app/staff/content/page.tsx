'use client';

/**
 * Staff Content Creator
 *
 * Generates brand-voice captions, scripts, and review responses.
 * API calls go to /api/generate (server-side proxy) — the Anthropic key
 * is never sent to or visible in the browser.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type ContentType =
  | 'instagram_caption'
  | 'facebook_post'
  | 'google_review_response'
  | 'reel_script'
  | 'event_post'
  | 'story_caption';

interface FormState {
  contentType: ContentType;
  topic: string;
  additionalContext: string;
  campaignTag: string;
}

const CONTENT_TYPES: { key: ContentType; label: string; description: string }[] = [
  { key: 'instagram_caption',      label: 'Instagram Caption',       description: 'Feed post caption with hashtags' },
  { key: 'facebook_post',          label: 'Facebook Post',           description: 'Longer-form community post' },
  { key: 'google_review_response', label: 'Google Review Response',  description: 'Warm, personal reply to a review' },
  { key: 'reel_script',            label: 'Reel Script',             description: 'Voiceover script for a short video' },
  { key: 'event_post',             label: 'Event Post',              description: 'What\'s On announcement' },
  { key: 'story_caption',          label: 'Story Caption',           description: 'Short, punchy Instagram Story text' },
];

const CAMPAIGN_TAGS = [
  { value: '', label: 'No campaign tag' },
  { value: 'operational_audit', label: 'Operational Audit' },
  { value: 'sunday_roast', label: 'Sunday Roast' },
  { value: 'tiger_table_club', label: 'Tiger Table Club' },
  { value: 'event_preview', label: 'Event Preview' },
  { value: 'community', label: 'Community' },
  { value: 'seasonal', label: 'Seasonal' },
];

export default function ContentPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    contentType: 'instagram_caption',
    topic: '',
    additionalContext: '',
    campaignTag: '',
  });

  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem('staff_auth');
    if (!auth) router.replace('/staff');
  }, [router]);

  const buildPrompt = () => {
    const typeLabel = CONTENT_TYPES.find(t => t.key === form.contentType)?.label ?? form.contentType;
    const campaignNote = form.campaignTag
      ? `\n\nCampaign series: ${form.campaignTag}. Ensure the content fits this series' tone.`
      : '';
    const contextNote = form.additionalContext.trim()
      ? `\n\nAdditional context from staff: ${form.additionalContext.trim()}`
      : '';

    return `Generate a ${typeLabel} for The Old Tiger's Head about the following:\n\n${form.topic.trim()}${campaignNote}${contextNote}\n\nReturn only the finished copy — no preamble, no explanation, no quotation marks around the output.`;
  };

  const handleGenerate = async () => {
    if (!form.topic.trim()) return;
    setGenerating(true);
    setError('');
    setOutput('');

    try {
      // Calls /api/generate — the key stays server-side
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: buildPrompt() }],
          max_tokens: 600,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Generation failed. Please try again.');
        return;
      }

      const text = data.content?.[0]?.text ?? '';
      setOutput(text);

    } catch {
      setError('Connection error. Check your internet and try again.');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const s = {
    page: {
      minHeight: '100vh',
      background: '#0d1b2a',
      fontFamily: '"Century Gothic", "Avant Garde", "Futura", "Trebuchet MS", sans-serif',
      color: '#f5f0e8',
    } as React.CSSProperties,
    header: {
      background: '#002942',
      borderBottom: '2px solid #C9A227',
      padding: '16px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    } as React.CSSProperties,
    content: {
      padding: '32px 28px',
      maxWidth: 800,
      margin: '0 auto',
    } as React.CSSProperties,
    card: {
      background: '#001d30',
      border: '1px solid #1e3a52',
      borderRadius: 10,
      padding: 28,
      marginBottom: 20,
    } as React.CSSProperties,
    label: {
      display: 'block',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase' as const,
      color: '#7fa8c4',
      marginBottom: 8,
    },
    input: {
      width: '100%',
      background: '#002942',
      border: '1px solid #1e3a52',
      borderRadius: 6,
      color: '#f5f0e8',
      fontFamily: 'inherit',
      fontSize: 14,
      padding: '11px 14px',
      boxSizing: 'border-box' as const,
      outline: 'none',
      resize: 'vertical' as const,
    } as React.CSSProperties,
    select: {
      width: '100%',
      background: '#002942',
      border: '1px solid #1e3a52',
      borderRadius: 6,
      color: '#f5f0e8',
      fontFamily: 'inherit',
      fontSize: 14,
      padding: '11px 14px',
      outline: 'none',
    } as React.CSSProperties,
    btn: {
      background: '#C9A227',
      border: 'none',
      borderRadius: 7,
      color: '#002942',
      fontFamily: 'inherit',
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '0.05em',
      padding: '12px 24px',
      cursor: 'pointer',
      textTransform: 'uppercase' as const,
    } as React.CSSProperties,
  };

  return (
    <div style={s.page}>
      <header style={s.header}>
        <Link href="/staff/dashboard" style={{ color: '#7fa8c4', fontSize: 13, textDecoration: 'none' }}>
          ← Dashboard
        </Link>
        <span style={{ color: '#1e3a52' }}>|</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#f5f0e8' }}>AI Content Creator</span>
      </header>

      <div style={s.content}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Content Creator</h1>
        <p style={{ fontSize: 13, color: '#7fa8c4', marginBottom: 28, lineHeight: 1.6 }}>
          Brand voice is locked. Every output follows the Old Tiger's Head tone rules.
          Submit ideas below — Rob approves before anything goes live.
        </p>

        <div style={s.card}>
          {/* Content type */}
          <div style={{ marginBottom: 20 }}>
            <label style={s.label}>Content type</label>
            <select
              style={s.select}
              value={form.contentType}
              onChange={e => setForm(f => ({ ...f, contentType: e.target.value as ContentType }))}
            >
              {CONTENT_TYPES.map(t => (
                <option key={t.key} value={t.key}>{t.label} — {t.description}</option>
              ))}
            </select>
          </div>

          {/* Campaign tag */}
          <div style={{ marginBottom: 20 }}>
            <label style={s.label}>Campaign series (optional)</label>
            <select
              style={s.select}
              value={form.campaignTag}
              onChange={e => setForm(f => ({ ...f, campaignTag: e.target.value }))}
            >
              {CAMPAIGN_TAGS.map(t => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div style={{ marginBottom: 20 }}>
            <label style={s.label}>
              Topic or subject *
            </label>
            <textarea
              style={{ ...s.input, minHeight: 90 }}
              placeholder="e.g. Jazz night this Friday at 8pm — live quartet, no booking needed, first come first served"
              value={form.topic}
              onChange={e => setForm(f => ({ ...f, topic: e.target.value }))}
            />
          </div>

          {/* Additional context */}
          <div style={{ marginBottom: 24 }}>
            <label style={s.label}>Additional context (optional)</label>
            <textarea
              style={{ ...s.input, minHeight: 60 }}
              placeholder="e.g. Include the booking link. Mention Paolo is cooking."
              value={form.additionalContext}
              onChange={e => setForm(f => ({ ...f, additionalContext: e.target.value }))}
            />
          </div>

          <button
            style={{ ...s.btn, opacity: generating || !form.topic.trim() ? 0.6 : 1 }}
            onClick={handleGenerate}
            disabled={generating || !form.topic.trim()}
          >
            {generating ? 'Generating...' : 'Generate content'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#1a0808', border: '1px solid #ef4444',
            borderRadius: 8, padding: '14px 18px', marginBottom: 20,
            fontSize: 14, color: '#ef4444',
          }}>
            {error}
          </div>
        )}

        {/* Output */}
        {output && (
          <div style={s.card}>
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', marginBottom: 16,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C9A227' }}>
                Generated output
              </div>
              <button
                onClick={handleCopy}
                style={{
                  background: copied ? '#22c55e22' : 'transparent',
                  border: `1px solid ${copied ? '#22c55e' : '#1e3a52'}`,
                  borderRadius: 6,
                  color: copied ? '#22c55e' : '#7fa8c4',
                  fontFamily: 'inherit',
                  fontSize: 12, fontWeight: 600,
                  padding: '6px 14px', cursor: 'pointer',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}
              >
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div style={{
              fontSize: 14, color: '#f5f0e8', lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
              background: '#002942', borderRadius: 6, padding: '16px 18px',
            }}>
              {output}
            </div>
            <div style={{ fontSize: 12, color: '#7fa8c4', marginTop: 14, lineHeight: 1.6 }}>
              Review this carefully before use. Send to Rob for approval via the staff portal workflow before scheduling.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
