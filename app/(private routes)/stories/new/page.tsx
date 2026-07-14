import css from './AddStoryPage.module.css';
import { StoryForm } from '@/components/stories/StoryForm/StoryForm';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Нова історія',
};

// StoryDetailsPage??
export default function AddStoryPage() {
  return (
    <div className="container">
      <h1 className={css.title}>Створити нову історію</h1>
      {<StoryForm />}
      <Toaster />
    </div>
  );
}
