import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
// @ts-ignore
import Article from '../components/Article.vue';
import PostList from '@/components/PostList.vue';
// @ts-ignore
import UserInfo from '@/components/UserInfo.vue'
import Slidebar from '@/components/SlideBar.vue'

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'root',
    components: {
      main: PostList
    }
  },
  {
    path: '/topic/:id&author=:name',
    name: 'post_content',
    components: {
      main: Article,
      slidebar:Slidebar
    }
  },
  {
    path: '/userinfo/:name',
    name: 'user_info',
    components:{
      main: UserInfo
    }
  }



  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  routes
})

export default router
