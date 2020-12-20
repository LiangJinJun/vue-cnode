<template>
  <div class="PostList">
    <div class="loading" v-if="isLoading">
      <img src="../assets/1.gif" alt="">
      <p>加载中...</p>
    </div>
    <!--代表我们主题帖子列表-->
    <div class="posts" v-else>
      <ul>
        <li>
          <div class="toobar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <li v-for="(post,index) in posts" :key="index">
          <!--头像-->
          <img :src="post.author.avatar_url" alt="" class="logo">
          <!--回复/浏览-->
          <span class="allcount">
              <span class="reply_count">{{post.reply_count}}</span>
                /{{post.visit_count}}
          </span>
          <!--帖子的分类-->
          <span
            :class="[{put_good:(post.good===true),put_top:(post.top===true),'topiclist-tab':(post.good!=true&&post.top!=true)}]">
            <span>
              {{post | tabFormatter}}
            </span>
          </span>
          <span class="right1">
          <!--标题-->
            <router-link :to="{name:'post_content',
            params:{
              id:post.id,
              name:post.author.loginname
            }}" class="link-a">
              <span class="overflow">
                  {{post.title}}
              </span>
            </router-link>

            <!--最终回复时间-->
              <span class="time">
                  {{post.last_reply_at | formatDate}}
              </span>
          </span>
        </li>
        <li class="footer">
          <Pagination @handleList="renderList()"></Pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="js">

  import Pagination from "@/components/Pagination";

  export default {
    name: "PostList",
    components: {
      Pagination
    },
    data() {
      return {
        isLoading: false,
        posts: [],/*代表页面的列表的数组*/
        postpage: 1
      }
    },
    methods: {
      getData() {
        this.$http.get('http://mock.hunger-valley.com/cnode/api/v1/topics', {
          params: {
            page: this.postpage,
            limit: 20
          }
        })
          .then(res => {
            this.isLoading = false;  /*加载成功去除动画*/
            this.posts = res.data.data
            console.log(res)
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      renderList(value) {
        this.postpage = value;
        this.getData();
      }
    },
    mounted() {
      console.log(this.posts)
    },
    beforeMount() {
      this.isLoading = true; /*在加载成功之前显示加载动画*/
      this.getData();/*在页面加载之前获取数据*/
    }
  }
</script>

<style scoped lang="scss">
  * {
    padding: 0;
    margin: 0;
  }

  .loading {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;

    > img {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }

    > p {
      position: absolute;
      top: 50%;
      left: 50%;
      color: blue;
      transform: translate(-50%, -50%);
    }
  }

  .posts {
    ul {
      overflow: hidden;


      li {
        list-style: none;
        /*background-color: red;*/
        padding: 10px;
        /*border-bottom: 1px solid #ccc;*/
        display: flex;
        /*justify-content: center;*/
        align-items: center;

        .toobar {
          height: 40px;
          width: 100%;
          background-color: #f5f5f5;
          display: flex;
          /*justify-content: center;*/
          align-items: center;

          span {
            font-size: 14px;
            color: #80bd01;
            line-height: 40px;
            margin: 0 10px;
            cursor: pointer;

            &:hover {
              color: #8e78c0;
            }
          }
        }

        &:first-child {
          padding: 0;
          /*border-bottom: none;*/
        }

        &:not(:first-child) {
          padding: 9px;
          font-size: 15px;
          font-family: Helvetica Neue, Luxi Sans, DejaVu Sans, Tahoma, Hiragino Sans GB, STHeiti, sans-serif !important;
          font-weight: 400;
          background-color: white;
          color: #333;
          border-top: 1px solid #f0f0f0;
        }

        &:not(:first-child):hover {
          background-color: #f5f5f5;
        }

        &:last-child {
          /*border-bottom: 1px solid #f0f0f0;*/
        }

        .put_good, .put_top {
          background: #80bd01;
          padding: 2px 4px;
          border-radius: 3px;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          -o-border-radius: 3px;
          color: #fff;
          font-size: 12px;
          margin-right: 10px;
        }

        .topiclist-tab {
          background: #e5e5e5;
          color: #999;
          padding: 2px 4px;
          border-radius: 3px;
          -webkit-border-radius: 3px;
          -webkit-border-radius: 3px;
          -moz-border-radius: 3px;
          -o-border-radius: 3px;
          font-size: 12px;
          margin-right: 10px;
        }

        .allcount {
          font-size: 12px;
          width: 88px;
          text-align: center;
        }

        .reply_count {
          color: #9e78c0;
          font-size: 14px;
        }

        .logo {
          width: 30px;
          height: 30px;
          vertical-align: middle;
          cursor: pointer;
        }

        .right1 {
          display: flex;
          flex: 1;
          justify-content: space-between;

          .overflow {

          }

          .overflow:hover {
            cursor: pointer;
            text-decoration: underline;
          }

          .time {
            text-align: right;
            min-width: 50px;
            display: inline-block;
            white-space: nowrap;
            float: right;
            color: #778087;
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        .link-a {
          color: #000;
          text-decoration: none;
        }
      }


    }
  }

</style>