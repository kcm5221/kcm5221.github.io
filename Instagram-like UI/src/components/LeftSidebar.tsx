import { Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, User, Menu } from "lucide-react";
import { useState } from "react";

export function LeftSidebar() {
  const [activeItem, setActiveItem] = useState("home");

  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "explore", icon: Compass, label: "Explore" },
    { id: "reels", icon: Film, label: "Reels" },
    { id: "messages", icon: MessageCircle, label: "Messages" },
    { id: "notifications", icon: Heart, label: "Notifications" },
    { id: "create", icon: PlusSquare, label: "Create" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-[244px] border-r border-gray-200 bg-white px-3 py-8 z-50">
      {/* Logo */}
      <div className="px-3 mb-10">
        <h1 className="text-2xl">Instagram</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors ${
                    isActive ? 'font-bold' : ''
                  }`}
                >
                  <Icon className={`size-6 ${isActive ? 'fill-current' : ''}`} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* More Menu */}
      <div className="mt-auto">
        <button className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          <Menu className="size-6" />
          <span>More</span>
        </button>
      </div>
    </aside>
  );
}
