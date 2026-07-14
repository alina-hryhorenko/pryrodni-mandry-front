import type { Metadata } from 'next';

import TravellerDetailsPageClient from './TravellerDetailsPageClient';

type Props = {
  params: Promise<{
    travellerId: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { travellerId } = await params;

  return {
    title: `Мандрівник #${travellerId}`,
  };
}

export default function TravellerDetailsPage({ params }: Props) {
  return <TravellerDetailsPageClient params={params} />;
}
