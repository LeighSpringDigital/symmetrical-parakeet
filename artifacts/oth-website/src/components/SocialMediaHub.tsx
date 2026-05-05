'use client';

export default function SocialMediaHub() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d1b2a',
      fontFamily: '"Century Gothic", sans-serif',
      color: '#f5f0e8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
      padding: 40,
    }}>
      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: '#C9A227',
      }}>
        Coming Soon
      </div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>Social Media Hub</div>
      <div style={{ fontSize: 14, color: '#7fa8c4', maxWidth: 460, textAlign: 'center', lineHeight: 1.7 }}>
        Urgency calendar, asset bank, post log, and Buffer scheduling — all in one place.
        This panel is under development.
      </div>
    </div>
  );
}
