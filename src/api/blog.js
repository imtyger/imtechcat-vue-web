import request from '@/utils/request'

const getHomeBlogList = (query) => {
  return request({
    url: '/home/blogs',
    method: 'get',
    params: query
  })
}

const deleteHomeBlog = (data) => {
  return request({
    url: '/home/blog/delete',
    method: 'delete',
    data
  })
}

const updateHomeBlog = (data) => {
  return request({
    url: '/home/blog/update',
    method: 'put',
    data
  })
}

const newHomeBlog = (data) => {
  return request({
    url: '/home/blog/new',
    method: 'post',
    data
  })
}

const getBlogList = (query) => {
  return request({
    url: '/blogs',
    method: 'get',
    params: query
  })
}

const getBlogPostId = (id) => {
  return request({
    url: '/blogs/post/' + id,
    method: 'get',
    params: id
  })
}

const getBlogsPostTagName = (tagName) => {
  return request({
    url: '/tags/post/' + tagName,
    method: 'get',
    params: tagName
  })
}

export { getHomeBlogList, deleteHomeBlog, updateHomeBlog, newHomeBlog, getBlogList, getBlogPostId, getBlogsPostTagName }
