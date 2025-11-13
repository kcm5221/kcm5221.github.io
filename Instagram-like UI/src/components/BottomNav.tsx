import { Home, Search, PlusSquare, Film, User } from "lucide-react";

export function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around h-[50px] px-2">
        <Home className="size-7 cursor-pointer" />
        <Search className="size-7 cursor-pointer" />
        <Film className="size-7 cursor-pointer" />
        <PlusSquare className="size-7 cursor-pointer" />
        <div className="size-7 rounded-full border-2 border-black cursor-pointer">
          <User className="size-full p-0.5" />
        </div>
      </div>
    </nav>
  );
}