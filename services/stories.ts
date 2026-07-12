export type Story = {
  _id: string;
  title: string;
  description: string;
  content: string;
  img: string;
  author: string;
  date: string;
  category: string;
  isSaved: boolean;
};

export const getStoryById = async (
  storyId: string
): Promise<Story | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/story/${storyId}`,
      { cache: 'no-store' }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error('Error fetching story:', error);
    return null;
  }
};