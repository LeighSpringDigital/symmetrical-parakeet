'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const sections = [
  {
    title: 'Content Creator',
    description: 'Generate brand-voice captions, scripts, and review responses.',
    href: '/staff/content',
    icon: '✍️',
    color: '#C9A227',
  },
  {
    title: 'Social Media Hub',
    description: 'Urgency calendar, asset bank, post log, analytics, and Buffer scheduling.',
    href: '/staff/social-hub',
    icon: '📡',
    color: '#C9A227',
    badge: 'New',
  },
  {
    title: 'Tiger Table Club',
    description: 'Look up members, record qualifying visits, and issue rewards at the bar.',
    href: '/staff/loyalty',
    icon: '🐯',
    color: '#C9A227',
    badge: 'New',
  },
  {
    title: 'Events',
    description: 'Manage the events calendar and what\'s on listings.',
    href: '/staff/events',
    icon: '🎭',
    color: '#002942',
  },
  {
    title: 'Menu',
    description: 'Update food and drink menus.',
    href: '/staff/menu',
    icon: '🍽️',
    color: '#002942',
  },
  {
    title: 'Noticeboard',
    description: 'Post notices and updates for the team.',
    href: '/staff/noticeboard',
    icon: '📋',
    color: '#002942',
  },
  {
    title: 'Rota',
    description: 'View and manage staff shifts.',
    href: '/staff/rota',
    icon: '📅',
    color: '#002942',
  },
  {
    title: 'Allergens',
    description: 'Manage allergen information for menu items.',
    href: '/staff/allergens',
    icon: '⚠️',
    color: '#002942',
  },
  {
    title: 'Settings',
    description: 'Portal settings and configuration.',
    href: '/staff/settings',
    icon: '⚙️',
    color: '#002942',
  },
];

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem('staff_auth');
    if (!auth) router.replace('/staff');
  }, [router]);

  return (
    <main style={{
      minHeight: '100vh',
      background: '#0d1b2a',
      fontFamily: '"Century Gothic", "Avant Garde", "Futura", "Trebuchet MS", sans-serif',
      color: '#f5f0e8',
    }}>
      {/* Header */}
      <div style={{
        background: '#002942',
        borderBottom: '2px solid #C9A227',
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 42, height: 42,
            background: '#C9A227',
            borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 700, color: '#002942',
          }}>T</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              The Old Tiger's Head
            </div>
            <div style={{ fontSize: 12, color: '#7fa8c4' }}>Staff Portal</div>
          </div>
        </div>
        <button
          onClick={() => { sessionStorage.clear(); router.replace('/staff'); }}
          style={{
            background: 'none', border: '1px solid #1e3a52',
            borderRadius: 6, color: '#7fa8c4',
            fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
            padding: '8px 16px', cursor: 'pointer',
            letterSpacing: '0.05em', textTransform: 'uppercase',
          }}
        >
          Sign out
        </button>
      </div>

      {/* Grid */}
      <div style={{ padding: '36px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 28, color: '#f5f0e8' }}>
          Dashboard
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 18,
        }}>
          {sections.map((s) => (
            <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#001d30',
                border: `1px solid ${s.badge ? '#C9A22744' : '#1e3a52'}`,
                borderLeft: `4px solid ${s.color}`,
                borderRadius: 8,
                padding: '20px 22px',
                cursor: 'pointer',
                transition: 'border-color 0.15s',
                position: 'relative',
              }}>
                {s.badge && (
                  <span style={{
                    position: 'absolute', top: 14, right: 14,
                    background: '#C9A227', color: '#002942',
                    fontSize: 10, fontWeight: 700,
                    padding: '2px 8px', borderRadius: 10,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>{s.badge}</span>
                )}
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#f5f0e8', marginBottom: 6 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 13, color: '#7fa8c4', lineHeight: 1.5 }}>
                  {s.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
