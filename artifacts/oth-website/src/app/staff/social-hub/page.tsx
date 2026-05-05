'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically imported so it doesn't SSR (uses browser APIs)
const SocialMediaHub = dynamic(
  () => import('@/components/SocialMediaHub'),
  { ssr: false, loading: () => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#0d1b2a',
      fontFamily: '"Century Gothic", sans-serif', color: '#7fa8c4', fontSize: 14,
    }}>
      Loading Social Media Hub...
    </div>
  )}
);

export default function SocialHubPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = sessionStorage.getItem('staff_auth');
    if (!auth) router.replace('/staff');
  }, [router]);

  return <SocialMediaHub />;
}
