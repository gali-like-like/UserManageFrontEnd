<script>
import GetCheckCodeComp from "@/components/GetCheckCodeComp.vue";
import {LOGIN_BY_PHONE_PATH_MSG, MAIN_INDEX_PATH_MSG} from "@/ConstMsg/CommonMsg";
import axios from "axios";
import {open} from "@/ConstMsg/NormalMethod";

export default {
name: "LoginByPhoneView",
  components: {GetCheckCodeComp},
  methods:{
    loginByPhone() {
      axios({
        url:this.$store.state.domains.localHost+LOGIN_BY_PHONE_PATH_MSG,
        method: "POST",
        data:{
          phone:this.$store.state.userInfo.phone,
          code:this.$store.state.userInfo.code
        }
      }).then(res => {
        console.log(res.data);
        if (res.data.code === 1) {
          localStorage.setItem("user",res.data.data);
          open(res.data.msg,"success");
          this.$router.push(MAIN_INDEX_PATH_MSG);
        } else {
          open(res.data.msg,"warning");
        }
      }).catch(e => {
        console.log(e.message);
        open(e.message,"error");
      })
    }
  }
}
</script>

<template>
  <GetCheckCodeComp></GetCheckCodeComp>
  <el-row :gutter="20" justify="center">
    <el-col :span="6">
      <el-button type="primary" size="large" style="width:100%" @click="loginByPhone">登录</el-button>
    </el-col>
  </el-row>
</template>

<style scoped>

</style>
