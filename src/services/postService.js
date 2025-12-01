import axios from "axios";

// Service để gọi API posts
const API_URL = "https://jsonplaceholder.typicode.com";

export const postService = {
  // Lấy danh sách posts của một user
  async getPostsByUserId(userId) {
    try {
      const response = await axios.get(`${API_URL}/posts?userId=${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Không thể tải dữ liệu posts: ${error.message}`);
    }
  },
};
