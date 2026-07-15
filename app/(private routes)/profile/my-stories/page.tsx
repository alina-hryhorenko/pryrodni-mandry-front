import { getMyStoriesServer } from '@/services/serverUsers';

import { TravellerStories } from '@/components/travellers/TravellerStories/TravellerStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

export default async function MyStoriesPage() {
  const { stories, totalPages } = await getMyStoriesServer({
    page: 1,
    limit: 6,
  });

  if (stories.length === 0) {
    return (
      <MessageNoStories
        text="Ви ще нічого не публікували, поділіться своєю першою історією!"
        buttonText="Опублікувати історію"
        linkTo="/stories/new"
      />
    );
  }

  return (
    <TravellerStories
      initialStories={stories}
      userId=""
      totalPages={totalPages}
    />
  );
}
