import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface PostProps {
  username: string;
  userAvatar: string;
  postImage: string;
  likes: number;
  caption: string;
  timeAgo: string;
}

export function Post({ username, userAvatar, postImage, likes, caption, timeAgo }: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <article className="bg-white border-b border-gray-200 mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 pb-2">
        <div className="flex items-center gap-3">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500">
            <div className="bg-white p-[2px] rounded-full">
              <ImageWithFallback
                src={userAvatar}
                alt={username}
                className="size-8 rounded-full object-cover"
              />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="cursor-pointer">{username}</span>
            <span className="text-gray-500">• {timeAgo}</span>
          </div>
        </div>
        <MoreHorizontal className="size-6 cursor-pointer" />
      </div>

      {/* Post Image */}
      <div className="w-full aspect-square">
        <ImageWithFallback
          src={postImage}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Heart
              className={`size-7 cursor-pointer ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
              onClick={() => setIsLiked(!isLiked)}
            />
            <MessageCircle className="size-7 cursor-pointer -scale-x-100" />
            <Send className="size-7 cursor-pointer" />
          </div>
          <Bookmark
            className={`size-6 cursor-pointer ${isSaved ? 'fill-black' : ''}`}
            onClick={() => setIsSaved(!isSaved)}
          />
        </div>

        {/* Likes Count */}
        <div className="mb-2">
          <span>{(isLiked ? likes + 1 : likes).toLocaleString()} likes</span>
        </div>

        {/* Caption */}
        <div className="mb-1">
          <span className="mr-2">{username}</span>
          <span>{caption}</span>
        </div>

        {/* View Comments */}
        <button className="text-gray-500 mb-2">View all 124 comments</button>

        {/* Add Comment */}
        <div className="pt-2 border-t border-gray-200">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full outline-none text-sm"
          />
        </div>
      </div>
    </article>
  );
}