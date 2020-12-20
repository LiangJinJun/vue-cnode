<template>
  <div class="UserInfo">
    <!--在数据未返回的时候，显示这个正在加载的gif-->
    <div class="loading" v-if="isLoading">
      <img src="../assets/1.gif" alt="">
      <p>加载中...</p>
    </div>
    <div class="userInfomation">
      <section>
        <img :src="userinfo.avatar_url" alt="">
        <span>{{userinfo.loginname}}</span>
        <p>
          {{userinfo.score}}积分
        </p>
        <p>
          注册时间：{{userinfo.create_at|formatDate}}
        </p>
      </section>
      <div class="replies">
        <p>回复的主题</p>
        <ul>
          <li v-for="item in userinfo.recent_replies">
            <router-link class="logo" :to="{
              name:'post_content',
              params:{
                id:item.id
              }
            }">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="topics">
        <p>创建的主题</p>
        <ul>
          <li v-for="item in userinfo.recent_topics">
            <router-link class="logo" :to="{
              name:'post_content',
              params:{
                id:item.id
              }
            }">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="js">

  export default {
    name: "UserInfo",
    data() {
      return {
        isLoading: false,
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
    beforeMount() {
      this.isLoading = true;
      this.getData();
    }
  }
</script>

<style scoped lang="scss">
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

  .userInfomation {
    section {
      background-color: white;
      padding: 10px;

      img {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
    }

    .replies {
      /*margin-top: 15px;*/
      background-color: white;
      font-size: .72rem;
      border-top: 10px solid #ddd;

      > p {
        padding: 12px 0 12px 12px;
        background-color: hsla(0, 8%, 82%, .17);
        font-size: .75rem;
        margin: 0;
      }

      ul {
        font-size: .72rem;

        li {
          list-style: none;
          padding: 4px 0 4px 12px;
          white-space: nowrap;
          font-size: .72rem;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 30px;
          vertical-align: middle;

          .logo {
            color: #094e99;
          }
        }
      }
    }

    /*创建主题*/
    .topics {
      /*margin-top: 15px;*/
      background-color: white;
      font-size: .72rem;

      > p {
        padding: 12px 0 12px 12px;
        background-color: hsla(0, 8%, 82%, .17);
        font-size: .75rem;
        margin: 0;
      }

      ul {
        font-size: .72rem;

        li {
          list-style: none;
          padding: 4px 0 4px 12px;
          white-space: nowrap;
          font-size: .72rem;
          text-overflow: ellipsis;
          overflow: hidden;
          line-height: 30px;
          vertical-align: middle;

          .logo {
            color: #094e99;
          }
        }
      }
    }
  }


</style>