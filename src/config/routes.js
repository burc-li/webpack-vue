// import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    // 重定向
    redirect: '/todo/1',
  },
  {
    // 路由传参 /todo/xxx
    path: '/todo/:id',
    // path: '/todo',

    // 推荐 会把 id 作为 props 传递到 todo组件
    // props: true,
    // // props: (route) => ({ id: route.query.b }),

    // component: Todo,
    // 异步路由，提高首屏加载速度
    // component: resolve => require(['../views/todo/todo.vue'], resolve),
    component: () => import('../views/todo/todo.vue'),

    // 给路由命名  使用：<router-link :to="{name: 'burcTodo'}">跳转todo</router-link>
    name: 'burcTodo',

    // 元信息
    meta: {
      title: 'this is todo',
      description: 'todo描述',
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },

    // 局部路由守卫 跳转到路由 /todo/:id 之前 执行
    // beforeEach (to, from, next) {
    //   console.log('to', to)
    //   console.log('from', from)
    //   if (to) {
    //     // 禁止跳转
    //     // next(false)

    //     // 跳转到指定页面
    //     // next('/login')
    //     // next({ path: '/login' })

    //     // 允许跳转
    //     next()
    //   } else {
    //     // 允许跳转
    //     next()
    //   }
    // }
    children: [
      {
        path: 'child', // 以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”
        component: Login,
      },
    ],
  },
  {
    path: '/login',
    // component: Login
    // 异步路由，提高首屏加载速度
    // component: resolve => require(['../views/login/login.vue'], resolve)
    component: () => import('../views/login/login.vue'),
  },
]
