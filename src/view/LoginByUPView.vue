<template>
  <el-row :gutter="20" justify="center" class="rows">
    <el-col :span="6">
      <el-input type="text" placeholder="请输入用户账号" v-model="$store.state.userInfo.username" clearable>
        <template #prefix>
          <el-icon>
            <Avatar />
          </el-icon>
        </template>
      </el-input>
    </el-col>
  </el-row>
  <el-row :gutter="20" justify="center" class="rows">
    <el-col :span="6">
      <el-input type="password" placeholder="请输入密码" show-password v-model="$store.state.userInfo.password">
        <template #prefix>
          <el-icon>
            <Lock />
          </el-icon>
        </template>
      </el-input>
    </el-col>
  </el-row>
  <el-row class="lastRow" style="margin-right: 0;margin-left:0">
    <el-col :span="2" :offset="9" >
      <el-checkbox :value="isSave" name="savePD" v-model="isSave" size="small">
        <el-link size="small" type="info" style="width:100%;text-align: center;" :underlin="false">记住密码</el-link>
      </el-checkbox>
    </el-col>
    <el-col :span="2">
      <el-link size="small" type="info" style="width:100%;text-align: center;" :underline="false" @click="jumpLoginByPhone">忘记账号了?请点击这里</el-link>
    </el-col>
    <el-col :span="2">
      <el-link size="small" type="info" style="width:100%;text-align: center;" :underline="true" @click="jumpRegedit">没有账号？请点击这里</el-link>
    </el-col>
  </el-row>
  <el-row :gutter="20" justify="center" class="lastRow">
    <el-col :span="6">
      <el-button type="primary" style="width:100%" @click="loginByUP">登录</el-button>
    </el-col>
  </el-row>
  <el-row :gutter="20" justify="center" style="width:100%;height:20px" align="bottom">
    <el-col :span="6">
      <el-link href="https://beian.miit.gov.cn/" :underline="false" target="_blank">备案号:湘ICP备2024076853号</el-link>
    </el-col>
  </el-row>
</template>

<style scoped>
.rows {
  margin-bottom: 20px;
}
.lastRow {
  margin-bottom: 15px;
}

</style>

<script>
//完成 将password,account字段用vuex管理
import {Avatar, Lock} from "@element-plus/icons-vue";
import {LOGIN_BY_PHONE_PATH_MSG, MAIN_INDEX_PATH_MSG, REGEDIT_PATH_MSG} from "@/ConstMsg/CommonMsg";
import axios from "axios";
import CryptoJS from  "crypto-js"
import {encryptMessage,open} from "@/ConstMsg/NormalMethod";
export default {
  name: 'App',
  components: {Lock, Avatar},
  data() {
    return {
      isSave: true,
    }
  }
  ,
  methods: {
    jumpRegedit() {
      this.$router.push(REGEDIT_PATH_MSG)
    },
    jumpLoginByPhone() {
      this.$router.push(LOGIN_BY_PHONE_PATH_MSG)
    },
    loginByUP() {
      axios({
        url: this.$store.state.domains.localHost + "/main/login/up",
        method: "POST",
        data:{
          username: this.$store.state.userInfo.username,
          password: this.$store.state.userInfo.password
        }
      }).then(res => {
        if (res.data.code === 1) {
          console.log(res.data.data);
          open(res.data.msg,"success");
          localStorage.setItem("user",res.data.data);
          if (this.isSave) {
            localStorage.setItem("password",encryptMessage(this.$store.state.userInfo.password))
          }
          this.$router.push(MAIN_INDEX_PATH_MSG);
        }
        else {
          open(res.data.msg,"warning");
        }
      })
    },
  },
  mounted() {
    let password = localStorage.getItem("password")
    if(password != null) {
      const secretKey = 'galinb'; // 请确保密钥的安全性
      const bytes = CryptoJS.AES.decrypt(password.toString(), secretKey);
      let decrytedMsg = bytes.toString(CryptoJS.enc.Utf8);
      this.$store.state.userInfo.password = decrytedMsg;
    }
  }
}

</script>
