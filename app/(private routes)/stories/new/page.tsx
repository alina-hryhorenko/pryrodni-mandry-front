import css from './AddStoryPage.module.css';
import StoryForm from '@/components/stories/StoryForm/StoryForm';

export default function AddStoryPage() {
  return (
      <div className="container">
        <h1 className={css.title}>Створити нову історію</h1>
        {<StoryForm />}
      </div>
  );
}
