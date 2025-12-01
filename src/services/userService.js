import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const userService = {
  async getAllUsers() {
    try {
      const response = await axios.get(`${API_URL}/users`);
      return response.data;
    } catch (error) {
      throw new Error(`Không thể tải dữ liệu users: ${error.message}`);
    }
  },
};
