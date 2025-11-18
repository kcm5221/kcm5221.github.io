import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, MessageCircle, ChevronLeft, Lock } from "lucide-react";
import { useState } from "react";

interface SavedPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  username: string;
  userAvatar: string;
  caption: string;
  timeAgo: string;
}

interface Collection {
  id: string;
  name: string;
  postCount: number;
  coverImage: string;
  posts: SavedPost[];
}

const collections: Collection[] = [
  {
    id: "all",
    name: "All Posts",
    postCount: 18,
    coverImage: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?w=1080",
    posts: [
      {
        id: "s1",
        image: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?w=1080",
        likes: 11234,
        comments: 421,
        username: "architecture_daily",
        userAvatar: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?w=150",
        caption: "Modern architecture inspiration 🏛️",
        timeAgo: "2 weeks ago",
      },
      {
        id: "s2",
        image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1080",
        likes: 9654,
        comments: 298,
        username: "coffee_lovers",
        userAvatar: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=150",
        caption: "Best coffee spots in town ☕",
        timeAgo: "3 weeks ago",
      },
      {
        id: "s3",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080",
        likes: 18765,
        comments: 634,
        username: "beach_paradise",
        userAvatar: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150",
        caption: "Dream destination 🏖️",
        timeAgo: "1 month ago",
      },
      {
        id: "s4",
        image: "https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?w=1080",
        likes: 13421,
        comments: 445,
        username: "mountain_life",
        userAvatar: "https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?w=150",
        caption: "Peak season ⛰️",
        timeAgo: "1 month ago",
      },
      {
        id: "s5",
        image: "https://images.unsplash.com/photo-1513061379709-ef0cd1695189?w=1080",
        likes: 16234,
        comments: 721,
        username: "urban_explorer",
        userAvatar: "https://images.unsplash.com/photo-1513061379709-ef0cd1695189?w=150",
        caption: "City that never sleeps 🌃",
        timeAgo: "2 months ago",
      },
      {
        id: "s6",
        image: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=1080",
        likes: 10987,
        comments: 356,
        username: "vintage_cameras",
        userAvatar: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=150",
        caption: "Film photography forever 📷",
        timeAgo: "2 months ago",
      },
    ],
  },
  {
    id: "travel",
    name: "Travel Inspiration",
    postCount: 7,
    coverImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1080",
    posts: [
      {
        id: "t1",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1080",
        likes: 12453,
        comments: 324,
        username: "travel_vibes",
        userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
        caption: "Lost in the beauty of nature 🌲✨",
        timeAgo: "2 days ago",
      },
      {
        id: "t2",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080",
        likes: 18765,
        comments: 634,
        username: "beach_paradise",
        userAvatar: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150",
        caption: "Dream destination 🏖️",
        timeAgo: "1 month ago",
      },
      {
        id: "t3",
        image: "https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?w=1080",
        likes: 13421,
        comments: 445,
        username: "mountain_life",
        userAvatar: "https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?w=150",
        caption: "Peak season ⛰️",
        timeAgo: "1 month ago",
      },
    ],
  },
  {
    id: "food",
    name: "Food & Drinks",
    postCount: 5,
    coverImage: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1080",
    posts: [
      {
        id: "f1",
        image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1080",
        likes: 9654,
        comments: 298,
        username: "coffee_lovers",
        userAvatar: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=150",
        caption: "Best coffee spots in town ☕",
        timeAgo: "3 weeks ago",
      },
      {
        id: "f2",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1080",
        likes: 8921,
        comments: 156,
        username: "foodie_life",
        userAvatar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150",
        caption: "Brunch done right 🥑☕",
        timeAgo: "5 days ago",
      },
    ],
  },
  {
    id: "architecture",
    name: "Architecture",
    postCount: 4,
    coverImage: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?w=1080",
    posts: [
      {
        id: "a1",
        image: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?w=1080",
        likes: 11234,
        comments: 421,
        username: "architecture_daily",
        userAvatar: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?w=150",
        caption: "Modern architecture inspiration 🏛️",
        timeAgo: "2 weeks ago",
      },
    ],
  },
  {
    id: "urban",
    name: "City Life",
    postCount: 6,
    coverImage: "https://images.unsplash.com/photo-1513061379709-ef0cd1695189?w=1080",
    posts: [
      {
        id: "u1",
        image: "https://images.unsplash.com/photo-1513061379709-ef0cd1695189?w=1080",
        likes: 16234,
        comments: 721,
        username: "urban_explorer",
        userAvatar: "https://images.unsplash.com/photo-1513061379709-ef0cd1695189?w=150",
        caption: "City that never sleeps 🌃",
        timeAgo: "2 months ago",
      },
      {
        id: "u2",
        image: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=1080",
        likes: 15632,
        comments: 892,
        username: "city_lights",
        userAvatar: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=150",
        caption: "Urban exploration at its finest 🏙️",
        timeAgo: "5 days ago",
      },
    ],
  },
  {
    id: "vintage",
    name: "Vintage & Retro",
    postCount: 3,
    coverImage: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=1080",
    posts: [
      {
        id: "v1",
        image: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=1080",
        likes: 10987,
        comments: 356,
        username: "vintage_cameras",
        userAvatar: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=150",
        caption: "Film photography forever 📷",
        timeAgo: "2 months ago",
      },
    ],
  },
];

interface SavedGridProps {
  onPostClick: (posts: SavedPost[], postIndex: number) => void;
}

export function SavedGrid({ onPostClick }: SavedGridProps) {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null);

  if (selectedCollection) {
    // Show posts in selected collection
    return (
      <div className="max-w-[935px] mx-auto px-4 pb-8">
        {/* Back button and collection name */}
        <div className="flex items-center gap-4 mb-6 py-4">
          <button
            onClick={() => setSelectedCollection(null)}
            className="hover:text-gray-600"
          >
            <ChevronLeft className="size-6" />
          </button>
          <div>
            <h2 className="text-xl">{selectedCollection.name}</h2>
            <p className="text-sm text-gray-500">{selectedCollection.postCount} posts</p>
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-7">
          {selectedCollection.posts.map((post, index) => (
            <div
              key={post.id}
              className="relative aspect-square cursor-pointer group"
              onClick={() => onPostClick(selectedCollection.posts, index)}
            >
              <ImageWithFallback
                src={post.image}
                alt="Saved post"
                className="w-full h-full object-cover"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-white">
                  <Heart className="size-6 fill-white" />
                  <span className="hidden md:block">{post.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MessageCircle className="size-6 fill-white" />
                  <span className="hidden md:block">{post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Show collections grid
  return (
    <div className="max-w-[935px] mx-auto px-4 pb-8">
      <div className="flex items-center justify-between mb-6 py-4">
        <h2 className="text-xl">Collections</h2>
        <button className="text-blue-500 hover:text-blue-700">+ New Collection</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="cursor-pointer group"
            onClick={() => setSelectedCollection(collection)}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-2">
              <ImageWithFallback
                src={collection.coverImage}
                alt={collection.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Lock icon for private collections */}
              {collection.id !== "all" && (
                <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1.5">
                  <Lock className="size-3 text-white" />
                </div>
              )}
            </div>
            <div>
              <div className="mb-1">{collection.name}</div>
              <div className="text-sm text-gray-500">{collection.postCount} posts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export { collections };
