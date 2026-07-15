import type { Metadata } from 'next';
import MyStoriesPageClient from './MyStoriesPageClient';

export const metadata: Metadata = {
  title: 'Мої історії',
  description: 'Опубліковані історії мандрівника на платформі Природні Мандри.',
};

export default function MyStoriesPage() {
  return <MyStoriesPageClient />;
}
