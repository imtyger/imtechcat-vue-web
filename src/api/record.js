import request from '@/utils/request'

const getLoginInfo = (query) => {
    return request({
        url: '/home/record/login',
        method: 'get',
        params: query
    })
}

export { getLoginInfo }