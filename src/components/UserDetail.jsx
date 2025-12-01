import { useState } from "react";
import UserPost from "./UserPost";

function UserDetail({ user, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showPosts, setShowPosts] = useState(false);

  const handleToggleDetails = () => setShowDetails(!showDetails);

  const handleTogglePosts = () => setShowPosts(!showPosts);
  return (
    <>
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.company.name}</td>
        <td>
          <div className="d-flex gap-2 flex-wrap">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleToggleDetails}
            >
              {showDetails ? "Ẩn" : "Hiện"} Chi Tiết
            </button>
            <button
              className="btn btn-info btn-sm text-white"
              onClick={handleTogglePosts}
            >
              {showPosts ? "Ẩn" : "Hiện"} Bài Viết
            </button>
            {onDelete && (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(user.id)}
              >
                Xóa
              </button>
            )}
          </div>
        </td>
      </tr>
      {showDetails && (
        <tr>
          <td colSpan="5" className="bg-light">
            <div className="p-3">
              <h6>Thông tin chi tiết:</h6>
              <p className="mb-1">
                <strong>Địa chỉ:</strong> {user.address.street},{" "}
                {user.address.city} {user.address.zipcode}
              </p>
              <p className="mb-0">
                <strong>Website:</strong>{" "}
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {user.website}
                </a>
              </p>
            </div>
          </td>
        </tr>
      )}
      {showPosts && (
        <UserPost
          userId={user.id}
          userName={user.name}
          asTableRow={true}
          autoFetch={true}
        />
      )}
    </>
  );
}

export default UserDetail;
