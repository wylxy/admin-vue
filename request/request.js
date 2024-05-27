import axios from 'axios'
const instance = axios.create({
        baseURL: 'http://localhost:8081',
        timeout: 10000,
    })

//整体导出
export default instance;
