<template>
  <div>
    <div class="loading" v-if="isLoading">
      <img src="../assets/1.gif" alt="">
      <p>加载中...</p>
    </div>
    <div v-else class="article">
      <div class="topic_header">
        <div class="topic_title">{{post.title}}</div>
        <ul class="info">
          <li>• 发布于 : {{post.create_at | formatDate}}</li>
          <li>• 作者 ：{{post.author.loginname}}</li>
          <li>• {{post.visit_count}}次预览</li>
          <li>• 来自{{post | tabFormatter}}</li>
        </ul>
        <div v-html="post.content" class="topic_content"></div>
      </div>
      <div class="Reply">
        <div class="topber">回复</div>
        <div v-for="(reply,index) in post.replies" :key="index" class="replySec">
          <div class="replyUp">
            <router-link class="link-a" :to="{
            name:'user_info',
            params:{
              name:reply.author.loginname
            }
            }">
              <img :src="reply.author.avatar_url" alt="">
            </router-link>
            <router-link class="link-a" :to="{
            name:'user_info',
            params:{
              name:reply.author.loginname
            }
            }">
              <span>{{reply.author.loginname}}</span>
            </router-link>
            <span>
            {{index+1}}楼
          </span>
            <span v-if="reply.ups.length>0">
            {{reply.ups.length}}
          </span>
            <span v-else>

          </span>
          </div>
          <p v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">

  export default {
    name: "Article",
    data() {
      return {
        isLoading: false, //是否正在加载
        post: {} //代表当前文章页的所有内容
      }
    },
    methods: {
      getArticleData() {
        this.$http.get(`http://mock.hunger-valley.com/cnode/api/v1/topic/${this.$route.params.id}`)
          .then(res => {
            console.log(res)
            if (res.data.success == true) {
              this.isLoading = false;
              this.post = res.data.data;
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    beforeMount() {
      this.isLoading = true;
      this.getArticleData();
    },
    watch:{
      '$route'(to,from) {
        this.getArticleData()
      }
    }
  }
</script>

<style scoped lang="scss">
  * {
    padding: 0;
    margin: 0;
  }


  /*加载中显示的*/
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

  .article {
      display: flex;
      flex-direction: column;
    /*头部信息*/
    .topic_header {
      display: flex;
      background-color: white;
      flex-direction: column;
      padding: 10px;

      .topic_content {
        padding: 5px 10px;
      }

      .topic_title {
        font-size: 20px;
        font-weight: 700;
        padding-top: 8px;
      }

      ul {
        display: flex;
        padding: 15px 0 5px 0;
        border-bottom: 1px solid #ccc;

        li {
          list-style: none;
          display: inline-block;
          font-size: 12px;
          color: #838383;
        }
      }

    }

    /*回复*/
    .Reply {
      margin-top: 15px;
      background-color: white;

      .replySec {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #e5e5e5;
        padding: 10px 10px;

        .replyUp {
          display: flex;
          align-items: center;
          font-size: 13px;
          color: #666;

          .link-a {
            text-decoration: none;
          }

          .link-a:not(:first-child) {
            margin: 0px 5px;
            font-size: 13px;
            color: #666;
          }
        }

        > p {
          padding: 5px 0px;
        }
      }

      .topber {
        padding: 10px;
        background-color: #f6f6f6;
        height: 16px;
        font-size: 12px;
        margin-top: 10px;
      }

      img {
        width: 30px;
        height: 30px;
      }
    }

  }

</style>