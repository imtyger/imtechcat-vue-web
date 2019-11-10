import Vue from 'vue'
import Router from 'vue-router'
import HomeLayout from '../views/layout/Layout.vue'
import Layout from '@/components/Layout'
import { getToken } from '@/utils/auth'
import store from '@/store'

Vue.use(Router)

const whiteList = ['/', '/login', '/search','/search?q', '/about', '/bookmark', '/tags', '/tools']

export const constantRouteMap = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                component: () => import('../views/Index.vue')
            },
            {
                path: '/post/:id',
                component: () => import('../views/PostDetail.vue')
            },
            {
                path: '/tags/post/:tagName',
                component: () => import('../views/PostTagName.vue')
            },
            {
                path: '/search',
                component: () => import('../views/Search.vue')
            },
            {
                path: '/bookmark',
                component: () => import('../views/Bookmark.vue')
            },
            {
                path: '/tags',
                component: () => import('../views/Tags.vue')
            },
            {
                path: '/tools',
                component: () => import('../views/Tools.vue')
            },
            {
                path: '/about',
                component: () => import('../views/About.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/home',
        component: HomeLayout,
        redirect: '/home/bookmarks',
        children: [
            {
                path: 'bookmarks',
                component: () => import('../views/home/Bookmarks.vue')
            },
            {
                path: 'tags',
                component: () => import('../views/home/Tags.vue')
            },
            {
                path: 'blog',
                component: () => import('../views/home/blog/BlogList.vue')
            },
            {
                path: 'blog-new',
                component: () => import('../views/home/blog/NewBlog.vue')
            },
            {
                path: 'blog-edit/:id',
                component: () => import('../views/home/blog/EditBlog.vue')
            },
            {
                path: 'setting',
                component: () => import('../views/home/Set.vue')
            },
            {
                path: 'timeline',
                component: () => import('../views/home/Timeline.vue')
            }
        ]
    }
]

let router = new Router({
    routes: constantRouteMap
})

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/home' })
        } else {
            if (!store.getters.userId) {
                store.dispatch('getUserInfo').then(() => {
                    next({ ...to, replace: true })
                })
            }
            next()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1 || to.path.startsWith('/post/') || to.path.startsWith('/tags/post/')) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})

router.afterEach((to, from, next) => {
    setTimeout(() => {
        var _hmt = window._hmt || [];
        (function () {
            document.getElementById('baidu_tj') && document.getElementById('baidu_tj').remove()
            var hm = document.createElement('script')
            hm.src = 'https://hm.baidu.com/hm.js?57b35596da318b1076a18c694f0ed9a2'
            hm.id = 'baidu_tj'
            var s = document.getElementsByTagName('script')[0]
            s.parentNode.insertBefore(hm, s)
        })()
    }, 0)
})

export default router
