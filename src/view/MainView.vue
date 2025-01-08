<template>
  <el-container class="mainContainer">
    <el-header class="mainHeader">
      <div class="leftLoginDiv">
        <a v-if="!$store.state.userInfo.isLogin" @click="jumpLoginByUp" class="loginOrRegisterLink">请先登录</a>
        <a v-if="!$store.state.userInfo.isLogin" @click="jumpRegedit" class="loginOrRegisterLink">注册</a>
        <img v-else :src="$store.state.userInfo.image" alt="头像" @click="jumpSelfInfo" class="userBg">
<!--        <div v-else class="userBg" @click="jumpSelfInfo"></div>-->
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
    }
  },
  //生命周期不在method里面
  beforeMount () {
    //有token并且有username为登录中
    let user = localStorage.getItem("user");
    console.log( user );
    console.log(`username : ${this.$store.state.userInfo.username}`);
    if( user !== null && this.$store.state.userInfo.username) {
      this.$store.state.userInfo.isLogin = true;
    } else {
      this.$store.state.userInfo.isLogin = false;
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
    width: 1200px;
  }

  .mainContentDiv .el-main {
    padding: 10px;
  }

  .userBg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 5px;
    line-height: 50px;
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

  body {
    width: 100vw;
    display: flex;
    justify-content: center;
    align-content: flex-start;
  }

</style>
