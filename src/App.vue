<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="slidebar"></router-view>
      <router-view name="main"></router-view>
    </div>
  </div>
</template>

<script>
  import Header from "@/components/Header";

  export default {
    name: 'APP',
    components: {
      Header
    }
  }

</script>

<style lang="scss">

  #app {
    background: #e1e1e1;
  }

  .main {
    width: 80%;
    margin: 10px auto;
    background: #e1e1e1;
    .logo {
      text-decoration: none;
    }
  }
</style>
