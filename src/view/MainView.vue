<template>
  <el-container>
    <el-header>
      <el-row :gutter="20" justify="end">
        <el-col :span="4">
          <el-link v-if="!isLogin" underline="underline" @click="jumpLoginByUp">请先登录</el-link>
          <el-link v-if="!isLogin" @click="jumpRegedit" underline="underline">注册</el-link>
          <el-link v-else>
            <el-icon>
              <User/>
            </el-icon>
          </el-link>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" style="height:200px">
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
import {User} from "@element-plus/icons-vue";

export default {
  name: "MainView",
  components: {User},
  data() {
    return {
      activeIndex:'1',
      isLogin:true
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
    jumpLoginByUp() {
      this.$router.push(LOGIN_BY_UP_PATH_MSG);
    },
    jumpRegedit() {
      this.$router.push(REGEDIT_PATH_MSG);
    }
  }
}
</script>


<style scoped>
</style>
