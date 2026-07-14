import type { Metadata } from 'next';
import LoginForm from '@/components/LoginForm/LoginForm';

export const metadata: Metadata = {
  title: 'Вхід',
  description: 'Увійдіть до свого акаунту Природні Мандри.',
};

export default function LoginPage() {
  return <LoginForm />;
}
