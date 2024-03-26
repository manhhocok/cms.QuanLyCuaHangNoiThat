import axios from 'axios';

// Đặt cấu hình mặc định lúc tạo ra instance
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

export const get = async (path: string, options = {}) => {
  const response = await instance.get(path, options);
  return response.data;
};

export const remove = async (path: string, options = {}) => {
  const response = await instance.delete(path, options);
  return response.statusText;
};

export const post = async (path: string, options = {}) => {
  const response = await instance.post(path, options);
  return response;
};
export const patch = async (path: string, options = {}) => {
  const response = await instance.patch(path, options);
  return response;
};

export default instance;
