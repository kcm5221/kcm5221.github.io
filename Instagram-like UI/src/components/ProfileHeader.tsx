import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MoreHorizontal, Grid3x3, Bookmark, UserSquare2 } from "lucide-react";
import { useState } from "react";

interface Highlight {
  id: string;
  title: string;
  image: string;
}

const highlights: Highlight[] = [
  { id: "1", title: "Travel", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150" },
  { id: "2", title: "Food", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150" },
  { id: "3", title: "City", image: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=150" },
  { id: "4", title: "Nature", image: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=150" },
  { id: "5", title: "Fitness", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150" },
];

export function ProfileHeader() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div className="bg-white">
      {/* Profile Info Section */}
      <div className="max-w-[935px] mx-auto px-4 pt-8 pb-4">
        <div className="flex gap-8 md:gap-20 mb-11">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=300"
              alt="Profile"
              className="size-20 md:size-[150px] rounded-full object-cover"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 min-w-0">
            {/* Username and Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
              <h2 className="text-xl">travel_vibes</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-6 py-1.5 rounded-lg ${
                    isFollowing
                      ? 'bg-gray-200 hover:bg-gray-300'
                      : 'bg-blue-500 text-white hover:bg-blue-600'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button className="px-6 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-lg">
                  Message
                </button>
                <button className="p-1.5 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal className="size-6" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mb-5">
              <div>
                <span>287</span> posts
              </div>
              <button className="hover:text-gray-600">
                <span>2.5M</span> followers
              </button>
              <button className="hover:text-gray-600">
                <span>324</span> following
              </button>
            </div>

            {/* Bio */}
            <div>
              <div className="mb-1">Alex Johnson</div>
              <div className="text-sm">
                🌍 Travel & Adventure Photographer
                <br />
                📍 Based in California
                <br />
                ✉️ contact@travelvibes.com
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="flex flex-col items-center gap-1 min-w-[77px] cursor-pointer">
              <div className="p-[2px] rounded-full border border-gray-300">
                <ImageWithFallback
                  src={highlight.image}
                  alt={highlight.title}
                  className="size-[77px] rounded-full object-cover"
                />
              </div>
              <span className="text-xs">{highlight.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200">
        <div className="max-w-[935px] mx-auto flex justify-center gap-16">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 py-3 border-t ${
              activeTab === "posts"
                ? "border-black"
                : "border-transparent text-gray-400"
            }`}
          >
            <Grid3x3 className="size-3" />
            <span className="text-xs uppercase tracking-widest">Posts</span>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 py-3 border-t ${
              activeTab === "saved"
                ? "border-black"
                : "border-transparent text-gray-400"
            }`}
          >
            <Bookmark className="size-3" />
            <span className="text-xs uppercase tracking-widest">Saved</span>
          </button>
          <button
            onClick={() => setActiveTab("tagged")}
            className={`flex items-center gap-2 py-3 border-t ${
              activeTab === "tagged"
                ? "border-black"
                : "border-transparent text-gray-400"
            }`}
          >
            <UserSquare2 className="size-3" />
            <span className="text-xs uppercase tracking-widest">Tagged</span>
          </button>
        </div>
      </div>
    </div>
  );
}
