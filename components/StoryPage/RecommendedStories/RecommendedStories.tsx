type Props = {
  currentId: string;
};

export default function RecommendedStories({ currentId }: Props) {
  return <div style={{ display: 'none' }}>{currentId}</div>;
}