import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: '/api/1.0/',
  timeout: 15000
})

service.interceptors.request.use(
  config => {
    if (store.getters.accessToken) {
      config.headers['Authorization'] = `Bearer ${getToken()}`
    }
    return config
  }, error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(response => {
  const res = response.data
  if (res.code !== 200) {
    Message({
      message: res.msg,
      type: 'error',
      duration: 5 * 1000
    })

    if (res.code === 401) {
      MessageBox.confirm('已被登出，可留在此页面或重新登录', '登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('fedLogOut').then(() => {
          window.location.reload()
        })
      })
    }
    return Promise.reject('error')
  } else {
    return res
  }
}, error => {
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
