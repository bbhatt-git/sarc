import AuthGuard from '@/components/auth-guard';
import { ReactNode } from 'react';
import AdminHeader from './admin-header';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGuard>
      <AdminHeader />
      <div className="pt-32">
        {children}
      </div>
    </AuthGuard>
  );
}
