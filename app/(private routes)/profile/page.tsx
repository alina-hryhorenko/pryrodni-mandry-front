import { getSavedStories } from '@/services/users';

import { TravellerStories } from '@/components/travellers/TravellerStories/TravellerStories';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';

export default async function ProfilePage() {
  const { stories } = await getSavedStories({
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

  return <TravellerStories stories={stories} />;
}
