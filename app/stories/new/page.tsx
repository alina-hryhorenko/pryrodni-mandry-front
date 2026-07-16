import type { Metadata } from 'next';
import { StoryForm } from '@/components/stories/StoryForm/StoryForm';
import css from './AddStoryPage.module.css';

export const metadata: Metadata = {
  title: 'Нова історія',
};

export default function AddStoryPage() {
  return (
    <div className="container">
      <h1 className={css.title}>Створити нову історію</h1>
      {<StoryForm />}
    </div>
  );
}
