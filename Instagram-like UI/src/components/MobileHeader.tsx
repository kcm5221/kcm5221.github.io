import { Heart, MessageCircle, ChevronDown } from "lucide-react";

export function MobileHeader() {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="px-4 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-xl">travel_vibes</span>
          <ChevronDown className="size-4" />
        </div>
        <div className="flex items-center gap-5">
          <Heart className="size-6 cursor-pointer" />
          <MessageCircle className="size-6 cursor-pointer" />
        </div>
      </div>
    </header>
  );
}