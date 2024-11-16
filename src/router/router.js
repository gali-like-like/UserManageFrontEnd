import { createRouter,createWebHashHistory } from 'vue-router'
import {LOGIN_BY_UP_PATH_MSG} from "@/ConstMsg/CommonMsg";
const routes = [
    {
        path: '/main',
        component:() => import('../view/LoginRegeditView.vue'),
        children:[
            {
                path: 'login/up',
                component:() => import('../view/LoginByUPView.vue'),
            },
            {
                path: 'regedit',
                component:() => import('../view/RegeditView.vue'),
            },
            {
                path:"login/phone",
                component:() => import('../view/LoginByPhoneView.vue')
            }
        ]
    },
    {
        path:"/index",
        component:() => import('../view/MainView.vue'),
        children: [
            {
                path:"/index/users",
                component:() => import("../view/SelectPageView.vue")
            }
        ]
    },
    {
        path:'/404',
        name:"NotFound",
        component:() => import('../view/NotFoundView.vue'),
    },
    {
        // 配置其他路径,如果没找到就显示NotFound视频
        path: "/:pathMatch(.*)",
        redirect: "/404"
        // component: () => import( '../views/NotFound.vue')
    },
    {
        path: "/",
        redirect: LOGIN_BY_UP_PATH_MSG,
    }
]

const router = createRouter({
    // history: createWebHistory(),
    history:createWebHashHistory(),
    routes,
})

export default router;
