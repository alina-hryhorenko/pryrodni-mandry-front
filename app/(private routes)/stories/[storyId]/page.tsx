import { getStoryById } from '@/services/stories';
import StoryDetails from '@/components/StoryPage/StoryDetails/StoryDetails';
import SaveStory from '@/components/StoryPage/SaveStory/SaveStory';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

type Props = {
  params: Promise<{ storyId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { storyId } = await params;

  const story = await getStoryById(storyId);

  if (!story) {
    return { title: 'Історію не знайдено' };
  }

  return {
    title: story.title,
    article: story.article,
  };
}

export default async function Page({ params }: Props) {
  const { storyId } = await params;

  const story = await getStoryById(storyId);

  if (!story) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <StoryDetails story={story} />

      {/* <SaveStory storyId={story._id} isSaved={story.isSaved ?? false} /> */}

      {/* RecomendedStories буде тут */}
    </main>
  );
}
