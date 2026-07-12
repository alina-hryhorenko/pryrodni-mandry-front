import { getStoryById } from '@/services/stories';
import StoryDetails from '@/components/StoryDetails/StoryDetails';
import SaveStory from '@/components/SaveStory/SaveStory';
import { notFound } from 'next/navigation';
import styles from './page.module.css';

type PageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { storyId } = await params;

  const story = await getStoryById(storyId);

  if (!story) {
    return { title: 'Історію не знайдено' };
  }

  return {
    title: story.title,
    description: story.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { storyId } = await params;

  const story = await getStoryById(storyId);

  if (!story) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <StoryDetails story={story} />

  
      <SaveStory
        storyId={story._id}
        isSaved={story.isSaved}
      />
    </main>
  );
}