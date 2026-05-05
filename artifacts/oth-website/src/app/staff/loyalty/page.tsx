'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const LoyaltyLookup = dynamic(
  () => import('@/components/LoyaltyLookup'),
  { ssr: false }
);

export default function LoyaltyPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem('staff_auth');
    if (!auth) router.replace('/staff');
  }, [router]);

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
      maxWidth: 1000,
      margin: '0 auto',
    } as React.CSSProperties,
  };

  return (
    <div style={s.page}>
      <header style={s.header}>
        <Link href="/staff/dashboard" style={{ color: '#7fa8c4', fontSize: 13, textDecoration: 'none' }}>
          ← Dashboard
        </Link>
        <span style={{ color: '#1e3a52' }}>|</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#f5f0e8' }}>Tiger Table Club</span>
      </header>

      <div style={s.content}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: '#f5f0e8' }}>
          Tiger Table Club — Staff Panel
        </h1>
        <p style={{ fontSize: 13, color: '#7fa8c4', marginBottom: 32, lineHeight: 1.6 }}>
          Look up members by phone number or membership number.
          Record qualifying dinner visits (tables of 4 or more).
          Every fifth qualifying visit triggers a reward — offer the host her choice
          and comp it in EBM as usual.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>
          {/* Main lookup widget */}
          <LoyaltyLookup />

          {/* Quick reference */}
          <div style={{
            background: '#001d30',
            border: '1px solid #1e3a52',
            borderRadius: 10,
            padding: 24,
          }}>
            <div style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: '#C9A227', marginBottom: 16,
            }}>
              Quick Reference
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f5f0e8', marginBottom: 8 }}>
                Reward options (host chooses)
              </div>
              {[
                "Host's main course — on the house",
                'Bottle of house wine for the table',
                'Sharing dessert for the table',
              ].map((opt, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, color: '#7fa8c4', marginBottom: 6,
                }}>
                  <span style={{ color: '#C9A227', fontWeight: 700 }}>{i + 1}.</span>
                  {opt}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#f5f0e8', marginBottom: 8 }}>
                What qualifies
              </div>
              <div style={{ fontSize: 13, color: '#7fa8c4', lineHeight: 1.7 }}>
                Any dinner table of 4 or more people.<br />
                Every 5th qualifying visit = reward.<br />
                No pre-booking required.<br />
                One reward per table per visit.
              </div>
            </div>

            <div style={{
              background: '#002942', borderRadius: 6, padding: '12px 14px',
              fontSize: 12, color: '#7fa8c4', lineHeight: 1.6,
            }}>
              <strong style={{ color: '#C9A227' }}>Birthday month?</strong> A gold badge
              appears on the member card. Offer a glass of Prosecco or a dessert — comp it
              in EBM under "birthday treat".
            </div>

            <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid #1e3a52' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#7fa8c4', marginBottom: 10, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Member not found?
              </div>
              <div style={{ fontSize: 13, color: '#7fa8c4', lineHeight: 1.6, marginBottom: 12 }}>
                Send them to <strong style={{ color: '#f5f0e8' }}>theoldtigershead.com/tiger-table-club</strong> to join.
                Takes thirty seconds on their phone.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
