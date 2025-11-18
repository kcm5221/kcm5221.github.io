import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, X, ChevronLeft, ChevronRight, Smile } from "lucide-react";
import { useState } from "react";

interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  timeAgo: string;
}

interface PostDetailModalProps {
  postId: string;
  username: string;
  userAvatar: string;
  postImage: string;
  likes: number;
  caption: string;
  timeAgo: string;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const mockComments: Comment[] = [
  {
    id: "1",
    username: "foodie_life",
    avatar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150",
    text: "This is absolutely stunning! 😍",
    likes: 24,
    timeAgo: "2h",
  },
  {
    id: "2",
    username: "city_lights",
    avatar: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=150",
    text: "Where is this? I need to visit!",
    likes: 15,
    timeAgo: "1h",
  },
  {
    id: "3",
    username: "nature_lover",
    avatar: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=150",
    text: "Amazing shot! What camera did you use?",
    likes: 8,
    timeAgo: "45m",
  },
  {
    id: "4",
    username: "fit_journey",
    avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150",
    text: "Love the composition 📸",
    likes: 12,
    timeAgo: "30m",
  },
];

export function PostDetailModal({
  postId,
  username,
  userAvatar,
  postImage,
  likes,
  caption,
  timeAgo,
  onClose,
  onNext,
  onPrev,
}: PostDetailModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [commentText, setCommentText] = useState("");

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
      >
        <X className="size-8" />
      </button>

      {/* Previous Button */}
      {onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="hidden md:block absolute left-4 text-white hover:text-gray-300 z-50"
        >
          <ChevronLeft className="size-10" />
        </button>
      )}

      {/* Next Button */}
      {onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="hidden md:block absolute right-4 text-white hover:text-gray-300 z-50"
        >
          <ChevronRight className="size-10" />
        </button>
      )}

      {/* Modal Content */}
      <div
        className="bg-white w-full h-full md:h-[90vh] md:w-[90vw] md:max-w-[1200px] flex flex-col md:flex-row overflow-hidden md:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side - Image */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <ImageWithFallback
            src={postImage}
            alt="Post"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Side - Details */}
        <div className="w-full md:w-[400px] flex flex-col bg-white">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <ImageWithFallback
                src={userAvatar}
                alt={username}
                className="size-8 rounded-full object-cover"
              />
              <span className="cursor-pointer">{username}</span>
            </div>
            <MoreHorizontal className="size-6 cursor-pointer" />
          </div>

          {/* Comments Section - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Caption */}
            <div className="flex gap-3">
              <ImageWithFallback
                src={userAvatar}
                alt={username}
                className="size-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div>
                  <span className="mr-2">{username}</span>
                  <span>{caption}</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">{timeAgo}</div>
              </div>
            </div>

            {/* Comments */}
            {mockComments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <ImageWithFallback
                  src={comment.avatar}
                  alt={comment.username}
                  className="size-8 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <div>
                    <span className="mr-2">{comment.username}</span>
                    <span>{comment.text}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>{comment.timeAgo}</span>
                    <button className="hover:text-gray-700">
                      {comment.likes} likes
                    </button>
                    <button className="hover:text-gray-700">Reply</button>
                  </div>
                </div>
                <button className="flex-shrink-0">
                  <Heart className="size-3" />
                </button>
              </div>
            ))}
          </div>

          {/* Actions Section */}
          <div className="border-t border-gray-200">
            {/* Action Buttons */}
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-4">
                <Heart
                  className={`size-7 cursor-pointer ${
                    isLiked ? "fill-red-500 text-red-500" : ""
                  }`}
                  onClick={() => setIsLiked(!isLiked)}
                />
                <MessageCircle className="size-7 cursor-pointer -scale-x-100" />
                <Send className="size-7 cursor-pointer" />
              </div>
              <Bookmark
                className={`size-6 cursor-pointer ${isSaved ? "fill-black" : ""}`}
                onClick={() => setIsSaved(!isSaved)}
              />
            </div>

            {/* Likes Count */}
            <div className="px-4 pb-2">
              <span>{(isLiked ? likes + 1 : likes).toLocaleString()} likes</span>
            </div>

            {/* Timestamp */}
            <div className="px-4 pb-3">
              <div className="text-xs text-gray-400 uppercase">
                November 16, 2025
              </div>
            </div>

            {/* Comment Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-gray-200">
              <button>
                <Smile className="size-6 text-gray-400" />
              </button>
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 outline-none"
              />
              <button
                disabled={!commentText.trim()}
                className={`${
                  commentText.trim()
                    ? "text-blue-500 hover:text-blue-700"
                    : "text-blue-300"
                }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
