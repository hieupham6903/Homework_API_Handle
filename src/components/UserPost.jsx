import { useState, useEffect } from "react";
import { usePosts } from "../hooks/usePosts";

function UserPost({
  userId,
  userName,
  asTableRow = false,
  autoFetch = false,
  showToggle = true,
}) {
  const { posts, isLoading: loadingPosts, fetchPosts } = usePosts(userId);
  const [showPosts, setShowPosts] = useState(autoFetch || asTableRow);

  useEffect(() => {
    if (autoFetch || asTableRow || showPosts) {
      fetchPosts();
    }
  }, [userId, autoFetch, asTableRow]);

  useEffect(() => {
    if (showPosts && !autoFetch && !asTableRow) {
      fetchPosts();
    }
  }, [showPosts]);

  const handleTogglePosts = () => {
    setShowPosts(!showPosts);
  };

  const content = (
    <>
      <h6>Bài viết của {userName}:</h6>
      {loadingPosts ? (
        <p>Đang tải bài viết...</p>
      ) : (
        <div className="list-group">
          {posts.map((post) => (
            <div key={post.id} className="list-group-item">
              <h6 className="mb-1">{post.title}</h6>
              <p className="mb-0 small">{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );

  if (asTableRow) {
    return (
      <tr>
        <td colSpan="5" className="bg-light">
          <div className="p-3">{content}</div>
        </td>
      </tr>
    );
  }

  return (
    <div className="mt-3">
      {showToggle && (
        <button
          className="btn btn-info btn-sm text-white mb-2"
          onClick={handleTogglePosts}
          disabled={loadingPosts}
        >
          {loadingPosts ? "Đang tải..." : showPosts ? "Ẩn" : "Hiện"} Bài Viết
        </button>
      )}
      {showPosts && content}
    </div>
  );
}

export default UserPost;
