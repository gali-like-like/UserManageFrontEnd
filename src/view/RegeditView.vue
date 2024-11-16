<template>
  <el-row :gutter="20" justify="center" class="rows">
    <el-col :span="6">
      <el-input placeholder="请输入昵称" type="text" v-model="$store.state.userInfo.name">
        <template #prefix>
          <el-icon>
            <User />
          </el-icon>
        </template>
      </el-input>
    </el-col>
  </el-row>
  <GetCheckCodeComp></GetCheckCodeComp>
  <el-row :gutter="20" justify="center" class="rows">
    <el-col :span="6">
      <el-button type="primary" style="width: 100%" @click="regedit">注册</el-button>
    </el-col>
  </el-row>

  <el-row :gutter="20" justify="center" class="rows">
    <el-col :span="6">
      <el-button type="primary" style="width:100%" @click="jumpLogin">登录</el-button>
    </el-col>
  </el-row>

</template>

<script>

import {User} from "@element-plus/icons-vue";
import {LOGIN_BY_UP_PATH_MSG, LOGIN_BY_PHONE_PATH_MSG} from "@/ConstMsg/CommonMsg";
import axios from "axios";
import {open} from "@/ConstMsg/NormalMethod";
import GetCheckCodeComp from "@/components/GetCheckCodeComp.vue";
export default {
  name: "RegeditView",
  components: {GetCheckCodeComp, User},
  data() {
    return {
      getCodeInterval: 60,
      getCodeMsg:"获取验证码",
      isSend: false,
      intervalId: null,
      code:''
    }
  },

  methods: {
    jumpLogin() {
      this.$router.push(LOGIN_BY_UP_PATH_MSG)
    },
    regedit() {
      axios({
        url: this.$store.state.domains.localHost + "/main/user/regedit",
        method: "POST",
        data: {
          name: this.$store.state.userInfo.name,
          phone: this.$store.state.userInfo.phone,
          code: this.code
        }
      }).then((response) => {
        console.log("result:",response.data);
        if (response.data.code === 1) {
          open(response.data.msg,"success");
          this.$store.state.userInfo.username = response.data.data;
          this.$router.push(LOGIN_BY_PHONE_PATH_MSG);
        }else {
          open(response.data.msg,"warning");
        }
      }).catch((error) => {
        console.log(error);
        open(error.message,"error");
      });
    }
  },
}
</script>

<style>
.rows {
  margin-bottom: 10px;
}
.code {
  margin:0px;
  padding:0px;
}
</style>
