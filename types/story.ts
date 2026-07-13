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
  const ownerId = raw.ownerId;

  const authorId =
    raw.author?._id ||
    (typeof ownerId === 'object' && ownerId !== null && '$oid' in ownerId
      ? ownerId.$oid
      : typeof ownerId === 'string'
        ? ownerId
        : '') ||
    '';

  let authorName: string = 'Невідомий автор';

  if (raw.author?.name) {
    authorName = raw.author.name;
  } else if (
    typeof ownerId === 'object' &&
    ownerId !== null &&
    'name' in ownerId
  ) {
    const nameFromOwner = (ownerId as { name?: string }).name;
    if (nameFromOwner) {
      authorName = nameFromOwner;
    }
  }

  const authorAvatar = raw.author?.avatarURL || '';

  return {
    id: raw._id,
    title: raw.title,
    image: raw.img || raw.imageURL || '/placeholder.png',
    saves: raw.savedBySize ?? raw.rate ?? 0,
    author: {
      id: authorId,
      name: authorName,
      avatar: authorAvatar,
    },
  };
}

export interface PopularStoriesResponse {
  data: Story[];
}
