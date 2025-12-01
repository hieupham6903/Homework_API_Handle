import { useState, useMemo } from "react";
import { useUsers } from "../hooks/useUsers";
import { useDebounce } from "../hooks/useDebounce";
import UserDetail from "./UserDetail";

function UserList() {
  const { users, isLoading, error, fetchUsers, deleteUser } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const filteredUsers = useMemo(() => {
    if (!debouncedSearchTerm) return users;
    return users.filter((user) =>
      user.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [users, debouncedSearchTerm]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) =>
      sortOrder === "A-Z"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [filteredUsers, sortOrder]);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + usersPerPage);

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === "A-Z" ? "Z-A" : "A-Z");
  };

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(1, prev - 1));

  if (isLoading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
        <p className="mt-3">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Lỗi!</h4>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => fetchUsers()}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-center">Danh Sách Người Dùng</h1>

      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Tìm kiếm theo tên..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
        <div className="col-md-6 mb-2">
          <button className="btn btn-secondary w-100" onClick={handleSort}>
            Sắp xếp: {sortOrder}
          </button>
        </div>
      </div>

      <div className="mb-3">
        <p className="text-muted">
          Tìm thấy: <strong>{sortedUsers.length}</strong> người dùng
        </p>
      </div>

      {currentUsers.length === 0 ? (
        <div className="alert alert-info">Không tìm thấy người dùng nào.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Tên</th>
                  <th>Email</th>
                  <th>Điện thoại</th>
                  <th>Công ty</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <UserDetail key={user.id} user={user} onDelete={deleteUser} />
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-4">
              <button
                className="btn btn-outline-primary"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Trang {currentPage} / {totalPages}
              </span>
              <button
                className="btn btn-outline-primary"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default UserList;
