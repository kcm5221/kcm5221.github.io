import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, MessageCircle } from "lucide-react";

interface GridPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
}

const gridPosts: GridPost[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
    likes: 12453,
    comments: 324,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600",
    likes: 8921,
    comments: 156,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=600",
    likes: 15632,
    comments: 892,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=600",
    likes: 21456,
    comments: 567,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600",
    likes: 7832,
    comments: 234,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30?w=600",
    likes: 11234,
    comments: 421,
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600",
    likes: 9654,
    comments: 298,
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    likes: 18765,
    comments: 634,
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1578592391689-0e3d1a1b52b9?w=600",
    likes: 13421,
    comments: 445,
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1513061379709-ef0cd1695189?w=600",
    likes: 16234,
    comments: 721,
  },
  {
    id: "11",
    image: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=600",
    likes: 10987,
    comments: 356,
  },
  {
    id: "12",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",
    likes: 14532,
    comments: 478,
  },
];

export function PostGrid() {
  return (
    <div className="max-w-[935px] mx-auto px-4 pb-8">
      <div className="grid grid-cols-3 gap-1 md:gap-7">
        {gridPosts.map((post) => (
          <div
            key={post.id}
            className="relative aspect-square cursor-pointer group"
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
