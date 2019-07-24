import request from '@/utils/request'

const getHomeTags = (query) => {
  return request({
    url: '/home/tags',
    method: 'get',
    params: query
  })
}

const deleteHomeTags = (data) => {
  return request({
    url: '/home/tags/delete',
    method: 'delete',
    data
  })
}

const updateHomeTags = (data) => {
  return request({
    url: '/home/tags/update',
    method: 'put',
    data
  })
}

const newHomeTags = (data) => {
  return request({
    url: '/home/tags/new',
    method: 'post',
    data
  })
}

const getBookmarkDefaultTagNames = () => {
  return request({
    url: '/home/tags/defaultname',
    method: 'get'
  })
}

const getBookmarkTagNamesLike = (query) => {
  return request({
    url: '/home/tags/likename',
    method: 'get',
    params: query
  })
}

const getTags = () => {
  return request({
    url: '/tags',
    method: 'get'
  })
}

export { getHomeTags, deleteHomeTags, updateHomeTags, newHomeTags, getBookmarkDefaultTagNames, getBookmarkTagNamesLike, getTags }
