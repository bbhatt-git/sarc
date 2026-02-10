import LoginView from './view';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Admin Login',
    description: 'Login to the admin dashboard.',
};

export default function LoginPage() {
    return <LoginView />;
}
