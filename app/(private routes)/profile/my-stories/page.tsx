import { getMyStories } from '@/services/users';

import { TravellerStories } from '@/components/travellers/TravellerStories/TravellerStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

export default async function MyStoriesPage() {
  const { stories } = await getMyStories({
    page: 1,
    limit: 6,
  });

  if (!stories || stories.length === 0) {
    return (
      <MessageNoStories
        text="Ви ще нічого не публікували, поділіться своєю першою історією!"
        buttonText="Опублікувати історію"
        linkTo="/stories/new"
      />
    );
  }

  return <TravellerStories stories={stories} />;
}
