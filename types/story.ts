export interface Story {
  _id: string;
  title: string;
  img?: string;
  imageURL?: string;
  savedBySize?: number;
  rate?: number;
  author?: {
    _id: string;
    name: string;
    avatarURL?: string;
  };
  ownerId?: string | { $oid?: string; name?: string; _id?: string };
  article?: string;
  category?: string | { $oid?: string };
  date?: string;
  createdAt?: string;
}

export interface NormalizedStory {
  id: string;
  title: string;
  image: string;
  saves: number;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

export function normalizeStory(raw: Story): NormalizedStory {
  const owner = typeof raw.ownerId === 'object' ? raw.ownerId : undefined;

  return {
    id: raw._id,
    title: raw.title,
    image: raw.img || raw.imageURL || '/placeholder.png',
    saves: raw.savedBySize ?? raw.rate ?? 0,
    author: {
      id:
        raw.author?._id ||
        owner?._id ||
        owner?.$oid ||
        (typeof raw.ownerId === 'string' ? raw.ownerId : '') ||
        '',
      name: raw.author?.name || owner?.name || 'Невідомий автор',
      avatar: raw.author?.avatarURL || '',
    },
  };
}

export interface PopularStoriesResponse {
  data: Story[];
}
