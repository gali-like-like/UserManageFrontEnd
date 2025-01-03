<template>
  <router-view></router-view>
</template>

<script>
// import LoginView from "@/view/LoginByUPView.vue";


// import LoginRegeditView from "@/view/LoginRegeditView.vue";

export default {
  name: 'App',
  data() {
    return {
      checked:true,
      password:''
    }
  },
  mounted() {
    document.title = "SpringBoot资料网"
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
