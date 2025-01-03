<template>
  <el-container class="mainContainer">
    <el-header class="mainHeader">
      <div class="leftLoginDiv">
        <a v-if="!isLogin" @click="jumpLoginByUp" class="loginOrRegisterLink">请先登录</a>
        <a v-if="!isLogin" @click="jumpRegedit" class="loginOrRegisterLink">注册</a>
        <div v-else class="userBg" @click="jumpSelfInfo"></div>
      </div>
    </el-header>
    <el-container class="mainContentDiv">
      <el-aside>
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="activeIndex"
            text-color="#fff"
            @select="handleSelect"
        >
          <el-menu-item index="1">
            <el-icon><i class="el-icon-location"></i></el-icon>
            <span>查看全部信息</span>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><i class="el-icon-document"></i></el-icon>
            <span>个人信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import {LOGIN_BY_UP_PATH_MSG, MAIN_SELF_PATH_MSG, MAIN_USERS_PATH_MSG, REGEDIT_PATH_MSG} from "@/ConstMsg/CommonMsg";

export default {
  name: "MainView",
  data() {
    return {
      activeIndex:'1',
    };
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log('handleSelect', key, keyPath);
      // 在这里处理菜单项点击事件，如导航到对应的路由
      console.log(key,keyPath)
      if (key === '1') {
        this.$router.push(MAIN_USERS_PATH_MSG)
      }
      else if(key === '2') {
        this.$router.push(MAIN_SELF_PATH_MSG)
      }
    },
    jumpSelfInfo() {
      if(this.$store.state.isLogin) {
        this.activeIndex = '2';
        this.$router.push(MAIN_SELF_PATH_MSG)
      }
    },
    jumpLoginByUp() {
      this.$router.push(LOGIN_BY_UP_PATH_MSG);
    },
    jumpRegedit() {
      this.$router.push(REGEDIT_PATH_MSG);
    },
    beforeMount () {
      //有token值就是登录？
      let user = localStorage.getItem("user");
      if( user === null ) {
        this.$store.state.isLogin = false;
      } else {
        this.$store.state.isLogin = true;
      }

    }
  }
}
</script>


<style scoped>
  .mainHeader {
    display: flex;
    align-content: center;
    justify-content: end;
    background-color: greenyellow;
    height: 60px;
  }

  .userImage {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .leftLoginDiv {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .el-side {
    height: 80%;
  }

  .mainContentDiv {
    width: 100%;
    height: calc(100% - 60px);
  }

  .mainContainer {
    height: 100%;
  }

  .mainContentDiv .el-main {
    padding: 10px;
  }

  .userBg {
    width: 50px;
    height: 50px;
    background-size: cover;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-position: center;
    background-origin: border-box;
    background-image: url("https://tse1-mm.cn.bing.net/th/id/OIP-C.i0PxkbYvoZKnJbU4U0vJHQHaEK?rs=1&pid=ImgDetMain");
    margin-top: 5px;
  }

  .loginOrRegisterLink {
    text-decoration: none;
    vertical-align: middle;
    height: 60px;
    line-height: 60px;
  }

  .loginOrRegisterLink:hover {
    text-decoration: none;
    color: rgb(222, 62, 62);
  }

</style>
