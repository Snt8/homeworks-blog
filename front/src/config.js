// API Configuration
// Change API_BASE_URL for different environments
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5153';

export const API_ENDPOINTS = {
  // Auth endpoints
  register: `${API_BASE_URL}/api/users/register`,
  login: `${API_BASE_URL}/api/users/login`,

  // User endpoints
  enrollCourse: `${API_BASE_URL}/api/users/{userId}/enroll/{courseId}`,
  updateUser: `${API_BASE_URL}/api/users/{userId}`,
  deleteUser: `${API_BASE_URL}/api/users/{userId}`,

  // Course endpoints
  getCourses: `${API_BASE_URL}/api/courses`,
  createCourse: `${API_BASE_URL}/api/courses/create`,
  getCourse: `${API_BASE_URL}/api/courses/{courseId}`,
  updateCourse: `${API_BASE_URL}/api/courses/{courseId}`,
  deleteCourse: `${API_BASE_URL}/api/courses/{courseId}`,

  // Homework endpoints
  createHomework: `${API_BASE_URL}/api/homeworks/create`,
  getCourseHomeworks: `${API_BASE_URL}/api/homeworks/lookup`,
  updateHomework: `${API_BASE_URL}/api/homeworks/{homeworkId}`,
  deleteHomework: `${API_BASE_URL}/api/homeworks/delete`,

  // Comment endpoints
  createComment: `${API_BASE_URL}/api/comments/create`,
  getHomeworkComments: `${API_BASE_URL}/api/comments`,
  updateComment: `${API_BASE_URL}/api/comments/update`,
  deleteComment: `${API_BASE_URL}/api/comments/delete`,
};

export default API_BASE_URL;
