import { getSavedStoriesServer } from '@/services/serverUsers';

import { TravellerStories } from '@/components/travellers/TravellerStories/TravellerStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import { getMeServer } from '@/services/serverUsers';

export default async function ProfilePage() {
  const user = await getMeServer();

  const { stories, totalPages } = await getSavedStoriesServer({
    page: 1,
    limit: 6,
  });

  if (!stories || stories.length === 0) {
    return (
      <MessageNoStories
        text="У вас ще немає збережених історій, мерщій збережіть вашу першу історію!"
        buttonText="До історій"
        linkTo="/stories"
      />
    );
  }

  return (
    <TravellerStories
      initialStories={stories}
      userId={user._id}
      totalPages={totalPages}
    />
  );
}
