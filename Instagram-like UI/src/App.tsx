import { LeftSidebar } from "./components/LeftSidebar";
import { MobileHeader } from "./components/MobileHeader";
import { ProfileHeader } from "./components/ProfileHeader";
import { PostGrid } from "./components/PostGrid";
import { BottomNav } from "./components/BottomNav";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <LeftSidebar />
      <MobileHeader />
      
      <main className="md:ml-[244px]">
        <ProfileHeader />
        <PostGrid />
      </main>
      
      <BottomNav />
    </div>
  );
}
