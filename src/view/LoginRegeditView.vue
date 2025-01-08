<script>
import {LOGIN_BY_UP_PATH_MSG, REGEDIT_PATH_MSG} from "@/ConstMsg/CommonMsg";

export default {
  name: "LoginRegeditView",
  methods: {
    jumpLogin() {
      this.$router.push(LOGIN_BY_UP_PATH_MSG)
    },
    jumpRegedit() {
      this.$router.push(REGEDIT_PATH_MSG)
    }
  }
}
</script>

<template>
  <el-row justify="center" class="first-row" style="margin-top: 20px;margin-bottom: 20px">
    <el-col :span="6">
      <el-text type="primary" size="large" >欢迎来到SpringBoot资料网</el-text>
<!--      <el-button-group size="large">-->
<!--        <el-button type="primary" size="large" @click="jumpLogin">-->
<!--            <el-text type="warning">登录页面</el-text>-->
<!--        </el-button>-->
<!--        <el-button type="primary" size="large" @click="jumpRegedit">-->
<!--            <el-text type="warning">注册页面</el-text>-->
<!--        </el-button>-->
<!--      </el-button-group>-->
    </el-col>
  </el-row>
  <router-view/>
</template>

<style>
body {
  border: 0;
  padding:0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>
