import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasNew: boolean;
}

const stories: Story[] = [
  { id: "1", username: "your_story", avatar: "https://images.unsplash.com/photo-1653691040409-793d2c22ed69?w=150", hasNew: false },
  { id: "2", username: "travel_vibes", avatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150", hasNew: true },
  { id: "3", username: "foodie_life", avatar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150", hasNew: true },
  { id: "4", username: "city_lights", avatar: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=150", hasNew: true },
  { id: "5", username: "nature_lover", avatar: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=150", hasNew: true },
  { id: "6", username: "fit_journey", avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150", hasNew: true },
  { id: "7", username: "adventure_time", avatar: "https://images.unsplash.com/photo-1653691040409-793d2c22ed69?w=150", hasNew: true },
  { id: "8", username: "daily_snaps", avatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150", hasNew: false },
];

export function Stories() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg py-4 mb-4 overflow-hidden">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide px-2">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer">
            <div className={`p-[2px] rounded-full ${story.hasNew ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500' : 'bg-gray-200'}`}>
              <div className="bg-white p-[3px] rounded-full">
                <ImageWithFallback
                  src={story.avatar}
                  alt={story.username}
                  className="size-16 rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs truncate w-full text-center max-w-[80px]">{story.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
}