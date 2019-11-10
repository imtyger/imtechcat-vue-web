import request from '@/utils/request'

const getHomeBlogList = (query) => {
  return request({
    url: '/home/blogs',
    method: 'get',
    params: query
  })
}

const deleteHomeBlog = (data) => {
  const id = data.id;
  return request({
    url: '/home/blog/delete/' + id,
    method: 'delete',
    params: id
  })
}

const updateHomeBlog = (data) => {
  return request({
    url: '/home/blog/update',
    method: 'put',
    data
  })
}

const getHomeBlogById = (id) => {
  return request({
    url: '/home/blog-edit/' + id,
    method: 'get',
    params: id
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

const updateHomeBlogByIdAndStatus = (id,status) => {
  return request({
    url: '/home/blog/update/' + id + '/' + status,
    method: 'put',
    params: {
      id, status
    }
  })
}

const getBlogsPostTagName = (tagName) => {
  return request({
    url: '/tags/post/' + tagName,
    method: 'get',
    params: tagName
  })
}

const getAbout = () => {
  return request({
    url: '/about',
    method: 'get',
  })
}

export { getHomeBlogList, deleteHomeBlog, updateHomeBlog, getHomeBlogById, updateHomeBlogByIdAndStatus, newHomeBlog, getBlogList, getBlogPostId, getBlogsPostTagName, getAbout }
