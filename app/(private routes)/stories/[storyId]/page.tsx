import { getStoryById } from '@/services/stories';
import StoryDetails from '@/components/StoryDetails/StoryDetails';
import SaveStory from '@/components/SaveStory/SaveStory';
import RecommendedStories from '@/components/RecommendedStories/RecommendedStories';
import { notFound } from 'next/navigation';

type PageProps = {
  params: {
    storyId: string;
  };
};

export async function generateMetadata({ params }: PageProps) {
  const story = await getStoryById(params.storyId);

  if (!story) {
    return {
      title: 'Історію не знайдено',
    };
  }

  return {
    title: story.title,
    description: story.description,
    openGraph: {
      title: story.title,
      description: story.description,
      images: [story.img],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { storyId } = params;

  const story = await getStoryById(storyId);

  if (!story) {
    notFound();
  }

  return (
    <main>
      <StoryDetails story={story} />
      <SaveStory storyId={story._id} isSaved={story.isSaved} />
      <RecommendedStories currentId={story._id} />
    </main>
  );
}