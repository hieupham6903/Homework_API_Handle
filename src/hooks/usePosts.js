import { useState } from "react";
import { postService } from "../services/postService";

// Custom hook để quản lý posts của một user
export function usePosts(userId) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);
    try {
      const data = await postService.getPostsByUserId(userId);
      setPosts(data);
    } catch (err) {
      setError(err.message);
      console.error("Lỗi khi tải posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
  };
}
