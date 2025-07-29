const API_BASE_URL = 'http://localhost:5000/api';

const api = {
    getMyProjects: () => api.request('/projects/myprojects'),
    async request(endpoint, { body, ...customConfig } = {}) {

        const token = localStorage.getItem('token');
        const headers = { 'Content-Type': 'application/json' };
        if (token) {
            headers['x-auth-token'] = token;
        }

        const config = {
            method: body ? 'POST' : 'GET',
            ...customConfig,
            headers: {
                ...headers,
                ...customConfig.headers,
            },
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            if (!response.ok) {
                const error = await response.json();
                return Promise.reject(error);
            }
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                return response.json();
            }
            return {};

        } catch (error) {
            return Promise.reject({ msg: 'Network error or server is down.' });
        }
    },

    login: (credentials) => api.request('/auth/login', { body: credentials }),
    register: (userData) => api.request('/auth/register', { body: userData }),
    getMe: () => api.request('/auth/me'),
    getProjects: () => api.request('/projects'),
    getProject: (id) => api.request(`/projects/${id}`),
    createProject: (projectData) => api.request('/projects', { body: projectData, method: 'POST' }),
    addComment: (projectId, commentData) => api.request(`/projects/${projectId}/comments`, { body: commentData, method: 'POST' }),
    search: (query) => api.request(`/search?q=${encodeURIComponent(query)}`),
};

export default api;