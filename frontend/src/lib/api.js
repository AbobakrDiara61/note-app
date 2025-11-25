
const api = import.meta.env.MODE === "development" ? 'http://localhost:3000/api' : '/api';

export default api