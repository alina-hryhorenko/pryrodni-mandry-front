import { getStoryById } from '@/services/stories';
import StoryDetails from '@/components/StoryDetails/StoryDetails';
import SaveStory from '@/components/SaveStory/SaveStory';
import styles from './page.module.css';

type PageProps = {
  params: {
    storyId: string;
  };
};


export async function generateMetadata({ params }: PageProps) {
  const story = await getStoryById(params.storyId);

  if (!story) {
    return { title: 'Історію не знайдено' };
  }

  return {
    title: story.title,
    description: story.description,
  };
}


export default async function Page({ params }: PageProps) {
  const story = await getStoryById(params.storyId);

  
  if (!story) {
    return (
      <main className={styles.page}>
        <p>Така історія відсутня</p>
      </main>
    );
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