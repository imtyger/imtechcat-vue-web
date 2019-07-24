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
    url: '/bloglistbyinput',
    method: 'get',
    params: input
  })
}

export { searchBookmarkListLikeMarkTitle, searchTagListLikeTagName, searchBlogListLikeInput }
