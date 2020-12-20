<template>
  <div class="autherinfo">
    <div class="authersummay">
      <div class="topbar">作者</div>
      <router-link :to="{
      name:'user_info',
      params:{
          name:userinfo.loginname
      }
      }">
        <img :src="userinfo.avatar_url" alt="">
      </router-link>
    </div>
    <div class="recent_topics">
      <div class="topbar">作者最近主题</div>
      <ul>
        <li v-for="list in topcilimitby5">
          <router-link class="link-a" :to="{
                name:'post_content',
                params:{
                  id:list.id,
                  name:list.author.loginname
                }
              }">
            {{list.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="topbar">作者最近回复</div>
      <ul>
        <li v-for="list in replylimitby5">
          <router-link class="link-a" :to="{
                name:'post_content',
                params:{
                  id:list.id,
                  name:list.author.loginname
                }
              }">
            {{list.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="js">

  export default {
    name: "SlideBar",
    data() {
      return {
        userinfo: {}
      }
    },
    methods: {
      getData() {
        this.$http.get(`http://mock.hunger-valley.com/cnode/api/v1/user/${this.$route.params.name}`)
          .then(res => {
            console.log(res)
            this.isLoading = false; //加载成功,去除动画
            this.userinfo = res.data.data;
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    computed: {
      topcilimitby5() {
        if (this.userinfo.recent_topics) {
          return this.userinfo.recent_topics.slice(0, 5)
        }
      },
      replylimitby5() {
        if (this.userinfo.recent_replies) {
          return this.userinfo.recent_replies.slice(0, 5)
        }
      }
    },
    beforeMount() {
      this.isLoading = true
      this.getData();
    }

  }
</script>

<style scoped lang="scss">
  .autherinfo {
    width: 328px;
    float: right;
    margin-top: 0;
    margin-left: 10px;

    .topbar {
      padding: 10px;
      background-color: #f6f6f6;
      height: 16px;
      font-size: 12px;
    }

    .authersummay {
      img {
        border-radius: 3px;
        margin: 10px;
        height: 48px;
        width: 48px;
        border: 1px solid #ccc;
      }
    }

    .authersummay, .recent_replies, .recent_topics {
      background-color: white;
      margin-bottom: 10px;
    }

    li {
      padding: 3px 0;
    }

    .recent_replies ul, .recent_topics ul {
      margin-top: 0px;
      margin-bottom: 0px;
      list-style: none;
      padding-left: 14px;
    }

    .recent_replies {
      .link-a {
        font-size: 12px;
        text-decoration: none;
        color: #778087;
      }
    }

    .recent_topics {
      .link-a {
        font-size: 12px;
        text-decoration: none;
        color: #778087;
      }
    }


  }
</style>