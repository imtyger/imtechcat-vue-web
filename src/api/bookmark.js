import request from '@/utils/request'

const getHomeBookmarks = (query) => {
  return request({
    url: '/home/bookmarks',
    method: 'get',
    params: query
  })
}

const deleteHomeBookmarks = (data) => {
  const id = data.id;
  return request({
    url: '/home/bookmarks/delete/' + id,
    method: 'delete',
    params: id
  })
}

const updateHomeBookmarks = (data) => {
  return request({
    url: '/home/bookmarks/update',
    method: 'put',
    data
  })
}

const newHomeBookmarks = (data) => {
  return request({
    url: '/home/bookmarks/new',
    method: 'post',
    data
  })
}

const getBookmarkList = () => {
  return request({
    url: '/bookmarks',
    method: 'get'
  })
}

export { getHomeBookmarks, deleteHomeBookmarks, updateHomeBookmarks, newHomeBookmarks, getBookmarkList }
