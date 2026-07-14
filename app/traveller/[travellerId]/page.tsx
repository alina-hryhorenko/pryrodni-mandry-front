import type { Metadata } from 'next';

type Props = {
  params: Promise<{ travellerId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { travellerId } = await params;

  return {
    title: `Мандрівник #${travellerId}`,
  };
}

export default function TravellerDetailsPage() {
  return <h1>Traveller Details Page</h1>;
}
