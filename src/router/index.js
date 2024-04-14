import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import ListView from '../views/ListView/index'
import { createRouter, createWebHistory } from 'vue-router';

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login',
    component:Login
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path:'/',
    redirect:'/home',
   
    component:() =>import('../layout/Layout.vue'),
    children:[
      {
        path:'/home',
        meta:{
          title:'首页'
        },
        name:'main',
        component:() =>import('../views/HomeView.vue'),
      },
    
    ]
  },
 {
  path:'/loan',
 redirect:'/loan/indexview',
 component:()=>import('../layout/Layout.vue'),
 children:[
  {
    meta:{
      title:'带宽申请'
    },
    path:'/loan/indexview',
    name:'loan-input',
    component:() =>import('../views/loan/IndexView.vue'),
  }
 ]
 },

 {
  path: "/ListView",
  component:()=>import('../layout/Layout.vue'),
  redirect: "/ListView/index",
  meta: {
    roles: [
      "input"
    ],
    title: "申请管理"
  },
  children: [
    {
      path: "/ListView/index",
      component: ()=> import("../views/ListView/index.vue"),
      name: "/ListView",
       meta: {
        title: "查看列表"
      }
    }
  ]
},
{
  path: "/loan-approve",
  component:()=>import('../layout/Layout.vue'),
  redirect: "/loan-approve/first",
  meta: {
    roles: [
      "approve"
    ],
    title: "带宽审批"
  },
  children: [
    {
      path: "/loan-approve/first",
      component: ()=> import("../views/loan-approve/first.vue"),
      name: "first",
       meta: {
        title: "初审"
      }
    },
    {
      path: "/loan-approve/end",
      component: ()=> import("../views/loan-approve/end.vue"),
      name: "end",
       meta: {
        title: "终审"
      }
    }
  ]
},
{
  path: "/contract",
  component:()=>import('../layout/Layout.vue'),
  redirect: "/contract/list",
  meta: {
   
    title: "合同管理"
  },
  children: [
    {
      path: "/contract/list",
      component: ()=> import("../views/contract/list.vue"),
      name: "list",
       meta: {
        title: "合同列表"
      }
    }
  ]
},
{
  path: "/permission",
  component:()=>import('../layout/Layout.vue'),
  redirect: "/permission/create",
  meta: {
   
    title: "权限管理"
  },
  children: [
    {
      path: "/permission/create",
      component: ()=> import("../views/permission/create.vue"),
      name: "create",
       meta: {
        title: "创建管理员"
      }
    },
    {
      path: "/permission/list",
      component: ()=> import("../views/permission/list.vue"),
      name: "list0",
       meta: {
        title: "列表"
      }
    }
  ]
},

]
 

const router = new VueRouter({
  routes
})

export default router
