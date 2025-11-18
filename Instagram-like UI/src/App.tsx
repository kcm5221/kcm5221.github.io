import { LeftSidebar } from "./components/LeftSidebar";
import { MobileHeader } from "./components/MobileHeader";
import { ProfileHeader } from "./components/ProfileHeader";
import { PostGrid, gridPosts } from "./components/PostGrid";
import { SavedGrid } from "./components/SavedGrid";
import { TaggedGrid, taggedPosts } from "./components/TaggedGrid";
import { BottomNav } from "./components/BottomNav";
import { PostDetailModal } from "./components/PostDetailModal";
import { useState } from "react";

export default function App() {
  const [selectedPostIndex, setSelectedPostIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("posts");
  const [currentPosts, setCurrentPosts] = useState<any[]>([]);

  const handlePostClick = (posts: any[], index: number) => {
    setCurrentPosts(posts);
    setSelectedPostIndex(index);
  };

  const handlePostGridClick = (index: number) => {
    if (activeTab === "posts") {
      setCurrentPosts(gridPosts);
    } else if (activeTab === "tagged") {
      setCurrentPosts(taggedPosts);
    }
    setSelectedPostIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedPostIndex(null);
  };

  const handleNext = () => {
    if (selectedPostIndex !== null && selectedPostIndex < currentPosts.length - 1) {
      setSelectedPostIndex(selectedPostIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedPostIndex !== null && selectedPostIndex > 0) {
      setSelectedPostIndex(selectedPostIndex - 1);
    }
  };

  const selectedPost = selectedPostIndex !== null ? currentPosts[selectedPostIndex] : null;

  return (
    <div className="min-h-screen bg-white">
      <LeftSidebar />
      <MobileHeader />
      
      <main className="md:ml-[244px]">
        <ProfileHeader activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === "posts" && <PostGrid onPostClick={handlePostGridClick} />}
        {activeTab === "saved" && <SavedGrid onPostClick={handlePostClick} />}
        {activeTab === "tagged" && <TaggedGrid onPostClick={handlePostGridClick} />}
      </main>
      
      <BottomNav />

      {/* Post Detail Modal */}
      {selectedPost && (
        <PostDetailModal
          postId={selectedPost.id}
          username={selectedPost.username}
          userAvatar={selectedPost.userAvatar}
          postImage={selectedPost.image}
          likes={selectedPost.likes}
          caption={selectedPost.caption}
          timeAgo={selectedPost.timeAgo}
          onClose={handleCloseModal}
          onNext={selectedPostIndex < currentPosts.length - 1 ? handleNext : undefined}
          onPrev={selectedPostIndex > 0 ? handlePrev : undefined}
        />
      )}
    </div>
  );
}