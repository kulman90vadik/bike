import axios from "axios"
const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })

instance.interceptors.request.use(config => {
    // config.headers.Authorization = window.localStorage.getItem('token');

    const pathname = window.location.pathname
    const token = pathname.startsWith("/admin") ? localStorage.getItem("adminToken") : localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default instance
