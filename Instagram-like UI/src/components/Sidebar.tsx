import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SuggestionUser {
  id: string;
  username: string;
  subtitle: string;
  avatar: string;
}

const suggestions: SuggestionUser[] = [
  { id: "1", username: "travel_explorer", subtitle: "Followed by user123 + 2 more", avatar: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150" },
  { id: "2", username: "food_adventures", subtitle: "Followed by foodie_life", avatar: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150" },
  { id: "3", username: "urban_photography", subtitle: "New to Instagram", avatar: "https://images.unsplash.com/photo-1617121346253-43ef95179ac9?w=150" },
  { id: "4", username: "outdoor_enthusiast", subtitle: "Followed by nature_lover", avatar: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=150" },
  { id: "5", username: "fitness_motivation", subtitle: "Followed by fit_journey + 3 more", avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150" },
];

export function Sidebar() {
  return (
    <aside className="hidden xl:block w-[320px] fixed right-0 top-0 h-screen pt-8 pr-16">
      <div className="pl-16">
        {/* Current User */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1653691040409-793d2c22ed69?w=150"
              alt="Your profile"
              className="size-11 rounded-full object-cover"
            />
            <div>
              <div className="cursor-pointer">your_username</div>
              <div className="text-sm text-gray-500">Your Name</div>
            </div>
          </div>
          <button className="text-blue-500 text-xs hover:text-gray-900">Switch</button>
        </div>

        {/* Suggestions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Suggestions For You</span>
            <button className="text-xs hover:text-gray-500">See All</button>
          </div>

          <div className="space-y-3">
            {suggestions.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ImageWithFallback
                    src={user.avatar}
                    alt={user.username}
                    className="size-11 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm cursor-pointer">{user.username}</div>
                    <div className="text-xs text-gray-500">{user.subtitle}</div>
                  </div>
                </div>
                <button className="text-blue-500 text-xs hover:text-gray-900">Follow</button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-10 text-xs text-gray-400 leading-relaxed">
          <div className="flex flex-wrap gap-x-1">
            <a href="#" className="hover:underline">About</a>
            <span>·</span>
            <a href="#" className="hover:underline">Help</a>
            <span>·</span>
            <a href="#" className="hover:underline">Press</a>
            <span>·</span>
            <a href="#" className="hover:underline">API</a>
            <span>·</span>
            <a href="#" className="hover:underline">Jobs</a>
            <span>·</span>
            <a href="#" className="hover:underline">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline">Locations</a>
            <span>·</span>
            <a href="#" className="hover:underline">Language</a>
          </div>
          <div className="text-gray-400 mt-6">© 2025 INSTAGRAM FROM META</div>
        </div>
      </div>
    </aside>
  );
}