import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, MessageCircle } from "lucide-react";

interface TaggedPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  username: string;
  userAvatar: string;
  caption: string;
  timeAgo: string;
}

const taggedPosts: TaggedPost[] = [
  {
    id: "t1",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1080",
    likes: 8921,
    comments: 156,
    username: "foodie_life",
    userAvatar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150",
    caption: "Brunch with @travel_vibes 🥑",
    timeAgo: "1 week ago",
  },
  {
    id: "t2",
    image: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=1080",
    likes: 15632,
    comments: 892,
    username: "city_lights",
    userAvatar: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=150",
    caption: "Exploring the city with @travel_vibes 🏙️",
    timeAgo: "2 weeks ago",
  },
  {
    id: "t3",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1080",
    likes: 7832,
    comments: 234,
    username: "fit_journey",
    userAvatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150",
    caption: "Training session with @travel_vibes 💪",
    timeAgo: "3 weeks ago",
  },
];

interface TaggedGridProps {
  onPostClick: (postIndex: number) => void;
}

export function TaggedGrid({ onPostClick }: TaggedGridProps) {
  if (taggedPosts.length === 0) {
    return (
      <div className="max-w-[935px] mx-auto px-4 pb-8 flex flex-col items-center justify-center py-16">
        <div className="text-center">
          <div className="text-2xl mb-2">No Photos</div>
          <div className="text-gray-500">Photos of you will appear here</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[935px] mx-auto px-4 pb-8">
      <div className="grid grid-cols-3 gap-1 md:gap-7">
        {taggedPosts.map((post, index) => (
          <div
            key={post.id}
            className="relative aspect-square cursor-pointer group"
            onClick={() => onPostClick(index)}
          >
            <ImageWithFallback
              src={post.image}
              alt="Tagged post"
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

export { taggedPosts };
