import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, MessageCircle } from "lucide-react";

interface GridPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  username: string;
  userAvatar: string;
  caption: string;
  timeAgo: string;
}

const gridPosts: GridPost[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1080",
    likes: 12453,
    comments: 324,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "Lost in the beauty of nature 🌲✨",
    timeAgo: "2 days ago",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1080",
    likes: 8921,
    comments: 156,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "Perfect morning coffee ☕",
    timeAgo: "3 days ago",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=1080",
    likes: 15632,
    comments: 892,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "Urban exploration at its finest 🏙️",
    timeAgo: "5 days ago",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1080",
    likes: 21456,
    comments: 567,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "Golden hour magic 🌅",
    timeAgo: "1 week ago",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1080",
    likes: 7832,
    comments: 234,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "No excuses, just results 💪",
    timeAgo: "1 week ago",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?w=1080",
    likes: 11234,
    comments: 421,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "Modern architecture vibes 🏛️",
    timeAgo: "2 weeks ago",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1080",
    likes: 9654,
    comments: 298,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "Coffee shop adventures ☕",
    timeAgo: "2 weeks ago",
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080",
    likes: 18765,
    comments: 634,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "Paradise found 🏖️",
    timeAgo: "3 weeks ago",
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?w=1080",
    likes: 13421,
    comments: 445,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "Mountain adventures await ⛰️",
    timeAgo: "3 weeks ago",
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1513061379709-ef0cd1695189?w=1080",
    likes: 16234,
    comments: 721,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "City lights at night 🌃",
    timeAgo: "1 month ago",
  },
  {
    id: "11",
    image: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=1080",
    likes: 10987,
    comments: 356,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "Vintage vibes 📷",
    timeAgo: "1 month ago",
  },
  {
    id: "12",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1080",
    likes: 14532,
    comments: 478,
    username: "travel_vibes",
    userAvatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150",
    caption: "Back to nature 🌲",
    timeAgo: "1 month ago",
  },
];

interface PostGridProps {
  onPostClick: (postIndex: number) => void;
}

export function PostGrid({ onPostClick }: PostGridProps) {
  return (
    <div className="max-w-[935px] mx-auto px-4 pb-8">
      <div className="grid grid-cols-3 gap-1 md:gap-7">
        {gridPosts.map((post, index) => (
          <div
            key={post.id}
            className="relative aspect-square cursor-pointer group"
            onClick={() => onPostClick(index)}
          >
            <ImageWithFallback
              src={post.image}
              alt="Post"
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

export { gridPosts };