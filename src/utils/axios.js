import axios from 'axios'

const gAxios = axios.create({
  baseURL: 'http://192.168.0.100:8000'
})

gAxios.CancelToken = axios.CancelToken
gAxios.isCancel = axios.isCancel

gAxios.interceptors.request.use(async (config) => {
  return config
})

gAxios.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  console.log('error :: ', error);
});

export default gAxios
