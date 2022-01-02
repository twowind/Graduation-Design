export default [
    {
        path: '/',
        component: '@/layouts/BaseLayout',
        routes: [
            {
                path: '/',
                component: '@/pages/Start'
            },
            {
                path: '/blog',
                component: '@/pages/Blog',
                routes: [
                    {
                        path: '/blog/edit',
                        component: '@/pages/Blog/edit',
                        wrappers: [
                            '@/wrappers/auth',
                        ]
                    },
                    {
                        path: '/blog/user',
                        component: '@/pages/Blog/user',
                        wrappers: [
                            '@/wrappers/auth',
                        ]
                    },
                    {
                        path: '/blog/explore',
                        component: '@/pages/Blog/explore',
                        routes: [
                            {
                                path: '/blog/explore/history',
                                component: '@/pages/Blog/explore/components/history',
                            },
                            {
                                path: '/blog/explore/search',
                                component: '@/pages/Blog/explore/components/strict-search',
                            },
                        ]
                    },
                    {
                        path: '/blog/content/:articleId',
                        component: '@/pages/Blog/content',
                    },
                    {
                        path: '/blog/set',
                        component: '@/pages/Blog/Set',
                        wrappers: [
                            '@/wrappers/auth',
                        ],
                        routes: [
                            {
                                path: '/blog/set/account',
                                component: '@/pages/Blog/Set/account',
                            },
                            {
                                path: '/blog/set',
                                component: '@/pages/Blog/Set/profile',
                            },
                        ]
                    },
                    {
                        path: '/blog/profile',
                        component: '@/pages/Blog/profile',
                        wrappers: [
                            '@/wrappers/auth',
                        ]
                    },
                    {
                        path: '/blog/other/:username',
                        component: '@/pages/Blog/other-profile',
                    },
                ]
            }
        ]
    },
]