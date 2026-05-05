'use client';

export default function LoyaltyLookup() {
  return (
    <div style={{
      background: '#001d30',
      border: '1px solid #1e3a52',
      borderRadius: 10,
      padding: 28,
      fontFamily: '"Century Gothic", sans-serif',
      color: '#f5f0e8',
    }}>
      <div style={{
        fontSize: 12, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: '#C9A227', marginBottom: 16,
      }}>
        Member Lookup
      </div>
      <div style={{ fontSize: 14, color: '#7fa8c4', lineHeight: 1.7 }}>
        Tiger Table Club member lookup is coming soon.
        Connect the D1 database to enable live member search and visit recording.
      </div>
    </div>
  );
}
