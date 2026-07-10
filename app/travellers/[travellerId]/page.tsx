import { traveller } from '@/constants/traveller';
import { TravellerInfo } from '@/components/travellers/TravellerInfo/TravellerInfo';

export default function TravellerDetailsPage() {
  return (
    <main>
      <div className="container">
        <TravellerInfo traveller={traveller} />
        <h2>Статті Мандрівника</h2>
      </div>
    </main>
  );
}
