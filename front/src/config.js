// API Configuration
// Change API_BASE_URL for different environments
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5153';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/api/auth/register`,
  login: `${API_BASE_URL}/api/auth/login`,
  logout: `${API_BASE_URL}/api/auth/logout`,
  getUserCourses: `${API_BASE_URL}/api/users/courses`,
  getCourseHomeworks: `${API_BASE_URL}/api/courses/{courseId}/homeworks`,
  getHomeworkComments: `${API_BASE_URL}/api/homeworks/{homeworkId}/comments`,
  postComment: `${API_BASE_URL}/api/homeworks/{homeworkId}/comments`,
  // Agrega más endpoints según necesites
};

export default API_BASE_URL;
