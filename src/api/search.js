import request from '@/utils/request'

const searchBookmarkListLikeMarkTitle = (input) => {
  return request({
    url: '/bookmarksbytitle',
    method: 'get',
    params: input
  })
}

const searchTagListLikeTagName = (input) => {
  return request({
    url: '/tagsbyname',
    method: 'get',
    params: input
  })
}

const searchBlogListLikeInput = (input) => {
  return request({
    url: '/search',
    method: 'get',
    params: {
      q: input
    }
  })
}

export { searchBookmarkListLikeMarkTitle, searchTagListLikeTagName, searchBlogListLikeInput }
