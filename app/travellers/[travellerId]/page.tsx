import { TravellerInfo } from '@/components/travellers/TravellerInfo/TravellerInfo';
import { TravellerStories } from '@/components/travellers/TravellerStories/TravellerStories';
import { getTravellerById } from '@/services/users';

type Props = {
  params: Promise<{
    travellerId: string;
  }>;
};

export default async function TravellerDetailsPage({ params }: Props) {
  const { travellerId } = await params;

  const traveller = await getTravellerById(travellerId);
  console.log('TRAVELLER:', traveller);

  return (
    <main>
      <div className="container">
        <TravellerInfo traveller={traveller.user} />

        <TravellerStories
          initialStories={traveller.stories}
          userId={travellerId}
          totalPages={traveller.totalPages}
        />
      </div>
    </main>
  );
}
