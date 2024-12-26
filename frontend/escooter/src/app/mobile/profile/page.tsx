'use client';

import MobileProfile from '@/components/mobile/MobileProfile';
import MobileNavBar from '@/components/MobileNavBar';

export default function MobileProfilePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MobileProfile />
      <MobileNavBar />
    </div>
  );
}
