import request from '@/utils/request'

const login = (username, password) => {
  const data = {
    username, password
  }
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

const getUserInfo = () => {
  return request({
    url: '/account',
    method: 'get'
  })
}

export { login, getUserInfo }
