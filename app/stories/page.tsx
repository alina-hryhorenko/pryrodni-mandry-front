import type { Metadata } from 'next';
import StoriesPageClient from './StoriesPageClient';

export const metadata: Metadata = {
  title: 'Статті',
  description: 'Історії та статті мандрівників платформи Природні Мандри.',
};

export default function StoriesPage() {
  return <StoriesPageClient />;
}
